import { DISPLAY_URL, MANAGE_URL, CONFIG_URL } from "../config/config.js";
/*
 * Couche de services HTTP (worker). 
 *
 * @author Jean-Claude Stritt / modif P-A Mettraux
 */
export class HttpService {
  constructor() { }

  /*
  **  $.ajaxSetup permet de définir une fois un élément sans le refaire par la suite. Ici cela se fait l'error
  */
  centraliserErreurHttp(httpErrorCallbackFn) {
    $.ajaxSetup({
      error: function (xhr, exception) {
        let msg;
        if (xhr.status === 401) {
          msg = "erreur : " + xhr.status + " vous n'êtes pas connecté";
        } else if (xhr.status === 503) {
          msg = "erreur : " + xhr.status + " une erreur s'est produite lors de la modification. Veuillez réessayer.";
        } else if (xhr.status === 400) {
          msg = "erreur : " + xhr.status + " Les données reçues sont vides.";
        } else {
          msg = "Erreur inconnue : \n" + xhr.responseText;
        }
        httpErrorCallbackFn(msg);
      },
    });
  }

  // Charge les articles par groupe via une requête AJAX de type GET. 
  // L'URL et les paramètres sont utilisés pour obtenir les articles organisés par groupe.
  chargerArticlesParGroup(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: DISPLAY_URL,
      data: 'action=getArticlesByGroup',
      success: successCallback
    });
  }

  // Charge la configuration générale via une requête AJAX de type GET.
  // Cette méthode est utilisée pour obtenir la configuration sous forme de JSON.
  chargerConf(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: CONFIG_URL,
      data: 'action=getConf',
      success: successCallback
    });
  }

  // Charge la configuration pour l'administration via une requête AJAX de type GET.
  // L'URL est légèrement modifiée pour obtenir les paramètres de configuration pour l'admin.
  chargerConfAdmin(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `../${CONFIG_URL}`,
      data: 'action=getConf',
      success: successCallback
    });
  }

  // Charge les articles pour une gestion spécifique via une requête AJAX de type GET.
  // L'ID est envoyé pour obtenir les articles correspondant à cet ID spécifique.
  chargerArticlesGestion(id, successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: MANAGE_URL,
      data: {
        action: 'getArticles',
        id: id
      },
      success: successCallback
    });
  }

  // Charge les groupes via une requête AJAX de type GET.
  // Cette méthode récupère les groupes d'articles à afficher ou gérer.
  chargerGrp(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: MANAGE_URL,
      data: 'action=getGroup',
      success: successCallback
    });
  }

  // Gère la connexion d'un utilisateur en envoyant un mot de passe via une requête AJAX POST.
  // Si le mot de passe est correct, l'utilisateur sera connecté et la réponse est traitée via successCallback.
  connexion(passwd, successCallback) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: `../${CONFIG_URL}`,
      data: {
        action: 'connect',
        password: passwd,
      },
      success: successCallback
    });
  }

  // Gère la déconnexion de l'utilisateur via une requête AJAX POST.
  // Lors de la déconnexion, une réponse est retournée et traitée avec successCallback.
  deconnexion(successCallback) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: `../${CONFIG_URL}`,
      data: 'action=disconnect',
      success: successCallback
    });
  }

  // Ajoute un nouvel article via une requête AJAX de type PUT.
  // Les données de l'article sont envoyées en JSON et traitées par le serveur pour ajout.
  ajouterArticle(description, quantite, prix, groupe, ordre, successCallback) {
    $.ajax({
      type: "PUT",
      url: MANAGE_URL,
      contentType: "application/json",
      data: JSON.stringify({
        action: 'ajoutArticle',
        description: description,
        quantite: quantite,
        prix: prix,
        groupe: groupe,
        ordre: ordre
      }),
      success: successCallback
    });
  }

  // Modifie un article existant via une requête AJAX de type PUT.
  // Les données de modification (ID, description, ordre, soldout) sont envoyées pour mettre à jour l'article.
  modifierArticle(id, description, order, soldout, successCallback) {
    $.ajax({
      type: "PUT",
      url: MANAGE_URL,
      contentType: "application/json",
      data: JSON.stringify({
        action: 'modifArticle',
        id: id,
        description: description,
        order: order,
        soldout: soldout
      }),
      success: successCallback
    });
  }

  // Supprime un article via une requête AJAX de type DELETE.
  // L'ID de l'article à supprimer est envoyé pour le supprimer du serveur.
  supprimerArticle(id, successCallback) {
    $.ajax({
      type: "DELETE",
      url: MANAGE_URL,
      contentType: "application/json",
      data: JSON.stringify({
        action: 'suppArticle',
        id: id
      }),
      success: successCallback
    });
  }

}
