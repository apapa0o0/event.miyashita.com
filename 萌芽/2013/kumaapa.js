var DragHandler = {

// private property.
_oElem : null,

// public method. Attach drag handler to an element.
attach : function(oElem) {
		oElem.onmousedown = DragHandler._dragBegin;
		// callbacks
		oElem.dragBegin = new Function();
		oElem.drag = new Function();
		oElem.dragEnd = new Function();
		return oElem;
},

// private method. Begin drag process.
_dragBegin : function(e) {
		dragflag = 1;
		donflag = 1;
		dragable1.innerHTML = "<img src='images/apatsukami.gif'>";
		kumapan.innerHTML = "<img src='images/dash.gif'>";
		var oElem = DragHandler._oElem = this;
		if (isNaN(parseInt(oElem.style.left))) { oElem.style.left = ""+(window.innerWidth/2-10)+'px'; }
		if (isNaN(parseInt(oElem.style.top))) { oElem.style.top = '0px'; }
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);
		e = e ? e : window.event;
		oElem.style.left = e.clientX-19 + 'px';
		oElem.style.top = e.clientY-7 + 'px';
		oElem.mouseX = e.clientX;
		oElem.mouseY = e.clientY;
		oElem.dragBegin(oElem, x, y);
		document.onmousemove = DragHandler._drag;
		document.onmouseup = DragHandler._dragEnd;
		return false;
},

// private method. Drag (move) element.
_drag : function(e) {
		var oElem = DragHandler._oElem;
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);
		e = e ? e : window.event;
		oElem.style.left = e.clientX-19 + 'px';
		oElem.style.top = e.clientY-7 + 'px';
		oElem.mouseX = e.clientX;
		oElem.mouseY = e.clientY;
		oElem.drag(oElem, x, y);
		return false;
},

// private method. Stop drag process.
_dragEnd : function() {
		var oElem = DragHandler._oElem;
		var x = parseInt(oElem.style.left);
		var y = parseInt(oElem.style.top);
		count = y;
		s = 1;
		dragflag = -1;
		oElem.dragEnd(oElem, x, y);
		document.onmousemove = null;
		document.onmouseup = null;
		DragHandler._oElem = null;
		dragable1.innerHTML = "<img src='images/apa.gif'>";
	}
};

// =============
CanvasRenderingContext2D.prototype.strokeEllipse = function(left, top, right, bottom) {
  var halfWidth = (right - left) / 2.0;
  var halfHeight = (bottom - top) / 2.0;
  var x0 = left + halfWidth;
  var y1 = top + halfHeight;
  this.beginPath();
  var cw = 4.0 * (Math.sqrt(2.0) - 1.0) * halfWidth / 3.0;
  var ch = 4.0 * (Math.sqrt(2.0) - 1.0) * halfHeight / 6.0;
  this.moveTo(x0, top);
  this.bezierCurveTo(x0 + cw, top, right, y1 - ch, right, y1);
  this.bezierCurveTo(right, y1 + ch, x0 + cw, bottom, x0, bottom);
  this.bezierCurveTo(x0 - cw, bottom, left, y1 + ch, left, y1);
  this.bezierCurveTo(left, y1 - ch, x0 - cw, top, x0, top);
  this.stroke();
};
// =============

