import { LitElement, html } from 'lit-element';
import {SteelScale, Designer} from '../services';
import mainHTML from './main.html';

export class DesignerElement extends LitElement {
    constructor() {
        super();
        this.shadowRoot.innerHTML = mainHTML;
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
        SteelScale.HorizontalRule(horizontalRule);
        SteelScale.VerticalRule(verticalRule);
        Designer.createCard(c, '#FFFF00');
        // Designer.lineMode(true);

        // setTimeout(() => {
        //     Designer.lineMode(false);
        // }, 35000);
    }
}
customElements.define('designer-element', DesignerElement);