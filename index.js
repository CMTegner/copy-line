var fs = require("fs");
var clipboard = require("copy-paste").noConflict();

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
                clipboard.copy(line, function () {
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
