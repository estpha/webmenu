import { HttpService } from "../services/httpService.js";
const MD5 = function (d) { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ }

let indexCtrl; // déclaration de la variable globale

$().ready(function () {
  // initialisation de la variable globale
  indexCtrl = new IndexCtrl();
});

/**
 * Classe contrôleur de la page d'accueil de l'affichage du menu.
 */
export default class IndexCtrl {
  // variables privées utiles à la récupération des infos de la configuration
  #uniteDArgent;
  #rechargementPage;
  #empreinteMD5 = "";

  constructor() {
    // initialisation de la variable pour les services http
    this.http = new HttpService();
    // appel de la méthode pour la gestion des erreurs
    this.http.centraliserErreurHttp((msg) => this.afficherErreurHttp(msg));
    // appel de la méthode d'initialisation de la classe
    this.init();
  }

  init() {
    // GET de la configuration de la BD
    this.http.getConf((data) => this.chargerConfig(data));
  }

  afficherErreurHttp(msg) {
    alert(msg);
  }


  chargerArticles(config, data) {
    // création d'une empreinte md5 pour vérifier si les données on été modifiées
    let md5 = MD5(JSON.stringify(data));

    let couleurPoliceGrp = null;
    let couleurPoliceArt = null;

    // test de l'empreinte pour voir si elle a changé
    if (md5 == this.#empreinteMD5) {
      return;
    }
    // si l'empreinte a changé, la variable privée empreinte est modifié pour correspondre à la nouvelle empreinte
    this.#empreinteMD5 = md5;

    let listeArticles = $("#listeArticles");

    // vidage de la liste des articles
    listeArticles.empty();

    // organisation des groupes par page
    // initialisation d'un objet pour regrouper les groupes par numéro de page
    let pagesGroupedByOrder = {};

    // parcours de chaque groupe dans les données fournies
    Object.keys(data).forEach(groupName => {
      const { ordrePage, ordreGroup, couleurGroup, articles } = data[groupName]; // extraction des données utiles

      // si aucun groupe n'existe encore pour cette page, initialiser un tableau vide
      if (!pagesGroupedByOrder[ordrePage]) {
        pagesGroupedByOrder[ordrePage] = [];
      }

      // ajout du groupe actuel dans le tableau correspondant à la page
      pagesGroupedByOrder[ordrePage].push({
        // nom du groupe
        groupName,
        // convertion de l'ordre en nombre pour un tri correct
        groupOrder: parseInt(ordreGroup, 10),

        couleurGroup,
        // articles correspondant à ce groupe
        articles
      });
    });



    // parcours des pages dans l'ordre croissant
    Object.keys(pagesGroupedByOrder)
      .sort((pageA, pageB) => pageA - pageB) // tri des pages par ordre croissant
      .forEach(pageOrder => {

        // tri des groupes dans chaque page par ordre croissant
        pagesGroupedByOrder[pageOrder].sort((groupA, groupB) => groupA.groupOrder - groupB.groupOrder);

        // création d'un conteneur pour la section de la page
        let pageSection = $(`<div class="page-section" data-ordre-page="${pageOrder}"></div>`);

        // parcours des groupes de la page
        pagesGroupedByOrder[pageOrder].forEach(group => {
          const { groupName, couleurGroup, articles } = group;
          // Debug to verify color value
          // console.log(`Group Name: ${groupName}, Color: ${couleurGroup}`);
          // <h2 style="color: ${couleurGroup};">${groupName}</h2>

          if (couleurGroup === null) {
            couleurPoliceGrp = config[0].groupColor;
          } else {
            couleurPoliceGrp = couleurGroup;
          }

          
          let groupSection = `
          <div class="menu-section" data-ordre-page="${pageOrder}" data-ordre-group="${group.groupOrder}">
              <h2 style="
              color: ${couleurPoliceGrp};
              font-family:${config[0].groupFont};
              font-size:${config[0].groupSize}px;
              ">
                ${groupName}
              </h2>
              <table class="menu-items"></table>
          </div>`;

          let groupElement = $(groupSection);
          let menuItemsContainer = groupElement.find(".menu-items");

          articles.forEach(article => {
            if (article.color === null) {
              couleurPoliceArt = config[0].articleColor;
            } else {
              couleurPoliceArt = article.color;
            }

            // <tr class="menu-item" style="color: ${couleurPoliceArt};">
            // pas possible d'ajouter css avec classe sinon dernière liste articles affiche pas la couleur correcte --> articles ajouter dynamiquement
            let articleHtml = `
            <tr class="menu-item"
              style="
                    font-size: ${config[0].articleSize}px;
                    color: ${couleurPoliceArt};
                    font-family: ${config[0].articleFont};                    
                    "
            >
                <td class="article-et-quantite">
                    <span class="description" >
                      ${article.description}
                    </span>
                    <span class="quantite">${article.quantity}</span>
                </td>
                <td class="price-et-separateur">
                    <hr class="separateur">
                    <span class="price">${article.price} ${config[0].moneyUnity}</span>
                </td>
            </tr>`;
            $(articleHtml).appendTo(menuItemsContainer);
          });

          groupElement.appendTo(pageSection);
        });


        // ajout de la section de la page à la liste des articles
        pageSection.appendTo(listeArticles);
      });

    // démarrage de l'animation
    this.demarrageAnim();

  }

  demarrageAnim() {
    const listeArticles = $("#listeArticles");

    // destruction de toute instance éxistante de slick
    if (listeArticles.hasClass("slick-initialized")) {
      listeArticles.slick("unslick");
    }

    // réinitialisation de l'animation
    listeArticles.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: this.#rechargementPage,
      speed: 800
    }).on('afterChange', (event, slick, currentSlide) => {
      // check si la slide correspond à la dernière
      if (currentSlide === slick.slideCount - 1) {
        setTimeout(() => {
          this.resetAndReload(); // appel de la méthode pour recharger la configuration et les articles
        }, this.#rechargementPage); // ajustement du timeout pour correspondre aux autres timeout
      }
    });
  }

  resetAndReload() {
    this.init(); // rechargement des données
  }



  chargerConfig(data) {
    let config = data;
    // analyse des données reçues, conversion JSON si besoin
    let parsedData = typeof data === "string" ? JSON.parse(data) : data;

    // vérification si les données analysées sont un tableau
    if (Array.isArray(parsedData)) {
      parsedData.forEach(item => {
        // mise à jour des propriétés depuis chaque élément du tableau
        this.#rechargementPage = item.refreshTime; // temps de rafraîchissement
      });
    } else {
      // si ce n'est pas un tableau, on suppose qu'il s'agit d'un objet unique
      this.#rechargementPage = parsedData.refreshTime; // temps de rafraîchissement
    }

    // appel de la méthode pour charger les articles
    this.http.afficheArticlesParGroup((data) => this.chargerArticles(config, data));
  }

}
