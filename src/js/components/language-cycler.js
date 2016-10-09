/* leny/flatland.be
 *
 * /src/js/components/language-cycler.js - Language cycler
 *
 * coded by leny@flatLand!
 * started at 09/10/2016
 */


import $ from "jquery";

export default function( $container ) {
    let fAnimate = () => {
        $container.find( "span:visible" ).fadeOut( "fast", function() {
            let $this = $( this ),
                $next = $this.next();

            $next.length || ( $next = $this.siblings().first() );

            $next.fadeIn( "fast", fAnimate );
        } );
    };

    $container
        .find( "strong" )
            .width( Math.max( ...( $container.find( "span" ).toArray().map( ( $elt ) => $( $elt ).width() ) ) ) );

    fAnimate();
}
