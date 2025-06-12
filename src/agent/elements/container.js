export default {
  type: "Container",
  name: "Container",
  description: `
The container element is used to group and align child elements. The container is 
vivible not present is mainly used for layouting. The container is the default way 
of grouping elements. A container has an list of 'children' elements. A container 
has an variable 'direction' in the 'layout' object. It can have the values 'row' 
and 'column'. 'row' means that the elements are aligned horizontal from left to right, 
'column' means the elements are aligned vertical from top to down.
  `,
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
    padding: "@container-padding",
    fontFamily: "@font-family",
    borderRadius: "@border-radius",
    borderWidth: "@container-border-width",
    borderStyle: "@container-border-style",
    borderColor: "@container-border-color",
    background: "@container-background"
  }
}
