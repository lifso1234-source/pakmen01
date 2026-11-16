import { useState, useEffect, useCallback } from "react";
import type { Direction, Position, Ghost } from "../types/gameTypes";

// 0 = Dot, 1 = Wall, 2 = Empty
const INITIAL_MAP: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,1,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,2,0,0,0,0,1],
  [1,0,1,0,1,1,1,0,1,0,1],
  [1,0,0,0,0,0,0,0,0,0,1],
  [1,0,1,1,0,1,0,1,1,0,1],
  [1,0,0,0,0,1,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1],
];

const DIRECTIONS: Record<Exclude<Direction, null>, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const usePacmanGame = () => {
  const [grid, setGrid] = useState<number[][]>(() => INITIAL_MAP.map((r) => [...r]));
  const [pacman, setPacman] = useState<Position>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>(null);
  const [ghosts, setGhosts] = useState<Ghost[]>([
    { id: "g1", pos: { x: 1, y: 1 }, dir: "RIGHT", sprite: "/sprites/ghost.png" },
    { id: "g2", pos: { x: 9, y: 9 }, dir: "LEFT", sprite: "/sprites/ghost.png" },
  ]);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() =>
    Number(localStorage.getItem("pacman_best") || 0)
  );
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  const resetGame = useCallback(() => {
    setGrid(INITIAL_MAP.map((r) => [...r]));
    setPacman({ x: 5, y: 5 });
    setDirection(null);
    setGhosts([
      { id: "g1", pos: { x: 1, y: 1 }, dir: "RIGHT", sprite: "/sprites/ghost.png" },
      { id: "g2", pos: { x: 9, y: 9 }, dir: "LEFT", sprite: "/sprites/ghost.png" },
    ]);
    setScore(0);
    setIsGameOver(false);
  }, []);

  useEffect(() => {
    if (isGameOver) return;

    const tick = setInterval(() => {
      // Move Pac-Man
      setPacman((prev) => {
        if (!direction) return prev;
        const delta = DIRECTIONS[direction];
        const nextX = prev.x + delta.x;
        const nextY = prev.y + delta.y;

        if (grid[nextY]?.[nextX] === 1) return prev;

        // Collect Dot
        if (grid[nextY]?.[nextX] === 0) {
          setGrid((g) => {
            const copy = g.map((row) => [...row]);
            copy[nextY][nextX] = 2;
            return copy;
          });
          setScore((s) => {
            const updated = s + 10;
            if (updated > highScore) {
              setHighScore(updated);
              localStorage.setItem("pacman_best", String(updated));
            }
            return updated;
          });
        }

        return { x: nextX, y: nextY };
      });

      // Move Ghosts randomly along valid corridors
      setGhosts((prevGhosts) =>
        prevGhosts.map((ghost) => {
          const validDirs = (Object.keys(DIRECTIONS) as Exclude<Direction, null>[]).filter((d) => {
            const nx = ghost.pos.x + DIRECTIONS[d].x;
            const ny = ghost.pos.y + DIRECTIONS[d].y;
            return grid[ny]?.[nx] !== 1;
          });

          const chosenDir =
            validDirs.includes(ghost.dir!) && Math.random() > 0.25
              ? ghost.dir!
              : validDirs[Math.floor(Math.random() * validDirs.length)];

          if (!chosenDir) return ghost;
          return {
            ...ghost,
            dir: chosenDir,
            pos: {
              x: ghost.pos.x + DIRECTIONS[chosenDir].x,
              y: ghost.pos.y + DIRECTIONS[chosenDir].y,
            },
          };
        })
      );
    }, 240);

    return () => clearInterval(tick);
  }, [direction, grid, highScore, isGameOver]);

  // Collision Check
  useEffect(() => {
    const hit = ghosts.some((g) => g.pos.x === pacman.x && g.pos.y === pacman.y);
    const won = grid.every((row) => row.every((cell) => cell !== 0));
    if (hit || won) setIsGameOver(true);
  }, [pacman, ghosts, grid]);

  return { grid, pacman, ghosts, score, highScore, isGameOver, setDirection, resetGame };
};