import { expect, test } from 'vitest'
import Pipeline from '../src/agent/Pipeline'
import QuxConverter from '../src/agent/converter/QuxConverter'
import DLS  from '../src/agent/DLS'
import hero from '../src/examples/hero'


test('Test QuxConverter >  ', async () => {

    
    const dls = new DLS()

    const pipeline = Pipeline.defaultPipeline(dls)
    const raw =  pipeline.convert(hero)
    
    const qux = new QuxConverter()
    const result = qux.convert(raw)
    //console.log(JSON.stringify(result, null, 2))

    let w = Object.values(result.widgets).find(w => w.name === 'Hero Instance 1')
    expect(w.h).toBe(600)

    // expect(result).toBeDefined()
    // expect(result.widgets).toBeDefined()
    // expect(Object.values(result.screens).length).toBe(1)
    // expect(Object.values(result.widgets).length).toBe(9)
})

