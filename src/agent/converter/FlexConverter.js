import { Converter } from "../Interfaces.js";

export default class FlexConverter extends Converter {
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
    this.z = 1
    this.isRemoveContainers = false; 
    this.growRowChildrenInHeight = true
    this.name = 'FlexConverter (' + w + ")"
  }


  convertTree(tree) {
    // forward pass to compute all out boxes
    tree.x = 0
    tree.y = 0
    this.layoutTree(tree, this.screenSize.w);
    // backward pass to compute inner alignment
    this.alignTree(tree)
    return tree;
  }

 
  alignTree(node, indent = "") {

    let paddingX = 0;
    let paddingY = 0;
    
    if (this.isContainer(node)) {
      if (node?.style?.paddingLeft > 0) {
        paddingX = node?.style?.paddingLeft;
      }
      if (node?.style?.paddingTop > 0) {
        paddingY = node?.style?.paddingTop
      }
    }

    if (this.isContainer(node)) {
      this.alignChildren(node, indent, paddingY, paddingX)
    }

    if (node.children) {
      const children = node.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        this.alignTree(child, indent + "   ");
      }
    }
  }

  layoutTree(node, width, offsetX = 0, offsetY = 0, indent = "") {
    const groups = {}
    const gapX = this.gapX
    const gapY = this.gapY
    // if (node.children)
    //console.debug(indent, ' + ', node.name, node.h, node.layout)

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

    // 1) Align all children
    if (this.isRowContainer(node)) {
      let offset = this.layoutRow(node, width, tempOffsetY, tempOffsetX, paddingY, paddingX, gapY, gapX, indent);
      tempOffsetX = offset.x
    } else {
      let offset = this.layoutColumn(node, width, tempOffsetY, tempOffsetX, paddingY, paddingX, gapY, gapX, indent);
      tempOffsetY = offset.y
    }

    // 2) For container we set the height, and align children in them
    if (this.isContainer(node)) {
      node.h = this.computeChildrenHeight(node) + paddingY * 2;
      //console.debug(indent, '-', node.name, this.computeChildrenHeight(node), node.h)
      tempOffsetY = node.h + gapY
    }

   // console.debug(indent, node.name, node.w)


    return { x: tempOffsetX, y: tempOffsetY };
  }

  alignChildren (node, indent, paddingY, paddingX) {
    if (node?.layout?.alignItems === 'center') {
      const h = node.h - paddingY * 2
      const childTotalH = this.computeChildrenHeight(node, false)
      const dif = h - childTotalH
      const offsetY = Math.floor(dif/2)
      for (let child of node.children) {
        child.y += offsetY
      } 
    }

    if (node?.layout?.justifyContent === 'center') {
      if (this.isRowContainer(node)) {
          const w = node.w - paddingX * 2
          const childTotalW = this.computeChildrenWidth(node, false)
          //console.debug(indent, node.name, w, childTotalW)
          const dif = w - childTotalW
          const offsetX = Math.floor(dif/2)
          for (let child of node.children) {
            //const offsetX = Math.round((w - (child.w))/2) 
            child.x += offsetX
          } 
      } else {
          const w = node.w - paddingX * 2
          for (let child of node.children) {
            const offsetX = Math.round((w - (child.w))/2) 
            child.x += offsetX
          } 
      }     
    }


    // grow stuff
    // if (this.isColumnContainer(node) && this.hasChildren(node)) {
    //   this.stretchColumnChildren(node, paddingY);
    // } else {
    //   this.strechRowChildren(node, paddingX, indent);
    // }

    // should we still frow childgren to occupy all the space like in the fruits

  }

  strechRowChildren(node, paddingX, indent) {
    const gapX = this.gapX;
    const w = node.w - paddingX * 2;
    const childTotalW = this.computeChildrenWidth(node, false);
    const dif = w - childTotalW;
    const growChildren = this.getGrowChildren(node);
    //console.debug(indent, '', node.name, childTotalW, w, growChildren.map(c => c.name));

    if (growChildren.length > 0 && dif > 8) {

      const offsetW = Math.floor((dif) / growChildren.length);
      let offsetX = growChildren[0].x;
      for (let child of growChildren) {
        child.x = offsetX;
        child.w += offsetW;
        offsetX += child.w + gapX;
      }
    }
  }

  stretchColumnChildren(node, paddingY) {
    const gapY = this.gapY;
    const h = node.h - paddingY * 2;
    const childTotalH = this.computeChildrenHeight(node, false);
    const dif = h - childTotalH;

    const growChildren = this.getGrowChildren(node);
    if (growChildren.length > 0 && dif > 8) {
      //console.debug(indent, '', node.name, childTotalH, h, growChildren.map(c => c.name))
      const offsetH = Math.floor(dif / growChildren.length);
      let offsetY = growChildren[0].y;
      for (let child of growChildren) {
        child.y = offsetY;
        child.h += offsetH;
        offsetY += child.h + gapY;
      }
    }
  }

  getGrowChildren (node) {
    return node.children.filter(c => {
      // this should be better. Currently we want explicit grow
      return c?.layout?.grow === 1
    })
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

        this.layoutTree(child, parentWidth, tempOffsetX, tempOffsetY, indent + "   ");
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
        child.w = this.getRowChildWidth(child, childWidth)
        
        this.layoutTree(child, childWidth, tempOffsetX, tempOffsetY, indent + "   ");
        if (!this.isContainer(child)) {
          child.h = this.computeContentHeight(child, width);
        }
        tempOffsetX = child.w + tempOffsetX + gapX;
        maxH = Math.max(maxH, child.h)
      }

      if (this.growRowChildrenInHeight) {
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            // Only for containers???
            child.h = this.getRowChildHeight(child, maxH)
        }
      }

    }
    return { x: tempOffsetX, y: tempOffsetY };
  }

  getRowChildWidth (child, childWidth) {
      if (this.isContainer(child)) {
          return childWidth;
      } else {
          if (this.isLayoutGrow(child)) {
            return childWidth
          }
          return Math.min(childWidth, child.w);
      }
  }

  getColumnChildWidth (node, parentWidth) {
    // add here some logic to deal with flexible labels
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

  computeChildrenHeight(node, includeParent = true) {
    // check here the min as the node.h??
    let top = 0;
    let bottom = 100000;
    node.children.forEach((c) => {
      bottom = Math.min(bottom, c.y);
      top = Math.max(top, c.y + c.h);
    });
    const h = top - bottom;
    if (includeParent) {
      return Math.max(h, node.h)
    }
    return h
  }

  computeChildrenWidth(node, includeParent = true) {
      // check here the min as the node.h??
      let left = 100000;
      let right = 0;
      node.children.forEach((c) => {
        left = Math.min(left, c.x);
        right = Math.max(right, c.x + c.w);
      });
      const w = right - left;
      if (includeParent) {
        return Math.max(w, node.w)
      }
      return w
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

}
