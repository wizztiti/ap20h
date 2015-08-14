var app = {
	init: function () {
		document.onHome = true,
		document.page = "",
		document.zoomImage = new Array(null,false,false,false,false);

		$(".blackArea .content p").delay(1000).animate({"opacity" : 1},1500);
		//$(".menu .li").on("click", app.clickOnLi);
		app.reInitOnClick();
	},

	reInitOnClick : function() {  // Reinitialise les écouteurs d'évenement apres chargement d'une page.
		$(".menu .li").off();
		$(".infrarouge_Couverture img").off();
		$(".menu .li").on("click", app.clickOnLi);
		$(".infrarouge_Couverture img").on("click", app.clickOnCouvInfrarouge); // clic sur image de couverture de 
	},

	reInitVariablesPages : function () {
		document.zoomImage = Array(null,false,false,false,false);
	},
	
	clickOnLi : function(e) {
		e.preventDefault();
		document.page = $(this).attr("id");
		if(document.onHome) {
			app.animeHome();
		} else {
			$(".whiteArea .content").css({
					"opacity" : 0
				});
			app.chargePage(document.page);
		}
	},
		
	chargePage : function(page) {
		app.reInitVariablesPages();
		$(".whiteArea .content").load("pages/" + page + ".html");
		//setTimeout(function() {app.reInitOnClick();}, 10); // utilisation de setTimeout résoud bug.
		app.affichePage();
	},
	
	affichePage : function() {
		$(".whiteArea .content").animate({"opacity" : 1},1000, function() {
    			app.reInitOnClick();
			}
		);
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
		$( ".blackArea").delay(300).animate({left: -512}, 1000, function() {
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

				$(".whiteArea").css({
					position: "absolute",
					width: 780,
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
		//Récupère l'id de l'image cliqué
		var idCouv = parseInt($(this).attr("id"));

		// modifie sa taille par rapport à son état précédent (zoomé ou pas)
		if(document.zoomImage[idCouv]){
			$(this).css({width: 110});
			$("#" +(idCouv+1)).css({display:"inline"});
			document.zoomImage[idCouv] = false;
		} else {
			$(this).css({width: 230});
			$("#" +(idCouv+1)).css({display:"none"});
			document.zoomImage[idCouv] = true;
		}
	}



}; // fin de app