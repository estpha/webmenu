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
        this.http.afficheArticlesGestion((data) => this.chargerArticlesSuccess(data));
    }

    afficherErreurHttp(msg) {
        alert(msg);
    }

    chargerArticlesSuccess(data, text, jqXHR) {
        console.log(data);
    }
}