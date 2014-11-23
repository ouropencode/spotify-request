var dweetClient = require('node-dweetio');

var DweetIO = function() {
        this.dweetio = new dweetClient();
        this.listeners = [];
};

DweetIO.prototype.sendData = function(name, data, callback) {
        var instance = this;
        callback = callback || function(err, dweet) { console.log(err ? err : dweet); };
        this.dweetio.dweet_for(name, data, callback);
};

DweetIO.prototype.listenFor = function(name, callback) {
        var instance = this;
        callback = callback || function(dweet) { console.log(dweet); };
        this.listeners.push(name);
        this.dweetio.listen_for(name, callback);
};

DweetIO.prototype.stopListeningFor = function(name, callback) {
        var instance = this;
        callback = callback || function(failed) { console.log(failed ? name + " doesn't exist" : "Stopped listening for " + name); };
        var index = this.listeners.indexOf(name);
        if(index === -1)
                return callback(true);

        this.dweetio.stop_listening_for(name);
        this.listeners.splice(index, 1);
        return callback(false);
};

module.exports = DweetIO;