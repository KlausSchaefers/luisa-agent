import { Converter } from "../Interfaces.js";

export default class QuxConverter extends Converter {
  constructor(w = 400, h = 800) {
    super();
    this.screenSize = {
      w: w,
      h: h,
    };
    this.lastUUID = 10000;
    this.containerPadding = 16;
    this.paddingX = 16;
    this.paddingY = 16;
    this.isRemoveContainers = false; 
    this.name = 'QuxConverter' // if true, remove containers and just return the content
  }

  convert(tree) { 
    this.layoutTree(tree, this.screenSize.w - this.containerPadding * 2, this.containerPadding, this.containerPadding);
    const app = this.flattenTree(tree, this.screenSize.w, this.screenSize.h);
    this.patchTypes(app);
    return app;
  }

  patchTypes(app) {
    Object.values(app.widgets).forEach(w => {
      if (w.type == 'Container') {
        w.type = 'Box';
      }
    });
  }

  layoutTree(node, width, offsetX = 0, offsetY = 0, gapX = 16, gapY = 16, indent = "") {

    node.id = 'w' + this.getUUID();

    //console.debug(indent, node.type, node.name, node.id);

    let tempOffsetY = offsetY;
    let tempOffsetX = offsetX;
    let paddingX = 0;
    let paddingY = 0;
    if (!this.isRemoveContainers) {
      paddingX = this.paddingX;
      paddingY = this.paddingX;
      width -= 2 * gapX;
    }

    if (this.isRowContainer(node)) {
      const l = node.children.length;
      const childWidth = Math.floor((width - (l - 1) * gapX) / l);
      node.children.forEach((child) => {
        child.y = tempOffsetY;
        child.x = tempOffsetX;
        child.w = childWidth;
        if (!this.isContainer(child)) {
          child.h = this.computeContentHeight(child, width);
        }
        tempOffsetX = child.w + tempOffsetX + gapX;
        const offsets = this.layoutTree(child, width, tempOffsetX, tempOffsetY + paddingY, gapX, gapY, indent + "   ");
        tempOffsetX = offsets.x;
      });
    } else {
      if (node.children) {
        node.children.forEach((child) => {
          child.x = tempOffsetX;
          child.w = width;
          child.y = tempOffsetY;

          if (this.isContainer(child)) {
            tempOffsetY += paddingY;
          } else {
            child.h = this.computeContentHeight(child, width);
          }
          this.layoutTree(child, width, tempOffsetX + paddingX, tempOffsetY, gapX, gapY, indent + "   ");
          tempOffsetY += child.h + gapY;
        });
      }
    }

    if (this.isContainer(node)) {
      node.h = this.computeChildHeight(node) + paddingY * 2;
    }

    //console.debug(indent, node.type, node.id, node.props.label, node.h, node.y)
    return { x: tempOffsetX, y: tempOffsetY };
  }

  computeChildHeight(node) {
    let top = 1000000;
    let bottom = 0;
    node.children.forEach((c) => {
      top = Math.min(top, c.y);
      bottom = Math.max(bottom, c.y + c.h);
    });
    return bottom - top;
  }

  computeContentHeight(node, width) {
    let result = node.h;
    if (node.type === "Label" && node?.props?.label) {
      let div = document.createElement("div");
      div.innerText = node.props.label;
      div.style.width = width + "px";
      div.style.fontFamily = node.style.fontFamily;
      div.style.lineHeight = node.style.lineHeight;

      div.style.fontSize = node.style.fontSize + "px";
      this.domNode.appendChild(div);
      result = div.offsetHeight;
      this.domNode.innerText = "";
    }
    return result;
  }

  flattenTree(tree, width, height) {
    const app = {
      screenSize: {
        w: width,
        h: height,
      },
      screens: {},
      widgets: {},
      lines: {},
      groups: {},
    };

    const scrn = {
      name: "Screen",
      id: "s" + this.getUUID(),
      min: {
        w: width,
        h: height,
      },
      x: tree.x,
      y: tree.y,
      w: tree.w,
      h: tree.h,
      props: {},
      has: tree.has,
      style: tree.style,
      children: [],
    };
    scrn.props.start = true;

    app.screens[scrn.id] = scrn;

    this.flattenNode(scrn, app, tree);

    return app;
  }

  flattenNode(scrn, app, node, prefx) {
    //Logger.log(-1, prefx + ' ' + node.id, node)
    if (!node.children) {
      return;
    }
    node.children.forEach((child) => {
      if (this.isRemoveScreenOffset) {
        child.x -= scrn.x;
        child.y -= scrn.y;
      }

      app.widgets[child.id] = child;
      scrn.children.push(child.id);
      this.flattenNode(scrn, app, child, prefx + "   ");
    });
  }

  flattenLabelIntoParent(child) {
    child.props.label = child.children[0].props.label;
    child.children = [];
  }

  isHiddenElement(widget) {
    if (this.isRemoveContainers && this.isContainer(widget)) {
      return true;
    }
    return false;
  }

  getPosition() {
    return {
      x: 0,
      y: 0,
      w: 0,
      h: 0,
    };
  }

  getWidgetName(type) {
    return type + this.z;
  }

  getUUID() {
    const uuid = this.lastUUID++ + "_" + Math.round(Math.random() * 100000);
    return uuid;
  }
}
