import { expect, test } from 'vitest'

import PropsConverter  from '../src/agent/converter/PropsConverter'
import Elements  from '../src/agent/Elements'
import DLS  from '../src/agent/DLS'

import app1 from './data/app1.json'


test('Test PropsConverter >  ', async () => {

    const dls = new DLS()
    const elements = new Elements()
    const props = new PropsConverter(elements, dls)
    const app = {
        screens:[app1]
    }
    const result = props.convert(app)

    //console.log(JSON.stringify(result, null, 2))
    let scrn = result.screens[0]
    expect(scrn).toBeDefined()
    expect(scrn.props.start).toBe(false)

})