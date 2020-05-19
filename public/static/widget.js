
function callChatUI(uri){
    var imported = document.createElement('script');
imported.type="text/javascript";
imported.src = 'http://code.jquery.com/jquery-3.5.0.min.js';
document.head.appendChild(imported);

var head  = document.getElementsByTagName('head')[0];
var link  = document.createElement('link');
link.id   = "formChat";
link.rel  = 'stylesheet';
link.type = 'text/css';
link.href = 'https://formbux.herokuapp.com/static/widget.css';
link.media = 'all';
head.appendChild(link);

setTimeout(()=>{
    $(document).ready(function(){
        // alert("all");
        var chatIC=document.createElement("span");
        chatIC.className="icChat";
        document.body.appendChild(chatIC);
        $('span.icChat').html('<svg width="25" height="25" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg"><path d="M23.295 24.412a.987.987 0 0 1-1.123-.43L19.9 20.358H9.527c-1.392 0-2.523-1.153-2.523-2.57V16.3c0-.563.448-1.02 1-1.02.553 0 1 .457 1 1.02v1.485c0 .295.235.533.523.533h10.92c.036 0 .067.018.103.022a.96.96 0 0 1 .527.224.984.984 0 0 1 .14.15c.023.026.054.043.073.075l.725 1.154V9.7a.528.528 0 0 0-.523-.532h-1.48c-.55 0-1-.457-1-1.02 0-.56.45-1.018 1-1.018h1.48c1.392 0 2.524 1.152 2.524 2.57V23.433c0 .452-.293.85-.72.978zM14.49 13.226H4.116L1.844 16.85a.997.997 0 0 1-1.124.43 1.017 1.017 0 0 1-.72-.978V2.57C0 1.152 1.132 0 2.523 0H14.49c1.39 0 2.52 1.152 2.52 2.57v8.085c0 1.418-1.13 2.57-2.52 2.57zm.52-10.656a.528.528 0 0 0-.52-.532H2.522c-.288 0-.522.24-.522.532v10.242l.726-1.153c.02-.032.05-.05.07-.076a.897.897 0 0 1 .296-.256.92.92 0 0 1 .372-.118c.037-.004.068-.022.104-.022h10.92c.288 0 .522-.238.522-.533V2.57z" fill="#FFF" fill-rule="evenodd"></path></svg>');

        var container=document.createElement("div");
        container.className="fcContain d-none";
        
        var form=document.createElement("iframe");
        var span=document.createElement("span");
        span.className="close";
        form.className="formChat";
        form.src=uri;
        container.appendChild(span);
        container.appendChild(form);
        document.body.appendChild(container);
        // console.log(link);
        $('fcContain').html('<span class="close"></span>')
        $('span.icChat').click(function(){
            $(this).hide();
            // $('iframe.formChat').removeClass("d-none");
            $('div.fcContain').removeClass("d-none");
        });
        $('span.close').text("x");
        $('span.close').click(function(){
            $('div.fcContain').addClass("d-none");
            $('span.icChat').show();
        });
     });
     
},1000)
}
