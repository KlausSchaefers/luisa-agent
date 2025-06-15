export default {
  id: "Image",
  type: "Image",
  description: "The image element shows images in a page. It has a value property in the props object which presents the URL of the image.",
  descriptionHTML: "The image element shows images in a page. It has a value property presents the URL of the image.",
  name: "Image",
  x: 0,
  y: 0,
  w: "@box-width-xl",
  h: "@box-width-xl",
  z: 0,
  props: {},
  has: {
    onclick: true,
    backgroundImage: true,
    borderRadius: true,
    border: true
  },
  actions: {},
  style: {
    borderRadius: 0,
    borderWidth: 0,
    borderStyle: "solid",
    borderColor: "@form-border-color",
    backgroundImage: null
  }
}
