export default [
  
  {
    type: "RadioBox",
    name: "RadioBox2",
    description: `
A radiobox element is used to get optional boolean input from a user, 
for instance of they want to select en ensurance. 
It has a 'label' value in the 'props' object. 
    `,
    x: 0,
    y: 0,
    w: "@form-width",
    h: "@form-height",
    z: 0,
    props: {
      checked: true,
      label: "Radio",
      gap: 8,
    },
    has: {
      label: true,
      onclick: true,
      border: true,
      data: true,
    },
    style: {
      background: "@form-background",
      fontSize: "@font-size-m",
      fontFamily: "@font-family",
      textAlign: "left",
      letterSpacing: "@letterSpacing",
      lineHeight: "@lineHeight",
      padding: 0,
      textShadow: null,
      verticalAlign: "middle",
      color: "@form-color",
      colorButton: "@background-active",
      borderRadius: "@border-radius-round",
      borderWidth: "@border-width",
      borderStyle: "solid",
      borderColor: "@form-border-color",
    },
    error: {
      borderColor: "@form-border-color:error",
      background: "@form-background:error",
      color: "@form-color:error",
      colorButton: "@form-border-color:error",
    },
  },
  {
    type: "RadioGroup",
    name: "RadioGroup",
    description: `
An element where the user can select only one of several options. The elements has an "options" 
property in the "props" element, which is ARRAY of strings and 
describes the different options the user can choose from. The RadioGroup should only be
used if the user can select a single option.`,
    z: 0,
    x: 0,
    y: 0,
    w: "@form-width",
    h: "@form-height",
    props: {
      options: ["Option 1", "Option 2", "Option 3"],
      selected: "Option 1",
    },
    has: {
      backgroundColor: true,
      onclick: true,
      border: true,
      label: true,
      data: true,
    },
    style: {
      fontSize: "@font-size-m",
      fontFamily: "@font-family",
      textAlign: "left",
      letterSpacing: "@letterSpacing",
      lineHeight: "@lineHeight",
      borderRadius: "@border-radius-round",
      borderWidth: "@border-width",
      borderStyle: "solid",
      borderColor: "@form-border-color",
      background: "@form-background",
      color: "@form-color",
      colorButton: "@background-active",
      boxHeight: "@form-height",
      boxMarginRight: "@spacing-s",
    },
    error: {
      borderColor: "@form-border-color:error",
      background: "@form-background:error",
      colorButton: "@form-border-color:error",
    },
    computeDynamicSize(e) {
      if (e?.props?.options.length) {
        const l = e.props.options.length;
        return {
          h: e.h * l + 8 * (l - 1),
        };
      }
      return {};
    },
  },
];
