/**
 * Created by max on 14/04/16.
 */
(function () {
    "use strict";

    var EXPECTED_NODE_VERSION = "v0.12.13";

    desc("Default build")
    task("default", ["version"], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version")
    task("version", function () {
        console.log("Checking Node version: .");

        var actualVersion = process.version;

        if (actualVersion !== EXPECTED_NODE_VERSION) {
            fail("Incorrect Node version: expected " + EXPECTED_NODE_VERSION + " but was " + actualVersion);
        }
    })

}());