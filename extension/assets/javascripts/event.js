var PAT_NOTIFY = /id=\"user_notifications_count\"><span[^>].*>(.*?)<\/span><\/a>/;

function load_modules_handler(request, sender, response) {
  var options = getOptions();
  
  _.each(options.actived_modules, function(module) {
    load_module(sender.tab, module);
  });
}

function createNotificationAlarms() {
  var options = getOptions();
  var fetch_duration = options.fetch_duration;

  chrome.alarms.get('notifications', function(alarm) {
    if (!alarm || alarm.periodInMinutes != options.fetch_duration) {
      chrome.alarms.create('notifications', { periodInMinutes: fetch_duration });
      log('Alarm notifications created with period in', fetch_duration, 'minutes.');
    }
  });
}

chrome.browserAction.onClicked.addListener(function(tab) {
  if (localStorage['unread_notification_count']) {
    chrome.tabs.create({ url: 'https://ruby-china.org/notifications' }); 
    localStorage['unread_notification_count'] = '';
  } else {
    chrome.tabs.create({ url: 'https://ruby-china.org/topics' }); 
  }

  updateUnreadCount();
});

function updateUnreadCount() {
  chrome.browserAction.setBadgeText({ text: localStorage['unread_notification_count'] || '' });
}

function checkNewNotifications() {
  log('Checking ruby china notifications...');
  $.get('https://ruby-china.org/wiki/about', function(content) {
    var unread_count = parseInt(PAT_NOTIFY.test(content) && RegExp.$1 || 0);
    log('Fetched', unread_count, 'notifications');
    localStorage['unread_notification_count'] = unread_count || '';
    updateUnreadCount();
  });
}

// Initialize
(function() {
  // Init notifications
  createNotificationAlarms();
  checkNewNotifications();

  chrome.runtime.onStartup.addListener(createNotificationAlarms);
  chrome.runtime.onInstalled.addListener(createNotificationAlarms);
  chrome.alarms.onAlarm.addListener(function(alarmInfo) {
    if (alarmInfo.name == 'notifications') {
      checkNewNotifications();
    }
  });

  // Init notifications
  register_message_dispatcher({
    load_modules: load_modules_handler,
    update_fetch_duration: createNotificationAlarms
  });
})();
