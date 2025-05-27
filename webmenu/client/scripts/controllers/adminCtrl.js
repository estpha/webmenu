import { HttpService } from "../services/httpService.js";

let adminCtrl; // déclaration de la variable globale

$().ready(function () {
    // initialisation de la variable globale
    adminCtrl = new AdminCtrl();
});

/**
 * Classe contrôleur de la page d'accueil de la gestion d'articles.
 */
export default class AdminCtrl {
    #listeArticles;

    constructor() {
        // initialisation de la variable pour les services http
        this.http = new HttpService();
        // appel de la méthode pour la gestion des erreurs
        this.http.centraliserErreurHttp((msg) => this.afficherErreurHttp(msg));
        // appel de la méthode d'initialisation de la classe
        this.init();
    }

    // méthode d'initialisation de la classe
    init() {
        // popup de login pour accéder à la page
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
                this.http.connect(result, (data) => this.connexion(data));
            }
        });
    }

    afficherErreurHttp(msg) {
        alert(msg);
    }

    // méthode de connexion appelé pour le login
    connexion(data) {
        // une fois l'utilisateur connecté, l'affichage des articles est appelé        
        this.http.afficheArticlesGestion((data) => this.chargerArticles(data));

        let btnDeconnex = $("#deconnect");
        let btnAjout = $("#ajout");
        let champsModifAjout = $("#ajout-et-modif");

        // écouteur sur le bouton de deconnexion
        btnDeconnex.on("click", () => {
            // méthode de déconnexion
            this.http.disconnect((data) => this.déconnexion(data));
        });

        // écouteur sur le bouton d'ajout d'un article
        btnAjout.on("click", () => {
            // changement de la valeur du bouton d'ajout
            btnAjout.replaceWith(`<button id="sauverArticle">Sauver l'article</button>`);

            // ajout au bas de la page des différents champs utiles à l'ajout de l'article
            let ajoutModif = `
                <label>Description : </label>
                <input id="description-ajout" type="text" placeholder="description"/>
                <label>Quantité : </label>
                <input id="quantite-ajout" type="text" placeholder="quantité"/>
                <label>Prix : </label>
                <input id="prix-ajout" type="text" placeholder="prix"/>
                <label>Ordre de l'article dans la liste : </label>
                <input id="ordre-ajout" type="number"/>                
            `;
            champsModifAjout.append(ajoutModif);
        });

        // écouteur sur le bouton de sauvegarde d'un article
        // appelé comme ça car il a été ajouté dynamiquement
        $(document).on("click", "#sauverArticle", () => {
            // récupération des valeurs insérées dans les input et la valeur du groupe sélectionné
            let description = $("#description-ajout").val();
            let quantite = $("#quantite-ajout").val();
            let prix = $("#prix-ajout").val();
            let ordre = $("#ordre-ajout").val();
            let groupe = $("#groupes").val();

            // appel de la méthode d'ajout dans la base de données
            this.http.ajouterArticle(description, quantite, prix, groupe, ordre, (data) => this.ajoutArticle(data));
        });

    }

    chargerGrp(data) {
        console.log(data);
        const listeGroupes = $("#groupes");
        listeGroupes.empty(); // Clear the existing options

        // Default to the first group in the data
        const firstGroup = data[0]?.id; // Use the first group's ID if it exists
        const defaultGroupId = firstGroup || null; // Fallback to null if no groups

        // Populate the select with group options
        data.forEach((group) => {
            let isSelected = group.id === defaultGroupId ? "selected" : ""; // Mark the default group as selected
            let optionHtml = `<option value="${group.id}" ${isSelected}>${group.name}</option>`;
            listeGroupes.append(optionHtml);
        });

        // Set the dropdown value to the default group
        if (defaultGroupId) {
            listeGroupes.val(defaultGroupId);
        }

        // Load articles for the default group
        if (defaultGroupId) {
            this.chargerArticlesParGrp(defaultGroupId);
        }

        // Add an event listener to fetch articles when a group is selected
        listeGroupes.on("change", () => {
            const selectedGroupId = listeGroupes.val(); // Get the selected group's ID
            this.chargerArticlesParGrp(selectedGroupId);
        });
    }



    chargerArticles(data) {
        this.#listeArticles = data;
        this.http.afficheGrp((data) => this.chargerGrp(data));
    }

    chargerArticlesParGrp(groupId) {
        const listeArticlesVue = $("#listeArticlesModif");
        listeArticlesVue.empty();

        // If a groupId is provided, filter articles based on it; otherwise, show all articles
        const filteredArticles = groupId
            ? this.#listeArticles.filter(article => article.group === groupId)
            : this.#listeArticles;

        // Populate the list of articles
        filteredArticles.forEach((article) => {
            const articleHtml = `
            <tr class="menu-item">            
                <td class="article-et-quantite">
                    <span class="ordre">${article.order}</span>
                    <span class="description">${article.description}</span>
                    <span class="quantite">${article.quantity}</span>
                </td>    
                <td class="price-et-separateur">
                    <hr class="separateur">
                    <span class="price">${article.price}</span>
                </td>                    
            </tr>`;
            listeArticlesVue.append(articleHtml);
        });
    }

    déconnexion(data) {
        // en cas de déconnexion, l'utilisateur est renvoyé à l'affichage du menu
        location.replace("../index.html");
    }

    ajoutArticle(data) {
        // à faire
        if (data) {
            console.log("Ajout OK");
        } else {
            console.log("Ajout KO");
        }
    }
}