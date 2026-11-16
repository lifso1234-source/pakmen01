import React from "react";
import { statsGridStyle, cardStyle, statNumberStyle } from "../styles/gameStyles";
import type { ScoreBoxParams } from "../types/gameTypes";

interface ScoreBoardProps {
  score: number;
  highScore: number;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ score, highScore }) => {
  const boxes: ScoreBoxParams[] = [
    { title: "SCORE", value: String(score), style: statNumberStyle },
    { title: "BEST", value: String(highScore), style: { ...statNumberStyle, color: "#007bff" } },
  ];

  return (
    <div style={statsGridStyle}>
      {boxes.map((box) => (
        <div key={box.title} style={cardStyle}>
          <span style={{ fontSize: "0.75rem", color: "#888", letterSpacing: "0.05em" }}>
            {box.title}
          </span>
          <p style={box.style}>{box.value}</p>
        </div>
      ))}
    </div>
  );
};