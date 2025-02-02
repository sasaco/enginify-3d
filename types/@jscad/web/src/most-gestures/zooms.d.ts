export function pinchZooms({ touchStarts$, touchMoves$, touchEnds$ }: {
    touchStarts$: any;
    touchMoves$: any;
    touchEnds$: any;
}, settings: any): any;
export function zooms({ touchStarts$, touchMoves$, touchEnds$, wheel$ }: {
    touchStarts$: any;
    touchMoves$: any;
    touchEnds$: any;
    wheel$: any;
}, settings: any): import("most").Stream<number>;
