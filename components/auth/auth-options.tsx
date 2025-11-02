"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Chrome, 
  Github, 
  Linkedin, 
  Mail, 
  Wallet, 
  Lock, 
  Eye, 
  EyeOff,
  User
} from "lucide-react"
import { IdentityType } from "./identity-selector"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { setAuth, isOnboardingComplete } from "@/lib/auth"

const emailSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

type EmailFormData = z.infer<typeof emailSchema>

interface AuthOptionsProps {
  mode: "login" | "signup"
  identityType: IdentityType
}

export function AuthOptions({ mode, identityType }: AuthOptionsProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [authMethod, setAuthMethod] = useState<"email" | "oauth" | "web3" | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  })

  const onSubmit = (data: EmailFormData) => {
    console.log("Form submitted:", data)
    
    // Mock authentication - accept test credentials
    const testCredentials = [
      { email: "test@eduverse.ai", password: "test1234" },
      { email: "demo@eduverse.ai", password: "demo1234" },
      { email: "student@eduverse.ai", password: "student123" },
      { email: "educator@eduverse.ai", password: "educator123" },
      { email: "admin@eduverse.ai", password: "admin1234" },
    ]
    
    const isValid = testCredentials.some(
      (cred) => cred.email === data.email && cred.password === data.password
    )
    
    if (isValid || mode === "signup") {
      // Set authentication state
      setAuth({
        email: data.email,
        name: data.email.split("@")[0],
        identityType: identityType || "student",
        isGuest: false,
      })

      // Check if onboarding is complete
      const onboardingComplete = isOnboardingComplete()
      
      if (mode === "signup" || !onboardingComplete) {
        // New signup or first time login - go to onboarding
        window.location.href = "/onboarding"
      } else {
        // Returning user - go directly to dashboard
        window.location.href = "/dashboard"
      }
    } else {
      alert("Invalid credentials. Use test@eduverse.ai / test1234 or signup to create new account.")
    }
  }

  const handleOAuth = (provider: string) => {
    console.log(`Connecting ${provider}...`)
    // Mock OAuth - set auth state
    setAuth({
      email: `${provider}@eduverse.ai`,
      name: provider.charAt(0).toUpperCase() + provider.slice(1),
      identityType: identityType || "student",
      isGuest: false,
    })
    
    // Check if onboarding is complete
    setTimeout(() => {
      const onboardingComplete = isOnboardingComplete()
      window.location.href = onboardingComplete ? "/dashboard" : "/onboarding"
    }, 1000)
  }

  const handleWeb3 = (wallet: string) => {
    console.log(`Connecting ${wallet}...`)
    // Mock Web3 - set auth state
    setAuth({
      email: `${wallet}@eduverse.ai`,
      name: wallet.charAt(0).toUpperCase() + wallet.slice(1),
      identityType: identityType || "student",
      isGuest: false,
    })
    
    // Check if onboarding is complete
    setTimeout(() => {
      const onboardingComplete = isOnboardingComplete()
      window.location.href = onboardingComplete ? "/dashboard" : "/onboarding"
    }, 1000)
  }

  const oauthProviders = [
    { id: "google", name: "Google", icon: Chrome, color: "hover:bg-red-50 hover:border-red-300" },
    { id: "github", name: "GitHub", icon: Github, color: "hover:bg-gray-50 hover:border-gray-300" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "hover:bg-blue-50 hover:border-blue-300" },
    { id: "microsoft", name: "Microsoft", icon: Mail, color: "hover:bg-blue-50 hover:border-blue-300" },
  ]

  const web3Wallets = [
    { id: "metamask", name: "MetaMask", icon: Wallet },
    { id: "walletconnect", name: "WalletConnect", icon: Wallet },
    { id: "phantom", name: "Phantom", icon: Wallet },
  ]

  return (
    <div className="space-y-6">
      {/* Email/Password Auth */}
      {authMethod === "email" ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-4"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password")}
                  className={errors.password ? "border-destructive pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>
            {mode === "login" && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded" />
                  Remember me
                </label>
                <a href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
            )}
            <Button type="submit" className="w-full" size="lg">
              {mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>
          <Button
            variant="ghost"
            onClick={() => setAuthMethod(null)}
            className="w-full"
          >
            Back to options
          </Button>
        </motion.div>
      ) : (
        <>
          {/* OAuth Providers */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Social Login
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {oauthProviders.map((provider) => {
                const Icon = provider.icon
                return (
                  <Button
                    key={provider.id}
                    variant="outline"
                    className={`w-full justify-start ${provider.color}`}
                    onClick={() => handleOAuth(provider.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {provider.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Email/Password Option */}
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => setAuthMethod("email")}
          >
            <Mail className="h-4 w-4 mr-2" />
            Continue with Email
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          {/* Web3 Wallets */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-muted-foreground uppercase tracking-wide">
              Web3 Login
            </h3>
            <div className="space-y-3">
              {web3Wallets.map((wallet) => {
                const Icon = wallet.icon
                return (
                  <Button
                    key={wallet.id}
                    variant="outline"
                    className="w-full justify-start hover:bg-purple-50 hover:border-purple-300"
                    onClick={() => handleWeb3(wallet.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    Connect {wallet.name}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Guest Mode */}
          {mode === "login" && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  // Set guest auth state
                  setAuth({
                    email: "guest@eduverse.ai",
                    name: "Guest",
                    identityType: identityType || "student",
                    isGuest: true,
                  })
                  // Handle guest mode
                  window.location.href = "/onboarding?mode=guest"
                }}
              >
                <User className="h-4 w-4 mr-2" />
                Continue as Guest
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Explore EDUVERSE X without creating an account
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

