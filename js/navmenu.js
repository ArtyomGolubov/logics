$(window).on('load', function () {

    setMenuItemsWidth();

    //console.log('screen = ' + $(window).width());
    // Добавляем обработчик, в котором узнаем: делать фиксированное навигационное меню или нет.
    window.addEventListener('scroll', menuAscroll, false);
    window.addEventListener('click', function (event) {
        // Close the dropdown if the user clicks outside of it
        if (!event.target.matches('.dropbtn')) {

            var dropdowns = $('.dropdown-content');
            dropdowns.each(function () {
                if (dropdowns.is(':visible')) {
                    dropdowns.hide('fast');
                }
            });
            if ($('#menu').hasClass('menu_1')) {
                $('.dropdown').css('border-radius', '0px 5px 5px 0px');
            }
        }
    }, false);

    menuAscroll();
    // перемещаем пункты меню в выпадающее меню, если они ушли вниз.
    SizeMenuInit();
    CheckDropdownMenuBtn();
    widthLastLi();
});

$(window).bind('orientationchange', function (e) {
    $(window).ready(function () {
        setMenuItemsWidth();

        // закрываем боковое меню.
        if ($('.mobile-menu').css('left') == '0px') {
            $('.mobile-menu').toggleClass('open');
            $('body').css('overflow', 'auto');

            $('#nav-icon1').removeClass('open');
        }

        menuAscroll();
        SizeMenuInit();
        CheckDropdownMenuBtn();
        widthLastLi();
    });
});

//---- REsize #menu -------------------------------
$(window).resize(function () {
    setMenuItemsWidth();
    SizeMenuInit();
    CheckDropdownMenuBtn();
    widthLastLi();
    dropdownMenuPosChange();
});


// изменение меню при  прокрутке
function menuAscroll() {

    if (document.documentElement.clientWidth > 768) {
        var a = document.querySelector('#menu'), b = document.querySelector('#menu-top'), P = 0;  // если ноль заменить на число, то блок будет прилипать до того, как верхний край окна браузера дойдёт до верхнего края элемента. Может быть отрицательным числом
        //ChangeMainMenu();
        SizeMenuInit();

        var Ra = a.getBoundingClientRect(),
            R = Math.round(Ra.top + b.getBoundingClientRect().height - document.querySelector('footer').getBoundingClientRect().top + 0);  // селектор блока, при достижении верхнего края которого нужно открепить прилипающий элемент;  Math.round() только для IE; если ноль заменить на число, то блок будет прилипать до того, как нижний край элемента дойдёт до футера
        var dropdown = $('.dropdown');
        if ((Ra.top - P) <= 0) {
            // кусок для  остановки фиксированного меню перед футером.
            //if ((Ra.top - P) <= R) {
            //    console.log('granica');
            //    b.className = 'stop';
            //    //b.style.top = -R + 'px';
            //    b.style.display = "none";
            //} else {
            b.style.display = "block";

            //---dropdown menu-----  
            //новый вариант расположения dropdownMenu в top menu
            dropdown.detach().prependTo('.nav_main_top');
            dropdownMenuPosChange();

            //старый вариант расположения dropdownMenu в top menu
            //dropdown.css('position', 'fixed'); 
            //}
        } else {
            b.style.display = "none";

            //---dropdown menu-----
            //новый вариант расположения dropdownMenu в top menu
            dropdown.detach().prependTo('.nav_main');
            dropdownMenuPosChange();

            //старый вариант расположения dropdownMenu в top menu
            //dropdown.css('position', 'relative'); 
        }
    }
}



// регулировка ширины пунктов меню (.nav_main li)
// если true, значит все элементы вмещаются
function setMenuItemsWidth() {
    // минимальнодопустимая ширина пунктов меню
    var minWidthLi = 180;

    var widthBody = $('.content').css('width');
    //console.log('widthBody', widthBody);

    var countLi = $('#menu li').length;
    //console.log('#menu li count = ', countLi);

    var dolya = (((parseInt(widthBody) / 10) * 9) / countLi);
    //console.log('dolya = ', dolya);

    if (dolya < minWidthLi) {
        $('.nav_main li').css('width', minWidthLi + 'px');
        return false;
    }
    else {
        $('.nav_main li').css('width', dolya + 'px');
        return true;
    }
}

function widthLastLi() {
    // ширина последнего видимого пункта меню
    var visibleElements = $('#menu li:visible');
    var widthOfVisibleElements = 0;
    var countLi = $('#menu li:visible').length;

    visibleElements.each(function () {
        if (!$(this).hasClass('last_li')) {
            //widthOfVisibleElements += $(this).width() + 1;
            widthOfVisibleElements += parseInt($(this).css('width'));
        }
    });
    //widthOfVisibleElements -= 1;

    var lastLiWidth = parseInt($('.nav_main').css('width')) - widthOfVisibleElements - parseInt($('.dropdown').css('width'));

    // добавочная ширина для последнего видимого пункта меню.
    //$('#menu li:visible.last_li').eq(0).css('width',lastLiWidth - 0);
    //добавочная ширина для всех видимых пунктов меню
    
    var ostatok = (lastLiWidth - 180) % countLi;
    var addWidthForLi = (lastLiWidth - 180 - ostatok) / countLi;
    visibleElements.each(function () {
        $(this).css('width', (parseInt($(this).css('width')) + addWidthForLi) + 'px');
    });
    $('#menu li:visible.last_li').eq(0).css('width', (parseInt($('#menu li:visible.last_li').eq(0).css('width')) + ostatok) + 'px');

    console.log('widthOfVisibleElements', widthOfVisibleElements);
}

