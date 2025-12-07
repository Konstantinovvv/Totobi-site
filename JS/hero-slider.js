class HeroSlider {
    constructor() {
        this.slides = document.querySelectorAll('.background-slide');
        this.dots = document.querySelectorAll('.hero-dot');
        this.currentSlide = 0;
        this.slideInterval = null;
        this.slideDuration = 5000;
        this.heroSection = document.querySelector('.hero');
        
        this.init();
    }
    
    init() {
        if (this.slides.length === 0) {
            console.warn('HeroSlider: No slides found');
            return;
        }
        
        this.goToSlide(0);
        
        this.dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'));
                this.goToSlide(slideIndex);
                this.resetTimer();
            });
        });
        
        this.startTimer();
        
        this.setupHoverPause();
        
        this.setupVisibilityChange();
    }
    
    goToSlide(n) {
        this.slides[this.currentSlide].classList.remove('active');
        this.dots[this.currentSlide].classList.remove('active');

        this.currentSlide = (n + this.slides.length) % this.slides.length;

        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    }
    
    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    }
    
    startTimer() {
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, this.slideDuration);
    }
    
    resetTimer() {
        this.stopTimer();
        this.startTimer();
    }
    
    stopTimer() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
    
    setupHoverPause() {
        if (!this.heroSection) return;
        
        this.heroSection.addEventListener('mouseenter', () => {
            this.stopTimer();
        });
        
        this.heroSection.addEventListener('mouseleave', () => {
            this.startTimer();
        });
    }
    
    setupVisibilityChange() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopTimer();
            } else {
                this.startTimer();
            }
        });
    }

    play() {
        this.startTimer();
    }
    
    pause() {
        this.stopTimer();
    }
    
    destroy() {
        this.stopTimer();
        this.dots.forEach(dot => {
            const newDot = dot.cloneNode(true);
            dot.parentNode.replaceChild(newDot, dot);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.heroSlider = new HeroSlider();
});