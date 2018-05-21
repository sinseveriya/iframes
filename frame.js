function contentSize() {
    var body = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight);
};

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function (e) {
    var content = {
        index: e.data,
        height: contentSize()
    };
    
    parent.postMessage(content, '*');
}, false);
