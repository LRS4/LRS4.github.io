class DeviceHandler {
    constructor() {
        this.topNav = document.getElementById("myTopnav");
     }
    
	isTouchEnabledDevice() {
		return (('ontouchstart' in window)
			|| (navigator.MaxTouchPoints > 0)
			|| (navigator.msMaxTouchPoints > 0));
    }
    
    hideAllOverlays() {
        $(".overlay").css("opacity", "0");
    }

    showClosestOverlayTo(eventTarget) {
        $(eventTarget).closest('.overlay').css("opacity", "1");
    }

    startTouchListener() {
        let self = this;
        $(".content").click(function (event) {
            if(self.isTouchEnabledDevice()) {
                self.hideAllOverlays();
                self.showClosestOverlayTo(event.target);
            }
        });
    }

    toggleResponsiveTopNav() {
        let self = this;
        if (self.topNav.className === "topnav") {
            self.topNav.className += " responsive";
        } else {
            self.topNav.className = "topnav";
        }
    }

    addExpandMobileNavListener() {
        let self = this;
        $("#expand").click(() => {
            self.toggleResponsiveTopNav();
        });
    }
}

export default DeviceHandler;