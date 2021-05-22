import { LitElement, html } from 'lit-element';

import { Designer } from '../designer';
import { SteelScale } from '../steelscale';
export class DesignerElement extends LitElement {
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    async updated(changedProperties) {
        const c = document.getElementById('c');
        SteelScale.HorizontalRule('horizontalRule');
        SteelScale.VerticalRule('verticalRule');
        Designer.createCard(c, '#FFFFFF');
        Designer.lineMode(true);
        
        setTimeout(() => {
            Designer.lineMode(false);
        }, 35000);
    }

    createRenderRoot() {
        return this;
    }
    render() {
        return html`
        <div class="container">
            <div class="row" style="width: 500px;">
                <div class="col-sm-1" style="max-width: 30px; max-height: 30px;">
                </div>
                <div class="col-sm-11">
                    <svg id="horizontalRule" width="100%" height="30" xmlns="http://www.w3.org/2000/svg"></svg>
                </div>
            </div>
            <div class="row" style="height: 400px; width: 400px;">
                <div class="col-sm-1" style="max-width: 30px;">
                    <svg id="verticalRule" width="30" height="100%" xmlns="http://www.w3.org/2000/svg"></svg>
                </div>
                <div class="col-sm-11">
                    <canvas id="c" width="400" height="400"></canvas>
                </div>
            </div>
        </div>
        `;
    }
}
customElements.define('designer-element', DesignerElement);

