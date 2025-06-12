export default [
  {
    id: "Label",
    type: "Label",
    name: "Text",
    description: `
An Element that can show text. It has a 'label' value in the 'props' object. 
It should be used for labels as the default element for all kind text. 
A label can have a 'variant' property, which can have the following values: 
'Hint', 'Emphasis'. 
  `,
    x: 0,
    y: 0,
    w: "@box-width-xl",
    h: "@box-height-xs",
    z: 0,
    props: {
      label: "Lore Ipsum",
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
