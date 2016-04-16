/**
 * Created by max on 16/04/16.
 */

(function () {
    "use strict";

    var assert = require("chai").assert;

    // simple addition
    assert.equal(add(3, 4), 7);

    // IEEE754 floating point
    assert.equal(add(0.1, 0.2), 0.30000000000000004);

    function add(a, b) {
        return a + b;
    }

}());
