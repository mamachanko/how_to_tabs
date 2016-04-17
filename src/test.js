/**
 * Created by max on 16/04/16.
 */

(function () {
    "use strict";

    // var assert = require("chai").assert;

    describe("Addition", function() {

        it("adds positive integers", function() {
            assertEqual(add(3, 4), 7);
        });

        it("uses IEEE 745 floating point", function() {
            assertEqual(add(0.1, 0.2), 0.30000000000000004);
        });

        function assertEqual(actual, expected) {
            if (actual !== expected) throw new Error("expected " + expected + " but was " + actual);
        }

    });

    function add(a, b) {
        return a + b;
    }

}());
