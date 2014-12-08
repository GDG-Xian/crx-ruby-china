function show_alert(message) {
  var tpl = '<div class="alert alert-success" style="display: none;">#{1}</div>';
  $('#messages').html(fmt(tpl, message));
  $('#messages .alert').slideDown('fast')
                       .delay(3000)
                       .slideUp('slow', function() {
    $(this).remove();
  });
}

function save_options() {
  var options = {};
  options['fetch_duration'] = parseInt($('[name=fetch_duration]').val());
  options['actived_modules'] = _.map($('[name=actived_modules]:checked'), 'value');
  log('Saving options:', options);
  localStorage['options'] = JSON.stringify(options);

  chrome.runtime.sendMessage({ type: 'update_fetch_duration' });

  show_alert('设置已保存');
}

function restore_options() {
  var options = getOptions();
  $('[name=fetch_duration]').val(options.fetch_duration);
  _.each(options.actived_modules, function(module) {
    var selector = fmt('[name=actived_modules][value=#{1}]', module);
    $(selector).prop('checked', true);
  });
}

$(function() {
  restore_options();

  $('#form_options').on('submit', function() {
    save_options();
    return false;
  })
});