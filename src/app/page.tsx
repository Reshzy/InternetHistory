import { MuseumNav } from "@/components/chrome/MuseumNav";
import { Cursor } from "@/components/primitives/Cursor";
import { BootScene } from "@/components/scenes/BootScene";
import { EraPlaceholder } from "@/components/scenes/EraPlaceholder";
import { Web1995Scene } from "@/components/scenes/Web1995Scene";
import { WildWebScene } from "@/components/scenes/WildWebScene";
import { eras } from "@/lib/eras";

const placeholderEras = eras.filter((era) => era.status === "placeholder");

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
        {placeholderEras.map((era) => (
          <EraPlaceholder key={era.id} era={era} />
        ))}
      </main>
    </>
  );
}
