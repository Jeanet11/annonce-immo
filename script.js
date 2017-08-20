$(function() {
  //Objet Rubrique
  function Rubrique( idRubrique, titre, idRubriqueParent) {
    this.idRubrique = idRubrique;
    this.titre = titre;
    this.idRubriqueParent = idRubriqueParent;
  }

  //Tableau de Rubrique
  var rubriques = [
    new Rubrique( 1, "Immobilier", null),
    new Rubrique( 2, "Vente", 1),
    new Rubrique( 3, "Location", 1),
    new Rubrique( 4, "Colocation", 1),
    new Rubrique( 5, "Vacances", null),
    new Rubrique( 6, "Gite", 5),
    new Rubrique( 7, "Camping", 5),
    new Rubrique( 8, "Hotel", 5),
    new Rubrique( 9, "Informatique", null),
    new Rubrique( 10, "Ordinateur", 9),
    new Rubrique( 11, "Peripherique", 9),
    new Rubrique( 12, "Software", 9)
  ];

  //Objet Annonce
  function Annonce( idAnnonce, titre, contenu, prix, rubrique ) {
    this.idAnnonce = idAnnonce;
    this.titre = titre;
    this.contenu = contenu;
    this.prix = parseInt(prix);
    this.rubrique = rubrique;

    this.getPrix = function() {
      return this.prix + " euro";
    }

    this.getAnnonce = function() {
      return "Votre annonce a pour titre " + this.titre + " et est à " + this.getPrix();
    }
  }

  //Tableau d'annonces
  var annonces = [];
  var annonceId = 1;

  //Fonction de création de la zone de sélection des rubriques
  //Nécessite que le tableau de rubrique soit ordonné avec parent suivi de ses enfants
  function createRubricSelector( rubriques ) {
    var html = "";
    var curRub;
    var isBaliseParentOpen = false;

    for( var i = 0; i < rubriques.length; i++ ) {
      curRub = rubriques[i];
      if( null === curRub.idRubriqueParent ) {
        //On est sur une rub parent
        if( isBaliseParentOpen ) {
          html += "</optgroup>";
        }
        html += "<optgroup label='" + curRub.titre + "'>";
        isBaliseParentOpen = true;
      } else {
        //On est sur une rubrique enfant
        html += "<option value=" + curRub.idRubrique + ">" + curRub.titre + "</option>";
      }
    }
    //Après la boucle for
    if( isBaliseParentOpen ) {
      html += "</optgroup>";
    }

    return html;
  }

  //Fonction de création du tableau d'annonce
  function createTableAnnonceHtml( annonces ) {
    var curAnnonce;
    var html = "<thead>\
          <tr>\
            <th>Rubrique</th>\
            <th>Sous-rubrique</th>\
            <th>Titre</th>\
            <th>Prix</th>\
            <th>Description</th>\
          </tr>\
        </thead>";

    //Parcours du tableau d'annonce pour constituer la table
    for( var i = 0; i < annonces.length; i++ ) {
      curAnnonce = annonces[i];

      html += "<tbody><tr>\
            <td>" + "</td>\
            <td>" + curAnnonce.rubrique.titre + "</td>\
            <td>" + curAnnonce.titre + "</td>\
            <td>" + curAnnonce.prix + "</td>\
            <td>" + curAnnonce.contenu + "</td>\
          </tr>";
    }
    html += "</tbody>";

    return html;
  }

  //Fonction de récupération d'une rubrique à partir de son id
  function getRubrique( rubriques, idRubrique ) {
    for( var i = 0; i < rubriques.length; i++ ){
      if( idRubrique == rubriques[i].idRubrique) {
        return rubriques[i];
      }
    }
  }


  //Mise à jour du select de rubrique
  $("#rubriques").html( createRubricSelector( rubriques ) );

  //Sauvegarde du Formulaire annonce
  $("#btn-save").click( function() {
    //Récupération des input
    var rubrique = getRubrique( rubriques, $("#rubriques").val() );
    var titre = $("#titre").val();
    var prix = $("#prix").val();
    var description = $("#description").val();

    //Création de l'objet annonce
    var annonce = new Annonce( annonceId++, titre, description, prix, rubrique);

    //Push l'objet dans le tableau d'annonces
    annonces.push( annonce );

    //Rafraichir la table html
    $("#display-annonces").html(  createTableAnnonceHtml( annonces ) );
  });

  //Ouverture du formulaire Nouvelle Annonce
  $("#add-annonce").click(function() {
    console.log("Reset");
    $("#id-form")[0].reset();
  });

  //console.log ( createTableAnnonceHtml( annonces ));
  var count = 0;
  $('.afficher').click(function(){

  	$('#display-annonces').toggle();
  	count++;
  	if (count%2 !== 0) {
  		$('.afficher').html("Masquer les annonces");
    	}
    else {
    	$('.afficher').html("Afficher les annonces");
    }
  
  })
})