function beginScript() {
	dragable1 = DragHandler.attach(document.getElementById('apapa'));
	kumapan = document.getElementById("kumapan");
	kusakusa = document.getElementById("kusakusa");
	kumapan.style.left=""+window.innerWidth/2-60+"px";
	dragable1.style.left=""+window.innerWidth/2+"px";
	kusakusa.style.left="-"+(1980-window.innerWidth)/2+"px";
	dragable1.style.top=""+document.body.clientHeight-80+"px";
	count=0;
	a = 0.0098;
	s = 1;
	dragflag=0;
	donflag = 0;
	nigetime=0;
	tmpwidth=window.innerWidth;
	//document.getElementsByTagName("body")[0].onscroll = function() {
	document.onscroll = function() {
		document.getElementsByTagName("body")[0].style.backgroundPosition="0 -"+(document.body.scrollTop/10);
	}
	window.onresize = function() {
		kumapan.style.left=""+(Number(kumapan.style.left.split("px")[0])+(window.innerWidth-tmpwidth)/2)+"px";
		dragable1.style.left=""+(Number(dragable1.style.left.split("px")[0])+(window.innerWidth-tmpwidth)/2)+"px";
		kusakusa.style.left="-"+(1980-window.innerWidth)/2+"px";
		dragable1.style.top=""+document.body.clientHeight-80+"px";
		tmpwidth = window.innerWidth;
	}
	kumapan.onmouseover=nige;
	canvas = document.getElementById('kusakusa');
	if ( ! canvas || ! canvas.getContext ) { return false; }
	ctx = canvas.getContext('2d');
	ctx.fillStyle = 'rgb(0, 224, 102)';
	ctx.strokeStyle = 'rgb(0, 255, 152)';
	setInterval("update()",10);
	setInterval("drawkusa()",1600);
}
function move(e){
	mx = e.clientX;
	my = e.clientY;
}
function nige(e) {
	nigetime=300;
	mx = e.clientX;
	window.document.onmousemove = move;
}
function top2() {
	nullid=setInterval("nullscroll(10)",10);
}
function about() {
	nullid=setInterval("nullscroll(700)",10);
}
function contents() {
	nullid=setInterval("nullscroll(1100)",10);
}
function nullscroll(y) {
	if(document.body.scrollTop-y > 0) {
		if(document.body.scrollTop-y < 30) {
			window.scroll(0,document.body.scrollTop-1);
		} else {
			window.scroll(0,document.body.scrollTop-30);
		}
	} else if(document.body.scrollTop-y < 0) {
		if(document.body.scrollTop-y > -30) {
			window.scroll(0,document.body.scrollTop+1);
		} else {
			window.scroll(0,document.body.scrollTop+30);
		}
	} else {
		clearInterval(nullid);
	}
}
function drawkusa() {
	if(donflag == 0) {
		var x = (1980-window.innerWidth)/2+Math.floor( Math.random() * window.innerWidth );
		var y = Math.floor( Math.random() * 20 );
		ctx.beginPath();
		ctx.moveTo(x,y+3);
		ctx.lineTo(x,y+30);
		ctx.stroke();
		ctx.strokeEllipse(x,y,x+12,y+6);
		ctx.fill();
		ctx.strokeEllipse(x-12,y,x,y+6);
		ctx.fill();
	}
}
  function update() {
		s++;
		if(nigetime > 0) {
			kumapan.innerHTML = "<img src='images/nige.gif'>";
			if(nigetime == 1) {
				if(dragflag != 0) {
					kumapan.innerHTML = "<img src='images/dash.gif'>";
				} else {
					kumapan.innerHTML = "<img src='images/kumapan.gif'>";
				}
			}
			kumapan.style.webkitTransform="scale("+(Number(kumapan.style.left.split("px")[0])-mx+20)/Math.abs(Number(kumapan.style.left.split("px")[0])-mx+20) +",1)";
			kumapan.style.left=""+(Number(kumapan.style.left.split("px")[0])+(100/(Math.abs(Number(kumapan.style.left.split("px")[0])-mx+20)+5))*((Number(kumapan.style.left.split("px")[0])-mx+20)/Math.abs(Number(kumapan.style.left.split("px")[0])-mx+20)))+"px";
			nigetime--;
		}
		count+=a*s*s;
		if(count >= document.body.clientHeight -80 && dragflag!= 1) {
			if(dragflag != 0) {
				dragflag = 0;
				donflag = 0;
				dragable1.style.top=document.body.clientHeight -80;
				kumapan.innerHTML = "<img src='images/kumapan.gif'>";
				if(Number(kumapan.style.left.split("px")[0]) > Number(dragable1.style.left.split("px")[0])-40 && Number(kumapan.style.left.split("px")[0]) < Number(dragable1.style.left.split("px")[0])+40) {
					dragable1.innerHTML = "<img src='images/apabataki.gif'>";
					kumapan.innerHTML = "<img src='images/taorekuma.png'>";
					donflag = 1;
				}
			}else {
			}
		} else if(dragflag== -1){
			dragable1.style.top=count;
		}
		if(dragflag == 1 && nigetime < 1) {
			kumapan.style.left=""+(Number(kumapan.style.left.split("px")[0])+(Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))/100)+"px";
			kumapan.style.webkitTransform="scale("+  (Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))/Math.abs(Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))  +",1)";
			dragable1.style.webkitTransform="scale("+  (Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))/Math.abs(Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))  +",1)";
		}
		if(dragflag == -1 && nigetime < 1) {
			kumapan.style.left=""+(Number(kumapan.style.left.split("px")[0])+7*(Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))/Math.abs(Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0])))+"px";
			kumapan.style.webkitTransform="scale("+  (Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))/Math.abs(Number(dragable1.style.left.split("px")[0])-Number(kumapan.style.left.split("px")[0]))  +",1)";
		}
	//dragable1.innerHTML=count;
  }
// =============

// Multiple onload function created by: Simon Willison
// http://simon.incutio.com/archive/2004/05/26/addLoadEvent
function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

addLoadEvent(function() {
  beginScript();
});
