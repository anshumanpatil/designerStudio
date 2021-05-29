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

        SteelScale.units = {
            cm : {
                divisions: [
                    {
                        pixelGap: 38,
                        lineLength: 20
                    },
                    {
                        pixelGap: 6,
                        lineLength: 10
                    },
                    {
                        pixelGap: 19,
                        lineLength: 15
                    }
                ],
                texts: [
                    {
                        pixelGap: 38
                    }
                ]
            },
            mm : {
                divisions: [
                    {
                        pixelGap: 96,
                        lineLength: 20
                    },
                    {
                        pixelGap: 12,
                        lineLength: 10
                    },
                    {
                        pixelGap: 48,
                        lineLength: 15
                    }
                ],
                texts: [
                    {
                        pixelGap: 96
                    }
                ]
            },
            inch : {
                divisions: [
                    {
                        pixelGap: 96,
                        lineLength: 20
                    },
                    {
                        pixelGap: 12,
                        lineLength: 10
                    },
                    {
                        pixelGap: 48,
                        lineLength: 15
                    }
                ],
                texts: [
                    {
                        pixelGap: 96
                    }
                ]
            },
        }


        SteelScale.selectedUnit = SteelScale.units['inch'];

        this.StudioEventManager = new StudioEventManager();
        this.StudioEventManager.events.subscribe(e => {
            if (Actions.getType(e) == "studio:resize") {
                this.resizeRulez(e);
            }
            if (Actions.getType(e) == "studio:scale:unit") {
                // SteelScale.selectedUnit = SteelScale.units[e.unit];
                this.changeUnits();
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
            divisions: SteelScale.selectedUnit.divisions,
            texts: SteelScale.selectedUnit.texts,
            textDefaults: {
                // showUnits: true,
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
            divisions: SteelScale.selectedUnit.divisions,
            texts: SteelScale.selectedUnit.texts,
            textDefaults: {
                // showUnits: true,
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


    changeUnits() {
        // console.log('SteelScale.selectedUnit', SteelScale.selectedUnit);
        this._verticalRule.resize()
        this._horizontalRule.resize()
        // this.HorizontalRule();
        // this.VerticalRule();
    }
}


