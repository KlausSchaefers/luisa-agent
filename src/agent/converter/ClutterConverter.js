import { Converter } from "../Interfaces.js";

export default class ClutterConverter extends Converter {
  constructor(w, h) {
    super();
    this.screenSize = { w: w, h: h };
  }

  convert(app) {
    Object.values(app.screens).forEach((s) => {
      this.cleanUpScreen(s, app);
    });

    Object.values(app.widgets).forEach((w) => {
      this.cleanUpWidget(w);
    });

    return app;
  }

  cleanUpScreen(s, app) {
    this.removeHiddenElements(s, app);
    s.h = getScreenHeight(s, app);
    s.w = app.screenSize.w;
    s.x = 0;
    s.y = 0;
    delete s._type;   
  }

  cleanUpWidget(w) {
    for (let key in w.style) {
      if (!nullableStyles.has(key)) {
        const value = w.style[key];
        if (value === null) {
          delete w.style[key];
        }
      }
    }

    if (!this.isParseTable) {
      //we could add here some table groups
      // and remove all the TR, THEAD and TBODY
    }

    delete w._parent;
    delete w.children;
    delete w._tag;
    delete w._type;
    delete w._className;
    delete w._flexDirection;
  }

  removeHiddenElements(scrn, app) {
    const newChildren = [];
    scrn.children.forEach((id) => {
      const widget = app.widgets[id];
      if (this.isHiddenElement(widget)) {
        delete app.widgets[id];
      } else {
        newChildren.push(id);
      }
    });
    scrn.children = newChildren;
  }

  isHiddenElement(widget) {
    if (widget.type === "Label" && !widget.props.label) {
      return true;
    }
    if (this.isRemoveContainers && widget.children.length > 0) {
      return true;
    }
    return false;
  }

  getScreenHeight(scrn, app) {
    let maxY = 0;
    scrn.children.forEach((id) => {
      const widget = app.widgets[id];
      if (widget) {
        maxY = Math.max(maxY, widget.y + widget.h);
      }
    });
    return Math.max(app.screenSize.h, maxY);
  }

  getScreenWidth(scrn, app) {
    let maxX = 0;
    scrn.children.forEach((id) => {
      const widget = app.widgets[id];
      if (widget) {
        maxX = Math.max(maxX, widget.x + widget.w);
      }
    });
    return maxX;
  }
}
