class vec2{
	constructor(x,y){
		this.x=x
		this.y=y
	}
	add(vec2_){
		return new vec2(this.x+vec2_.x,this.y+vec2_.y)
	}
	add_in(vec2_){
		this.x+=vec2_.x
		this.y+=vec2_.y
	}
	minus(vec2_){
		return new vec2(this.x-vec2_.x,this.y-vec2_.y)
	}
	minus_in(vec2_){
		this.x-=vec2_.x
		this.y-=vec2_.y
	}
	multiply(vec2_){
		return new vec2(this.x*vec2_.x,this.y*vec2_.y)
	}
	multiply_in(vec2_){
		this.x*=vec2_.x
		this.y*=vec2_.y
	}
	divide(vec2_){
		return new vec2(this.x/vec2_.x,this.y/vec2_.y)
	}
	devide_in(vec2_){
		this.x/=vec2_.x
		this.y/=vec2_.y
	}
	scale(number){
		return new vec2(this.x*number,this.y*number)
	}
	scale_in(number){
		this.x*=number
		this.y*=number
	}
	abs(){
		return new vec2(Math.abs(this.x),Math.abs(this.y))
	}
	abs_in(){
		this.x=Math.abs(this.x)
		this.y=Math.abs(this.y)
	}
	square(number=2){
		return new vec2(this.x**number,this.y**number)
	}
	square_in(number=2){
		this.x=this.x**number
		this.y=this.y**number
	}
	deg(){
		return Math.atan2(this.y,this.x)
	}
	copy(){
		return this.scale(1)
	}
	long(){
		return Math.sqrt(this.x**2+this.y**2)
	}
	equal(vec2_){
		if(vec2_.x===this.x&&vec2_.y===this.y){
			return true
		}else{
			return false
		}
	}
	set(long,deg){
		return new vec2(long*Math.cos(deg),long*Math.sin(deg))
	}
	set_in(long,deg){
		this.x=long*Math.cos(deg)
		this.y=long*Math.sin(deg)
	}
}