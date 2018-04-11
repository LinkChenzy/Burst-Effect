// 创建canvans
var bombCanvas = document.createElement("canvas");
// 设置canvans属性
bombCanvas.setAttribute('id','canvas');
bombCanvas.setAttribute('class','canvas');  
// canvans添加到DOM树
document.body.appendChild(bombCanvas);
var canvas=document.getElementById("canvas");
var ctx=canvas.getContext("2d");
var width=500;
var height=500;
canvas.width=width;
canvas.height=height;
var circularArr=[];
var beginMove=document.getElementById("beginMove");
var stopMove=document.getElementById("stopMove");
var colorArr=["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A",
"#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"];
// 添加文字DOM树
// var congrat = document.getElementById('congrat');
var text = '<h1>何晓曼</h1><h3>+100分</h3><h2>来自银河战队</h2><p>拿到首杀</p>';
$("#congrat").html(text);
// 初始化定时器
var timer;
function rnd(min, max) {
    return ((Math.random() * (max - min)) + min);
}
// 绘制canvans
function circularInit(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	for(var i=0;i<100;i++){
		var circular={
			x:canvas.width/2,
			y:canvas.height/2,
			r:Math.random()*6+2,
			vx: rnd((-1) * 10, 10),
			vy: rnd((-1) * 10, 10),
			// color:colorArr[Math.floor(Math.random()*colors.length)]
		}
		circularArr.push(circular);
		circularArr[i].x+=circularArr[i].vx,
		circularArr[i].y+=circularArr[i].vy
		if(circularArr[i].x<=0 || circularArr[i].x>=canvas.width){
			circularArr[i].x=canvas.width/2;
			circularArr[i].y=canvas.height/2;
		}
		if(circularArr[i].y<=0 || circularArr[i].y>=canvas.height){
			circularArr[i].x=canvas.width/2;
			circularArr[i].y=canvas.height/2;
		}
		ctx.fillStyle=colorArr[Math.floor(Math.random()*colorArr.length)];
		ctx.beginPath();
		ctx.arc(circularArr[i].x,circularArr[i].y,circularArr[i].r,0,Math.PI*2,false);
		ctx.closePath();
		ctx.fill();
	}
}
// 绘制canvans函数
function TIME(){
    circularInit();
}
beginMove.onclick=function(){
	timer=setInterval(TIME,80);
    $('.canvas').css('display','block');
    $('.bomb').css('display','block');
    $('.congrat').addClass('animated Largen');
    $('.aureole').addClass('animated LargenRotate');
    setTimeout(function(){
        // 去掉animationLargen
        $('.aureole').removeClass('LargenRotate');
        $('.aureole').addClass('Rotate');
    },2000);
}
stopMove.onclick=function(){
	clearInterval(timer);
    // 添加消失效果fadeOut
    $('.bomb').addClass('animated fadeOut');
    $('.canvas').addClass('animated fadeOut');
    $('.aureole').removeClass('Rotate fadeOut');
    setTimeout(function(){
        // 移除fadeOut并且重回none,为下一次开始准备
        $('.canvas').removeClass('fadeOut');
        $('.canvas').css('display','none');
        $('.bomb').removeClass('fadeOut');
        $('.bomb').css('display','none');
    },2000);

}


// "use strict";
// var _createClass = function () {
//     function defineProperties(target, props) {
//         for (var i = 0; i < props.length; i++) {
//             var descriptor = props[i];
//             descriptor.enumerable = descriptor.enumerable || false;
//             descriptor.configurable = true;
//             if ("value" in descriptor) descriptor.writable = true;
//             Object.defineProperty(target, descriptor.key, descriptor);
//         }
//     }

//     return function (Constructor, protoProps, staticProps) {
//         if (protoProps) defineProperties(Constructor.prototype, protoProps);
//         if (staticProps) defineProperties(Constructor, staticProps);
//         return Constructor;
//     };
// }();

// function _classCallCheck(instance, Constructor) {
//     if (!(instance instanceof Constructor)) {
//         throw new TypeError("Cannot call a class as a function");
//     }
// }

// var Progress = function () {
//     function Progress() {
//         var param = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

//         _classCallCheck(this, Progress);

//         this.timestamp = null;
//         this.duration = param.duration || Progress.CONST.DURATION;
//         this.progress = 0;
//         this.delta = 0;
//         this.progress = 0;
//         this.isLoop = !!param.isLoop;

//         this.reset();
//     }

//     Progress.prototype.reset = function reset() {
//         this.timestamp = null;
//     };

//     Progress.prototype.start = function start(now) {
//         this.timestamp = now;
//     };

//     Progress.prototype.tick = function tick(now) {
//         // 初始值设为false
//         // this.timestamp=false;
//         // 控制整屏的五彩纸屑的开始
//         this.timestamp=true;

