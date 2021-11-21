/*
require modules:
vector_md, 
*/


/*
mass: kg
long: m
*/


class physic_rect{
	constructor(x,y,width,height,mass=0,resistance_vec2=new vec2(0,0)){
		this.type='rect'
		this.position=new vec2(x,y)
		this.velocity=new vec2(0,0)
		this.force=new vec2(0,0)
		this.scale=new vec2(width,height)
		this.mass=mass
		this.resistance=resistance_vec2
		this.isgravity=true
		this.iscollition=true
		this.collision=function(e){}
	}
	draw_helper(color,fill=true,through=1,ctx_=ctx){
		ctx_.globalAlpha=through
		ctx_.fillStyle=color
		ctx_.strokeStyle=color 
		if(fill){
			ctx_.fillRect(this.position.x-this.scale.x/2,this.position.y-this.scale.y/2,this.scale.x,this.scale.y)
		}else{
			ctx_.strokeRect(this.position.x-this.scale.x/2,this.position.y-this.scale.y/2,this.scale.x,this.scale.y)
		}
		ctx_.globalAlpha=1
	}
}

class physic_ball{
	constructor(x,y,radius,mass=0,rebound=0.5,resistance_vec2=new vec2(0,0)){
		this.type='ball'
		this.position=new vec2(x,y)
		this.velocity=new vec2(0,0)
		this.force=new vec2(0,0)
		this.radius=radius
		this.mass=mass
		this.rebound=rebound
		this.resistance=resistance_vec2
		this.isgravity=true
		this.iscollition=true
		this.collision=function(e){}
	}
	draw_helper(color,fill=true,through=1,ctx_=ctx){
		ctx_.globalAlpha=through
		ctx_.fillStyle=color
		ctx_.strokeStyle=color
		ctx_.beginPath()
		ctx_.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2)
		ctx_.closePath() 
		if(fill){
			ctx_.fill()	
		}else{
			ctx_.stroke()
		}
		ctx_.globalAlpha=1
	}


}


