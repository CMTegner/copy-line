#!/usr/bin/env node

var filePath = process.argv[2];
var lineNo = parseInt(process.argv[3]);

if ((process.argv.length !== 4) || isNaN(lineNo)) {
    console.log("Usage: node cli.js filePath linenum\n"
              + "\n"
              + "Copy a line from a file to your clipboard\n"
              + "\n"
              + "Arguments:\n"
              + " filePath    the file to copy from\n"
              + " linenum     the line number to copy");
    process.exit(0);
}

require("../.")(filePath, lineNo, function (err, copiedText) {
    if (err) {
        if (err.code === "ENOENT") {
            console.error("File not found: '%s'", filePath);
        } else {
            console.error(err);
        }
        process.exit(1);
    }
    if (copiedText === null) {
        console.error("Line number %d does not exist in '%s'", lineNo, filePath);
    } else {
        console.log("Copied text: '%s'", copiedText);
    }
});
