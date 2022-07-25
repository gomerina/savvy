$(document).ready(function() {
    
    // director and shareholder
    $('.jsAndShareholder').on('change', function() {
        //console.log($(this).prop('checked'));
        var dir_wrap = $(this).closest('.jsDirWrap');
        var tmp_name = dir_wrap.find('input.jsDirName').val();
        var tmp_passport = dir_wrap.find('input.jsDirPass').val();
        var tmp_birthday = dir_wrap.find('input.jsDirBirth').val();
        var tmp_address = dir_wrap.find('input.jsDirAddress').val();
        var tmp_nationality = dir_wrap.find('select.jsDirNation').val();
            
        if($(this).prop('checked') === true) {
            var sh_wrap_coll = $('.jsShWrap');
            var sh_wrap_flag = false;
            var tmp_sh_wrap = '';
            sh_wrap_coll.each(function() {
                //console.log($(this).find('.jsShName').val());
                if($(this).find('.jsShName').val() == '' && !sh_wrap_flag) {
                    tmp_sh_wrap = $(this);
                    sh_wrap_flag = true;
                }
            });
            
            //console.log(sh_wrap_flag);
            
            if(sh_wrap_flag) { // первое окно акционера пустое
                console.log('добавляем данные директора в активное окно акционера custom.js');
                tmp_sh_wrap.find('.jsShName').val(tmp_name);
                tmp_sh_wrap.find('.jsShPass').val(tmp_passport);
                tmp_sh_wrap.find('.jsShBirth').val(tmp_birthday);
                tmp_sh_wrap.find('.jsShAddress').val(tmp_address);
                tmp_sh_wrap.find('.jsShNation').val(tmp_nationality).trigger('refresh');
            } else { // клонируем окно акционера
                console.log('клонируем окно нового акционера');
                var buttons_add_sh = $('.jsAddShareholder');
                //var buttons_add_sh_flag = false;
                var tmp_sh_button = '';
                buttons_add_sh.each(function() {
                    if($(this).closest('.savvy-start__spec-btn').css('display') != 'none') {
                        tmp_sh_button = $(this);
                        tmp_sh_button.trigger('click');
                        console.log('кликаем по кнопке add shareholder custom.js');
                        
                        setTimeout(function() {
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
            sh_wrap_coll.each(function() {
                if($(this).find('.jsShName').val() == tmp_name &&
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
    
    // deposit order form
    $('select#jsChooseDepositUser').on('change', function() {
        var user_id = $(this).val();
        //console.log(user_id);
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'getDepositCompanies',
			    user_id: user_id
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				//console.log(response);
				if(response.error) {
				    console.log(response.content);
				} else {
				    setTimeout(function() {
				        $('#jsChooseDepositCompany').removeClass('error').html(response.content).trigger('refresh');    
				    }, 200);
				    
				}
			}
		});
    });
    
    // currency change
    $('select.jsCurrencySelect').on('change', function() {
        var currency_id = $(this).val();
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'setCurrency',
			    currency_id: currency_id
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				//console.log(response);
				if(response.error) {
				    console.log(response.content);
				} else {
				    document.location.reload();
				}
			}
		});
    });
    
    // billing list filter on user account
    let total_count = $('.jsAjaxOrdersCount').html();
    $('select.jsBillingSelect').on('change', function() {
        let value = $(this).val();
        $('.jsBiilingItem').show();
        if(value == 0) {
            $('.jsAjaxOrdersCount').html(total_count);
        } else if(value == 2) {
            $('.jsCreditItem').hide();
            $('.jsAjaxOrdersCount').html($('.jsDebetItem').length);
        } else if(value == 1) {
            $('.jsDebetItem').hide();
             $('.jsAjaxOrdersCount').html($('.jsCreditItem').length);
        }
    });
    
    // auto reneval checkbox in Account
    AutoRenewalStatus = $('.jsAutoRenewal').prop('checked');
    $('.jsAutoRenewal').on('change', function() {
        if(AutoRenewalStatus !== $('.jsAutoRenewal').prop('checked')) {
            $('.jsAutoRenewalSubmit').prop('disabled', false);
        } else {
            $('.jsAutoRenewalSubmit').prop('disabled', true);
        }
        $('.jsAutoRenewalStatus').html('');
    });
    
    $('.jsAutoRenewalSubmit').on('click', function(e) {
        e.preventDefault();
        var company_id = $(this).data('company');
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'setRenewalUserCompany',
			    company_id: company_id
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				//console.log(response);
				AutoRenewalStatus = $('.jsAutoRenewal').prop('checked');
				$('.jsAutoRenewalSubmit').prop('disabled', true);
				if(response.error === true) {
				    $('.jsAutoRenewalStatus').html(response.content);
				} else {
				    $('.jsAutoRenewalStatus').html('<span style="color:green">' + response.content + '</span>');
				}
			}
		});
    });
    
    $('.js-step-prev').on('click', function() {
        $('.jsAccountProfile').html('');
    });
    
    $('.jsCloseTicket').on('click', function(e) {
        e.preventDefault();
        var ticket_id = $(this).data('id');
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'setCloseTicket',
			    ticket_id: ticket_id
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				console.log(response);
			}
		});
    });
    
    $('.jsNeedDirPass').on('click', function() {
        if($(this).prop('checked') === true) {
            var name = $(this).closest('.jsDirWrap').find('.jsDirNamePass').val();
            $(this).prev('.jsHideDirName').val(name);
        } else {
            $(this).prev('.jsHideDirName').val('');
        }
    });
    $('.jsNeedDirPassFamily').on('click', function() {
        if($(this).prop('checked') === true) {
            var name = $(this).closest('.jsDirWrap').find('.jsDirNamePass').val();
            $(this).prev('.jsHideFamilyDirName').val(name);
        } else {
            $(this).prev('.jsHideFamilyDirName').val('');
        }
    });
    
    $('.jsDirNamePass').on('change', function() {
        $(this).closest('.jsDirWrap').find('.jsNeedDirPass').val($(this).val());
        $(this).closest('.jsDirWrap').find('.jsNeedDirPassFamily').val($(this).val());
        $(this).closest('.jsDirWrap').find('.jsHideDirName').val($(this).val());
        $(this).closest('.jsDirWrap').find('.jsHideFamilyDirName').val($(this).val());
        //$(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirName').val($(this).val());

        var count = $(this).closest('.jsDirWrap').find('.jsDirNeedPassFamilyCount').val();
        $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirName').val(count + '||' + $(this).val());

    });
    
    // Savvy Secretary clone input type file
    var files_example = $('.jsMultiFileWrap').first().find('.jsMultiFile').first();
    var files_example_clone = files_example.clone();
    $('.jsCloneFile').on('click', function(e) {
        e.preventDefault();
        var coll_length = $(this).closest('form, .jsPricingContent').find('.jsMultiFile').length;
        //var coll_last = $(this).closest('form, .jsPricingContent').find('.jsMultiFile:last-child');
        files_example_clone.clone().appendTo($(this).closest('form, .jsPricingContent').find('.jsMultiFileWrap'));
        if(coll_length > 3) {
            $(this).hide();
        }
    });
    
    // Pricing clone input type file
    $('.jsClonePricingFile').on('click', function(e) {
        e.preventDefault();
        var files_example_p = $(this).closest('.secretary-options__block-right').find('.jsMultiFile').first();
        var files_example_clone_p = files_example_p.clone();
        files_example_clone_p.find('.js-file-name').hide().find('span').html('');
        files_example_clone_p.find('input[type=file]').val('');
        
        var coll_length_p = $(this).closest('.secretary-options__block-right').find('.jsMultiFile').length;
        files_example_clone_p.appendTo($(this).prev('.jsMultiFileWrap'));
        if(coll_length_p > 3) {
            $(this).hide();
        }
    });
    
    $('.jsCourierMailInput').on('change', function() {
        if($(this).prop('checked') === true) {
            if($(this).hasClass('jsAcraCheckbox--no_total')) {
                $(this).closest('.main-checkbox').next('.jsCourierDropForm').slideDown();
            } else {
                $(this).closest('form').find('.jsCourierDropForm').slideDown();
            }
        } else {
            if($(this).hasClass('jsAcraCheckbox--no_total')) {
                $(this).closest('.main-checkbox').next('.jsCourierDropForm').slideUp();
            } else {
                $(this).closest('form').find('.jsCourierDropForm').slideUp();
            }
        }
    });
    
    $('.jsCompanyNumberInput').on('input', function() {
        $('.jsAcraCompanyNumber').val($(this).val());
    });
    
    /*$('.jsGetStuffFile').on('click', function(e) {
        e.preventDefault();
        var link = $(this).attr('href');
        $.ajax({
			type: 'POST',
			url: document.location.href,
			//dataType: 'text',
			cache: false,
			data: {
			    action:'getStuffFile',
			    link: link
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				console.log(response);
			}
		});
    });*/
    
    $(document).on('click', '[name="annual_table"]', function(){
        if($(this).hasClass('checked')){
            $('[name="annual_table"]').removeClass('checked');
            $(this).prop('checked', false);
        }else{
            $('[name="annual_table"]').removeClass('checked');
            $(this).addClass('checked');
        }
    });
    
    $('input[name=smart_3_office_other]').on('change', function() {
        if($(this).prop('checked') === true) {
            $('.jsDisablewrap input').prop('disabled', true);
            $('.jsDisablewrap .js-select').prop('disabled', true).trigger('refresh');
        } else {
            $('.jsDisablewrap input').prop('disabled', false);
            $('.jsDisablewrap .js-select').prop('disabled', false).trigger('refresh');
        }
    });
    
    $('#jsEnquiryForm input[name=first_name],#jsEnquiryForm input[name=form_email],#jsEnquiryForm input[type=checkbox]').on('change', function() {
        if($('#jsEnquiryForm input[name=first_name]').val() != '' && $('#jsEnquiryForm input[name=form_email]').val() != '' && $('#jsEnquiryForm label input[name=agree_1]').prop('checked') === true && $('#jsEnquiryForm label input[name=agree_2]').prop('checked') === true && $('#jsEnquiryForm label input[name=agree_3]').prop('checked') === true) {
            $('#jsEnquiryForm button[type=submit]').removeAttr('disabled');
        } else {
            $('#jsEnquiryForm button[type=submit]').attr('disabled', true);
        }
    });
    
    $('.jsRoomsWrap .js-count-input').on('input', function() {
        if($(this).val() > 5) {
            $(this).val(5);
        }
    });
  
    $('.jsRemoveStuff').on('click', function(e) {
        e.preventDefault();
        var wrap = $(this).closest('.savvy-start__block');
        wrap.slideUp(200);
        setTimeout(function() {
            wrap.remove();
        },300);
        setTimeout(function() {
            console.log('rename');
            setNumberToStuffTitle();
        },400);
    });
    
    
    $('#jsChooseCompany').on('change', function() {
        var company_id = $(this).val();
        window.location.href = $(this).closest('form').attr('action') + '?company_id=' + company_id;
    });
    
    if($('.js-check-toggle-radio[name=capital]:checked').val() == 'Other') {
        $('.js-check-toggle-radio[name=capital]:checked').closest('.savvy-start__block-wrap').find('.js-check-toggle-item').show();
    }
    if($('.js-check-toggle-radio[name=shares]:checked').val() == 'Other') {
        $('.js-check-toggle-radio[name=shares]:checked').closest('.savvy-start__block-wrap').find('.js-check-toggle-item').show();
    }
    
    $('.jsRegName').on('input', function() {
        $(this).val($(this).val().replace(/[^A-Za-z0-9.\-_ ]/g,""));
    });
    $('.jsActivityInput').on('input', function() {
        $(this).val($(this).val().replace(/[^A-Za-z0-9.\-_ \[\],\(\)]/g,""));
    });
    $('.jsEmailInput').on('input', function() {
        $(this).val($(this).val().replace(/[^A-Za-z0-9.\-_@]/g,""));
    });
    $('.jsLatInput').on('input', function() {
        $(this).val($(this).val().replace(/[^A-Za-z,.\- ]/g,""));
    });
    $('.jsPhoneInput').on('input', function() {
        $(this).val($(this).val().replace(/[^0-9\+ ]/g,""));
    });
    
    $(".jsTextLatInput").on('input', function() {
        $(this).val($(this).val().replace(/[^A-Za-z0-9.\-_!? \[\],\(\)]/g,""));
    });
    
    // pricing
    $('.jsPricingFileCheckbox').on('change', function() {
        if($(this).prop('checked') === false) {
            $(this).closest('.jsPricingCheckboxWrap').next('.jsPricingContent').find('.js-multi-file-input').val('');
            $(this).closest('.jsPricingCheckboxWrap').next('.jsPricingContent').find('.js-file-delete').trigger('click');
        }
    });
    
    $('.jsFeedPricing').on('click', function() {       
        
        // ajax
        /*var form_arr = $('#jsPricingForm').serializeArray();
        if (window.FormData === undefined) {
    		//console.log('В вашем браузере FormData не поддерживается')
    	} else {
    		var formData = new FormData();
    		formData.append( 'action','uploadFiles');
    		
    		if($('input[name=pricing_good_109]').prop('checked') === true) {
    		    formData.append( 'service_109', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_109 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('109_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_110]').prop('checked') === true) {
    		    formData.append( 'service_110', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_110 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('110_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_388]').prop('checked') === true) {
    		    formData.append( 'service_388', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_388 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('388_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_111]').prop('checked') === true) {
    		    formData.append( 'service_111', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_111 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('111_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_112]').prop('checked') === true) {
    		    formData.append( 'service_112', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_112 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('112_files_'+ c, file);
                            c++;
                        })
                });
    		}
    	
     
    		$.ajax({
    			type: "POST",
    			url: '/send_files.php',
    			cache: false,
    			contentType: false,
    			processData: false,
    			data: formData,
    			dataType : 'json',
    			//dataType : 'html',
    			success: function(res){
    				console.log(res);
    			}
    		});
    	}*/
        // ajax
        
        var form_arr = $('#jsPricingForm').serializeArray();
        //console.log(form_arr);
        
        var str = '';
        form_arr.forEach(function(item, i, form_arr) {
            if(item.value != '') {
                str = str + '$$' + item.name + '??' + item.value;
            }
        });

        //console.log(str);
        $('.jsModalFormOptions').val(str);
        $('.jsModalFormOptionsTitle').val('setPricingOptions');
    });
    
    
    $('.jsPricingContent').hide();
    $('.jsPricingCheckbox').on('change', function() {
        if(!$(this).closest('.jsPricingGuestForm').length) {
            $(this).closest('.col').find('.jsPricingContent').slideToggle();
            setTotalPricing();
            setRowTotalPricing($(this).closest('.secretary-options__content')); 
        }
    });
    $('.jsPricingCountWrap .js-count-plus, .jsPricingCountWrap .js-count-minus').on('click', function() {
        //console.log($(this));
        $this = $(this).closest('.secretary-options__content');
        setTimeout(function() {
            setTotalPricing(); 
            setRowTotalPricing($this); 
        }, 100);
        
        if($(this).closest('.jsPricingContentDocs').length) {
            var count = parseInt($(this).siblings('.js-count-input').val());
            var uen_list = $(this).closest('.jsPricingContentDocs').find('.jsPricingDocsCompaniesList');
            var id = uen_list.data('id');
            var count_input = uen_list.find('.price__item').length;
            var item = '<div class="price__item"><div class="main-input"><input type="text" placeholder="UEN for company ' + (count_input + 1) + '" class="jsPricingDocsCompaniesInput" name="pricing_docs_company_' + id + '[]"></div></div>';
            
            if($(this).hasClass('js-count-plus')) {
                uen_list.append(item);
            } else if(parseInt($(this).siblings('.js-count-input').val()) > 1) {
                uen_list.find('.price__item:last-child').remove();
            }
        }
        
    });
    
    $('.secretary-options.price .jsSmartDirRadio:checked').prop('checked', false);
    //$('.pricing-options.price .jsSmartDirRadio:checked').prop('checked', false);
    
    $('.jsPricingCountWrap .js-count-input').on('change', function() {
        setTotalPricing(); 
        
        if($(this).closest('.jsPricingContentDocs').length) {
            var count = parseInt($(this).val());
            if(isNaN(count)) count = 1;
            //console.log(count);
            var uen_list = $(this).closest('.jsPricingContentDocs').find('.jsPricingDocsCompaniesList');
            var id = uen_list.data('id');
            var count_input = uen_list.find('.price__item').length;
            uen_list.html('');
            for(var i = 1; i <= count; i++) {
                uen_list.append('<div class="price__item"><div class="main-input"><input type="text" placeholder="UEN for company ' + i + '" class="jsPricingDocsCompaniesInput" name="pricing_docs_company_' + id + '[]"></div></div>');
            }
        }
    });
    $('.secretary-options.price .jsSmartDirRadio, .secretary-options.price .jsAnnualRadio').on('change', function() {
        $this = $(this).closest('.secretary-options__content');
        setTotalPricing(); 
        setRowRadioPricing($this);
    });
    
    $('.jsPricingCountWrap .js-count-input').on('change', function() {
        $this = $(this).closest('.secretary-options__content');
        setRowTotalPricing($this);
    });
    
    // Smart
    $('.jsSetActiveInputBtn').on('click', function(e) {
        e.preventDefault();
        $(this).closest('.savvy-start__add').find('.jsInputCheck').prop('readonly', false);
    });
    
    // pricing director radio button checked prop clear
    $('.jsPricingAuthForm .jsOptionPrice.jsSmartDirRadio').on('click', function() {
        if($(this).hasClass('checked')) {
            $(this).removeClass('checked');
            $(this).prop('checked', false);
            setTotalPricing(); 
            setRowRadioPricing($(this));
        } else {
            $('.jsSmartDirRadio').removeClass('checked');
            $(this).addClass('checked');    
            //$(this).prop('checked', true);
            //setTotalPricing(); 
            //setRowRadioPricing($(this));
        }
    });
    
    $('.jsAnnualRadio').on('click', function() {
        if(!$(this).hasClass('checked')) {
            //console.log('true');
            $('.jsAnnualInfoValue').val($(this).data('value'));
            $('.jsAnnualInfoGood').val($(this).data('id'));
            $('.jsAnnualInfoPrice').val($(this).data('price'));
        } else {
            console.log('false');
            $('.jsAnnualInfoValue').val('');
            $('.jsAnnualInfoGood').val('');
            $('.jsAnnualInfoPrice').val('');
            //$this = $(this).closest('.secretary-options__content');
            setTimeout(function() {
                getTotalPrice();     
            }, 200);
            
            //setRowRadioPricing($this);
        }
    });
    
    $('.jsSmartDirRadio').on('change', function() {
        //console.log($('.jsSmartDirRadio:checked').data('id'));
        $('.jsDirRadioGood').val($('.jsSmartDirRadio:checked').data('id'));
    });
    
    $('.jsDirNeedPassFamilyCount').on('change, input', function() {

        $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val($(this).val());
        if($(this).val() < 1) {
            $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val(1);
        }

        var dir_name = $(this).closest('.jsDirWrap').find('.jsDirNamePass').val();
        $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirName').val($(this).val() + '||' + dir_name);

        setTimeout(function() {
            getTotalPrice();    
        }, 100);
        
    });
    $('.js-count-plus, .js-count-minus').on('click', function() {

        setTimeout(function() {
            getTotalPrice();    
        }, 100);

        var dir_name = $(this).closest('.jsDirWrap').find('.jsDirNamePass').val();
        if($(this).hasClass('js-count-plus')) {
            $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val(parseInt($(this).siblings('.jsDirNeedPassFamilyCount').val()) + 1);
            
            var value = parseInt($(this).siblings('.jsDirNeedPassFamilyCount').val()) + 1;
            $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirName').val(value + '||' + dir_name);
        } 

        if($(this).hasClass('js-count-minus') && $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val() > 1) {
            $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val(parseInt($(this).siblings('.jsDirNeedPassFamilyCount').val()) - 1);
            var value = parseInt($(this).siblings('.jsDirNeedPassFamilyCount').val()) - 1;
            $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirName').val(value + '||' + dir_name);
        }        
        
    });
    
    $('.smart_reqiured').on('input', function() {
        $(this).removeClass('error');
    });
    $('.js_smart_2_reasons input[type=checkbox]').on('input', function() {
        $('.js_smart_2_reasons input[type=checkbox]').removeClass('error');
    });
    $('.js_smart_2_source input[type=checkbox]').on('input', function() {
        $('.js_smart_2_source input[type=checkbox]').removeClass('error');
    });
    
    // Secretary
    $('.jsAcraCheckbox').closest('td').find('.jq-selectbox__select').fadeOut();    
    
    $('.jsAcraRow .js-select').on('change', function() {
        $('.jsAcraConfirm').html('');
        $(this).removeClass('red');
    });
    
    $('select.jsCompanySelect').on('change', function() {
         //console.log($(this).val());
        $('.jsAcraCompanyId').val($(this).val());
        $('.jsAcraConfirm').html('');
        $('.jsCompanyNumberInput').removeClass('error_sel');
        $(this).removeClass('error_sel');
    });
    
    $('.jsFeedSecretary').on('click', function() {
        var id = $(this).data('id');
        var title = $('.jsSecretaryOptionTitle').html();
        var container = $('#options__item_' + id);
        var rows = container.find('.jsContainer .jsAcraRow');
        var total = $('.jsTotalCost').html();
        
        if(title != '' && total != 0) {
            var options = '';
            var city_flag = false;
            rows.each(function() {
                if($(this).find('.jsAcraCheckbox:checked').length) {
                    options = options + $(this).find('.jsOptionsRowTitle').text() + '%%';
                    let checkboxes = $(this).find('.jsAcraCheckbox:checked');
                    checkboxes.each(function() {
                        
                        //console.log($(this).closest('.main-checkbox').next('.js-select').find('.js-select').val());
                        
                        options = options + $(this).data('value') + ' = ' + $(this).val() +'||'
                        if($(this).closest('.main-checkbox').next('.js-select').find('.js-select').val() != undefined) {
                            
                            if($(this).closest('.main-checkbox').next('.js-select').find('.js-select').val() == 0) {
                                //console.log('City not selected');
                                $(this).closest('.main-checkbox').next('.js-select').find('.js-select').addClass('red');
                                $('.feedback-modal__close').trigger('click');
                                
                                city_flag = true;
                            } else {
                                options = options + 'Country: ' + $(this).closest('.main-checkbox').next('.js-select').find('.js-select').val() +'||';
                                
                            }
                            if(city_flag) {
                                $('.jsAcraConfirm').html('Country not selected');
                            } else {
                                $('.jsAcraConfirm').html('');
                            }
                            
                        }
                    });
                    options = options + '$$';
                }
            });
            
            $('.jsModalFormAcraEmailOptions').val('');
            if($('.jsAcraCheckbox--no_total').prop('checked') === true) {
                var add_email_options = '';
                add_email_options = 'Address: ' + $('.jsOptionsItemAcra input[name=secr_address]').val() + '||' +
                'Postcode: ' + $('.jsOptionsItemAcra input[name=secr_postcode]').val() + '||' +
                'Person: ' + $('.jsOptionsItemAcra input[name=secr_person]').val() + '||' +
                'Phone number: ' + $('.jsOptionsItemAcra input[name=secr_phone]').val();
            }
            $('.jsModalFormAcraEmailOptions').val(add_email_options);
            
            //console.log(options);
            $('.jsModalFormOptionsTitle').val(title);
            $('.jsModalFormOptions').val(options);
        }
    });
    
    $('.jsAcraCheckbox').on('change', function() {
        
        if($(this).data('idx') == 2 && $(this).prop('checked') == true) {
            $(this).closest('td').find('.jq-selectbox__select').fadeIn();
        } else {
            $(this).closest('td').find('.jq-selectbox__select').fadeOut();
        }
        
        var total = 0;
        var row = $(this).closest('.jsAcraRow').find('.jsAcraCheckbox:checked');
        var row_total = $(this).closest('.jsAcraRow').find('.jsAcraRowTotal');
        row.each(function() {
            total += parseFloat($(this).val());
        });
        row_total.html(total.toFixed(2));
        
        var total = 0;
        
        //var goods_arr = '';
        $('.jsAcraCheckbox:checked').each(function() {
            total += parseFloat($(this).val());
            // new secretary
            /*tmp_good_id = $(this).closest('.jsAcraRow').data('id');
            tmp_good_price = $(this).val();
            tmp_good_step = $(this).data('value');
            if($(this).data('value') == 'Step 3') {
                if($(this).closest('.jsAcraRow').find('.jsCityList select').val() != 0) {
                    tmp_good_city = $(this).closest('.jsAcraRow').find('.js-select').val() + '||';
                } else {
                    tmp_good_city = '';
                }
            }
            goods_arr = goods_arr + tmp_good_id + '||'+ tmp_good_step + '||'+ tmp_good_price + '&&';*/
            
        });
        $('.jsTotalCost').html(total.toFixed(2));
        //console.log(goods_arr);
        //$('.jsAcraGoods').val(goods_arr);
        // new secretary
        secretaryAcraOrderData();
        
    });
    
    $('.jsAcraRow .js-select').on('change', function() {
        secretaryAcraOrderData();
    });
    
    $('.jsCompanyNameInput').on('input', function() {
        $('.jsCompanyNameWarning').fadeOut();
    });
    
    $('.jsCompanyNameCheckBtn').on('click', function(e) {
        e.preventDefault();
        var name = $('.jsCompanyNameInput').val();
        var btn = $(this);
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'checkCompanyName',
			    search: name
			},
			beforeSend: function() {
				btn.addClass('wait').html('please, wait...');
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				console.log(response);
				btn.removeClass('wait').html('Check');
				if(response.error) {
				    $('.jsCompanyNameWarning').removeClass('green').html(response.content);
				} else {
				    $('.jsCompanyNameWarning').addClass('green').html(response.content);
				}
				$('.jsCompanyNameWarning').fadeIn();
				$('html, body').animate({
                    scrollTop: $(".jsCompanyNameInput").offset().top
                }, 600);
			}
		});
    });
    
    $('.jsClearInput').on('click', function() {
        //console.log('clear');
        $(this).closest('.savvy-start__block-col').find('input').val('');
        $(this).closest('.savvy-start__block-row').next('.search-list').find('.js-main-scroll').html('');
        $(this).hide();
    });
    
    $("input[name=main_active], input[name=add_active]").on('input', function() {
        //console.log('input');
        $(this).closest('.savvy-start__block-col').find('.jsClearInput').fadeIn();
    });
    
    $('.jsFilterInputSelect select').on('change', function() {
        //ajaxOrderFilter();
        $('.jsClearFilterWrap').fadeIn();
    });
    
    $('.jsOrderFilterBtn').on('click', function(e) {
        e.preventDefault();
        ajaxOrderFilter();
    });
    
    //datepicker
    $('.js-date').each(function(index){
        const $this = $(this);
        $this.attr('id', 'dateInstance-' + index);
        var dateItem = document.getElementById('dateInstance-' + index);
        
        //var newdate = new Date();
        new AirDatepicker(dateItem, {
            locale: {
                days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
                monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                today: 'Today',
                clear: 'Clear',
                dateFormat: 'dd.MM.yyyy',
                timeFormat: 'hh:mm aa',
                firstDay: 0
            },
           //maxDate: newdate.setDate(newdate.getDate() - 365 * 18),
            //maxDate: newdate,
            onSelect: function(dateText) {
                //ajaxOrderFilter();
                $('.jsClearFilterWrap').fadeIn();
            }
        });
    })
    
    $('.jsClearFilterBtn').on('click', function(e) {
        e.preventDefault();
        $('.jsOrderFrom, .jsOrderTo').val('');
        //$('#dateInstance-0').clear();
        
        //datepicker
        $('.js-date').each(function(index){
            const $this = $(this);
            $this.attr('id', 'dateInstance-' + index);
            var dateItem = document.getElementById('dateInstance-' + index);
            
            //var newdate = new Date();
            new AirDatepicker(dateItem, {
                locale: {
                    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                    months: ['January','February','March','April','May','June', 'July','August','September','October','November','December'],
                    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    today: 'Today',
                    clear: 'Clear',
                    dateFormat: 'dd.MM.yyyy',
                    timeFormat: 'hh:mm aa',
                    firstDay: 0
                },
               //maxDate: newdate.setDate(newdate.getDate() - 365 * 18),
                //maxDate: newdate,
                onSelect: function(dateText) {
                    //ajaxOrderFilter();
                    $('.jsClearFilterWrap').fadeIn();
                }
            });
        })
        
        $('.jsFilterInputSelect select').val('0');  
        setTimeout(function() {
			$('.jsFilterInputSelect select').trigger('refresh');
		}, 10);
		setTimeout(function() {
            $('.jsClearFilterWrap').fadeOut();
		}, 300);
        setTimeout(function() {
            ajaxOrderFilter();
        }, 200);
    });
    

    
    $('.js-file-delete').on('click', function() {
        $(this).closest('.main-file__row').find('.input_error').html('').removeClass('error');
    });
    
	$('body').on('click', '.password-control', function(){
	    var input = $(this).prev('input');
    	if (input.attr('type') == 'password'){
    		$(this).addClass('view');
    		input.attr('type', 'text');
    	} else {
    		$(this).removeClass('view');
    		input.attr('type', 'password');
    	}
    	return false;
    });
    
    getTotalPrice();
    
    $('.jsOptionPrice').on('change', function() {
        $(this).closest('.savvy-start-options__item:not(".jsSLide67")').find('.savvy-start-options__content').slideDown();       
        $(this).closest('.savvy-start-options__item').siblings('.savvy-start-options__item').find('.savvy-start-options__content').slideUp();
        getTotalPrice();
    });
    
    $('.jsAddActivityBtn').on('click', function(e) {
        e.preventDefault();
        $('.jsCheckAddActive').val('1');
        $('.jsAddBuisnessActivityWrapHide').fadeOut(100);
        setTimeout(function() {
            $('.jsAddBuisnessActivityWrap').addClass('open').slideDown();
        }, 300);
        
    });
    
    $('.jsAddActivityBtnHide').on('click', function(e) {
        e.preventDefault();
        $('.jsCheckAddActive').val('');
        setTimeout(function() {
            $('.jsAddBuisnessActivityWrapHide').fadeIn(100);
        }, 500);
        setTimeout(function() {
            $('.jsAddBuisnessActivityWrap').removeClass('open').slideUp();
        }, 100);
        
    });
    
    $('.jsActiveListSearchBtn').on('click', function(e) {
        e.preventDefault();
        
        $('.jsCompanyActive').removeClass('error');
        $(this).closest('.savvy-start__block-col').find('.error_main_active').html('');
        
        var text = $('.jsCompanyActive').val();
        //console.log(text);
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'searchActionList',
			    search: text
			},
			beforeSend: function() {
				//
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
			    if(response.error != '') {
				    //console.log(response);
				    $('.jsCompanyActiveList').html(response.error);
			    } else {
			        //console.log(response.content);
			        $('.jsCompanyActiveList').html(response.content);
			    }
			    $('.jsSearchListItem').on('click', function(e) {
                    e.preventDefault();
                    $(this).siblings('.jsSearchListItem').removeClass('select');
                    $(this).addClass('select');
                    $('.jsCompanyActive').val($(this).html());
                });
			}
		});
    });
    $('.jsActiveListSearchBtnAdd').on('click', function(e) {
        e.preventDefault();
        var text = $('.jsCompanyActiveAdd').val();
        //console.log(text);
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'searchActionList',
			    search: text
			},
			beforeSend: function() {
				//
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
			    if(response.error != '') {
				    console.log(response);
				    $('.jsCompanyActiveListAdd').html(response.error);
			    } else {
			        //console.log(response.content);
			        $('.jsCompanyActiveListAdd').html(response.content);
			    }
			    $('.jsSearchListItem').on('click', function(e) {
                    e.preventDefault();
                    $(this).siblings('.jsSearchListItem').removeClass('select');
                    $(this).addClass('select');
                    $('.jsCompanyActiveAdd').val($(this).html());
                });
			}
		});
    });
    
    $('.jsSearchListItem').on('click', function(e) {
        e.preventDefault();
        $('.jsCompanyActive').val($(this).html());
    });
    
    $('.jsStepNextSavvyStart').on('click', function() {
        var form_data = $('.jsFormSavvyStart').serialize();
        //console.log(form_data);
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'addUserDataSavvyStart',
			    formData: form_data
			},
			beforeSend: function() {
				//
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
			    if(response.error != '') {
				    console.log(response.error);
			    } else {
			        //console.log(response.content);
			    }
			}
		});
    });

    $('.jsStepNextSavvySmart').on('click', function() {
        var form_data = $('.savvy_smart_form_auth').serialize();
        //console.log(form_data);
        $.ajax({
            type: 'POST',
            url: document.location.href,
            dataType: 'json',
            cache: false,
            data: {
                action:'addUserDataSavvySmart',
                formData: form_data
            },
            beforeSend: function() {
                //
            },
            error: function(jqXHR, textStatus, errorThrown){
                console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
            },
            success: function(response, textStatus, jqXHR) {
                if(response.error != '') {
                    console.log(response.error);
                } else {
                    //console.log(response.content);
                }
            }
        });
    });
    
    $('.jsOldNoticeClose').on('click', function() {
        $.ajax({
			type: 'POST',
			url: document.location.href,
			dataType: 'json',
			cache: false,
			data: {
			    action:'setCookieOldConfirm'
			},
			beforeSend: function() {
				//
			},
			error: function(jqXHR, textStatus, errorThrown){
				console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
			},
			success: function(response, textStatus, jqXHR) {
				console.log(response);
				if(response.error == '' && response.content == 'Confirm done') {
				    $('.jsSavvyStartNotice').slideUp();
				}
			}
		});
    });
});

