$(document).ready(function(){
    $('[data-toggle="popover"]').popover({
        container: 'body',
        content: $(".contact__form")
    });  
    $(".pt-card a.card-link").click(function(e){
        $('.pt-card').removeClass('opened');
        if($(this).hasClass('collapsed')){
            $(this).parents('.pt-card').addClass('opened');
        } else {
            $(this).parents('.pt-card').removeClass('opened');
        }
    }); 
    $(".pt-image .middle").click(function(e){
        e.stopPropagation();
        openModal();
        currentSlide(1);
    })
    $(".pt-topbar .map-maker").click(function(e){
        e.stopPropagation();
        $('#map_modal').modal('toggle');
    })
});

var form = $('.contact__form'),
message = $('.contact__msg'),
form_data;
// Success function
function done_func(response) {
    message.fadeIn()
    message.html(response);
    setTimeout(function () {
        message.fadeOut();
    }, 5000);
    
    form.find('input:not([type="submit"]), textarea').val('');
}

// fail function
function fail_func(data) {
    message.fadeIn()
    message.html(data.responseText);
    setTimeout(function () {
        message.fadeOut(5000);
    }, 5000);
}

form.submit(function (e) {
    e.preventDefault();
    form_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: form_data
    })
    .done(done_func)
    .fail(fail_func);
});

// image gallery
// Open the Modal
function openModal() {
    document.getElementById("img_gallery_modal").style.display = "flex";
}

// Close the Modal
function closeModal() {
    document.getElementById("img_gallery_modal").style.display = "none";
}

var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    var captionText = document.getElementById("caption");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText.innerHTML = dots[slideIndex-1].alt;
}