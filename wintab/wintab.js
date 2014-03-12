var wintab = require('./build/Release/wintab');

setInterval(function () {
    wintab.peekMessage();
    if (wintab.checkOverlapped())
        wintab.enableContext();
}, 1);

function minLevel() {
    var minPressure = wintab.minPressure();
    return (minPressure < 0) ? null : minPressure;
}
exports.minLevel = minLevel;

function maxLevel() {
    var maxPressure = wintab.maxPressure();
    return (maxPressure < 0) ? null : maxPressure;
}
exports.maxLevel = maxLevel;

function levels() {
    var min = wintab.minPressure();
    var max = wintab.maxPressure();
    if (min < 0 && max < 0)
        return null;
    return max - min + 1;
}
exports.levels = levels;

function pressure() {
    var _pressure = wintab.pressure();
    if (_pressure < 0)
        return null;
    return (_pressure - wintab.minPressure()) / (levels() - 1);
}
exports.pressure = pressure;
