export class EventBus {
  listeners: Record<string, CallableFunction[]> = {};

  on(event: string, listener: CallableFunction) {
    this.listeners[event] ??= [];
    this.listeners[event].push(listener);
    return this;
  }

  off(event: string, listener: CallableFunction) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter((l) => l !== listener);
    return this;
  }

  offAll() {
    this.listeners = {};
  }

  emit(event: string, ...data: unknown[]) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    this.listeners[event]?.forEach((listener) => listener(...data));
  }
}
