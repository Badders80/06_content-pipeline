import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from "remotion";

export const PrudentiaTeaser: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Ken Burns: slow zoom from 1.15x to 1.0x over the full duration
  const scale = interpolate(frame, [0, durationInFrames], [1.15, 1.0], {
    extrapolateRight: "clamp",
  });

  // Ken Burns: slow pan from right to left (offset the crop)
  const xOffset = interpolate(frame, [0, durationInFrames], [0, -60], {
    extrapolateRight: "clamp",
  });

  // Gentle fade in at start
  const imageOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Gentle fade out at end
  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // Text animation: PRUDENTIA
  const textSlide = spring({
    frame: frame - 60,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });
  const textY = interpolate(textSlide, [0, 1], [40, 0]);
  const textOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-black overflow-hidden">
      {/* Background horse image */}
      <Img
        src={staticFile("_prudentia_action_shot.png")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 25%",
          transform: `scale(${scale}) translateX(${xOffset}px)`,
          opacity: Math.min(imageOpacity, outroOpacity),
        }}
      />

      {/* Bottom gradient for text readability */}
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "45%",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 50%, transparent 100%)",
        }}
      />

      {/* Text overlay with background bar */}
      <div className="absolute inset-0 flex items-end justify-center pb-16">
        <div
          className="flex items-center justify-center px-16 py-6"
          style={{
            transform: `translateY(${textY}px)`,
            opacity: textOpacity,
            background: "rgba(0, 0, 0, 0.6)",
            backdropFilter: "blur(4px)",
            borderRadius: "4px",
          }}
        >
          <h1 className="text-8xl font-black tracking-tighter text-white uppercase">
            Prudentia
          </h1>
        </div>
      </div>
    </AbsoluteFill>
  );
};
