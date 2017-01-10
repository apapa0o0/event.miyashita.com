/*--setup--*/
window.onload=function() {
tab.setup = {
   tabs: document.getElementById('tab').getElementsByTagName('li'),
   pages: [
      document.getElementById('mainc'),
      document.getElementById('program'),
      document.getElementById('form'),
      document.getElementById('point'),
      document.getElementById('admin')
      ]
}
tab.init();
}
/*--setup end--*/
  
var tab = {
   init: function(){
      var tabs = this.setup.tabs;
      var pages = this.setup.pages;
  
      for(i=0; i<pages.length; i++) {
         if(i !== 0) pages[i].style.display = 'none';
         tabs[i].onclick = function(){ tab.showpage(this); return false; };
      }
      
      //とりあえず
      var page_id = document.URL.split("#")[1];
      if(page_id){
	      document.getElementById('a_top').click();
      }
      
      if(page_id == "guest01" || page_id == "guest02" || page_id == "guest03"){
      	tab.showpage(document.getElementById('tab').getElementsByTagName('li')[1]);
      }
      if(page_id == "guest01"){
	  	document.getElementById('a_guest01').click();
      }else if(page_id == "guest02"){
      	document.getElementById('a_guest02').click();
      }else if(page_id == "guest03"){
      	document.getElementById('a_guest03').click();
      }
      
      //とりあえず
      if(page_id == "mainc"){
	  	tab.showpage(document.getElementById('tab').getElementsByTagName('li')[0]);   
      }else if(page_id == "program"){
	  	tab.showpage(document.getElementById('tab').getElementsByTagName('li')[1]);  
      }else if(page_id == "form"){
	  	tab.showpage(document.getElementById('tab').getElementsByTagName('li')[2]);  
      }else if(page_id == "point"){
	  	tab.showpage(document.getElementById('tab').getElementsByTagName('li')[3]);  
      }else if(page_id == "admin"){
	  	tab.showpage(document.getElementById('tab').getElementsByTagName('li')[4]);  
      }
   },
  
   showpage: function(obj){
      var tabs = this.setup.tabs;
      var pages = this.setup.pages;
      var num;
  
      for(num=0; num<tabs.length; num++) {
         if(tabs[num] === obj) break;
      }
  
      for(var i=0; i<pages.length; i++) {
         if(i == num) {
            pages[num].style.display = 'block';
            tabs[num].className = 'selected';
         }
         else{
            pages[i].style.display = 'none';
            tabs[i].className = null;
         }
      }
   }
}