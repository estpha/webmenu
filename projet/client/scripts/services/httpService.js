import { DISPLAY_URL, MANAGE_URL, CONFIG_URL } from "../config/config.js";
/*
 * Couche de services HTTP (worker). 
 *
 * @author Jean-Claude Stritt / modif P-A Mettraux
 */
export class HttpService {
  constructor() {}

  /*
  **  $.ajaxSetup permet de définir une fois un élément sans le refaire par la suite. Ici cela se fait l'error
  */
  async centraliserErreurHttp(httpErrorCallbackFn) {
    $.ajaxSetup({
      error: function (xhr, exception) {
        let msg;
        if (xhr.status === 0) {
          msg = "Pas d'accès à la ressource serveur demandée !";
        } else if (xhr.status === 404) {
          msg = "Page demandée non trouvée [404] !";
        } else if (xhr.status === 500) {
          msg = "Erreur interne sur le serveur [500] !";
        } else if (exception === "parsererror") {
          msg = "Erreur de parcours dans le JSON !";
        } else if (exception === "timeout") {
          msg = "Erreur de délai dépassé [Time out] !";
        } else if (exception === "abort") {
          msg = "Requête Ajax stoppée !";
        } else {
          msg = "Erreur inconnue : \n" + xhr.responseText;
        }
        httpErrorCallbackFn(msg);
      },
    });
  }

  async afficheArticlesParGroup(successCallback, errorCallback) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: DISPLAY_URL,
			data: 'action=getArticlesByGroup',
			success: successCallback,
			error: errorCallback,
		});
	}

  async getConf(successCallback, errorCallback) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: CONFIG_URL,
			data: 'action=getConf',
			success: successCallback,
			error: errorCallback,
		});
	}

  async afficheArticlesGestion(successCallback, errorCallback) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: MANAGE_URL,
			data: 'action=getArticlesGestion',
			success: successCallback,
			error: errorCallback,
		});
	}
}
