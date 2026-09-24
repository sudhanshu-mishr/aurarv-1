import React from 'react';
import Navbar from '@/components/layout/Navbar';
import AuraHero from '@/components/hero/AuraHero';
import ProjectOverview from '@/components/sections/ProjectOverview';
import CodeToSilicon from '@/components/sections/CodeToSilicon';
import ArchitectureDatapath from '@/components/architecture/ArchitectureDatapath';
import IsaTable from '@/components/sections/IsaTable';
import StackExplorer from '@/components/sections/StackExplorer';
import SiliconFlow from '@/components/sections/SiliconFlow';
import EngineeringRoadmap from '@/components/sections/EngineeringRoadmap';
import ProjectAbout from '@/components/sections/ProjectAbout';
import GithubCta from '@/components/sections/GithubCta';
import Footer from '@/components/layout/Footer';
import MoltenMetal from '@/components/ui/MoltenMetal';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#020305] text-[#F4F4F5] selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* Global Site-Wide MoltenMetal Liquid Metal Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-35 mix-blend-screen">
        <MoltenMetal
          color1="#040e1f"
          color2="#0284c7"
          color3="#38bdf8"
          speed={0.2}
          scale={3.6}
          detail={3}
          glow={1.4}
          coreSize={0.08}
          swirl={0.8}
          fold={-0.18}
          blackPoint={0.07}
          brightness={1.15}
          colorMode="frost"
          grain={true}
          grainIntensity={0.03}
          mouseInteraction={true}
          mouseStrength={0.25}
          opacity={0.85}
          className="w-full h-full"
        />
      </div>

      {/* 1. Navbar */}
      <Navbar />

      <main className="relative z-10">
        {/* 2. Hero: ShapeBlur + ShapeWaves + CPU Datapath Visualization */}
        <AuraHero />

        {/* 3. Project Overview / Manifesto */}
        <ProjectOverview />

        {/* 4. Code -> Silicon: DitherVeil OGL Shader (Preserved) */}
        <CodeToSilicon />

        {/* 5. Architecture: Interactive CPU datapath + BranchedMenu */}
        <ArchitectureDatapath />

        {/* 6. ISA: RV32I Matrix & Animated Feed */}
        <IsaTable />

        {/* 7. The Stack: InfiniteSpiral 3D Orbit */}
        <StackExplorer />

        {/* 8. RTL -> GDSII: GatewayFlow Physical Design (Preserved) */}
        <SiliconFlow />

        {/* 9. Roadmap: 6 Engineering Phases */}
        <EngineeringRoadmap />

        {/* 10. Development / About Project */}
        <ProjectAbout />

        {/* 11. GitHub CTA (Preserved) */}
        <GithubCta />
      </main>

      {/* 12. Footer */}
      <Footer />
    </div>
  );
}
