export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | null;

export type GhostType = "chaser" | "ambusher" | "sprinter" | "teleporter";

export interface Position {
  x: number;
  y: number;
}

export interface Ghost {
  id: string;
  type: GhostType;
  pos: Position;
  dir: Direction;
}

export interface LevelConfig {
  level: number;
  speedMs: number;
  ghosts: { type: GhostType; startPos: Position }[];
  map: number[][];
}

export interface ScoreBoxParams {
  title: string;
  value: string;
  style?: React.CSSProperties;
}