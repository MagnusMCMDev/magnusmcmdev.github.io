document.addEventListener("DOMContentLoaded", function(){ 	window.addEventListener( 'DOMContentLoaded', function() {
		const blockScope = document.querySelector( '.uagb-block-d395e9e0' );
		if ( ! blockScope ) {
			return;
		}
		const deviceWidth = ( window.innerWidth > 0 ) ? window.innerWidth : screen.width;
		if ( blockScope.classList.contains( 'uag-hide-desktop' ) && deviceWidth > 1024 ) {
			blockScope.remove();
			return;
		} else if ( blockScope.classList.contains( 'uag-hide-tab' ) && ( deviceWidth <= 1024 && deviceWidth > 768 ) ) {
			blockScope.remove();
			return;
		} else if ( blockScope.classList.contains( 'uag-hide-mob' ) && deviceWidth <= 768 ) {
			blockScope.remove();
			return;
		}

				let popupSesh = JSON.parse( localStorage.getItem( 'spectraPopup1835' ) );
		const repetition = 1;
		if ( null === popupSesh || repetition !== popupSesh[1] ) {
					
			const repetitionArray = [
				repetition,
				repetition,
			];
			localStorage.setItem( 'spectraPopup1835', JSON.stringify( repetitionArray ) );
			popupSesh = JSON.parse( localStorage.getItem( 'spectraPopup1835' ) );
		}

		if ( 0 === popupSesh[0] ) {
			blockScope.remove();
			return;
		}

		const theBody = document.querySelector( 'body' );
		blockScope.style.display = 'flex';
		setTimeout( () => {
									theBody.classList.add( 'uagb-popup-builder__body--overflow-hidden' );
						blockScope.classList.add( 'spectra-popup--open' );
												const focusElement = document.createElement( 'button' );
						focusElement.style.position = 'absolute';
						focusElement.style.opacity = '0';
						const popupFocus = blockScope.insertBefore( focusElement, blockScope.firstChild );
						popupFocus.focus();
						popupFocus.remove();
										blockScope.style.opacity = 1;
						}, 100 );

		
		const closePopup = ( event = null ) => {
			if ( event && blockScope !== event?.target ) {
				return;
			}
			if ( popupSesh[0] > 0 ) {
				popupSesh[0] -= 1;
				localStorage.setItem( 'spectraPopup1835', JSON.stringify( popupSesh ) );
			}
							blockScope.style.opacity = 0;
						setTimeout( () => {
								blockScope.remove();
				const allActivePopups = document.querySelectorAll( '.uagb-popup-builder.spectra-popup--open' );
				if ( 0 === allActivePopups.length ) {
					theBody.classList.remove( 'uagb-popup-builder__body--overflow-hidden' );
				}
			}, 100 );
		};

						blockScope.addEventListener( 'click', ( event ) => closePopup( event ) );
								const closeButton = blockScope.querySelector( '.uagb-popup-builder__close' );
				closeButton.style.cursor = 'pointer';
				closeButton.addEventListener( 'click', () => closePopup() );
								document.addEventListener( 'keyup', ( event ) => {
					if ( 27 === event.keyCode && blockScope.classList.contains( 'spectra-popup--open' ) ) {
						return closePopup();
					}
				} );
				
		const closingElements = blockScope.querySelectorAll( '.spectra-popup-close-1835' );
		for ( let i = 0; i < closingElements.length; i++ ) {
			closingElements[ i ].style.cursor = 'pointer';
			closingElements[ i ].addEventListener( 'click', () => closePopup() );
		}
	} );
 });