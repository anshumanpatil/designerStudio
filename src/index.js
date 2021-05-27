import { html, render } from 'lit-html';
import { fabric } from "fabric";
import { DesignerElement } from './main';

// import _ from 'lodash';
import './css/style.css';
const DrawingBoard = () => html`<designer-element></designer-element>`;
window.StudioEvent = (evt, detail = {}) => document.body.dispatchEvent(new CustomEvent(evt, {detail}));
// window.onStudioLoaded = (cb) => window.addEventListener('StudioLoaded', cb );
render(DrawingBoard(), document.querySelector('#designerStudio'));

