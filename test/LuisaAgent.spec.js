import { expect, test } from 'vitest'

import LuisaAgent  from '../src/agent/LuisaAgent'
import QuxConverter  from '../src/agent/converter/QuxConverter'
import MockLLM from './mocks/MockLLM'

import app1 from './data/app1.json'
import structure from './data/structure.json'

test('Test LuisaAgent >  ', async () => {

    const llm = new MockLLM([structure, app1])
    const luisa = new LuisaAgent(llm)

    const result = await luisa.run([{
        "role": "user",
        "content": "Please create a cool login page"
    }])
    //console.log(JSON.stringify(result.screens, null, 2))

    expect(result.screens.length).toBe(1)
    const flat = new QuxConverter().convert(result)
   // console.log(JSON.stringify(flat.screens, null, 2))


    expect(flat).toBeDefined()
    expect(flat.screens).toBeDefined()
    expect(Object.values(flat.screens)[0].name).toBe("Test Screen 1")
    expect(flat.widgets).toBeDefined()
})