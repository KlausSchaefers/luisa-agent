import { Converter } from "../Interfaces.js";


export default class ErrorCorrector extends Converter {

  constructor(elements) {
    super()
    this.elements = elements
    this.name = 'ErrorCorrector'
  }

  convertElement (element, app) {
    //const data = this.elements.get(element)
    const callback = "correct" + element.type
    if (this[callback]) {
      this[callback](element)
    }

    this.fixColumnImages(element)
    // fox somehow that the columns dont have more the 2 children on mobile
  }

  fixColumnImages(element) {
    if (element.children && element.children.length > 0 && this.isColumnContainer(element)) {      
      const images = element.children.filter(c => c.type === 'Image')
      for (let img of images) {
          img.variant = 'FullWidth' 
          img.layout = {
            grow: 1
          }       
      }
    }
  }


  correctCard(card) {
    const childCards = this.getAllChildren(card).filter(c => c.type === 'Card')
    if (childCards.length > 0) {
      console.debug("correctCard() > Cards in Cards")
      card.type = 'Container'
    }

  }

  getAllChildren(node, result = []) {
    if (node.children) {
        for (let child of node.children) {
          result.push(child)
          this.getAllChildren(child)
        }
    }
    return result
  }

  correctNav(nav) {
    const navLink = this.elements.get({type: 'NavLink'})
    if (nav.children && navLink) {
        const subNavLinks = []
        for (let child of nav.children) {
          if (child.type === 'Image') {
            child.w = navLink.h
            child.h = navLink.h
            child.style = {borderRadius: 2000}
            child.layout = {
              grow:0
            }
          }

          if (child.type === 'Input') {
            child.w = navLink.w
            child.h = navLink.h
            child.layout = {
              grow:0
            }
          }

          if (child.children && child.children.length > 0) {
            console.debug("correctNav() > NavLink had children. Pull up")
            child.children.forEach(sub => {
              if (sub.type === 'NavLink') {
                subNavLinks.push(sub)
              }
            })
            delete child.children
          }
        }

        nav.children = subNavLinks.concat(nav.children)
  
    }
  }
}