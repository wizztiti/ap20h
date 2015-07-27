var app = {
	init: function () {
		onHome = true;
		// Hover sur items du menu
		$(".menu .li").hover(function(){
				$(this).css('cursor','pointer');
   				$(this).children(".link").animate({color : '#009ad5'},500);
				$(this).children(".menuTrait").animate({"background-color" : '#009ad5'},500);
 			},function(){
   				$(this).children(".link").css({color : '#000'});
				$(this).children(".menuTrait").css({"background-color" : '#444'});
 		});
		
		$(".menu .li").on("click", app.clickOnLi);		
	}, // fin de init
	
	clickOnLi : function(e) {
			e.preventDefault();
			var page = $(this).find("a").attr("data-page");
			if(onHome) {
				app.chargePage(page);
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
					}, 500); // la zone est rendue visible

					$(".whiteArea .content").css({
						left : 0
					});
					
					onHome = false;

					app.affichePage();

				}
			);
					
			// Le conteneur de la zone blanche se déplace à droite puis se vide
			$( ".whiteArea .menu" ).animate({left: 512}, 1000, 'easeOutQuart', function() {
					$(".whiteArea").css({left : 270}); //la zone blanche se décale à gauche
					$(".blackArea .content").append( $(".whiteArea .menu") );
				}
			);
	}
	
}; // fin de app