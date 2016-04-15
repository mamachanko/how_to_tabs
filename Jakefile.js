/**
 * Created by max on 14/04/16.
 */
(function () {
    "use strict";

    var semver = require("semver");

    desc("Default build")
    task("default", ["version"], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Check Node version")
    task("version", function () {
        console.log("Checking Node version: .");

        var packageJson = require("./package.json");
        var expectedVersion = packageJson.engines.node;
        var actualVersion = process.version;

        if (semver.neq(actualVersion, expectedVersion)) {
            fail("Incorrect Node version: expected " + expectedVersion + " but was " + actualVersion);
        }
    })

}());