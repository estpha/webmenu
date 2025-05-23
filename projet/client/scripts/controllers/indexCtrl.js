import { HttpService } from "../services/httpService.js";

let indexCtrl; // Declare globally if needed

$().ready(function () {
    // Initialize global variables
    indexCtrl = new IndexCtrl(); // Main controller
});

/**
 * Classe contrôleur de la page d'accueil.
 */
export default class IndexCtrl {
    #uniteDArgent;
    #rechargementPage;

    constructor() {
        this.http = new HttpService();
        this.http.centraliserErreurHttp((msg) => this.afficherErreurHttp(msg));
        this.init();
    }

    init() {
        this.http.getConf((data) => this.chargerConfigSuccess(data));
        this.http.afficheArticlesParGroup((data) => this.chargerArticlesSuccess(data));
    }

    afficherErreurHttp(msg) {
        alert(msg);
    }


    chargerArticlesSuccess(data, text, jqXHR) {
        let listeArticles = $("#listeArticles");
        listeArticles.empty(); // Clear the existing content

        console.log(data);

        // Step 1: Organize groups by ordrePage
        let pagesGroupedByOrder = {};
        Object.keys(data).forEach(groupName => {
            const { ordrePage, ordreGroup, articles } = data[groupName];

            if (!pagesGroupedByOrder[ordrePage]) {
                pagesGroupedByOrder[ordrePage] = [];
            }

            // Add the group with its order metadata
            pagesGroupedByOrder[ordrePage].push({
                groupName,
                groupOrder: parseInt(ordreGroup, 10), // Ensure numeric sorting
                articles
            });
        });

        // Step 2: Iterate through pages and render groups in groupOrder order
        Object.keys(pagesGroupedByOrder).sort((pageA, pageB) => pageA - pageB).forEach(pageOrder => {
            // Sort groups within the page by groupOrder
            pagesGroupedByOrder[pageOrder].sort((groupA, groupB) => groupA.groupOrder - groupB.groupOrder);

            // Create a container for the page
            let pageSection = $(`<div class="page-section" data-ordre-page="${pageOrder}"></div>`);

            pagesGroupedByOrder[pageOrder].forEach(group => {
                const { groupName, articles } = group;

                // Create group section
                let groupSection = `
                <div class="menu-section" data-ordre-page="${pageOrder}" data-ordre-group="${group.groupOrder}">
                    <h2>${groupName}</h2>
                    <table class="menu-items"></table>
                </div>`;
                let groupElement = $(groupSection);
                let menuItemsContainer = groupElement.find(".menu-items");

                // Render articles within the group
                articles.forEach(article => {
                    let articleHtml = `
                    <tr class="menu-item">            
                        <td class="article-et-quantite">
                            <span class="description">${article.description}</span>
                            <span class="quantite">${article.quantity}</span>
                        </td>    
                        <td class="price-et-separateur">
                            <hr class="separateur">
                            <span class="price">${article.price} ${this.#uniteDArgent}</span>
                        </td>                    
                    </tr>`;
                    $(articleHtml).appendTo(menuItemsContainer);
                });

                groupElement.appendTo(pageSection);
            });

            pageSection.appendTo(listeArticles);
        });

        // Initialize the slider for each page
        $("#listeArticles").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: this.#rechargementPage,
            speed: 800,
            infinite: false,
        }).on('afterChange', function (event, slick, currentSlide) {
            // Check if the current slide is the last slide
            if (currentSlide === slick.slideCount - 1) {
                // Wait for the animation to complete, then reload the page
                setTimeout(() => {
                    location.reload();
                }, 5000); // Adjust timeout to match the desired delay
            }
        }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
            // Prevent animation from starting if it's the last slide
            if (nextSlide === slick.slideCount - 1) {
                $(this).slick('slickPause'); // Pause the slick animation to avoid the next transition
            }
        });
    }


    chargerConfigSuccess(data, text, jqXHR) {
        let parsedData = typeof data === "string" ? JSON.parse(data) : data;

        if (Array.isArray(parsedData)) {
            parsedData.forEach(item => {
                this.#uniteDArgent = item.moneyUnity;
                this.#rechargementPage = item.refreshTime;
            });
        } else {
            this.#uniteDArgent = parsedData.moneyUnity;
            this.#rechargementPage = parsedData.refreshTime;
        }
    }

    // callbackError(request, status, error) {
    //     if (request.status === 401) {
    //         location.replace("../client/login.html");
    //         alert("erreur : " + request.status + " vous n'êtes pas connecté");
    //     } else if (request.status === 503) {
    //         alert("erreur : " + request.status + " une erreur s'est produite lors de la modification. Veuillez réessayer.");
    //     } else {
    //         alert("une erreur inconnue est survenue. Erreur :" + error + " Request : " + request + " Status : " + status);
    //     }
    // }
}
