export default {
  id: "Screen",
  type: "Screen",
  name: "Screen",
  description: "The root element of your design. It can have many children.",
  x: 0,
  y: 0,
  w: "@box-width-l",
  h: 800,
  z: 0,
  props: {
    start: false
  },
  actions: {},
  style: {
    fontSize: "@font-size-m",
    background: "@screen-background"
  }
}
