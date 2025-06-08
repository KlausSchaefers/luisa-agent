import { expect, test } from 'vitest'
import QuxConverter from '../src/agent/converter/QuxConverter'
import grid_bug from './data/grid_bug.json'

test('Test GridBug >  ', async () => {


   
    const qux = new QuxConverter()
    const result = qux.convert(grid_bug)
    
    //console.log(JSON.stringify(result, null, 2))

    expect(result).toBeDefined()
    expect(result.widgets).toBeDefined()
    expect(Object.values(result.screens).length).toBe(1)
    // expect(Object.values(result.widgets).length).toBe(9)
})

