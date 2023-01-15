import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



const createSwiper = function showVacationSpots(repo, event) {

    Swiper.use([Navigation])
    let swiper = new Swiper(".mySwiper", {
        // spaceBetween: 10,
        slidesPerView: 1,
        freeMode: true,
        watchSlidesProgress: true,
    });
    let swiper2 = new Swiper(".mySwiper2", {
        // spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        thumbs: {
            swiper: swiper,
        },
    });
                // repo.forEach((element, index) => {
                //     document.getElementById('swiperWrapper').innerHTML += `<figure class="swiper-slide" id="${element.id}"><img src=${element.image} alt=${element.alt}><figcaption class="booking-button id="${element.id}"><span id="${element.id}" style="color:red">Place:</span>&nbsp${element.destination}&nbsp&nbsp<span id="${element.id}" style="color:red">Lodging Per Day:</span>&nbsp$${element.estimatedLodgingCostPerDay}.00&nbsp&nbsp<span id="${element.id}" style="color:red">Flight RT Per Person:</span id="${element.id}">&nbsp$${element.estimatedFlightCostPerPerson}.00&nbsp&nbsp</figcaption></figure>`

                // })

}



export { createSwiper };