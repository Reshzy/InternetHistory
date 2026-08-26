import { NoiseLayer } from "@/components/effects/NoiseLayer";
import { Scanlines } from "@/components/effects/Scanlines";

type CRTScreenProps = {
  children: React.ReactNode;
};

export function CRTScreen({ children }: CRTScreenProps) {
  return (
    <div className="crt" data-crt>
      <div className="crt-bezel" data-crt-bezel>
        <div className="crt-screen" data-crt-screen>
          <div className="crt-flicker" data-crt-flicker>
            {children}
          </div>
          <Scanlines />
          <NoiseLayer />
        </div>
      </div>
    </div>
  );
}
