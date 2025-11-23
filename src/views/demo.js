export const structPrompt = `

            Please return the result as JSON in the defined language:

            The app will have several screens. Return for each screen a description. the description should contain
            what the screen is about, and which information the user should see, and which information the user should
            enter.

            Please think also about a good name for the app. Also, if the users asks for a single screen or page, 
            don't create more than one screen.

            An example for an app is:
    
            {
                "type": "App",
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
       

    
          Please generate an app:

          Create a landing page for a a petshop. The landing page should link their instagram page and linked in profile. It should also show some pics of cute dogs and cats. and also some rabbits. The name of the shop is "Petify"

          
          Return the result as JSON in the defined language. Do not include any additional text.
      
`


export const uiPrompt = `
You are design GPT. You are really good at designing websites, app and all other kind of user interfaces. You are very create 
            and create beautiful designs. 
        
---


            
            Please return the result as JSON in the defined language:
        
            The basic building block is an "element". An element has a "type" and can have "children" elements.
            
            Each element has also a "props" object, which can have additional properties like 
            "label", "placeholder", "type", "options", "columns" and "data".

            Some elements can have a variant property. This is used to adjust for instance the visual style, or some behavior.


            An example for an element is:
   
            {
                "type": "Container",
                "layout": {
                    "direction": "row"
                }
                "children": [
                    {
                        type: "Label",
                        properties: {
                            label: "Hello World"
                        },
                        "layout": {
                        }
                    },
                    {
                        type: "Button",
                        variant: "Primary"
                        properties: {
                            label: "Submit"
                        },
                        "layout": {
                        }
                    },
                    {
                        "type": "Container",
                        "layout": {
                            "direction": "column"
                        }
                        "children": [ 
                            {
                                type: "Button",
                                variant: "Primary"
                                properties: {
                                    label: "Submit"
                                },
                                "layout": {
                                }
                            }
                        ]
                    }
                ]
            }     

        
        

            You can use the following elements to create your design:

"Screen" : The root element of your design. It can have many children. Often these elements are Nav, 
Sections and Heros, but it can be also container elements. If the app has many screens, 
the first element is often a Nav bar element at the top.
------

"Container" : The container element is used to group and align child elements. The container is 
vivible not present is mainly used for layouting. The container is the default way 
of grouping elements. A container has an list of 'children' elements. A container 
has an variable 'direction' in the 'layout' object. It can have the values 'row' 
and 'column'. 'row' means that the elements are aligned horizontal from left to right, 
'column' means the elements are aligned vertical from top to down.
------

"Button" : The button element should be used for buttons where the user can click. 
A button has a label value in the 'props' object. 
A button can have a 'variant' property, which can have the following values: 
'Primary', 'Secondary', 'FullWidth', 'Disabled' and 'Danger'. 
The Secondary buttons should be used for cancel actions and so an. 
Danger for deletions and everything dangerous.
------

"Input" : The input element renders as a text box, and allows users to enter text. 
The input field has a 'label' property in the 'props' object, which gives the user a hint as placeholder. 
An input field should have in most cases a label before.
------

"Password" : The password element renders as a text box, and allows users to enter passwords. 
The password field has a 'label' property in the 'props' object, which gives the user a hint as placeholder. 
An password field should have in most cases a label before.
------

"TextArea" : The TextArea element renders as a text area for multi line text input. It allows users to enter longer texts. 
The TextArea has a 'label' property in the 'props' object, which gives the user a hint as placeholder. 
An TextArea field should have in most cases a label before.
------

"Image" : The image element shows images in a page. It has a value property in the props object which presents the URL of the image. 
An image can have a 'variant' property, which can have the following values: 
'Small', 'Normal', 'Large' and 'FullWidth'. The variant corresponds to the size of the image.
------

"Label" : An Element that can show text. It has a 'label' value in the 'props' object. 
It should be used for labels as the default element for all kind text. 
A label can have a 'variant' property, which can have the following values: 
'Hint', 'Emphasis'.
------

"Headline" : The headline is an element which contains two or three words which summarize and introduce the following UI section. There should be only a few headlines.
A headline has a label value in the "props" object.
A Headline can have a 'variant' property, which can have the following values: 
'H1', 'H2', 'H3' which correspond to the importance. There should be only a view H1 in a page, usually in a section or under the screen.
------

"Section" : The Section element is used to group related elements in an page. The are usually directly children of the "Screen" element. 
A Section has an list of 'children' elements. A Section has an variable 'direction' in the 'layout' object. It can have the values 'row' 
and 'column'. 'row' means that the elements are aligned horizontal from left to right, 
'column' means the elements are aligned vertical from top to down.
A screen should never have only one single Section. Use the section only if you are going to add more than one section!
------

"SubHeadline" : A sub headline can lead a paragraph or be used in a card element. They usyally have a few word which summarize and introduce the following UI. The can moe often used then headlines.
------

"CheckBox" : A checkbox element is used to get boolean input from a user, for instance of t
hey want to receive a newsletter. It has a 'label' value in the 'props' object.
------

"CheckBoxGroup" : An element where the user can select one or more of several options. The elements has an "options" 
property in the "props" element, which is ARRAY of strings and 
describes the different options the user can choose from.  The CheckBoxGroup should be used, if the
user can select several options, for instance product featues.
------

"RadioBox" : A radiobox element is used to get optional boolean input from a user, 
for instance of they want to select en ensurance. 
It has a 'label' value in the 'props' object.
------

"RadioGroup" : An element where the user can select only one of several options. The elements has an "options" 
property in the "props" element, which is ARRAY of strings and 
describes the different options the user can choose from. The RadioGroup should only be
used if the user can select a single option.
------

"Nav" : The "Nav" element is used to to show the main navigational elements on a page. The nav element
should be the first element in a desktop screen if navigation over multiple pages is required. 
On mobile screens, it can be also the last element at the bottom.
If the nav element is placed in a Container, the container should have a "row" layout so
the nav element is the first element on the left.
A nav has an list of 'children' elements. These are always "NavLink" or very seldom "Input" for a search. A nav 
has an variable 'direction' in the 'layout' object. It can have the values 'row' 
and 'column'. The default is "row", only when the nav element is placed in a container,
it can be column.
Never add a Nav element, if you are not going to add more then one NavLink elemeent!
------

"NavLink" : The "NavLink" element is used inside a Nav element to render links to other pages. A NavLink can have a 'variant' property, which can have the following values: 
'Default', 'Active', 'CallToAction'. The highlight variant should be used for important elements, like sign-up or sign-in buttons.
------

"Card" : A Card element is used to group similar elements together and highlight the grouping with a visible border. 
The card can have child elements. The card has an list of 'children' elements. A card can never be nested in anover Card.
A card has an variable 'direction' in the 'layout' object. It can have the values 'row' and 'column'. 
row means that the elements are aligned horizontal from left to right, column means the elements are aligned vertical from top to down.
------

"Hero" : The Hero should be used on landing pages. It is used to communicate the main prupose of the app or website. It has two properties in the "props object called "headline" and "call_to_action". The
headline should be a catchy short message, the call_to_action longer message (< 10 words) that call the user to take action.
At has the following variants "Default" and "Small".

            
            Plese design a desktop application with a minimum screensize of 1200px. You should make
            use of the width and, if you decide to use a Container with "ROW" alignment, you can put up
            to 6 elements in a row.
        

            Please generate a screen:

            The overall global context of the app is as follows:
            
            create one landing page about bananas
 

            The app will have the following screens:

            Banana Landing Page:The user is greeted with a visually appealing landing page that showcases bananas. The page includes a striking banner image of bananas, a catchy headline introducing the fruit, and key facts such as nutritional value, common banana varieties, and fun trivia. The user sees no form fields or input areas—this is a read-only information screen designed for engagement and education.

            
            IMPORTANT: You need to create now the "Banana Landing Page" screen that follows these instructions:
            The user is greeted with a visually appealing landing page that showcases bananas. The page includes a striking banner image of bananas, a catchy headline introducing the fruit, and key facts such as nutritional value, common banana varieties, and fun trivia. The user sees no form fields or input areas—this is a read-only information screen designed for engagement and education.

            If you add a navigation elements, please make sure to follow the app's navigation structure and link
            all screens accordingly.

            
            Important! Please follow this additonal rules when designing the screen:

            - Use a "Nav" element only when you will add more the one "NavLink" elements

            - If you create a form and place it in a "Section", make sure the related buttons, e.g. Submit and Cancel are in the same "Section"

            - If you use sections under the "Screen" element, make there are now single Elements like headings on the same level.

            - Do not use containers to group form elements. So do not use a Container if the only elements are a Label and a Input element.

            - Do not place any "Section" in another "Section". Section should be only used under the "Screen" element.
        
            
            Return the result as JSON in the defined language. Do not include any additional text.
        

`