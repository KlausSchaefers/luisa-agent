import { expect, test } from 'vitest'

import Elements  from '../src/agent/Elements'
import Prompt  from '../src/agent/Prompt'



test('Test Prompt >  ', async () => {


    const elements = new Elements()
   
    const result = new Prompt().elements(elements)

    console.debug(result)

    expect(result.indexOf('undefined')).toBe(-1)
})