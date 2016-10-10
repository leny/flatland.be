/* leny/flatland.be
 *
 * /src/js/main.js - Main entry point
 *
 * coded by leny@flatLand!
 * started at 08/10/2016
 */

import $ from "jquery";

import languageCycler from "./components/language-cycler";
import { init as scrollObserverInit, scrollTo, scrolling } from "./components/scroll-observer";
import { init as navHandlerInit } from "./components/navigation-handler";

let bIsMobile = !!navigator.userAgent.match( /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i );

$( () => {

    $( `a[rel="external"]` ).attr( "target", "_new" );

    languageCycler( $( ".section__quote" ) );

    if ( bIsMobile ) {
        setTimeout( () => window.scrollTo( 0, 1 ), 0 );

        return;
    }

    navHandlerInit();
    scrollObserverInit();

    scrolling();

    location.hash && scrollTo( location.hash );
} );
