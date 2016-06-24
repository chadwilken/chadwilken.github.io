jQuery(document).ready(function(){

    var hideForm = function(){
        $('#contact').fadeTo(500,0,function(){
            $(this).hide(0);
            showThanks();
        });
    }

    var showThanks = function(){
        $('.thank-you').css('opacity', 0).show(0).fadeTo(500, 1).removeClass('hidden');
    }

    var showErrors = function(errors){
        var $form = $('#contact');
        for(var error in errors){
            if(error != "message"){
                $form.find('input[name=' + error + ']').addClass('error');
            }else{
                $form.find('textarea[name=' + error + ']').addClass('error');
            }
        }
        $form.find('.actions input').prop('disabled', false).val('Try Again');
    };

    $('#contact').submit(function(ev){
        ev.preventDefault();

        var $this = $(this);
        $this.find('.actions input').prop('disabled', true).text('Sending...');
        var url = $this.attr('action');
        var data = $this.serialize();
        $this.find('.error').removeClass('error');
        
        $.ajax({
            url: url,
            method: "POST",
            data: data,
            dataType: "json"
        })
        .error(function(response){
            if(response.responseText){
                showErrors($.parseJSON(response.responseText));
            }
        }).success(function(xhr){
            if(!xhr.error){
                hideForm();
            }
        });
        return false;
    });
});