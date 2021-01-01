$(document).ready(function() {
  var $productCoverPromotion = $('.catalog .product-cover--promotion').clone().addClass('copy');
  var $content = $('.content');
  $content.append($productCoverPromotion);
}) 