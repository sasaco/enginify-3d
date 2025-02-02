/**
 * returns an object of base interactions from dom events, on the target element.
 * @param {DomElement} targetEl - The dom element to attach events handlers to
 * @param {Object} options
 * @param {Boolean} options.passiveEventsHandlers=true  Whenever possible make event listeners passive
 * (see here https://developers.google.com/web/updates/2016/06/passive-event-listeners for more details)
 * @param {Boolean} options.preventScroll=true Prevent all forms of scrolling on the target element
 * @param {Boolean} options.preventMenu=true Prevent default right click menu on the target element
 * @returns {Object}
 */
export function baseInteractionsFromEvents(targetEl: DomElement, options: {
    passiveEventsHandlers: boolean;
    preventScroll: boolean;
    preventMenu: boolean;
}): any;
/**
 * returns an object of pointer gestures.
 * @param {DomElement} input - either the dom element to attach events handlers to or the result from baseInteractionsFromEvents
 * @param {Object} options
 * @param {Integer} options.multiTapDelay=250  delay between clicks/taps
 * @param {Integer} options.longPressDelay=250 delay after which we have a 'hold' gesture
 * @param {Float} options.maxStaticDeltaSqr=100 maximum delta (in pixels squared) above which we are not static ie cursor changed places
 * @param {Float} options.zoomMultiplier=200 zoomFactor for normalized interactions across browsers
 * @param {Float} options.pinchThreshold=4000 The minimum amount in pixels the inputs must move until it is fired.
 * @param {Integer} options.pixelRatio=window.devicePixelRatio or 1 : the pixel ratio to use
 * @returns {Object}
 */
export function pointerGestures(input: DomElement, options: {
    multiTapDelay: Integer;
    longPressDelay: Integer;
    maxStaticDeltaSqr: Float;
    zoomMultiplier: Float;
    pinchThreshold: Float;
    pixelRatio: Integer;
}): any;
