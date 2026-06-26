import { Composition } from "remotion";
import { HelloWorld } from "./compositions/HelloWorld";
import { PrudentiaTeaser } from "./compositions/PrudentiaTeaser";
import {
  EvolutionStablesIntro,
  defaultEvolutionStablesIntroProps,
} from "./compositions/EvolutionStablesIntro";
import {
  AlmanzorNightDanzaPromo,
  defaultAlmanzorNightDanzaProps,
} from "./compositions/AlmanzorNightDanzaPromo";

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
      <Composition
        id="EvolutionStablesIntro"
        component={EvolutionStablesIntro}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultEvolutionStablesIntroProps}
      />
      <Composition
        id="AlmanzorNightDanzaPromo"
        component={AlmanzorNightDanzaPromo}
        durationInFrames={1200}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultAlmanzorNightDanzaProps}
      />
    </>
  );
};