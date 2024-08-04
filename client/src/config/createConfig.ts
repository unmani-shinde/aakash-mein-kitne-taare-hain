import {createConfig, http } from "wagmi";
import { core } from "./customChains";
import { arbitrumSepolia,polygonAmoy} from "viem/chains";
import { QueryClient} from "@tanstack/react-query";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    chains: [core,arbitrumSepolia,polygonAmoy],
    transports: {
      [core.id]: http(),
      [arbitrumSepolia.id]:http(),
      [polygonAmoy.id]:http()
    },
    walletConnectProjectId: 'a9fdc841635ffa2c5fe7d18174a050b7',
    // Required App Info
    appName: "Oracular",
  }),
);

export const queryClient = new QueryClient();