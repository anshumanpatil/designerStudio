class Designer {
    constructor() {
        if (!Designer.instance) {
            Designer.instance = this;
        }
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
        fabric.Object.prototype.transparentCorners = false;
    }

    lineMode(isOn = false) {

        if (!isOn) {
            Designer.canvas.__eventListeners["mouse:down"] = [];
            Designer.canvas.__eventListeners["mouse:move"] = [];
            Designer.canvas.__eventListeners["mouse:up"] = [];
            return Designer.canvas.selection = true;
        }

        let line, isDown;

        Designer.canvas.selection = false;
        Designer.canvas.on('mouse:down', function (o) {
            // Designer.canvas.getObjects().map( allO => allO.selection = false);
            if (Designer.canvas.findTarget(o.e)) return;
            isDown = true;
            let pointer = Designer.canvas.getPointer(o.e);
            let points = [pointer.x, pointer.y, pointer.x, pointer.y];
            line = new fabric.Line(points, {
                strokeWidth: 5,
                fill: 'red',
                stroke: 'red',
                originX: 'center',
                originY: 'center',
                // selection = false
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
            // Designer.canvas.selection = true;

            console.log(Designer.canvas.getObjects());
        });
    }

}
export default new Designer();