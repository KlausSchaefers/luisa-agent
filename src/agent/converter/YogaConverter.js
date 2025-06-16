import { Converter } from "../Interfaces.js";
import Yoga, { Edge, FlexDirection, Direction, Gutter, Errata} from "yoga-layout";

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
    config.setErrata(Errata.Classic);

    copy.id = "s" + this.getUUID();
    copy.w = this.screenSize.w;
    copy.h = this.screenSize.h;
    copy.x = 0
    copy.y = 0

    let root = Yoga.Node.create(config);
    root.setFlexDirection(FlexDirection.Column);
    // root.setWidth(this.screenSize.w);
    // root.setHeight(this.screenSize.h);
    //root.setFlexGrow(1)

    yogaNodes[copy.id] = root;

    this.addNode(copy, root, yogaNodes);

    root.calculateLayout(this.screenSize.w, "auto", Direction.LTR);

    //

    console.debug("------- Reading ---------\n")
    this.readNodes(copy, yogaNodes);
  
    root.freeRecursive();

    return copy;
  }

  readNodes(node, yogaNodes, indent = "") {
    let yNode = yogaNodes[node.id];
    if (!yNode) {
      console.warn(this.name, "readNodes() no node with id", node.id);
    } else {

      node.y = yNode.getComputedLeft();
      node.h = yNode.getComputedHeight();
      node.x = yNode.getComputedTop();
      node.w = yNode.getComputedWidth();
      console.debug(indent, node.name, 'l:', yNode.getComputedLeft(), 't:',yNode.getComputedTop(), ' >> h:', yNode.getComputedHeight(), 'w:', yNode.getComputedWidth(), '>', node.x, node.y)
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

    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
      const yogaChild = Yoga.Node.create();

      yogaParent.insertChild(yogaChild, i);
      yogaNodes[child.id] = yogaChild;

      //console.debug(indent, "+", child.name, i, yogaChild.getParent())
      this.setChildProps(child, yogaChild, indent); 
      this.addNode(child, yogaChild, yogaNodes, indent + '   ')
    }
  }

  setChildProps(child, yogaChild, indent) {
    let { paddingX, paddingY } = this.getPadding(child);
    
    yogaChild.setFlexDirection(FlexDirection.Row);
    yogaChild.setFlexBasis(child.h)
    yogaChild.setMinHeight(child.h)

    if (this.isLayoutGrow(child)) {
      yogaChild.setFlexGrow(1);
      
    }

    if (this.isContainer(child)) {
      yogaChild.setWidthAuto();
      yogaChild.setHeightAuto();

    
      //yogaChild.setWidth(child.w);
      //yogaChild.setHeight(child.h);
      yogaChild.setFlexGrow(1)
    } else {
      //console.debug(indent, '  W/H', child.name, child.w, child.h);
      yogaChild.setWidth(child.w);
      yogaChild.setHeight(child.h);
    }

   console.debug(indent, "  P", child.name, this.isContainer(child), this.isRowContainer(child))
    if (this.isContainer(child)) {
   
      yogaChild.setPadding(Edge.Left, paddingX);
      yogaChild.setPadding(Edge.Right, paddingX);
      yogaChild.setPadding(Edge.Bottom, paddingY);
      yogaChild.setPadding(Edge.Top, paddingY);

      if (this.isRowContainer(child)) {
        yogaChild.setFlexDirection(FlexDirection.Column);
        yogaChild.setGap(Gutter.All, this.gapY);
        yogaChild.setFlexBasis(child.h)
      } else {
        yogaChild.setFlexDirection(FlexDirection.Row);
        yogaChild.setGap(Gutter.All, this.gapX);
        yogaChild.setFlexBasis(child.h)
      }

    }
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
