export default class Prompts {

    screenSize(screenSize) {
        if (screenSize.w < 500) {
            return `Please design for a mobile app. The maximum screen size is 500px. 
            This means most of the content should be stacked below each other. You can 
            still use horizontal alignment, but don't put more then 3 elements in one row.`
        }
        return `
            Plese design a desktop application with a minimum screensize of 1200px. You should make
            use of the width and, if you decide to use a Container with "ROW" alignment, you can put up
            to 6 elements in a row.
        `
    }


    systemStructure () {
        return `
            You are UX GPT. You are very good and specifieng the user requirements for an app, and break ity down into the
            main screens that the app should have. 
        `
    }

    messageScreen(context, description) {
        return  context + "\n\n" + description
    }
    
    systemScreen (){
        return `You are design GPT. You are really good at designing websites, app and all other kind of user interfaces. You are very create 
            and create beautiful designs. 
        `;
    }


    jsonFormatStructure () {
        return `
            Please return the result as JSON in the defined language:

            The app will have several screens. Return for each screen a description. the description should contain
            what the screen is about, and which information the user should see, and which information the user should
            enter.

            Please think also about a good name for the app. Also, if the users asks for a single screen or page, 
            don't create more than one screen.

            An example for an app is:
            \`\`\`json
            {
                "type": "App",
                "description": "This app will allow users to create an account"
                "screens": [
                    {
                       "name": "Login Screen",
                       "description": "the user can enter his name and password. She will also so the name of the app. There is also a button to submit"
                    },
                    {
                        "name": "Welcome Screen",
                       "description": "After the login, the user is welcomes with a friendly message to the app"
                    }
                ]
            }     

             \`\`\`


        `
    }

    jsonFormatScreen() {

        /**
         *             In addition, an element can have a "layout" object, which is inspired by css flex box and describes 
            the resize behavior. The "layout" element has one property called "grow" which can have the values 0 and 1.
            0 means, the element has a fixed size, whereas 1 means it can stretch the the full width of the container.
         */
        return `
            Please return the result as JSON in the defined language:
        
            The basic building block is an "element". An element has a "type" and can have "children" elements.
            
            Each element has also a "props" object, which can have additional properties like 
            "label", "placeholder", "type", "options", "columns" and "data".

            Some elements can have a variant property. This is used to adjust for instance the visual style, or some behavior.
        

            An example for an element is:
            \`\`\`json
            {
                "type": "Container",
                "layout": {
                    grow: 1
                }
                "children": [
                    {
                        type: "Label",
                        properties: {
                            label: "Hello World"
                        },
                        "layout": {
                            grow: 0
                        }
                    },
                    {
                        type: "Button",
                        variant: "Primary"
                        properties: {
                            label: "Submit"
                        },
                        "layout": {
                            grow: 0
                        }
                    },

                ]
            }     

             \`\`\`

        `
    }

    elements(elements) {
        let result = "You can use the following elements to create your design:\n";

        const all = elements.getAll()
        result += all.map(e => `"${e.type}" : ${e.description}`).join('\n\n')

        return result
    }
}    
