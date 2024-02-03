import { ethers } from "ethers";
import { NetworkProvider, User, Wallet } from "../models";
import AES from "crypto-js/aes";
import ENC from "crypto-js/enc-utf8";

class WalletKeeper {
  static async createWallet(name: string, user: User): Promise<Wallet> {
    const wallet = ethers.Wallet.createRandom();
    const encryptedWallet = await wallet.encrypt(user.password);
    const aesEncryptedWallet = AES.encrypt(
      encryptedWallet,
      user.password
    ).toString();

    return {
      name,
      address: wallet.address,
      encryptedWallet: aesEncryptedWallet,
    };
  }

  static async getPrivateKeyFromWallet(
    wallet: Wallet,
    password: string
  ): Promise<string> {
    const aesDecryptedWallet = AES.decrypt(
      wallet.encryptedWallet,
      password
    ).toString(ENC);
    const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
      aesDecryptedWallet,
      password
    );

    return decryptedWallet.privateKey;
  }

  static async verifyUserPassword(
    password: string,
    wallets: Wallet[]
  ): Promise<boolean> {
    if (wallets.length) {
      try {
        await this.getPrivateKeyFromWallet(wallets[0], password);

        return true;
      } catch (error) {
        // if we get here means that verification failed
      }
    }

    return false;
  }

  static getProvider(network: string): NetworkProvider {
    return ethers.getDefaultProvider(network);
  }

  static getWalletBalance(
    provider: NetworkProvider,
    address: string
  ): Promise<bigint> {
    return provider.getBalance(address);
  }

  static formatBalance(balance: bigint): string {
    return ethers.formatEther(balance);
  }
}

export default WalletKeeper;
