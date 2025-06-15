export default {
  id: "Screen",
  type: "Screen",
  name: "Screen",
  description: `
The root element of your design. It can have many children. Often these elements are Nav, 
Sections and Heros, but it can be also container elements. If the app has many screens, 
the first element is often a Nav bar element at the top.
  `,
  descriptionHTML: `
The root element of your design. It can have many children. Often these elements are Nav, 
Sections and Heros, but it can be also container elements. If the app has many screens, 
the first element is often a Nav bar element at the top.
  `,
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
