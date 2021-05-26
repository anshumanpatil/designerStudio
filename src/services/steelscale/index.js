import * as Rulez from "rulez-fork";

class SteelScale {

    constructor() {
        if (!SteelScale.instance) {
            SteelScale.instance = this;
        }
        this._horizontalRule = null;
        this._verticalRule = null;
        return SteelScale.instance;
    }

    HorizontalRule(element) {
        this._horizontalRule = new Rulez({
            element,
            layout: 'horizontal',
            textDefaults: {
                rotation: 0,
                offset: 25
            }
        });
        this._horizontalRule.render();
    }

    VerticalRule(element) {
        this._verticalRule = new Rulez({
            element,
            layout: 'vertical',
            textDefaults: {
                rotation: -90,
                offset: 25
            }
        });
        this._verticalRule.render();
    }
}

export default new SteelScale();

