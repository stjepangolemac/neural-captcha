"use strict";
const fs = require("fs"),
    conf = require("../../conf"),
    charmap = require("./charmap");

let exportNetwork = standaloneNetwork => {
    let prefix = fs.readFileSync("./src/utils/prefix.js", "utf8");
    fs.writeFileSync(conf.paths.generateTo + "temp/unbundled-network.js",
        "\"use strict\";\r\nvar charmap = "
        + JSON.stringify(charmap)
        + ";\r\n"
        + prefix
        + standaloneNetwork.toString(), "utf8");
    
    let exported = fs.readFileSync(conf.paths.generateTo
        + "temp/unbundled-network.js", "utf8");
    let index = exported.indexOf("F = {");
    let exportedModified = exported.slice(0, index)
        + "var "
        + exported.slice(index);
    
    fs.writeFileSync(conf.paths.generateTo
        + "temp/unbundled-network.js", exportedModified, "utf8");
};

module.exports = {
    exportNetwork: exportNetwork
}