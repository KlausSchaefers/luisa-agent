import { expect, test } from 'vitest'

import ComplexConverter  from '../src/agent/converter/ComplexConverter'
import DesignConverter  from '../src/agent/converter/DesignConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import app_complex from './data/app_complex.json'


test('Test ComplexConverter >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()
    const complex = new ComplexConverter(elements)
    const design = new DesignConverter(elements, dls)

    const app = {
        screens:[app_complex]
    }
    const expanded = complex.convert(app)
    const result = design.convert(expanded)

    const scrn = result.screens[0]
    
    //console.log(JSON.stringify(result, null, 2))
    expect(scrn.children[0].type).toBe("Login")





})