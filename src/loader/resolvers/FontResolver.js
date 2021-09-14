import { FontLoader } from "three";

export class FontResolver {
  constructor() {
    this.type = "font";
    this.loader = new FontLoader();
  }

  resolve(font) {
    return new Promise((resolve) => {
      this.loader.load(font.url, (loadedFont) => {
        resolve(Object.assign(font, { loadedFont }));
      });
    });
  }

  get(font) {
    return font.loadedFont;
  }
}
