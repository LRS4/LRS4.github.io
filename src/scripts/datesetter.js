class DateSetter {
    constructor() { }

    static setCopyrightToCurrentYear() {
        let d = new Date();
        let year = d.getFullYear();
        $("footer").html(`Copyright &copy; ${year} Lewis Spencer`);
    }
}

export default DateSetter;