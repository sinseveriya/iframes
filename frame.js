function contentSize() {
    var body = document.body;

    var height = Math.max(body.scrollHeight, body.offsetHeight);
    return height;
};

var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

eventer(messageEvent, function (e) {
    var content = {
        id: e.data,
        height: contentSize()
    };
    
    console.log('content', content);
    
    parent.postMessage(content, '*');
}, false);
