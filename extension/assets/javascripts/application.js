function log() {
    var message = Array.prototype.slice.call(arguments, 0);
    console.log.apply(console, ['[crx-ruby-china]'].concat(message));
}

function fmt() {
    var args = arguments;
    return args[0].replace(/#{(.*?)}/g, function(match, prop) {
        return function(obj, props) {
            var prop = /\d+/.test(props[0]) ? parseInt(props[0]) : props[0];
            if (props.length > 1) {
                return arguments.callee(obj[prop], props.slice(1));
            } else {
                return obj[prop];
            }
        }(typeof args[1] === 'object' ? args[1] : args, prop.split(/\.|\[|\]\[|\]\./));
    });
}

function register_message_dispatcher(dispatcher) {
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            var handler = dispatcher[request.type] || noop;
            handler(request, sender, sendResponse);

            return true;
        }
    );    
}

function getOptions() {
  if (!localStorage['options']) {
    localStorage['options'] = JSON.stringify({
      fetch_duration: 1,
      actived_modules: []
    });
  }

  return JSON.parse(localStorage['options']);
}