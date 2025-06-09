import { expect, test } from 'vitest'
import Pipeline from '../src/agent/Pipeline'
import QuxConverter from '../src/agent/converter/QuxConverter'
import ComplexConverter  from '../src/agent/converter/ComplexConverter'
import DesignConverter  from '../src/agent/converter/DesignConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import card_bug from './data/card_bug.json'
import PropsConverter from '@/agent/converter/PropsConverter'

test('Test Pipeline >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()
   
    const qux = new QuxConverter()
    const complex = new ComplexConverter(elements)
    const design = new DesignConverter(elements, dls)
    const props = new PropsConverter(elements)
    const pipeline = new Pipeline([complex, design,props, qux], dls)
    const result =  pipeline.convert(card_bug)
    
    //console.log(JSON.stringify(result, null, 2))

    expect(result).toBeDefined()
    for (let id in result.widgets) {
        const w = result.widgets[id]
        expect(w.y).toBeDefined()
        expect(w.x).toBeDefined()
        expect(w.h).toBeDefined()
        expect(w.w).toBeDefined()
    }
})

