
$(document).ready(function(){
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    
    
    function handleDrop(e) {
    console.log("start");
    e.stopPropagation(); e.preventDefault();
    var files = e.dataTransfer.files, f = files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        if(!rABS) data = new Uint8Array(data);
        var workbook = XLSX.read(data, {type: rABS ? 'binary' : 'array'});
        $('.jumbotron').slideUp()
        mapToView(XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {header:1}));
       
    };

        if(rABS) reader.readAsBinaryString(f); else reader.readAsArrayBuffer(f);
    }

    var drop_dom_element = document.getElementById('file');
    drop_dom_element.addEventListener('drop', handleDrop, true);

    
    function template(row){
        if(row.length === 1){
            return "<h2 class='post-header'>" + row[0] + "</h2><div class='comment-list'>";
        }else{
            return "<div class='comment'><h4>" + row[0] + "</h4><p>" + row[1] + "</p></div>";
        }
    }

    $('body').on('click', '.post-header', function(){
        
        var $this = $(this);
        var $sib = $(this).siblings();

        if($this.hasClass('com-hide')){
            $sib.slideDown();
            $this.removeClass('com-hide')
        }else{
            $sib.slideUp();
            $this.addClass('com-hide')
        }
        
        
    })

    function mapToView(json){
        var $m =  $('.marketing .list');
        var isF = true;
        var str = "";
        $.each(json, function(index, val){
            
            if(val.length>0 && index > 6){
               
                if(isF){
                    str = "<div class='post'>"
                    isF = false;
                }else{
                    if(val.length===1){
                        str += "<div class='add-comment'><textarea></textarea></div></div></div><div class='post'>"
                    }
                    
                }
                str+=template(val);

               
            }
            
        })
        $m.append(str + "</div></div>")
       
    }



})


