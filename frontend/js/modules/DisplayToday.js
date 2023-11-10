export default class DisplayToday {
    constructor(element) {
        this.element = document.querySelector(element);
        this.date = new Date();
        this.options = { day: "numeric", month: "short" };
    }

    UpdateElement() {
        this.element.innerText = new Intl.DateTimeFormat("pt-br", this.options, )
        .format(this.date);
    }

    init() {
        if (this.element) this.UpdateElement();
    }
}