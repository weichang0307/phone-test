
const canvas=document.getElementById('mycanvas');
const ctx=canvas.getContext('2d');
let ww=1000
let wh=1600
mysize()

mx=ww/2
my=wh/2
let fps=50
//全域變數
let keys={} 
let world;
let tt=0
let camera
let cc=''


let b1
let walls=[]
let player
let controler

let ispress=false
let is_computer=iscomputer()
function init(){
	
	console.log(iscomputer())
	if(iscomputer()){
		cc='black'
	}else{
		cc='green'
	}
	world=new physic_world(0,1000,50)
	camera=new Camera(500,800)
	
	b1=new ball(0,0,30,10)

	walls[0]=new wall(-500,0,20,1600)
	walls[1]=new wall(500,0,20,1600)
	walls[2]=new wall(0,-800,1000,20)
	walls[3]=new wall(0,800,1000,20)

	player=new Player(-300,700)

	controler=new Controler()
	//event
	window.addEventListener('keydown',keydown)
	window.addEventListener('keyup',keyup)
	if(is_computer){
		window.addEventListener('mousedown',mousedown)
		window.addEventListener('mouseup',mouseup)
		window.addEventListener('mousemove',mousemove)
	}else{
		window.addEventListener('touchstart',mousedown)
		window.addEventListener('touchend',mouseup)
		window.addEventListener('touchmove',mousemove)
	}
	
	
	window.addEventListener('resize',mysize)
}
function update(){
	tt+=1000/fps
	player.physic.velocity.add_in(controler.btn_position.scale(1/3))
	world.update(1/fps)
	
}
function draw(){
	camera.update(ctx)
	background(cc,-500,-800,1000,1600)
	
	b1.draw()
	for(let i of walls){
		i.draw()
	}
	player.draw()
	controler.draw()
	ctx.fillStyle='yellow'
	ctx.font='50px Arial'
	ctx.fillText('version:4.1',-400,-700)

	requestAnimationFrame(draw)
}
setInterval(update,1000/fps)
requestAnimationFrame(draw)


//event function
function keydown(e){
	keyid=e.code
	
	
	
}
function keyup(e){
	keyid=e.code
	
	
}
function mousedown(ev){
	let e
	if(is_computer){
		e=ev	
	}else{
		e=ev.touches[0]
	}
	ev.preventDefault()
	ispress=true
	controler.visible=true
	let p=get_p_in_world(e.pageX,e.pageY)
	controler.position.x=p.x
	controler.position.y=p.y
}
function mouseup(ev){
	let e
	if(is_computer){
		e=ev	
	}else{
		e=ev.touches[0]
	}
	ev.preventDefault()
	ispress=false
	controler.visible=false
	controler.btn_position.scale_in(0)

}
function mousemove(ev){
	let e
	if(is_computer){
		e=ev	
	}else{
		e=ev.touches[0]
	}
	
	ev.preventDefault()
	if(ispress){
		let btnp=get_p_in_world(e.pageX,e.pageY)
		let dis=btnp.minus(controler.position)
		if(dis.long()>100){
			dis.scale_in(100/dis.long())
		}
		controler.btn_position=dis
	}

}
function get_p_in_world(x,y){
	let fx=(x-parseFloat(canvas.style.left))*ww/canvas.width-camera.middle.x+camera.position.x
	let fy=(y-parseFloat(canvas.style.top))*ww/canvas.width-camera.middle.y+camera.position.y
	return new vec2(fx,fy)
}
function mysize(){
	if(window.innerHeight/window.innerWidth>=wh/ww){
		canvas.style.width=window.innerWidth+'px'
		canvas.style.height=wh*window.innerWidth/ww+'px'
		canvas.width=window.innerWidth
		canvas.height=wh*window.innerWidth/ww
		canvas.position='absolute'
		canvas.left=window.innerWidth-canvas.width/2
		canvas.top=0
		canvas.style.position='absolute'
		canvas.style.left=0+'px'
		canvas.style.top=0+'px'
	}else{
		canvas.style.width=ww*window.innerHeight/wh+'px'
		canvas.style.height=window.innerHeight+'px'
		canvas.width=ww*window.innerHeight/wh
		canvas.height=window.innerHeight
		canvas.style.position='absolute'
		canvas.style.left=(window.innerWidth-canvas.width)/2+'px'
		canvas.style.top=0+'px'
		
	}
	//適用條件:只有一個camera
	ctx.restore()
	ctx.restore()
	ctx.save()

	if(window.innerHeight/window.innerWidth>=wh/ww){
		ctx.scale(window.innerWidth/ww,window.innerWidth/ww)
	}else{
		ctx.scale(window.innerHeight/wh,window.innerHeight/wh)
	}
	ctx.save()
	
}
function iscomputer(){
	let iscom=true
	let phone_char= ['Android', 'webOS', 'iPhone', 'iPad', 'iPod', 'BlackBerry', 'Windows Phone']
	for(let i of phone_char){
		if(navigator.userAgent.match(i)){
			iscom=false
			break
		}
	}
	return iscom
}

init()

















