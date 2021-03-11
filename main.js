changeCurrentItem();
toggleDropdownMenus();
activeCarousel();






function toggleDropdownMenus() {
    document.addEventListener('click', event => {
        let clicked = event.target.closest('.dropdown');
        if(!clicked) {
            let activeDropdownMenu = document.querySelector('.dropdown-menu.visible');
            if(activeDropdownMenu) {
                activeDropdownMenu.classList.remove('visible');
            }
        }
    });

    let dropdownNavVoices = document.getElementsByClassName('dropdown');

    for (var i = 0; i < dropdownNavVoices.length; i++) {
        dropdownNavVoices[i].addEventListener('click', event => {
            let clickedVoice = event.target;

            if(clickedVoice.classList.contains('angle-down')) clickedVoice = clickedVoice.parentElement;

            if(document.querySelector('.dropdown .dropdown-menu.visible')) document.querySelector('.dropdown .dropdown-menu.visible').classList.remove('visible');
            
            for (var i = 0; i < clickedVoice.children.length; i++) {
                if(clickedVoice.children[i].classList.contains('dropdown-menu')) clickedVoice.children[i].classList.toggle('visible');
            }
        });
    }
}

function changeCurrentItem() {
    let webSectionsList = document.querySelectorAll('#technology ul li');

    for (let i = 0; i < webSectionsList.length; i++) {
        webSectionsList[i].addEventListener('click', event => {
            let clickedItem = event.target.closest('#technology ul li');


            if (!clickedItem.classList.contains('current-item')) {
                document.querySelector('#technology ul li.current-item').classList.remove('current-item');
                clickedItem.classList.add('current-item');

                let itemIndex = getIndexItem(webSectionsList, clickedItem);

                document.querySelector('#technology .content-item-container.visible').classList.remove('visible');
                let currentContentContainer = document.querySelectorAll('#technology .content-item-container');
                currentContentContainer[itemIndex].classList.add('visible');
            }
        });
    }
}

function getIndexItem(htmlCollection, item) {
    for (var i = 0; i < htmlCollection.length; i++) {
        if(htmlCollection[i] == item) return i;
    }
}

function activeCarousel() {
    let items = document.querySelectorAll('.carousel-content .carousel-item');
    let activeItemIndex;

    for (var i = 0; i < items.length; i++) {

        if(items[i].classList.contains('visible')) {
            activeItemIndex = i;
            insertCircle(true);
        } else insertCircle();
    }

    circles = document.querySelectorAll('.circle-container.first .circle');

    let arrowRightElement = document.querySelector('.fa-arrow-right');
    arrowRightElement.addEventListener('click', () => {
        items[activeItemIndex].classList.remove('visible');
        circles[activeItemIndex].classList.remove('current-item');

        if(activeItemIndex != items.length-1) activeItemIndex++;
        else activeItemIndex = 0;

        items[activeItemIndex].classList.add('visible');
        circles[activeItemIndex].classList.add('current-item');
    });

    let arrowLeftElement = document.querySelector('.fa-arrow-left');
    arrowLeftElement.addEventListener('click', () => {
        items[activeItemIndex].classList.remove('visible');
        circles[activeItemIndex].classList.remove('current-item');

        if(activeItemIndex != 0) activeItemIndex--;
        else activeItemIndex = items.length-1;

        items[activeItemIndex].classList.add('visible');
        circles[activeItemIndex].classList.add('current-item');
    });

    for (var i = 0; i < circles.length; i++) {
        circles[i].addEventListener('click', event => {
            let circleClicked = event.target;
            let circleClickedIndex;

            for (var i = 0; i < circles.length; i++) {
                if(circles[i] == circleClicked) circleClickedIndex = i;
            }

            if(circleClickedIndex != activeItemIndex) {
                items[activeItemIndex].classList.remove('visible');
                circles[activeItemIndex].classList.remove('current-item');

                activeItemIndex = circleClickedIndex;

                items[activeItemIndex].classList.add('visible');
                circles[activeItemIndex].classList.add('current-item');
            }
        });
    }
}

function insertCircle(isActive = false) {
    let circleContainer = document.querySelector('.circle-container.first');

    let newCircle;
    if(isActive) newCircle = '<span class="circle current-item"></span>';
    else newCircle = '<span class="circle"></span>';

    circleContainer.innerHTML += newCircle;
}
