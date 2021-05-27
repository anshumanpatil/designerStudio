
export default class DesignerLineElement {
    constructor(canvas) {
        DesignerLineElement.canvas = canvas;
    }

    lineMode(e) {
        console.log('e', e);
        let isOn = false
        let { selector, mode, strokeColor, strokeWidth } = e;
        isOn = mode;
        console.log('studio:line', e);

        if (isOn) DesignerLineElement.lastSelector = selector;

        if (!isOn) {
            DesignerLineElement.canvas.__eventListeners["mouse:down"] = [];
            DesignerLineElement.canvas.__eventListeners["mouse:move"] = [];
            DesignerLineElement.canvas.__eventListeners["mouse:up"] = [];

            DesignerLineElement.canvas.selection = true
            let selectionArray = []
            DesignerLineElement.canvas.getObjects().forEach(function (element) {
                if (element.name && element.name.hasOwnProperty('selector')) {
                    if (element.name.selector == DesignerLineElement.lastSelector) {
                        element.selectable = true;
                        element.evented = true;
                        if (DesignerLineElement.canvas.getObjects().length > 1) {
                            selectionArray.push(element);
                        } else {
                            DesignerLineElement.canvas.setActiveObject(element);
                        }
                    }
                }
            });

            if (selectionArray.length) {
                DesignerLineElement.canvas.setActiveObject(new fabric.ActiveSelection(selectionArray, {
                    canvas: DesignerLineElement.canvas
                }));
            }



            DesignerLineElement.lastSelector = '';
            return DesignerLineElement.canvas.requestRenderAll();;
        }

        let line, isDown;

        DesignerLineElement.canvas.selection = false;
        DesignerLineElement.canvas.on('mouse:down', function (o) {
            if (DesignerLineElement.canvas.findTarget(o.e)) return;
            isDown = true;
            console.log('new fabric.Line', fabric.Line);
            let pointer = DesignerLineElement.canvas.getPointer(o.e);
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            line = new fabric.Line(points, {
                strokeWidth: parseInt(strokeWidth),
                name: {
                    id: 'studio-line-' + Math.random().toString(36).slice(2),
                    selector,
                },
                fill: strokeColor,
                stroke: strokeColor,
                originX: 'center',
                originY: 'center',
                selectable: false,
                evented: false
            });
            DesignerLineElement.canvas.add(line);
        });

        DesignerLineElement.canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            let pointer = DesignerLineElement.canvas.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            line.setCoords();
            DesignerLineElement.canvas.renderAll();
        });

        DesignerLineElement.canvas.on('mouse:up', function (o) {
            isDown = false;
        });
    }
}