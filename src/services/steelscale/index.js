import * as Rulez from "rulez-fork";
import StudioEventManager from '../eventmanager';

export default class SteelScale {

    constructor(
        horizontalRule, // Base rule svg component
        VerticalRule, // Base rule svg component

        horizontalRuleContainer, // Container Holding Base Rule
        verticalRuleContainer, // Container Holding Base Rule
        canvasContainer // Container Holding Base Rule
    ) {
        if (!SteelScale.instance) {
            SteelScale.instance = this;
        }

        this.StudioEventManager = new StudioEventManager();
        this.StudioEventManager.events.subscribe(e => {
            if (Actions.getType(e) == "studio:resize") {
                this.resizeRulez(e)
            }
        });

        this._horizontalRule = null;
        this._verticalRule = null;


        this.horizontalRule = horizontalRule;
        this.verticalRule = VerticalRule;


        this.horizontalRuleContainer = horizontalRuleContainer;
        this.verticalRuleContainer = verticalRuleContainer;
        this.canvasContainer = canvasContainer;


        return SteelScale.instance;
    }

    HorizontalRule() {
        this._horizontalRule = new Rulez({
            element: this.horizontalRule,
            layout: 'horizontal',
            textDefaults: {
                rotation: 0,
                offset: 25
            }
        });
        this._horizontalRule.render();
    }

    VerticalRule() {
        this._verticalRule = new Rulez({
            element: this.verticalRule,
            layout: 'vertical',
            textDefaults: {
                rotation: -90,
                offset: 25
            }
        });
        this._verticalRule.render();
    }


    resizeRulez(event) {
        const { height, width } = event;

        this.horizontalRuleContainer.style.width = `${width}px`;
        this.verticalRuleContainer.style.height = `${height}px`;
        this.canvasContainer.style.height = `${height}px`;
        this.canvasContainer.style.height = `${height}px`;


        this.HorizontalRule();
        this.VerticalRule();
    }
}


