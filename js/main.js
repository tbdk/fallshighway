
var banner = document.querySelector('.banner');
var navigation = document.querySelector('.header-inner > nav');

window.onload = function(){
    var opener = document.getElementById("banner-opener");
    if (opener){
        opener.addEventListener('click', function(e) {
            if (banner.classList.contains("closed")) {
                banner.classList.remove("closed");
                banner.classList.add("open");
                opener.querySelector(".banner-opener-text").innerHTML = "Hide navigation"
            } else {
                banner.classList.remove("open");
                banner.classList.add("closed");
                opener.querySelector(".banner-opener-text").innerHTML = "Show navigation"
           };
           e.preventDefault();
        });
    };

    document.getElementById("nav-toggler").addEventListener('click', function(e) {
        navigation.classList.toggle("open");
        e.preventDefault();
    });

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
};

var animatedScrollTo = function(to, duration, callback) {
    if (duration <= 0){
        callback();
        return;
    }
    var difference = to - window.pageYOffset;
    var perTick = difference / duration * 10;

    setTimeout(function() {
        window.scrollTo(window.pageXOffset, window.pageYOffset + perTick);
        animatedScrollTo(to, duration - 10, callback);
    }, 10);
};

var resetStyle = function(){
    header.style.position = "static";
    banner.style.position = "static";
    content.style.paddingTop = "0px";
};

var showImage = function () {
    banner.classList.add("open");
    resetStyle();
    var imageUrl = banner.getAttribute('data-image-url');
    if (imageUrl) {
        var image = new Image();
        image.onload = function () {
            var ratio = image.width / banner.offsetWidth;
            banner.style.height = (image.height / ratio) + "px";
        };
        image.src = imageUrl;
    }
};

if (document.querySelector('body').classList.contains('post') && banner){

    var header = document.querySelector('body>header');
    var body = document.querySelector('body');
    var content = document.querySelector('.content');

    var setStyle = function(scrollHeight, maxHeight){
        // fixes negative scroll on especially mac
        if (scrollHeight < 0 ){
            scrollHeight = 0;
        }
        header.style.position = "fixed";
        banner.style.position = "fixed";
        header.style.top =  scrollHeight > maxHeight? - (scrollHeight - maxHeight) + "px":"0px";
        banner.style.top = header.offsetHeight + "px";
        content.style.paddingTop = (header.offsetHeight + maxHeight) + "px";
        if (scrollHeight > maxHeight){
            scrollHeight = maxHeight;
        }
        banner.style.height = (maxHeight - scrollHeight) + "px";
        banner.style.minHeight = (maxHeight - scrollHeight) + "px";
    };

    window.onscroll = function scroll () {
        if (!banner.classList.contains("open")){
            setStyle(window.pageYOffset, 160);
        }
    };

    banner.addEventListener('click', function(){
        if (!banner.classList.contains("open")){
            animatedScrollTo(0, 100, showImage);
        } else {
            animatedScrollTo(0, 100, function(){
                banner.style.height = "160px";
                // wait until animation has finished..
                setTimeout(function(){
                    banner.classList.remove("open");
                }, 1000)
            });
        }
    })

}

