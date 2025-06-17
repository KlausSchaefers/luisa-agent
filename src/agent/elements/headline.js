export default [{

  type: "Headline",
  name: "Headline",
  description: `
The headline is an element which contains two or three words which summarize and introduce the following UI section. There should be only a few headlines.
A headline has a label value in the "props" object.
A Headline can have a 'variant' property, which can have the following values: 
'H1', 'H2', 'H3' which correspond to the importance. There should be only a view H1 in a page, usually in a section or under the screen. 
`,
  descriptionHTML: `
The headline is an element which contains two or three words which summarize and introduce the following UI section. 
There should be only a few headlines. It has a label property.
A Headline can have a 'variant' property, which can have the following values: 
'H1', 'H2', 'H3' which correspond to the importance. There should be only a view H1 in a page, usually in a section or under the screen. 
`,
  x: 0,
  y: 0,
  w: "@box-width-xl",
  h: "@box-height-ms",
  z: 0,
  layout: {
    grow: 1
  },
  props: {
    label: "Headline"
  },
  has: {
    label: true,
    padding: true,
    advancedText: true
  },
  style: {
    fontSize: "@font-size-xxl",
    fontWeight: "@font-weight-bold",
    fontFamily: "@font-family",
    textAlign: "left",
    letterSpacing: 1,
    lineHeight: 1,
    color: "@label-color",
    textShadow: null
  }
},
{
  type: "Headline",
  name: "HeadlineH2",
  variant: "H2",
  extends: "Headline",
  style: {
    fontSize: "@font-size-xl"
  }
},
{
  type: "Headline",
  name: "HeadlineH2",
  extends: "Headline",
  variant: "H3",
  style: {
    fontSize: "@font-size-l"
  }
}]
