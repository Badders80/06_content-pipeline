import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Video,
} from "remotion";
import { KenBurnsBackground } from "../components/KenBurnsBackground";
import { SlideWipe } from "../components/SlideWipe";
import { TextOverlay } from "../components/TextOverlay";

const GOLD = "#d4a964";
const DARK_BG = "#0a0a0a";

export interface AlmanzorNightDanzaPromoProps {
  brandName?: string;
  tagline?: string;
  horseName?: string;
  trainerName?: string;
  ageType?: string;
  pedigreeDetails?: string;
  cta?: string;
  websiteUrl?: string;
  lockupSrc?: string;
  watermarkSrc?: string;
  sideImage?: string;
  frontImage?: string;
  videoSrc?: string;
}

export const defaultAlmanzorNightDanzaProps: AlmanzorNightDanzaPromoProps = {
  brandName: "Evolution Stables",
  tagline: "Ownership Evolved",
  horseName: "Almanzor x Night Danza",
  trainerName: "Trainer: Kennedy Racing",
  ageType: "2YO Filly",
  pedigreeDetails: "Sire: Almanzor / Dam: Night Danza",
  cta: "Enquire for Shares",
  websiteUrl: "evolutionstables.nz",
  lockupSrc: staticFile("vertical-logup-final.svg"),
  watermarkSrc: staticFile("monogram-gold.svg"),
  sideImage: staticFile("almanzorxnightdanza/side_view.jpg"),
  frontImage: staticFile("almanzorxnightdanza/front_view.png"),
  videoSrc: staticFile("almanzorxnightdanza/video.mp4"),
};

