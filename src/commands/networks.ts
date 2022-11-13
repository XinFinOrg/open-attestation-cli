import { providers } from "ethers";

type SupportedNetwork = {
  explorer: string;
  provider: () => providers.Provider;
};

enum NetworkCmdName {
  Local = "local",
  Mainnet = "mainnet",
  Goerli = "goerli",
  Sepolia = "sepolia",
  Polygon = "polygon",
  Mumbai = "mumbai",
  XDC = "xdc",
  Apothem = "apothem",
}

const defaultInfuraProvider =
  (networkName: string): (() => providers.Provider) =>
  () =>
    new providers.InfuraProvider(networkName);

const jsonRpcProvider =
  (url: string): (() => providers.Provider) =>
  () =>
    new providers.JsonRpcProvider(url);

export const supportedNetwork: {
  [key in NetworkCmdName]: SupportedNetwork;
} = {
  [NetworkCmdName.Local]: {
    explorer: "https://localhost/explorer",
    provider: jsonRpcProvider("http://127.0.0.1:8545"),
  },
  [NetworkCmdName.Mainnet]: {
    explorer: "https://etherscan.io",
    provider: defaultInfuraProvider("homestead"),
  },
  [NetworkCmdName.Goerli]: {
    explorer: "https://goerli.etherscan.io",
    provider: defaultInfuraProvider("goerli"),
  },
  [NetworkCmdName.Sepolia]: {
    explorer: "https://sepolia.etherscan.io",
    provider: jsonRpcProvider("https://rpc.sepolia.org"),
  },
  [NetworkCmdName.Polygon]: {
    explorer: "https://polygonscan.com",
    provider: defaultInfuraProvider("matic"),
  },
  [NetworkCmdName.Mumbai]: {
    explorer: "https://mumbai.polygonscan.com",
    provider: defaultInfuraProvider("maticmum"),
  },
  [NetworkCmdName.XDC]: {
    explorer: "https://xdcscan.io",
    provider: jsonRpcProvider("https://erpc.xinfin.network"),
  },
  [NetworkCmdName.Apothem]: {
    explorer: "https://apothem.xdcscan.io",
    provider: jsonRpcProvider("https://erpc.apothem.network"),
  },
};

export const getSupportedNetwork = (networkCmdName: string): SupportedNetwork => {
  return supportedNetwork[networkCmdName as NetworkCmdName];
};
