import { expect, test } from 'vitest'

import PropsConverter  from '../src/agent/converter/PropsConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import app1 from './data/app1.json'


test('Test PropsConverter >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()
    const props = new PropsConverter(elements, dls)
    const result = props.convert(app1)

    console.log(JSON.stringify(result, null, 2))
    expect(result).toBeDefined()
    expect(result.props.start).toBe(false)



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