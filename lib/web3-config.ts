'use client'

import { http, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import { celo } from './celo'
import { getDefaultConfig } from 'connectkit'

export const config = createConfig(
  getDefaultConfig({
    chains: [celo, mainnet],
    transports: {
      [celo.id]: http('https://forno.celo.org'),
      [mainnet.id]: http(),
    },
    walletConnectProjectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || 'demo-project-id',
    appName: 'SliceShop',
    appDescription: 'Open a store. Get paid onchain.',
  })
)
