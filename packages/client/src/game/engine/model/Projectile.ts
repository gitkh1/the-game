import { ProjectileTrail } from "./ProjectileTrail";

type T_Props = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export class Projectile {
  x: number;
  y: number;
  dx: number;
  dy: number;
  age = 0;
  onGround = false;
  lastTrail?: ProjectileTrail;

  constructor({ x, y, dx, dy }: T_Props) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
  }
}
