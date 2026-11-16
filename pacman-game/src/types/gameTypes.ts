export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT" | null;

export interface Position {
  x: number;
  y: number;
}

export interface Ghost {
  id: string;
  pos: Position;
  dir: Direction;
  sprite: string;
}

export interface ScoreBoxParams {
  title: string;
  value: string;
  style?: React.CSSProperties;
}