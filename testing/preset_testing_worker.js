importScripts("../break_eternity stuff/break_eternity.min.js", "../dist/eternal_notations.min.js")

onmessage = function(e) {
    let testedDecimal = e.data;
    formatAll(testedDecimal, false);
    this.postMessage("");
}

function formatAll(num, exclude_slow = false) {
    for (k in EternalNotations.HTMLPresets) {
        // Fast-Growing Hierarchy, Polygonal, and Prestige Layer notations run a little too slowly for my tastes. Excluding them should make this run much faster.
        if (exclude_slow && (k == "FastGrowingHierarchy" || k == "HardyHierarchy")) continue;
        formatOne(k, num);
    }
    EternalNotations.physicalScale(num);
}

function formatOne(key, num) {
    let notation;
    htmlUsed = (Math.random() > 0.5);
    try {
        notation = (htmlUsed) ? EternalNotations.HTMLPresets[key] : EternalNotations.Presets[key];
    }
    catch { return; }
    if (notation === undefined) return;
    if (typeof notation == "function") {
        if (key == "Polynomial" || key == "RationalFunction") {
            notation(10).format(num);
            notation(2).format(num);
            notation(3).format(num);
            return;
        }
        else return;
    }
    notation.format(num);
}