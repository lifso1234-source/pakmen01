import React, { useRef } from "react";
import { usePacmanGame } from "./hooks/usePacmanGame";
import { ScoreBoard } from "./components/ScoreBoard";
import { GameCanvas } from "./components/GameCanvas";
import { MobileControls } from "./components/MobileControls";
import { appContainerStyle } from "./styles/gameStyles";

export const App: React.FC = () => {
  const { grid, pacman, ghosts, score, highScore, isGameOver, setDirection, resetGame } =
    usePacmanGame();

  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 20) {
      setDirection(dx > 0 ? "RIGHT" : "LEFT");
    } else if (Math.abs(dy) > 20) {
      setDirection(dy > 0 ? "DOWN" : "UP");
    }
    touchStartRef.current = null;
  };

  return (
    <div
      style={appContainerStyle}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <ScoreBoard score={score} highScore={highScore} />
      <GameCanvas
        grid={grid}
        pacman={pacman}
        ghosts={ghosts}
        isGameOver={isGameOver}
        onReset={resetGame}
      />
      <MobileControls onDirectionChange={setDirection} />
    </div>
  );
};

export default App;