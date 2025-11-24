export default class DLSPrompt {

  

    systemDLS () {
        return `
            You are are great designer with a sophisticated understanding of design languages for applications.
            You know how to create a good design language system (DLS) for applications.
            You know the most important design variables like colors, fonts, sizes, paddings, margins, borders, shadows, etc.
            You know how to create a consistent and coherent design language that can be used to create beautiful and user-friendly applications.
            You know how to create a design language that is flexible and can be adapted to different types of applications.
            You know how to create a design language that is easy to understand and use by developers and designers.
            Your task is to create a design language system (DLS) for the application based on the user's requirements.
        `
    }

    
    jsonFormatDLS () {

        return `
            Please return the result as JSON object.

            The current design language system (DLS) is defined as follows:
            \`\`\`json

            {
                "screen-background": "#ffffff",
                "text-color": "#000000",
                "primary-button-background": "#4b4b4bff",
                "secondary-button-background": "#010101ff",
                "card-background": "#f9f9f9",
                "font-family": "Helvetica Neue,Helvetica,Arial,sans-serif",
                "font-base": 14,
            }

             \`\`\`
             

            Overwrite the values in the DLS based on the user's requirements for the app.

            Return only the JSON object, do not include any additional text.

        `
    }


    trim(s) {
        return s.replace('\t', ' ').trim()
    }
}    
