export default {
  type: "Nav",
  name: "Nav",
  description: `
The "Nav" element is used to to show the main navigational elements on a page. The nav element
should be the first element in a desktop screen if navigation over multiple pages is required. 
On mobile screens, it can be also the last element at the bottom.
If the nav element is placed in a Container, the container should have a "row" layout so
the nav element is the first element on the left.
A nav has an list of 'children' elements. These are usually "Button" elements. A nav 
has an variable 'direction' in the 'layout' object. It can have the values 'row' 
and 'column'. The default is "row", only when the nav element is placed in a container,
it can be column.

  `,
 layout: {
    direction: "row",
    justifyContent: "center"
  },
  container: true,
  x: 0,
  y: 0,
  w: "@box-width-xxl",
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
