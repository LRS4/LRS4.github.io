class Modal {
    constructor() {
        this.modal = document.getElementById('myModal');
        this.btn = document.getElementById("myBtn");
        this.span = document.getElementsByClassName("closeModal")[0];
     }

     addEventListeners() {
        let self = this;
        
        // When the user clicks the button, open the modal, show text, disable scroll
        this.btn.onclick = function () {
            self.modal.style.height = "100%";
            $("body").addClass("stop-scrolling");
            $("body").bind('touchmove', (e) => e.preventDefault())
        }

        // When the user clicks on <span> (x), close the modal, enable scroll
        this.span.onclick = function () {
            self.modal.style.height = "0%";
            $("body").removeClass("stop-scrolling");
            $("body").unbind("touchmove");
        }

        // When the user clicks ESC, close the model, enable scroll
        window.onkeyup = function (event) {
            if(event.key === "Escape") {
                self.modal.style.height = "0%";
                $("body").removeClass("stop-scrolling");
                $("body").unbind("touchmove");
            }
        }
     }
}

export default Modal;