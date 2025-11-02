"use client"

import { motion } from "framer-motion"
import { DecentralizedReputationGraph } from "./decentralized-reputation-graph"
import { VerifiedPortfolioGraph } from "./verified-portfolio-graph"
import { DIDReputationLayer } from "./did-reputation-layer"
import { WebProofSystem } from "./web-proof-system"

export function ReputationTab() {
  return (
    <div className="space-y-6">
      {/* Decentralized Reputation Graph */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <DecentralizedReputationGraph />
      </motion.div>

      {/* Verified Portfolio Graph & DID Reputation Layer */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <VerifiedPortfolioGraph />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <DIDReputationLayer />
        </motion.div>
      </div>

      {/* Web Proof System */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <WebProofSystem />
      </motion.div>
    </div>
  )
}

