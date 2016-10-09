/* leny/flatland.be
 *
 * /src/js/components/scroll-observer.js - Scrolling observer & handler
 *
 * coded by leny@flatLand!
 * started at 09/10/2016
 */

import $ from "jquery";
import RangeInspector from "../utils/range-inspector";
import { currentSection, changeSection } from "./navigation-handler";

let iStickyHeaderStep = 0, bStickyHeaderIsVisible = false,
    oSectionStepsInspector = new RangeInspector(),
    $stickyHeader, $splashLogo, $stickyHeaderBox, $splashMessage,
    fComputePositions, fScrollingHandler, fScrollToSelector, fInit;

fComputePositions = function() {
    iStickyHeaderStep = $( ".splash__logo .logo__name" ).offset().top - 16;
    oSectionStepsInspector.clear();
    $( ".section" ).each( function() {
        let $this = $( this );

        oSectionStepsInspector.add( {
            "key": $this.attr( "id" ),
            "start": $this.offset().top - 100,
            "stop": $this.offset().top + $this.height() + 125,
        } );
    } );
};

fScrollingHandler = function() {
    let iCurrentScrollPosition = document.body.scrollTop > document.documentElement.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;

    if ( iCurrentScrollPosition >= iStickyHeaderStep && !bStickyHeaderIsVisible ) {
        bStickyHeaderIsVisible = true;
        $stickyHeader.show();
        $splashLogo.hide();
        $stickyHeaderBox.fadeIn( "slow" );
        $splashMessage.fadeOut( "slow" );
    }
    if ( iCurrentScrollPosition < iStickyHeaderStep && bStickyHeaderIsVisible ) {
        bStickyHeaderIsVisible = false;
        $splashLogo.show();
        $stickyHeader.hide();
        $stickyHeaderBox.hide();
    }

    if ( oSectionStepsInspector.getKey( iCurrentScrollPosition ) !== currentSection ) {
        changeSection( oSectionStepsInspector.getKey( iCurrentScrollPosition ) );
    }
};

fScrollToSelector = function( sSelector ) {
    $( "html, body" ).animate( {
        "scrollTop": $( sSelector ).offset().top,
    }, "slow", fScrollingHandler );
    fScrollingHandler();
};

fInit = function() {
    fComputePositions();

    $stickyHeader = $( ".header" );
    $splashLogo = $( ".splash__logo" );
    $stickyHeaderBox = $( ".header__nav" );
    $splashMessage = $( ".splash__message" );

    $( window ).on( "scroll", fScrollingHandler );
    $( window ).on( "resize", fComputePositions );
};

export {
    fInit as init,
    fScrollingHandler as scrolling,
    fScrollToSelector as scrollTo,
};
