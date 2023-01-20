import makeDisposedEvent from './utils/disposedEvent';
import rafLoop from './utils/rafLoop';

type Props = {
  canvas: HTMLCanvasElement;
};

const runGame = ({ canvas }: Props) => {
  const WIDTH = 800;
  const HEIGHT = 500;
  const FLOOR = 400;

  const disposedEvent = makeDisposedEvent();

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  // random(max) <==> random(0, max)
  const random = (min = 1, max = 0) => Math.random() * (max - min) + min;
  const randInt = (min: number, max = 0) => Math.floor(random(min, max));
  const randIntSign = (min: number, max = 0) => randInt(min, max) * (Math.random() > 0.5 ? 1 : -1);

  function clearScreen() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
  }

  function rect(color: string, x: number, y: number, width: number, height: number) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  function text(color: string, str: string, font: string, x: number, y: number) {
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.fillText(str, x, y);
  }

  function rotate(x: number, y: number, angle: number) {
    const transform = ctx.getTransform();
    ctx.translate(x, y);
    ctx.rotate((angle * Math.PI) / 180);

    return function revert() {
      ctx.setTransform(transform);
    };
  }

  let scoreKills = 0,
    scoreFails = 0;
  function drawScore() {
    text('black', `Убито: ${scoreKills}`, 'bold 18px Verdana', 20, 35);
    text('darkred', `Пропущено: ${scoreFails}`, 'bold 18px Verdana', 20, 55);
    text('lightblue', `Врагов: ${enemies.length}`, 'bold 18px Verdana', 20, 75);
    text('lightblue', `Снарядов: ${projectiles.length}`, 'bold 18px Verdana', 20, 95);
    text('lightblue', `Следов попадания: ${projectileStubs.length}`, 'bold 18px Verdana', 20, 115);

    text('darkorange', `Курсор: (${[mousePos.x, mousePos.y].join(', ')})`, 'bold 18px Verdana', 20, 135);
  }

  let mousePos = { x: 0, y: 0 };
  let mousePressed = false;

  disposedEvent(canvas, 'click', () => {
    fireProjectile();
  });
  disposedEvent(canvas, 'mousedown', () => {
    mousePressed = true;
  });
  disposedEvent(window, 'mousemove', (event) => {
    let { offsetX: x, offsetY: y } = event;
    if (event.target !== canvas) {
      const rect = canvas.getBoundingClientRect();
      x = event.clientX - rect.left;
      y = event.clientY - rect.top;
    }
    mousePos = { x, y };
  });
  disposedEvent(window, 'mouseup', () => {
    mousePressed = false;
  });

  type Projectile = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    angle: number;
    color: string;
    size: number;
    falled: boolean;
  };

  let projectiles: Projectile[] = [];
  const GRAVITY = 9.8;
  const SPAWN_X = 50;
  const SPAWN_Y = FLOOR - 30;
  const PROJECTILE_RADIUS = 8;
  const PROJECTILE_SIZE = PROJECTILE_RADIUS * 2;
  const PROJECTILE_VELOCITY = 700;
  const PROJECTILE_ROTATE = 2;
  const PROJECTILE_BOUNCING_FLOOR = true;
  const PROJECTILE_SHOT_TIMEOUT_MS = 500;

  let lastShotTime = 0;
  function fireProjectile() {
    if (lastShotTime >= performance.now()) return;
    lastShotTime = performance.now() + PROJECTILE_SHOT_TIMEOUT_MS;

    let dx = mousePos.x - SPAWN_X;
    let dy = mousePos.y - SPAWN_Y;

    const velocity = PROJECTILE_VELOCITY;
    const distanceToCursor = Math.hypot(dx, dy);

    dx = (dx / distanceToCursor) * velocity * random(0.85, 1.15);
    dy = (dy / distanceToCursor) * velocity * random(0.85, 1.15);

    projectiles.push({
      x: SPAWN_X,
      y: SPAWN_Y,
      dx,
      dy,
      angle: randInt(360),
      color: `hsl(130 ${randInt(40, 100)}% ${randInt(20, 60)}% / ${randInt(50, 100)}%)`,
      size: PROJECTILE_SIZE + randInt(-5, 5),
      falled: false,
    });
  }
  function updateProjectiles(dt: number) {
    if (mousePressed) {
      fireProjectile();
    }

    projectiles = projectiles.filter(({ x, y }) => {
      return y < HEIGHT && -PROJECTILE_RADIUS < x && x < WIDTH + PROJECTILE_RADIUS;
    });

    projectiles.forEach((p) => {
      p.angle += p.dx * dt * PROJECTILE_ROTATE;
      p.x += p.dx * dt;
      p.y += p.dy * dt;
      p.dy += GRAVITY * dt * 100;

      // отскоки и проваливание, если низкая скорость
      if (PROJECTILE_BOUNCING_FLOOR) {
        if (p.y >= FLOOR - PROJECTILE_RADIUS) {
          if (p.dx > 150) {
            p.dx *= 0.7;
          } else {
            p.dx *= 0.8;
          }
          if (!p.falled && p.dy > 100) {
            p.dy *= -0.7;
          } else if (p.dx < 50 && p.dx < 10) {
            p.falled = true;
          }
        }
      }
    });
  }

  function drawProjectiles() {
    for (let i = 1; i <= projectiles.length; i += 1) {
      const p = projectiles[projectiles.length - i];
      const revert = rotate(p.x, p.y, p.angle);
      rect(p.color, -p.size / 2, -p.size / 2, p.size, p.size);
      revert();
    }
  }

  function isCollidesWithProjectiles(enemy: Enemy) {
    const gap = PROJECTILE_RADIUS;
    const left = enemy.x - gap;
    const right = left + ENEMY_WIDTH + gap;
    const top = FLOOR - ENEMY_HEIGHT - gap;
    const bottom = top + ENEMY_HEIGHT + gap;

    const p = projectiles.find(({ x, y }) => {
      return left <= x && x <= right && top <= y && y <= bottom;
    });
    if (p) {
      projectiles = projectiles.filter((e) => e !== p);
      createProjectile(p, enemy);
    }
    return !!p;
  }

  type ProjectileStubs = {
    x: number;
    y: number;
    angle: number;
    ttl: number;
    offsetFrame: number;
  };

  let projectileStubs: ProjectileStubs[] = [];
  const PROJECTILE_STUBS_MAXSIZE = 35;
  const PROJECTILE_STUBS_TTL_MS = 0.7;

  function createProjectile(projectile: Projectile, enemy: Enemy) {
    projectileStubs.push({
      x: projectile.x,
      y: projectile.y,
      angle: projectile.angle,
      ttl: PROJECTILE_STUBS_TTL_MS,
      offsetFrame: enemy.offsetFrame,
    });
  }

  function updateProjectileStubs(dt: number) {
    projectileStubs.forEach((ps) => {
      ps.ttl -= dt;
    });
    projectileStubs = projectileStubs.filter((ps) => {
      return ps.ttl > 0;
    });
  }

  function drawProjectileStubs(frame: number) {
    projectileStubs.forEach((ps) => {
      const elapsedTime = PROJECTILE_STUBS_TTL_MS - ps.ttl;
      const sizePerMs = (PROJECTILE_STUBS_MAXSIZE - PROJECTILE_SIZE) / PROJECTILE_STUBS_TTL_MS;
      const size = sizePerMs * elapsedTime + PROJECTILE_SIZE;

      const opacity = Math.floor((ps.ttl / PROJECTILE_STUBS_TTL_MS) * 100);
      const color = `hsl(${(frame + ps.offsetFrame) % 360} 70% 50% / ${opacity}%)`;

      const revert = rotate(ps.x, ps.y, ps.angle);
      rect(color, -size / 2, -size / 2, size, size);
      revert();
    });
  }

  type Enemy = {
    x: number;
    offsetFrame: number;
  };

  let enemies: Enemy[] = [];
  const ENEMY_WIDTH = 20;
  const ENEMY_HEIGHT = 50;
  const ENEMY_SPEED = 80;
  const ENEMIES_SPAWN_PAUSE_MS_MIN = 200;
  const ENEMIES_SPAWN_PAUSE_MS_MAX = 1000;

  let enemiesSpawnPause = 0;
  function updateEnemies(dt: number) {
    enemies = enemies.filter((enemy) => {
      if (enemy.x <= -ENEMY_WIDTH) {
        scoreFails += 1;
        shakeScreenActivate();
        return false;
      }
      if (isCollidesWithProjectiles(enemy)) {
        scoreKills += 1;
        return false;
      }
      return true;
    });
    if (enemiesSpawnPause <= 0 && enemies.length < 500) {
      enemiesSpawnPause = randInt(ENEMIES_SPAWN_PAUSE_MS_MIN, ENEMIES_SPAWN_PAUSE_MS_MAX) / 1000;
      enemies.push({ x: WIDTH, offsetFrame: randInt(1000) });
    }
    enemiesSpawnPause -= dt;

    enemies.forEach((enemy) => {
      enemy.x -= ENEMY_SPEED * dt;
    });
  }

  function drawEnemies(frame: number) {
    enemies.forEach(({ x, offsetFrame }) => {
      const color = `hsl(${(frame + offsetFrame) % 360} 60% 50%)`;
      rect(color, x, FLOOR - ENEMY_HEIGHT, ENEMY_WIDTH, ENEMY_HEIGHT);
    });
  }

  function drawFloor() {
    rect('black', 0, FLOOR, WIDTH, HEIGHT - FLOOR);
  }

  let shakeX = 0;
  let shakeY = 0;
  let shakeTime = 0;
  const SHAKE_TIME_FRAMES = 20;
  const SHAKE_MIN_OFFSET = 50;
  const SHAKE_MAX_OFFSET = 100;
  const SHAKE_MAX_ANGLE = 10;

  function shakeScreenActivate() {
    if (shakeTime <= 0) {
      shakeX = randIntSign(SHAKE_MIN_OFFSET, SHAKE_MAX_OFFSET);
      shakeY = randIntSign(SHAKE_MIN_OFFSET, SHAKE_MAX_OFFSET);
      shakeTime = SHAKE_TIME_FRAMES;
    }
  }

  function shakeScreenGetOffset() {
    const isFirstHalfOfScreenShakeTime = shakeTime > SHAKE_TIME_FRAMES / 2;
    const time = isFirstHalfOfScreenShakeTime ? SHAKE_TIME_FRAMES - shakeTime : shakeTime;
    return time / SHAKE_TIME_FRAMES;
  }

  function shakeScreenRender(frame: number) {
    if (shakeTime > 0) {
      shakeTime -= 1;
      const offset = Math.sin(frame / 10) * shakeScreenGetOffset();
      const centerX = WIDTH / 2 + randInt(-100, 100);
      const centerY = HEIGHT / 2 + randInt(-100, 100);
      rotate(centerX, centerY, offset * SHAKE_MAX_ANGLE);

      ctx.translate(offset * shakeX - centerX, offset * shakeY - centerY);
    }
  }

  function onFixedUpdate(dt: number) {
    updateEnemies(dt);
    updateProjectiles(dt);
    updateProjectileStubs(dt);
  }

  function onRender(frame: number) {
    clearScreen();
    shakeScreenRender(frame);
    drawProjectiles();
    drawEnemies(frame);
    drawFloor();
    drawProjectileStubs(frame);
    drawScore();
    ctx.resetTransform();
  }

  let elapsedFrames = 0;

  const DELTA_TIME_MS = 15;
  let time = performance.now();
  // цикл с фиксированной задержкой для просчета физики
  function fixedUpdateLoop(now: number) {
    let loopIndex = 0;
    for (loopIndex = 0; loopIndex < 5; loopIndex += 1) {
      if (time > now) {
        break;
      }

      time += DELTA_TIME_MS;
      onFixedUpdate(DELTA_TIME_MS / 1000);
    }
    // у пользователя тормозит устройство
    // значит «тротлим» новые кадры
    if (loopIndex === 5) {
      time = now;
    }
  }

  function gameLoop(now: number) {
    fixedUpdateLoop(now);
    onRender(elapsedFrames);
    elapsedFrames += 1;
  }

  const raf = rafLoop(gameLoop);
  raf.start();

  disposedEvent(document, 'visibilitychange', () => {
    if (document.hidden) {
      raf.stop();
    } else {
      raf.start();
    }
  });

  return function stopGame() {
    raf.stop();
    disposedEvent.disposeAll();
  };
};

export default runGame;
