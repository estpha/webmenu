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
    #premierPassage = true;

    constructor() {
        this.http = new HttpService();
        this.http.centraliserErreurHttp((msg) => this.afficherErreurHttp(msg));
        this.init();
    }

    init() {
        console.log("load init");
        this.http.getConf((data) => this.chargerConfig(data));
    }

    afficherErreurHttp(msg) {
        alert(msg);
    }


    chargerArticles(data, text, jqXHR) {
        console.log("articles lus");
        let listeArticles = $("#listeArticles");

        // $("#listeArticles").text("");


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
        this.demarrageAnim();
    }

    demarrageAnim() {
        const listeArticles = $("#listeArticles");

        // Destroy any existing instance of Slick
        if (listeArticles.hasClass("slick-initialized")) {
            listeArticles.slick("unslick");
        }

        // Re-initialize the Slick slider
        listeArticles.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: this.#rechargementPage || 1000, // Configured or default speed
            speed: 800,
            infinite: false,
        }).on('afterChange', (event, slick, currentSlide) => {
            // Check if the current slide is the last slide
            if (currentSlide === slick.slideCount - 1) {
                setTimeout(() => {
                    this.resetAndReload(); // Call method to reset and reload
                }, 1000); // Adjust timeout to match desired delay
            }
        });
    }

    resetAndReload() {
        const listeArticles = $("#listeArticles");

        // Clear the content and re-fetch configuration and articles
        listeArticles.empty(); // Remove all existing content
        this.init(); // Re-fetch config and articles
    }



    chargerConfig(data, text, jqXHR) {
        console.log("config lue");
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
        this.http.afficheArticlesParGroup((data) => this.chargerArticles(data));
    }
}
