import { ethers } from "ethers";
import { User, Wallet } from "../models";

class WalletFactory {
  private user: User;

  constructor(user: User) {
    this.user = user;
  }

  async createWallet(name: string): Promise<Wallet> {
    const wallet = ethers.Wallet.createRandom();
    const privateKey = await wallet.encrypt(this.user.password);

    return {
      name,
      address: wallet.address,
      privateKey,
      balance: 0,
    };
  }

  async createPrivateKeyFromEncryptedJson(
    json: string,
    password: string
  ): Promise<string> {
    const wallet = await ethers.Wallet.fromEncryptedJson(json, password);

    return wallet.privateKey;
  }
}

export default WalletFactory;
