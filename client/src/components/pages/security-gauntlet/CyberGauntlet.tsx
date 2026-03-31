import React, { useState, useCallback } from "react";
import { type GauntletScores, THEME } from "./gauntlet.types";
import Intro from "./Intro";
import CaesarGame from "./CaesarGame";
import KeystoneGame from "./KeystoneGame";
import NetworkGame from "./NetworkGame";
import GradientGame from "./GradientGame";
import Results from "./Results";

type Stage = "intro" | "caesar" | "keystone" | "network" | "gradient" | "results";

const STAGE_ORDER: Stage[] = ["intro", "caesar", "keystone", "network", "gradient", "results"];

function nextStage(current: Stage): Stage {
  const idx = STAGE_ORDER.indexOf(current);
  return STAGE_ORDER[Math.min(idx + 1, STAGE_ORDER.length - 1)];
}

export default function CyberGauntlet() {
  const [stage, setStage] = useState<Stage>("intro");
  const [scores, setScores] = useState<GauntletScores>({
    caesar: 0,
    keystone: 0,
    network: 0,
    gradient: 0,
  });

  const handleGameComplete = useCallback((game: keyof GauntletScores) => (score: number) => {
    setScores((prev) => ({ ...prev, [game]: score }));
    setStage((s) => nextStage(s));
  }, []);

  const handleRestart = useCallback(() => {
    setScores({ caesar: 0, keystone: 0, network: 0, gradient: 0 });
    setStage("intro");
  }, []);

  return (
    <div
      style={{
        background: THEME.bg,
        borderRadius: 12,
        overflow: "hidden",
        fontFamily: "var(--font-sans, system-ui, sans-serif)",
        minHeight: 520,
        color: THEME.textPrimary,
        position: "relative",
      }}
    >
      {/* Stage indicator dots */}
      {stage !== "intro" && stage !== "results" && (
        <div
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
            gap: 6,
            zIndex: 10,
          }}
        >
          {(["caesar", "keystone", "network", "gradient"] as const).map((s) => {
            const idx = STAGE_ORDER.indexOf(s);
            const currentIdx = STAGE_ORDER.indexOf(stage);
            const done = idx < currentIdx;
            const active = s === stage;
            return (
              <div
                key={s}
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: done ? THEME.green : active ? THEME.textPrimary : THEME.textDim,
                  transition: "background 0.3s",
                }}
              />
            );
          })}
        </div>
      )}

      {stage === "intro" && <Intro onStart={() => setStage("caesar")} />}
      {stage === "caesar" && <CaesarGame onComplete={handleGameComplete("caesar")} />}
      {stage === "keystone" && <KeystoneGame onComplete={handleGameComplete("keystone")} />}
      {stage === "network" && <NetworkGame onComplete={handleGameComplete("network")} />}
      {stage === "gradient" && <GradientGame onComplete={handleGameComplete("gradient")} />}
      {stage === "results" && <Results scores={scores} onRestart={handleRestart} />}
    </div>
  );
}
