jQuery(document).ready(function($){
    var masthead = $('#masthead'), win = $(window);

    if(win.outerWidth() > 1024){
        masthead.backstretch('images/headshot@2x.jpg');
    }

    win.on('resize', function(){
        if(win.outerWidth() <= 1024){
            $('.backstretch').remove();
            masthead.attr('style', '');
        }else{
            if(!$('.backstretch').length){
                masthead.backstretch('images/headshot@2x.jpg');
            }
        }
    });
});