"use strict";
require("shelljs/make");

function release(type){
    exec("echo Bumping up the version");
    exec("npm version " + type);

    exec("echo Commiting master with tags");
    exec("git push origin master --tags");

    exec("echo Publish on NPM");
    exec("npm publish");

    exec("echo Operation done.");
}


target.patch = function(){
    release("patch");
};

target.minor = function(){
    release("minor");
};

target.major = function(){
    release("major");
};
