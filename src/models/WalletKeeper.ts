import { ethers } from "ethers";
import { User, Wallet } from "../models";
import AES from "crypto-js/aes";
import ENC from "crypto-js/enc-utf8";

export type NetworkProvider = ethers.AbstractProvider;

class WalletKeeper {
  static async createWallet(name: string, user: User): Promise<Wallet> {
    const wallet = ethers.Wallet.createRandom();
    const encrypted = await wallet.encrypt(user.password);
    const encryptedWallet = AES.encrypt(encrypted, user.password).toString();

    return {
      name,
      address: wallet.address,
      encryptedWallet,
    };
  }

  static async getPrivateKeyFromWallet(
    wallet: Wallet,
    password: string
  ): Promise<string> {
    const decryptedWallet = await ethers.Wallet.fromEncryptedJson(
      AES.decrypt(wallet.encryptedWallet, password).toString(ENC),
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
        await ethers.Wallet.fromEncryptedJson(
          AES.decrypt(wallets[0].encryptedWallet, password).toString(ENC),
          password
        );

        return true;
      } catch (error) {
        // in case of error is considered that validation failed
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
