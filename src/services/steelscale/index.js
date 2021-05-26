import * as Rulez from "rulez-fork";
class SteelScale {
    constructor() {
        if (!SteelScale.instance) {
            SteelScale.instance = this;
        }
        return SteelScale.instance;
    }

    HorizontalRule(element) {
        const rule = new Rulez({
            element,
            layout: 'horizontal',
            textDefaults: {
                rotation: 0,
                offset: 25
            }
        });
        rule.render();
    }

    VerticalRule(element) {
        const rulez = new Rulez({
            element,
            layout: 'vertical',
            textDefaults: {
                rotation: -90,
                offset: 25
            }
        });
        rulez.render();
    }
}

export default new SteelScale();
