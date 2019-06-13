
// Validación login
$('.section-input_rut.home input').on('change keyup paste',function() {
  if($('input[name="rut"]').val().length >= 11 && $('input[name="pass"]').val().length >= 4) {
    $('.main-btn').removeClass('disabled');
    $('.main-btn').attr('href', 'home.html');
  } else {
    $('.main-btn').addClass('disabled');
    $('.main-btn').removeAttr('href');
  }
  if($('input[name="rut"]').val() == '11.111.111-1') {
    $('input[name="rut"]').parents().addClass('error');
  }
  if($('input[name="pass"]').val() == '1111') {
    $('input[name="pass"]').parents().addClass('error');
  }
})
// Validación recuperar-clave
$('.section-input_rut.recuperar input').on('change keyup paste',function() {
  if($(this).val().length >= 11 && $(this).val() != '11.111.111-1') {
    $('.main-btn').removeClass('disabled');
    $('.main-btn').attr('href', 'recuperar-exito.html');
    $(this).parents().removeClass('error');
  } else {
    $('.main-btn').addClass('disabled');
    $('.main-btn').removeAttr('href');
  }
  if($(this).val() == '11.111.111-1') {
    $(this).parents().addClass('error');
  }
})
// Validación rut
$('.serieNumber').on('change keyup paste',function() {
  $('.labelSerie').removeClass('error');
  if($(this).val().length >= 8) {
    $('.main-btn').removeClass('disabled');
    $('.main-btn').attr('href', 'identidad.html');
  } else {
    $('.main-btn').addClass('disabled');
    $('.main-btn').removeAttr('href');
  }
  if($(this).val() == '1111') {
    $('.labelSerie').addClass('error');
  }
})
// Validación identidad
$('.section-identidad input[type="radio"]').on('change keyup paste',function() {
  if($('input[type="radio"]:checked').length >= 4) {
    $('.main-btn').removeClass('disabled');
    $('.main-btn').attr('href', 'verificacion-exito.html');
  }
})
// Validación cambio-clave
$('input[name="newPass"]').on('change keyup paste',function() {
  this.value = this.value.replace(/[^0-9]/g, '');
})
let validPass = false; 
$('.cambioclave input').on('change keyup paste',function() {
  let validarClave = 0;
  // claveactual
  if($('input[name="noPass"]').val() == '1111') {
    $('input[name="noPass"]').parents().addClass('error');
  } else {
    $('input[name="noPass"]').parents().removeClass('error');
  }
  
  if($('input[name="noPass"]').val().length >= 4 && $('input[name="newPass"]').val().length >= 4 && $('input[name="newPass"]').val() == $('input[name="newPass2"]').val() && validPass && $('label.error').length == 0) {
    $('.main-btn').removeClass('disabled');
    $('.main-btn').attr('href', 'cambio-exito.html');
  } else {
    $('.main-btn').addClass('disabled');
    $('.main-btn').removeAttr('href');
  }
  if($('input[name="newPass2"]').val().length >= 4) {
    if($('input[name="newPass"]').val() != $('input[name="newPass2"]').val()) {
      $('input[name="newPass2"]').parents().addClass('error');
    } else {
      $('input[name="newPass2"]').parents().removeClass('error');
    }
  }
})
$('input[name="newPass"]').blur(function() {
  let par = $('input[name="newPass"]').val();
  if(!par.match(/^(\d)\1+$/g)){
    let cad = $('input[name="newPass"]').val();
    for (let i = 0; i < cad.length - 1; i++) {
      let valor1 = parseInt(cad[i]);
      let valor2 = parseInt(cad[i + 1]);
      if (valor1 + 1 !== valor2) {
        validPass = true;
        $('input[name="newPass"]').parents().removeClass('error');
      } else {
        $('input[name="newPass"]').parents().addClass('error');
        validPass = false;
      }
    }
  } else {
    $('input[name="newPass"]').parents().addClass('error');
  }
})
// Efecto shake
$('input[name="newPass"]').focus(function(){
  $(this).closest('.cambioclave').find('.checklist').addClass('shake');
}).blur(function(){
  $(this).closest('.cambioclave').find('.checklist').removeClass('shake');
})
// Formato RUT
$('.input-rut').on('change keyup paste', function () {
  this.value = this.value.replace(/[^kK0-9\_]/g, '');
  let value = this.value;
  if (value.length > 1) {
      value = value.substring(0, value.length - 1) + '-' + value.substring(value.length - 1, value.length);
  }
  if (value.length > 5) {
      value = value.substring(0, value.length - 5) + '.' + value.substring(value.length - 5, value.length);
  }
  if (value.length > 9) {
      value = value.substring(0, value.length - 9) + '.' + value.substring(value.length - 9, value.length);
  }
  this.value = value;
});
// Efecto ancla + apertura accordion + timer
$('.btn-orange').click(function() {
  startTimer();
  $('.progress-step').removeClass('disabled');
  $(this).closest('.progress-step').next().find($('#chck1')).removeAttr('disabled');
  $(this).closest('.progress-step').next().find($('#chck1')).attr('checked','checked');
  $('html, body').animate({
    scrollTop: $(this).closest('.progress-step').next().offset().top - 100
}, 700);
})
function startTimer() {
  var presentTime = $('#timer').html();
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}
  timerun = setTimeout(startTimer, 1000);
  if($('#timer').html() == "0:01") {
    $('#modalTimesUp').modal({
      backdrop: false,
      keyboard: false
    });
    clearTimeout(timerun);
  }
  $('#timer').html(m + ":" + s);
}
function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
$('.section-identidad input[type="radio"]').click(function() {
  $(this).closest('.progress-step').next().find($('input[type="checkbox"]')).removeAttr('disabled');
  $(this).closest('.progress-step').next().find($('input[type="checkbox"]')).attr('checked','checked');
  $('html, body').animate({
    scrollTop: $(this).closest('.progress-step').next().offset().top - 100
}, 700);
});
//Borrar flecha en home
(function borrarFLecha() {
  $('.actualStep').prev().css( "visibility", "hidden" );
})()

