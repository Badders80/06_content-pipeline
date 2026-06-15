import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Img,
} from "remotion";
import { KenBurnsBackground } from "../components/KenBurnsBackground";
import { SlideWipe } from "../components/SlideWipe";
import { TextOverlay } from "../components/TextOverlay";

const GOLD = "#d4a964";
const DARK_BG = "#0a0a0a";

// ---------------------------------------------------------------------------
// Props interface — fully reusable for any Evolution Stables horse promo.
// ---------------------------------------------------------------------------
export interface EvolutionStablesIntroProps {
  brandName?: string;
  tagline?: string;
  horseName?: string;
  raceLocation?: string;
  raceDate?: string;
  jockeyName?: string;
  cta?: string;
  websiteUrl?: string;
  watermarkSrc?: string;
  lockupSrc?: string;
  horseImage?: string;
  raceImage?: string;
  jockeyImage?: string;
}

export const defaultEvolutionStablesIntroProps: EvolutionStablesIntroProps = {
  brandName: "Evolution Stables",
  tagline: "Ownership Evolved",
  horseName: "Prudentia",
  raceLocation: "Tauranga",
  raceDate: "27 June",
  jockeyName: "Masa Hashizume",
  cta: "Join the Evolution",
  websiteUrl: "evolutionstables.nz",
  watermarkSrc: staticFile("wordmark-gold.svg"),
  lockupSrc: staticFile("lockup-vertical-border-grey.svg"),
  horseImage: staticFile("horse_gallop_sunlight.png"),
  raceImage: staticFile("race_scene.png"),
  jockeyImage: staticFile("jockey_masa.png"),
};

export const EvolutionStablesIntro: React.FC<
  EvolutionStablesIntroProps
