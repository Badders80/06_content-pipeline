import { interpolate, useCurrentFrame } from "remotion";

interface KenBurnsBackgroundProps {
  src: string;
  objectPosition?: string;
  startScale?: number;
  endScale?: number;
  startX?: number;
  endX?: number;
  startY?: number;
  endY?: number;
  startFrame?: number;
  endFrame?: number;
  opacity?: number;
}

/**
 * Cinematic Ken Burns background for full-bleed image scenes.
 * Uses CSS background-image for reliable object-fit behavior in Remotion.
 */
export const KenBurnsBackground: React.FC<KenBurnsBackgroundProps> = ({
  src,
  objectPosition = "center center",
  startScale = 1.12,
  endScale = 1.0,
  startX = 0,
  endX = 0,
  startY = 0,
  endY = 0,
  startFrame,
  endFrame,
  opacity = 1,
}) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [startFrame ?? 0, endFrame ?? 300],
    [startScale, endScale],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const x = interpolate(
    frame,
    [startFrame ?? 0, endFrame ?? 300],
    [startX, endX],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const y = interpolate(
    frame,
    [startFrame ?? 0, endFrame ?? 300],
    [startY, endY],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: objectPosition,
        backgroundRepeat: "no-repeat",
        transform: `scale(${scale}) translate(${x}px, ${y}px)`,
        opacity,
      }}
    />
  );
};
