import { expect, test } from 'vitest'

import DesignConverter  from '../src/agent/converter/DesignConverter'
import LayoutConverter  from '../src/agent/converter/LayoutConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import app1 from './data/app1.json'


test('Test LayoutConverter >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()
    const design = new DesignConverter(elements, dls)
    const styledTree = design.convert(app1)

    const layout = new LayoutConverter()
    const result = layout.convert(styledTree)



    expect(result).toBeDefined()
    expect(result.type).toBe('Screen')
    expect(result.style.background).toBe('#FFFFFF')

    console.log(JSON.stringify(result, null, 2))

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