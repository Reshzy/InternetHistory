import { MuseumNav } from "@/components/chrome/MuseumNav";
import { Cursor } from "@/components/primitives/Cursor";
import { AIWebScene } from "@/components/scenes/AIWebScene";
import { BootScene } from "@/components/scenes/BootScene";
import { FutureScene } from "@/components/scenes/FutureScene";
import { GeneratedWebScene } from "@/components/scenes/GeneratedWebScene";
import { MobileWebScene } from "@/components/scenes/MobileWebScene";
import { ModernWebScene } from "@/components/scenes/ModernWebScene";
import { PlatformWebScene } from "@/components/scenes/PlatformWebScene";
import { SocialWebScene } from "@/components/scenes/SocialWebScene";
import { Web1995Scene } from "@/components/scenes/Web1995Scene";
import { WildWebScene } from "@/components/scenes/WildWebScene";

export default function Home() {
  return (
    <>
      <a href="#document-web" className="museum-skip">
        Skip to 1995
      </a>
      <h1 className="sr-only">
        NET//HISTORY — 30 years of the web in one scroll
      </h1>
      <Cursor />
      <MuseumNav />
      <main>
        <BootScene />
        <Web1995Scene />
        <WildWebScene />
        <SocialWebScene />
        <MobileWebScene />
        <PlatformWebScene />
        <ModernWebScene />
        <AIWebScene />
        <GeneratedWebScene />
        <FutureScene />
      </main>
    </>
  );
}
