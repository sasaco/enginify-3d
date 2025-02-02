export function mouseDrags(mouseDowns$: any, mouseUps: any, mouseMoves: any, settings: any): any;
export function touchDrags(touchStarts$: any, touchEnds$: any, touchMoves$: any, settings: any): any;
export function drags({ mouseDowns$, mouseUps$, mouseMoves$, touchStarts$, touchEnds$, longTaps$, touchMoves$ }: {
    mouseDowns$: any;
    mouseUps$: any;
    mouseMoves$: any;
    touchStarts$: any;
    touchEnds$: any;
    longTaps$: any;
    touchMoves$: any;
}, settings: any): import("most").Stream<any>;
