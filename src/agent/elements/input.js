export default [
  {
    id: "TextBox",
    type: "Input",
    name: "Text Box",
    description: `
The input element renders as a text box, and allows users to enter text. 
The input field has a 'label' property in the 'props' object, which gives the user a hint as placeholder. 
An input field should have in most cases a label before.
`,
   descriptionHTML: `
The input element renders as a text box, and allows users to enter text. 
The input field has a 'label' property, which gives the user a hint as placeholder. 
An input field should have in most cases a label before.
`,
    x: 0,
    y: 0,
    w: "@form-width",
    h: "@form-height",
    layout: {
      grow: 1
    },
    z: 0,
    props: {
      label: "Enter a value",
      placeholder: true,
    },
    has: {
      label: true,
      backgroundColor: true,
      border: true,
      editable: true,
      onclick: true,
      padding: true,
    },
    style: {
      fontSize: "@font-size-m",
      fontFamily: "@font-family",
      textAlign: "left",
      letterSpacing: "@letterSpacing",
      lineHeight: "@lineHeight",
      background: "@form-background",
      color: "@form-color",
      borderRadius: "@border-radius",
      borderWidth: "@border-width",
      borderStyle: "solid",
      borderColor: "@form-border-color",
      paddingBottom: "@form-padding-vertical",
      paddingTop: "@form-padding-vertical",
      paddingLeft: "@form-padding-horizontal",
      paddingRight: "@form-padding-horizontal",
    },
    focus: {
      borderWidth: "@border-width:focus",
      borderColor: "@form-border-color:focus",
      background: "@form-background:focus",
      color: "@form-color:focus",
    },
    hover: {
      borderColor: "@form-border-color:hover",
      background: "@form-background:hover",
      color: "@form-color:hover",
    },
    error: {
      borderColor: "@form-border-color:error",
      background: "@form-background:error",
      color: "@form-color:error",
    },
  },
  {
    type: "Password",
    extends: "Input",
    name: "Password  (Hide & Show)",
    description: `
The password element renders as a text box, and allows users to enter passwords. 
The password field has a 'label' property in the 'props' object, which gives the user a hint as placeholder. 
An password field should have in most cases a label before.
`,
    descriptionHTML: `
The password element renders as a text box, and allows users to enter passwords. 
The password field has a 'label' property, which gives the user a hint as placeholder. 
An password field should have in most cases a label before.
    `,
    z: 0,
    x: 0,
    y: 0,
    w: "@form-width",
    h: "@form-height",
    props: {
      label: "",
      cleartext: true,
      cleartextHideLabel: "Hide",
      cleartextShowLabel: "Show",
    },
    has: {
      label: true,
      backgroundColor: true,
      border: true,
      editable: true,
      onclick: true,
      padding: true,
    },
    style: {},
  },
  {
    type: "TextArea",
    name: "Text Area",
    extends: "Input",
    description: `
The TextArea element renders as a text area for multi line text input. It allows users to enter longer texts. 
The TextArea has a 'label' property in the 'props' object, which gives the user a hint as placeholder. 
An TextArea field should have in most cases a label before.
`,
    descriptionHTML: `
The TextArea element renders as a text area for multi line text input. It allows users to enter longer texts. 
The TextArea has a 'label' property, which gives the user a hint as placeholder. 
An TextArea field should have in most cases a label before.
`,
    z: 0,
    x: 0,
    y: 0,
    w: "@form-width",
    h: "@box-height-l",
    props: {
      label: "Enter a value",
    },
    has: {
      label: true,
      backgroundColor: true,
      border: true,
      editable: true,
      onclick: true,
      padding: true,
    },
    style: {},
  },
];
