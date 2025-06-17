export default [
  {
    id: "Button",
    type: "Button",
    description: `
The button element should be used for buttons where the user can click. 
A button has a label value in the 'props' object. 
A button can have a 'variant' property, which can have the following values: 
'Primary', 'Secondary', 'FullWidth', 'Disabled' and 'Danger'. 
The Secondary buttons should be used for cancel actions and so an. 
Danger for deletions and everything dangerous.
    `,
    descriptionHTML: `
The button element should be used for buttons where the user can click. 
A button has a label property. 
A button can have a 'variant' property, which can have the following values: 
'Primary', 'Secondary', 'FullWidth', 'Disabled' and 'Danger'. 
The Secondary buttons should be used for cancel actions and so an. 
Danger for deletions and everything dangerous. Buttons must not have any children
    `,
    name: "Primary Button",
    x: 0,
    y: 0,
    w: "@box-width-xl",
    h: "@form-height",
    z: 0,
    props: {
      label: "Click Me"
    },
    layout: {
      grow: 0
    },
    has: {
      backgroundColor: true,
      border: true,
      onclick: true,
      label: true,
      padding: true
    },
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
      borderColor: "@button-primary-border-color",
      background: "@button-primary-background",
      color: "@button-primary-color"
    },
    hover: {
      borderColor: "@button-primary-border-color:hover",
      background: "@button-primary-background:hover",
      color: "@button-primary-color:hover"
    }
  },
  {
    type: "Button",
    name: "Danger Button",
    variant: "Danger",
    extends: "Button",
    style: {
      borderColor: "@button-danger-border-color",
      background: "@button-danger-background",
      color: "@button-danger-color"
    },
    hover: {
      borderColor: "@button-danger-border-color:hover",
      background: "@button-danger-background:hover",
      color: "@button-danger-color:hover"
    }
  },
  {
    type: "Button",
    name: "Danger Button",
    variant: "Disabled",
    extends: "Button",
    style: {
      borderColor: "@button-passive-border-color",
      background: "@button-passive-background",
      color: "@button-passive-color"
    },
    hover: {
      borderColor: "@button-passive-border-color:hover",
      background: "@button-passive-background:hover",
      color: "@button-passive-color:hover"
    }
  },
  {
    type: "Button",
    variant: "FullWidth",
    extends: "Button",
    name: "Secondary Button",
    layout: {
      grow: 1
    },
    style: {}
  },
  {
    type: "Button",
    variant: "Secondary",
    extends: "Button",
    name: "Secondary Button",
    style: {
      borderColor: "@button-secundary-border-color",
      background: "@button-secundary-background",
      color: "@button-secundary-color"
    },
    hover: {
      borderColor: "@button-secundary-border-color:hover",
      background: "@button-secundary-background:hover",
      color: "@button-secundary-color:hover"
    }
  }
]
