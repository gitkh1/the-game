export default function rafLoop(callback: (now: number) => unknown) {
  let timer = 0,
    isRunning = false;
  function rerafLoop(now: number) {
    callback(now);
    timer = requestAnimationFrame(rerafLoop);
  }
  return {
    start() {
      if (isRunning) return false;
      isRunning = true;
      timer = requestAnimationFrame(rerafLoop);
      return true;
    },
    stop() {
      cancelAnimationFrame(timer);
      isRunning = false;
    },
  };
}
