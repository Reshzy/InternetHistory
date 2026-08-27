export function writeTextIfChanged(el: HTMLElement, next: string) {
  if (el.textContent !== next) {
    el.textContent = next;
  }
}
