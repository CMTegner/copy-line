#!/usr/bin/env node

var filepath = process.argv[2];
var lineNo = parseInt(process.argv[3]);

if ((process.argv.length !== 4) || isNaN(lineNo)) {
    console.log("Usage: node cli.js filepath linenum\n");
    console.log("Copy a line from a file to your clipboard\n");
    console.log("Arguments:");
    console.log(" filepath    the file to copy from");
    console.log(" linenum     the line number to copy");
    process.exit(0);
}

require("../.")(filepath, lineNo, function (err, copiedText) {
    if (err) {
        if (err.code === "ENOENT") {
            console.error("File not found: '%s'", filepath);
        } else {
            console.error(err);
        }
        process.exit(1);
    }
    if (copiedText === null) {
        console.log("Line number %d does not exist", lineNo);
    } else {
        console.log("Copied text: '%s'", copiedText);
    }
});
