"use strict"; // uses strict globally

// DOMcontentLoaded before functions globally //
document.addEventListener("DOMContentLoaded", function(){

// HAMBURGER MENU NAV
    let hamburger = document.getElementById("hamburger");
    let nav = document.getElementById("main_nav");

    hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    });

//________________________________________________________________________________
    // SLIDESHOW/CAROUSEL USING JQUERY (plugin/widget) //
    $('.carousel').slick({
            autoplay: true,
            autoplaySpeed: 3500,
            speed: 800,
            arrows: true, 
            dots: true,
            fade: true,        
            cssEase: 'linear',
            pauseOnHover: false
    });

    $('.fade').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'
    });

//________________________________________________________________________________

// CATEGORY TABS USING JQUERY OUR FAVORITES + TRADITIONS + MAPS SECTIONS + MENU NAVIGATION// 

    $(function(){
        $("#jqtabs").tabs();
    });

        $("#favorites").tabs({ // adds fade effect to category tabs when changed
    show: { effect: "fade", duration: 600 }
    });

    $(function(){
        $("#jqtabs2").tabs();
    });

        $("#favorites").tabs({ // adds fade effect to category tabs when changed
    show: { effect: "fade", duration: 600 }
    });

     $(function(){
        $("#menu_tabs").tabs();
    });

    

    //________________________________________________________________________________

    // GOOGLE MAPS API// 

    // API key from Google Maps have to be added to index.html in the script tag for the map to work. JSON file for pulling reviews.
        
    window.initMap = function () {

    let location = { lat: 42.47613330197881, lng: -70.94734871296671 };

    let map = new google.maps.Map(document.getElementById("map"), {
        zoom: 17,
        center: location,
    });

    new google.maps.Marker({
        position: location,
        map: map,
        title: "Golden Monkey Cafe",
    });
    };

    // reviews from reviews.json file are pulled and displayed in the reviews section of the website because google doesn't allow direct access to reviews - kept showing no reviews when loaded.
    
    async function loadReviews() {
    try {
        let response = await fetch("reviews.json");
        let reviews = await response.json();

        let container = document.getElementById("reviews_list");

        if (!reviews || reviews.length === 0) {
        container.innerHTML = "<p>No reviews available.</p>";
        return;
        }

        // number of reviews per page load
        let numToShow = 3; 

        // Shuffle reviews on page load to show different reviews each time
        let shuffled = reviews.sort(() => 0.5 - Math.random());

        // Take first N reviews
        let selected = shuffled.slice(0, numToShow);

        container.innerHTML = selected.map(review => {
        let stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating); // Converts number rating into stars
        return `
            <div class="review">
            <strong>${review.author_name}</strong>
            <span class="stars">${stars}</span><br>
            ${review.text}<br>
            <small>${review.date}</small>
            </div>
        `;
        }).join("");

    } catch (error) {
        console.error(error);
        document.getElementById("reviews_list").innerHTML = "<p>Error loading reviews.</p>";
    }
    }

    // Call the function after defining it
    loadReviews();

});







