import * as Rulez from "rulez-fork";

export const SteelScale = {

    HorizontalRule: (horizontalID) => {
        const ruleElement = document.getElementById(horizontalID);
        const rule = new Rulez({
            element: ruleElement,
            layout: 'horizontal'
        });
        rule.render();
    },

    VerticalRule: (verticalID) => {
        const ruleElement = document.getElementById(verticalID);
        const rulez = new Rulez({
            element: ruleElement,
            layout: 'vertical'
        });
        rulez.render();
    }

}