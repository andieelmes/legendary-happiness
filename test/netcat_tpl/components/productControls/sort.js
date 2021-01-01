$(document).ready(function() {

  function dropDown() {
    
    var $sel = $('.select');
    if (!$sel.length) return false;
    
    $sel.each(function(){
      
      var $self = $(this),
          $select = $(this).find('select'),
          $value = $select.val(),
          $currentValue = $select.find('option:selected').text(),
          $name = $select.attr('name'),
          $customClass = $select.attr("data-custom-class"),

          listClass = 'select-list',
          selectClass = 'select';
          
      $select.attr('name', '_'+$name);
      
      function appendFakeSelect()	{
      
        var template = '<div class="'+$customClass+'-value select-val">' + $currentValue+'</div> <ul class="'+$customClass+'-list select-list"> ';

        $select.find('option').each(function(){
          var $this = $(this);	
          template += '<li class="'+$customClass+'-item" value="'+$this.attr('value')+'" data-value="'+$this.attr('value')+'">'+$this.text()+'</li>';
        });
        
        template += '</ul>';

        
        $select.before(template);
        
      };
      appendFakeSelect();

      var $list = $self.find('.'+$customClass+'-list')
      var $fakeValue = $self.find('.'+$customClass+'-value')
      
      function showList() {
        $list.addClass('active');
        $self.addClass('active');
      };
      
      function hideList() {
        $list.removeClass('active');
        $self.removeClass('active');
      };
      
      function hideOther() {
        $('.'+selectClass+'.active').removeClass('active').find('.'+listClass).removeClass('active');
      };
      
      function changeValue($item) {
        var t = $item.text();
        var v = $item.attr('data-value');
        $fakeValue.text(t);
        $select.val(v).trigger('change');
      };

      
      $select.on('change', function(val){
        if (val !== $value) {
          $value = val
          var selValue = $select.find('option:selected').text()
          $fakeValue.text(selValue);
        }
      })
      
      
      
      $self.on('click', function(e){
        if ($(this).find('select').is(':hidden')) {
          e.preventDefault();
          if ($(e.target).closest('.'+listClass).length) {
            changeValue($(e.target).closest('li'));
            hideList();
          }
          else if (!$(e.target).closest('.'+selectClass).hasClass('active')) {
            hideOther();
            showList();
          }
          else {
            hideList();
          }
        }
      });

      
      $('html').on('click', function(e){
        if (!$(e.target).closest('.'+selectClass).length) {
          hideOther();
        }
      });
    
    });	
    
  };
  dropDown();

})