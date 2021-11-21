class ball{
	constructor(x,y,rr,mass){
		this.physic=new physic_ball(x,y,rr,mass)
		world.add(this.physic)
		this.physic.resistance.x=0.5
		this.physic.resistance.y=0.5
		
	}
	draw(){
		this.physic.draw_helper('red')
	}
}
class wall{
	constructor(x,y,sx,sy){
		this.physic=new physic_rect(x,y,sx,sy,Infinity)
		world.add(this.physic)
		this.physic.isgravity=false
	}
	draw(){
		this.physic.draw_helper('yellow')
	}
}
class Player{
	constructor(x,y){
		this.physic=new physic_rect(x,y,100,150,100)
		this.physic.resistance.x=0.5
		this.physic.resistance.y=0.5
		world.add(this.physic)
	}
	draw(){
		this.physic.draw_helper('blue')
	}
}
class Controler{
	constructor(){
		this.position=new vec2(0,0)
		this.btn_position=new vec2(0,0)
		this.visible=false
	}
	draw(){
		if(this.visible){
			ctx.globalAlpha=0.5
			ctx.beginPath()
			ctx.arc(this.position.x,this.position.y,100,0,Math.PI*2)
			ctx.closePath()
			ctx.fillStyle='white'
			ctx.fill()
			ctx.beginPath()
			ctx.arc(this.position.x+this.btn_position.x,this.position.y+this.btn_position.y,30,0,Math.PI*2)
			ctx.closePath()
			ctx.fillStyle='white'
			ctx.fill()
			ctx.globalAlpha=1
		}
		
	}
}











































class rope{
	constructor(sx,sy,dis,number,deg=0,rr=3,mass=1){
		this.elements=[]
		for(let i=0;i<number;i++){
			let bb=new physic_ball(sx+i*dis*Math.cos(deg),sy+i*dis*Math.sin(deg),rr,mass)
			world.add(bb)
			bb.resistance.x=0.5
			bb.resistance.y=0.5
			bb.isgravity=false
			this.elements.push(bb)
		}
		for(let i=0;i<number-1;i++){
			world.add_constraint(this.elements[i],this.elements[i+1],dis,1000000)
		}

		this.start=new vec2(sx,sy)
	}
	draw(){
		for(let i of this.elements){
			i.draw_helper('red')
		}
	}
}





























































/*
//example
class example{
	constructor(aa){
		let element={
			position:{x:0,y:0},
			rotation:0,
			scale:{x:1,y:1},
			through:1,
			visible:true,
			style:0,
		}
		this.styles=[]
		this.group=[]
		//this.styles.push({method:'drawer',array:[]})
		//this.styles.push({method:'img',img:document.getElementById(''),middle:{x:,y:},path:[]})

		Object.assign(element,aa)
		Object.assign(this,element)
	}
	draw(){
		if(this.visible){
			if(this.styles[this.style].method==='img'){
				ctx.save()
				ctx.translate(this.position.x,this.position.y)
				ctx.rotate(this.rotation)
				ctx.scale(this.scale.x,this.scale.y)
				ctx.globalAlpha=this.through
				ctx.drawImage(this.styles[this.style].img,-this.styles[this.style].middle.x,-this.styles[this.style].middle.y)
				ctx.globalAlpha=1.0
				ctx.restore()
			}else{
				ctx.save()
					ctx.translate(this.position.x,this.position.y)
					ctx.rotate(this.rotation)
					ctx.scale(this.scale.x,this.scale.y)
					drawer(this.styles[this.style].array,this.through)
				ctx.restore()
			}
			
		}
	}
	ispointinpath(x,y){
		if(this.styles[this.style].method==='img'){
			ctx.save()
			ctx.translate(this.position.x,this.position.y)
			ctx.rotate(this.rotation)
			ctx.scale(this.scale.x,this.scale.y)
			ctx.beginPath()
			for(let i=0;i<this.styles[this.style].path.length;i++){
				if(i===0){
					ctx.moveTo(this.styles[this.style].path[i].x,this.styles[this.style].path[i].y)
				}else{
					ctx.lineTo(this.styles[this.style].path[i].x,this.styles[this.style].path[i].y)
				}
			}
			ctx.closePath()
			ctx.restore()
			return ctx.isPointInPath(x,y)
		}else{
			ctx.save()
			ctx.translate(this.position.x,this.position.y)
			ctx.rotate(this.rotation)
			ctx.scale(this.scale.x,this.scale.y)
			return ispointinarraypath(x,y,this.styles[this.style].array)
		}
		
	}
	addimg(src,middle,path){
		let img=new Image()
		img.src=src 
		this.styles.push({method:'img',img:img,middle:middle,path:path})
	}
}
*/