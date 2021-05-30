import StudioEventManager from '../eventmanager'
import DesignerLineElement from '../line'
import Actions from '../../objects/actions'
export default class Designer {
    constructor() {
        if (!Designer.instance) {
            Designer.instance = this;
        }

        Designer.strokeColor = '#FF0000';
        Designer.strokeWidth = 2;

        this.StudioEventManager = new StudioEventManager();
        this.DesignerLineElement = null;

        this.StudioEventManager.events.subscribe(e => {
            if (Actions.getType(e) == "studio:resize") {
                this.canvasSize(e)
            }

            if (Actions.getType(e) == "studio:line") {
                this.DesignerLineElement.lineMode({
                    ...e, 
                    selector: Math.random().toString(36).slice(2),
                    strokeColor: Designer.strokeColor,
                    strokeWidth: Designer.strokeWidth
                })
            }

            if (Actions.getType(e) == "studio:group") {
                this.studioGroup({
                    ...e,
                    selector: Math.random().toString(36).slice(2)
                });
            }

            if (Actions.getType(e) == "studio:stroke:color") {
                console.log('studio:stroke:color', e);
                Designer.strokeColor = e.color;
            }

            if (Actions.getType(e) == "studio:stroke:width") {
                console.log('studio:stroke:width', e);
                Designer.strokeWidth = e.strokeWidth;
            }

            if (Actions.getType(e) == "studio:bg:color") {
                console.log('studio:bg:color', e);
                Designer.backgroundColor = e.color;
                this.bgColor(e);
            }

        });

        return Designer.instance;
    }

    createCard(element, backgroundColor) {
        Designer.backgroundColor = backgroundColor;
        Designer.canvas = new fabric.Canvas(element, { backgroundColor });

        Designer.canvas.on({
            'before:selection:cleared': this._selectionEvent,
            'selection:updated': this._selectionEvent,
            'selection:change': this._selectionEvent,
            'selection:created': this._selectionEvent
        });

          
        this.DesignerLineElement = new DesignerLineElement(Designer.canvas);
        // Designer.canvas.isDrawingMode = true;

    }
    _selectionEvent(e){
        if(!e.hasOwnProperty('selected')) return window.dispatchEvent(new CustomEvent('action:deselected'));
        if(e.selected.length == 1){
            window.dispatchEvent(new CustomEvent('action:selected', { detail: e }));
        }
    }

    bgColor(event) {
        Designer.canvas.backgroundColor = Designer.backgroundColor;
        Designer.canvas.renderAll();
    }
    studioGroup(event) {
        const { mode } = event;
        if (!Designer.canvas.getActiveObject()) {
            return;
        }

        if (!mode) {

            if (Designer.canvas.getActiveObject().type !== 'group') {
                return;
            }
            Designer.canvas.getActiveObject().toActiveSelection();
            Designer.canvas.requestRenderAll();
            return;
        }


        if (Designer.canvas.getActiveObject().type !== 'activeSelection') {
            return;
        }
        Designer.canvas.getActiveObject().toGroup();
        Designer.canvas.requestRenderAll();

    }
    canvasSize(event) {
        const { height, width } = event;
        Designer.canvas.setHeight(height);
        Designer.canvas.setWidth(width);
    }
}