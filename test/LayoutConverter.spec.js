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

    const app = {
        screens:[app1]
    }

    const styledTree = design.convert(app)

    const layout = new LayoutConverter()
    const result = layout.convert(styledTree)

    expect(result).toBeDefined()

    let scrn = result.screens[0]
    expect(scrn.type).toBe('Screen')
    expect(scrn.style.background).toBe('#FFFFFF')

   // console.log(JSON.stringify(result, null, 2))


})