// ВЫПАДАЮЩИЙ СПИСОК

$('.custom-select').each(function () {
    $(this).click(function (e) {
        e.stopPropagation();
        $(this).toggleClass('active').siblings().removeClass('active');
    })
    $(this).find('.select-menu__item').click(function () {
        $(this).closest('.custom-select').find('.custom-select__value').html($(this).html());
        $(this).closest('.custom-select').find('.custom-select__input').val($(this).html());
        // На случай, если нужно переключать активный элемент
        //$(this).addClass('current').siblings().removeClass('current');
    })
})
$(document).ready(function () {
    $('.js-select').each(function () {
        if ($(this).hasClass('jsNation')) {
            $(this).styler({
                selectPlaceholder: 'Choose Nationality...',
                selectSearch: true,
                selectSearchNotFound: 'No matches found',
                selectSearchPlaceholder: 'Search...',
            });
        } else {
            $(this).styler({});
        }
    });

    $('.js-select').each(function () {
        if ($(this).find('li').length > 6) {
            $(this).find('.jq-selectbox__dropdown > ul').addClass('select-scroll js-select-scroll');
        }
    })
    setTimeout(function () {
        $('.js-select-scroll').each(function () {
            /*new PerfectScrollbar(this, {
                wheelSpeed: 0.2,
                wheelPropagation: false
            });*/
            /*var fakeScroll_1 = $(this).fakeScroll({
                track : "smooth",
                onChange: function({scrollRatio}){
                    console.log( fakeScroll_1.scrollRatio )
                }
            });*/
        });
    }, 100);
    $('.js-main-scroll').each(function () {
        new PerfectScrollbar(this, {
            wheelSpeed: 0.2,
            wheelPropagation: false
        });
    });
    $(document).on('click', '.js-select', function () {
        $('ul.select-scroll').animate({ scrollTop: 1 }, 0).animate({ scrollTop: 0 }, 0);
    })

    $('[data-fancybox]').fancybox({
        autoFocus: false,
    });
    $.fancybox.defaults.backFocus = false;

    //input placeholder
    $(document).on('input', '.keyUp', function () {
        if ($(this).val() != "") {
            $(this).addClass('not-empty')
        } else {
            $(this).removeClass('not-empty')
        }
    })

    //mob menu
    $(document).on('click', '.js-menu-open', function () {
        $('.header__bottom').addClass('active');
        $('body').addClass('menu-open');
        $('.header__mob-select').removeClass('active');
        $('.val-mob').removeClass('active');
        return false;
    })
    $(document).on('click', '.js-menu-close', function () {
        $('.header__bottom').removeClass('active');
        $('body').removeClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-menu-dropdown > a, .js-menu-dropdown > svg', function () {
        if (window.matchMedia('(max-width: 991px)').matches) {
            $(this).siblings('ul').stop().slideToggle(300);
            return false;
        }
    })
    $(document).on('click', '.js-register-open', function () {
        $('#mob-login').removeClass('active');
        $('#mob-register').addClass('active');
        $('body').addClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-register-close', function () {
        $('#mob-register').removeClass('active');
        $('body').removeClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-login-open', function () {
        $('#mob-register').removeClass('active');
        $('#mob-login').addClass('active');
        $('body').addClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-login-close', function () {
        $('#mob-login').removeClass('active');
        $('body').removeClass('menu-open');
        return false;
    })
    $(document).on('click', '.js-val-open', function () {
        $(this).toggleClass('active');
        $('.val-mob').toggleClass('active')
        return false;
    })
    $(document).click(function (e) {
        if (!$('.val-mob').is(e.target) && $('.val-mob').has(e.target).length === 0 && !$('.js-val-open').is(e.target) && $('.js-val-open').has(e.target).length === 0) {
            $('.js-val-open').removeClass('active');
            $('.val-mob').removeClass('active');
        }
        $('.custom-select').removeClass('active');
        if (!$('.js-user-drop').is(e.target) && $('.js-user-drop').has(e.target).length === 0) {
            $('.js-user-drop').removeClass('active');
            $('.js-user-open').removeClass('active');
        }
    });

    //user drop
    $(document).on('click', '.js-user-open', function () {
        $(this).toggleClass('active');
        $('.js-user-drop').toggleClass('active');
        return false;
    })

    //account tabs
    $(document).on('click', '.js-account-tab', function () {
        if (!$(this).hasClass('active')) {
            $(this).addClass('active').siblings().removeClass('active');
            $('.account-tabs__block').hide();
            $('.account-tabs__block').eq($(this).index()).stop().fadeIn(300);
        }
        return false;
    })

    //notice close
    $(document).on('click', '.js-notice-close', function () {
        $(this).parent().stop().slideUp(250);
    })

    //start options drop
    $(document).on('click', '.js-start-options-drop', function () {
        $(this).toggleClass('active');
        $(this).closest('.savvy-start-options__item').find('.savvy-start-options__content').stop().slideToggle(300);
    })

    //add delete
    $(document).on('click', '.js-add-delete', function () {
        $(this).closest('.savvy-start__add-item').remove();
    })

    //file
    $(document).on('change', '.js-file-input', function () {
        var file = $(this).closest('.main-file')
        file.find('.js-file-name').show();
        file.find('.js-file-name span').html(this.files[0].name)
    })
    $(document).on('change', '.js-multi-file-input', function () {
        var file = $(this).closest('.main-file')
        file.find('.js-file-name').show();
        file.find('.js-file-name span').html(this.files[0].name)
        /*var name_file = []; // Создаем массив
        for(var i = 0; i < $(this).get(0).files.length; ++i) { // Запускаем цикл и перебираем все файлы
            name_file.push($(this).get(0).files[i].name); // Добавляем имена файлов в массив
        } */
        //console.log(name_file.join("<br>"));
        //file.find('.js-file-name span').html('Files upload')
    })
    $(document).on('click', '.js-file-delete', function () {
        var file = $(this).closest('.main-file');
        file.find('.js-file-name').hide();
        file.find('.js-file-input').val('');
        file.find('.js-multi-file-input').val('');
        if ($(this).closest('form').hasClass('file_form')) {
            $(this).closest('form').find('.jsFileformError').html('');
        }
    })



    //secretary dropdown
    $(document).on('click', '.js-secretary-drop', function () {
        $(this).toggleClass('active');
        $(this).closest('.secretary-options__item').find('.secretary-options__content').stop().slideToggle(300);
    })
    $(document).on('click', '.js-secretary-drop-all', function () {
        if ($(this).hasClass('active')) {
            $('.js-secretary-drop').removeClass('active');
            $('.secretary-options__content').stop().slideUp(300);
        } else {
            $('.js-secretary-drop').addClass('active');
            $('.secretary-options__content').stop().slideDown(300);
        }
        $(this).toggleClass('active');
    })

    //num count
    $(document).on('input', '.js-count-input', function () {
        if ($(this).val() != "") {
            var numCount = $(this).val().replace(/\s/g, '');
            if ($.isNumeric(numCount) && numCount > 0) {
                $(this).val(parseInt(numCount))
            } else {
                $(this).val('1')
            }
        }
    })
    $(document).on('click', '.js-count-minus', function () {
        var countInput = $(this).siblings('.js-count-input');
        if (countInput.val() == "" || countInput.val() <= 1) {
            countInput.val('1')
        } else {
            countInput.val(parseInt(countInput.val()) - 1)
        }
    })
    $(document).on('click', '.js-count-plus', function () {
        var countInput = $(this).siblings('.js-count-input');
        if (parseInt(countInput.data('max')) < (parseInt(countInput.val()) + 1)) {
            countInput.val(countInput.data('max'));
        } else {
            countInput.val(parseInt(countInput.val()) + 1)
        }
        if ($(this).hasClass('jsRoomPlus')) {
            if (countInput.val() > 5) {
                countInput.val(5);
            }
        }

    })
    $(document).on('change', '.js-count-input', function () {
        if ($(this).val() == "") {
            $(this).val('1')
        }
        if (parseInt($(this).val()) > parseInt($(this).data('max'))) {
            $(this).val($(this).data('max'))
        }
    })

    //file invoice delete
    $(document).on('click', '.js-file-invoice-delete', function () {
        $(this).closest('.js-file-invoice').hide();
    })

    //textarea count
    $(document).on('input', '.js-textarea', function () {
        $('.js-textarea-count').html($(this).val().length)
    })

    //steps    
    var stepCount = 0;
    $(document).on('click', '.js-step-next', function () {
        //console.log($('.savvy-start__slide').eq(stepCount + 1).index());

        if ($(this).closest('form').hasClass('savvy_smart_form')) {
            var responce = validateStepsSmart(stepCount);
            //console.log(responce);
            if (!responce) return false;
            if ($('.savvy-start__slide').eq(stepCount + 1).index() == 6) {
                $('.jsStepSkip').fadeIn();
            } else {
                $('.jsStepSkip').fadeOut();
            }
        }
        if (stepCount < $('.savvy-start__slide').length - 1) {
            stepCount++
            $('.savvy-start__slide').hide();
            $('.savvy-start__slide').eq(stepCount).stop().fadeIn(300);
            $('body').stop().animate({ scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80 }, 500);
            $('html').stop().animate({ scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80 }, 500);
            stepCheck();
            return false;
        }
    })
    $(document).on('click', '.js-step-prev', function () {
        if ($('.savvy-start__slide').eq(stepCount - 1).index() == 6) {
            $('.jsStepSkip').fadeIn();
        } else {
            $('.jsStepSkip').fadeOut();
        }
        if (stepCount > 0) {
            stepCount--
            $('.savvy-start__slide').hide();
            $('.savvy-start__slide').eq(stepCount).stop().fadeIn(300);
            $('body').stop().animate({ scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80 }, 500);
            $('html').stop().animate({ scrollTop: $('.savvy-start__steps').offset().top - $('.header').innerHeight() - 80 }, 500);
            stepCheck();
            return false;
        }
    })

    function validateStepsSmart(stepCount) {
        //console.log(stepCount);
        var form_warning_wrap = $('.jsSmartStepNextWarning');
        form_warning_wrap.html('');
        var form = $('.savvy_smart_form');
        var empty_flag = true;
        if (stepCount == 0) {
            var inputs_reqiured = form.find('.savvy-start__slide').eq(stepCount).find('.smart_reqiured');

            //TT23097 комм 80
            if ($('.jsAddBuisnessActivityWrap ').hasClass('open') && $('.jsAddBuisnessActivityWrap ').find('.jsCompanyActiveAdd').val() == '') {
                $('.jsAddBuisnessActivityWrap ').find('.jsCompanyActiveAdd').addClass('error');
                empty_flag = false;
            } else {
                $('.jsAddBuisnessActivityWrap ').find('.jsCompanyActiveAdd').removeClass('error');
            }

            inputs_reqiured.each(function () {
                if ($(this).val() == '') {
                    $(this).addClass('error');
                    empty_flag = false;
                } else {
                    $(this).removeClass('error');
                }
            });
            if (empty_flag) {
                $this = $('.jsCompanyActive');
                if ($this.hasClass('smart_reqiured')) {
                    var advance = getAdvanceAjax($this);
                    if (advance.responseJSON.error) {
                        form_warning_wrap.html('principal business activity incorrectly filled in');
                        return false;
                    } else {
                        form_warning_wrap.html('');
                        return true;
                    }
                } else {
                    $this.removeClass('error');
                }
            } else {
                form_warning_wrap.html('required fields are not filled in');
                return empty_flag;
            }
        }
        if (stepCount == 1) {
            var reasons = $('.js_smart_2_reasons input[type=checkbox]:checked');
            if (!reasons.length) {
                form_warning_wrap.append('reasons fields are not filled in<br>');
                $('.js_smart_2_reasons input[type=checkbox]').addClass('error');
                empty_flag = false;
            } else {
                reasons.each(function () {
                    if ($(this).val() == 'other' && $(this).closest('.savvy-start__check-wrap').find('.main-input input').val() == '') {
                        form_warning_wrap.append('other reasons fields are not filled in<br>');
                        $('input[name=smart_2_text_reasons]').addClass('error');
                        empty_flag = false;
                    } else if ($(this).val() == 'other') {
                        $('input[name=smart_2_text_reasons]').removeClass('error');
                    }
                });
            }

            var source = $('.js_smart_2_source input[type=checkbox]:checked');
            if (!source.length) {
                form_warning_wrap.append('Source of initial funds fields are not filled in<br>');
                $('.js_smart_2_source input[type=checkbox]').addClass('error');
                empty_flag = false;
            } else {
                source.each(function () {
                    if ($(this).val() == 'other' && $(this).closest('.savvy-start__check-wrap').find('.main-input input').val() == '') {
                        form_warning_wrap.append('other Source of initial funds fields are not filled in<br>');
                        $('input[name=smart_2_text_source]').addClass('error');
                        empty_flag = false;
                    } else if ($(this).val() == 'other') {
                        $('input[name=smart_2_text_source]').removeClass('error');
                    }
                });
            }
            if ($('input[name=smart_2_investment]:checked').val() == 'other' && $('input[name=smart_2_text_investment]').val() == '') {
                form_warning_wrap.append('other Investment type fields are not filled in<br>');
                $('input[name=smart_2_text_investment]').addClass('error');
                empty_flag = false;
            } else if ($('input[name=smart_2_investment]:checked').val() == 'other') {
                $('input[name=smart_2_text_investment]').removeClass('error');
            }
        }
        if (stepCount == 2) {
            var good_id = $('input[name=smart_3_options]:checked').data('id');
            if (good_id != 67) {
                var select = $('select[name=smart_3_area_select_' + good_id + ']');
                if (select.val() == '') {
                    form_warning_wrap.append('you didn\'t select an area from the list<br>');
                    select.addClass('error');
                    empty_flag = false;
                } else {
                    select.removeClass('error');
                }
            }
            if (good_id == 69) {
                if ($('input[name=smart_3_office_other]').prop('checked') === true && $('input[name=smart_3_office_requirements_text]').val() == '') {
                    form_warning_wrap.append('requirements fields are not filled in<br>');
                    $('input[name=smart_3_office_requirements_text]').addClass('error');
                    empty_flag = false;
                } else {
                    $('input[name=smart_3_office_requirements_text]').removeClass('error');
                }
            }
        }
        if (stepCount == 3) {
            if ($('.jsSmartDirRadio:checked').data('id') == 71) {
                var validate_fields = ['jsDirNamePass', 'jsDirAddress', 'jsDirBirthday', 'jsDirPassport', 'jsDirPassportExpiry'];
                validate_fields.forEach(function (item, i, arr) {
                    $('.' + item).each(function () {
                        if ($(this).val() == '') {
                            empty_flag = false;
                            $(this).addClass('error');
                            form_warning_wrap.html('Please check that the fields are filled in correctly');
                        } else {
                            $(this).removeClass('error');
                        }
                    });
                });
                /*$('.jsDirSitizen').each(function() {
                    if($(this).val() == '') {
                        empty_flag = false;
                        $(this).addClass('error');
                        form_warning_wrap.html('Please check that the fields are filled in correctly');
                    } else {
                        $(this).removeClass('error');
                    }
                });*/
            }
        }
        if (stepCount == 4) {
            if (parseInt($('input[name=sh_amount]').val()) == 0 || $('input[name=sh_amount]').val() == '') {
                empty_flag = false;
                $('input[name=sh_amount]').addClass('error');
                form_warning_wrap.html('The amount of capital must be at least 1');
            } else {
                $('input[name=sh_amount]').removeClass('error');
            }

            var validate_fields = ['jsShName', 'jsShPassportNumber', 'jsShBirthday', 'jsShAddress', 'jsShPassportExpiry', 'jsShShares'];

            validate_fields.forEach(function (item, i, arr) {
                if (item != 'jsShShares') {
                    $('.' + item).each(function () {
                        if ($(this).val() == '') {
                            empty_flag = false;
                            $(this).addClass('error');
                            form_warning_wrap.html('Please check that the fields are filled in correctly');
                        } else {
                            $(this).removeClass('error');
                        }
                    });
                } else if (item == 'jsShShares') {
                    var total_shares = parseInt($('input[name=sh_shares]').val());
                    if (total_shares == 'NAN') {
                        total_shares = 0;
                    }
                    var shares_summ = 0;

                    var empty_shares = true;
                    $('.jsShShares').each(function () {
                        if ($(this).val() != '') {
                            shares_summ += parseInt($(this).val());
                            $(this).removeClass('error');
                            form_warning_wrap.html('');
                        } else if ($('.jsShShares').length > 1) {
                            empty_flag = false;
                            empty_shares = false;
                            $(this).addClass('error');
                            form_warning_wrap.html('The field if shares does not empty');
                        }
                    });
                    if (shares_summ != total_shares && $('.jsShShares').length > 1) {
                        empty_flag = false;
                        $('.' + item).addClass('error');
                        form_warning_wrap.html('The number of shares of all shareholders does not correspond to the total');
                    } else {
                        if (empty_shares) {
                            $('.' + item).removeClass('error');
                        }
                    }

                } else if (item == 'jsShShares' && $('.' + item).length == 1) {
                    //console.log('shares_count = 1');
                }
            });

        }
        if (stepCount == 5) {
            /*console.log('final anuin');
            setTimeout(function() {
                $('.jsStepSkip').fadeIn();    
            }, 300);*/

        }
        if (stepCount == 5) {
            $('.jsCompanyNameCheck').val($('.jsCompanyNameInput').val() + ' ' + $('select[name=prefix] option:selected').val());
            //console.log($('.jsCompanyActive').val());
            $('.jsCompanyMainActivityCheck').val($('.jsCompanyActive').val());
            $('.jsCompanyAddActivityCheck').val($('.jsCompanyActiveAdd').val());
            $('.jsCompanyCountriesCheck').val($('input[name=smart_2_countries]').val());
            $('.jsCompanyTargetCustomersCheck').val($('input[name=smart_2_target]:checked').val());
            $('.jsCompanyInvestmentsCheck').val($('input[name=smart_2_investment]:checked').val());
            $('.jsCompanyMainCountriesCheck').val($('input[name=smart_2_text_investment_type]').val());

            $('.jsShareholderCurrencyName').val($('select[name=shareholder_currency_name]').val());
            $('.jsShareholderAmount').val($('input[name=sh_amount]').val());
            $('.jsShareholderNumberShares').val($('input[name=sh_shares]').val());

            $('.jsDirWrapCheck').html('');
            var dir_coll = $('.jsDirNamePass');
            var dir_address = $('.jsDirAddress');
            var dir_cityzen = $('select.jsDirSitizen');
            dir_cityzen_val = [];
            dir_cityzen.each(function (index, value) {
                dir_cityzen_val.push($(this).val());
                //console.log($(this).val());
            });

            //console.log(dir_cityzen_val);

            var dir_birth = $('.jsDirBirthday');
            var dir_pass = $('.jsDirPassport');
            var dir_expiry = $('.jsDirPassportExpiry');
            if ($('.jsSmartDirRadio:checked').data('id') == 71) {
                dir_coll.each(function (index, value) {
                    $('.jsDirWrapCheck').append('<div class="savvy-start__block"><h4>DIRECTOR ' + (index + 1) + '</h4><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Name (according to Passport)</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="dir_name_check[]" value="' + dir_coll[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Address</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="dir_address_check[]" value="' + dir_address[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Citizenship</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="dir_sitizen_check[]" value="' + dir_cityzen_val[index] + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Date of Birth</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="dir_birth_check[]" value="' + dir_birth[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Passport Number</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input class="jsInputCheck" type="text" name="dir_pass_check[]" value="' + dir_pass[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Passport Expiry Date</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="dir_expiry_check[]" value="' + dir_expiry[index].value + '" readonly></div></div></div></div></div></div>');
                });
            }
            $('.jsShWrapCheck').html('');
            var sh_name = $('.jsShName');
            var sh_address = $('.jsShAddress');
            var sh_cityzen = $('select.jsShNationality');

            sh_cityzen_val = [];
            sh_cityzen.each(function (index, value) {
                sh_cityzen_val.push($(this).val());
                //console.log($(this).val());
            });

            var sh_birth = $('.jsShBirthday');
            var sh_pass = $('.jsShPassportNumber');
            var sh_expiry = $('.jsShPassportExpiry');
            var sh_shares = $('.jsShShares');
            sh_name.each(function (index, value) {
                $('.jsDirWrapCheck').append('<div class="savvy-start__block"><h4>SHAREHOLDER ' + (index + 1) + '</h4><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Name (according to Passport)</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="shr_name_check[]" value="' + sh_name[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Address</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="shr_address_check[]" value="' + sh_address[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Citizenship</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="shr_nationality_check[]" value="' + sh_cityzen_val[index] + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Date of Birth</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="shr_birthday_check[]" value="' + sh_birth[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Passport Number</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="shr_passport_number_check[]" value="' + sh_pass[index].value + '" readonly></div></div></div></div></div><div class="savvy-start__block-row"><div class="savvy-start__block-col savvy-start__block-left"><h5 class="savvy-start__label savvy-start__label--center">Passport Expiry Date</h5></div><div class="savvy-start__block-col savvy-start__block-right"><div class="savvy-start__add"><div class="savvy-start__add-col"><div class="main-input"><input type="text" class="jsInputCheck" name="shr_passport_expiry_check[]" value="' + sh_expiry[index].value + '" readonly></div></div></div></div></div></div>');
            });

        }
        //console.log(empty_flag);
        setTimeout(function () {
            $('.jsSetActiveInputBtn').on('click', function (e) {
                e.preventDefault();
                $(this).closest('.savvy-start__add').find('.jsInputCheck').prop('readonly', false);
            });
        }, 1200);
        return empty_flag;
    }

    function getAdvanceAjax($this) {
        return $.ajax({
            type: 'POST',
            url: document.location.href,
            dataType: 'json',
            async: false,
            cache: false,
            data: {
                action: 'checkActivityName',
                search: $this.val()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
            },
            success: function (response, textStatus, jqXHR) {
                if (response.error) {
                    $this.addClass('error');
                    return false;
                } else {
                    $this.removeClass('error');
                    return true;
                }
            }
        });
    }

    function stepCheck() {
        if (stepCount == 0) {
            $('.js-step-item').removeClass('active');
            $('.js-step-item').eq(0).addClass('active');
            $('.js-step-prev').addClass('hide');
        }
        if (stepCount == 1) {
            $('.js-step-item').removeClass('active');
            $('.js-step-item').eq(0).addClass('active');
            $('.js-step-item').eq(1).addClass('active');
            $('.js-step-prev').removeClass('hide');
        }
        if (stepCount == 2) {
            $('.js-step-item').addClass('active');
            $('.js-step-prev').removeClass('hide');
        }
    }

    //clone
    var $dir_clone_i = 0;
    $(document).on('click', '.js-clone', function () {
        //console.log('sh clone')
        $dir_clone_i++;
        var cloneThis = $(this).closest('.savvy-start__block')
        var cloneBlock = $(this).closest('.savvy-start__block').clone();

        cloneBlock.attr('data-idx', $dir_clone_i);

        cloneBlock.find('.jsRemoveStuff').fadeIn();

        cloneThis.find('.savvy-start__spec-btn').hide();
        cloneBlock.find('input[type=text], textarea').val('');
        cloneBlock.find('input[type=checkbox]').prop('checked', false);
        cloneBlock.find('.jq-selectbox__select').remove();
        cloneBlock.find('select').styler({
            selectPlaceholder: 'Choose Nationality...',
            selectSearch: true,
            selectSearchNotFound: 'No matches found',
            selectSearchPlaceholder: 'Search...',
        });
        cloneBlock.find('.js-count-input').val(1);
        cloneBlock.find('.js-select').each(function () {
            if ($(this).find('li').length > 6) {
                $(this).find('.jq-selectbox__dropdown > ul').addClass('select-scroll js-select-scroll');
            }
        })
        if ($(this).hasClass('js-clone-shareholder')) {
            cloneBlock.find('.js-shareholder').html($('.js-clone-shareholder').length + 1);
            cloneThis.find('.js-number-shares').removeClass('hide-shares');
            cloneBlock.find('.js-number-shares').removeClass('hide-shares');
        }
        cloneBlock.insertAfter(cloneThis);

        if ($dir_clone_i > 2) {
            cloneBlock.find('.savvy-start__spec-btn').hide();
        }
        if ($(this).hasClass('jsAddShareholder')) {
            $('.jsNumberOfSharesWrap').addClass('show_block');
        }

        $('.js-date').each(function (index) {
            const $this = $(this);
            $this.attr('id', 'dateInstance-' + index);
            var dateItem = document.getElementById('dateInstance-' + index);

            //var newdate = new Date();

            new AirDatepicker(dateItem, {
                locale: {
                    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    today: 'Today',
                    clear: 'Clear',
                    dateFormat: 'MM.dd.yyyy',
                    timeFormat: 'hh:mm aa',
                    firstDay: 0
                },
            });
        })

        // director and shareholder

        $(".jsAndShareholder").off("click"); // удаляем накапливающуюся прослушку клика по кнопке jsAndShareholder
        $('.jsAndShareholder').on('click', function () {
            //console.log('director clone add sh click');
            var dir_wrap = $(this).closest('.jsDirWrap');
            var tmp_name = dir_wrap.find('input.jsDirName').val();
            var tmp_passport = dir_wrap.find('input.jsDirPass').val();
            var tmp_birthday = dir_wrap.find('input.jsDirBirth').val();
            var tmp_address = dir_wrap.find('input.jsDirAddress').val();
            var tmp_nationality = dir_wrap.find('select.jsDirNation').val();

            if ($(this).prop('checked') === true) {
                var sh_wrap_coll = $('.jsShWrap');
                var sh_wrap_flag = false;
                var tmp_sh_wrap = '';
                sh_wrap_coll.each(function () {
                    //console.log($(this).find('.jsShName').val());
                    if ($(this).find('.jsShName').val() == '' && !sh_wrap_flag) {
                        tmp_sh_wrap = $(this);
                        sh_wrap_flag = true;
                    }
                });

                if (sh_wrap_flag) {
                    console.log('добавляем данные директора в активное окно акционера main.js');
                    tmp_sh_wrap.find('.jsShName').val(tmp_name);
                    tmp_sh_wrap.find('.jsShPass').val(tmp_passport);
                    tmp_sh_wrap.find('.jsShBirth').val(tmp_birthday);
                    tmp_sh_wrap.find('.jsShAddress').val(tmp_address);
                    tmp_sh_wrap.find('.jsShNation').val(tmp_nationality).trigger('refresh');
                } else {
                    console.log('клонируем окно нового акционера');
                    var buttons_add_sh = $('.jsAddShareholder');
                    //var buttons_add_sh_flag = false;
                    var tmp_sh_button = '';
                    buttons_add_sh.each(function () {
                        if ($(this).closest('.savvy-start__spec-btn').css('display') != 'none') {
                            tmp_sh_button = $(this);
                            tmp_sh_button.trigger('click');
                            console.log('кликаем по кнопке add shareholder main.js');

                            setTimeout(function () {
                                console.log('добавляем данные директора в склонированное окно акционера main.js');
                                tmp_next_sh_wrap = tmp_sh_button.closest('.jsShWrap').next('.jsShWrap');
                                tmp_next_sh_wrap.find('.jsShName').val(tmp_name);
                                tmp_next_sh_wrap.find('.jsShPass').val(tmp_passport);
                                tmp_next_sh_wrap.find('.jsShBirth').val(tmp_birthday);
                                tmp_next_sh_wrap.find('.jsShAddress').val(tmp_address);
                                tmp_next_sh_wrap.find('.jsShNation').val(tmp_nationality).trigger('refresh');
                            }, 200);


                        }
                    });
                }
            } else {
                var sh_wrap_coll = $('.jsShWrap');

                //console.log(sh_wrap_coll.length);

                var sh_wrap_flag = false;
                var tmp_sh_wrap = '';
                sh_wrap_coll.each(function () {
                    if ($(this).find('.jsShName').val() == tmp_name &&
                        $(this).find('.jsShPass').val() == tmp_passport &&
                        $(this).find('.jsShBirth').val() == tmp_birthday &&
                        $(this).find('.jsShAddress').val() == tmp_address &&
                        $(this).find('.jsShNation').val() == tmp_nationality &&
                        !sh_wrap_flag &&
                        sh_wrap_coll.length > 1) {
                        tmp_sh_wrap = $(this);
                        tmp_sh_wrap.find('.jsRemoveStuff').trigger('click');
                        sh_wrap_flag = true;
                    }
                });
            }
        });

        $('.jsRemoveStuff').on('click', function (e) {
            e.preventDefault();
            var wrap = $(this).closest('.savvy-start__block');
            wrap.slideUp(200);
            setTimeout(function () {
                wrap.remove();
                setNumberToStuffTitle();
            }, 300);
        });

        $('.jsLatInput').on('input', function () {
            $(this).val($(this).val().replace(/[^A-Za-z,.\- ]/g, ""));
        });
        $('.jsPhoneInput').on('input', function () {
            $(this).val($(this).val().replace(/[^0-9\+ ]/g, ""));
        });

        setNumberToStuffTitle();

        $('body').stop().animate({ scrollTop: cloneBlock.offset().top - $('.header').innerHeight() - 80 }, 500);
        $('html').stop().animate({ scrollTop: cloneBlock.offset().top - $('.header').innerHeight() - 80 }, 500);
        return false;
    })

    //
    $(document).on('click', '.js-check-toggle', function () {
        if ($(this).is(':checked')) {
            $(this).closest('.savvy-start__check-wrap').find('.js-check-toggle-item').show();
            if ($(this).hasClass('jsOtherCheckbox')) {
                $(this).closest('.jsPricingContent').find('.js-select').attr('disabled', true).trigger('refresh');
            }
        } else {
            $(this).closest('.savvy-start__check-wrap').find('.js-check-toggle-item').hide();
            if ($(this).hasClass('jsOtherCheckbox')) {
                $(this).closest('.jsPricingContent').find('.js-select').attr('disabled', false).trigger('refresh');
            }
        }
    })

    $(document).on('click', '.js-check-toggle-radio', function () {
        if ($(this).hasClass('other')) {
            $(this).closest('.savvy-start__block-wrap').find('.js-check-toggle-item').show();
        } else {
            $(this).closest('.savvy-start__block-wrap').find('.js-check-toggle-item').hide();
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
                if (aboutSlider.realIndex == 0) {
                    $('.js-about-img').removeClass('hide')
                }
                if (aboutSlider.realIndex == 1) {
                    $('.js-about-img').removeClass('hide')
                    $('.js-about-img').eq(0).addClass('hide');
                }
                if (aboutSlider.realIndex == 2) {
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