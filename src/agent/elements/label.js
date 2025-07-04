export default [
  {
    id: "Label",
    type: "Label",
    name: "Text",
    layout: {
      grow: 1
    },
    description: `
An Element that can show text. It has a 'label' value in the 'props' object. 
It should be used for labels as the default element for all kind text. 
A label can have a 'variant' property, which can have the following values: 
'Hint', 'Emphasis'. 
  `,
   descriptionHTML: `
An Element that can show text. It has a 'label' property. 
It should be used for labels as the default element for all kind text. 
A label can have a 'variant' property, which can have the following values: 
'Hint', 'Emphasis'. Labels MUST not have any child elements.
  `,
    x: 0,
    y: 0,
    w: "@box-width-xxl",
    h: "@font-size-m",
    z: 0,
    props: {
      label: "The text value to be shown",
    },
    has: {
      label: true,
      padding: true,
      advancedText: true,
    },
    style: {
      fontSize: "@font-size-m",
      fontFamily: "@font-family",
      textAlign: "left",
      letterSpacing: "@letterSpacing",
      lineHeight: "@lineHeight",
      color: "@label-color",
      textShadow: null,
    },
  },
  {
    type: "Label",
    name: "Hint",
    variant: "Hint",
    extends: "Label",
    style: {
      fontStyle: "italic",
    }
  },
  {
    type: "Label",
    name: "Hint",
    variant: "Emphasis",
    extends: "Label",
    style: {
      fontWeight:"@font-weight-bold"
    }
  },
];
