import { HttpService } from "../services/httpService.js";

let adminCtrl; // Declare globally if needed

$().ready(function () {
    // Initialize global variables
    adminCtrl = new AdminCtrl(); // Main controller
});

export default class AdminCtrl {
    constructor() {
        this.http = new HttpService();
        this.chargerArticles();
    }

    init() {
        console.log("AdminCtrl initialisé");
    }

    chargerArticles() {
        this.http.afficheArticlesGestion(this.chargerArticlesSuccess, this.callbackError);
    }

    chargerArticlesSuccess(data, text, jqXHR) {
        let listeArticles = $("#listeArticles");
        let contenneur = $(".menu-item");
        listeArticles.empty(); // Clear the existing content
        console.log(data);

        // Loop through each group in the data
        Object.keys(data).forEach(groupName => {
            // Add the group name and items
            let groupSection = `
            <div class="menu-section">
                <h2>${groupName}</h2>
                <div class="menu-items"></div>
            </div>
        `;
            let groupElement = $(groupSection);
            let menuItemsContainer = groupElement.find(".menu-items");

            // Loop through articles
            data[groupName].forEach(article => {
                let articleHtml = `
                <div class="menu-item">
                    <span class="description">${article.descritpion}</span>
                    <span class="price">${article.price}</span>
                </div>
            `;
                $(articleHtml).appendTo(menuItemsContainer);
            });

            groupElement.appendTo(listeArticles);
            groupElement.slick({
                // fade: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 1000,
            });
        });
    }

    callbackError(request, status, error) {
        if (request.status === 401) {
            // location.replace("../client/login.html");
            alert("erreur : " + request.status + " vous n'êtes pas connecté");
        } else if (request.status === 503) {
            alert("erreur : " + request.status + " une erreur s'est produite lors de la modification. Veuillez réessayer.");
        }
        else {
            alert("une erreur inconnue est survenue. Erreur :" + error + " Resquest : " + request + " Status : " + status);
        }
    }
}