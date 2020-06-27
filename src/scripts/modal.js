class Modal {
    constructor() {
        this.modal = document.getElementById('myModal');
        this.btn = document.getElementById("myBtn");
        this.span = document.getElementsByClassName("closeModal")[0];
     }

     addEventListeners() {
        let self = this;
        
        // When the user clicks the button, open the modal, show text
        this.btn.onclick = function () {
            self.modal.style.height = "100%";
        }

        // When the user clicks on <span> (x), close the modal
        this.span.onclick = function () {
            self.modal.style.height = "0%";
        }

        // When the user clicks ESC, close the model
        window.onkeyup = function (event) {
            if(event.key === "Escape") {
                self.modal.style.height = "0%";
            }
        }
     }
}

export default Modal;