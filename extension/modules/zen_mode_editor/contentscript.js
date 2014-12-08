(function($) {
  log('Module actived: zen_mode_editor');

  function toggle_zen_mode() {
    $('body').toggleClass('zen-mode');
    $('#reply textarea').focus();
  }

  function extend_editor() {
    var html = '<li><a href="javascript:;" data-toggle="zen-mode"></a></li>';
    $('.editor-toolbar .pills').append(html);

    $('[data-toggle=zen-mode]').on('click', toggle_zen_mode);

    $('form.new_reply').addClass('zen-mode');
    $('form.edit_reply').addClass('zen-mode');
    $('form.new_topic').addClass('zen-mode');
    $('form.edit_topic').addClass('zen-mode');

    $('#topic_title').parents('.control-group').addClass('off-zen-mode');
  }

  function initialize() {
    extend_editor();
  }

  $(document).on('page:load', initialize);
  $(document).ready(initialize);
})(jQuery);

/*
$(function() {
  var nameTimer = null,
  nameRequest = null,
  namePopover = null,
  namePopoverTpl = '<div class="well hide rcc-popover">#{1}</div>',
  nameSelectors = '.face a, .avatar a, .avatar_large a, .info a[data-name], .info a[data-author], .at_user';

  // 当鼠标移出人名或者关像时，清除名片浮层
  // - 如果延时尚未到达，清除 timer
  // - 如果请求已经发出，abort 之
  // - 如果弹出层已经显示，则 hide 之
  function clearNamePopover(evt) {
    evt && evt.stopPropagation();
    clearTimeout(nameTimer);
    nameRequest && nameRequest.abort();
    $('.rcc-popover').fadeOut(function() { $(this).remove(); });
    nameTimer = null;
  }

  function renderRecentTopicsByUser(user) {
    var html = [];
    $.each(user.topics || [], function(i, topic) {
      html.push(fmt('<li>[#{node_name}] #{title}</li>', topic));
    });
    return fmt('<ul>#{1}</ul>', html.join(''));
  }

  function showUserCard(link, user) {
    clearNamePopover();
    var content = fmt('ID: #{login}<br/>城市：#{location}<br/>签名：#{tagline}', user);
    var namePopover = $(fmt(namePopoverTpl, content + renderRecentTopicsByUser(user)));
    var target = link.find('img');
    if (!target.size()) {
      target = link;
    }
    namePopover.css({ top: target.offset().top + target.height(), left: target.offset().left });
    namePopover.appendTo('body').fadeIn();
  }

  $(document).on('mouseover', nameSelectors, function(evt) {
    evt.stopPropagation();
    var link = $(this);
    var name = link.attr('href').substring(1);

    nameTimer = setTimeout(function() {
      $.getJSON('http://ruby-china.org/api/users/' + name + '.json', function(user) {
        showUserCard(link, user);
      });
    }, 1000);
  });
  $(document).on('mouseout', nameSelectors, clearNamePopover);
  $(document).on('page:load', extendToolbar); // Turborlink 刷新时加载
  extendToolbar(); // 页面刷新时加载
});
*/
