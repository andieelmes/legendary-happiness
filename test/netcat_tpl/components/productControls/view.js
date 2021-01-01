$(document).ready(function() {
  function changeItemView(btn) {
    var $btns = $(btn);
   
    $btns.each(function(){
      var self = $(this);
      var $parent = self.closest('.tpl-component-product-list');
      var type = self.attr('data-type')
      console.log(type);
      if (type == 'list') {
        self.on('click', function(){
          $btns.removeClass('active');
          self.addClass('active')
          $parent.addClass('detailed')
        })
      }   
      if (type == 'card') {
        self.on('click', function(){
          $btns.removeClass('active');
          self.addClass('active')
          $parent.removeClass('detailed')
        })
      }    
    });
  }
  changeItemView('.js-view-type');
})