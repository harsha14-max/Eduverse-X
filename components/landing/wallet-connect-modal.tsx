"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Wallet, Lock, Shield } from "lucide-react"

export function WalletConnectModal({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const wallets = ["MetaMask", "WalletConnect", "Coinbase Wallet", "Trust Wallet"]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-primary" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription>
            Your keys stay with you — EDUVERSE never stores login data.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="p-4 rounded-lg border bg-primary/5">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-semibold mb-1">Decentralized by Design</h4>
                <p className="text-sm text-muted-foreground">
                  Connect your wallet to start using EDUVERSE X. Your data is encrypted and stored on IPFS. 
                  Only you control access with your private keys.
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <Button
                key={wallet}
                variant="outline"
                className="w-full justify-start"
                onClick={() => {
                  // Handle wallet connection
                  console.log(`Connecting ${wallet}...`)
                }}
              >
                <Lock className="mr-2 h-4 w-4" />
                Connect {wallet}
              </Button>
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground">
            By connecting, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

