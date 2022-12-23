export default function makeDisposedEvent() {
  const disposers: Array<() => unknown> = []

  type Disposer = {
    <K extends keyof DocumentEventMap>(
      element: EventTarget,
      type: K,
      listener: (this: HTMLElement, ev: DocumentEventMap[K]) => unknown,
      options?: EventListenerOptions
    ): void
    disposeAll(): void
  }

  const disposedEvent = function disposedEvent<
    K extends keyof DocumentEventMap
  >(
    element: EventTarget,
    type: K,
    listener: (this: HTMLElement, ev: DocumentEventMap[K]) => unknown,
    options?: EventListenerOptions
  ) {
    element.addEventListener(type, listener as EventListener, options)
    disposers.push(() => {
      element.removeEventListener(type, listener as EventListener, options)
    })
  } as Disposer

  disposedEvent.disposeAll = () => {
    disposers.forEach(fn => fn())
    disposers.length = 0
  }

  return disposedEvent
}
