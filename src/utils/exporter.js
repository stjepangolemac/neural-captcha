"use strict";
const fs = require("fs"),
    synaptic = require("synaptic"),
    conf = require("../../conf"),
    charmap = require("./charmap");

let bundleNetwork = standaloneNetwork => {
    standaloneNetwork = standaloneNetwork.standalone();
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

let saveNetwork = networkJSON => {
    networkJSON = networkJSON.toJSON();
    fs.writeFileSync(conf.paths.generateTo + "save/network-save.json",
        JSON.stringify(networkJSON), "utf8");
};

let loadNetwork = () => {
    let imported;
    try {
        imported = fs.readFileSync(conf.paths.generateTo + "save/network-save.json", "utf8");
    } catch (error) {
        return null;
    }
    
    return synaptic.Network.fromJSON(JSON.parse(imported));
};

module.exports = {
    bundleNetwork: bundleNetwork,
    saveNetwork: saveNetwork,
    loadNetwork: loadNetwork
}