import { HttpService } from "../services/httpService.js";

let adminCtrl; // Déclaration de la variable globale

$().ready(function () {
  // Initialisation de la variable globale
  adminCtrl = new AdminCtrl();
});

/**
 * Classe contrôleur de la page d'accueil de la gestion d'articles.
 */
export default class AdminCtrl {
  #uniteDArgent;

  constructor() {
    // Initialisation de la variable pour les services http
    this.http = new HttpService();
    // Appel de la méthode pour la gestion des erreurs
    this.http.centraliserErreurHttp((msg) => this.afficherErreurHttp(msg));
    // Appel de la méthode d'initialisation de la classe
    this.init();
  }

  // Méthode d'initialisation de la classe
  init() {
    // Récupération de la configuration administrateur via HTTP
    this.http.chargerConfAdmin((data) => this.recuperationConfig(data));

    // Popup de login pour accéder à la page
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
        this.http.connexion(result, (data) => this.connexionOK(data)); // Appel de la méthode de connexion
      }
    });
  }

  afficherErreurHttp(msg) {
    alert(msg); // Affichage des erreurs HTTP
  }

  // Méthode de connexion appelée pour le login
  connexionOK(data) {
    this.http.chargerGrp((data) => this.afficheGrp(data)); // Chargement des groupes après connexion

    let btnDeconnex = $("#deconnect");
    let btnAjout = $("#ajout-article");
    let btnSauverAjout = $("#sauver-article");
    let btnSauverModif = $("#sauver-modif");
    let btnAnnuler = $("#annuler");
    let champsModifAjout = $("#ajout-et-modif");

    // Écouteur sur le bouton de déconnexion
    btnDeconnex.on("click", () => {
      // Méthode de déconnexion
      this.http.deconnexion((data) => this.deconnexionOK(data));
    });

    // Écouteur sur le bouton d'ajout d'un article
    btnAjout.on("click", () => {
      $(".modifier-article").prop("disabled", true);
      $(".supprimer-article").prop("disabled", true);

      btnAjout.addClass("hidden");
      btnSauverAjout.removeClass("hidden");
      btnAnnuler.removeClass("hidden");

      // Ajout des champs nécessaires pour ajouter un article
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
      champsModifAjout.append(ajout); // Ajout des champs d'entrée dans le DOM
    });

    // Écouteur sur le bouton de sauvegarde d'un article
    btnSauverAjout.on("click", () => {
      // Récupération des valeurs insérées dans les input et la valeur du groupe sélectionné
      let description = $("#description-ajout").val();
      let quantite = $("#quantite-ajout").val();
      let prix = $("#prix-ajout").val();
      let ordre = $("#ordre-ajout").val();
      let groupe = $("#groupes").val();

      if (ordre < 1) {
        Swal.fire({
          title: "L'ordre donné est invalide",
          icon: "error",
          timer: 800,
          showConfirmButton: false
        });
        return;
      }

      // Appel de la méthode d'ajout dans la base de données
      this.http.ajouterArticle(description, quantite, prix, groupe, ordre, (data) => this.ajoutArticle(groupe, data));
    });

    // Gestion de la suppression d'un article
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
          this.http.supprimerArticle(articleId, (data) => this.suppressionArticle(groupe, data));
        }
      });
    });

    // Gestion de la modification d'un article
    $(document).on("click", ".modifier-article", (event) => {
      $(".modifier-article").prop("disabled", true);
      $(".supprimer-article").prop("disabled", true);
      btnAjout.addClass("hidden");
      btnSauverModif.removeClass("hidden");
      btnAnnuler.removeClass("hidden");

      $("#groupes").prop("disabled", true);

      const articleId = $(event.currentTarget).data("id");
      const row = $(event.currentTarget).closest("tr");
      const ordre = row.find(".ordre").text();
      const description = row.find(".description").text();
      const soldout = row.find(".soldout").data("soldout") === 1;

      let modif = `
                        <div id="champs-temp">
                            <label>Ordre de l'article dans la liste : </label>
                            <input id="ordre-modif" type="number" data-id="${articleId}" value="${ordre}"/>
                            <label>Description : </label>
                            <input id="description-modif" type="text" placeholder="description" value="${description}"/>                    
                            <label>Soldout : </label>
                            <input id="soldout-modif" type="checkbox" ${soldout ? "checked" : ""}/>
                        </div>`;
      champsModifAjout.append(modif); // Ajout des champs d'édition dans le DOM
    });

    // Sauvegarde des modifications d'un article
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

      if (ordre < 1) {
        Swal.fire({
          title: "L'ordre donné est invalide",
          icon: "error",
          timer: 800,
          showConfirmButton: false
        });
        return;
      }

      this.http.modifierArticle(id, description, ordre, soldout, (data) => this.modificationArticle(groupe, data));
    });

    // Annuler les actions en cours et réinitialiser l'interface
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
      Swal.fire({
        title: "Information",
        text: "Aucun groupe disponible",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      })
      return;
    }

    const listeGroupes = $("#groupes");
    listeGroupes.empty();

    const firstGroup = data[0]?.id;
    data.forEach((group) => {
      let estSelectionne = group.id;
      let optionHtml = `<option value="${group.id}" ${estSelectionne}>${group.name}</option>`;
      listeGroupes.append(optionHtml);
    });

    listeGroupes.on("change", () => {
      const selectedGroupId = listeGroupes.val();
      this.http.chargerArticlesGestion(selectedGroupId, (data) => this.affichageArticles(data));
    });

    this.http.chargerArticlesGestion(firstGroup, (data) => this.affichageArticles(data));
  }

  affichageArticles(data) {
    if (Object.keys(data).length == 0) {
      Swal.fire({
        title: "Information",
        text: "Aucun article disponible pour ce groupe",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      })
      return;
    }

    const listeArticlesVue = $("#listeArticlesModif");
    listeArticlesVue.empty();


    data.forEach((article) => {
      let soldOutText = `<td class="soldout" data-soldout="${article.soldout}">En stock</td>`;
      if (article.soldout == 1) {
        soldOutText = `<td class="soldout" data-soldout="${article.soldout}" style="color: red; font-weight: bold;">Épuisé</td>`;
      }

      let quantite = article.quantity;
      if (article.quantity == null) {
        quantite = "indisponible";
      }

      const articleHtml = `
                <tr>
                  ${soldOutText}
                  <td class="ordre">${article.order}</td>
                  <td class="description">${article.description}</td>
                  <td class="quantite">${quantite}</td>
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

  deconnexionOK(data) {
    // En cas de déconnexion, l'utilisateur est renvoyé à l'affichage du menu
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
    }

    let btnAjout = $("#ajout-article");
    let btnSauverAjout = $("#sauver-article");
    let btnAnnuler = $("#annuler");

    btnAnnuler.addClass("hidden");
    btnSauverAjout.addClass("hidden");
    btnAjout.removeClass("hidden");
    $(document).find(`#champs-temp`).remove();

    this.http.chargerArticlesGestion(group, (data) => this.affichageArticles(data));
  }

  modificationArticle(groupe, data) {
    if (data) {
      Swal.fire({
        title: "L'article a été modifié",
        icon: "success",
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

    this.http.chargerArticlesGestion(groupe, (data) => this.affichageArticles(data));
  }

  suppressionArticle(groupe, data) {
    if (data) {
      Swal.fire({
        title: "L'article a été supprimé",
        icon: "success",
        timer: 800,
        showConfirmButton: false
      });
    }

    this.http.chargerArticlesGestion(groupe, (data) => this.affichageArticles(data));
  }

  recuperationConfig(data) {
    this.#uniteDArgent = data[0].moneyUnity;
  }
}
