import React, { useState } from "react";
import type { Direction } from "../types/gameTypes";
import { bigPadContainerStyle, bigPadButtonStyle } from "../styles/gameStyles";

interface MobileControlsProps {
  onDirectionChange: (dir: Direction) => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange }) => {
  const [activeDir, setActiveDir] = useState<Direction>(null);

  const handlePadPress = (e: React.PointerEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    let chosenDir: Direction;
    if (Math.abs(dx) > Math.abs(dy)) {
      chosenDir = dx > 0 ? "RIGHT" : "LEFT";
    } else {
      chosenDir = dy > 0 ? "DOWN" : "UP";
    }

    setActiveDir(chosenDir);
    onDirectionChange(chosenDir);
  };

  return (
    <div style={bigPadContainerStyle}>
      <button
        type="button"
        aria-label="Directional Touch Pad"
        onPointerDown={handlePadPress}
        onPointerUp={() => setActiveDir(null)}
        onPointerLeave={() => setActiveDir(null)}
        style={{
          ...bigPadButtonStyle,
          transform: activeDir ? "scale(0.97)" : "scale(1)",
          transition: "transform 0.08s ease",
        }}
      >
        <div style={diagonalLineOneStyle} />
        <div style={diagonalLineTwoStyle} />

        <span style={{ ...arrowLabelStyle, top: "14px", color: activeDir === "UP" ? "#007bff" : "#888" }}>
          ▲
        </span>
        <span style={{ ...arrowLabelStyle, bottom: "14px", color: activeDir === "DOWN" ? "#007bff" : "#888" }}>
          ▼
        </span>
        <span style={{ ...arrowLabelStyle, left: "16px", color: activeDir === "LEFT" ? "#007bff" : "#888" }}>
          ◀
        </span>
        <span style={{ ...arrowLabelStyle, right: "16px", color: activeDir === "RIGHT" ? "#007bff" : "#888" }}>
          ▶
        </span>

        <div style={centerDotStyle} />
      </button>
    </div>
  );
};

const arrowLabelStyle: React.CSSProperties = {
  position: "absolute",
  fontSize: "1rem",
  fontWeight: 700,
  pointerEvents: "none",
};

const centerDotStyle: React.CSSProperties = {
  width: "14px",
  height: "14px",
  borderRadius: "50%",
  backgroundColor: "#eaeaea",
  pointerEvents: "none",
};

const diagonalLineOneStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "1px",
  backgroundColor: "#f2f2f2",
  transform: "rotate(45deg)",
  pointerEvents: "none",
};

const diagonalLineTwoStyle: React.CSSProperties = {
  position: "absolute",
  width: "100%",
  height: "1px",
  backgroundColor: "#f2f2f2",
  transform: "rotate(-45deg)",
  pointerEvents: "none",
};