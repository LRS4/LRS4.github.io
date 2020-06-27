export default class Messages {
    constructor() { }

    static confirmStarted() {
        console.log("Application running...");
    }

    static startIntroJS() {
        // my portfolio
        $("#title").attr("data-intro", "This portfolio displays my skills, experience, qualifications and projects.").attr("data-step", "1");

        // filter by subject
        $("#myBtncontent").attr("data-intro", "Select to filter panels by category.").attr("data-step", "2");

        // panel
        $("#sql").attr("data-intro", "Hover over a panel to view content, or click it on a mobile or tablet.").attr("data-step", "3").attr("data-scrollTo", "top");

        // top nav
        $("#myTopnav").attr("data-intro", "Finally, here are links to other pages including my GitHub page and Developer Job History.").attr("data-step", "4").attr("data-scrollTo", "top");

        // on click start intro js welcome
        $("#help").click(function () {
            $("#all").trigger("click");
            introJs().start();
        });
    }
}