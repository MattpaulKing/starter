export default function(el: HTMLElement, callback: () => void) {
  function clickWrapper(e: MouseEvent) {
    if (e.target instanceof HTMLElement && !el.contains(e.target)) {
      callback()
    }
  }
  document.addEventListener("click", clickWrapper)
  return {
    destroy() {
      document.removeEventListener("click", clickWrapper)
    }
  }
}
