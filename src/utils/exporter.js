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

let saveNetwork = network => {
    let metadata = {};
    if (network.metadata != {}
        && network.metadata != null
        && network.metadata != undefined) {
        metadata = network.metadata;
        metadata.history.push(JSON.parse(process.env.NETWORK_METADATA));

        network = network.toJSON();
        network.metadata = metadata;
    } else {
        metadata.history = [];
        metadata.history.push(JSON.parse(process.env.NETWORK_METADATA));

        network = network.toJSON();
        network.metadata = metadata;
    }
    fs.writeFileSync(conf.paths.generateTo + "save/network-save.json",
        JSON.stringify(network), "utf8");
};

let loadNetwork = () => {
    let imported;
    try {
        imported = fs.readFileSync(conf.paths.generateTo + "save/network-save.json", "utf8");
    } catch (error) {
        return null;
    }
    imported = JSON.parse(imported);
    let restoredNetwork = synaptic.Network.fromJSON(imported);
    restoredNetwork.metadata = imported.metadata;
    return restoredNetwork;
};

module.exports = {
    bundleNetwork: bundleNetwork,
    saveNetwork: saveNetwork,
    loadNetwork: loadNetwork
}