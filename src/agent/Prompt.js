export default class Prompts {

    system (){
        return `You are design GPT. You are really good at designing websites, app and all other kind of user interfaces. You are very create 
            and create beautiful designs. 
        `;
    }

    dls() {
        return `
            Please return the result as JSON in the defined language:
        
            The basic building block is an ELEMENT. An element has a "type" and can have "children" elements.
            In addition, en alement can have a "style" object, which can have CSS properties like "color", "background" and "borderColor".
            Each element has also a "properties" object, which can have additional properties like "label", "placeholder", "type", "options", "columns" and "data".

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

    elements() {
        return `

            You can use the following elements to create your design:

            Screen: The root element of your design. It can have a "style" object, which can have CSS properties like "color", "background" and "borderColor".

            Container: An element that can have child elements. I container has an list of "children" elements. 
                A container has an property "direction". It can have the values "row" and "column". ROW means,
                that the elements are aligned horizontal from left to right, COLUMN means the elements are aligned vertical from top to down.
            
            Label: An Element that can show text. It has a "label" propery. A label has a "size" property which can be "Headline", "Label" or "Paragraph"

            Button: An Element that can show text. It has a "label" propery. 
            
            Input: An element to render a text field. It can have a "placeholder" property and a "type" propery. 
                The "type" property can be "Text", "Checkbox", "RadioBox", "Switch", "Password" or "TextArea".
            
           
        `;
    }
}