$(document).on('af_complete', function(event, response) {
    var form = response.form;
    var data = response.data;
    response.message = '';
    //console.log(response);   
    
    if(form.attr('id') == 'enquiries-add-form' && response.success === true) {
        setTimeout(function() {
            form.find('.get_success_wrap').trigger('click');
        }, 200);
        setTimeout(function() {
            $('#success-modal .feedback-modal__close').trigger('click');
        }, 2000);
        setTimeout(function() {
            window.location.href = form.attr('action');
        }, 2100);   
    }
    
    if(form.attr('id') == 'enquiries-form' && response.success === true) {
        console.log(response.data.new_ticket_id);   
        setTimeout(function() {
            form.find('.get_success_wrap').trigger('click');
        }, 200);
        setTimeout(function() {
            $('#success-modal .feedback-modal__close').trigger('click');
        }, 2000);
        if(response.data.new_ticket_id !== undefined) {
            let link = form.attr('action') + '?ticket_id=' + response.data.new_ticket_id;
            setTimeout(function() {
                window.location.href = link;
            }, 2100);   
        } else {
            setTimeout(function() {
                window.location.href = form.data('url');
            }, 2100);  
        }
    }
    
    if(form.hasClass('jsFormAuthSubmit')) {
        if(response.success === true) {
            form.find('.jsSecrConfirmOrder').html('');
            form.find('.jsCourierDropForm').slideUp();
        } else {
            if(response.data.files != '') {
                form.find('.jsSecrConfirmOrder').html(response.data.files);
            } else {
                form.find('.jsSecrConfirmOrder').html('Please, check and fill up ALL required fields');
            }
        }
    }
    
    // deposit form
    if(form.attr('id') == 'deposit_order_form') {
        if(response.success === true) {
            setTimeout(function() {
                form.find('.js-select').trigger('refresh');    
            }, 500);
            setTimeout(function() {
                form.find('.get_success_wrap').trigger('click');
            }, 300);
            setTimeout(function() {
                $('#success-modal-files .feedback-modal__close').trigger('click');
            }, 3000);
        } else {
            form.find('.jsFileformError').html(response.data);
        }
    }
    
    if(form.hasClass('file_form')) {
        if(response.success === true) {
            form.find('.jsFileformError').html('');
            form.find('.js-file-delete').trigger('click');
            setTimeout(function() {
                form.find('.js-select').trigger('refresh');    
            }, 500);
            setTimeout(function() {
                form.find('.get_success_wrap').trigger('click');
            }, 300);
            setTimeout(function() {
                $('#success-modal-files .feedback-modal__close').trigger('click');
            }, 3000);
        } else {
            form.find('.jsFileformError').html(response.data.files);
        }
        $('.jsFormSubmit').html('Place order');
    }
    
    
    if (form.attr('id') == 'companies_stuff_files_add' && response.success === true) {
        setTimeout(function() {
            window.location.href = form.attr('action');    
        }, 2000);
    }
    
    if (form.attr('id') == 'secretaryAcraOrderForm') {
        if(response.success === false) {
            console.log(response.data.account_profile);
            response.message = '';
            if(response.data.account_profile === undefined) { // проверка на ошибку внутреннего баланса
                $('.jsAcraConfirmOrder').html('No service is selected');
            }
        } else {
            if($('.jsPayType:checked').val() == 3) {
                $('.jsAcraConfirmOrder').html('<span style="color:green">The order has been successfully placed... An invoice for payment has been sent to your email. Also you can download the invoice in your personal account</span>');
            } else {
                $('.jsAcraConfirmOrder').html('<span style="color:green">The order has been successfully placed.</span>');
            }
            /*setTimeout(function() {
                window.location.href = form.attr('action');    
            }, 2000);*/
        }
    }
    
    // редирект Savvy Start
    if (form.attr('id') == 'savvyStartFrom' && response.success === true) {
        //console.log(response);
        
        $('.jsCompanyActive').val('');
        $('.jsCompanyActiveAdd').val('');
        $('.jsCompanyActiveList').html('');
        $('.jsCompanyActiveListAdd').html('');
        
        
        if(form.find('.jsPayType:checked').val() == 3) {
            $('.jsStartConfirmOrder').html('<span style="color:green">The order has been successfully placed. An invoice for payment has been sent to your email. Also you can download the invoice in your personal account</span>');
        } else {
            $('.jsStartConfirmOrder').html('<span style="color:green">The order has been successfully placed.</span>');
        }
        
        if(response.data.redirect !== undefined && (form.find('.jsPayType:checked').val() == 2 || form.find('.jsPayType:checked').val() == 6)) {
            window.location.href = response.data.redirect;
        } /*else if (response.data.redirect === undefined) {
            
            setTimeout(function() {
                window.location.href = form.attr('action');    
            }, 3000);
            
        }*/
        
        
        
    } else if(form.attr('id') == 'savvyStartFrom' && response.success === false) {
        console.log(response);
    }
    
    // редирект Pricing
    if (form.attr('id') == 'jsPricingForm' && response.success === true) {
        
        //console.log(response);
        
        if(form.find('.jsPayType:checked').val() == 3) {
            $('.jsStartConfirmOrder').html('<span style="color:green">The order has been successfully placed. An invoice for payment has been sent to your email. Also you can download the invoice in your personal account</span>');
        } else {
            $('.jsStartConfirmOrder').html('<span style="color:green">The order has been successfully placed.</span>');
        }
        
        if(response.data.redirect !== undefined && (form.find('.jsPayType:checked').val() == 2 || form.find('.jsPayType:checked').val() == 6)) {
            window.location.href = response.data.redirect;
        }
    } else if(form.attr('id') == 'jsPricingForm' && response.success === false) {
        //console.log(response);
    }
    
    //  редирект Savvy Secretary при создании заказа
    if (form.attr('id') == 'secretaryAcraOrderForm' && response.success === true) {
        
        if(form.find('.jsPayType:checked').val() == 3) {
            $('.jsAcraConfirmOrder').html('<span style="color:green">The order has been successfully placed.. An invoice for payment has been sent to your email. Also you can download the invoice in your personal account</span>');
        } else {
            $('.jsAcraConfirmOrder').html('<span style="color:green">The order has been successfully placed.</span>');
        }
        
        //console.log($('.jsPayType:checked').val());
        //console.log(response.data.redirect);
        if(response.data.redirect !== undefined && (form.find('.jsPayType:checked').val() == 2 || form.find('.jsPayType:checked').val() == 6)) {
            //console.log('get redirect');
            window.location.href = response.data.redirect;
        }
        $('.jsAcraCheckbox:checked').prop('checked', false).closest('td').find('.jq-selectbox__select').fadeOut();
    } else if(form.attr('id') == 'secretaryAcraOrderForm' && response.success === false) {
        //
    }
    
    if (form.hasClass('jsFormAuthSubmit') && response.success === true) {
        
        if(form.find('.jsPayType:checked').val() == 3) {
            $('.jsSecrConfirmOrder').html('<span style="color:green">The order has been successfully placed. An invoice for payment has been sent to your email. Also you can download the invoice in your personal account</span>');
        } else {
            $('.jsSecrConfirmOrder').html('<span style="color:green">The order has been successfully placed.</span>');
        }
        
        if(response.data.redirect !== undefined && (form.find('.jsPayType:checked').val() == 2 || form.find('.jsPayType:checked').val() == 6)) {
            window.location.href = response.data.redirect;
        }
        
        if(response.data.redirect !== undefined && form.find('.jsPayType:checked').val() == 6) {
            window.location.href = response.data.redirect;
        }
        
    } else if(form.hasClass('jsFormAuthSubmit') && response.success === false) {
        //
    }
    
    if ((form.attr('id') == 'jsModalForm' || form.attr('id') == 'jsModalFormFile') && response.success === true) {
        setTimeout(function() {
            $('.feedback-modal__close').trigger('click');
        }, 200);
        setTimeout(function() {
            form.find('.get_success_wrap').trigger('click');
        }, 500);
        setTimeout(function() {
            $('#success-modal .feedback-modal__close').trigger('click');
        }, 3000);

        if(form.attr('id') == 'jsModalFormFile') {
            form.find('.savvy-start__add-item span').html('');
            form.find('.js-file-name').hide();
        }
        setTimeout(function() {
            if(form.hasClass('feedback-modal__form')) {
                document.location.reload();
            }
        }, 2000);

        $('.jsModalFormOptionsTitle').val('');
        $('.jsModalFormOptions').val('');
    } else if (response.success === false && form.attr('id') == 'jsModalFormFile') {
        form.find('.jsAccountFilesConfirmError').html(response.data.pay_file);
    }
    
    if(form.attr('id') == 'jsModalForm' && response.success === true && form.hasClass('pricing_form_wrap')) {
        // ajax
        var form_arr = $('#jsPricingForm').serializeArray();
        if (window.FormData === undefined) {
    		//console.log('В вашем браузере FormData не поддерживается')
    	} else {
    		var formData = new FormData();
    		formData.append( 'action','uploadFiles');
    		
    		if($('input[name=pricing_good_109]').prop('checked') === true) {
    		    formData.append( 'service_109', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_109 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('109_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_110]').prop('checked') === true) {
    		    formData.append( 'service_110', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_110 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('110_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_388]').prop('checked') === true) {
    		    formData.append( 'service_388', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_388 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('388_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_111]').prop('checked') === true) {
    		    formData.append( 'service_111', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_111 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('111_files_'+ c, file);
                            c++;
                        })
                });
    		}
    		if($('input[name=pricing_good_112]').prop('checked') === true) {
    		    formData.append( 'service_112', 1);
    		    var c = 0;
        		$.each($(".jsCloneFile_112 .jsFile"), function(i, obj) {
        		        //console.log(obj.files);
                        $.each(obj.files,function(j, file){
                            formData.append('112_files_'+ c, file);
                            c++;
                        })
                });
    		}
    	
     
    		$.ajax({
    			type: "POST",
    			url: '/send_files.php',
    			cache: false,
    			contentType: false,
    			processData: false,
    			data: formData,
    			dataType : 'json',
    			//dataType : 'html',
    			success: function(res){
    				console.log(res);
    				setTimeout(function() {
    				    window.location.href = form.attr('action');
    				}, 4000);
    			}
    		});
    	}
        // ajax
    }
    
    if (form.attr('id') == 'jsEnquiryForm' && response.success === true) {
        setTimeout(function() {
            form.find('.get_success_wrap').trigger('click');
        }, 200);
        setTimeout(function() {
            $('#success-modal .feedback-modal__close').trigger('click');
        }, 3000);
        $('.jsModalFormOptionsTitle').val('');
        $('.jsModalFormOptions').val('');
        
        gtag_report_conversion();
    }
    
    if (form.attr('id') == 'savvy_start_form_step_3' && response.success === true) {
        $('.js-file-name').fadeOut();
        $('.savvy-start__add-item span').html('');
        $('.jsFormSubmit').html('Success submit').addClass('success');
        setTimeout(function() {
            $('.jsFormSubmit').html('Save and Confirm').removeClass('success');
            window.location.href = form.attr('action');
        }, 2000);
    } else if(form.attr('id') == 'savvy_start_form_step_3' && response.success === false) {
        $('.jsFormSubmit').html('Save and Confirm');
    }
    
    if (form.attr('id') == 'savvy_smart_form' && response.success === false) {
        response.message = '';
    }
    
    if (form.hasClass('savvy_smart_form_auth') && response.success === true) {
        
        /*if(form.find('.jsPayType:checked').val() == 3) {
            $('.jsSecrConfirmOrder').html('<span style="color:green">The order has been successfully placed. An invoice for payment has been sent to your email. Also you can download the invoice in your personal account</span>');
        } else {
            $('.jsSecrConfirmOrder').html('<span style="color:green">The order has been successfully placed.</span>');
        }*/
        
        //console.log(response.data.redirect);
        if(response.data.redirect !== undefined && (form.find('.jsPayType:checked').val() == 2 || form.find('.jsPayType:checked').val() == 6)) {
            //console.log('get redirect');
            window.location.href = response.data.redirect;
        }
    } else if(form.hasClass('jsFormAuthSubmit') && response.success === false) {
        //
    }
    
    if (form.attr('id') == 'savvy_smart_form' && response.success === true) {
        $('.jsStepSkip').remove();
        setTimeout(function() {
            form.find('.get_success_wrap').trigger('click');
        }, 200);
        setTimeout(function() {
            $('#success-modal .feedback-modal__close').trigger('click');
        }, 4000);
        setTimeout(function() {
            //window.location.href = form.attr('action');
        }, 4100);
    }
    if (form.attr('id') == 'jsPricingForm' && response.success === true) {
        setTimeout(function() {
            form.find('.get_success_wrap').trigger('click');
        }, 200);
        setTimeout(function() {
            $('#success-modal .feedback-modal__close').trigger('click');
        }, 4000);
        setTimeout(function() {
            window.location.href = form.attr('action');
        }, 4100);
    }
});

