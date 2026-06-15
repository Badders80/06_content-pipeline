import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from "remotion";
import { Logo } from "../assets/Logo";

interface HelloWorldProps {
  title: string;
  subtitle: string;
}

export const HelloWorld: React.FC<HelloWorldProps> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 12, mass: 0.5 },
  });

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-neutral-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8">
        <Logo scale={titleScale} />
        <h1
          className="text-6xl font-bold text-white"
          style={{
            transform: `scale(${titleScale})`,
          }}
        >
          {title}
        </h1>
        <p
          className="text-2xl text-neutral-400"
          style={{ opacity: subtitleOpacity }}
        >
          {subtitle}
        </p>
      </div>
      <Img
        src={staticFile("897618565531291341.png")}
        style={{
          position: "absolute",
          translate: "82.7px -109.9px"
        }}
        width={1184}
        height={864}
        from={50}
        durationInFrames={51} /><Img
            src={staticFile("897618565531291341.png")}
            style={{
              position: "absolute",
              translate: "316.19069085474746px 307.25124924391923px"
            }}
            width={1184}
            height={864}
            from={20}
            durationInFrames={59} /><Img
          src={staticFile("897618565531291341.png")}
          style={{
            position: "absolute",
            translate: "416.29976168204576px 171.54784212247034px"
          }}
          width={1184}
          height={864}
          from={71} /></AbsoluteFill>
  );
};