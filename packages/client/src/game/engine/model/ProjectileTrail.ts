type Props = { x: number; y: number; color: string };

export class ProjectileTrail {
  x: number;
  y: number;
  age = 0;
  color: string;

  constructor({ x, y, color }: Props) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
}
