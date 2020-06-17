class Modal {
    constructor() {
        this.modal = document.getElementById('myModal');
        this.btn = document.getElementById("myBtn");
        this.span = document.getElementsByClassName("close")[0];
     }

     addEventListeners() {
        let self = this;
        
        // When the user clicks the button, open the modal, show text
        this.btn.onclick = function () {
            self.modal.style.display = "block";
        }

        // When the user clicks on <span> (x), close the modal
        this.span.onclick = function () {
            self.modal.style.display = "none";
        }

        // When the user clicks ESC, close the model
        window.onkeyup = function (event) {
            if(event.key === "Escape") {
                self.modal.style.display = "none";
            }
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == self.modal) {
                self.modal.style.display = "none";
            }
        }
     }
}

export default Modal;