// ADS
//Formato numero
$('.input-number').on('change keyup paste', function () {
  this.value = this.value.replace(/[^0-9\_]/g, '');
  let value = this.value;
})
//Formato fecha
$('.input-date').on('change keyup paste', function () {
  this.value = this.value.replace(/[^0-9\_]/g, '');
  let value = this.value;
  if (value.length > 4) {
      value = value.substring(0, value.length - 4) + '/' + value.substring(value.length - 4, value.length);
  }
  this.value = value;
})
// Validacion ads2
$('.section-ads_input.flujoads2 input').on('change keyup paste',function() {
  if($('input[name="peso"]').val() != "" && $('input[name="estatura"]').val() != "" && $('input[name="peso1"]').val() != "" && $('input[name="estatura1"]').val() != "") {
    $('.main-btn').removeClass('disabled');
    $('.main-btn').attr('href', 'ads_3.html');
  } else {
    $('.main-btn').addClass('disabled');
    $('.main-btn').removeAttr('href');
  }
})
$('.input-height').on('change keyup paste', function () {
  this.value = this.value.replace(/[^0-9\_]/g, '');
  let value = this.value;
  if (value.length > 2) {
      value = value.substring(0, value.length - 2) + ',' + value.substring(value.length - 2, value.length);
  }
  this.value = value;
})

