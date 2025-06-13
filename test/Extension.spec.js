import { expect, test } from 'vitest'

import Elements  from '../src/agent/Elements'

import button  from '../src/agent/elements/button'

test('Test Elements >  ', async () => {

    const elements = new Elements()
    const e = elements.get({type: 'Button', variant: 'Danger'})

    expect(e).toBeDefined()
    expect(e.props).toBeDefined()
    expect(e.w).toBeDefined()
    expect(e.h).toBeDefined()
//     expect(e.style.background).toBe(button_danger.style.background) // overwritten
//     expect(e.style.background).not.toBe(button.style.background)
//     expect(e.style.fontSize).toBe(button.style.fontSize) // inherited
})