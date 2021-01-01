// .tpl-component-catalog-filer

$(document).ready(function() {
  function checkIfNumber(input){
    return input.match(/^[0-9]+$/)		
  }
  function allowOnlyNumbers(input){
    input.on( "keyup", function() {		
      if (checkIfNumber(this.value)) {
        this.value = this.value
      }
      else {
        var val = parseInt(this.value)
        this.value = isNaN(val) ? "" : val
      }
    })
  }
  function validatePriceRangeInputs(){
    var $min = $('.js-price-min');
    var $max = $('.js-price-max');

    allowOnlyNumbers($min);
    allowOnlyNumbers($max);

    $min.on('blur', function(){
      var maxValue = $max.val();
      if ($(this).val() > +maxValue && +maxValue != 0) {
        $(this).val(+maxValue - 1);
      }
    })
    $max.on('blur', function(){
      var minValue = $min.val();
      if ($(this).val() < +minValue && +minValue != 0) {
        $(this).val(+minValue + 1);
      }
    })
  }
  validatePriceRangeInputs()


  function resetFilters(){
    var $btn = $('.js-filter-reset');
    var $filters = $('.js-filter-checkbox');
    $btn.on('click', function(){
     
      $filters.each(function(){
        //console.log($(this))
        $(this).prop('checked', false)
       
      })
      showNumberOfCheckedFilters()
      
    })
  }
  resetFilters()

  function toggleFilters() {
    var $block = $('.js-filter-menu');
    var $outerbtn = $('.js-close-filter-btn')
    
    $block.each(function(){
      var $btn = $block.find('.js-show-filter-menu-btn')
      console.log($btn);
      $block.addClass('hidden');
      $btn.off('click').on('click', function(){
        
        $block.toggleClass('hidden')
      })
      if ($( window ).width() < 750) {
        $outerbtn.off('click').on('click', function(){
          //console.log($outerbtn)
          $block.addClass('hidden')
        })
      }    
    })
  }
  toggleFilters()

  $(window).resize(function() {
    toggleFilters();
  });

  function showNumberOfCheckedFilters() {
    var $filter = $('.js-filter-menu');
    var $options = $filter.find('.js-filter-options');
    $options.each(function(){
      var self = $(this);
      var $checkboxes = self.find('.js-filter-checkbox:checked')
      var number = self.find('.showNumber');
      if (number.length) {
        number.remove();
      }
      if ($checkboxes.length > 1) {
        var tpl = '<div class="catalog-filter-checkbox checkbox showNumber"><span class="checkbox-label">Выбрано '+ $checkboxes.length +'</span></div>'      
        self.prepend(tpl);
      }

    });
  }
  showNumberOfCheckedFilters()

  $('.js-filter-options input').on('change', function(){
    showNumberOfCheckedFilters()
  })


})