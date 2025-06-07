import { expect, test } from 'vitest'
import Pipeline from '../src/agent/converter/Pipeline'
import QuxConverter from '../src/agent/converter/QuxConverter'
import DesignConverter  from '../src/agent/converter/DesignConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import app1 from './data/app1.json'
import PropsConverter from '@/agent/converter/PropsConverter'

test('Test QuxConverter >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()
   
    const qux = new QuxConverter()
    const design = new DesignConverter(elements, dls)
    const props = new PropsConverter(elements)
    const pipeline = new Pipeline([design,props, qux])
    const result =  pipeline.convert(app1)
    
    //console.log(JSON.stringify(result, null, 2))

    expect(result).toBeDefined()

    // let res = cmds.pruneStacks(structuredClone(stacks))
    // expect(res['e']).toBeDefined()
    // expect(res['d']).toBeDefined()
    
    // expect(res['a']).toBeUndefined()
    // expect(res['b']).toBeUndefined()
    // expect(res['c']).toBeUndefined()


    // res = cmds.pruneStacks(structuredClone(stacks), 4)
    // expect(res['e']).toBeDefined()
    // expect(res['d']).toBeDefined()
    // expect(res['b']).toBeDefined()
    // expect(res['c']).toBeDefined()

    // expect(res['a']).toBeUndefined()

})