//---------------------------------------
// если пункты меню ушли вниз, то скрываем их в  #menu и #menu-top 
// и открываем эти пункты в выпадающем списке (.dropdown-content).
function SizeMenuInit() {
    removeLasLi();
    //console.log('SizeMenuInit()');
    var text = '';
    //#menu
    var top = $('#menu li').eq(0).offset().top;
    $('#menu li').each(function (index) {
        if (top < $(this).offset().top) {
            //console.log('orientationchange = ' + $(this).text());
            // перемещаем ссылку в дроп меню
            $('.dropdown-content a').each(function (i) {
                if (index == i) {
                    $(this).addClass('show');
                }
            });
            text = $(this).text();
            //console.log($.trim(text));

            $(this).hide();
            // переназначаем класс last_li
            if (index > 0) {
                $(this).removeClass('last_li');
                $('#menu li').eq(index - 1).addClass('last_li');
            }

            $('#menu-top li').each(function (i) {
                if (index == i) {
                    //console.log(text + ' bingo 1');
                    $(this).hide();
                    // переназначаем класс last_li
                    if (index > 0) {
                        $(this).removeClass('last_li');
                        $('#menu-top li').eq(index - 1).addClass('last_li');
                    }
                }
            });
            return;
        }
        else {
            if ($(this).next('li').is(':hidden')) {
                text = $(this).next('li').text();
                $('.dropdown-content a').each(function () {
                    if ($.trim($(this).next('a').text()) == $.trim(text)) {
                        $(this).next('a').removeClass('show');
                    }
                });
                $(this).next('li').show();
                $('#menu-top li').each(function (i) {
                    if (index == i) {
                        //console.log(text + ' bingo 2');
                        $(this).show();
                    }
                });
            }
        }
    });
}

// назначаем класс last_li
function setLasLi() {
    $('#menu-top li').last().addClass('last_li');
    $('#menu li').last().addClass('last_li');
}

// очищаем от класса last_li
function removeLasLi() {
    $('#menu-top li').removeClass('last_li');
    $('#menu li').removeClass('last_li');
}

//----- DROPDOWN MENU ------------------
/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function dropdownMenu() {
    //document.getElementById("myDropdown").classList.toggle("show");
    if ($('#myDropdown').is(':visible')) {
        $('#myDropdown').hide('fast');

        if ($('#menu').hasClass('menu_1')) {
            $('.dropdown').css('border-radius', '0px 5px 5px 0px');
        }
        $('.dropbtn').blur();
    }
    else {
        $('#myDropdown').show('fast');
        if ($('#menu').hasClass('menu_1')) {
            $('.dropdown').css('border-radius', '0px 5px 0px 0px');
        }
    }
}

function dropdownMenuPosChange() {
    var dropdown = $('.dropdown');
    if ($(window).width() < 1180) {
        if (dropdown.parent().hasClass('nav_main_top')) {
            dropdown.css('position', 'fixed');
        }
        else {
            dropdown.css('position', 'relative');
        }
    }
    else {
        if (dropdown.parent().hasClass('nav_main')) {
            dropdown.css('position', 'relative');
        }
    }
}

//---- #menu -------------------------------
// Проверяем нужно ли показывать кнопку выпадающего списка.
function CheckDropdownMenuBtn() {
    if ($('#menu li:hidden').length > 0) {
        $('.dropdown').addClass('show');
    }
    else {
        $('.dropdown').removeClass('show');
    }
}

function MobMenuToggle() {
    var menu = $('.mobile-menu');
    var body = $('body');
    //console.log('MobMenuToggle() = ' + menu.css('left'));

    if (menu.css('left') == '0px') {
        menu.toggleClass('open');
        body.css('overflow', 'auto');
    }
    else {
        menu.toggleClass('open');
        body.css('overflow', 'hidden');
    }
}

//Menu "Hamburger" Icon Animations

$(document).ready(function () {
    $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function () {
        $(this).toggleClass('open');
    });
});

// изменение меню при изменении ширины экрана (сейчас нигде не вызывается)
function ChangeMainMenu() {
    //console.log('ChangeMainMenu()');
    var offsetMin = 60;
    var winWidth = $(this).width();
    var li = $('#menu li').each(function (index) {
        var left = $(this).offset().left;
        var offsetRight = winWidth - left - $(this).width();
        var text = $(this).text();

        if (offsetRight < offsetMin) {
            // перемещаем ссылку в дроп меню
            $('.dropdown-content a').each(function () {
                if ($.trim($(this).text()) == $.trim(text)) {
                    $(this).addClass('show');
                }
            });
            $(this).hide();
            return;
        }
        if ((offsetRight > (offsetMin + $(this).next('li').width())) && $(this).is(':visible')) {
            if ($(this).next('li').is(':hidden')) {
                text = $(this).next('li').text();
                $('.dropdown-content a').each(function () {
                    if ($.trim($(this).next('a').text()) == $.trim(text)) {
                        $(this).next('a').removeClass('show');
                    }
                });
                $(this).next('li').show();
            }
        }
    });

    var li = $('#menu-top li:visible').each(function (index) {
        var left = $(this).offset().left;
        var offsetRight = winWidth - left - $(this).width();

        if (offsetRight < offsetMin && ($(this).is(':visible'))) {
            $(this).hide();
            return;
        }
        if ((offsetRight > (offsetMin + $(this).next('li').width())) && $(this).is(':visible')) {
            if ($(this).next('li').is(':hidden')) {
                $(this).next('li').show();
            }
        }
    });
}