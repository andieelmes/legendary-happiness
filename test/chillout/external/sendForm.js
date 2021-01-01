let valid;
let formIsValid;
let data;

const $form = $('.js-form'),
	$inpReq = $('.js-input-tel'),
	$inpName = $('.js-input-name'),
	$inpText = $('.js-input-text'),
	$inpSubj = $('.js-input-subj'),
	$submitBtn = $('.js-submit'),
	patternTel =  /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/i,
	patternEmail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,7}$/,
	btnSuccessClsnm = 'is-success',
	formInvalidClsnm = 'is-invalid';

	$submitBtn.css('color', '#b0b0b0');

$inpReq.on('keyup change', function() {
	const $this = $(this);
	$this.attr('autocomplete', 'off')
	const $thisVal = $this.val();
	let pattern = $thisVal.indexOf('@') !== -1 ?  patternEmail : patternTel;

	valid = pattern.test($thisVal);
	formIsValid = valid;
	formIsValid ? $submitBtn.css('color', 'blue') : $submitBtn.css('color', '#b0b0b0')
});

function formAnimateShake() {
	$form.addClass(formInvalidClsnm);
	setTimeout(function () {
		$form.removeClass(formInvalidClsnm)
	}, 2000)

}

function formSendStyles() {
	$('.bid-title').text('Записано!');
	$('.header-currMp').eq(0).text('');
	$('.header-currMp.hidden').show();
	$('.send-success').show();
	$('.bid-form').hide();
}

function onFormSubmit(e) {
	e.preventDefault();

	data =
		{ 'name': $inpName.val(),
			'contact' :$inpReq.val(),
			'message': $inpText.val() || 'Сообщения нет',
			'subj': $inpSubj.val(),
		};



	const adress = 'mail.php';
	const gglScript = 'https://script.google.com/macros/s/AKfycbwoM0vZ9TjO5dQCM9B8Q_bZvvOHITqdpAIYOpOGr4PV9lhJb7TY/exec?p=true';
	let response = {};

	if(formIsValid) {
			formSendStyles();

		$.ajax({
			url: gglScript,
			type: 'POST',
			data: data,
			success: (response, textStatus, jqXHR) => {
				$inpText.val('');
				$inpName.val('');
				$inpReq.val('');

			},

			error: (jqXHR, textStatus, errorThrown) => {
				formAnimateShake()
			}
		});
	} else {
		formAnimateShake()
	}
}

$submitBtn.on('click', function(e) {
	onFormSubmit(e);
});


$form.on('submit', function(e) {
	onFormSubmit(e);

});
