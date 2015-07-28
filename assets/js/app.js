var app = {
	init: function () {
		onHome = true;
		$(".menu .li").on("click", app.clickOnLi);		
	}, // fin de init
	
	clickOnLi : function(e) {
			e.preventDefault();
			page = $(this).attr("id");
			if(onHome) {
				app.animeHome();
			} else {
				app.chargePage(page);
			}
	},
		
	chargePage : function(page) {
		$(".whiteArea .content").load("pages/" + page + ".html");
	},
	
	affichePage : function() {
		$(".whiteArea .content").animate({"opacity" : 1},3000);	
	},
	
	animeHome : function() {
			// Le conteneur du logo se déplace à gauche
			$( ".blackArea .content" ).animate({left: -291}, 1000,'easeOutQuart');
					
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

					$(".whiteArea .content").css({
						left : 0
					});
					
					onHome = false;
					app.chargePage(page);
					app.affichePage();

				}
			);
					
			// Le conteneur de la zone blanche se déplace à droite puis se vide

			$( ".whiteArea .menu" ).animate({left: 700}, 1300, 'easeOutQuart', function() {
					$(".whiteArea").css({left : -250}); //la zone blanche se décale à gauche
					$(".blackArea .content").append( $(".whiteArea .menu") );
				}
			);

	}
	
}; // fin de app