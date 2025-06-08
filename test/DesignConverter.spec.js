import { expect, test } from 'vitest'

import DesignConverter  from '../src/agent/converter/DesignConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import app1 from './data/app1.json'


test('Test DesignConverter >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()
    const design = new DesignConverter(elements, dls)

    const app = {
        screens:[app1]
    }
    const result = design.convert(app)

    expect(result).toBeDefined()

    let scrn = result.screens[0]
    expect(scrn.type).toBe('Screen')
    expect(scrn.style.background).toBe('#FFFFFF')

    //console.log(JSON.stringify(scrn, null, 2))


})