function ajaxOrderFilter() {
    $('.jsClearFilterWrap').fadeIn();
    var status = $('.jsFilterInputSelect select').val();
    var from = $('.jsOrderFrom').val();
    var to = $('.jsOrderTo').val();
    if($('.jsAccountPricing').length) {
        var pricing = 1;
    } else {
        var pricing = 0;
    }
    /*console.log(status);
    console.log(from);
    console.log(to);*/
    if(to < from && to != '') {
        console.log('Check that the date is entered correctly');
        $('.jsOrderFrom, .jsOrderTo').addClass('color_red');
        $('.jsFilterWarningWrap').fadeIn();
        return;
    } else {
        $('.jsOrderFrom, .jsOrderTo').removeClass('color_red');
        $('.jsFilterWarningWrap').fadeOut();
    }
    $.ajax({
		type: 'POST',
		url: document.location.href,
		dataType: 'json',
		cache: false,
		data: {
		    action: 'filterOrdersList',
		    status: status,
		    from: from,
		    to: to,
		    pricing: pricing
		},
		beforeSend: function() {
			//
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log('ОШИБКИ AJAX запроса: ' + textStatus + jqXHR + errorThrown);
		},
		success: function(response, textStatus, jqXHR) {
			//console.log(response);
			$('.jsAjaxOrdersWrap').html(response.content);
			$('.jsAjaxOrdersCount').html(response.count);
		}
	});
}


