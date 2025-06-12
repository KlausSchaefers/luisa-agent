export default {
  id: "Card",
  type: "Card",
  name: "Card",
  description: "A Card element is used to group similar elements together and highlight the grouping with a visible border. The card can have child elements. The card has an list of 'children' elements. A card has an variable 'direction' in the 'props' object. It can have the values 'row' and 'column'. row means that the elements are aligned horizontal from left to right, column means the elements are aligned vertical from top to down.",
  container: true,
  x: 0,
  y: 0,
  w: "@box-width-l",
  h: "@box-height-s",
  z: 0,
  props: {
    paddingSnap: true
  },
  has: {
    backgroundColor: true,
    border: true
  },
  actions: {},
  style: {
    fontSize: "@font-size-m",
    textAlign: "left",
    letterSpacing: "@letterSpacing",
    lineHeight: "@lineHeight",
    padding: "@card-padding",
    fontFamily: "@font-family",
    borderRadius: "@border-radius-l",
    borderWidth: "@card-border-width",
    borderColor: "@card-border-color",
    background: "@container-background",
    boxShadow: "@card-box-shadow"
  }
}
