import React, { useEffect, useRef, useState } from "react";
import type { Ghost, GhostType, Position } from "../types/gameTypes";
import { canvasWrapperStyle, legendRowStyle, primaryBtnStyle } from "../styles/gameStyles";

// Direct Vite ES imports from src/components/sprites/
import playerSrc from "./sprites/player.png";
import ghost1Src from "./sprites/ghost-1.png";
import ghost2Src from "./sprites/ghost-2.png";
import ghost3Src from "./sprites/ghost-3.png";

interface GameCanvasProps {
  grid: number[][];
  pacman: Position;
  ghosts: Ghost[];
  status: "PLAYING" | "GAME_OVER" | "VICTORY";
  onReset: () => void;
}

const GHOST_RING_COLORS: Record<GhostType, string> = {
  chaser: "#ff4d4f",
  ambusher: "#ff85c0",
  sprinter: "#fa8c16",
  teleporter: "#722ed1",
};

const GHOST_IMAGE_KEYS: Record<GhostType, string> = {
  chaser: "ghost1",
  ambusher: "ghost2",
  sprinter: "ghost3",
  teleporter: "ghost1",
};

const CROP_PRESETS: Record<string, { x: number; y: number; size: number }> = {
  player: { x: 0.54, y: 0.25, size: 0.4 },
  ghost1: { x: 0.2, y: 0, size: 1 },
  ghost2: { x: 0.5, y: 0.10, size: 0.6 },
  ghost3: { x: 0.3, y: 0.1, size: 0.5 },
};

export const GameCanvas: React.FC<GameCanvasProps> = ({
  grid,
  pacman,
  ghosts,
  status,
  onReset,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const spritesRef = useRef<Record<string, HTMLImageElement>>({});
  const [imagesReady, setImagesReady] = useState(0);

  useEffect(() => {
    const sources: Record<string, string> = {
      player: playerSrc,
      ghost1: ghost1Src,
      ghost2: ghost2Src,
      ghost3: ghost3Src,
    };

    Object.entries(sources).forEach(([key, src]) => {
      const img = new Image();
      img.onload = () => setImagesReady((n) => n + 1);
      img.src = src;
      spritesRef.current[key] = img;
    });
  }, []);

  const drawCircularAvatar = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement | undefined,
    presetKey: string,
    centerX: number,
    centerY: number,
    radius: number,
    ringColor: string
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    if (img?.complete && img.naturalWidth > 0) {
      const preset = CROP_PRESETS[presetKey];
      const minDim = Math.min(img.naturalWidth, img.naturalHeight);
      const cropSize = minDim * preset.size;
      const sx = img.naturalWidth * preset.x;
      const sy = img.naturalHeight * preset.y;

      ctx.drawImage(
        img,
        sx,
        sy,
        cropSize,
        cropSize,
        centerX - radius,
        centerY - radius,
        radius * 2,
        radius * 2
      );
    } else {
      ctx.fillStyle = ringColor;
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
    }
    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = ringColor;
    ctx.lineWidth = 2;
    ctx.stroke();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 456;
    const tile = size / grid.length;
    ctx.clearRect(0, 0, size, size);

    // 1. Draw Maze Walls & Dots
    grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell === 1) {
          ctx.fillStyle = "#111111";
          ctx.fillRect(x * tile + 1, y * tile + 1, tile - 2, tile - 2);
        } else if (cell === 0) {
          ctx.fillStyle = "#bbbbbb";
          ctx.beginPath();
          ctx.arc(x * tile + tile / 2, y * tile + tile / 2, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    });

    // 2. Draw Player Avatar
    drawCircularAvatar(
      ctx,
      spritesRef.current.player,
      "player",
      pacman.x * tile + tile / 2,
      pacman.y * tile + tile / 2,
      tile * 0.72,
      "#f5b800"
    );

    // 3. Draw Ghost Avatars
    ghosts.forEach((g) => {
      const imgKey = GHOST_IMAGE_KEYS[g.type];
      drawCircularAvatar(
        ctx,
        spritesRef.current[imgKey],
        imgKey,
        g.pos.x * tile + tile / 2,
        g.pos.y * tile + tile / 2,
        tile * 0.72,
        GHOST_RING_COLORS[g.type]
      );
    });
  }, [grid, pacman, ghosts, imagesReady]);

  return (
    <div style={{ width: "100%" }}>
      <div style={canvasWrapperStyle}>
        <canvas
          ref={canvasRef}
          width={456}
          height={456}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        {status !== "PLAYING" && (
          <div style={overlayStyle}>
            <h3 style={{ margin: "0 0 0.75rem 0" }}>
              {status === "VICTORY" ? "All 10 Levels Cleared!" : "Game Over"}
            </h3>
            <button style={primaryBtnStyle} onClick={onReset}>
              Play Again
            </button>
          </div>
        )}
      </div>
      <div style={legendRowStyle}>
        <span>🔴 Chaser</span>
        <span>🩷 Ambusher</span>
        <span>🟠 Sprinter</span>
        <span>🟣 Teleporter</span>
      </div>
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