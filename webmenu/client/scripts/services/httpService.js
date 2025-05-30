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

  afficheArticlesParGroup(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: DISPLAY_URL,
      data: 'action=getArticlesByGroup',
      success: successCallback
    });
  }

  getConf(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: CONFIG_URL,
      data: 'action=getConf',
      success: successCallback
    });
  }

  getConfAdmin(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: `../${CONFIG_URL}`,
      data: 'action=getConf',
      success: successCallback
    });
  }

  afficheArticlesGestion(id, successCallback) {
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

  chargerGrp(successCallback) {
    $.ajax({
      type: "GET",
      dataType: "json",
      url: MANAGE_URL,
      data: 'action=getGroup',
      success: successCallback
    });
  }

  connect(passwd, successCallback) {
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


  disconnect(successCallback) {
    $.ajax({
      type: "POST",
      dataType: "json",
      url: `../${CONFIG_URL}`,
      data: 'action=disconnect',
      success: successCallback
    });
  }

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
