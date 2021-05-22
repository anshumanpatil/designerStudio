import { LitElement, html } from 'lit-element';
import * as Rulez from "rulez-fork";

import { Designer } from '../designer';
export class DesignerElement extends LitElement {
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    async updated(changedProperties) {
        const c = document.getElementById('c')
        Designer.createCard(c, '#FFFFFF');
        Designer.addRect();

        const someSvgElement = document.getElementById('horizontalRule');
        const rulez = new Rulez({
            element: someSvgElement,
            layout: 'horizontal'
        });
        rulez.render();

        const someSvgElementa = document.getElementById('verticalRule');
        const ruleza = new Rulez({
            element: someSvgElementa,
            layout: 'vertical'
        });
        ruleza.render();
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

