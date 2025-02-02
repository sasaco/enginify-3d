export = makeDomSideEffect;
declare function makeDomSideEffect({ targetEl }: {
    targetEl: any;
}): {
    source: () => {
        select: (query: any) => {
            events: (eventName: any) => any;
        };
        element: any;
    };
    sink: any;
};
