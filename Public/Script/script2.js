const wrapper = document.querySelector('.carousel-wrapper');
        const items = document.querySelectorAll('.carousel-item');
        const prevButton = document.getElementById('prev');
        const nextButton = document.getElementById('next');

        let index = 0;
        const itemWidth = items[0].getBoundingClientRect().width + 20;
        const visibleItems = 4;
        const totalItems = items.length;
        const maxOffset = (totalItems - visibleItems) * itemWidth;

        function updateCarousel() {
            const offset = Math.min(index * itemWidth, maxOffset);
            wrapper.style.transform = `translateX(-${offset}px)`;
        }

        prevButton.addEventListener('click', () => {
            index = Math.max(0, index - 1);
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            index = Math.min(totalItems - visibleItems, index + 1);
            updateCarousel();
        });

        window.addEventListener('resize', () => {
            updateCarousel();
        });

        updateCarousel();

        document.addEventListener('DOMContentLoaded', () => {
            console.log("Documento carregado. Adicione seu JavaScript aqui.");
        });