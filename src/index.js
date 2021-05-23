import {html, render} from 'lit-html';
import { fabric } from "fabric";
import {DesignerElement} from './main';

// import _ from 'lodash';
import './css/style.css';
const DrawingBoard = () => html`<designer-element></designer-element>`;
render(DrawingBoard(), document.querySelector('#designerStudio'));


