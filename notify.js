#!/usr/local/bin/node
var InfiniteLoop = require('infinite-loop');
var il = new InfiniteLoop();

var trains = [['17:28', ' 17:08:'], ['18:01', ' 17:41:'], ['18:25', ' 18:05:'], ['18:56', ' 18:36:'], ['19:23', ' 19:03:'], ['20:03', ' 19:43:'], ['21:02', ' 20:42:'], ['22:33', ' 22:33:']];

var schedule = [
];

for (offset in trains) {
    var item = {
        title: " Электропоезд",
        message: "Пора выходить на электропоезд " + trains[offset][0],
        regexp: trains[offset][1],
        notified: false
    };

    schedule.push(item);
}

var notify = function (item) {
    var exec = require('child_process').exec;
    var cmd = 'notify-send -i error "' + item.title + '" "' + item.message + '"';

    exec(cmd, function(error, stdout, stderr) {
    });
};

var handler = function () {
    var date = new Date();

    for (offset in schedule) {
        item = schedule[offset];

        if (item.notified == false && (new RegExp(item.regexp)).test((new Date()).toString())) {
            schedule[offset].notified = true;
            notify(item);
        }
    }
};

setInterval(handler, 1000);

il.add(function () {});
il.run();
