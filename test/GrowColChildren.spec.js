import { expect, test } from 'vitest'
import Pipeline from '../src/agent/Pipeline'
import QuxConverter from '../src/agent/converter/QuxConverter'
import DLS  from '../src/agent/DLS'
import fruits from '../src/examples/fruits'


test('Test QuxConverter >  ', async () => {

    
    const dls = new DLS()

    const pipeline = Pipeline.defaultPipeline(dls)
    const raw =  pipeline.convert(fruits)
    
    const qux = new QuxConverter()
    const result = qux.convert(raw)
    //console.log(JSON.stringify(result, null, 2))

    // let w = Object.values(result.widgets).find(w => w.name === 'Hero Instance 1')
    // expect(w.h).toBe(648)// with padding


    // w = Object.values(result.widgets).find(w => w.name === 'Headline')
    // expect(w.props.label).toBe("This is the headline")
    // expect(result).toBeDefined()
    // expect(result.widgets).toBeDefined()
    // expect(Object.values(result.screens).length).toBe(1)
    // expect(Object.values(result.widgets).length).toBe(9)
})

