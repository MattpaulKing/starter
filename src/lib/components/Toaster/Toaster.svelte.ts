import { onDestroy } from "svelte"

export interface IToast {
  id: UUID,
  message: string,
  type: "save" | "info" | "error",
}

export class Toaster {

  queue: IToast[] = $state([])
  timeoutMap = new Map<string, ReturnType<typeof setTimeout>>()

  constructor() {
    onDestroy(() => {
      this.clear()
    })
  }

  add(toast: Omit<IToast, "id"> & { id?: UUID }, durationMs = 10000) {
    let id = toast.id ?? crypto.randomUUID()
    let newToast = {
      id,
      ...toast,
    }
    this.queue.push(newToast)
    this.timeoutMap.set(
      id,
      setTimeout(() => {
        this.remove(id)
      }, durationMs)
    )
  }

  clear() {
    for (const timeout of this.timeoutMap.values()) {
      clearTimeout(timeout)
    }
    this.timeoutMap.clear()
    this.queue = []
  }

  remove(id: string) {
    const timeout = this.timeoutMap.get(id)
    if (timeout) {
      clearTimeout(timeout)
      this.timeoutMap.delete(id)
    }
    this.queue = this.queue.filter(({ id: toastId }) => toastId !== id)
  }
}
