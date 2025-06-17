import { expect, test } from 'vitest'
import Pipeline from '../src/agent/Pipeline'
import FlexConverter from '../src/agent/converter/FlexConverter'
import YogaConverter from '../src/agent/converter/YogaConverter'
import QuxConverter from '../src/agent/converter/QuxConverter'
import DLS  from '../src/agent/DLS'
import fruits from '../src/examples/fruits'
import hero from '../src/examples/hero'
import * as Util from './TestUtil'

import Yoga, { Edge, FlexDirection, Direction, Gutter, Edge } from "yoga-layout";



// test('Test YogaConverter > fruits ', async () => {

    
//     const dls = new DLS()

//     const pipeline = Pipeline.defaultPipeline(dls)
//     const raw =  pipeline.convert(fruits)
    
//     const yogo = new YogaConverter()
//     const result = yogo.convert(raw)
//     //console.log(Util.printTree(result.screens[0]))

//     // let w = Object.values(result.widgets).find(w => w.name === 'Hero Instance 1')
//     // expect(w.h).toBe(648)// with padding


//     // w = Object.values(result.widgets).find(w => w.name === 'Headline')
//     // expect(w.props.label).toBe("This is the headline")
//     // expect(result).toBeDefined()
//     // expect(result.widgets).toBeDefined()
//     // expect(Object.values(result.screens).length).toBe(1)
//     // expect(Object.values(result.widgets).length).toBe(9)
// })


test('Test YogaConverter >  hero', async () => {

    
    const dls = new DLS()
    dls.set("@container-border-width", 1)
          .set("@container-border-color", "#123ef099")
          .set("@container-border-style", "dashed")
          .set("@container-padding", 16)

    const pipeline = Pipeline.defaultPipeline(dls)
    const raw =  pipeline.convert(hero)
    
    
    const yogo = new YogaConverter(1000)
    const result = yogo.convert(structuredClone(raw))

    console.debug("---")
    console.log(Util.printTree(result.screens[0]))

    // console.debug("---")

    // const flex = new FlexConverter(1000)
    // const resultFlex = flex.convert(structuredClone(raw))
    // console.log(Util.printTree(resultFlex.screens[0]))

    // const qux = new QuxConverter(1000, 1000, 'yoga')
    // const resultQUX = qux.convert(raw)

    // console.debug("-- QUX ---")
    // Object.values(resultQUX.widgets).forEach(w => {
    //     console.debug(w.name, w.x, w.y)
    // })

    //console.log(JSON.stringify(result.screens[0], null, 2))

})

// test('Test YogaConverter >  ', async () => {

    
//     const root = Yoga.Node.create();
//     root.setFlexDirection(FlexDirection.Column);

//     root.setPadding(Edge.Top, 10)
//     root.setPadding(Edge.Left, 10)
//     root.setPadding(Edge.Right, 10)
//     root.setGap(Gutter.All, 10)

//     const child0 = Yoga.Node.create();
//     child0.setWidth(100)
//     child0.setHeight(50)
//     child0.setMargin(Edge.Right, 10);
//     root.insertChild(child0, 0);

//     const child1 = Yoga.Node.create();
//     child1.setWidth(100)
//     child1.setHeight(50)
//     root.insertChild(child1, 1);

//     const cntr = Yoga.Node.create();
//     cntr.setFlexDirection(FlexDirection.Row)
//     root.insertChild(cntr, 2);


//     const child3 = Yoga.Node.create();
//     child3.setWidth(100)
//     child3.setHeight(200)
//     cntr.insertChild(child3, 0);

//     const child4 = Yoga.Node.create();
//     child4.setWidth(200)
//     child4.setHeight(200)
//     cntr.insertChild(child4, 1);

    
//     root.calculateLayout(400, 600, Direction.LTR);

//     newFunction('root', root)
//     newFunction('child0', child0)
//     newFunction('child1', child1)
//     newFunction('cntr', cntr)
//     newFunction('child3', child3)
//     newFunction('child4', child4)


// })

function newFunction(name, child0) {
    console.debug(name, child0.getComputedLeft(), child0.getComputedTop(), child0.getComputedWidth(), child0.getComputedHeight(), child0.getParent())
}