export const AlmanzorNightDanzaPromo: React.FC<AlmanzorNightDanzaPromoProps> = (props) => {
  const {
    brandName,
    tagline,
    horseName,
    trainerName,
    ageType,
    pedigreeDetails,
    cta,
    websiteUrl,
    lockupSrc,
    watermarkSrc,
    sideImage,
    frontImage,
    videoSrc,
  } = { ...defaultAlmanzorNightDanzaProps, ...props };

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Scene timing (frames @ 30fps)
  const SCENE1_END = 150; // 0-5s: Branded Title Card
  const SCENE2_END = 390; // 5-13s: Conformation Side View
  const SCENE3_END = 840; // 13-28s: Filly Video In Motion (15 seconds)
  const SCENE4_END = 1080; // 28-36s: Conformation Front View (8 seconds)
  // 36-40s: Outro CTA Card (SCENE5)

  // Global end fade
  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // ========== SCENE 1: TITLE CARD (0-5s) ==========
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineSpring = spring({
    frame: frame - 60,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 80 },
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [40, 0]);
  const taglineOpacity = interpolate(frame, [60, 90], [0, 1], {
    extrapolateRight: "clamp",
  });

  const watermarkOpacity = interpolate(frame, [90, 120], [0, 0.35], {
    extrapolateRight: "clamp",
  });

  // ========== SCENE 2: SIDE VIEW CONFORMATION (5-13s) ==========
  const scene2Opacity = interpolate(
    frame,
    [SCENE1_END, SCENE1_END + 20, SCENE2_END - 20, SCENE2_END],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ========== SCENE 3: VIDEO IN MOTION (13-28s) ==========
  const scene3Opacity = interpolate(
    frame,
    [SCENE2_END, SCENE2_END + 20, SCENE3_END - 20, SCENE3_END],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ========== SCENE 4: FRONT VIEW CONFORMATION (28-36s) ==========
  const scene4Opacity = interpolate(
    frame,
    [SCENE3_END, SCENE3_END + 20, SCENE4_END - 20, SCENE4_END],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ========== SCENE 5: OUTRO CTA (36-40s) ==========
  const lockupOpacity = interpolate(
    frame,
    [SCENE4_END, SCENE4_END + 30],
    [0, 1],
    { extrapolateRight: "clamp" }
  );
  const lockupScale = interpolate(
    frame,
    [SCENE4_END, SCENE4_END + 40],
    [0.92, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: DARK_BG,
        overflow: "hidden",
        fontFamily:
          "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* --- SCENE 1: Branded Title Card --- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: DARK_BG,
          opacity: interpolate(
            frame,
            [0, 30, SCENE1_END - 30, SCENE1_END],
            [1, 1, 1, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          ),
        }}
      >
        <h1
          style={{
            fontSize: 90,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 0.95,
            color: "#fff",
            textTransform: "uppercase",
            textAlign: "center",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          {brandName}
        </h1>
        <p
          style={{
            marginTop: 28,
            fontSize: 48,
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: GOLD,
            textAlign: "center",
            transform: `translateY(${taglineY}px)`,
            opacity: taglineOpacity,
          }}
        >
          {tagline}
        </p>

        {staticFile("wordmark-gold.svg") && (
          <img
            src={staticFile("wordmark-gold.svg")}
            style={{
              position: "absolute",
              top: 80,
              width: 220,
              height: "auto",
              opacity: watermarkOpacity,
              filter: "drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
            }}
          />
        )}
      </div>

      {/* --- SCENE 2: Conformation Side View (Ken Burns) --- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: scene2Opacity * outroOpacity,
        }}
      >
        <KenBurnsBackground
          src={sideImage!}
          objectPosition="80% 40%"
          startScale={1.15}
          endScale={1.03}
          startX={0}
          endX={0}
          startFrame={SCENE1_END}
          endFrame={SCENE2_END}
        />
        {/* Shadow overlays */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 30%)",
          }}
        />

        <TextOverlay
          startFrame={SCENE1_END + 30}
          endFrame={SCENE2_END}
          align="center"
          verticalAlign="bottom"
          style={{ paddingBottom: 160 }}
        >
          <h2
            style={{
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 0.95,
              color: "#fff",
              textTransform: "uppercase",
              textShadow: "0 4px 40px rgba(0,0,0,0.85)",
            }}
          >
            {horseName}
          </h2>
          <p
            style={{
              marginTop: 20,
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: GOLD,
              textTransform: "uppercase",
              textShadow: "0 2px 24px rgba(0,0,0,0.7)",
            }}
          >
            {trainerName}
          </p>
        </TextOverlay>
      </div>

      {/* --- SCENE 3: Filly Video In Motion (Wipe Transition) --- */}
      <SlideWipe
        direction="left"
        startFrame={SCENE2_END}
        endFrame={SCENE2_END + 30}
        reveal
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: scene3Opacity * outroOpacity,
            backgroundColor: "#000",
          }}
        >
          <Video
            src={videoSrc!}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 50%",
            }}
            startFrom={135}
            endAt={585}
            volume={0}
            loop
          />
          {/* Shadow gradient */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, transparent 80%)",
            }}
          />

          <TextOverlay
            startFrame={SCENE2_END + 45}
            endFrame={SCENE3_END}
            align="center"
            verticalAlign="bottom"
            style={{ paddingBottom: 160 }}
          >
            <h2
              style={{
                fontSize: 82,
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 0.95,
                color: "#fff",
                textTransform: "uppercase",
                textShadow: "0 4px 45px rgba(0,0,0,0.9)",
              }}
            >
              Pedigree In Motion
            </h2>
            <p
              style={{
                marginTop: 20,
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: GOLD,
                textTransform: "uppercase",
                textShadow: "0 2px 24px rgba(0,0,0,0.7)",
              }}
            >
              {pedigreeDetails}
            </p>
          </TextOverlay>
        </div>
      </SlideWipe>

      {/* --- SCENE 4: Conformation Front View (Wipe Transition) --- */}
      <SlideWipe
        direction="up"
        startFrame={SCENE3_END}
        endFrame={SCENE3_END + 30}
        reveal
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: scene4Opacity * outroOpacity,
          }}
        >
          <KenBurnsBackground
            src={frontImage!}
            objectPosition="center 30%"
            startScale={1.12}
            endScale={1.01}
            startX={-10}
            endX={10}
            startFrame={SCENE3_END}
            endFrame={SCENE4_END}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            }}
          />

          <TextOverlay
            startFrame={SCENE3_END + 45}
            endFrame={SCENE4_END}
            align="center"
            verticalAlign="bottom"
            style={{ paddingBottom: 160 }}
          >
            <h2
              style={{
                fontSize: 84,
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                color: "#fff",
                textTransform: "uppercase",
                textShadow: "0 4px 40px rgba(0,0,0,0.85)",
              }}
            >
              {ageType}
            </h2>
            <p
              style={{
                marginTop: 20,
                fontSize: 34,
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: GOLD,
                textTransform: "uppercase",
                textShadow: "0 2px 24px rgba(0,0,0,0.7)",
              }}
            >
              Ready For Stabling
            </p>
          </TextOverlay>
        </div>
      </SlideWipe>

      {/* --- SCENE 5: Outro Branded CTA Card --- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: DARK_BG,
          opacity: lockupOpacity * outroOpacity,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            transform: `scale(${lockupScale})`,
            filter: "drop-shadow(0 4px 30px rgba(0,0,0,0.4))",
          }}
        >
          <img
            src={staticFile("monogram-gold.svg")}
            style={{
              width: 160,
              height: "auto",
              marginBottom: 28,
            }}
          />
          <img
            src={staticFile("wordmark-gold.svg")}
            style={{
              width: 380,
              height: "auto",
            }}
          />
        </div>
        <h2
          style={{
            marginTop: 60,
            fontSize: 70,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: GOLD,
            textTransform: "uppercase",
            textAlign: "center",
          }}
        >
          {cta}
        </h2>
        <p
          style={{
            marginTop: 20,
            fontSize: 32,
            fontWeight: 500,
            letterSpacing: "0.14em",
            color: "#fff",
            textTransform: "uppercase",
          }}
        >
          {websiteUrl}
        </p>
      </div>
      {/* Corner Watermark (Scenes 2, 3, and 4) */}
      {watermarkSrc && frame >= SCENE1_END && frame < SCENE4_END && (
        <img
          src={watermarkSrc}
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            width: 90,
            height: "auto",
            zIndex: 100,
            opacity: 0.65,
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.45))",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
