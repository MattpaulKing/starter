import type { Component } from "svelte";

export interface ModalResponse {
  type: "save" | "close"
}

export interface Modal<P extends Record<string, unknown> = {}> {
  id: string
  type: "component" | "prompt"
  routes: { from: string, to: string },
  ref: Component<P, any, any>
  props: () => { data: P }
  meta?: Record<string, unknown>
  response: (r: any) => void
}

export default class {

  queue = $state<Modal[]>([])
  lastPop: null | Modal = $state(null)
  showing = $derived(this.queue.length > 0)
  showingIdx = $derived(this.queue.length - 1)

  add(modal: Omit<Modal, "response" | "id"> & { id?: string, response?: (r: any) => void }) {
    let id = modal.id ?? crypto.randomUUID()
    this.queue.push({
      id,
      response: () => null,
      ...modal
    })
  }
  remove(id: string) {
    this.queue.filter(({ id: modalId }) => modalId !== id)
  }
  close() {
    this.lastPop = this.queue.pop() ?? null
  }
  clear() {
    this.queue = []
  }
}
