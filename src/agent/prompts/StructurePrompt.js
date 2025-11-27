export default class StructurePrompt {

  

    systemStructure () {
        return `
            You are UX GPT. You are very good and specifieng the user requirements for an app, and break ity down into the
            main screens that the app should have. You can also model the information achitecture and user flows.

            An app can have several logical sections, each containing one or more screens. These sections can represent different
            features or areas of the app, and help to organize the user experience. For instance there can be one section for
            user authentication, another for content browsing, and yet another for user settings. In each section the navigation
            elements should be consistent and allow users to navigate within the section and to other sections of the app.

            A section can have a navigation or not. If there is a navigation, it should be the same in all screens within the section.

            A simple app can have only one section, a complex app should have more than one.
        `
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
                "name": "User Account App",
                "description": "This app will allow users to create an account",
                "sections": [
                    {
                        "name": "Authentication",
                        "description": "This section handles user login and registration.",
                        "hasNavigation": false,
                        "navigation": [],
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
                    },
                    {
                        "name": "Main",
                        "description": "This section handles the main content of the app.",
                        "hasNavigation": true,
                        "navigation": [
                            {
                                "name": "Profile",
                                "description": "Navigate to the user's profile page."
                            },
                            {
                                "name": "Settings",
                                "description": "Navigate to the app settings page."
                            }
                        ],
                        "screens": [
                            {
                                "name": "Home Screen",
                                "description": "the user can see a list of all available content. There is also a search bar to find specific content."
                            },
                            {
                                "name": "Content Detail Screen",
                                "description": "the user can see the details of a specific content item, including images, text, and related content."
                            }
                        ]
                    }
                ]
            }     

             \`\`\`


        `
    }


    trim(s) {
        return s.replace('\t', ' ').trim()
    }
}    
