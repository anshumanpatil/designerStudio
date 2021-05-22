export const Designer = {
    addRect: () => {
        const rect = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'red',
            width: 20,
            height: 20
        });
        Designer.canvas.add(rect);
    },
    createCard: (element, backgroundColor) => {
        Designer.canvas = new fabric.Canvas(element, {backgroundColor});
        // fabric.Object.prototype.set({
        //     transparentCorners: false,
        //     cornerColor: 'rgba(102,153,255,0.5)',
        //     cornerSize: 12,
        //     padding: 7
        // });
    }
}