import { expect, test } from 'vitest'

import Elements  from '../src/agent/Elements'
import Prompt  from '../src/agent/prompts/ScreenPrompt'



test('Test Prompt.jsonElements() >  ', async () => {


    const elements = new Elements()
   
    const result = new Prompt().jsonElements(elements)

    console.debug(result)

    expect(result.indexOf('undefined')).toBe(-1)
})

test('Test Prompt.htmlElements() >  ', async () => {


    const elements = new Elements()
   
    const result = new Prompt().htmlElements(elements)

    console.debug(result)

    expect(result.indexOf('undefined')).toBe(-1)
})