export default class Prompts {

    screenSize(config) {
        if (config.screenSize.w < 500) {
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

    system (){
        return `You are design GPT. You are really good at designing websites, app and all other kind of user interfaces. You are very create 
            and create beautiful designs. 
        `;
    }

    jsonFormat() {
        return `
            Please return the result as JSON in the defined language:
        
            The basic building block is an "element". An element has a "type" and can have "children" elements.
            In addition, an element can have a "style" object, which can have CSS properties like "color", "background" and "borderColor".
            Each element has also a "props" object, which can have additional properties like "label", "placeholder", "type", "options", "columns" and "data".

            An example for an element is:
            \`\`\`json
            {
                "type": "Container",
                "children": [
                    {
                        type: "Label",
                        properties: {
                            label: "Hello World"
                        },
                        style: {
                            color: "#000000",
                            background: "#FFFFFF",
                            borderColor: "#CCCCCC"
                        }
                    }
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
