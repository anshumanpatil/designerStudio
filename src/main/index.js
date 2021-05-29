import { LitElement, html } from 'lit-element';
import SteelScale from '../services/steelscale';
import Designer from '../services/designer';
import StudioEventManager from '../services/eventmanager';
import mainHTML from './main.html';

export class DesignerElement extends LitElement {
    constructor() {
        super();
        this.shadowRoot.innerHTML = mainHTML;

        this.Designer = new Designer();

        this.StudioEventManager = new StudioEventManager();
    }

    connectedCallback() {
        super.connectedCallback();
        let scaleUnits = this.renderRoot.querySelector('#scaleUnits');
        scaleUnits.addEventListener('click', (e) => {
            let arr = ['cm', 'mm', 'inch'];
            let idx = arr.indexOf( e.target.innerHTML.trim()) >= 2 ? -1 : arr.indexOf( e.target.innerHTML.trim());
            e.target.innerHTML = arr[idx + 1];
            this.StudioEventManager.events.next({
                type: 'studio:scale:unit',
                unit: arr[idx + 1]
            })
        })
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    async updated(changedProperties) {

        const c = this.renderRoot.querySelector('#c');
        this.SteelScale = new SteelScale(
            this.renderRoot.querySelector('#horizontalRule'),
            this.renderRoot.querySelector('#verticalRule'),

            this.renderRoot.querySelector('#horizontalRuleContainer'),
            this.renderRoot.querySelector('#verticalRuleContainer'),
            this.renderRoot.querySelector('#canvasContainer')
        );

        // const horizontalRule = this.renderRoot.querySelector('#horizontalRule');
        // const verticalRule = this.renderRoot.querySelector('#verticalRule');
        // this.SteelScale.HorizontalRule(horizontalRule);
        // this.SteelScale.VerticalRule(verticalRule);
        this.Designer.createCard(c, '#FFFF00');

        window.dispatchEvent(new CustomEvent('StudioLoaded'));
    }
}
customElements.define('designer-element', DesignerElement);