import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";

const GOLD = "#d4a964";

// Full-bleed background image helper
const BackgroundImage: React.FC<{
  src: string;
  objectPosition?: string;
  scale?: number;
  x?: number;
}> = ({ src, objectPosition = "center center", scale = 1, x = 0 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      backgroundImage: `url(${src})`,
      backgroundSize: "cover",
      backgroundPosition: objectPosition,
      backgroundRepeat: "no-repeat",
      transform: `scale(${scale}) translateX(${x}px)`,
    }}
  />
);

export const EvolutionStablesIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ========== SCENE 1: EVOLUTION STABLES TITLE CARD (0-90f / 0-3s) ==========
  const titleSlide = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });
  const titleY = interpolate(titleSlide, [0, 1], [60, 0]);
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taglineSlide = spring({
    frame: frame - 45,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 80 },
  });
  const taglineY = interpolate(taglineSlide, [0, 1], [30, 0]);
  const taglineOpacity = interpolate(frame, [45, 75], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ========== SCENE 2: HORSE GALLOP (90-210f / 3-7s) ==========
  const scene2Opacity = interpolate(frame, [90, 105, 195, 210], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const horseScale = interpolate(frame, [90, 210], [1.12, 1.0], {
    extrapolateRight: "clamp",
  });
  const horseX = interpolate(frame, [90, 210], [40, -20], {
    extrapolateRight: "clamp",
  });

  // ========== SCENE 3: PRUDENTIA RACE SCENE (210-330f / 7-11s) ==========
  const scene3Opacity = interpolate(
    frame,
    [210, 225, 315, 330],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const raceScale = interpolate(frame, [210, 330], [1.08, 1.0], {
    extrapolateRight: "clamp",
  });

  const prudentiaSlide = spring({
    frame: frame - 240,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });
  const prudentiaY = interpolate(prudentiaSlide, [0, 1], [50, 0]);
  const prudentiaOpacity = interpolate(frame, [240, 270], [0, 1], {
    extrapolateRight: "clamp",
  });

  const taurangeOpacity = interpolate(frame, [270, 300], [0, 1], {
    extrapolateRight: "clamp",
  });

  // ========== SCENE 4: MASA HASHIZUME JOCKEY (330-450f / 11-15s) ==========
  const scene4Opacity = interpolate(
    frame,
    [330, 345, 435, 450],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );
  const jockeyScale = interpolate(frame, [330, 450], [1.05, 1.0], {
    extrapolateRight: "clamp",
  });

  const confirmedOpacity = interpolate(frame, [360, 390], [0, 1], {
    extrapolateRight: "clamp",
  });
  const joinSlide = spring({
    frame: frame - 405,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 90 },
  });
  const joinScale = interpolate(joinSlide, [0, 1], [0.9, 1]);
  const joinOpacity = interpolate(frame, [405, 435], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Fade everything out at end
  const outroOpacity = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames - 5],
    [1, 0],
    { extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#000",
        overflow: "hidden",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* --- SCENE 1: Title card --- */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#0a0a0a",
          opacity: interpolate(
            frame,
            [0, 15, 75, 90],
            [1, 1, 1, 0],
            { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
          ),
        }}
      >
        <h1
          style={{
            fontSize: 120,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            color: "#fff",
            textTransform: "uppercase",
            textAlign: "center",
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          Evolution Stables
        </h1>
        <p
          style={{
            marginTop: 24,
            fontSize: 56,
            fontWeight: 300,
            letterSpacing: "0.05em",
            color: GOLD,
            fontFamily: "'Brush Script MT', 'Comic Sans MS', cursive",
            textAlign: "center",
            transform: `translateY(${taglineY}px)`,
            opacity: taglineOpacity,
          }}
        >
          Ownership Evolved
        </p>
      </div>

      {/* --- SCENE 2: Horse gallop --- */}
      <div
        className="absolute inset-0"
        style={{ opacity: scene2Opacity * outroOpacity }}
      >
        <BackgroundImage
          src={staticFile("horse_gallop_sunlight.png")}
          objectPosition="center 30%"
          scale={horseScale}
          x={horseX}
        />
      </div>

      {/* --- SCENE 3: Prudentia race --- */}
      <div
        className="absolute inset-0"
        style={{ opacity: scene3Opacity * outroOpacity }}
      >
        <BackgroundImage
          src={staticFile("race_scene.png")}
          objectPosition="center 40%"
          scale={raceScale}
        />
        {/* Dark gradient for text */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 96,
          }}
        >
          <h2
            style={{
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              color: "#fff",
              textTransform: "uppercase",
              textShadow: "0 4px 30px rgba(0,0,0,0.8)",
              transform: `translateY(${prudentiaY}px)`,
              opacity: prudentiaOpacity,
            }}
          >
            Prudentia
          </h2>
          <p
            style={{
              marginTop: 16,
              fontSize: 40,
              fontWeight: 600,
              letterSpacing: "0.15em",
              color: GOLD,
              textTransform: "uppercase",
              textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              opacity: taurangeOpacity,
            }}
          >
            Taurange 27 June
          </p>
        </div>
      </div>

      {/* --- SCENE 4: Masa Hashizume jockey --- */}
      <div
        className="absolute inset-0"
        style={{ opacity: scene4Opacity * outroOpacity }}
      >
        <BackgroundImage
          src={staticFile("jockey_masa.png")}
          objectPosition="center 25%"
          scale={jockeyScale}
        />
        {/* Dark vignette for contrast */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              padding: "32px 64px",
              borderRadius: 8,
              backgroundColor: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p
              style={{
                fontSize: 44,
                fontWeight: 700,
                letterSpacing: "0.12em",
                color: "#fff",
                textTransform: "uppercase",
                textShadow: "0 4px 30px rgba(0,0,0,0.9)",
                opacity: confirmedOpacity,
              }}
            >
              Confirmed: Masa Hashizume
            </p>
            <h2
              style={{
                marginTop: 24,
                fontSize: 90,
                fontWeight: 900,
                letterSpacing: "-0.02em",
                color: "#fff",
                textTransform: "uppercase",
                textShadow: "0 4px 40px rgba(0,0,0,0.95)",
                transform: `scale(${joinScale})`,
                opacity: joinOpacity,
              }}
            >
              Join the Evolution
            </h2>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
