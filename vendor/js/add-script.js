$(document).ready(function () {
    
    //clone
    var $dir_clone_i = 0;
    $(document).on('click', '.js-clone-smart', function(){
        var cloneThis = $(this).closest('.savvy-start__block')
        var cloneBlock = $(this).closest('.savvy-start__block').clone();
        
        console.log('add clone');
        
        $dir_clone_i++;
        
        cloneBlock.find('.jsRemoveStuff').fadeIn();
        
        cloneThis.find('.savvy-start__spec-btn').hide();
        cloneBlock.find('input[type=text], textarea').val('');
        cloneBlock.find('input[type=checkbox]').prop('checked', false);
        cloneBlock.find('.jq-selectbox__select').remove();
        //cloneBlock.find('select').styler();
        
        cloneBlock.find('select').styler({
            selectPlaceholder: 'Choose Nationality...',
            selectSearch: true,
    		selectSearchNotFound: 'No matches found',
    		selectSearchPlaceholder: 'Search...',
        });
        
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
        
        if($dir_clone_i > 9) {
        	cloneBlock.find('.savvy-start__spec-btn').hide();
        }
        
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
                    dateFormat: 'MM.dd.yyyy',
                    timeFormat: 'hh:mm aa',
                    firstDay: 0
                },
                //maxDate: newdate.setDate(newdate.getDate() - 365 * 18),
                //maxDate: newdate,
            });
        })
        //cloneBlock.find('.js-select-scroll').each(function(){
            /*new PerfectScrollbar(this, {
                wheelSpeed: 0.2,
                wheelPropagation: false
            });*/
        //});
        
        $('.jsOptionPrice').on('change', function() {
            getTotalPrice();
        });

        cloneBlock.find('.jsDirNamePass').on('change', function() {
            $(this).closest('.jsDirWrap').find('.jsNeedDirPass').val($(this).val());            
            $(this).closest('.jsDirWrap').find('.jsNeedDirPassFamily').val($(this).val());
            $(this).closest('.jsDirWrap').find('.jsHideDirName').val($(this).val());
            $(this).closest('.jsDirWrap').find('.jsHideFamilyDirName').val($(this).val());
            //$(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirName').val($(this).val());

            var count = $(this).closest('.jsDirWrap').find('.jsDirNeedPassFamilyCount').val();
            $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirName').val(count + '||' + $(this).val());
        });

        cloneBlock.find('.jsHideFamilyCountDirValue').val(1);

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

            /*if($(this).hasClass('js-count-plus')) {
                $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val(parseInt($(this).siblings('.jsDirNeedPassFamilyCount').val()) + 1);
            } 
            if($(this).hasClass('js-count-minus') && $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val() > 1) {
                $(this).closest('.jsDirWrap').find('.jsHideFamilyCountDirValue').val(parseInt($(this).siblings('.jsDirNeedPassFamilyCount').val()) - 1);
            } */  
        });
        
        $('.jsRemoveStuff').on('click', function(e) {
            e.preventDefault();
            var wrap = $(this).closest('.savvy-start__block');
            wrap.slideUp(200);
            setTimeout(function() {
                wrap.remove();
                setNumberToStuffTitle();
            },300);
        });
        
        $('.jsLatInput').on('input', function() {
            $(this).val($(this).val().replace(/[^A-Za-z,.\- ]/g,""));
        });
        $('.jsPhoneInput').on('input', function() {
            $(this).val($(this).val().replace(/[^0-9\+ ]/g,""));
        });
        
        setNumberToStuffTitle();
        
        $('body').stop().animate({scrollTop: cloneBlock.offset().top - $('.header').innerHeight() - 80}, 500);
        $('html').stop().animate({scrollTop: cloneBlock.offset().top - $('.header').innerHeight() - 80}, 500);
        return false;
    })

    $(document).on('change', '.savvy-start__slider input[type="radio"]', function(){
        var radioName = $(this).attr('name');
        $('input[name="' + radioName + '"]').each(function(){
            if($(this).hasClass('js-check-toggle-radio') && !$(this).is(':checked')){
                $(this).closest('.savvy-start__check-wrap').find('.js-check-toggle-item').hide();
            }
        })
    })
    
    $(document).on('change', '.js-s-3-radio', function(){
        if($(this).hasClass('js-s-3-radio-show') && $(this).is(':checked')){
            $('.js-s-3-block').show();
        }else{
            $('.js-s-3-block').hide();
        }
    })
})

function getTotalPrice () {
    var prices_coll = $('.jsOptionPrice:checked');
    //console.log(prices_coll);
    var summ = 0;
    prices_coll.each(function() {
        if($(this).hasClass('smart_dir_need_pass_family')) {
            var item_count = $(this).closest('.savvy-start__block-row').next('.js-check-toggle-item').find('.jsDirNeedPassFamilyCount').val();
            console.log(item_count);
            summ += parseFloat($(this).data('price')) * parseFloat(item_count);
        } else {
            summ += parseFloat($(this).data('price'));
        }
    });
    $('.jsTotalCost').html(summ);
}