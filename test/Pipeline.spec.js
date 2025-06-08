import { expect, test } from 'vitest'
import Pipeline from '../src/agent/Pipeline'
import QuxConverter from '../src/agent/converter/QuxConverter'
import DesignConverter  from '../src/agent/converter/DesignConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import app1 from './data/app1.json'
import PropsConverter from '@/agent/converter/PropsConverter'

test('Test Pipeline >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()


    const app = {
        screens:[app1]
    }
   
    const qux = new QuxConverter()
    const design = new DesignConverter(elements, dls)
    const props = new PropsConverter(elements)
    const pipeline = new Pipeline([design,props, qux])
    const result =  pipeline.convert(app)
    
    console.log(JSON.stringify(result, null, 2))

    expect(result).toBeDefined()
})

