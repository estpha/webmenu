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

  afficheArticlesGestion(successCallback) {
		$.ajax({
			type: "GET",
			dataType: "json",
			url: MANAGE_URL,
			data: 'action=getArticlesGestion',
			success: successCallback
		});
	}
}
