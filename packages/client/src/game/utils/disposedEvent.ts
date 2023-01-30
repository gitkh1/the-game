export default function makeDisposedEvent() {
  const disposers: Array<() => unknown> = [];

  type T_Disposer = {
    <T extends keyof DocumentEventMap>(
      element: EventTarget,
      type: T,
      listener: (this: HTMLElement, ev: DocumentEventMap[T]) => unknown,
      options?: EventListenerOptions
    ): void;
    disposeAll(): void;
  };

  const disposedEvent = function disposedEvent<T extends keyof DocumentEventMap>(
    element: EventTarget,
    type: T,
    listener: (this: HTMLElement, ev: DocumentEventMap[T]) => unknown,
    options?: EventListenerOptions
  ) {
    element.addEventListener(type, listener as EventListener, options);
    disposers.push(() => {
      element.removeEventListener(type, listener as EventListener, options);
    });
  } as T_Disposer;

  disposedEvent.disposeAll = () => {
    disposers.forEach((fn) => fn());
    disposers.length = 0;
  };

  return disposedEvent;
}
