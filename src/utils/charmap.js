"use strict";
const _excluded = require("../../conf.js").excludedChars;

var excluded = _excluded,
    charmap = [];

// a-z
for (let i = 97; i <= 122; i++) {
    charmap.push(String.fromCharCode(i));
}
// 0-9
for (let i = 48; i <= 57; i++) {
    charmap.push(String.fromCharCode(i));
}

excluded.forEach((element) => { 
    var i = charmap.indexOf(element);
    charmap.splice(i, 1);
});

module.exports = charmap;
