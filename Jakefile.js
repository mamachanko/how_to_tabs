/**
 * Created by max on 14/04/16.
 */
/* globals jake:false, desc:false, task:false, complete:false, fail:false */
(function () {
    "use strict";

    var semver = require("semver");
    var jshint = require("simplebuild-jshint");
    var karma = require("simplebuild-karma");

    var KARMA_CONFIG = "karma.conf.js";
    var EXPECTED_BROWSERS = [
        "Firefox 39.0.0 (Mac OS X 10.10.0)",
        "Chrome 49.0.2623 (Mac OS X 10.10.3)",
    ];

    //**** General purpose tasks

    desc("Start Karma server (run this first)");
    task("karma", function() {
        console.log("Starting Karma server:");
        karma.start({
            configFile: KARMA_CONFIG,
        }, complete, fail);
    }, { async: true });

    desc("Default build");
    task("default", ["version", "lint", "test"], function() {
        console.log("\n\nBUILD OK");
    });

    desc("Run a localhost server");
    task("run", function () {
        jake.exec("node node_modules/http-server/bin/http-server src", { interactive: true }, complete);
    }, { async: true });

    //**** Auxiliary tasks

    desc("Check Node version");
    task("version", function () {
        console.log("Checking Node version: .");

        var packageJson = require("./package.json");
        var expectedVersion = packageJson.engines.node;
        var actualVersion = process.version;

        if (semver.neq(actualVersion, expectedVersion)) {
            fail("Incorrect Node version: expected " + expectedVersion + " but was " + actualVersion);
        }
    });

    desc("Lint JavaScript code");
    task("lint", function () {
        process.stdout.write("Linting JavaScript: ");
        jshint.checkFiles({
            files: [ "Jakefile.js", "src/**/*.js" ],
            options: lintOptions(),
            globals: lintGlobals(),
        }, complete, fail);
    }, { async: true });

    desc("Test JavaScript code");
    task("test", function() {
        console.log("Testing JavaScript:");
        karma.run({
            configFile: KARMA_CONFIG,
            expectedBrowsers: EXPECTED_BROWSERS,
            strict: !process.env.loose,
        }, complete, fail);
    }, { async: true });

    function lintOptions() {
        return {
            bitwise: true,
            eqeqeq: true,
            forin: true,
            freeze: true,
            futurehostile: true,
            latedef: "nofunc",
            noarg: true,
            nocomma: true,
            nonbsp: true,
            nonew: true,
            quotmark: true,
            strict: true,
            undef: true,

            node: true,
            browser: true,
        };
    }

    function lintGlobals() {
        return {
            // Mocha
            describe: false,
            it: false,
            before: false,
            beforeEach: false,
            after: false,
            afterEach: false,
        };
    }

}());