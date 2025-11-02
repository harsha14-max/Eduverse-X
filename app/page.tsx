import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/landing/hero-section"
import { ProblemSolutionSection } from "@/components/landing/problem-solution-section"
import { StatsSection } from "@/components/landing/stats-section"
import { FeatureCards } from "@/components/landing/feature-cards"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { ThreeStepVisual } from "@/components/landing/three-step-visual"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { SecuritySection } from "@/components/landing/security-section"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navbar />
      <HeroSection />
      <ProblemSolutionSection />
      <StatsSection />
      <FeatureCards />
      <BenefitsSection />
      <ThreeStepVisual />
      <TestimonialsSection />
      <SecuritySection />
      <Footer />
    </main>
  )
}
