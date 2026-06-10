import Head from "next/head";
import { CardanoWallet, MeshBadge } from "@meshsdk/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import CampaignSection from "@/components/CampaignSection";
import CreateCampaignSection from "@/components/CreateCampaignSection";
import MyCampaignsSection from "@/components/MyCampaignsSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <Header/>
      <HeroSection/>
      <CampaignSection/>
      <CreateCampaignSection/>
      <MyCampaignsSection/>
      <FeaturesSection/>
      <HowItWorksSection/>
      <Footer/>
    </main>
  );
}
