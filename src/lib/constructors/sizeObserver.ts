
export class SizeObserver<T extends HTMLElement | SVGElement> {
  width: number;
  height: number;
  constructor(element: T) {
    this.width = 0;
    this.height = 0;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        this.width = width;
        this.height = height;
      }
    });
    observer.observe(element);
  }
}
