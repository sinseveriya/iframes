function contentSize() {
    var body = document.documentElement;
    return Math.max(body.scrollHeight, body.offsetHeight);
};

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function (e) {
    console.log('12');
    var content = {
        index: e.data,
        height: contentSize()
    };
    
    console.log(window);
    window.parent.postMessage(content, '*');
}, false);