> = (props) => {
  const {
    brandName,
    tagline,
    horseName,
    raceLocation,
    raceDate,
    jockeyName,
    cta,
    websiteUrl,
    watermarkSrc,
    lockupSrc,
    horseImage,
    raceImage,
    jockeyImage,
  } = { ...defaultEvolutionStablesIntroProps, ...props };

  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Scene timing (frames @ 30fps)
  const SCENE1_END = 180; // 0-6s: title card
  const SCENE2_END = 450; // 6-15s: horse gallop
  const SCENE3_END = 750; // 15-25s: Prudentia race
  const SCENE4_END = 1050; // 25-35s: jockey + CTA
  // 35-40s: branded lockup

  // Global end fade
  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  // ========== SCENE 1: TITLE CARD (0-6s) ==========
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [80, 0]);
  const titleOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineSpring = spring({
    frame: frame - 90,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 80 },
  });
  const taglineY = interpolate(taglineSpring, [0, 1], [40, 0]);
  const taglineOpacity = interpolate(frame, [90, 130], [0, 1], {
    extrapolateRight: "clamp",
  });

  const watermarkOpacity = interpolate(frame, [120, 150], [0, 0.35], {
    extrapolateRight: "clamp",
  });

  // ========== SCENE 2: HORSE GALLOP KEN BURNS (6-15s) ==========
  const scene2Opacity = interpolate(
    frame,
    [SCENE1_END, SCENE1_END + 20, SCENE2_END - 20, SCENE2_END],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ========== SCENE 3: PRUDENTIA RACE (15-25s) ==========
  const scene3Opacity = interpolate(
    frame,
    [SCENE2_END, SCENE2_END + 20, SCENE3_END - 20, SCENE3_END],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  // ========== SCENE 4: JOCKEY + CTA (25-35s) ==========
  const scene4Opacity = interpolate(
    frame,
    [SCENE3_END, SCENE3_END + 20, SCENE4_END - 20, SCENE4_END],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const confirmedOpacity = interpolate(
    frame,
    [SCENE3_END + 60, SCENE3_END + 100],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  const ctaSpring = spring({
    frame: frame - (SCENE3_END + 150),
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 90 },
  });
  const ctaScale = interpolate(ctaSpring, [0, 1], [0.88, 1]);
  const ctaOpacity = interpolate(
    frame,
    [SCENE3_END + 150, SCENE3_END + 190],
    [0, 1],
    { extrapolateRight: "clamp" }
  );

  // ========== SCENE 5: BRANDED LOCKUP (35-40s) ==========
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
      {/* --- SCENE 1: Title card --- */}
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
            fontSize: 92,
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
            fontSize: 52,
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

        {/* Subtle watermark lockup at top */}
        {lockupSrc && (
          <img
            src={lockupSrc}
            style={{
              position: "absolute",
              top: 80,
              width: 160,
              height: "auto",
              opacity: watermarkOpacity,
              filter: "brightness(2.5) drop-shadow(0 4px 20px rgba(0,0,0,0.5))",
            }}
          />
        )}
      </div>

      {/* --- SCENE 2: Horse gallop Ken Burns --- */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: scene2Opacity * outroOpacity,
        }}
      >
        <KenBurnsBackground
          src={horseImage!}
          objectPosition="center 35%"
          startScale={1.18}
          endScale={1.02}
          startX={30}
          endX={-20}
          startFrame={SCENE1_END}
          endFrame={SCENE2_END}
        />
        {/* Bottom gradient for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* --- SCENE 3: Prudentia race with slide wipe --- */}
      <SlideWipe
        direction="left"
        startFrame={SCENE2_END}
        endFrame={SCENE2_END + 60}
        reveal
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: scene3Opacity * outroOpacity,
          }}
        >
          <KenBurnsBackground
            src={raceImage!}
            objectPosition="center 40%"
            startScale={1.12}
            endScale={1.0}
            startFrame={SCENE2_END}
            endFrame={SCENE3_END}
          />
          {/* Bottom-up gradient for text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, transparent 100%)",
            }}
          />

          <TextOverlay
            startFrame={SCENE2_END + 60}
            endFrame={SCENE3_END}
            align="center"
            verticalAlign="bottom"
          >
            <h2
              style={{
                fontSize: 120,
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
                fontSize: 38,
                fontWeight: 600,
                letterSpacing: "0.18em",
                color: GOLD,
                textTransform: "uppercase",
                textShadow: "0 2px 24px rgba(0,0,0,0.7)",
              }}
            >
              {raceLocation} {raceDate}
            </p>
          </TextOverlay>
        </div>
      </SlideWipe>

      {/* --- SCENE 4: Jockey + CTA with broadcast-style 3D overlap --- */}
      <SlideWipe
        direction="up"
        startFrame={SCENE3_END}
        endFrame={SCENE3_END + 60}
        reveal
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: scene4Opacity * outroOpacity,
          }}
        >
          {/* Layer 1a: dark top surface so the background name reads */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "42%",
              zIndex: 1,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 70%, transparent 100%)",
              opacity: confirmedOpacity,
            }}
          />

          {/* Layer 1b: massive stacked jockey name BEHIND the subject */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingTop: 55,
              opacity: confirmedOpacity,
            }}
          >
            <span
              style={{
                fontSize: 165,
                fontWeight: 900,
                letterSpacing: "0.06em",
                lineHeight: 0.75,
                color: "#fff",
                textTransform: "uppercase",
                textShadow: "0 4px 20px rgba(0,0,0,0.7)",
              }}
            >
              {jockeyName?.split(" ")[0]}
            </span>
            <span
              style={{
                fontSize: 165,
                fontWeight: 900,
                letterSpacing: "0.06em",
                lineHeight: 0.75,
                color: "#fff",
                textTransform: "uppercase",
                textShadow: "0 4px 20px rgba(0,0,0,0.7)",
              }}
            >
              {jockeyName?.split(" ").slice(1).join(" ")}
            </span>
          </div>

          {/* Layer 2: jockey image sits IN FRONT of the background name */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
            <KenBurnsBackground
              src={jockeyImage!}
              objectPosition="center 22%"
              startScale={1.05}
              endScale={1.0}
              startFrame={SCENE3_END}
              endFrame={SCENE4_END}
            />
          </div>

          {/* Layer 3: bottom gradient for foreground readability */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 3,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 30%, transparent 65%)",
            }}
          />

          {/* Layer 4: foreground CTA + confirmed pill IN FRONT of everything */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingBottom: 110,
              opacity: ctaOpacity,
            }}
          >
            {/* Confirmed pill */}
            <div
              style={{
                padding: "10px 24px",
                borderRadius: 999,
                backgroundColor: GOLD,
                marginBottom: 20,
                transform: `scale(${ctaScale})`,
              }}
            >
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "0.16em",
                  color: "#000",
                  textTransform: "uppercase",
                }}
              >
                Confirmed Rider
              </span>
            </div>

            <h2
              style={{
                fontSize: 76,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                lineHeight: 0.92,
                color: "#fff",
                textTransform: "uppercase",
                textAlign: "center",
                textShadow: "0 4px 40px rgba(0,0,0,0.95)",
                transform: `scale(${ctaScale})`,
              }}
            >
              {cta}
            </h2>
            <p
              style={{
                marginTop: 18,
                fontSize: 26,
                fontWeight: 500,
                letterSpacing: "0.14em",
                color: GOLD,
                textTransform: "uppercase",
              }}
            >
              {websiteUrl}
            </p>
          </div>
        </div>
      </SlideWipe>

      {/* --- SCENE 5: Branded lockup --- */}
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
        {lockupSrc && (
          <img
            src={lockupSrc}
            style={{
              width: 480,
              height: "auto",
              transform: `scale(${lockupScale})`,
              filter: "brightness(3) drop-shadow(0 0 50px rgba(212,169,100,0.25))",
            }}
          />
        )}
        <p
          style={{
            marginTop: 40,
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: "0.14em",
            color: GOLD,
            textTransform: "uppercase",
          }}
        >
          {websiteUrl}
        </p>
      </div>
    </AbsoluteFill>
  );
};
