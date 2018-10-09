!function($){"use strict";var Tooltip=function(element,options){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",element,options)};Tooltip.VERSION="3.3.6",Tooltip.TRANSITION_DURATION=150,Tooltip.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}},Tooltip.prototype.init=function(type,element,options){if(this.enabled=!0,this.type=type,this.$element=$(element),this.options=this.getOptions(options),this.$viewport=this.options.viewport&&$($.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var triggers=this.options.trigger.split(" "),i=triggers.length;i--;){var trigger=triggers[i];if("click"==trigger)this.$element.on("click."+this.type,this.options.selector,$.proxy(this.toggle,this));else if("manual"!=trigger){var eventIn="hover"==trigger?"mouseenter":"focusin",eventOut="hover"==trigger?"mouseleave":"focusout";this.$element.on(eventIn+"."+this.type,this.options.selector,$.proxy(this.enter,this)),this.$element.on(eventOut+"."+this.type,this.options.selector,$.proxy(this.leave,this))}}this.options.selector?this._options=$.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS},Tooltip.prototype.getOptions=function(options){return(options=$.extend({},this.getDefaults(),this.$element.data(),options)).delay&&"number"==typeof options.delay&&(options.delay={show:options.delay,hide:options.delay}),options},Tooltip.prototype.getDelegateOptions=function(){var options={},defaults=this.getDefaults();return this._options&&$.each(this._options,function(key,value){defaults[key]!=value&&(options[key]=value)}),options},Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data("bs."+this.type);if(self||(self=new this.constructor(obj.currentTarget,this.getDelegateOptions()),$(obj.currentTarget).data("bs."+this.type,self)),obj instanceof $.Event&&(self.inState["focusin"==obj.type?"focus":"hover"]=!0),self.tip().hasClass("in")||"in"==self.hoverState)self.hoverState="in";else{if(clearTimeout(self.timeout),self.hoverState="in",!self.options.delay||!self.options.delay.show)return self.show();self.timeout=setTimeout(function(){"in"==self.hoverState&&self.show()},self.options.delay.show)}},Tooltip.prototype.isInStateTrue=function(){for(var key in this.inState)if(this.inState[key])return!0;return!1},Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget).data("bs."+this.type);if(self||(self=new this.constructor(obj.currentTarget,this.getDelegateOptions()),$(obj.currentTarget).data("bs."+this.type,self)),obj instanceof $.Event&&(self.inState["focusout"==obj.type?"focus":"hover"]=!1),!self.isInStateTrue()){if(clearTimeout(self.timeout),self.hoverState="out",!self.options.delay||!self.options.delay.hide)return self.hide();self.timeout=setTimeout(function(){"out"==self.hoverState&&self.hide()},self.options.delay.hide)}},Tooltip.prototype.show=function(){var e=$.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var inDom=$.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!inDom)return;var that=this,$tip=this.tip(),tipId=this.getUID(this.type);this.setContent(),$tip.attr("id",tipId),this.$element.attr("aria-describedby",tipId),this.options.animation&&$tip.addClass("fade");var placement="function"==typeof this.options.placement?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement,autoToken=/\s?auto?\s?/i,autoPlace=autoToken.test(placement);autoPlace&&(placement=placement.replace(autoToken,"")||"top"),$tip.detach().css({top:0,left:0,display:"block"}).addClass(placement).data("bs."+this.type,this),this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var pos=this.getPosition(),actualWidth=$tip[0].offsetWidth,actualHeight=$tip[0].offsetHeight;if(autoPlace){var orgPlacement=placement,viewportDim=this.getPosition(this.$viewport);placement="bottom"==placement&&pos.bottom+actualHeight>viewportDim.bottom?"top":"top"==placement&&pos.top-actualHeight<viewportDim.top?"bottom":"right"==placement&&pos.right+actualWidth>viewportDim.width?"left":"left"==placement&&pos.left-actualWidth<viewportDim.left?"right":placement,$tip.removeClass(orgPlacement).addClass(placement)}var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight);this.applyPlacement(calculatedOffset,placement);var complete=function(){var prevHoverState=that.hoverState;that.$element.trigger("shown.bs."+that.type),that.hoverState=null,"out"==prevHoverState&&that.leave(that)};$.support.transition&&this.$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete()}},Tooltip.prototype.applyPlacement=function(offset,placement){var $tip=this.tip(),width=$tip[0].offsetWidth,height=$tip[0].offsetHeight,marginTop=parseInt($tip.css("margin-top"),10),marginLeft=parseInt($tip.css("margin-left"),10);isNaN(marginTop)&&(marginTop=0),isNaN(marginLeft)&&(marginLeft=0),offset.top+=marginTop,offset.left+=marginLeft,$.offset.setOffset($tip[0],$.extend({using:function(props){$tip.css({top:Math.round(props.top),left:Math.round(props.left)})}},offset),0),$tip.addClass("in");var actualWidth=$tip[0].offsetWidth,actualHeight=$tip[0].offsetHeight;"top"==placement&&actualHeight!=height&&(offset.top=offset.top+height-actualHeight);var delta=this.getViewportAdjustedDelta(placement,offset,actualWidth,actualHeight);delta.left?offset.left+=delta.left:offset.top+=delta.top;var isVertical=/top|bottom/.test(placement),arrowDelta=isVertical?2*delta.left-width+actualWidth:2*delta.top-height+actualHeight,arrowOffsetPosition=isVertical?"offsetWidth":"offsetHeight";$tip.offset(offset),this.replaceArrow(arrowDelta,$tip[0][arrowOffsetPosition],isVertical)},Tooltip.prototype.replaceArrow=function(delta,dimension,isVertical){this.arrow().css(isVertical?"left":"top",50*(1-delta/dimension)+"%").css(isVertical?"top":"left","")},Tooltip.prototype.setContent=function(){var $tip=this.tip(),title=this.getTitle();$tip.find(".tooltip-inner")[this.options.html?"html":"text"](title),$tip.removeClass("fade in top bottom left right")},Tooltip.prototype.hide=function(callback){var that=this,$tip=$(this.$tip),e=$.Event("hide.bs."+this.type);function complete(){"in"!=that.hoverState&&$tip.detach(),that.$element.removeAttr("aria-describedby").trigger("hidden.bs."+that.type),callback&&callback()}if(this.$element.trigger(e),!e.isDefaultPrevented())return $tip.removeClass("in"),$.support.transition&&$tip.hasClass("fade")?$tip.one("bsTransitionEnd",complete).emulateTransitionEnd(Tooltip.TRANSITION_DURATION):complete(),this.hoverState=null,this},Tooltip.prototype.fixTitle=function(){var $e=this.$element;($e.attr("title")||"string"!=typeof $e.attr("data-original-title"))&&$e.attr("data-original-title",$e.attr("title")||"").attr("title","")},Tooltip.prototype.hasContent=function(){return this.getTitle()},Tooltip.prototype.getPosition=function($element){var el=($element=$element||this.$element)[0],isBody="BODY"==el.tagName,elRect=el.getBoundingClientRect();null==elRect.width&&(elRect=$.extend({},elRect,{width:elRect.right-elRect.left,height:elRect.bottom-elRect.top}));var elOffset=isBody?{top:0,left:0}:$element.offset(),scroll={scroll:isBody?document.documentElement.scrollTop||document.body.scrollTop:$element.scrollTop()},outerDims=isBody?{width:$(window).width(),height:$(window).height()}:null;return $.extend({},elRect,scroll,outerDims,elOffset)},Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return"bottom"==placement?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:"top"==placement?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:"left"==placement?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}},Tooltip.prototype.getViewportAdjustedDelta=function(placement,pos,actualWidth,actualHeight){var delta={top:0,left:0};if(!this.$viewport)return delta;var viewportPadding=this.options.viewport&&this.options.viewport.padding||0,viewportDimensions=this.getPosition(this.$viewport);if(/right|left/.test(placement)){var topEdgeOffset=pos.top-viewportPadding-viewportDimensions.scroll,bottomEdgeOffset=pos.top+viewportPadding-viewportDimensions.scroll+actualHeight;topEdgeOffset<viewportDimensions.top?delta.top=viewportDimensions.top-topEdgeOffset:bottomEdgeOffset>viewportDimensions.top+viewportDimensions.height&&(delta.top=viewportDimensions.top+viewportDimensions.height-bottomEdgeOffset)}else{var leftEdgeOffset=pos.left-viewportPadding,rightEdgeOffset=pos.left+viewportPadding+actualWidth;leftEdgeOffset<viewportDimensions.left?delta.left=viewportDimensions.left-leftEdgeOffset:rightEdgeOffset>viewportDimensions.right&&(delta.left=viewportDimensions.left+viewportDimensions.width-rightEdgeOffset)}return delta},Tooltip.prototype.getTitle=function(){var $e=this.$element,o=this.options;return $e.attr("data-original-title")||("function"==typeof o.title?o.title.call($e[0]):o.title)},Tooltip.prototype.getUID=function(prefix){for(;prefix+=~~(1e6*Math.random()),document.getElementById(prefix););return prefix},Tooltip.prototype.tip=function(){if(!this.$tip&&(this.$tip=$(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},Tooltip.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},Tooltip.prototype.enable=function(){this.enabled=!0},Tooltip.prototype.disable=function(){this.enabled=!1},Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled},Tooltip.prototype.toggle=function(e){var self=this;e&&((self=$(e.currentTarget).data("bs."+this.type))||(self=new this.constructor(e.currentTarget,this.getDelegateOptions()),$(e.currentTarget).data("bs."+this.type,self))),e?(self.inState.click=!self.inState.click,self.isInStateTrue()?self.enter(self):self.leave(self)):self.tip().hasClass("in")?self.leave(self):self.enter(self)},Tooltip.prototype.destroy=function(){var that=this;clearTimeout(this.timeout),this.hide(function(){that.$element.off("."+that.type).removeData("bs."+that.type),that.$tip&&that.$tip.detach(),that.$tip=null,that.$arrow=null,that.$viewport=null})};var old=$.fn.tooltip;$.fn.tooltip=function(option){return this.each(function(){var $this=$(this),data=$this.data("bs.tooltip"),options="object"==typeof option&&option;!data&&/destroy|hide/.test(option)||(data||$this.data("bs.tooltip",data=new Tooltip(this,options)),"string"==typeof option&&data[option]())})},$.fn.tooltip.Constructor=Tooltip,$.fn.tooltip.noConflict=function(){return $.fn.tooltip=old,this}}(jQuery);