function setRowRadioPricing(cont) {
    var container = cont;
    
    var category_coll = container.find('.jsOptionPrice:checked');
    var total = 0;
    if(category_coll.length > 0) {
        category_coll.each(function() {
            if($(this).hasClass('jsSmartDirRadio')) {
                total += parseFloat($(this).data('price'));
            } else {
                total += parseFloat($(this).val());
            }
        });
    }
    if(total == 0) {
        container.closest('.secretary-options__content').find('.jsPricingRowTotal').html(total.toFixed(2));   
    } else {
        container.find('.jsPricingRowTotal').html(total.toFixed(2));   
    }
}

function setRowTotalPricing(cont) {
    var container = cont;
    var category_coll = container.find('.jsPricingCheckbox:checked');
    var total = 0;
    category_coll.each(function() {
        if($(this).closest('.jsPricingCheckboxWrap').next('.jsPricingContent').find('.js-count-input').length) {
            total += parseFloat($(this).val()) * parseInt($(this).closest('.jsPricingCheckboxWrap').next('.jsPricingContent').find('.js-count-input').val());
        } else {
            total += parseFloat($(this).val());
        }
    });
    container.find('.jsPricingRowTotal').html(total.toFixed(2));
}

function setTotalPricing() {
    var container = $('.secretary-options__list');
    var category_coll = container.find('.jsPricingCheckbox:checked');
    //console.log(category_coll);
    var total = 0;
    category_coll.each(function() {
        //console.log($(this).closest('.jsPricingCheckboxWrap').next('.jsPricingContent').find('.js-count-input').val());
        if($(this).closest('.jsPricingCheckboxWrap').next('.jsPricingContent').find('.js-count-input').length) {
            total += parseFloat($(this).val()) * parseInt($(this).closest('.jsPricingCheckboxWrap').next('.jsPricingContent').find('.js-count-input').val());
        } else {
            total += parseFloat($(this).val());
        }
    });
    
    if($('.secretary-options.price:not(.pricing-options) .jsSmartDirRadio:checked').length){
        total += parseFloat($('.secretary-options.price .jsSmartDirRadio:checked').val());
    }
    
    if($('.pricing-options.price .jsSmartDirRadio:checked').length){
        total += parseFloat($('.secretary-options.price .jsSmartDirRadio:checked').data('price'));
    }
    
    if($('.secretary-options.price .jsAnnualRadio:checked').length){
        total += parseFloat($('.secretary-options.price .jsAnnualRadio:checked').val());
    }
    
    
    $('.jsTotalCost').html(total.toFixed(2));
}

