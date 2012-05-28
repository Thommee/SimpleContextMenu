/**
 * Plugin jQuery simpleContextMenu
 * 
 * @author    Tomasz Szuba
 * @mail      tomasz.szuba@allegro.pl
 * @since     2012.03.07
 * @version   2012.03.09 - 2.0
 *
 * @desc       simpleContextMenu to plugin służący do generowania
 *             menu kontekstowego - zamiennika domyślnego menu przeglądarki
 * 
 * Użycie:  $(container).simpleContextMenu(options);
 * 
 * Options:
 *     menu      : function(object) { return [array of menu item objects] },
 *     showDelay : int,
 *     hideDelay : int,
 *  
 *  menu - funkcja zwracająca tablice obiektów - menuItem'sów.
 *  Jako parametr przyjmuje obiekt dom na którym wykonano pokazanie menu
 *  
 *  MenuItem - to obitkt (pojedyncza pozycja menu).
 *  
 *  Może zawierać następujące parametry:
 *  
 *  - href    : url address (can be null),         // atrybut "href"
 *  - rel     : rel attribute (can be null),       // atrybut "rel"
 *  - title   : title attribute (can be null),     // atrybut "title"
 *  - onclick : onclick attribute (can be null),   // atrybut "onclick" 
 *  - target  : url target (default "_self"),      // atrybut "target",
 *  - type    : item type (normal|separator|header null=normal)  // typ item'a,
 *  - submenu : function(o) { return [array of menu items] }     // submenu
 *   
 *  
 *  Przykład uzycia:
 *  

$('html').simpleContextMenu({

    menu: function(o) {
        return [
            {type: 'header', text: 'Sample header'},        
            {type: 'separator'},        
            {text: 'Item #1', href: '#'},        
            {text: 'JS alert', href: '#', onclick: 'alert("sample alert"); return false'},        
            {type: 'separator'},        
            {text: 'with submenu', href: '#', submenu:
                function(o){
                    return [
                        {text: 'Sub #1', href: '#'},        
                        {text: 'Sub #2', href: '#'},        
                        {type: 'separator'},        
                        {text: 'Google.com', href: 'http://google.com', target: '_blank'},         
                    ]
                }
            },        
            {text: 'Wirtualna Polska', href: 'http://www.wp.pl', target: '_blank', title: 'Wirtualna Polska'}        

        ]
    }
})

 *
**/



(function ($) {
  $.fn.simpleContextMenu = function (options) {

    var defaults = {
        menu      : function(){ return [] },
        container : 'simpleContextMenu',
        showDelay     : 300,
        hideDelay     : 200,
        minWidth      : 150
    }
    options =  $.extend(defaults, options);
    var o = $(this);
    
    
    function prepareMenu(menu) 
    {   
        var result = $('<ul></ul>').css({ minWidth: options.minWidth });
        for (k in  menu) 
            result.append(prepareMenuItem(menu[k]))
        return result;
    }
    
    function prepareMenuItem(item) 
    {
        var li = $('<li></li>');

        if (item.type == 'separator')
            return li.addClass('separator');
        
        if (item.type == 'header')
            return li.addClass('header').text(item.text);
        
        var a = $('<a></a>').appendTo(li);
        
        a.html(item.text+(item.submenu ? '<span></span>' : ''))
        a.attr('href',    item.href    ? item.href       : '')
        a.attr('target',  item.target  ? item.target     : '_self') 
        a.attr('onclick', item.onclick ? item.onclick    : '') 
        a.attr('rel',     item.rel     ? item.rel        : '') 
        a.attr('title',   item.title   ? item.title      : '') 
        
        if (item.submenu)
            li.addClass('more').append(prepareMenu(item.submenu(o)))
        
     return li;
    }
    
    function run(e,o)
    {
        e.preventDefault();
        $('#'+options.container).remove()
        $('<div></div>').attr({id: options.container})
        .css({position: 'absolute', left: e.pageX, top: e.pageY})
        .appendTo('body')
        .html(prepareMenu(options.menu(o)))
        e.stopPropagation();
    }
    
    function hideMenu() {
        $('#'+options.container).stop().animate({ opacity: 0 },50,'swing',
        function(){ $('#'+options.container).remove()   })
    }
 
    $('*').live('mousedown',function(e){   
        if ( $('#'+options.container).find($(e.target)).length >0 ) 
           e.stopPropagation()
        else
           hideMenu()
    })
    
    $('#'+options.container).live('mouseup',hideMenu);
    
    $('#'+options.container+' li').live('mouseover', function(){
        
        $(this).parent().find('ul').not($(this).find('ul')).clearQueue()
        .delay(options.hideDelay).hide(10);
        

        $(this).children('ul').clearQueue().css({right: -1 * options.minWidth, top: 0})
        .delay(options.showDelay).show(100);         
    }); 
     
    $(this).live('contextmenu', function(e){ run(e,$(this)) } ); 
   
  }; // eo plugin
})(jQuery);





