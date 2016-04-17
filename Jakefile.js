/**
 * Created by max on 14/04/16.
 */
/* globals jake:false, desc:false, task:false, complete:false, fail:false */
(function () {
    "use strict";

    var semver = require("semver");
    var jshint = require("simplebuild-jshint");

    //**** General purpose tasks

    desc("Start Karma server (run this first)");
    task("karma", function() {
        console.log("Starting Karma server:");
    })

    desc("Default build");
    task("default", ["version", "lint"], function() {
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