import { expect, test } from 'vitest'
import PropsConverter from '../src/agent/converter/PropsConverter'
import Elements from '../src/agent/Elements'
import QuxConverter from '../src/agent/converter/QuxConverter'
import grid_bug from './data/grid_bug.json'

test('Test GridBug >  ', async () => {


    const props = new PropsConverter(new Elements())
    const qux = new QuxConverter()
    const result = qux.convert(props.convert(grid_bug))

    // for (let w of Object.values(result.widgets)) {
    //     console.debug(w.name, w.y, w.y + w.h)
    // }
    
    //console.log(JSON.stringify(result, null, 2))

    expect(result).toBeDefined()
    expect(result.widgets).toBeDefined()
    expect(Object.values(result.screens).length).toBe(1)
    // expect(Object.values(result.widgets).length).toBe(9)
})

