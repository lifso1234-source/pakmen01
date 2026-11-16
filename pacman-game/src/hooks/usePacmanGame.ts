import { useState, useEffect, useCallback, useRef } from "react";
import type { Direction, Position, Ghost } from "../types/gameTypes";
import { LEVELS } from "../data/levels";

const DIRECTIONS: Record<Exclude<Direction, null>, Position> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const OPPOSITE: Record<Exclude<Direction, null>, Exclude<Direction, null>> = {
  UP: "DOWN",
  DOWN: "UP",
  LEFT: "RIGHT",
  RIGHT: "LEFT",
};

const wrapCoord = (val: number, size: number) => (val + size) % size;

const buildGhostsForLevel = (levelIdx: number): Ghost[] =>
  LEVELS[levelIdx].ghosts.map((g, i) => ({
    id: `g-${levelIdx}-${i}`,
    type: g.type,
    pos: { ...g.startPos },
    dir: "UP",
  }));

export const usePacmanGame = () => {
  const [levelIndex, setLevelIndex] = useState<number>(0);
  const [grid, setGrid] = useState<number[][]>(() => LEVELS[0].map.map((r) => [...r]));
  const [pacman, setPacman] = useState<Position>({ x: 9, y: 12 });
  const [direction, setDirection] = useState<Direction>(null);
  const [ghosts, setGhosts] = useState<Ghost[]>(() => buildGhostsForLevel(0));
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() =>
    Number(localStorage.getItem("pacman_best") || 0)
  );
  const [status, setStatus] = useState<"PLAYING" | "GAME_OVER" | "VICTORY">("PLAYING");
  const tickCountRef = useRef<number>(0);

  const loadLevel = useCallback((idx: number) => {
    setLevelIndex(idx);
    setGrid(LEVELS[idx].map.map((r) => [...r]));
    setPacman({ x: 9, y: 12 });
    setDirection(null);
    setGhosts(buildGhostsForLevel(idx));
    tickCountRef.current = 0;
  }, []);

  const resetGame = useCallback(() => {
    setScore(0);
    setStatus("PLAYING");
    loadLevel(0);
  }, [loadLevel]);

  const moveGhostStep = useCallback(
    (ghost: Ghost, currentGrid: number[][], pacPos: Position, pacDir: Direction): Ghost => {
      const size = currentGrid.length;

      if (ghost.type === "teleporter" && tickCountRef.current % 12 === 0 && tickCountRef.current > 0) {
        const openTiles: Position[] = [];
        currentGrid.forEach((row, y) =>
          row.forEach((cell, x) => {
            const dist = Math.abs(x - pacPos.x) + Math.abs(y - pacPos.y);
            if (cell !== 1 && dist > 3) openTiles.push({ x, y });
          })
        );
        if (openTiles.length > 0) {
          const dest = openTiles[Math.floor(Math.random() * openTiles.length)];
          return { ...ghost, pos: dest };
        }
      }

      let target: Position = pacPos;
      if (ghost.type === "ambusher" && pacDir) {
        target = {
          x: wrapCoord(pacPos.x + DIRECTIONS[pacDir].x * 3, size),
          y: wrapCoord(pacPos.y + DIRECTIONS[pacDir].y * 3, size),
        };
      }

      const validDirs = (Object.keys(DIRECTIONS) as Exclude<Direction, null>[]).filter((d) => {
        const nx = wrapCoord(ghost.pos.x + DIRECTIONS[d].x, size);
        const ny = wrapCoord(ghost.pos.y + DIRECTIONS[d].y, size);
        return currentGrid[ny]?.[nx] !== 1;
      });

      const nonReverseDirs =
        validDirs.length > 1 && ghost.dir
          ? validDirs.filter((d) => d !== OPPOSITE[ghost.dir!])
          : validDirs;

      let bestDir = nonReverseDirs[0] || ghost.dir;
      let minDist = Infinity;

      nonReverseDirs.forEach((d) => {
        const nx = wrapCoord(ghost.pos.x + DIRECTIONS[d].x, size);
        const ny = wrapCoord(ghost.pos.y + DIRECTIONS[d].y, size);
        const dist = Math.abs(nx - target.x) + Math.abs(ny - target.y);
        if (dist < minDist) {
          minDist = dist;
          bestDir = d;
        }
      });

      if (!bestDir) return ghost;

      return {
        ...ghost,
        dir: bestDir,
        pos: {
          x: wrapCoord(ghost.pos.x + DIRECTIONS[bestDir].x, size),
          y: wrapCoord(ghost.pos.y + DIRECTIONS[bestDir].y, size),
        },
      };
    },
    []
  );

  useEffect(() => {
    if (status !== "PLAYING") return;

    const currentLevel = LEVELS[levelIndex];
    const interval = setInterval(() => {
      tickCountRef.current += 1;
      const size = grid.length;

      setPacman((prev) => {
        if (!direction) return prev;
        const delta = DIRECTIONS[direction];
        const nextX = wrapCoord(prev.x + delta.x, size);
        const nextY = wrapCoord(prev.y + delta.y, size);

        if (grid[nextY]?.[nextX] === 1) return prev;

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

      if (tickCountRef.current % 2 === 0) {
        setGhosts((prevGhosts) =>
          prevGhosts.map((ghost) => {
            let updated = moveGhostStep(ghost, grid, pacman, direction);
            if (ghost.type === "sprinter" && tickCountRef.current % 6 === 0) {
              updated = moveGhostStep(updated, grid, pacman, direction);
            }
            return updated;
          })
        );
      }
    }, currentLevel.speedMs);

    return () => clearInterval(interval);
  }, [direction, grid, highScore, levelIndex, moveGhostStep, pacman, status]);

  useEffect(() => {
    if (status !== "PLAYING") return;

    const hit = ghosts.some((g) => g.pos.x === pacman.x && g.pos.y === pacman.y);
    if (hit) {
      setStatus("GAME_OVER");
      return;
    }

    const cleared = grid.every((row) => row.every((cell) => cell !== 0));
    if (cleared) {
      if (levelIndex + 1 < LEVELS.length) {
        loadLevel(levelIndex + 1);
      } else {
        setStatus("VICTORY");
      }
    }
  }, [pacman, ghosts, grid, levelIndex, loadLevel, status]);

  return {
    level: levelIndex + 1,
    totalLevels: LEVELS.length,
    grid,
    pacman,
    direction,
    ghosts,
    score,
    highScore,
    status,
    setDirection,
    resetGame,
    loadLevel,
  };
};