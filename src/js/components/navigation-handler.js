/* leny/flatland.be
 *
 * /src/js/components/navigation-handler.js - Internal navigation handler
 *
 * coded by leny@flatLand!
 * started at 09/10/2016
 */

import $ from "jquery";

import { scrollTo } from "./scroll-observer";

const NAV_LINK_ACTIVE_CLASS = "nav__link--active";

let sCurrentSection = null,
    $stickyHeaderBox,
    fChangeSection, fInternalLinkHandler, fChangeHistory, fHistoryStateChanged, fInit;

fChangeSection = function( sNewSection ) {
    $( `.${ NAV_LINK_ACTIVE_CLASS }` ).removeClass( NAV_LINK_ACTIVE_CLASS );
    $( `.nav__link--${ sNewSection }` ).addClass( NAV_LINK_ACTIVE_CLASS );
    sCurrentSection = sNewSection;
};

fInternalLinkHandler = function( oEvent ) {
    let sTarget = $( this ).attr( "href" );

    oEvent.preventDefault();
    scrollTo( sTarget );
    fChangeHistory( sTarget );
};

fChangeHistory = function( sSection ) {
    history.pushState( sSection, null, sSection );
};

fHistoryStateChanged = function( oEvent ) {
    oEvent.preventDefault();
    oEvent.state && scrollTo( oEvent.state );
};

fInit = function() {
    $stickyHeaderBox = $( ".header__nav" );

    $( `a[rel="internal"]` ).on( "click", fInternalLinkHandler );

    $( window ).on( "popstate", fHistoryStateChanged );
};

export {
    sCurrentSection as currentSection,
    fChangeSection as changeSection,
    fInit as init,
};
