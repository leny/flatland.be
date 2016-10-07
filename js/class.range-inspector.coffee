###
 * flatLand! - code design things.
 *
 * COFFEE Document - /js/class.range-inspector.coffee
 *
 * coded by leny @ flatLand!
 *
 * start: 2013-03-26
###

class RangeInspector
    aRanges: []

    add: ( iStart, iStop, sKey ) ->
        this.aRanges.push
            start: iStart >> 0
            stop: iStop >> 0
            key: sKey

    clear: ->
        this.aRanges = []

    getKey: ( iPosition ) ->
        sReturnValue = null
        for oRange in this.aRanges
            if oRange.start <= iPosition <= oRange.stop
                sReturnValue = oRange.key
        return sReturnValue
