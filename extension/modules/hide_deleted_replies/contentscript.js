(function($) {
  log('Module actived: hide_deleted_replies');

  function hideDeletedReplies() {
    $('.reply .deleted').each(function() {
      $(this).parent().remove();
    });
  }

  $(document).on('page:load', hideDeletedReplies);
  $(document).ready(hideDeletedReplies);
})(jQuery);
