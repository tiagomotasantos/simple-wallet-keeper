import { ethers } from "ethers";
import { User, Wallet } from "../models";
import AES from "crypto-js/aes";
import ENC from "crypto-js/enc-utf8";

export type NetworkProvider = ethers.AbstractProvider;

class WalletFactory {
  private user: User | null;

  constructor(user: User | null) {
    this.user = user;
  }

  async createWallet(name: string): Promise<Wallet> {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = await wallet.encrypt(this.user!.password);

    return {
      name,
      address: wallet.address,
      privateKey: AES.encrypt(privateKey, this.user!.password).toString(),
    };
  }

  async createPrivateKeyFromEncryptedJson(
    json: string,
    password: string
  ): Promise<string> {
    const wallet = await ethers.Wallet.fromEncryptedJson(
      AES.decrypt(json, password).toString(ENC),
      password
    );

    return wallet.privateKey;
  }

  async verifyUserPassword(
    password: string,
    wallets: Wallet[]
  ): Promise<boolean> {
    if (wallets.length) {
      try {
        await ethers.Wallet.fromEncryptedJson(wallets[0].privateKey, password);

        return true;
      } catch (error) {
        // in case of error is considered that validation failed
      }
    }

    return false;
  }

  getProvider(network: string): NetworkProvider {
    return ethers.getDefaultProvider(network);
  }

  async getWalletBalance(
    provider: NetworkProvider,
    address: string
  ): Promise<bigint> {
    return provider.getBalance(address);
  }

  formatBalance(balance: bigint): string {
    return ethers.formatEther(balance);
  }
}

export default WalletFactory;
