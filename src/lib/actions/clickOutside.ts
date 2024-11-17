export default function(el: HTMLElement, callback: () => void) {
  function executeCallback(e: MouseEvent | KeyboardEvent) {
    if (e.target instanceof HTMLElement && !el.contains(e.target)) {
      callback()
    }
  }
  function keydownCallback(e: KeyboardEvent) {
    if (e.key !== "Escape") return
    executeCallback(e)
  }
  document.addEventListener("click", executeCallback)
  document.addEventListener("keydown", keydownCallback)
  return {
    destroy() {
      document.removeEventListener("click", executeCallback)
      document.removeEventListener("keydown", keydownCallback)
    }
  }
}
