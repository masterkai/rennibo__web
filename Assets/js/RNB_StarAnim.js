(function (lib, img, cjs, ss, an) {

var p; // shortcut to reference prototypes
lib.ssMetadata = [];


// symbols:



(lib.imgStar = function() {
	this.initialize(img.imgStar);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,38,35);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.star = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.imgStar();
	this.instance.parent = this;
	this.instance.setTransform(-19,-17.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = getMCSymbolPrototype(lib.star, new cjs.Rectangle(-19,-17.5,38,35), null);


(lib.starAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 1
	this.instance = new lib.star();
	this.instance.parent = this;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(2).to({rotation:22.5},0).wait(2).to({rotation:45},0).wait(2).to({rotation:67.5},0).wait(2).to({rotation:90},0).wait(2).to({rotation:112.5},0).wait(2).to({rotation:135},0).wait(2).to({rotation:157.5},0).wait(2).to({rotation:180},0).wait(2).to({rotation:202.5},0).wait(2).to({rotation:225},0).wait(2).to({rotation:247.5},0).wait(2).to({rotation:270},0).wait(2).to({rotation:292.5},0).wait(2).to({rotation:315},0).wait(2).to({rotation:337.5},0).wait(2));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-19,-17.5,38,35);


// stage content:
(lib.RNB_StarAnim = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// Layer 6 copy 10
	this.instance = new lib.starAnim();
	this.instance.parent = this;
	this.instance.setTransform(916.3,121.1,0.523,0.523,75);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(65).to({_off:false},0).to({scaleX:1,scaleY:1,y:115.9,alpha:1},14).wait(19).to({x:900.3,y:134.7,alpha:0},21).wait(1));

	// Layer 6 copy 11
	this.instance_1 = new lib.starAnim();
	this.instance_1.parent = this;
	this.instance_1.setTransform(958.2,231.3,0.523,0.523);
	this.instance_1.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).to({scaleX:1,scaleY:1,x:953.3,y:229.9,alpha:1},14).wait(20).to({alpha:0},21).to({_off:true},1).wait(64));

	// Layer 6 copy 4
	this.instance_2 = new lib.starAnim();
	this.instance_2.parent = this;
	this.instance_2.setTransform(655.5,187.2,0.352,0.352,90);
	this.instance_2.alpha = 0;
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(18).to({_off:false},0).to({scaleX:0.67,scaleY:0.67,x:641.8,y:174.2,alpha:1},14).wait(19).to({alpha:0},21).to({_off:true},1).wait(47));

	// Layer 6 copy 5
	this.instance_3 = new lib.starAnim();
	this.instance_3.parent = this;
	this.instance_3.setTransform(609.2,108.3,0.352,0.352,90);
	this.instance_3.alpha = 0;
	this.instance_3._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(36).to({_off:false},0).to({scaleX:0.67,scaleY:0.67,x:618.4,y:105,alpha:1},14).wait(19).to({alpha:0},21).to({_off:true},1).wait(29));

	// Layer 6 copy 6
	this.instance_4 = new lib.starAnim();
	this.instance_4.parent = this;
	this.instance_4.setTransform(292.3,63.1,0.523,0.523,75);
	this.instance_4.alpha = 0;
	this.instance_4._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(65).to({_off:false},0).to({scaleX:1,scaleY:1,y:57.9,alpha:1},14).wait(19).to({x:276.3,y:76.7,alpha:0},21).wait(1));

	// Layer 6 copy 7
	this.instance_5 = new lib.starAnim();
	this.instance_5.parent = this;
	this.instance_5.setTransform(326.2,131.3,0.523,0.523);
	this.instance_5.alpha = 0;

	this.timeline.addTween(cjs.Tween.get(this.instance_5).to({scaleX:1,scaleY:1,x:321.3,y:129.9,alpha:1},14).wait(20).to({alpha:0},21).to({_off:true},1).wait(64));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(916.3,278.6,651.9,118.3);
// library properties:
lib.properties = {
	width: 1200,
	height: 250,
	fps: 24,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [
		{ src: "./Assets/img/imgStar.png?1537259533922", id: "imgStar" }
	],
	preloads: []
};




})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{}, AdobeAn = AdobeAn||{});
var lib, images, createjs, ss, AdobeAn;