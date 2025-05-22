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
    #intervalRechargement;

    constructor() {
        this.http = new HttpService();
        this.chargerArticles();
    }

    afficherErreurHttp(msg) {
        alert(msg);
    }

    async chargerArticles() {
        try {
            // Wait for the config to load before proceeding
            await this.loadConfig();
            // After config is loaded, load the articles
            await this.loadArticles();            

        } catch (error) {
            throw error;
        }
    }

    async loadConfig() {
        try {
            await this.http.getConf(this.chargerConfigSuccess.bind(this), this.callbackError.bind(this));
        } catch (error) {
            throw error;
        }
    }


    async loadArticles() {
        try {
            await this.http.afficheArticlesParGroup(this.chargerArticlesSuccess.bind(this), this.callbackError.bind(this));
        } catch (error) {
            throw error;
        }
    }


    chargerArticlesSuccess(data, text, jqXHR) {
        let listeArticles = $("#listeArticles");
        listeArticles.empty(); // Clear the existing content
        console.log(data);

        Object.keys(data).forEach(groupName => {
            let groupSection = `
            <div class="menu-section">
                <h2>${groupName}</h2>
                <div class="menu-items"></div>
            </div>`;
            let groupElement = $(groupSection);
            let menuItemsContainer = groupElement.find(".menu-items");

            data[groupName].forEach(article => {
                let articleHtml = `
                <div class="menu-item">
                    <div class="article-et-quantite">
                        <span class="description">${article.descritpion}</span>
                        <span class="quantite">${article.quantity}</span>
                    </div>
                    <hr class="dashed">
                    <span class="price">${article.price} ${this.getUniteDArgent()}</span>                    
                </div>`;
                $(articleHtml).appendTo(menuItemsContainer);
            });
            groupElement.appendTo(listeArticles);
        });
        $("#listeArticles").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 1000,
        });
    }

    chargerConfigSuccess(data, text, jqXHR) {
        let parsedData = typeof data === "string" ? JSON.parse(data) : data;

        if (Array.isArray(parsedData)) {
            parsedData.forEach(item => {
                this.setUniteDArgent(item.moneyUnity);
                this.setRechargementPage(item.refreshTime);
            });
        } else {
            this.setUniteDArgent(parsedData.moneyUnity);
            this.setRechargementPage(parsedData.refreshTime);
        }
    }

    setUniteDArgent(value) {
        this.#uniteDArgent = value;
    }

    getUniteDArgent() {
        return this.#uniteDArgent;
    }

    setRechargementPage(value) {
        this.#rechargementPage = value;
    }

    getRechargementPage() {
        return this.#rechargementPage;
    }

    initPageRefresh() {
        if (this.#intervalRechargement) {
            clearInterval(this.#intervalRechargement); // Clear any existing interval
        }

        const refreshTime = this.getRechargementPage();
        if (refreshTime && parseInt(refreshTime) > 0) {
            this.#intervalRechargement = setInterval(() => {
                console.log("Refreshing articles...");
                this.chargerArticles();
            }, parseInt(refreshTime));
        }
    }
    
    callbackError(request, status, error) {
        if (request.status === 401) {
            location.replace("../client/login.html");
            alert("erreur : " + request.status + " vous n'êtes pas connecté");
        } else if (request.status === 503) {
            alert("erreur : " + request.status + " une erreur s'est produite lors de la modification. Veuillez réessayer.");
        } else {
            alert("une erreur inconnue est survenue. Erreur :" + error + " Request : " + request + " Status : " + status);
        }
    }
}
