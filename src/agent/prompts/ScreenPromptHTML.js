export default class StructurePromptHTML {

  

   screenSize(screenSize) {
        if (screenSize.w < 500) {
            return `Please design for a mobile app. The maximum screen size is ${screenSize.w}px. 
            This means most of the content should be stacked below each other. You can 
            still use horizontal alignment, but don't put more then 3 elements in one row.`
        }
        return `
            Plese design a desktop application with a screensize of ${screenSize.w}px. You should make
            use of the width and not make the HTML any wider. 
        `
    }



    messageScreen(context, currentScreen, section) {

        const screenList = section.screens.map(s => s.name+ ":" + s.description).join('---\n');

        return  `
            The overall global context of the app is as follows:
            
            ${context} 

            The app will have the following screens:

            ${screenList}

            
            IMPORTANT: You need to create now the "${currentScreen.name}" screen that follows these instructions:
            ${currentScreen.description}

            If you add a navigation elements, please make sure to follow the app's navigation structure and link
            all screens accordingly.
        `.trim()
    }
    
    systemScreen (){
        return `You are design GPT. You are really good at designing websites, app and all other kind of user interfaces. You are very create 
            and create beautiful designs. 
        `;
    }


    htmlFormatScreen() {

        /**
         *  
         *  In addition, an element can have a "layout" object, which is inspired by css flex box and describes 
            the resize behavior. The "layout" element has one property called "grow" which can have the values 0 and 1.
            0 means, the element has a fixed size, whereas 1 means it can stretch the the full width of the container.
         */
        return `
            Return HTML markup with inline css or complete CSS classes defined in the head. A valid result would look like

            \`\`\`html
                <html>...
                </html>
            \`\`\`

        `
    }

    /*******************************************
     * HTML format
     *******************************************/

    htmlRules () {
        return `
            Important! Please follow this additonal rules when designing the screen:

            - Do not place any "Section" in another "Section". Section should be only used under the "Screen" element.
        `
    }

    
    htmlSystem () {
        return `
            You are design GPT. You are really good at designing websites, app and all other kind of user interfaces. You are very create 
            and create beautiful designs and code them in HTML.
        `
    }


    trim(s) {
        return s.replace('\t', ' ').trim()
    }
}    
