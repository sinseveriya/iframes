function contentSize() {
    var body = document.compatMode &&
    document.compatMode == 'CSS1Compat'
        ? document.documentElement
        : document.body;

    var height = Math.max(body.scrollHeight, body.offsetHeight);
    return height;
};

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
var content = {};

eventer(messageEvent, function (e) {
    content.id = e.data;
    console.log(content.id);
}, false);

content.height = contentSize();
var height = contentSize();

window.parent.postMessage('here', '*');
console.log('yandex.ru!!');

// setTimeout(function () {
    console.log('content', content);
    window.postMessage(height, '*');
// }, 0);
