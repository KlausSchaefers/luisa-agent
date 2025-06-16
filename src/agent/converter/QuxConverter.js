import { Converter } from "../Interfaces.js";
import FlexConverter from './FlexConverter'
import YogaConverter from './YogaConverter.js'

export default class QuxConverter extends Converter {
  constructor(w = 400, h = 800) {
    super();
    this.screenSize = {
      w: w,
      h: h,
    };
    this.lastUUID = 10000;   
    this.isRemoveContainers = false; 
    this.growRowChildrenInHeight = true
    this.name = 'QuxConverter'

    this.typeMapping = {
      'Container': 'Box',
      'Card': 'Box',
      'Hero': 'Box',
      'Input': 'TextBox',
      'Headline': 'Label',
      'SubHeadline': 'Label',
      'RadioBox': 'LabeledRadioBox',
      'Nav': 'Box',
      'NavLink': 'Button',
      'Section': 'Box'
    }

    this.flexConverter = new FlexConverter(w,h)
    //this.flexConverter = new YogaConverter(w, h)
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
    tree = this.flexConverter.convertTree(tree)
    this.setIDs(tree)
    const app = this.flattenTree(tree, this.screenSize.w, this.screenSize.h);
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
        delete w.extends

        // to avoid some scalling issue in luisa
        if (!w.props) {
          console.warn("QuxConverter.cleanUpModel() > No props",)
          w.props = {}
        }
        w.props.resize = {
          left: true,
          right:true
        }

        if (w.type === 'Image' && w.props.value) {
          // w.style.backgroundImage = {
          //   "url" : w.props.value,
          //   "w" : 608,
          //   "h" : 648
          // }
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
      node.z = this.z++
      if (node.children) {
         node.children.forEach((child) => {
          this.setIDs(child)
        })
      }
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
