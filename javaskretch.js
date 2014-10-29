//GLOBAL VARs

var $GLOBAL_FX; //!!!Feature using this not yet implemented
var PARTY_BOOL = false;

//jQuery block
$(document).ready( function() {
	var grid_size = 16,
		$mask = $( '.mask' ),
		$grid_square = $( '.grid_square' ),
		$party_mode = $( '.party_mode' ),
		$init_grid = $( '.button' ),
		$button = $( 'button' );

	createGrid( grid_size );

	//mask used to hide sometimes ugly grid creation from user
	$mask.fadeOut( 800 );

	$init_grid.click( function() {
			$mask.fadeIn( 500 );
			userCreateGrid();
			$mask.fadeOut( 800 );
	});

	//changes grid operation: causes random color on mouseenter
	$party_mode.click( function() {
		if ( !PARTY_BOOL ) {
			PARTY_BOOL = true;
			$party_mode.css({ "background-color" : "#0012bf" });
			$( '.grid_square' ).off( 'mouseenter' );
			party_mode();			
		}
		else {
			PARTY_BOOL = false;
			$party_mode.css({ "background-color" : "#00126f"});
			$( '.grid_square' ).off( 'mouseenter' );
			initSquares();
		}
	});

	$button.on({
			mouseenter: function() {
				$(this).fadeTo( 200, 1 );
			},
			mouseleave: function() {
				$(this).fadeTo( 200, 0.8 );
			}
	});
});

//for user requested grid creation
function userCreateGrid() {
	var grid;

	$( '.wrapper' ).empty();

	while ( true ) {
		grid = prompt( "Specify the length of a side for the square grid (max. 200): " );
		if ( isNaN( Number( grid ) ) ) {
			confirm( "Not a valid number. Please try again." );
			continue;
		}
		grid = Number( grid );
		break;
	}
	createGrid( grid );
}

//init grid, both initially and by user request
function createGrid( user_input ) {
	if (user_input > 200) {
		user_input = 200;
	}

	var pixel_size = ( Math.floor( 400 / user_input ) ) + "px",
		spacing = ( 400 % user_input ) + "px",
		$wrapper_row,
		$grid_square,
		$wrapper;

	//adds first child elements to .wrapper and styles them by func param
	$( '.wrapper' ).append( '<div class="wrapper_row"></div>' );
	$( '.wrapper_row' ).append( '<div class="grid_square"></div>' );
	$( '.wrapper_row' ).css({ 'width' : '-=' + spacing , 'height' : pixel_size });
	$( '.grid_square' ).css({ 'width' : pixel_size , 'height' : pixel_size });

	//wrapper_row generation, using detach() for speed (avoids dyn DOM updates)
	$wrapper_row = $( '.wrapper_row' );
	$grid_square = $( '.grid_square' );
	$wrapper_row.detach();
	for ( var j = 2; j < user_input + 1; j++ ) {
		$grid_square.clone().appendTo( $wrapper_row );
	}
	$( '.wrapper' ).append( $wrapper_row );

	//wrapper generation as above
	$wrapper = $( '.wrapper' );
	$wrapper.detach();
	for ( var i = 2; i < user_input + 1; i++ ) {
		$wrapper_row.clone().appendTo( $wrapper );
	}
	$( 'body' ).append( $wrapper );

	//sets a 16x16 global grid for use in display FX (!!not yet implemented!!)
	if ( typeof GLOBAL_FX === 'undefined' ) {
		$GLOBAL_FX = $wrapper.clone();
	}

	//Inits or re-engages event for grid hover & checks PARTY_BOOL
	if (PARTY_BOOL) {
		party_mode();
	}
	else {
		initSquares();
	}
}

//Activates grid_square fx
function initSquares() {
	$( '.grid_square' ).on('mouseenter', function() {
		$(this).fadeTo( 500, 0 );
	});
}

//Activates party_mode grid_square fx (random hex color)
function party_mode() {
	var randomColor;
	$( '.grid_square' ).on( 'mouseenter', function() {
		randomColor = "#000000".replace( /0/g, function() {
				return (~~( Math.random() * 16 )).toString( 16 );
			});
		$(this).css({ "background-color" : randomColor });
	});
}