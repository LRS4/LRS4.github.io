class ButtonEvents {
    constructor() { 
        this.btncontent = document.getElementById("myBtncontent");
        this.btns = this.btncontent.getElementsByClassName("btn");
        this.$scrollTopBtn = $("#scrollTopBtn");
    }

    addActiveClassToSelectedButton() {
        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].addEventListener("click", function () {
                $('.graphArea').hide();
                $('.svg-container').hide();
                $("#toggleImagesCheckbox").hide();
                $('#subtitle').text('Skills and Experience');
                $('.row').fadeIn();
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
            });
        }
    }

    showScrollToTopButton(pixelsFromTop) {
        $(document).scroll(() => {
            if (document.body.scrollTop > pixelsFromTop || document.documentElement.scrollTop > 20) {
                this.$scrollTopBtn.css("display", "block");
            } else {
                this.$scrollTopBtn.css("display", "none");
            }
        });
    }

    scrollToDocumentTopOnClick() {
        this.$scrollTopBtn.click(function() {
            $('html, body').animate({ scrollTop: 0 }, 1000); 
        });
    }

    addScrollToTopListener() {
        this.showScrollToTopButton(20);
        this.scrollToDocumentTopOnClick();
    }

}

export default ButtonEvents;