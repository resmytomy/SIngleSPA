var fs = require('fs');
var path = require('path');
var async = require('async');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

var moveFrom = "D:/22-04-2020/DirectoryTree/D";
var moveTo = "/home/mike/dev/node/sonar/tome"
function getDir(movefrom){
fs.readdir(moveFrom, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

  async.each(function (file, index) {
    // Make one pass and make the file complete
    var fromPath = path.join(moveFrom, file);
    var toPath = path.join(moveTo, file);

    fs.stat(fromPath, function (error, stat) {
      if (error) {
        console.error("Error stating file.", error);
        return;
      }

      if (stat.isFile())

        console.log("'%s' is a file.", fromPath);
      else if (stat.isDirectory()){
        console.log("'%s' is a directory.", fromPath);
        getDir(fromPath);
    }


    //   fs.rename(fromPath, toPath, function (error) {
    //     if (error) {
    //       console.error("File moving error.", error);
    //     } else {
    //       console.log("Moved file '%s' to '%s'.", fromPath, toPath);
    //     }
    //   });
    });
  });
})}
getDir(moveFrom);