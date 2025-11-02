"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { DashboardHeader } from "../dashboard/dashboard-header"
import SidebarNavigation from "../dashboard/sidebar-navigation"
import { AccountHub } from "./account-hub"
import { RoleDashboard } from "./role-dashboard"
import { TeamOverview } from "./team-overview"
import { PermissionPanel } from "./permission-panel"
import { SecuritySettings } from "./security-settings"
import { IntegrationsPanel } from "./integrations-panel"
import { IdentityVisualization } from "./identity-visualization"
import { AIAssistantPane } from "./ai-assistant-pane"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Shield, User, Settings } from "lucide-react"
// Section 13: Governance Components
import { AIPersonaManager } from "../governance/ai-persona-manager"
import { AccessLensOverlay } from "../governance/access-lens-overlay"
import { ProfileConsistencyChecker } from "../governance/profile-consistency-checker"
import { AIPermissionsMatrixV2 } from "../governance/ai-permissions-matrix-v2"
import { DecentralizedKeyVault3D } from "../governance/decentralized-key-vault-3d"
import { ReputationOrbit } from "../governance/reputation-orbit"
import { AutoBackupVerifier } from "../governance/auto-backup-verifier"
import { ZeroKnowledgeBadgeSystem } from "../governance/zero-knowledge-badge-system"
import { SecurityGamification } from "../governance/security-gamification"
import { DataPrivacyStorageMap } from "../governance/data-privacy-storage-map"
import { DataTracerOverlay } from "../governance/data-tracer-overlay"
import { CarbonFootprintMeter } from "../governance/carbon-footprint-meter"
import { RegionalComplianceChecker } from "../governance/regional-compliance-checker"
import { PrivacyModeUpgrade } from "../governance/privacy-mode-upgrade"
import { ConsentWorkflowStudio } from "../governance/consent-workflow-studio"
import { AIActionForecaster } from "../governance/ai-action-forecaster"
import { TrustTransparencyIndex } from "../governance/trust-transparency-index"
import { PrivacyLearningPopups } from "../governance/privacy-learning-popups"
import { ColorSafeModeToggle } from "../governance/color-safe-mode-toggle"
import { EmotionMappingAnimations } from "../governance/emotion-mapping-animations"

function AccountPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState("account")

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30 flex">
      {/* Sidebar */}
      <SidebarNavigation />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <h1 className="text-3xl font-bold mb-2">Account & Governance</h1>
              <p className="text-muted-foreground">
                Manage your profile, team, security, and privacy governance.
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="account" className="gap-2">
                    <User className="h-4 w-4" />
                    Account
                  </TabsTrigger>
                  <TabsTrigger value="governance" className="gap-2">
                    <Shield className="h-4 w-4" />
                    Governance
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="gap-2">
                    <Settings className="h-4 w-4" />
                    Settings
                  </TabsTrigger>
                </TabsList>

                {/* Account Tab */}
                <TabsContent value="account" className="mt-0 space-y-6">
                  {/* Account Hub */}
                  <AccountHub />

                  {/* Role Dashboard & Team Overview - Side by Side */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <RoleDashboard />
                    <TeamOverview />
                  </div>

                  {/* Permission Panel & Security Settings - Side by Side */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <PermissionPanel />
                    <SecuritySettings />
                  </div>

                  {/* Integrations Panel & Identity Visualization - Side by Side */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <IntegrationsPanel />
                    <IdentityVisualization />
                  </div>
                </TabsContent>

                {/* Governance Tab - Section 13 */}
                <TabsContent value="governance" className="mt-0 space-y-6">
                  {/* Phase 1: Account & AI Identity Manager */}
                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <AIPersonaManager />
                    </div>
                    <div className="lg:col-span-2">
                      <ProfileConsistencyChecker />
                    </div>
                  </div>
                  <div>
                    <AccessLensOverlay />
                  </div>

                  {/* Phase 2: AI Permissions Matrix v2 */}
                  <AIPermissionsMatrixV2 />

                  {/* Phase 3: Decentralized Key Vault & Reputation */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <DecentralizedKeyVault3D />
                    <ReputationOrbit />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <AutoBackupVerifier />
                    <ZeroKnowledgeBadgeSystem />
                  </div>
                  <SecurityGamification />

                  {/* Phase 4: Data Privacy & Storage Visualizer */}
                  <DataPrivacyStorageMap />
                  <div className="grid lg:grid-cols-2 gap-6">
                    <DataTracerOverlay />
                    <CarbonFootprintMeter />
                  </div>
                  <div className="grid lg:grid-cols-2 gap-6">
                    <RegionalComplianceChecker />
                    <PrivacyModeUpgrade />
                  </div>

                  {/* Phase 5: Consent Workflow Studio */}
                  <ConsentWorkflowStudio />
                  <AIActionForecaster />

                  {/* Phase 6: Trust & Transparency Index */}
                  <TrustTransparencyIndex />

                  {/* Phase 7: Learning Popups & Design */}
                  <div className="grid lg:grid-cols-2 gap-6">
                    <PrivacyLearningPopups />
                    <ColorSafeModeToggle />
                  </div>
                  <EmotionMappingAnimations />
                </TabsContent>

                {/* Settings Tab */}
                <TabsContent value="settings" className="mt-0 space-y-6">
                  <SecuritySettings />
                  <IntegrationsPanel />
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>

        {/* Always-On AI Assistant Pane */}
        <AIAssistantPane />
      </div>
    </div>
  )
}

export default AccountPage

