class Slider {
    constructor(images, buttons, pages, duration = 7000) {
        this.images = images;
        this.buttons = buttons;
        this.pages = pages;
        this.index = 0;
        this.duration = duration;
        this.animate = true;
    }
    _addActiveClass(index) {
        this.images[index].classList.add("slider_li_active");
        this.pages[index].classList.add("slider_pages-li_active");
    }
    _removeActiveClass(index) {
        this.images[index].classList.remove("slider_li_active");
        this.pages[index].classList.remove("slider_pages-li_active");
    }
    _setIndex(number) {
        if(number >= this.images.length)
            this.index = 0;
        else if(number < 0)
            this.index = this.images.length - 1;
        else
            this.index = number;
    }
    changePage(number) {
        this._removeActiveClass(this.index);
        if(number >= 0 && number < this.images.length)
            this._setIndex(number);
        this._addActiveClass(this.index);
    }
    nextSlide() {
        this._removeActiveClass(this.index);
        this._setIndex(this.index + 1);
        this._addActiveClass(this.index);
    }
    prevSlide() {
        this._removeActiveClass(this.index);
        this._setIndex(this.index - 1);
        this._addActiveClass(this.index);
    }
    controllerClick(event) {
        let target = event.target.dataset.target;
        if(target){
            event.preventDefault();
            if(target.toLowerCase() === "next") {
                this.nextSlide();
            } else if(target.toLowerCase() === "prev") {
                this.prevSlide();
            } else if(target >= "0" && target <= "9") {
                this.changePage(Number.parseInt(target));
            }
        }
    }
//слайдшоу
    startSlideShow() {
        this.interval = setInterval(this.nextSlide.bind(this), this.duration);
    }
    stopSlideShow() {
        clearInterval(this.interval);
    }
    controllerHover() {
        this.animate = !this.animate;
        if(this.animate) {
            this.startSlideShow();
        } else {
            this.stopSlideShow();
        }
    }
}