var fs = require("fs");
var cp = require("child_process");
var util = require("util");

module.exports = function (filepath, copyLine, callback) {
    var currentLine = 0;
    var copied = false;
    fs.createReadStream(filepath)
        .on("error", callback)
        .pipe(require("split")())
        .on("data", function (line) {
            ++currentLine;
            if (currentLine === copyLine) {
                copied = true;
                cp.exec(util.format("echo \"%s\" | pbcopy", line), function () {
                    callback(null, line);
                });
            }
        })
        .on("end", function () {
            if (!copied) {
                callback(null, null);
            }
        });
};
