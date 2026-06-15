import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface SlideWipeProps {
  children: React.ReactNode;
  direction?: "left" | "right" | "up" | "down";
  startFrame: number;
  endFrame: number;
  reveal?: boolean; // if true, child is revealed; if false, child is wiped away
}

/**
 * Spring-driven slide wipe transition.
 * Animates a clip-path inset to reveal or hide children.
 */
export const SlideWipe: React.FC<SlideWipeProps> = ({
  children,
  direction = "left",
  startFrame,
  endFrame,
  reveal = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 20, mass: 0.8, stiffness: 120 },
  });

  const t = interpolate(progress, [0, 1], reveal ? [0, 1] : [1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const clipMap = {
    left: `inset(0 ${(1 - t) * 100}% 0 0)`,
    right: `inset(0 0 0 ${(1 - t) * 100}%)`,
    up: `inset(0 0 ${(1 - t) * 100}% 0)`,
    down: `inset(${(1 - t) * 100}% 0 0 0)`,
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        clipPath: clipMap[direction],
      }}
    >
      {children}
    </div>
  );
};
