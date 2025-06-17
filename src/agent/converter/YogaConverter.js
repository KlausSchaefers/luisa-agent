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
    this.gapX = 16;
    this.gapY = 16;
    this.z = 1;
    this.isRemoveContainers = false;
    this.growRowChildrenInHeight = true;
    this.name = "YogaConverter";
  }

  convertTree(treeNode) {
    const copy = treeNode;
    this.setIDs(copy);

    console.debug(this.screenSize)

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
    // root.setPadding(Edge.Left, 0);
    // root.setPadding(Edge.Right, 0);
    // root.setPadding(Edge.Bottom, 0);
    // root.setPadding(Edge.Top, 0);
    root.setGap(Gutter.All, 16);
    // root.setWidth(this.screenSize.w);
    // root.setMinHeight(this.screenSize.h);
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
           
      const yogaChild = this.createYogaChild(child, node.children.length, indent); 
      yogaParent.insertChild(yogaChild, i);
      yogaNodes[child.id] = yogaChild;

      //console.debug(indent, "+", child.name, i, yogaChild.getParent())

      this.addNode(child, yogaChild, yogaNodes, indent + '   ')
    }
  }

  createYogaChild(child, siblingCount, indent) {
    const { paddingX, paddingY } = this.getPadding(child);
    const isRow= this.isRowContainer(child)
    const isGrow = this.isLayoutGrow(child)
    const isContainer = this.isContainer(child)
    const yogaChild = Yoga.Node.create();
    
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
    } else {
      //console.debug(indent, '  W/H', child.name, child.w, child.h);
      //yogaChild.setFlexGrow(1);      
      if (isGrow) {
        yogaChild.setWidthPercent(100)
        yogaChild.setFlexGrow(1);   
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
        console.debug(indent, 'row:', child.name, child.h , child.h + paddingX * 2)
        yogaChild.setFlexDirection(FlexDirection.Row);
        yogaChild.setGap(Gutter.All, this.gapY);
        yogaChild.setFlexBasis(child.w)
        yogaChild.setMinHeight(child.h + paddingY * 2)

      
            
      } else {
        console.debug(indent, 'col:', child.name, child.h , child.h + paddingX * 2, this.isJustifyCenter(child), this.isAlignCenter(child))
        yogaChild.setFlexDirection(FlexDirection.Column);
        yogaChild.setGap(Gutter.All, this.gapX);

        const p = 1 / siblingCount * 100
        //yogaChild.setWidthPercent(p)
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