//Validacion ads-3 && ancla
$('.goAds').click(function() {
  $('.firstPregunta').removeClass('hidePregunta');
  $('.aside-counter').removeClass('hide');
  $('html, body').animate({
    scrollTop: $('.firstPregunta').offset().top - 130
  }, 700);
})
$('.revisarDS').click(function() {
  $('.resumen-ds').removeClass('hidePregunta');
  $('html, body').animate({
    scrollTop: $('.resumen-ds').offset().top - 130
  }, 700);
})
$('.declara input[name="ads24"]').on('change keyup paste',function() {
  if($(this).val() == "no") {
    $('.revisarDS').removeClass('noShow');
    $(this).closest('.declara').next().addClass('noDeclaraBeneficiario');
    $('html, body').animate({
      scrollTop: $('.revisarDS').offset().top - 130
    }, 700);
  } else {
    $('.revisarDS').addClass('noShow');
  }
})
$('.lastBox input').on('change keyup paste',function() {
  if($(this).closest('.beneficiario-datos').find('select[name="beneficiario"]').val() != '' && $(this).closest('.beneficiario-datos').find('input[name="dateD"]').val().length > 0 && $(this).closest('.beneficiario-datos').find('input[name="diagnostico"]').val().length > 0 ) {
    console.log('nbfjbnfnjbnf')
    $('.revisarDS').removeClass('noShow');
    $('html, body').animate({
      scrollTop: $('.revisarDS').offset().top - 130
    }, 700);
  } else {
    $('.revisarDS').addClass('noShow');
  }
})
let counterBar = 0;
$('.declara input[type="radio"][value="si"]').on('change keyup paste',function() {
  $(this).closest('.declara').next().removeClass('noDeclaraBeneficiario')
})
$('.beneficiario-datos input').on('change keyup paste',function() {
  if($(this).closest('.beneficiario-datos').find('select[name="beneficiario"]').val() != '' && $(this).closest('.beneficiario-datos').find('input[name="dateD"]').val().length > 0 && $(this).closest('.beneficiario-datos').find('input[name="diagnostico"]').val().length > 0 ) {
    $(this).closest('.declara-container').next().removeClass('noShow')
  } else {
    $(this).closest('.declara-container').next().addClass('noShow')
  }
})
$('.continue-btn').click(function () {
  $(this).closest('.section-ads_listado-pregunta').next().removeClass('hidePregunta');
  $('html, body').animate({
    scrollTop: $(this).closest('.section-ads_listado-pregunta').next().offset().top - 130
  }, 700);
  if(counterBar <= 23) {
    counterBar++;
    let linearGradient = 'linear-gradient(to right, #7ED321 0%,  #7ED321 ' + counterBar*100/24  + '%, #FFF 0%, #FFF 100%)'
    $('.progress-footer .bar-count').css({'background': linearGradient});
    $('.progress-footer .bar-count span').html(counterBar)
  }
})
$('.declara input[type="radio"][value="no"]').on('change keyup paste',function() {
  if($(this).closest('.declara').next().hasClass('noDeclaraBeneficiario')) {
    $(this).closest('.section-ads_listado-pregunta').next().removeClass('hidePregunta');
    $('html, body').animate({
      scrollTop: $(this).closest('.section-ads_listado-pregunta').next().offset().top - 130
    }, 700);
  } else {
    $(this).closest('.declara').next().addClass('noDeclaraBeneficiario');
    $(this).closest('.section-ads_listado-pregunta').next().removeClass('hidePregunta');
    $('html, body').animate({
      scrollTop: $(this).closest('.section-ads_listado-pregunta').next().offset().top - 495
    }, 700);
  }
  if(counterBar <= 23) {
    counterBar++;
    let linearGradient = 'linear-gradient(to right, #7ED321 0%,  #7ED321 ' + counterBar*100/24  + '%, #FFF 0%, #FFF 100%)';
    $('.progress-footer .bar-count').css({'background': linearGradient});
    $('.progress-footer .bar-count span').html(counterBar)
  }
})
$('.declara input[type="radio"]').on('change keyup paste',function() {
  let numberRow = $(this).attr('name').slice(3);
  if($(this).val() == 'si') {
    $("#answer" + numberRow).html('R: <span class="positiva"> Sí</span>')
  } else {
    $("#answer" + numberRow).html('R: <span> No</span>');
  }
})
$('.declara-container_box').on('click', '.erase', function() {
  $(this).parent().remove();
})
$('.declarar-btn').click(function() {
  $(this).prev().after('<div class="beneficiario-datos"><div class="erase"><img src="./assets/icons/icon-trash.svg" /></div><label class="select obligatory">¿A quién declara?<select name="beneficiario"><option value="">Selecciona beneficiario</option><option value="beneficiario1">Beneficiario 1</option><option value="beneficiario2">Beneficiario 2</option><option value="beneficiario3">Beneficiario 3</option></select></label><label class="input obligatory"> <span class="tooltipLabel">Fecha aproximada diagnóstico</span><input class="input-date" type="text" placeholder="mm/aaaa" name="dateD" maxLength="7"></label><label class="input obligatory fullLabel"> <span class="tooltipLabel">Diagnóstico</span><input type="text" name="diagnostico"></label><label class="input">Nombre médico tratante<input type="text" name="medico"></label><label class="input"> <span class="tooltipLabel">Fecha intervención quirúrgica</span><input class="input-date" type="text" placeholder="mm/aaaa" name="dateI" maxLength="7"></label></div>')
})

// Home ads firmado
$('.celeste input[name="declaro"]').on('change keyup paste',function() { 
  $('.celeste input[name="declaro"]').attr('disabled', 'disabled');
  $('.white').removeClass('deshabilitado');
  $('.white .link').addClass('loaderSpin');
  $('.white input[name="sms"]').removeAttr('disabled');
  $('.white .firmar-btn.href').attr('href', 'home_ads-firmada.html');
  $('.white .firmar-btn.href2').attr('href', 'home_plan.html');
});
$('.spinerLink').on('click', '.loaderSpin', function() {
  $(this).parent().html('<div class="spinner-border text-primary"></div>');
  setTimeout(function(){ $('.spinner-border').parent().html('<a class="link loaderSpin">Generar otra clave telefónica</a>'); }, 1000);
});
(function changeTime() {
  if($('.section-flujoInicial.adsToPlan').length > 0) {
    setTimeout(function(){ 
      $('.actualStep').addClass('checkStep');
      $('.changeStep').removeClass('actualStep');
      $('.changeStep img').attr('src', './assets/icons/icon_ads-check.svg');
      $('.changeStep').next().css('visibility','hidden');
      $('.changeStep').next().next().addClass('actualStep');
      $('.main-btn').removeClass('hide');
      $('.alert.yellow').addClass('hide');
    }, 20000);
  }
})();
$('.aside-counter_row').click(function() {
  let number = $(this).find('.answer').attr('id').slice(6);
  let inputTarget = 'input[name="ads' + number + '"]';
  $('html, body').animate({
    scrollTop: $(inputTarget).closest('.section-ads_listado-pregunta').offset().top - 125
  }, 700);
});
$('input[name="sms"]').on('change keyup paste',function() {
  if($(this).val() == "111111") {
    $(this).parents().addClass('error'); 
  }
})