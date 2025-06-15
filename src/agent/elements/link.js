export default {
  id: "Link",
  type: "WebLink",
  description: "The link element can be used to link to other pages. It has a value 'label' in the 'props' object",
  descriptionHTML: "The link element can be used to link to other pages. It has a value 'label' property",
  name: "Link",
  props: {
    label: "Click Me"
  },
  has: {
    onclick: true,
    label: true
  },
  style: {
    textDecoration: "underline"
  },
  hover: {
    color: "@label-color:hover"
  }
}
