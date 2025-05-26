import { HttpService } from "../services/httpService.js";

let adminCtrl; // Declare globally if needed

$().ready(function () {
    // Initialize global variables
    adminCtrl = new AdminCtrl(); // Main controller
});

export default class AdminCtrl {
    constructor() {
        this.http = new HttpService();
        this.http.centraliserErreurHttp((msg) => this.afficherErreurHttp(msg));
        this.init();
    }

    init() {
        console.log("AdminCtrl initialisé");
        Swal.fire({
            title: "Entrer le mot de passe :",
            input: "text",
            inputAttributes: {
                autocapitalize: "off"
            },
            showCancelButton: true,
            cancelButtonText: "Annuler",
            confirmButtonText: "Connexion",
            showLoaderOnConfirm: true,
            preConfirm: async (result) => {
                this.http.connect(result, (data) => this.connectSuccess(data));
            }
        });
    }

    afficherErreurHttp(msg) {
        alert(msg);
    }

    chargerArticlesSuccess(data, text, jqXHR) {
        console.log("Received data:", data);

        const listeArticles = $("#listeArticlesModif");
        const listeGroupes = $("#groupes");

        // Clear previous entries
        listeArticles.empty();
        listeGroupes.empty();

        if (!data || Object.keys(data).length === 0) {
            console.warn("No groups received. Check the backend response.");
            return;
        }

        // Populate groups in the select
        for (const groupName in data) {
            const groupData = data[groupName];

            // Add option with group name as value and set an ID attribute directly using the group name
            const option = new Option(groupName, groupName);
            option.id = groupName; // Keep the name as it is for the ID
            listeGroupes.append(option);
        }

        // Event listener to load articles on group selection
        listeGroupes.off("change").on("change", () => {
            const selectedGroup = listeGroupes.val();
            this.afficheArticleParGrp(selectedGroup, data, listeArticles);
        });

        // Load articles for the first group by default
        const firstGroup = Object.keys(data)[0];
        if (firstGroup) {
            listeGroupes.val(firstGroup);
            this.afficheArticleParGrp(firstGroup, data, listeArticles);
        }
    }



    // Helper function to display articles for the selected group
    afficheArticleParGrp(groupName, groupedData) {

        const groupData = groupedData[groupName];
        if (!groupData) {
            return;
        }
        const listeArticles = $("#listeArticlesModif");
        listeArticles.empty(); // Clear current articles

        let menu = $(".menu");

        groupData.articles.forEach((article) => {
            let articleHtml = `
            <tr class="menu-item">            
                <td class="article-et-quantite">
                    <span class="description">${article.description}</span>
                    <span class="quantite">${article.quantity}</span>
                </td>    
                <td class="price-et-separateur">
                    <hr class="separateur">
                    <span class="price">${article.price}</span>
                </td>                    
            </tr>`;
            listeArticles.append(articleHtml);
        });
    }

    connectSuccess(data) {
        this.http.afficheArticlesGestion((data) => this.chargerArticlesSuccess(data));

        let btnDeconnex = $("#deconnect");
        let btnAjout = $("#ajout");
        let champsModifAjout = $("#ajout-et-modif");
        let btnSauver = $("#sauverArticle");

        btnDeconnex.on("click", () => {
            this.http.disconnect((data) => this.disconnectSuccess(data));
        });

        btnAjout.on("click", () => {
            btnAjout.replaceWith(`<button id="sauverArticle">Sauver l'article</button>`);

            let ajoutModif = `
                <label>Description : </label>
                <input id="description" type="text" placeholder="description"/>
                <label>Quantité : </label>
                <input id="quantite" type="text" placeholder="quantité"/>
                <label>Prix : </label>
                <input id="prix" type="text" placeholder="prix"/>                
            `;
            champsModifAjout.append(ajoutModif);
        });

        // Use event delegation for dynamically added elements
        $(document).on("click", "#sauverArticle", () => {
            console.log("Sauvegarde en cours");
            let description = $("#description").val();
            let quantite = $("#quantite").val();
            let prix = $("#prix").val();
            let groupe = $("#groupes").val(); // Get the selected option value from the select element with id 'groupes'

            this.http.ajouterArticle(description, quantite, prix, groupe, (data) => this.ajoutArticle(data)); // Pass the group to the function
        });

    }

    disconnectSuccess(data) {
        location.replace("../index.html");
    }
    ajoutArticle(data) {
        if (data) {
            console.log("Ajout OK");
        }else{
            console.log("Ajout KO");
        }
    }
}