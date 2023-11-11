export default class CreateButton {
    constructor(createButton) {
        this.createButton = document.querySelector(createButton);
    }

    onResize() {
        window.addEventListener("resize", () => {
            this.buttonController();
        });
    }

    buttonController() {
        if (window.innerWidth <= 500 && !this.createButton.classList.contains("add-task-mobile")) {
            this.createButton.classList.add("add-task-mobile");
        } 
        else if (window.innerWidth > 500 && this.createButton.classList.contains("add-task-mobile")) {
            this.createButton.classList.remove("add-task-mobile");
        }
    }

    init() {
        if (this.createButton) {
            this.buttonController();
            this.onResize();
        }
    }
}