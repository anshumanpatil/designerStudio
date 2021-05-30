
export default class DesignerLineElement {
    constructor(canvas) {
        DesignerLineElement.canvas = canvas;
    }

    lineMode(e) {
        let { selector, mode, strokeColor, strokeWidth } = e;
        let points = [100, 100, 100, 200];
        let line = new fabric.Line(points, {
            strokeWidth: parseInt(strokeWidth),
            originX: 'left',
            originY: 'top',
            name: {
                id: 'studio-line-' + Math.random().toString(36).slice(2),
                selector,
            },
            fill: strokeColor,
            stroke: strokeColor
        }).setControlsVisibility({
            bl: false, 
            br: false, 
            tl: false, 
            tr: false, 
            ml: false, 
            mr: false,
        });
        DesignerLineElement.canvas.add(line);


        DesignerLineElement.canvas.getObjects().forEach(function (element) {
            if (element.name && element.name.hasOwnProperty('selector')) {
                if(element.name.selector == selector)
                    DesignerLineElement.canvas.setActiveObject(element);
            }
        });
   }
}