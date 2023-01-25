export default function rafLoop(callback: (now: number) => unknown) {
  let timer = 0,
    running = false;
  function rerafLoop(now: number) {
    callback(now);
    timer = requestAnimationFrame(rerafLoop);
  }
  return {
    start() {
      if (running) return false;
      running = true;
      timer = requestAnimationFrame(rerafLoop);
      return true;
    },
    stop() {
      cancelAnimationFrame(timer);
      running = false;
    },
  };
}
