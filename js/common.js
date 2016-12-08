
$(window).on('load', function () {

    //setMenuItemsWidth();

    ////console.log('screen = ' + $(window).width());
    //// Добавляем обработчик, в котором узнаем: делать фиксированное навигационное меню или нет.
    //window.addEventListener('scroll', menuAscroll, false);
    window.addEventListener('click', function (event) {
        /* Закрываем главное окно профиля с содержимым при клике в другую область*/
        if (!event.target.matches('.prof *, #prof_info *')) {
            if ($(".prof_info").is(":visible")) {
                $('#user_block_in_menu #prof_icon').css('color', '#fff');
                showItem('prof_other', 'prof_main');
                $(".prof_info").slideUp('fast');   // открытие/скрывание главного окна профиля с содержимым
                // убираем активный класс из кнопки личного меню
                $(".prof_icon").removeClass("active");
            }
        }
    }, false);

    ChangeDeliveryType();

    var preloader = $('#page-preloader'),
        loader = preloader.find('.loader');
    loader.fadeOut('slow');
    preloader.delay(500).fadeOut('slow', function () {
        BtnGroupResize();
        // здесь блокирую установку курсора в инпут с количеством на странице блюда
        $("input[name^='touchspin']").attr("readonly", true);
    });   
});

$(window).bind('orientationchange', function (e) {
    $(window).ready(function () {
        BtnGroupResize();
    });
});

$(window).resize(function () {
    BtnGroupResize();
});

// ------------ call me -----------------------
$(document).ready(function () { // вся мaгия пoсле зaгрузки стрaницы
    $('#callback').click(function (event) { // лoвим клик пo ссылки с id="go"
        event.preventDefault(); // выключaем стaндaртную рoль элементa
        $('#overlay').fadeIn(200, // снaчaлa плaвнo пoкaзывaем темную пoдлoжку
		 	function () { // пoсле выпoлнения предъидущей aнимaции
		 	    $('#call_me')
					.css('display', 'block') // убирaем у мoдaльнoгo oкнa display: none;
					.animate({ opacity: 1 }, 200); // плaвнo прибaвляем прoзрaчнoсть oднoвременнo сo съезжaнием вниз
		 	});
    });
    /* Зaкрытие мoдaльнoгo oкнa, тут делaем тo же сaмoе нo в oбрaтнoм пoрядке */
    $('#overlay').click(function () { // лoвим клик пo крестику или пoдлoжке
        $('#call_me')
			.animate({ opacity: 0 }, 200,  // плaвнo меняем прoзрaчнoсть нa 0 и oднoвременнo двигaем oкнo вверх
				function () { // пoсле aнимaции
				    $(this).css('display', 'none'); // делaем ему display: none;
				    $('#overlay').fadeOut(200); // скрывaем пoдлoжку
				}
			);
    });
});

// gmap
// Здесь настраивваем карту
function initMap() {
    var marker;

    var map = new google.maps.Map(document.getElementById('gmap'), {
        zoom: 16,
        center: { lat: 46.4821837, lng: 30.737634 },
        scrollwheel: false,
        draggable: false
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: { lat: 46.4821837, lng: 30.737634 }
    });
    //marker.addListener('click', toggleBounce);
    marker.setAnimation(google.maps.Animation.BOUNCE);
}

function toggleBounce() {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
    }
}

$(function () {
    $(window).scroll(function () {
        if ($(this).scrollTop() != 0) {
            $('#toTop').fadeIn();
        } else {
            $('#toTop').fadeOut();
        }
    });

    //Обработка нажатия на кнопку "Вверх"
    $("#toTop").click(function () {
        //Необходимо прокрутить в начало страницы
        var curPos = $(document).scrollTop();
        var scrollTime = curPos / 1.73;
        $("body,html").animate({ "scrollTop": 0 }, scrollTime);
    });
});

// для  radiobutton на странице отправок и для чекбоксов .type
function BtnGroupResize() {
    var winWidth = $(window).width();
    var btnGroup = $('#delivery_type>div');
    var checkboxes = $('.type label');
    if (btnGroup.hasClass('btn-group') && winWidth < 560) {
        btnGroup.toggleClass('btn-group');
        btnGroup.toggleClass('btn-group-vertical');
    }
    else if (btnGroup.hasClass('btn-group-vertical') && winWidth > 560) {
        btnGroup.toggleClass('btn-group-vertical');
        btnGroup.toggleClass('btn-group');
    }

    if (checkboxes.hasClass('checkbox-inline') && winWidth < 480) {
        checkboxes.toggleClass('checkbox-inline');
        checkboxes.toggleClass('checkbox');
    }
    else if (checkboxes.hasClass('checkbox') && winWidth > 480) {
        checkboxes.toggleClass('checkbox-inline');
        checkboxes.toggleClass('checkbox');
    }
}

// обработка клика radiobutton на странице отправок
// Возможно это надо будет удалиить при прикручивании серверной
function ChangeDeliveryType() {
    $('input[name=delivery_type]').each(function () {
        $('.order>#' + $(this).attr('id')).hide();
    });
    var checkedItem = $('input[name=delivery_type]:checked');
    $('.order>#' + checkedItem.attr('id')).show();
}

