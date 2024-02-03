import { NetworkProvider } from "../NetworkProvider";
import { User } from "../User";
import { Wallet } from "../Wallet";

class WalletKeeper {
  static async createWallet(name: string, user: User): Promise<Wallet> {
    return {
      name: "mock wallet",
      address: "mock address",
      encryptedWallet: "mock encrypted",
    };
  }

  static async getPrivateKeyFromWallet(
    wallet: Wallet,
    password: string
  ): Promise<string> {
    return "mock private key";
  }

  static async verifyUserPassword(
    password: string,
    wallets: Wallet[]
  ): Promise<boolean> {
    if (wallets.length) {
      return true;
    }

    return false;
  }

  static getProvider(network: string) {
    return { getBalance: async () => BigInt(Math.random() * 1000) };
  }

  static getWalletBalance(
    provider: NetworkProvider,
    address: string
  ): Promise<bigint> {
    return provider.getBalance(address);
  }

  static formatBalance(balance: bigint): string {
    return `${balance}`;
  }
}

export default WalletKeeper;
