###
 * flatLand! - code design things.
 *
 * COFFEE Document - /js/script.js
 *
 * coded by leny @ flatLand!
 *
 * start: 2013-03-25
###

# @codekit-prepend class.range-inspector.coffee

bStickyHeaderIsVisible = false
$splash = null
$splashLogo = null
$stickyHeader = null
$stickyHeaderBox = null
iStickyHeaderStep = 0

$codeLangagesHolder = null

oSectionStepsInspector = new RangeInspector()
sCurrentSection = null

bIsMobile = !!navigator.userAgent.match /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
bIsIpad = !!navigator.userAgent.match /iPad/i

computeScrollPositions = ->
    iStickyHeaderStep = $splash.find( 'span.name' ).offset().top - 9
    oSectionStepsInspector.clear()
    $( 'section:has( .content )' ).each ->
        iStart = $( @ ).offset().top - 100
        iStop = $( @ ).height() + iStart + 200
        sName = $( @ ).attr 'id'
        oSectionStepsInspector.add iStart, iStop, sName

scrolling = ->
    iCurrentScrollPosition = if document.body.scrollTop > document.documentElement.scrollTop then document.body.scrollTop else document.documentElement.scrollTop
    if iCurrentScrollPosition >= iStickyHeaderStep and bStickyHeaderIsVisible is no
        bStickyHeaderIsVisible = yes
        $stickyHeader.show()
        $splashLogo.hide()
        $stickyHeaderBox.fadeIn 'slow'
        $splash.find( '.message' ).fadeOut 'slow'
    if iCurrentScrollPosition < iStickyHeaderStep and bStickyHeaderIsVisible is yes
        bStickyHeaderIsVisible = no
        $splashLogo.show()
        $stickyHeader.hide()
        $stickyHeaderBox.hide()
    if oSectionStepsInspector.getKey( iCurrentScrollPosition ) isnt sCurrentSection
        sCurrentSection = oSectionStepsInspector.getKey( iCurrentScrollPosition )
        changeSection sCurrentSection

changeSection = ( sNewSection ) ->
    $stickyHeaderBox.find( 'a.active' ).removeClass 'active'
    $stickyHeaderBox.find( 'a[href="#' + sNewSection + '"]' ).addClass 'active'

prepareLangageAnimation = ( bLaunchAnimation ) ->
    aLangageWidths = ( $( $langage ).width() for $langage in $codeLangagesHolder.find( 'span' ) )
    iBiggestLangageWidth = Math.max.apply Math, aLangageWidths
    $codeLangagesHolder
        .find( 'strong' ).width( iBiggestLangageWidth ).end()
        .find( 'span' ).hide()
        .first().show()
    langageHolderAnimationStart() if bLaunchAnimation

langageHolderAnimationStart = ( e ) ->
    e?.preventDefault?()
    $codeLangagesHolder.find( 'span:visible' ).fadeOut 'fast', ->
        if $( @ ).next().size()
            $( @ ).next().fadeIn 'fast', langageHolderAnimationStart
        else
            $( @ ).siblings().first().fadeIn 'fast', langageHolderAnimationStart

statePopped = ( e ) ->
    e.preventDefault();
    if e.state?
        scrollToSelector '#' + e.state

changeHistory = ( sSection ) ->
    sSection = sSection.replace( '#', '' )
    history.pushState sSection, null, sSection

scrollToSelector = ( sSelector ) ->
    $( 'html, body' ).animate
        scrollTop: $( sSelector ).offset().top
    , 'slow', ->
        scrolling()
    scrolling()

internalLinkClicked = ( e ) ->
    e.preventDefault()
    sTarget = $( @ ).attr 'href'
    scrollToSelector sTarget
    changeHistory( sTarget ) if !window.isLessThanIE9

phoneLinkClicked = ( e ) ->
    e.preventDefault()
    $( @ ).find( 'span' ).fadeToggle 'fast'

$ ->
    $splash = $( '#splash' )
    $splashLogo = $splash.find 'span.logo'
    $stickyHeader = $( 'header#main' )
    $stickyHeaderBox = $stickyHeader.find 'nav'
    $codeLangagesHolder = $( '#code .content blockquote' )

    $( 'a[rel="external"]' ).attr 'target', '_new'
    $( 'a[rel="internal"]' ).on 'click', internalLinkClicked
    $( '#splash .message' ).on 'click', ->
        scrollToSelector '#intro'

    prepareLangageAnimation( !window.isLessThanIE9 )

    $( window ).on 'popstate', statePopped

    if !(location.pathname is '' or location.pathname is '/' or location.pathname is '/index.html')
        scrollToSelector location.pathname.replace '/', '#'

    if bIsMobile is no
        computeScrollPositions()

        $( window ).on 'scroll', scrolling
        $( window ).on 'resize', computeScrollPositions

        $( '#phone' ).on 'click', phoneLinkClicked
    else
        setTimeout ->
            window.scrollTo 0, 1
        , 0

