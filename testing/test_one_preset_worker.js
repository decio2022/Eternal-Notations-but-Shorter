importScripts("../break_eternity stuff/break_eternity.min.js", "../dist/eternal_notations.min.js")

onmessage = function(e) {
    let testedDecimal = e.data[0];
    let k = e.data[1];
    let htmlUsed = e.data[2];
    let notation;
    try {
        notation = (htmlUsed) ? EternalNotations.HTMLPresets[k] : EternalNotations.Presets[k];
    }
    catch (e) {
        this.postMessage("Error in notation retrieval")
        return; 
    }
    if (notation === undefined) {
        this.postMessage("Error in notation retrieval")
        return; 
    }
    if (typeof notation == "function") {
        if (k == "SimplifiedWritten" || k == "Polynomial" || k == "RationalFunction") {
            notation = notation(10);
        }
        else if (k == "ColoredDominoes") {
            notation = notation(6);
        }
        else {
            this.postMessage("Function notation")
            return; 
        }
    }
    this.postMessage(notation.format(testedDecimal));
    return;
}