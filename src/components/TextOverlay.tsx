import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface TextOverlayProps {
  children: React.ReactNode;
  startFrame: number;
  endFrame?: number;
  align?: "center" | "left" | "right";
  verticalAlign?: "top" | "center" | "bottom";
  className?: string;
  style?: React.CSSProperties;
  withPanel?: boolean;
  panelOpacity?: number;
}

/**
 * Premium animated text overlay with optional dark glass panel.
 * Slides up and fades in using a spring.
 */
export const TextOverlay: React.FC<TextOverlayProps> = ({
  children,
  startFrame,
  endFrame,
  align = "center",
  verticalAlign = "bottom",
  className = "",
  style,
  withPanel = false,
  panelOpacity = 0.55,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slide = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });
  const y = interpolate(slide, [0, 1], [50, 0]);
  const opacity = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const exitOpacity = endFrame
    ? interpolate(frame, [endFrame - 20, endFrame], [1, 0], {
        extrapolateRight: "clamp",
        extrapolateLeft: "clamp",
      })
    : 1;

  const alignMap = {
    center: "center",
    left: "flex-start",
    right: "flex-end",
  };

  const verticalMap = {
    top: "flex-start",
    center: "center",
    bottom: "flex-end",
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: alignMap[align],
        justifyContent: verticalMap[verticalAlign],
        padding: 48,
        opacity: exitOpacity,
      }}
    >
      <div
        className={className}
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          padding: withPanel ? "32px 48px" : undefined,
          borderRadius: withPanel ? 8 : undefined,
          backgroundColor: withPanel
            ? `rgba(0, 0, 0, ${panelOpacity})`
            : undefined,
          backdropFilter: withPanel ? "blur(6px)" : undefined,
          textAlign: align,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};
