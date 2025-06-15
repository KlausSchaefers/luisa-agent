import { XMLParser}  from "fast-xml-parser";



class HTMLParser{
 
    parse (html) {
        const options = {
            ignoreAttributes : false
        };

        const parser = new XMLParser(options);
        const doc = parser.parse(html);

        const result = {
            type: 'Nothing',
            children:[]
        }
        this.parseNode(doc, result)

        return result.children[0]
    }

    parseNode(node, parent, indent='') {
        for (let key in node) {
            const value = node[key]    
            if (key.startsWith("@_")) {
                //console.debug(indent, '@', key, value)
                this.parseAttribute(parent, key, value);            
            } else {
                this.parseElement(key, parent, value, indent);
            }
        }
        if (parent.children.length === 0) {
            delete parent.children
        }
        if (parent.props && Object.values(parent.props).length === 0) {
            delete parent.props
        }
    }

    parseElement(key, parent, value, indent) {
        const element = {
            type: key,
            props: {},
            children: []
        };
        parent.children.push(element);

        if (Array.isArray(value)) {
            //console.debug(indent, '[]', key, value.length);
            for (let arrayChild of value) {
                //console.debug(indent, '[]', v)
                const arrayElement = {
                    type: key,
                    children: []
                };
                element.children.push(arrayElement);
                this.parseNode(arrayChild, arrayElement, indent + '   ');
            }
        } else {
            //console.debug(indent, '{}', key, Array.isArray(value));
            this.parseNode(value, element, indent + '  ');
        }

     
    }

    parseAttribute(parent, key, value) {
        if (!parent.props) {
            parent.props = {};
        }
        if ('@_name' === key) {
            parent.name = value
            return
        }
        if ('@_options' === key) {
            parent.props.options = value.split(',')
            return
        }
        if ('@_variant' === key) {
            parent.variant = value;
            return
        } 
        if ('@_flex-direction' === key) {
            parent.layout = {
                direction: value
            }
            return
        } 
                

        const propKey = key.substring(2);
        parent.props[propKey] = value;
        
    }
}

export default new HTMLParser()