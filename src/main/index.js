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
        this.SteelScale = new SteelScale();
        this.StudioEventManager = new StudioEventManager();
    }

    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    async updated(changedProperties) {
        const c = this.renderRoot.querySelector('#c');
        const horizontalRule = this.renderRoot.querySelector('#horizontalRule');
        const verticalRule = this.renderRoot.querySelector('#verticalRule');
        this.SteelScale.HorizontalRule(horizontalRule);
        this.SteelScale.VerticalRule(verticalRule);
        this.Designer.createCard(c, '#FFFF00');
        window.dispatchEvent(new CustomEvent('StudioLoaded'));
        // await this.setCardSize(300, 300);
    }

    async setCardSize(ht, wt) {
        this.renderRoot.querySelector('#horizontalRuleContainer').style.width = `${wt}px`;
        this.renderRoot.querySelector('#verticalRuleContainer').style.height = `${ht}px`;
        this.renderRoot.querySelector('#canvasContainer').style.height = `${ht}px`;
        this.renderRoot.querySelector('#canvasContainer').style.height = `${ht}px`;
    }
}
customElements.define('designer-element', DesignerElement);