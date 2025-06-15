export default {
  id: "Headline",
  type: "Headline",
  name: "Headline",
  description: "The headline is an element which contains two or three words which summarize and introduce the following UI section. There should be only a few headlines.",
  x: 0,
  y: 0,
  w: "@box-width-xl",
  h: "@box-height-ms",
  z: 0,
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
}
