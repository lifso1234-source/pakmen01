import React, { useEffect, useRef } from "react";
import type { Ghost, Position } from "../types/gameTypes";
import { canvasWrapperStyle, primaryBtnStyle } from "../styles/gameStyles";

interface GameCanvasProps {
  grid: number[][];
  pacman: Position;
  ghosts: Ghost[];
  isGameOver: boolean;
  onReset: () => void;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  grid,
  pacman,
  ghosts,
  isGameOver,
  onReset,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pacmanImgRef = useRef<HTMLImageElement | null>(null);
  const ghostImgRef = useRef<HTMLImageElement | null>(null);

  // Preload picture icons once
  useEffect(() => {
    const pImg = new Image();
    pImg.src = "/sprites/pacman.png";
    pacmanImgRef.current = pImg;

    const gImg = new Image();
    gImg.src = "/sprites/ghost.png";
    ghostImgRef.current = gImg;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 330;
    const tile = size / grid.length;
    ctx.clearRect(0, 0, size, size);

    // Draw Minimalist Grid & Dots
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillStyle = "#111111";
          ctx.fillRect(x * tile + 1, y * tile + 1, tile - 2, tile - 2);
        } else if (cell === 0) {
          ctx.fillStyle = "#bbbbbb";
          ctx.beginPath();
          ctx.arc(x * tile + tile / 2, y * tile + tile / 2, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    });

    // Draw Pac-Man Picture (with yellow circle fallback if image isn't loaded yet)
    if (pacmanImgRef.current?.complete && pacmanImgRef.current.naturalWidth > 0) {
      ctx.drawImage(pacmanImgRef.current, pacman.x * tile + 2, pacman.y * tile + 2, tile - 4, tile - 4);
    } else {
      ctx.fillStyle = "#f5b800";
      ctx.beginPath();
      ctx.arc(pacman.x * tile + tile / 2, pacman.y * tile + tile / 2, tile / 2.4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw Ghost Pictures (with coral circle fallback)
    ghosts.forEach((g) => {
      if (ghostImgRef.current?.complete && ghostImgRef.current.naturalWidth > 0) {
        ctx.drawImage(ghostImgRef.current, g.pos.x * tile + 2, g.pos.y * tile + 2, tile - 4, tile - 4);
      } else {
        ctx.fillStyle = "#ff4d4f";
        ctx.beginPath();
        ctx.arc(g.pos.x * tile + tile / 2, g.pos.y * tile + tile / 2, tile / 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }, [grid, pacman, ghosts]);

  return (
    <div style={canvasWrapperStyle}>
      <canvas
        ref={canvasRef}
        width={330}
        height={330}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
      {isGameOver && (
        <div style={overlayStyle}>
          <h3 style={{ margin: "0 0 0.75rem 0" }}>Game Over</h3>
          <button style={primaryBtnStyle} onClick={onReset}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

const overlayStyle: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};