function getTotalPrice () {
    if($('.secretary-options.price').length) return false;
    var prices_coll = $('.jsOptionPrice:checked');
    //console.log(prices_coll);
    var summ = 0;
    prices_coll.each(function() {
        if($(this).hasClass('smart_dir_need_pass_family')) {
            var item_count = $(this).closest('.savvy-start__block-row').next('.js-check-toggle-item').find('.jsDirNeedPassFamilyCount').val();
            //console.log(item_count);
            summ += parseFloat($(this).data('price')) * parseFloat(item_count);
        } else {
            summ += parseFloat($(this).data('price'));
        }
    });
    $('.jsTotalCost').html(summ.toFixed(2));
    $('.jsTotalCostInput').val(summ.toFixed(2));
}

function setNumberToStuffTitle() {
    //console.log('remove');
    var arr = ['.jsDirWrap', '.jsShWrap'];
    var arr_title = ['Director ', 'Shareholder '];
    arr.forEach(function(item, i, arr) {
        var dirs = $(item);
        var title = arr_title[i];
        if(dirs.length > 1) {
            dirs.each(function(index, value) {
                $(this).find('.jsStuffTitle').text(title + (index + 1));
                if(index == dirs.length - 1 && index < 3) {
                    $(this).find('.savvy-start__spec-btn').show();
                }
            });
            setTimeout(function() {
                $(this).find('.js-number-shares').removeClass('hide-shares');    
                $(this).find('.jsNumberOfSharesWrap').addClass('show_block');    
            }, 200);
            
        } else {
            dirs.each(function(index, value) {
                $(this).find('.jsStuffTitle').text(title);
                $(this).find('.savvy-start__spec-btn').show();
               // $(this).find('.js-number-shares').hide();
                $(this).find('.js-number-shares').addClass('hide-shares'); 
                $(this).find('.jsNumberOfSharesWrap').removeClass('show_block');    
            });
        }
    });
}

