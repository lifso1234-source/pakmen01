import React from "react";
import type { Direction } from "../types/gameTypes";
import { dpadGridStyle, dpadBtnStyle } from "../styles/gameStyles";

interface MobileControlsProps {
  onDirectionChange: (dir: Direction) => void;
}

export const MobileControls: React.FC<MobileControlsProps> = ({ onDirectionChange }) => {
  return (
    <div style={dpadGridStyle}>
      <div />
      <button style={dpadBtnStyle} onClick={() => onDirectionChange("UP")} aria-label="Up">
        ↑
      </button>
      <div />
      <button style={dpadBtnStyle} onClick={() => onDirectionChange("LEFT")} aria-label="Left">
        ←
      </button>
      <button style={dpadBtnStyle} onClick={() => onDirectionChange("DOWN")} aria-label="Down">
        ↓
      </button>
      <button style={dpadBtnStyle} onClick={() => onDirectionChange("RIGHT")} aria-label="Right">
        →
      </button>
    </div>
  );
};