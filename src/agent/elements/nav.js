export default [
  {
    type: "Nav",
    name: "Nav",
    description: `
The "Nav" element is used to to show the main navigational elements on a page. The nav element
should be the first element in a desktop screen if navigation over multiple pages is required. 
On mobile screens, it can be also the last element at the bottom.
If the nav element is placed in a Container, the container should have a "row" layout so
the nav element is the first element on the left.
A nav has an list of 'children' elements. These are always "NavLink" or very seldom "Input" for a search. A nav 
has an variable 'direction' in the 'layout' object. It can have the values 'row' 
and 'column'. The default is "row", only when the nav element is placed in a container,
it can be column.
Never add a Nav element, if you are not going to add more then one NavLink elemeent!
  `,
  descriptionHTML: `
The "Nav" element is used to to show the main navigational elements on a page. The nav element
should be the first element in a desktop screen if navigation over multiple pages is required. 
On mobile screens, it can be also the last element at the bottom.
If the nav element is placed in a Container, the container should have a "row" layout so
the nav element is the first element on the left.
A nav has an list of 'children' elements. These are always "NavLink" or very seldom "Input" for a search. 
A nav has an property 'flex-direction'. It can have the values 'row' and 'column'. 
row means that the elements are aligned horizontal from left to right, column means the elements are aligned vertical from top to down.
Never add a Nav element, if you are not going to add more then one NavLink elemeent!
  `,
    layout: {
      direction: "row",
      justifyContent: "center",
    },
    container: true,
    x: 0,
    y: 0,
    w: "@box-width-xxl",
    h: "@box-height-s",
    z: 0,
    props: {
      paddingSnap: true,
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
      padding: 16,
      fontFamily: "@font-family",
      borderRadius: 0,
      borderTopWidth: 0,
      borderBottomWidth: 1,
      borderRightWidth: 0,
      borderLeftWidth: 0,
      borderColor: "@nav-bar-border-color",
      background: "@nav-bar-background",
      color: "@nav-bar-color"
    },
  },
  {
    type: "NavLink",
    name: "NavLink",
    description: `
The "NavLink" element is used inside a Nav element to render links to other pages. A NavLink can have a 'variant' property, which can have the following values: 
'Default', 'Active', 'CallToAction'. The highlight variant should be used for important elements, like sign-up or sign-in buttons. 
  `,
  descriptionHTML: `
The "NavLink" element is used inside a Nav element to render links to other pages. It has a label property. A NavLink can have a 'variant' property, which can have the following values: 
'Default', 'Active', 'CallToAction'. The highlight variant should be used for important elements, like sign-up or sign-in buttons. A NavLink must not have any children 
  `,
    x: 0,
    y: 0,
    w: "@box-width-l",
    h: "@form-height",
    z: 0,
    layout: {
      grow: 0
    },
    props: {
      "label": "Nav"
    },
    has: {
      backgroundColor: true,
      border: true,
    },
    actions: {},
    style: {
      fontSize: "@font-size-m",
      fontFamily: "@font-family",
      textAlign: "center",
      letterSpacing: "@letterSpacing",
      lineHeight: "@lineHeight",
      verticalAlign: "middle",
      padding: 0,
      borderRadius: "@border-radius",
      borderWidth: "@border-width",
      borderStyle: "solid",
      borderColor: "@nav-border-color",
      background: "@nav-background",
      color: "@nav-color",
    },
    hover: {
      borderColor: "@nav-border-color:hover",
      background: "@nav-background:hover",
      color: "@nav-color:hover",
    },
    active: {
      borderColor: "@nav-border-color:hover",
      background: "@nav-background:hover",
      color: "@nav-color:hover",
    },
  },
  {
    type: "NavLink",
    name: "NavLinkActive",
    extends: "NavLink",
    variant:"Active", 
    style: {
      borderColor: "@nav-border-color:hover",
      background: "@nav-background:hover",
      color: "@nav-color:hover",
    },
    hover: {
      borderColor: "@nav-border-color:hover",
      background: "@nav-background:hover",
      color: "@nav-color:hover",
    }
  },
  {
    type: "NavLink",
    name: "NavLinkCallToAction",
    extends: "NavLink",
    variant:"CallToAction", 
    style: {
      borderColor: "@button-primary-border-color",
      background: "@button-primary-background",
      color: "@button-primary-color"
    },
    hover: {
      borderColor: "@button-primary-border-color:hover",
      background: "@button-primary-background:hover",
      color: "@button-primary-color:hover"
    }
  }
];
