export = makeDragAndDropSideEffect;
declare function makeDragAndDropSideEffect({ targetEl }: {
    targetEl: any;
}): {
    source: () => import("most").Stream<{
        type: string;
        data: any;
    }>;
};
