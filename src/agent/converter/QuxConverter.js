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
    this.gapX = 16
    this.gapY = 16
    this.isRemoveContainers = false; 
    this.growRowChildrenInHeight = true
    this.name = 'QuxConverter'

    this.typeMapping = {
      'Container': 'Box',
      'Card': 'Box',
      'Input': 'TextBox'
    }
  }

  convert(app) {
    const result = {
      name: app.name,
      screenSize: this.screenSize,
      screens: {},
      widgets: {},
      lines: {},
      groups: {},
    };

    if (app.screens) {
      app.screens.forEach(s => {
  
        const scrn = this.convertTree(s)
     
        Object.values(scrn.screens).forEach((s, i) => {
          result.screens[s.id] = s
          s.props.start = i === 0
        })
        Object.values(scrn.widgets).forEach(w => {
          if (result.widgets[w.id]) {
            console.warn("convert() > Duplicate ID", w.id)
          }
          result.widgets[w.id] = w
        })
      })
    }
    return result
  }

  convertTree(tree) {
    tree = structuredClone(tree)
    this.setIDs(tree)
    this.layoutTree(tree, this.screenSize.w - this.gapX * 2, this.containerPadding, this.containerPadding);
    const app = this.flattenTree(tree, this.screenSize.w, this.screenSize.h);
    //console.debug(Object.values(app.screens)[0].h)
    this.convertTypes(app);
    this.cleanUpModel(app)
    return app;
  }

  cleanUpModel(app) {
    Object.values(app.widgets).forEach(w => {
        delete w.children
        delete w.properties
        delete w.container
        delete w.layout
        delete w.variant

        // to avoid some scalling issue in luisa
        w.props.resize = {
          left: true,
          right:true
        }
    });
  }

  convertTypes(app) {
    Object.values(app.widgets).forEach(w => {
        if (this.typeMapping[w.type]) {
          w.type = this.typeMapping[w.type]
        }
    });
  }

  setIDs(node) {
      node.id = 'w' + this.getUUID();
      if (node.children) {
         node.children.forEach((child) => {
          this.setIDs(child)
        })
      }
  }

  layoutTree(node, width, offsetX = 0, offsetY = 0, gapX = this.gapX, gapY = this.gapY, indent = "") {
    const groups = {}

    // if (node.children)
    //   console.debug(indent, ' + ', node.name, node.y, offsetY)

    //console.debug(indent, node.type,this.isContainer(node));


    let paddingX = 0;
    let paddingY = 0;
    
    if (this.isContainer(node)) {
      if (node?.style?.paddingLeft > 0) {
        paddingX = node?.style?.paddingLeft;
      }
      if (node?.style?.paddingTop > 0) {
        paddingY = node?.style?.paddingTop
      }
      width -= (paddingX * 2);
    }

    let tempOffsetY = offsetY + paddingY;
    let tempOffsetX = offsetX + paddingY;

    //console.debug(indent, node.name, 'w', width, 'p', paddingX, 'o', tempOffsetY, node.style)
    //console.debug(indent, node.name, 'p', paddingY, 'o', tempOffsetY)

    if (this.isRowContainer(node)) {
      let offset = this.layoutRow(node, width, tempOffsetY, tempOffsetX, paddingY, paddingX, gapY, gapX, indent);
      tempOffsetX = offset.x
    } else {
      let offset = this.layoutColumn(node, width, tempOffsetY, tempOffsetX, paddingY, paddingX, gapY, gapX, indent);
      tempOffsetY = offset.y
    }

    if (this.isContainer(node)) {
      node.h = this.computeChildHeight(node) + paddingY * 2;
      tempOffsetY = node.h + gapY
     // console.debug(indent, ' = ', node.name, node.y, node.h + node.y, tempOffsetY)
    }


    return { x: tempOffsetX, y: tempOffsetY };
  }

  
  layoutColumn(node, parentWidth, tempOffsetY, tempOffsetX, paddingY, paddingX, gapY, gapX, indent) {
    if (node.children) {
      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const nextChild = children[i + 1];
        child.x = tempOffsetX;
        child.w = this.getColumnChildWidth(child, parentWidth);
        child.y = tempOffsetY;

        this.layoutTree(child, parentWidth, tempOffsetX, tempOffsetY, gapX, gapY, indent + "   ");
        if (!this.isContainer(child)) {
          child.h = this.computeContentHeight(child, parentWidth);
        }

        if (child.type === 'Label' && nextChild && this.isInput(nextChild)) {
          tempOffsetY += child.h;
        } else {
          tempOffsetY += child.h + gapY;
        }

       // console.debug(indent, ' - col:' + child.name + " start:" + child.y + "  end: " + (child.y + child.h));
      }

    }

    return { x: tempOffsetX, y: tempOffsetY };;
  }

  layoutRow(node, width, tempOffsetY, tempOffsetX, paddingY, paddingX, gapY, gapX, indent) {
    const l = node.children.length;
    const childWidth = Math.floor((width - ((l-1) * gapX)) / l)       

    if (node.children) {
      let maxH = 0
      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.y = tempOffsetY;
        child.x = tempOffsetX;
        child.w = childWidth;
        
        this.layoutTree(child, childWidth, tempOffsetX, tempOffsetY, gapX, gapY, indent + "   ");
        if (!this.isContainer(child)) {
          child.h = this.computeContentHeight(child, width);
        }
        tempOffsetX = child.w + tempOffsetX + gapX;
        maxH = Math.max(maxH, child.h)
      }

      if (this.growRowChildrenInHeight) {
        for (let i = 0; i < children.length; i++) {
              const child = children[i];
              child.h = this.getRowChildHeight(child, maxH)
        }
    }


    }
    return { x: tempOffsetX, y: tempOffsetY };
  }

  getColumnChildWidth (node, parentWidth) {
    if (this.isNoLayoutGrow(node)) {

      return node.w
    }
    return parentWidth
  }

  getRowChildHeight(node, maxH) {
    if (this.isNoLayoutGrow(node)) {
      return node.h
    }
    return maxH
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
      // let div = document.createElement("div");
      // div.innerText = node.props.label;
      // div.style.width = width + "px";
      // div.style.fontFamily = node.style.fontFamily;
      // div.style.lineHeight = node.style.lineHeight;

      // div.style.fontSize = node.style.fontSize + "px";
      // this.domNode.appendChild(div);
      // result = div.offsetHeight;
      // this.domNode.innerText = "";
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
      name: tree.name,
      id: "s" + this.getUUID(),
      min: {
        w: width,
        h: height,
      },
      x: 0,
      y: 0,
      w: width,
      h: tree.h,
      props: {},
      has: tree.has,
      style: tree.style,
      children: [],
    };
    scrn.props.start = false;
    app.screens[scrn.id] = scrn;

    this.flattenNode(scrn, app, tree);

    return app;
  }

  flattenNode(scrn, app, node, indent='') {
    //Logger.log(-1, prefx + ' ' + node.id, node)
    if (!node.children) {
      return;
    }
    node.children.forEach((child) => {
      if (this.isRemoveScreenOffset) {
        child.x -= scrn.x;
        child.y -= scrn.y;
      }
      //console.debug(indent, " - " + child.name, child.y, ' - ', child.y + child.h)

      app.widgets[child.id] = child;
      scrn.children.push(child.id);
      this.flattenNode(scrn, app, child, indent + "   ");
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