class physic_world{
	constructor(gravityx,gravityy,iteration=50){
		this.gravity=new vec2(gravityx,gravityy)
		this.objs=[]
		this.constraint=[]
		this.iteration=iteration
	}
	add(obj){
		this.objs.push(obj)
	}
	delete(obj){
		for(let i in this.objs){
			if(obj===this.objs[i]){
				this.objs.splice(i,1)
			}
		}
	}
	add_constraint(a,b,origin_dis,count){
		this.constraint.push({a:a,b:b,origin_dis:origin_dis,count:count})
	}
	delete_constraint(a,b,origin_dis,count){
		let ex={a:a,b:b,origin_dis:origin_dis,count:count}
		for(let i in this.constraint){
			if(ex===this.constraint[i]){
				this.constraint.splice(i,1)
			}
		}
	}
	update(time){
		
		
		let time_=time/this.iteration
		for(let k=0;k<this.iteration;k++){
			for(let i=0;i<this.objs.length-1;i++){
				for(let y=i+1;y<this.objs.length;y++){
					if(this.objs[i].iscollition||this.objs[y].iscollition){
						this.collision(this.objs[i],this.objs[y])
					}
					
				}
			}
			
			for(let i of this.constraint){
				let dis=i.a.position.minus(i.b.position)
				let ff=(dis.long()-i.origin_dis)*i.count
				i.a.force.add_in(new vec2(0,0).set(ff,dis.deg()+Math.PI))
				i.b.force.add_in(new vec2(0,0).set(ff,dis.deg()))
	
			}
			for(let i of this.objs){
				i.velocity.add_in(i.force.scale(time_/i.mass))
				i.force.scale_in(0)
			}
			for(let i of this.objs){
				i.velocity=i.velocity.multiply(new vec2(1,1).minus(i.resistance).square(time_))

				if(i.isgravity){
					i.velocity=i.velocity.add(this.gravity.scale(time_))
				}
				i.position=i.position.add(i.velocity.scale(time_))
			}
		}
	}
	collision(a,b){
		let va=a.velocity.copy()
		let vb=b.velocity.copy()
		if(a.type==='rect'&&b.type==='rect'){
			collision_rect_rect(a,b)
		}
		if(a.type==='ball'&&b.type==='ball'){
			collision_ball_ball(a,b)
		}
		if(a.type==='ball'&&b.type==='rect'){
			collision_ball_rect(a,b)
		}
		if(a.type==='rect'&&b.type==='ball'){
			collision_ball_rect(b,a)
		}
			

		if(va.equal(a.velocity)===false){
			for(let i of this.objs){
				if(i!==a&&i!==b){
					this.collision(i,a)
				}
			}
		}
		if(vb.equal(b.velocity)===false){
			for(let i of this.objs){
				if(i!==b&&i!==a){
					this.collision(i,b)
				}
			}
		}
		
		
	}
	
	
		
	

}
function collision_rect_rect(ii,yy){
	
	let dis=ii.position.minus(yy.position)
	if(dis.abs().x*2<ii.scale.x+yy.scale.x&&dis.abs().y*2<ii.scale.y+yy.scale.y){
		
		let mdeg=ii.scale.scale(1/2).add(yy.scale.scale(1/2)).deg()
		let adeg=dis.deg()
		let mi=ii.mass
		let my=yy.mass
		let vtx=ii.velocity.x-yy.velocity.x
		let vty=ii.velocity.y-yy.velocity.y
		let isi=mi===Infinity
		let isy=my===Infinity
		//左右碰撞
		if((adeg>=-mdeg&&adeg<=mdeg)||(adeg>Math.PI-mdeg||adeg<-(Math.PI-mdeg))){
			if(vtx>0===Math.cos(adeg)<0){
				
				if(isi===true&&isy===false){
					yy.velocity.x+=2*vtx
				}
				if(isi===false&&isy===true){
					ii.velocity.x-=2*vtx
				}
				if(isi===false&&isy===false){
					ii.velocity.x-=2*vtx*my/(mi+my)
					yy.velocity.x+=2*vtx*mi/(mi+my)
				}
				
				if(Math.cos(adeg)<0){
					ii.collision({side:"right",obj:yy})
					yy.collision({side:"left",obj:ii})
				}else{
					ii.collision({side:"left",obj:yy})
					yy.collision({side:"right",obj:ii})
				}
			}
		}else{//上下碰撞
			if(vty>0===Math.sin(adeg)<0){
				
				let isi=ii.mass===Infinity
				let isy=yy.mass===Infinity
				if(isi===true&&isy===false){
					yy.velocity.y+=2*vty
				}
				if(isi===false&&isy===true){
					ii.velocity.y-=2*vty
				}
				if(isi===false&&isy===false){
					ii.velocity.y-=2*vty*my/(mi+my)
					yy.velocity.y+=2*vty*mi/(mi+my)
				}
				if(Math.sin(adeg)<0){
					ii.collision({side:"bottom",obj:yy})
					yy.collision({side:"top",obj:ii})
				}else{
					ii.collision({side:"top",obj:yy})
					yy.collision({side:"bottom",obj:ii})
				}
			}
		}
	}
}
function collision_ball_ball(ii,yy){
	
	let dis=yy.position.minus(ii.position).long()//ii與yy之間的距離
	
	if(dis<ii.radius+yy.radius){								
		let vt=ii.velocity.minus(yy.velocity)//ii對於yy的相對速度
		let pdeg=yy.position.add(ii.position.scale(-1)).deg()//yy對於ii的方位
		let mi=ii.mass
		let my=yy.mass
		let judgedeg=Math.abs(vt.deg()-pdeg)%(Math.PI*2)//方位與相對速度的夾角
		if(judgedeg<Math.PI/2||judgedeg>Math.PI*3/2){
			let ylong=vt.long()*Math.cos(vt.deg()-pdeg)//ii對yy的法線相對速度量值
			let yvec=new vec2(0,0)
			yvec.set_in(ylong,pdeg)//ii對yy的法線加速度
			let isi=ii.mass===Infinity//ii質量是否為無限大(布林值)
			let isy=yy.mass===Infinity//yy質量是否為無限大(布林值)
			
			if(isi===true&&isy===false){
				yy.velocity.add_in(yvec.scale(2/2))
			}
			if(isi===false&&isy===true){
				ii.velocity.minus_in(yvec.scale(2/2))
			}
			if(isi===false&&isy===false){
				//yy.velocity.add_in(yvec.scale(2*mi/(mi+my)))
				//ii.velocity.minus_in(yvec.scale(2*my/(mi+my)))
			}
			ii.collision({deg:pdeg,obj:yy})
			yy.collision({deg:pdeg+Math.PI,obj:ii})
			
			
		}
			

		
		
	}
}
function collision_ball_rect(ii,yy){
	let dis=ii.position.minus(yy.position)
	let vt=ii.velocity.minus(yy.velocity)
	let mi=ii.mass
	let my=yy.mass
	let isi=mi===Infinity
	let isy=my===Infinity
	let vtx=vt.x
	let vty=vt.y
	if(Math.abs(dis.y)<yy.scale.y/2+ii.radius&&Math.abs(dis.x)<yy.scale.x/2){
		if(vty/Math.abs(vty)===-dis.y/Math.abs(dis.y)){
			if(isi===true&&isy===false){
				yy.velocity.y+=2*vty
			}
			if(isi===false&&isy===true){
				ii.velocity.y-=2*vty
			}
			if(isi===false&&isy===false){
				ii.velocity.y-=2*vty*my/(mi+my)
				yy.velocity.y+=2*vty*mi/(mi+my)	
			}
			if(dis.y>0){
				ii.collision({side:"bottom",obj:yy})
				yy.collision({side:"top",obj:ii})
			}else{
				ii.collision({side:"top",obj:yy})
				yy.collision({side:"bottom",obj:ii})
			}
		}
		
	}else if(Math.abs(dis.x)<yy.scale.x/2+ii.radius&&Math.abs(dis.y)<yy.scale.y/2){
		if(vtx/Math.abs(vtx)===-dis.x/Math.abs(dis.x)){
			if(isi===true&&isy===false){
				yy.velocity.x+=2*vtx
			}
			if(isi===false&&isy===true){
				ii.velocity.x-=2*vtx
			}
			if(isi===false&&isy===false){
				ii.velocity.x-=2*vtx*my/(mi+my)
				yy.velocity.x+=2*vtx*mi/(mi+my)
			}
			if(dis.x>0){
				ii.collision({side:"left",obj:yy})
				yy.collision({side:"right",obj:ii})
			}else{
				ii.collision({side:"right",obj:yy})
				yy.collision({side:"left",obj:ii})
			}
		}
	}else{
		let disp=yy.position.minus(ii.position)
		let m=disp.abs().divide(disp)
		disp=disp.abs().minus(yy.scale.scale(1/2)).multiply(m)
		
		if(disp.long()<ii.radius){
			let degi=disp.deg()
			let judgedeg=Math.abs(vt.deg()-degi)%(Math.PI*2)
			if(judgedeg<Math.PI/2||judgedeg>Math.PI*3/2){
				let long=Math.abs(vt.long()*Math.cos(judgedeg))
				let vecy=new vec2(0,0)
				vecy.set_in(long,degi)
				if(isi===true&&isy===false){
					yy.velocity.add_in(vecy.scale(2))
				}
				if(isi===false&&isy===true){
					ii.velocity.minus_in(vecy.scale(2))
				}
				if(isi===false&&isy===false){
					yy.velocity.add_in(vecy.scale(2*mi/(mi+my)))
					ii.velocity.minus_in(vecy.scale(2*my/(mi+my)))
				}
				
			}
			ii.collision({deg:degi,obj:ii})
			let str=''
			if(dis.y>0){
				str+='top'
			}else{
				str+='bottom'
			}
			if(dis.x>0){
				str+='right'
			}else{
				str+='left'
			}
			yy.collision({side:str,obj:yy})
				
			
		}
	}
	
}
