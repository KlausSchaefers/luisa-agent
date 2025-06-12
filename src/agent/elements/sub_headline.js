export default {
  id: "SubHeadline",
  type: "SubHeadline",
  name: "SubHeadline",
  description: "A sub headline can lead a paragraph or be used in a card element. They usyally have a few word which summarize and introduce the following UI. The can moe often used then headlines.",
  x: 0,
  y: 0,
  w: "@box-width-xl",
  h: "@box-height-xs",
  z: 0,
  props: {
    label: "Sub Headline"
  },
  has: {
    label: true,
    padding: true,
    advancedText: true
  },
  style: {
    fontSize: "@font-size-xl",
    fontWeight: "@font-weight-bold",
    fontFamily: "@font-family",
    textAlign: "left",
    letterSpacing: 1,
    lineHeight: 1,
    color: "@label-color",
    textShadow: null
  }
}
