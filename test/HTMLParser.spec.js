import { expect, test } from 'vitest'

import HTMLParser from '../src/agent/converter/HTMLParser'

import html from './data/html2'


test('Test HTMLParser >  ', async () => {

    const json = HTMLParser.parse(html)

    //console.debug(JSON.stringify(json, null, 2))
   
    expect(json.children[0].type).toBe("Nav")
    expect(json.children[1].type).toBe("CheckBoxGroup")
    expect(json.children[1].props.options).toStrictEqual(['A','B','C'])
    // expect(result.widgets).toBeDefined()
    // expect(Object.values(result.screens).length).toBe(1)
    // expect(Object.values(result.widgets).length).toBe(9)
})

