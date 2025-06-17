export default [
  {
    id: "Hero",
    type: "Hero",
    name: "Hero",
    container: true,
    description: `
The Hero should be used on landing pages. It is used to communicate the main prupose of the app or website. It has two properties in the "props object called "headline" and "call_to_action". The
headline should be a catchy short message, the call_to_action longer message (< 10 words) that call the user to take action.
At has the following variants "Default" and "Small".  
  `,
  descriptionHTML: `
The Hero should be used on landing pages. It is used to communicate the main prupose of the app or website. It has two properties called "headline" and "call_to_action". The
headline should be a catchy short message, the call_to_action longer message (< 10 words) that call the user to take action.
At has the following variants "Default" and "Small".  
  `,
    x: 0,
    y: 0,
    w: "@box-width-l",
    h: 600,
    z: 0,
    props: {
      headline: "This is the headline",
      call_to_action: "Sign up now to make the best",
    },
    layout: {
      alignItems: "center",
      justifyContent: "center"
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
      padding: 24,
      fontFamily: "@font-family",
      borderRadius: "@border-radius",
      borderWidth: "@border-width",
      borderColor: "orange",
      background: "orange",
    },
    children: [
      {
        type: "Label",
        name: "Headline",
        props: {
          label: "@headline",
        },
        style: {
          fontSize: "@font-size-xxxxl",
          textAlign: "center",
        },
        h: 96,
      },
      {
        type: "Label",
        name: "SubHeading",
        props: {
          label: "@call_to_action",
        },
        style: {
          fontSize: "@font-size-m",
          textAlign: "center",
        },
      },
    ],
  },
  {
    type: "Hero",
    name: "HeroSmall",
    extends: "Hero",
    variant: "Small",
    container: true,
    w: "@box-width-l",
    h: 320,
    children: [
      {
        type: "Label",
        name: "Headline",
        props: {
          label: "@headline",
        },
        style: {
          fontSize: "@font-size-xxxl",
          textAlign: "center",
        },
        h: 96
      },
      {
        type: "Label",
        name: "SubHeading",
        props: {
          label: "@call_to_action"
        },
        style: {
          fontSize: "@font-size-m",
          textAlign: "center"
        }
      }
    ]
  },
];
