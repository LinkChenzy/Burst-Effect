"use strict";
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
        // 绘制每个小圆的object
		var circular={
            // 小圆在canvan中的位置
			x:canvas.width/2,
			y:canvas.height/2,
            // 半径
			r:Math.random()*6+2,
            // X轴和Y轴移动的距离
			vx: rnd((-1) * 10, 10),
			vy: rnd((-1) * 10, 10),
		}
		circularArr.push(circular);
        // 开始移动
		circularArr[i].x+=circularArr[i].vx,
		circularArr[i].y+=circularArr[i].vy
        // 移动范围的条件
		if(circularArr[i].x<=0 || circularArr[i].x>=canvas.width){
			circularArr[i].x=canvas.width/2;
			circularArr[i].y=canvas.height/2;
		}
		if(circularArr[i].y<=0 || circularArr[i].y>=canvas.height){
			circularArr[i].x=canvas.width/2;
			circularArr[i].y=canvas.height/2;
		}
        // 小圆随机背景颜色
		ctx.fillStyle=colorArr[Math.floor(Math.random()*colorArr.length)];
		ctx.beginPath();
        // context.arc(x,y,r,sAngle（开始角度）,eAngle（结束角度）,counterclockwise);
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


