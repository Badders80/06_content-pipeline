import { Composition } from "remotion";
import { HelloWorld } from "./compositions/HelloWorld";
import { PrudentiaTeaser } from "./compositions/PrudentiaTeaser";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          title: "Content Pipeline",
          subtitle: "Deterministic. Code-driven. Frame-perfect.",
        }}
      />
      <Composition
        id="PrudentiaTeaser"
        component={PrudentiaTeaser}
        durationInFrames={270}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};