import type { LevelConfig, GhostType, Position } from "../types/gameTypes";

// 0 = Dot, 1 = Wall, 2 = Empty (19x19 Open Arena Mazes)
const OPEN_MAZE_A: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,0,1],
  [1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1],
  [1,1,1,0,0,1,0,0,1,2,1,0,0,1,0,0,1,1,1],
  [0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,2,1,0,0,0,0,0,0,0,0],
  [1,1,1,0,0,1,0,0,1,1,1,0,0,1,0,0,1,1,1],
  [1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,0,1],
  [1,0,0,1,1,0,0,1,0,0,0,1,0,0,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const OPEN_MAZE_B: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,0,0,1],
  [1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
  [1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
  [1,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,1,2,2,2,2,2,1,0,0,0,0,0,1],
  [0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0],
  [1,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,1,0,0,0,0,0,2,0,0,0,0,0,1,0,0,1],
  [1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1],
  [1,0,0,1,1,1,0,0,0,1,0,0,0,1,1,1,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

const GHOST_ROSTER: { type: GhostType; startPos: Position }[][] = [
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "ambusher", startPos: { x: 1, y: 1 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "sprinter", startPos: { x: 17, y: 1 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "ambusher", startPos: { x: 1, y: 1 } }, { type: "sprinter", startPos: { x: 17, y: 1 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "teleporter", startPos: { x: 17, y: 17 } }, { type: "ambusher", startPos: { x: 1, y: 1 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "ambusher", startPos: { x: 1, y: 1 } }, { type: "sprinter", startPos: { x: 17, y: 1 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "sprinter", startPos: { x: 1, y: 1 } }, { type: "teleporter", startPos: { x: 17, y: 1 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "ambusher", startPos: { x: 1, y: 1 } }, { type: "sprinter", startPos: { x: 17, y: 1 } }, { type: "teleporter", startPos: { x: 1, y: 17 } }],
  [{ type: "sprinter", startPos: { x: 9, y: 8 } }, { type: "sprinter", startPos: { x: 1, y: 1 } }, { type: "ambusher", startPos: { x: 17, y: 1 } }, { type: "teleporter", startPos: { x: 17, y: 17 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "ambusher", startPos: { x: 1, y: 1 } }, { type: "sprinter", startPos: { x: 17, y: 1 } }, { type: "teleporter", startPos: { x: 1, y: 17 } }],
  [{ type: "chaser", startPos: { x: 9, y: 8 } }, { type: "ambusher", startPos: { x: 1, y: 1 } }, { type: "sprinter", startPos: { x: 17, y: 1 } }, { type: "teleporter", startPos: { x: 1, y: 17 } }, { type: "chaser", startPos: { x: 17, y: 17 } }],
];

export const LEVELS: LevelConfig[] = Array.from({ length: 10 }, (_, idx) => ({
  level: idx + 1,
  speedMs: Math.max(140, 230 - idx * 9),
  ghosts: GHOST_ROSTER[idx],
  map: idx % 2 === 0 ? OPEN_MAZE_A : OPEN_MAZE_B,
}));