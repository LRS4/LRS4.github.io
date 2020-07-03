class ButtonEvents {
    constructor() { 
        this.btncontent = document.getElementById("myBtncontent");
        this.btns = this.btncontent.getElementsByClassName("btn");
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
}

export default ButtonEvents;