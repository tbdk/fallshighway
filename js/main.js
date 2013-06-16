
var cover = document.querySelector('.cover');
var header = document.querySelector('body > header');

window.onload = function(){
    // make transitions available right after page load
    document.body.classList.remove("preload");
    var shareButtons = document.querySelectorAll(".social a");
    for (var i = shareButtons.length - 1; i >= 0; i--) {
        shareButtons[i].addEventListener('click', function(e) {
            var w = 500;
            var h = 400;
            var left = (screen.width/2)-(w/2);
            var top = (screen.height/2)-(h/2);
            window.open(this.href, '', 
                'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+w+', height='+h+', top='+top+', left='+left);
            e.preventDefault();
        });
    }

    var navToggler = document.getElementById("nav-toggler");
    navToggler.addEventListener('click', function(){
        header.classList.toggle("open");
    });

};


var showImage = function () {
    var imageUrl = cover.getAttribute('data-image-url');
    if (imageUrl) {
        var image = new Image();
        image.onload = function () {
            var ratio = image.width / cover.offsetWidth;
            cover.style.height = (image.height / ratio) + "px";
        };
        image.src = imageUrl;
    }
};

if (cover){

    var wrapper = document.querySelector(".wrapper");
    var content = document.querySelector('.content');

    var setStyle = function(scrollHeight, maxHeight){
        if (scrollHeight < 0 ){
            // fixes negative scroll on especially mac
            scrollHeight = 0;
        } else if (scrollHeight > maxHeight){
            scrollHeight = maxHeight;
        }
        wrapper.style.paddingTop = (scrollHeight) + "px";
        cover.style.height = (maxHeight - scrollHeight) + "px";
        cover.style.minHeight = (maxHeight - scrollHeight) + "px";
    };

    window.onscroll = function scroll () {
        if (!cover.classList.contains("open")){
            setStyle(window.pageYOffset, 160);
        }
    };

    cover.addEventListener('click', function(){
        if (!cover.classList.contains("open")){
            window.scrollTo(window.pageXOffset, 0);
            wrapper.style.paddingTop = "0px";
            cover.classList.add("open");
            showImage();
        } else {
            cover.style.height = "160px";
            // wait until animation has finished..
            setTimeout(function(){
                cover.classList.remove("open");
            }, 1000)
        }
    })

}

