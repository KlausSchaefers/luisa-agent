import { Converter } from "../Interfaces.js";

export default class GridConverter extends Converter {
  constructor(w, h) {
    super();
    this.width = w;
    this.height = h;
  }

  convert(app) {
    Object.values(app.screens).forEach((scrn) => {
      gridifyScreen(app, scrn, this.width, this.height);
    });
  }

  gridifyScreen(app, scrn, width, height) {
    scrn.children.forEach((id) => {
      const w = app.widgets[id];
      if (w) {
        gridifyBox(w, width, height, scrn.x, scrn.y);
      }
    })
  }

  gridifyBox(w, width, height, offsetX = 0, offsetY = 0) {
    w.x -= offsetX;
    w.y -= offsetY;
    w.x = gridifyValue(w.x, width);
    w.y = gridifyValue(w.y, height);
    w.w = gridifyValue(w.w, width);
    w.h = gridifyValue(w.h, height);
    w.x += offsetX;
    w.y += offsetY;
  }

  gridifyValue(v, g) {
    return Math.round(v / g) * g;
  }
}
