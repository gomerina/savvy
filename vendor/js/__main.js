$(document).ready(function () {

    $('.js-select').styler();
    $('.js-select').each(function(){
        if($(this).find('li').length > 6){
            $(this).find('.jq-selectbox__dropdown > ul').addClass('select-scroll js-select-scroll');
        }
    })
    setTimeout(function() {
        $('.js-select-scroll').each(function(){
            new PerfectScrollbar(this, {
                wheelSpeed: 0.2,
                wheelPropagation: false
            });
        });
    }, 100);
    $('.js-main-scroll').each(function(){
        new PerfectScrollbar(this, {
            wheelSpeed: 0.2,
            wheelPropagation: false
        });
    });
    $(document).on('click', '.js-select', function(){
        $('ul.select-scroll').animate({scrollTop: 1}, 0).animate({scrollTop: 0}, 0);
    })

    $('[data-fancybox]').fancybox({
        autoFocus: false,
    });
    $.fancybox.defaults.backFocus = false;

    //input placeholder
    $(document).on('input', '.keyUp', function () {
        if($(this).val() != ""){
            $(this).addClass('not-empty')
        }else{
            $(this).removeClass('not-empty')
        }
    })

    //mob menu
    $(document).on('click', '.js-menu-open', function(){
        $('.header__bottom').addClass('active');
        $('body').addClass('menu-open');
        $('.header__mob-select').removeClass('active');
        $('.val-mob').removeClass('active');
        return false;
    })
    $(document).on('click', '.js-menu-close', function(){
        $('.header__bottom').removeClass('active');
        $('body').removeClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-menu-dropdown > a, .js-menu-dropdown > svg', function(){
        if(window.matchMedia('(max-width: 991px)').matches){
            $(this).siblings('ul').stop().slideToggle(300);
            return false;
        }
    })
    $(document).on('click', '.js-register-open', function(){
        $('#mob-login').removeClass('active');
        $('#mob-register').addClass('active');
        $('body').addClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-register-close', function(){
        $('#mob-register').removeClass('active');
        $('body').removeClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-login-open', function(){
        $('#mob-register').removeClass('active');
        $('#mob-login').addClass('active');
        $('body').addClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-login-close', function(){
        $('#mob-login').removeClass('active');
        $('body').removeClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-val-open', function(){
        $(this).toggleClass('active');
        $('.val-mob').toggleClass('active')
        return false;
    })
    $(document).click(function (e){
		if (!$('.val-mob').is(e.target) && $('.val-mob').has(e.target).length === 0 && !$('.js-val-open').is(e.target) && $('.js-val-open').has(e.target).length === 0) {
            $('.js-val-open').removeClass('active');
            $('.val-mob').removeClass('active');
		}
        
        if(!$('.js-user-drop').is(e.target) && $('.js-user-drop').has(e.target).length === 0){
            $('.js-user-drop').removeClass('active');
            $('.js-user-open').removeClass('active');
        }
	});

    //user drop
    $(document).on('click', '.js-user-open', function(){
        $(this).toggleClass('active');
        $('.js-user-drop').toggleClass('active');
        return false;
    })

    //account tabs
    $(document).on('click', '.js-account-tab', function(){
        if(!$(this).hasClass('active')){
            $(this).addClass('active').siblings().removeClass('active');
            $('.account-tabs__block').hide();
            $('.account-tabs__block').eq($(this).index()).stop().fadeIn(300);
        }
        return false;
    })

    //notice close
    $(document).on('click', '.js-notice-close', function(){
        $(this).parent().stop().slideUp(250);
    })

    //start options drop
    $(document).on('click', '.js-start-options-drop', function(){
        $(this).toggleClass('active');
        $(this).closest('.savvy-start-options__item').find('.savvy-start-options__content').stop().slideToggle(300);
    })
    
    //add delete
    $(document).on('click', '.js-add-delete', function(){
        $(this).closest('.savvy-start__add-item').remove();
    })

    //datepicker
    $('.js-date').each(function(index){
        const $this = $(this);
        $this.attr('id', 'dateInstance-' + index);
        var dateItem = document.getElementById('dateInstance-' + index);
        new AirDatepicker(dateItem, {
            locale: {
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
                monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'MM/dd/yyyy',
                timeFormat: 'hh:mm aa',
                firstDay: 0
            }
        });
    })

    //file
    $(document).on('change', '.js-file-input', function(){
        var file = $(this).closest('.main-file')
        file.find('.js-file-name').show();
        file.find('.js-file-name span').html(this.files[0].name)
    })
    $(document).on('click', '.js-file-delete', function(){
        var file = $(this).closest('.main-file');
        file.find('.js-file-name').hide();
        file.find('.js-file-input').val('');
    })

    

    //secretary dropdown
    $(document).on('click', '.js-secretary-drop', function(){
        $(this).toggleClass('active');
        $(this).closest('.secretary-options__item').find('.secretary-options__content').stop().slideToggle(300);
    })
    $(document).on('click', '.js-secretary-drop-all', function(){
        if($(this).hasClass('active')){
            $('.js-secretary-drop').removeClass('active');
            $('.secretary-options__content').stop().slideUp(300);
        }else{
            $('.js-secretary-drop').addClass('active');
            $('.secretary-options__content').stop().slideDown(300);
        }
        $(this).toggleClass('active');
    })

    //num count
    $(document).on('input', '.js-count-input', function(){
        if($(this).val() != ""){
            var numCount = $(this).val().replace(/\s/g, '');
            if($.isNumeric(numCount) && numCount > 0){
                $(this).val(parseInt(numCount))
            }else{
                $(this).val('1')
            }
        }
    })
    $(document).on('click', '.js-count-minus', function(){
        var countInput = $(this).siblings('.js-count-input')
        if(countInput.val() == "" || countInput.val() <= 1){
            countInput.val('1')
        }else{
            countInput.val(parseInt(countInput.val()) - 1)
        }
    })
    $(document).on('click', '.js-count-plus', function(){
        var countInput = $(this).siblings('.js-count-input')
        countInput.val(parseInt(countInput.val()) + 1)
    })
    $(document).on('change', '.js-count-input', function(){
        if($(this).val() == ""){
            $(this).val('1')
        }
    })

    //file invoice delete
    $(document).on('click', '.js-file-invoice-delete', function(){
        $(this).closest('.js-file-invoice').hide();
    })

    //textarea count
    $(document).on('input', '.js-textarea', function(){
        $('.js-textarea-count').html($(this).val().length)
    })

    //steps
    var stepCount = 0;
    $(document).on('click', '.js-step-next', function(){
        if(stepCount < $('.savvy-start__slide').length - 1){
            stepCount++
            $('.savvy-start__slide').hide();
            $('.savvy-start__slide').eq(stepCount).stop().fadeIn(300);
            $('body').stop().animate({scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80}, 500);
            $('html').stop().animate({scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80}, 500);
            stepCheck();
            return false;
        }
    })
    $(document).on('click', '.js-step-prev', function(){
        if(stepCount > 0){
            stepCount--
            $('.savvy-start__slide').hide();
            $('.savvy-start__slide').eq(stepCount).stop().fadeIn(300);
            $('body').stop().animate({scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80}, 500);
            $('html').stop().animate({scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80}, 500);
            stepCheck();
            return false;
        }
    })
    function stepCheck(){
        if(stepCount == 0){
            $('.js-step-item').removeClass('active');
            $('.js-step-item').eq(0).addClass('active');
            $('.js-step-prev').addClass('hide');
        }
        if(stepCount == 1){
            $('.js-step-item').removeClass('active');
            $('.js-step-item').eq(0).addClass('active');
            $('.js-step-item').eq(1).addClass('active');
            $('.js-step-prev').removeClass('hide');
        }
        if(stepCount == 2){
            $('.js-step-item').addClass('active');
            $('.js-step-prev').removeClass('hide');
        }
    }

    //clone
    $(document).on('click', '.js-clone', function(){
        var cloneThis = $(this).closest('.savvy-start__block')
        var cloneBlock = $(this).closest('.savvy-start__block').clone();
        cloneThis.find('.savvy-start__spec-btn').hide();
        cloneBlock.find('input[type=text], textarea').val('');
        cloneBlock.find('input[type=checkbox]').prop('checked', false);
        cloneBlock.find('.jq-selectbox__select').remove();
        cloneBlock.find('select').styler();
        cloneBlock.find('.js-count-input').val(1);
        cloneBlock.find('.js-select').each(function(){
            if($(this).find('li').length > 6){
                $(this).find('.jq-selectbox__dropdown > ul').addClass('select-scroll js-select-scroll');
            }
        })
        if($(this).hasClass('js-clone-shareholder')){
            cloneBlock.find('.js-shareholder').html($('.js-clone-shareholder').length + 1);
            cloneThis.find('.js-number-shares').removeClass('hide-shares');
            cloneBlock.find('.js-number-shares').removeClass('hide-shares');
        }
        cloneBlock.insertAfter(cloneThis);
        $('.js-date').each(function(index){
            const $this = $(this);
            $this.attr('id', 'dateInstance-' + index);
            var dateItem = document.getElementById('dateInstance-' + index);
            new AirDatepicker(dateItem, {
                locale: {
                    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
                    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    today: 'Today',
                    clear: 'Clear',
                    dateFormat: 'MM/dd/yyyy',
                    timeFormat: 'hh:mm aa',
                    firstDay: 0
                }
            });
        })
        cloneBlock.find('.js-select-scroll').each(function(){
            new PerfectScrollbar(this, {
                wheelSpeed: 0.2,
                wheelPropagation: false
            });
        });
        $('body').stop().animate({scrollTop: cloneBlock.offset().top - $('.header').innerHeight() - 80}, 500);
        $('html').stop().animate({scrollTop: cloneBlock.offset().top - $('.header').innerHeight() - 80}, 500);
        return false;
    })

    //check toggle
    $(document).on('click', '.js-check-toggle', function(){
        if($(this).is(':checked')){
            $(this).closest('.savvy-start__check-wrap').find('.js-check-toggle-item').show();
        }else{
            $(this).closest('.savvy-start__check-wrap').find('.js-check-toggle-item').hide();
        }
    })

    // sliders
    var homeSlider = new Swiper('.home-section__slider', {
        speed: 600,
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
            el: '.home-section__fraction',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return '<b>' + current + '</b>' + '<i>—</i>' + '<span>' + total + '</span>'; 
            }
        },
        navigation: {
            prevEl: '.home-section__prev',
            nextEl: '.home-section__next',
        },
    });
    var servicesSlider = new Swiper('.home-services__slider', {
        speed: 600,
        slidesPerView: 3,
        spaceBetween: 36,
        pagination: {
            el: '.home-services__fraction',
            type: 'custom',
            renderCustom: function (swiper, current, total) {
                return '<b>' + (current + 2) + '</b>' + '<i>—</i>' + '<span>' + (total + 2) + '</span>'; 
            }
        },
        navigation: {
            prevEl: '.home-services__prev',
            nextEl: '.home-services__next',
        },
    });
    var aboutSlider = new Swiper('.home-about__slider', {
        speed: 600,
        slidesPerView: 'auto',
        spaceBetween: 0,
        pagination: {
            el: '.home-about__pagination',
            clickable: true,
            bulletActiveClass: "active",
        },
        navigation: {
            prevEl: '.js-home-about-prev',
            nextEl: '.js-home-about-next',
        },
        on: {
            slideChange: function () {
                if(aboutSlider.realIndex == 0){
                    $('.js-about-img').removeClass('hide')
                }
                if(aboutSlider.realIndex == 1){
                    $('.js-about-img').removeClass('hide')
                    $('.js-about-img').eq(0).addClass('hide');
                }
                if(aboutSlider.realIndex == 2){
                    $('.js-about-img').removeClass('hide');
                    $('.js-about-img').eq(0).addClass('hide');
                    $('.js-about-img').eq(1).addClass('hide');
                }
            },
        },
        breakpoints: {
            0: {
                spaceBetween: 20,
            },
            992: {
                spaceBetween: 0,
            },
        },
    });
})