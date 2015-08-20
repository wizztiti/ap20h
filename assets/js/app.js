var app = {
	init: function () {
		document.widthScreen = $("body").outerWidth(true);
		document.onHome = true,
		document.page = "",
		document.rubrique= "",
		document.zoomImage = new Array(null,false,false,false,false);

		$(".blackArea .content p").delay(1000).animate({"opacity" : 1},1500);
		//$(".menu .li").on("click", app.clickOnLi);
		app.reInitOnClick();
	},

	reInitOnClick : function() {  // Reinitialise les écouteurs d'évenement apres chargement d'une page.
		$(".menu .li").off();
		$(".infrarouge_Couverture img").off();
		$(".menu .li").on("click", app.clickOnLi);
		$(".infrarouge_Couverture img").on("click", app.clickOnCouvInfrarouge); // clic sur image de couverture
	},

	reInitVariablesPages : function () {
		document.zoomImage = Array(null,false,false,false,false);
	},
	
	clickOnLi : function(e) {
		e.preventDefault();
		$("#"+document.rubrique).css({color: "#444444", "background-color": "#444444"}); // les li du menu reprennent leur color initiale.
		document.page = $(this).attr("id");
		document.rubrique = $(this).attr("class").slice(3);
		
		if(document.onHome) {
			app.animeHome();
		} else {
			$(".whiteArea .content").animate({"opacity" : 0},500, function () {
					app.chargePage(document.page);
				});
		}
	},
		
	chargePage : function(page) {
		app.reInitVariablesPages();
		$(".whiteArea .content").load("pages/" + page + ".html");
		//setTimeout(function() {app.reInitOnClick();}, 10); // utilisation de setTimeout résoud bug.
		app.affichePage();
	},
	
	affichePage : function() {
		$(".whiteArea .content").delay(500).animate({"opacity" : 1},500, function() {
    			app.reInitOnClick();
			}
		);
		$("#"+document.rubrique).css({color: "#019ad4", "background-color": "#019ad4"}); // le menu sélectionné garde sa couleur.
	},
	
	animeHome : function() {
		// Le conteneur du logo se déplace à gauche
		$( ".blackArea .content" ).animate({left: -291}, 1000,'easeOutQuart');
		
		// Le conteneur de la zone blanche se déplace à droite puis se vide
		$( ".whiteArea .menu" ).animate({left: 700}, 1300, 'easeOutQuart', function() {
				$(".whiteArea .content").css({
					"opacity" : 0
				});
				$(".blackArea .content").append( $(".whiteArea .menu") );
			}
		);

		// La zone noire se déplace à gauche avec une leger retard sur le logo
		$( ".blackArea").delay(300).animate({left: -(document.widthScreen / 2)}, 1000, function() {
				$(this).css({
					left 	: 0, 
					width 	: 350,
					opacity : 0
				});

				$( ".blackArea .content" ).css({
					left 	: 0
				});

				$( ".blackArea .content .menu" ).css({
					"visibility" : "visible"
				});
				
				$(this).animate({
					"opacity" : 1
				}, 2000); // la zone est rendue visible

				$(this).css({position: "fixed"});

				$(".whiteArea").css({
					position: "absolute",
					width: 765,
					float: "left",
					"margin-left": 350
				});

				$(".whiteArea .content").addClass("article");
				document.onHome = false;
				app.chargePage(document.page);
			}
		);
	},
	
	clickOnCouvInfrarouge : function() {
		var idCouv = parseInt($(this).parent().attr("id"));
		//alert(document.zoomImage);

		if(document.page == "infrarouge") { // code pour la page infrarouge

			if(document.zoomImage[idCouv]){
				$(this).css({width: 110});
			} else {
				$(this).css({width: 230});
			}
			document.zoomImage[idCouv] = !document.zoomImage[idCouv];

			if(document.zoomImage[1] || document.zoomImage[2] || document.zoomImage[3] || document.zoomImage[4]) {
				$("#div_infrarouge_Couverture").css({height: 200});
			} else {
				$("#div_infrarouge_Couverture").css({height: 130});
			}

		} else {							// code pour la page welcome

			if(document.zoomImage[idCouv]){
				$(this).css({width: 110});
				$(".infrarouge_Couverture").not("#"+idCouv).css({display:"inline"});
			} else {
				$(this).css({width: 230});
				$(".infrarouge_Couverture").not("#"+idCouv).css({display:"none"});
			}
			document.zoomImage[idCouv] = !document.zoomImage[idCouv];
		}
		
	},

}; // fin de app