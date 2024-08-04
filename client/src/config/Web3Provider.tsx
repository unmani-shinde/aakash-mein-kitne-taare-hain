'use client'

import React, { ReactNode } from "react";
import { QueryClientProvider } from '@tanstack/react-query';
import { WagmiConfig } from 'wagmi';
import { config,queryClient } from "./createConfig";
import { ConnectKitProvider,SIWEProvider,SIWEConfig } from 'connectkit';
import {SiweMessage} from 'siwe'

interface Props {
    children?: ReactNode
    // any props that come into the component
}

const siweConfig: SIWEConfig = {
 
  getNonce: async () => fetch('/api/siwe/nonce').then((res) => res.text()),
  createMessage: ({ nonce, address, chainId }) => new SiweMessage({
    version: '1',
    domain: window.location.host,
    uri: window.location.origin,
    address,
    chainId,
    nonce,
    // Human-readable ASCII assertion that the user will sign, and it must not contain `\n`.
    statement: 'Sign In to Oracular.',
  }).prepareMessage(),
  verifyMessage: async ({ message, signature }) => fetch('/api/siwe/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, signature }),
  }).then((res) => res.ok),
  getSession: async () => fetch('/api/siwe/session').then((res) => res.ok ? res.json() : null),
  signOut: async () => fetch('/api/siwe/logout').then((res) => res.ok),

};

export const Web3Provider = ({ children, ...props }: Props) => {
  return (
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        {/* <SIWEProvider {...siweConfig}> */}
            <ConnectKitProvider {...props} theme="retro">{children}</ConnectKitProvider>

        {/* </SIWEProvider> */}
        
      </QueryClientProvider>
    </WagmiConfig>
  );
};