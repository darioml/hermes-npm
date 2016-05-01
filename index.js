#!/usr/bin/env node

var hermesHome = "/Users/darioml/.hermes/"

var shell = require("shelljs");
var yargs = require("yargs");
var fs = require("fs");

var argv = yargs.usage("$0 command")
  .command("run <cmd>", "run one of the scripts", function(yargs){}, function (yargs) {
    fs.readdir(hermesHome, function(e, files){
      files.forEach(function(item){
        if (fs.lstatSync(hermesHome + item).isDirectory()) {
          var dir = hermesHome + item + '/scripts/';
          fs.readdir(dir, function(e, files){
            files.forEach(function(commands) {
              if (commands === yargs.cmd) {
                shell.exec("cd / && ."+dir+commands);
              }
            })
          });
        }
      })
    })
  })
  .demand(1, "must provide a valid command")
  .help("h")
  .alias("h", "help")
  .argv
