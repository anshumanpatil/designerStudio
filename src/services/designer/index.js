class Designer {
    constructor() {
        if (!Designer.instance) {
            Designer.instance = this;
        }
        document.body.addEventListener('studio:line', (e) => {
            this.lineMode(e.detail.mode, e.detail.selector);
            console.log('studio:line addEventListener', e.detail);
        })
        return Designer.instance;
    }

    addRect() {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });
        Designer.canvas.add(rect);
    }
    createCard(element, backgroundColor) {
        Designer.canvas = new fabric.Canvas(element, { backgroundColor });

        // Designer.canvas.isDrawingMode = true;

    }

    canvasSize(event) {
        const { height, width } = event;
        Designer.canvas.setHeight(height);
        Designer.canvas.setWidth(width);
    }

    lineMode(isOn = false, selector = '') {

        if (selector !== '') Designer.lastSelector = selector;

        if (!isOn) {
            Designer.canvas.__eventListeners["mouse:down"] = [];
            Designer.canvas.__eventListeners["mouse:move"] = [];
            Designer.canvas.__eventListeners["mouse:up"] = [];

            Designer.canvas.forEachObject(function (element) {
                if (element.name.hasOwnProperty('selector')) {
                    if (element.name.selector == Designer.lastSelector) {
                        element.selectable = true;
                        element.evented = true;
                    }
                }
            });

            Designer.lastSelector = '';
            return Designer.canvas.selection = true;
        }

        let line, isDown;

        Designer.canvas.selection = false;
        Designer.canvas.on('mouse:down', function (o) {
            if (Designer.canvas.findTarget(o.e)) return;
            isDown = true;
            console.log('new fabric.Line', fabric.Line);
            let pointer = Designer.canvas.getPointer(o.e);
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            line = new fabric.Line(points, {
                strokeWidth: 5,
                name: {
                    id: 'studio-line-' + Math.random().toString(36).slice(2),
                    selector,
                },
                fill: 'red',
                stroke: 'red',
                originX: 'center',
                originY: 'center',
                selectable: false,
                evented: false
            });
            Designer.canvas.add(line);
        });

        Designer.canvas.on('mouse:move', function (o) {
            if (!isDown) return;
            let pointer = Designer.canvas.getPointer(o.e);
            line.set({ x2: pointer.x, y2: pointer.y });
            line.setCoords();
            Designer.canvas.renderAll();
        });

        Designer.canvas.on('mouse:up', function (o) {
            isDown = false;
        });
    }


}
export default new Designer();