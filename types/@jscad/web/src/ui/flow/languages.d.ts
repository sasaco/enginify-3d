export = actions;
declare function actions({ sources }: {
    sources: any;
}): {
    initialize$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    requestGetAvailableLanguages$: most.Stream<{
        type: string;
        sink: string;
    }>;
    requestGetDefaultLanguage$: most.Stream<{
        type: string;
        sink: string;
    }>;
    requestGetLanguageData$: any;
    setLanguage$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    setAvailableLanguages$: most.Stream<{
        type: string;
        sink: string;
    } & {
        state: any;
    }>;
    requestLoadSettings$: most.Stream<{
        sink: string;
        key: string;
        type: string;
    }>;
    requestSaveSettings$: any;
};
import most = require("most");
