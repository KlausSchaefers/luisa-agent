import button from './elements/button.json';
import container from './elements/container.json';
import input from './elements/input.json';
import image from './elements/image.json';
import label from './elements/label.json';
import screen from './elements/screen.json';
import login from './elements/login.json';

export default class Elements {

    constructor() {
        this.elements = {};
        this.register(container);
        this.register(button)
        this.register(input);
        this.register(image);
        this.register(label);
        this.register(screen);
        this.register(login)
    }

    get(e) {
        return this.elements[e.type]
    }
    
    register(e) {
        this.elements[e.type] = e;
    }
}