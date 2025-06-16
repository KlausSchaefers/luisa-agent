export default [
  {
    type: "Image",
    description: `
The image element shows images in a page. It has a value property in the props object which presents the URL of the image. 
An image can have a 'variant' property, which can have the following values: 
'Small', 'Normal', 'Large' and 'FullWidth'. The variant corresponds to the size of the image.
    `,
    descriptionHTML: `
The image element shows images in a page. It has a value property presents the URL of the image.
A image can have a 'variant' property, which can have the following values: 
'Small', 'Normal', 'Large' and 'FullWidth'. The variant corresponds to the size of the image.
    `,
    name: "Image",
    x: 0,
    y: 0,
    w: "@box-width-xl",
    h: "@box-width-xl",
    z: 0,
    layout: {
      grow:1
    },
    props: {},
    has: {
      onclick: true,
      backgroundImage: true,
      borderRadius: true,
      border: true,
      iconPlaceholder: true,
    },
    actions: {},
    style: {
      borderRadius: 8,
      borderWidth: 0,
      borderStyle: "solid",
      borderColor: "@form-border-color",
      backgroundImage: null,
    },
  },
  {
    type: "Image",
    name: "ImageSmall",
    variant: "Small",
    extends: "Image",
    w: "@box-width-m",
    h: "@box-width-m",
    layout: {
      grow:0
    }
  },
  {
    type: "Image",
    name: "ImageSmall",
    variant: "Normal",
    extends: "Image",
    w: "@box-width-xl",
    h: "@box-width-xl",
    layout: {
      grow:0
    }
  },
  {
    type: "Image",
    name: "ImageSmall",
    variant: "Large",
    extends: "Image",
    w: "@box-width-xxl",
    h: "@box-width-xxl",
    layout: {
      grow:0
    }
  },
  {
    type: "Image",
    name: "ImageSmall",
    variant: "Small",
    extends: "Image",
    w: "@box-width-m",
    h: "@box-width-m",
    layout: {
      grow:0
    }
  },
];
