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
    #uniteDArgent;

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
        this.http.getConfAdmin((data) => this.chargerConfig(data));
        // popup de login pour accéder à la page
        Swal.fire({
            title: "Entrer le mot de passe :",
            input: "password",
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
        // this.http.afficheArticlesGestion((data) => this.chargerArticles(data));
        this.http.chargerGrp((data) => this.afficheGrp(data));

        let btnDeconnex = $("#deconnect");
        let btnAjout = $("#ajout-article");
        let btnSauverAjout = $("#sauver-article");
        let btnSauverModif = $("#sauver-modif");
        let btnAnnuler = $("#annuler");
        let champsModifAjout = $("#ajout-et-modif");

        // écouteur sur le bouton de deconnexion
        btnDeconnex.on("click", () => {
            // méthode de déconnexion
            this.http.disconnect((data) => this.déconnexion(data));
        });

        // écouteur sur le bouton d'ajout d'un article
        btnAjout.on("click", () => {
            $(".modifier-article").prop("disabled", true);
            $(".supprimer-article").prop("disabled", true);
            $("#groupes").prop("disabled", true);

            btnAjout.addClass("hidden");
            btnSauverAjout.removeClass("hidden");
            btnAnnuler.removeClass("hidden");
            // ajout au bas de la page des différents champs utiles à l'ajout de l'article
            let ajout = `
                <div id="champs-temp">
                    <label>Description : </label>
                    <input id="description-ajout" type="text" placeholder="description"/>
                    <label>Quantité : </label>
                    <input id="quantite-ajout" type="text" placeholder="quantité"/>
                    <label>Prix : </label>
                    <input id="prix-ajout" type="text" placeholder="prix"/>
                    <label>Ordre de l'article dans la liste : </label>
                    <input id="ordre-ajout" type="number"/>
                </div>
            `;
            champsModifAjout.append(ajout);
        });

        // écouteur sur le bouton de sauvegarde d'un article
        // appelé comme ça car il a été ajouté dynamiquement
        btnSauverAjout.on("click", () => {
            // récupération des valeurs insérées dans les input et la valeur du groupe sélectionné
            let description = $("#description-ajout").val();
            let quantite = $("#quantite-ajout").val();
            let prix = $("#prix-ajout").val();
            let ordre = $("#ordre-ajout").val();
            let groupe = $("#groupes").val();

            // appel de la méthode d'ajout dans la base de données
            this.http.ajouterArticle(description, quantite, prix, groupe, ordre, (data) => this.ajoutArticle(groupe, data));
        });

        $(document).on("click", ".supprimer-article", (event) => {
            const row = $(event.currentTarget).closest("tr");

            const description = row.find(".description").text();

            const articleId = $(event.currentTarget).data("id");
            let groupe = $("#groupes").val();

            Swal.fire({
                title: "ATTENTION",
                text: "Êtes-vous sûr de vouloir supprimer l'article " + description,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Oui",
                cancelButtonText: "Non",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.http.supprimerArticle(articleId, (data) => this.suppArticle(groupe, data));
                }
            });
        });

        $(document).on("click", ".modifier-article", (event) => {
            $(".modifier-article").prop("disabled", true);
            $(".supprimer-article").prop("disabled", true);
            btnAjout.addClass("hidden");
            btnSauverModif.removeClass("hidden");
            btnAnnuler.removeClass("hidden");

            $("#groupes").prop("disabled", true);

            // Get the article ID from the button's data attribute
            const articleId = $(event.currentTarget).data("id");
            // Find the row containing the button
            const row = $(event.currentTarget).closest("tr");
            // Traverse the DOM to get the fields in the same row
            const order = row.find(".ordre").text();
            const description = row.find(".description").text();
            const soldout = row.find(".ordre").data("soldout") === 1;

            // Use this data to populate a form or perform any other action
            let modif = `
                        <div id="champs-temp">
                            <label>Ordre de l'article dans la liste : </label>
                            <input id="ordre-modif" type="number" data-id="${articleId}" value="${order}"/>
                            <label>Description : </label>
                            <input id="description-modif" type="text" placeholder="description" value="${description}"/>                    
                            <label>Soldout : </label>
                            <input id="soldout-modif" type="checkbox" ${soldout ? "checked" : ""}/>
                        </div>`;
            champsModifAjout.append(modif);
        });


        btnSauverModif.on("click", () => {
            let description = $("#description-modif").val();
            let ordre = $("#ordre-modif").val();
            let soldout = $("#soldout-modif").prop("checked");
            let id = $("#ordre-modif").data("id");
            let groupe = $("#groupes").val();
            $("#groupes").prop("disabled", false);

            if (soldout) {
                soldout = 1;
            } else {
                soldout = 0;
            }

            this.http.modifierArticle(id, description, ordre, soldout, (data) => this.modifArticle(groupe, data));
        });

        btnAnnuler.on("click", () => {
            btnSauverAjout.addClass("hidden");
            btnSauverModif.addClass("hidden");
            btnAnnuler.addClass("hidden");
            btnAjout.removeClass("hidden");
            $("#groupes").prop("disabled", false);

            $(".modifier-article").prop("disabled", false);
            $(".supprimer-article").prop("disabled", false);

            $(document).find(`#champs-temp`).remove();
        });
    }

    afficheGrp(data) {
        if (Object.keys(data).length == 0) {
            // mettre toasty infos
            return;
        }

        const listeGroupes = $("#groupes");
        listeGroupes.empty(); // Clear the existing options

        // Default to the first group in the data
        const firstGroup = data[0]?.id; // Use the first group's ID if it exists
        // Populate the select with group options
        data.forEach((group) => {
            // let isSelected = group.id === defaultGroupId ? "selected" : ""; // Mark the default group as selected
            let isSelected = group.id;
            let optionHtml = `<option value="${group.id}" ${isSelected}>${group.name}</option>`;
            listeGroupes.append(optionHtml);
        });

        listeGroupes.on("change", () => {
            const selectedGroupId = listeGroupes.val(); // Get the selected group's ID
            this.http.afficheArticlesGestion(selectedGroupId, (data) => this.chargerArticles(data));
        });

        // Load articles for the first group by default
        this.http.afficheArticlesGestion(firstGroup, (data) => this.chargerArticles(data));
    }

    chargerArticles(data) {
        if (Object.keys(data).length == 0) {
            // mettre toasty infos
            return;
        }
        const listeArticlesVue = $("#listeArticlesModif");
        listeArticlesVue.empty();


        data.forEach((article) => {
            const articleHtml = `
                <tr>                        
                    <td class="ordre" data-soldout="${article.soldout}">${article.order}</td>
                    <td class="description">${article.description}</td>
                    <td class="quantite">${article.quantity}</td>
                    <td class="price">${article.price} ${this.#uniteDArgent}</td>
                    <td class="suppression-modification">
                        <button class="supprimer-article" data-id="${article.id}">
                            <img src="../images/bin.png" alt="Delete">
                        </button>
                        <button class="modifier-article" data-id="${article.id}">
                            <img src="../images/edit.png" alt="Edit">
                        </button>
                    </td>
                </tr>`;
            listeArticlesVue.append(articleHtml);
        });
    }

    déconnexion(data) {
        // en cas de déconnexion, l'utilisateur est renvoyé à l'affichage du menu
        location.replace("../index.html");
    }

    ajoutArticle(group, data) {
        if (data) {
            Swal.fire({
                title: "L'article a été ajouté",
                icon: "success",
                timer: 800,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: "Une erreur est survenu lors de l'ajout'",
                icon: "error",
                timer: 800,
                showConfirmButton: false
            });
        }

        let btnAjout = $("#ajout-article");
        let btnSauverAjout = $("#sauver-article");
        let btnAnnuler = $("#annuler");

        btnAnnuler.addClass("hidden");
        btnSauverAjout.addClass("hidden");
        btnAjout.removeClass("hidden");

        $(document).find(`#champs-temp`).remove();

        this.http.afficheArticlesGestion(group, (data) => this.chargerArticles(data));
    }

    modifArticle(groupe, data) {
        if (data) {
            Swal.fire({
                title: "L'article a été modifié",
                icon: "success",
                timer: 800,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: "Une erreur est survenu lors de la modification",
                icon: "error",
                timer: 800,
                showConfirmButton: false
            });
        }
        let btnAjout = $("#ajout-article");
        let btnSauverModif = $("#sauver-modif");
        let btnAnnuler = $("#annuler");

        btnAnnuler.addClass("hidden");
        btnSauverModif.addClass("hidden");
        btnAjout.removeClass("hidden");

        $(document).find(`#champs-temp`).remove();
        this.http.afficheArticlesGestion(groupe, (data) => this.chargerArticles(data));
    }

    suppArticle(groupe, data) {
        if (data) {
            Swal.fire({
                title: "L'article a été supprimé",
                icon: "success",
                timer: 800,
                showConfirmButton: false
            });
        } else {
            Swal.fire({
                title: "Une erreur est survenu lors de la suppre",
                icon: "error",
                timer: 800,
                showConfirmButton: false
            });
        }

        this.http.afficheArticlesGestion(groupe, (data) => this.chargerArticles(data));
    }

    chargerConfig(data, text, jqXHR) {
        // analyse des données reçues, conversion JSON si besoin
        let parsedData = typeof data === "string" ? JSON.parse(data) : data;

        // vérification si les données analysées sont un tableau
        if (Array.isArray(parsedData)) {
            parsedData.forEach(item => {
                // mise à jour des propriétés depuis chaque élément du tableau
                this.#uniteDArgent = item.moneyUnity; // unité monétaire
            });
        } else {
            // si ce n'est pas un tableau, on suppose qu'il s'agit d'un objet unique
            this.#uniteDArgent = parsedData.moneyUnity; // unité monétaire
        }
    }
}