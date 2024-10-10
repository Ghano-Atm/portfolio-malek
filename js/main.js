(function ($) {
    "use strict";
    
    // Smooth scrolling on the navbar links
    $(".navbar-nav a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            
            $('html, body').animate({
                scrollTop: $(this.hash).offset().top - 30
            }, 1500, 'easeInOutExpo');
            
            if ($(this).parents('.navbar-nav').length) {
                $('.navbar-nav .active').removeClass('active');
                $(this).closest('a').addClass('active');
            }
        }
    });
    

    // Typed Initiate
    if ($('.header h2').length == 1) {
        var typed_strings = $('.header .typed-text').text();
        var typed = new Typed('.header h2', {
            strings: typed_strings.split(', '),
            typeSpeed: 100,
            backSpeed: 20,
            smartBackspace: false,
            loop: true
        });
    }
    
    
    // Skills
    $('.skills').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});
    
    
    // Porfolio isotope and filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
        $("#portfolio-flters li").removeClass('filter-active');
        $(this).addClass('filter-active');

        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Review slider
    $('.review-slider').slick({
        autoplay: true,
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
})(jQuery);


function send_mail() {
  
    if (document.querySelector("#name").value != "" && document.querySelector("#email").value != "" && document.querySelector("#subject").value != "" && document.querySelector("#message").value != "") {
       
        if (document.querySelector("#email").value.indexOf("@")==-1) {

            document.querySelector("#alert").innerHTML = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-triangle"></i>&nbsp&nbsp&nbspEmail non valide</div>'
    
        } else {

            document.querySelector("#btn_send").setAttribute("disabled","''")
            document.querySelector("#btn_send").innerHTML += '<div style= "margin-left : 10px;" class="spinner-border spinner-border-sm loading" role="status"><span class="visually-hidden"></span> </div>'

            var params = {

                name : document.querySelector("#name").value,
                email : document.querySelector("#email").value,
                subject : document.querySelector("#subject").value,
                message : document.querySelector("#message").value
        
            }
        
            const server_id = "service_xon648l";
            const template_id = "template_nmsihuh";
        
            emailjs.send(server_id,template_id,params)
            .then ( res => {
        
                document.querySelector("#name").value = "";
                document.querySelector("#email").value = "";
                document.querySelector("#subject").value = "";
                document.querySelector("#message").value = "";
                console.log(res)
                document.querySelector("#alert").innerHTML = '<div class="alert alert-success" role="alert"><i class="fa fa-check"></i>&nbsp&nbsp&nbspVotre email a bien été transmis.</div>'
                document.querySelector(".loading").remove()
                document.querySelector("#btn_send").removeAttribute("disabled")
                
            })
            .catch(err=>{
                
                console.log(err); 
                document.querySelector("#alert").innerHTML = '<div class="alert alert-danger" role="alert"><i class="fa fa-exclamation-triangle"></i>&nbsp&nbsp&nbspErreur d"envoie de l"email</div>'
                document.querySelector(".loading").remove()
                document.querySelector("#btn_send").removeAttribute("disabled")

            })
        }
        

    } else {document.querySelector("#alert").innerHTML = '<div class="alert alert-primary" role="alert"><i class="fa fa-info-circle"></i>&nbsp&nbsp&nbspVeuillez entrez vos informations.</div>'}   

}


document.querySelector("#btn_send").addEventListener("click",send_mail)