//         if (this.timestamp) {
//             this.delta = now - this.timestamp;
            
//             this.progress = Math.min(this.delta / this.duration, 1);

//             if (this.progress >= 1 && this.isLoop) {
//                 this.start(now);
//             }

//             return this.progress;
//         } else {
//             return 0;
//         }
//     };

//     _createClass(Progress, null, [{
//         key: "CONST",
//         get: function get() {
//             return {
//                 DURATION: 1000
//             };
//         }
//     }]);

//     return Progress;
// }();

// var Confetti = function () {
//     function Confetti(param) {
//         _classCallCheck(this, Confetti);

//         this.parent = param.elm || document.body;
//         this.canvas = document.createElement("canvas");
//         this.ctx = this.canvas.getContext("2d");
//         this.width = param.width || this.parent.offsetWidth;
//         this.height = param.height || this.parent.offsetHeight;
//         this.length = param.length || Confetti.CONST.PAPER_LENGTH;
//         this.yRange = param.yRange || this.height * 2;
//         this.progress = new Progress({
//             duration: param.duration,
//             isLoop: true
//         });
//         this.rotationRange = typeof param.rotationLength === "number" ? param.rotationRange : 10;
//         this.speedRange = typeof param.speedRange === "number" ? param.speedRange : 10;
//         this.sprites = [];

//         this.canvas.style.cssText = ["display: block", "position: absolute", "top: 0", "left: 0", "pointer-events: none"].join(";");

//         this.render = this.render.bind(this);

//         this.build();

//         this.parent.append(this.canvas);
//         this.progress.start(performance.now());

//         requestAnimationFrame(this.render);
//     }

//     Confetti.prototype.build = function build() {
//         for (var i = 0; i < this.length; ++i) {
//             var canvas = document.createElement("canvas"),
//                 ctx = canvas.getContext("2d");

//             canvas.width = Confetti.CONST.SPRITE_WIDTH;
//             canvas.height = Confetti.CONST.SPRITE_HEIGHT;

//             canvas.position = {
//                 initX: Math.random() * this.width,
//                 initY: -canvas.height - Math.random() * this.yRange
//             };

//             canvas.rotation = this.rotationRange / 2 - Math.random() * this.rotationRange;
//             canvas.speed = this.speedRange / 2 + Math.random() * (this.speedRange / 2);

//             ctx.save();
//             ctx.fillStyle = Confetti.CONST.COLORS[Math.random() * Confetti.CONST.COLORS.length | 0];
//             ctx.fillRect(0, 0, canvas.width, canvas.height);
//             ctx.restore();

//             this.sprites.push(canvas);
//         }
//     };

//     Confetti.prototype.render = function render(now) {
//         var progress = this.progress.tick(now);

//         this.canvas.width = this.width;
//         this.canvas.height = this.height;

//         for (var i = 0; i < this.length; ++i) {
//             this.ctx.save();
//             this.ctx.translate(this.sprites[i].position.initX + this.sprites[i].rotation * Confetti.CONST.ROTATION_RATE * progress, this.sprites[i].position.initY + progress * (this.height + this.yRange));
//             this.ctx.rotate(this.sprites[i].rotation);
//             this.ctx.drawImage(this.sprites[i], -Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)) / 2, -Confetti.CONST.SPRITE_HEIGHT / 2, Confetti.CONST.SPRITE_WIDTH * Math.abs(Math.sin(progress * Math.PI * 2 * this.sprites[i].speed)), Confetti.CONST.SPRITE_HEIGHT);
//             this.ctx.restore();
//         }

//         requestAnimationFrame(this.render);
//     };

//     _createClass(Confetti, null, [{
//         key: "CONST",
//         get: function get() {
//             return {
//                 SPRITE_WIDTH: 9,
//                 SPRITE_HEIGHT: 16,
//                 PAPER_LENGTH: 100,
//                 DURATION: 8000,
//                 ROTATION_RATE: 50,
//                 COLORS: ["#EF5350", "#EC407A", "#AB47BC", "#7E57C2", "#5C6BC0", "#42A5F5", "#29B6F6", "#26C6DA", "#26A69A", "#66BB6A", "#9CCC65", "#D4E157", "#FFEE58", "#FFCA28", "#FFA726", "#FF7043", "#8D6E63", "#BDBDBD", "#78909C"]
//             };
//         }
//     }]);

//     return Confetti;
// }();

// (function () {
//     var DURATION = 8000,
//         LENGTH = 300;

//     new Confetti({
//         width: window.innerWidth,
//         height: window.innerHeight,
//         length: LENGTH,
//         duration: DURATION
//     });

//     setTimeout(function () {
//         new Confetti({
//             width: window.innerWidth,
//             height: window.innerHeight,
//             length: LENGTH,
//             duration: DURATION
//         });
//     }, DURATION / 2);
// })();

