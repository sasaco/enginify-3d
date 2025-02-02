export = makeTitleBarSideEffect;
declare function makeTitleBarSideEffect(): {
    sink: (outToTitle$: any) => void;
    source: () => most.Stream<string>;
};
import most = require("most");
