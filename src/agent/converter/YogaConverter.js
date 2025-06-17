import { Converter } from "../Interfaces.js";
import Yoga, { Edge, FlexDirection, Direction, Gutter, Errata, Justify, Align} from "yoga-layout";

export default class YogaConverter extends Converter {
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
    this.screenGapY = 16;
    this.z = 1;
    this.isRemoveContainers = false;
    this.growRowChildrenInHeight = true;
    this.name = "YogaConverter (" + w + ")";
  }

  convertTree(treeNode) {
    const copy = treeNode;
    this.setIDs(copy);

    const yogaNodes = {};

    const config = Yoga.Config.create();
    config.setPointScaleFactor(1);
    config.setErrata(Errata.All);

    copy.id = "s" + this.getUUID();
    copy.w = this.screenSize.w;
    copy.h = this.screenSize.h;
    copy.x = 0
    copy.y = 0

    let root = Yoga.Node.create(config);
    root.setFlexDirection(FlexDirection.Column);
    root.setGap(Gutter.All, this.screenGapY);
    root.setFlexGrow(1)

    yogaNodes[copy.id] = root;

    this.addNode(copy, root, yogaNodes);

    root.calculateLayout(this.screenSize.w, "auto", Direction.LTR);

   
    this.readNodes(copy, yogaNodes);
  
    copy.h = Math.max(copy.h, this.screenSize.h)
    root.freeRecursive();

    return copy;
  }

  readNodes(node, yogaNodes, indent = "") {
    let yNode = yogaNodes[node.id];
    if (!yNode) {
      console.warn(this.name, "readNodes() no node with id", node.id);
    } else {
      node.x = yNode.getComputedLeft();
      node.y = yNode.getComputedTop();
      node.h = yNode.getComputedHeight();
      node.w = yNode.getComputedWidth();
      //console.debug(indent, node.name, 'x:', yNode.getComputedLeft(), 'y:',yNode.getComputedTop(), ' >> h:', yNode.getComputedHeight(), 'w:', yNode.getComputedWidth(), '>', yNode.getParent()?.lID)
    }

    if (node.children) {
      for (let i = 0; i < node.children.length; i++) {
        const child = node.children[i];
        this.readNodes(child, yogaNodes, indent + '   ')
      }
    }
  }

  addNode(node, yogaParent, yogaNodes, indent = "") {
    //console.debug(indent, node.name)
    if (!node.children) {
      return;
    }

    if (node._hidden) {
      return
    }

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const nextChild = node.children[i+1];

      const yogaChild = this.createYogaChild(child, node, indent); 
      yogaParent.insertChild(yogaChild, i);
      yogaNodes[child.id] = yogaChild;

      // for labels we do not want a full gap
      if (nextChild &&  this.isLabel(child) && ( this.isInput(nextChild) || this.isContainer(nextChild))) {
        let gap = this.getGap(node)
        //yogaChild.setMargin(Edge.Bottom, -1 * (gap -8))
      }
      this.addNode(child, yogaChild, yogaNodes, indent + '   ')
    }
  }
  
  isLabel(child) {
    return child.type === 'Label' || child.type === 'Headline' || child.type === 'SubHeadline'
  }

  isInput(child) {
    return child.type === 'Input' || child.type === 'TextArea' || child.type === 'CheckBox' || child.type === 'CheckBoxGroup' || child.type === 'RadioBox' || child.type === 'RadioGroup'
  }

  createYogaChild(child, parent, indent) {
    const { paddingX, paddingY } = this.getPadding(child);
    const isRow = this.isRowContainer(child)
    const isParentRow = this.isRowContainer(parent)
    const isGrow = this.isLayoutGrow(child)
    const isContainer = this.isContainer(child)
    const yogaChild = Yoga.Node.create();
    const p = 1 / parent.children.length * 100
    const gap = this.getGap(child)

    yogaChild.setFlexDirection(FlexDirection.Column);

    if (this.isJustifyCenter(child)) {
        yogaChild.setJustifyContent(Justify.Center)
      }  
      if (this.isAlignCenter(child)) {
        yogaChild.setAlignItems(Align.Center)
      }  
 
    if (isContainer) {
    
      //yogaChild.setWidthAuto();
      //yogaChild.setWidthPercent(p)
      yogaChild.setHeightAuto();
      yogaChild.setFlexGrow(1)
      //yogaChild.setFlexShrink(1)
    } else {
      //console.debug(indent, '  W/H', child.name, child.w, child.h, isGrow);
      if (isGrow) {
        if (!isParentRow) {
          yogaChild.setWidthPercent(100)      
        } else {
          yogaChild.setFlexGrow(1)
        }
     
    
      } else {
        yogaChild.setFlexShrink(1); 
        yogaChild.setWidth(child.w);
      }   
      yogaChild.setHeight(child.h);
    }


    if (isContainer) {
      // yogaChild.setFlexShrink(1); 
      // yogaChild.setFlexGrow(1);    
      yogaChild.setPadding(Edge.Left, paddingX);
      yogaChild.setPadding(Edge.Right, paddingX);
      yogaChild.setPadding(Edge.Bottom, paddingY);
      yogaChild.setPadding(Edge.Top, paddingY);

      if (isRow) {
        //console.debug(indent, 'row:', child.name, child.h , child.h + paddingX * 2)
        yogaChild.setFlexDirection(FlexDirection.Row);
        yogaChild.setGap(Gutter.All, gap);
        yogaChild.setFlexBasis(child.w)
        yogaChild.setMinHeight(child.h + paddingY * 2)
            
      } else {
        //console.debug(indent, 'col:', child.name, child.h , child.h + paddingX * 2, this.isJustifyCenter(child), this.isAlignCenter(child))
        yogaChild.setFlexDirection(FlexDirection.Column);
        yogaChild.setGap(Gutter.All, gap);

        if (isParentRow) {       
          // check of all children are containers?
          if (this.allChildrenCanGrow(parent)) {       
            yogaChild.setFlexBasisPercent(p)
            yogaChild.setFlexGrow(0)
            yogaChild.setFlexShrink(1)
          } else {
            yogaChild.setFlexGrow(1)
          }
        } else {
          yogaChild.setFlexGrow(1)
        }
      
       // yogaChild.setFlexGrow(1)
        //yogaChild.setFlexShrink(1)
        //console.debug(indent, '  W/ %', child.name, child.w, 1 / siblingCount, p);

        // some hack to simulate content model???
        yogaChild.setMinHeight(child.h + paddingY * 2) 

        // reverse because of Column
        if (this.isJustifyCenter(child)) {
            yogaChild.setAlignItems(Align.Center)
        }  
        if (this.isAlignCenter(child)) {
            yogaChild.setJustifyContent(Justify.Center)
        }  
      }

    }
    return yogaChild
  }

  allChildrenCanGrow (node) {
    const nonContainer = node.children.find(c => !c.container)
    return nonContainer === undefined
  }

  isJustifyCenter(child) {
    return child?.layout?.justifyContent === 'center';
  }

  isAlignCenter(child) {
    return child?.layout?.alignItems === 'center';
  }

  getPadding(node) {
    let paddingX = 0;
    let paddingY = 0;

    if (this.isContainer(node)) {
 
      if (node?.style?.paddingLeft > 0) {
        paddingX = node?.style?.paddingLeft;
      }
      if (node?.style?.paddingTop > 0) {
        paddingY = node?.style?.paddingTop;
      }
    }
    return { paddingX, paddingY };
  }

  getGap(node) {
    if (this.isContainer(node)) { 
      if (node?.style?.gap > 0) {
        return node?.style?.gap
      }
      return 16
    }
    return 0
  }

  setIDs(node) {
    node.id = "w" + this.getUUID();
    node.z = this.z++;
    if (node.children) {
      node.children.forEach((child) => {
        this.setIDs(child);
      });
    }
  }

  getUUID() {
    const uuid = this.lastUUID++ + "_" + Math.round(Math.random() * 100000);
    return uuid;
  }
}