function secretaryAcraOrderData() {
    if(!$('.jsOptionsItemAcra').hasClass('jsOptionsItemAcraWeb')) return;
    
    var goods_arr = '';
    var goods_arr_order = '';
    $('.jsAcraCheckbox:checked').each(function() {
        tmp_good_city = '';
        tmp_good_id = $(this).closest('.jsAcraRow').data('id');
        tmp_good_price = $(this).val();
        tmp_good_price_order = $(this).data('order');
        tmp_good_step = $(this).data('value');
        if($(this).data('value') == 'Step 3') {
            if($(this).closest('.jsAcraRow').find('select').val() != 0) {
                tmp_good_city = $(this).closest('.jsAcraRow').find('select').val();
            }
        }
        if(!$(this).hasClass('jsAcraCheckbox--no_total')) {
            if(tmp_good_city != '') {
                goods_arr = goods_arr + tmp_good_id + '||'+ tmp_good_step + '||'+ tmp_good_price + '||'+ tmp_good_city + '&&';
                goods_arr_order = goods_arr_order + tmp_good_id + '||'+ tmp_good_step + '||'+ tmp_good_price_order + '||'+ tmp_good_city + '&&';
            } else {
                goods_arr = goods_arr + tmp_good_id + '||'+ tmp_good_step + '||'+ tmp_good_price + '&&';
                goods_arr_order = goods_arr_order + tmp_good_id + '||'+ tmp_good_step + '||'+ tmp_good_price_order + '&&';
            }
        }
        
    });
    $('.jsAcraGoods').val(goods_arr);
    $('.jsAcraGoodsOrder').val(goods_arr_order);
}

function gtag_report_conversion(url) {
    console.log('gtag_report_conversion');
  var callback = function () {
    if (typeof(url) != 'undefined') {
      window.location = url;
    }
  };
  gtag('event', 'conversion', {
      'send_to': 'AW-10860407325/g2rSCJqxwKkDEJ3U0roo',
      'event_callback': callback
  });
  return false;
}