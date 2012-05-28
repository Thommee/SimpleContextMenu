$(document).ready(function()
{

    
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
                            {text: 'Google.com', href: 'http://google.com', target: '_blank'},         
                        ]
                    }
                },        
                {text: 'Wirtualna Polska', href: 'http://www.wp.pl', target: '_blank', title: 'wu pe'},        
                {text: 'Wirtualna Polska', href: 'http://www.wp.pl', target: '_blank', title: 'wu pe'},        
                {text: 'Wirtualna Polska', href: 'http://www.wp.pl', target: '_blank', title: 'wu pe'},        
                {text: 'Wirtualna Polska', href: 'http://www.wp.pl', target: '_blank', title: 'wu pe'}        

            ]
        }
    })
    
//    

//    
    
});
