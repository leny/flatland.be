/* leny/flatland.be
 *
 * /src/js/utils/range-inspector.js
 *
 * coded by leny@flatLand!
 * started at 09/10/2016
 */

export default class RangeInspector {
    constructor() {
        this.clear();
    }

    add( { key, start, stop } ) {
        this.ranges.push( {
            key,
            "start": Math.floor( start ),
            "stop": Math.floor( stop ),
        } );
    }

    clear() {
        this.ranges = [];
    }

    getKey( iPosition ) {
        for ( let { key, start, stop } of this.ranges ) {
            if ( start <= iPosition && iPosition <= stop ) {
                return key;
            }
        }

        return null;
    }
}
