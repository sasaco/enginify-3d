/**
 * tap on screen , either via gestures or clicks,
 * IF the movement was short (settable)
 * AND there was little movement only (settable)
 * @param  {Number} longPressDelay any tap shorter than this time is a short one
 * @param  {Number} maxStaticDeltaSqr  when the square distance is bigger than this, it is a movement, not a tap
 * @param  {Number} multiTapDelay  delay between taps for multi tap detection
 */
export function taps(presses$: any, settings: any): any;
