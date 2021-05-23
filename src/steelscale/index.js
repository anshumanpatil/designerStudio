import * as Rulez from "rulez-fork";

export const SteelScale = {

    HorizontalRule: (horizontalID) => {
        const ruleElement = document.getElementById(horizontalID);
        const rule = new Rulez({
            element: ruleElement,
            layout: 'horizontal',
            textDefaults: {
                rotation: 0,
                offset: 25
            }
        });
        rule.render();
    },

    VerticalRule: (verticalID) => {
        const ruleElement = document.getElementById(verticalID);
        const rulez = new Rulez({
            element: ruleElement,
            layout: 'vertical',
            textDefaults: {
                rotation: -90,
                offset: 25
            }
        });
        rulez.render();
    }

}