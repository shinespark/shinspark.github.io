var __slice=Array.prototype.slice;(function(a){var b;return a.fn.sketch=function(){var c,d,e;d=arguments[0],c=2<=arguments.length?__slice.call(arguments,1):[],this.length>1&&a.error("Sketch.js can only be called on one element at a time."),e=this.data("sketch");if(typeof d!="string"||!e)return e?e:(this.data("sketch",new b(this.get(0),d)),this);if(!e[d])return a.error("Sketch.js did not recognize the given command.");if(typeof e[d]=="function")return e[d].apply(e,c);if(c.length===0)return e[d];if(c.length===1)return e[d]=c[0]},b=function(){function b(b,c){this.el=b,this.canvas=a(b),this.context=b.getContext("2d"),this.options=a.extend({toolLinks:!0,defaultTool:"marker",defaultColor:"#000000",defaultSize:5},c),this.painting=!1,this.color=this.options.defaultColor,this.size=this.options.defaultSize,this.tool=this.options.defaultTool,this.actions=[],this.action=[],this.canvas.bind("click mousedown mouseup mousemove mouseleave mouseout touchstart touchmove touchend touchcancel",this.onEvent),this.options.toolLinks&&a("body").delegate('a[href="#'+this.canvas.attr("id")+'"]',"click",function(b){var c,d,e,f,g,h,i;d=a(this),c=a(d.attr("href")),f=c.data("sketch"),i=["color","size","tool"];for(g=0,h=i.length;g<h;g++)e=i[g],d.attr("data-"+e)&&f.set(e,a(this).attr("data-"+e));return a(this).attr("data-download")&&f.download(a(this).attr("data-download")),!1})}return b.prototype.download=function(a){var b;return a||(a="png"),a==="jpg"&&(a="jpeg"),b="image/"+a,window.open(this.el.toDataURL(b))},b.prototype.set=function(a,b){return this[a]=b,this.canvas.trigger("sketch.change"+a,b)},b.prototype.startPainting=function(){return this.painting=!0,this.action={tool:this.tool,color:this.color,size:parseFloat(this.size),events:[]}},b.prototype.stopPainting=function(){return this.action&&this.actions.push(this.action),this.painting=!1,this.action=null,this.redraw()},b.prototype.onEvent=function(b){return b.originalEvent&&b.originalEvent.targetTouches&&(b.pageX=b.originalEvent.targetTouches[0].pageX,b.pageY=b.originalEvent.targetTouches[0].pageY),a.sketch.tools[a(this).data("sketch").tool].onEvent.call(a(this).data("sketch"),b),b.preventDefault(),!1},b.prototype.redraw=function(){var b;this.el.width=this.canvas.width(),this.context=this.el.getContext("2d"),b=this,a.each(this.actions,function(){if(this.tool)return a.sketch.tools[this.tool].draw.call(b,this)});if(this.painting&&this.action)return a.sketch.tools[this.action.tool].draw.call(b,this.action)},b}(),a.sketch={tools:{}},a.sketch.tools.marker={onEvent:function(a){switch(a.type){case"mousedown":case"touchstart":this.startPainting();break;case"mouseup":case"mouseout":case"mouseleave":case"touchend":case"touchcancel":this.stopPainting()}if(this.painting)return this.action.events.push({x:a.pageX-this.canvas.offset().left,y:a.pageY-this.canvas.offset().top,event:a.type}),this.redraw()},draw:function(a){var b,c,d,e,f;this.context.lineJoin="round",this.context.lineCap="round",this.context.beginPath(),this.context.moveTo(a.events[0].x,a.events[0].y),f=a.events;for(d=0,e=f.length;d<e;d++)b=f[d],this.context.lineTo(b.x,b.y),c=b;return this.context.strokeStyle=a.color,this.context.lineWidth=a.size,this.context.stroke()}},a.sketch.tools.eraser={onEvent:function(b){return a.sketch.tools.marker.onEvent.call(this,b)},draw:function(b){var c;return c=this.context.globalCompositeOperation,this.context.globalCompositeOperation="copy",b.color="rgba(0,0,0,0)",a.sketch.tools.marker.draw.call(this,b),this.context.globalCompositeOperation=c}}})(jQuery);
$(function() {
  var w = $(window).width();
  var h = $(window).height();
  $('#colors-sketch')
    .attr('width', w)
    .attr('height', h * 0.9);

  $.each(['#f00', '#ff0', '#0f0', '#0ff', '#00f', '#f0f', '#000', '#fff'], function() {
    $('.color-tools').append("<a href='#colors-sketch' class='change-color' data-color='" + this + "' style='background: " + this + ";'></a> ");
  });
  $('#colors-sketch').sketch();

  $(window).resize(function(){
    var w = $(window).width();
    var h = $(window).height();
    $('#colors-sketch')
      .attr('width', w)
      .attr('height', h * 0.9);
  })
});
