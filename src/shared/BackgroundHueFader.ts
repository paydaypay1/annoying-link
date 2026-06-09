export function rainbowBackground(element: HTMLElement): void {
  const style = document.createElement("style");
  style.textContent = `
    @keyframes rainbow {
      from { filter: hue-rotate(0deg); }
      to { filter: hue-rotate(360deg); }
    }
  `;
  document.head.appendChild(style);

  element.style.background = "hsl(0, 100%, 50%)";
  element.style.animation = "rainbow 2.5s linear infinite";
}