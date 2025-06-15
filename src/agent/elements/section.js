export default [
  {
    type: "Section",
    name: "Section",
    description: `
The Section element is used to group related elements in an page. The are usually directly children of the "Screen" element. 
A Section has an list of 'children' elements. A Section has an variable 'direction' in the 'layout' object. It can have the values 'row' 
and 'column'. 'row' means that the elements are aligned horizontal from left to right, 
'column' means the elements are aligned vertical from top to down.
  `,
    descriptionHTML: `
The Section element is used to group related elements in an page. The are usually directly children of the "Screen" element. 
A Section has an list of 'children' elements.
A Section has an property 'flex-direction'. It can have the values 'row' and 'column'. 
row means that the elements are aligned horizontal from left to right, 
column means the elements are aligned vertical from top to down.
  `,
    container: true,
    x: 0,
    y: 0,
    w: "@box-width-l",
    h: 240,
    z: 0,
    props: {
      paddingSnap: true,
    },
    layout: {
    },
    has: {
      backgroundColor: true,
      border: true,
    },
    actions: {},
    style: {
      fontSize: "@font-size-m",
      textAlign: "left",
      letterSpacing: "@letterSpacing",
      lineHeight: "@lineHeight",
      padding: "@section-padding",
      fontFamily: "@font-family",
      borderRadius: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: "@section-border-color",
      background: "@section-background",
    },
  },
];
