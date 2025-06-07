import wireframe from './dls/wireframe'


export default class DLS {

    constructor (theme = wireframe) {
        this.theme = theme
    }

    replaceVariables (widget) {
        const theme = this.theme
        if (widget.style) {
            this.replaceSingleStyle(theme, widget.style)
        }
        if (widget.hover) {
            this.replaceSingleStyle(theme, widget.hover)
        }
        if (widget.error) {
            this.replaceSingleStyle(theme, widget.error)
        }
        if (widget.focus) {
            this.replaceSingleStyle(theme, widget.focus)
        }
        if (widget.active) {
            this.replaceSingleStyle(theme, widget.active)
        }
        if (widget.checked) {
            this.replaceSingleStyle(theme, widget.checked)
        }
        this.replaceSize(theme, widget)
        return widget
    }


    replaceBorderVariables (widget) {
      
        if (widget.style) {
            this.replaceSingleBorderVariable(widget.style)
        }
        if (widget.hover) {
            this.replaceSingleBorderVariable(widget.hover)
        }
        if (widget.error) {
            this.replaceSingleBorderVariable(widget.error)
        }
        if (widget.focus) {
            this.replaceSingleBorderVariable(widget.focus)
        }
        if (widget.active) {
            this.replaceSingleBorderVariable(widget.active)
        }
        if (widget.checked) {
            this.replaceSingleBorderVariable(widget.checked)
        }
    }

    replaceSingleBorderVariable(style) {


        if (style.borderWidth !== undefined) {
            const value = style.borderWidth
            style.borderTopWidth = value
            style.borderBottomWidth = value
            style.borderRightWidth = value
            style.borderLeftWidth = value
            delete style.borderWidth
        }

        if (style.borderRadius !== undefined) {
            const value = style.borderRadius
            style.borderTopRightRadius = value
            style.borderTopLeftRadius = value
            style.borderBottomRightRadius = value
            style.borderBottomLeftRadius = value
            delete style.borderRadius
        }

        if (style.padding !== undefined) {
            const value = style.padding
            style.paddingTop = value
            style.paddingBottom = value
            style.paddingLeft = value
            style.paddingRight = value
            delete style.padding
        }

        if (style.borderColor !== undefined) {
            const value = style.borderColor
            style.borderTopColor = value
            style.borderBottomColor = value
            style.borderRightColor = value
            style.borderLeftColor = value
            delete style.borderColor
        }

        if (style.borderStyle !== undefined) {
            const value = style.borderStyle
            style.borderTopStyle = value
            style.borderBottomStyle = value
            style.borderRightStyle = value
            style.borderLeftStyle = value
            delete style.borderStyle
        }
        
    }

    replaceSize (theme, box) {
        if (!theme || !box) {
            return box
        }
        if (theme[box.w]) {
            box.w = theme[box.w].value
        }
        if (theme[box.h]) {
            box.h = theme[box.h].value
        }        
        return box
    }


    replaceSingleStyle (t, style) {
        for (let key in style) {
            const value = style[key]
            if (t[value]) {
                style[key] = t[value].value
            }
        }
    }

    resetVariables (theme, widget) {
        if (widget.style) {
            this.resetSingleVariables(theme, widget.style, widget.qss)
        }
        if (widget.hover) {
            this.resetSingleVariables(theme, widget.hover, widget.qss)
        }
        if (widget.error) {
            this.resetSingleVariables(theme, widget.error, widget.qss)
        }
        if (widget.focus) {
            this.resetSingleVariables(theme, widget.focus, widget.qss)
        }
        if (widget.active) {
            this.resetSingleVariables(theme, widget.active, widget.qss)
        }
        if (widget.checked) {
            this.resetSingleVariables(theme, widget.checked, widget.qss)
        }
        return widget
    }

    resetSingleVariables (theme, style, qss) {
        for (let qssKey in qss) {
            const qssValue = qss[qssKey]            
            if (theme[qssValue]) {
                let themeValue = theme[qssValue].value
                if (style[qssKey] === themeValue) {
                    style[qssKey] = qssValue
                }
            }
        }
    }
   
   
}

