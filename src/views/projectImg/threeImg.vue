<template>
    <div id="three" ref="three" :style="bgImg">
        <div id="canvas"></div>
    </div>
</template>
<script>
import { OrbitControls } from '../../threeUtils/OrbitControls.js';    
import { CSS3DRenderer, CSS3DObject } from '../../threeUtils/CSS3DRenderer.js';
import * as THREE from '../../threeUtils/three.module.js';
// import "../../threeUtils/main.css"
export default {
    // camera:'',
    // scene:'',
    // renderer:'',
    // scene2:'',
    // renderer2:'',
    // frustumSize:500,
    data(){
        return{
            camera:'',
            scene:'',
            renderer:'',
            scene2:'',
            renderer2:'',
            frustumSize:500,
            bgImg:{
                // background: "#235d8b url(" + require("@/assets/frontImage.jpg") + ") no-repeat scroll right 0"
            },
            stationImg:require('../../assets/location1.png'),
            img1:require('../../assets/road1.png'),
            texture:''
        }
    },
    mounted(){
        console.log(this.frustumSize)
        
        this.init();
        this.bottom()
        // this.top()
        // 比坑浅是一圈
        // this.bottom1(-100,50,-110,60,60,60,50,50,-100,50)
        // this.bottom1(50,50,60,60,60,-60,50,-50,50,50)
        // this.bottom1(50,-50,60,-60,-60,-110,-50,-100,50,-50)
        // this.bottom1(-50,-100,-60,-110,-110,60,-100,50,-50,-100)
        // 比坑深是一个平面
        this.bottom1(-110,60,60,60,60,-60,-60,-110,-110,60)
        this.bottom2(-150,100,-100,50,50,50,270,100,-150,100)
        this.bottom2(50,50,270,100,100,-65,50,-50,50,50)
        this.bottom2(50,-50,100,-65,-36,-201,-50,-100,50,-50)
        this.bottom2(-50,-100,-36,-201,-150,100,-100,50,-50,-100)
        this.animate();
        
        // 第一个大建筑
        // this.build(50, 70, 100,-140,50,-180,25)
        // this.build(50, 70, 150,-210,50,-10,25)
        // this.build(100, 36*2, 50,100,36,-200,45)
        // this.build(150, 36*2, 50,250,36,-50,45)

        this.build(25, 7.5*2, 15,-90,7.5,75)
        this.build(25, 36*2, 15,-55,36,75)
        this.build(25, 39*2, 15,-20,39,75)
        this.build(25, 15*2, 15,40,15,75)
        this.build(25, 36*2, 15,-30,36,-110,30)
        this.build(25, 6*2, 15,-2,6,-95,30)
        this.build(25, 30*2, 15,23,30,-80,30)
        this.build(25, 18*2, 15,50,18,-65,30)
        // shape()
        // 右
        this.pipe(335, -33.25, 150,-150, -33.25, -335)
        this.pipe(365, -33.25, 135,-135, -33.25, -365)
        // 前
        this.pipe(-350,-55.75,135,350,-55.75,135)
        this.pipe(-350,-55.75,105,350,-55.75,105)
        // 左
        // this.pipe(-185,-100,185,10,-100,-365)
        // this.pipe(-215,-100,170,-20,-100,-365)
        // this.pipe(0,0,0,50,0,150)

        // 画线
        this.drawLine(0,0,50,50,0,0)
        this.drawLine(25,0,50,50,0,25)
        this.drawLine(25,0,50,25,0,25)
        this.drawLine(25,0,25,50,0,25)
        this.drawLine(25,0,25,37.5,0,37.5)
        
        this.drawLine(50,0,0,0,0,-75)
        this.drawLine(50,0,-25,23,0,-63)
        this.drawLine(50,0,-25,24,0,-38)
        this.drawLine(24,0,-38,23,0,-63)
        this.drawLine(24,0,-38,35,0,-45)
        this.drawLine(50,0,-25,36,0,-20)
        this.drawLine(23,0,-63,12,0,-55)
        
        this.drawLine(0,0,-75,-77,0,-20)
        this.drawLine(-26,0,-88,-65,0,-58)
        this.drawLine(-26,0,-88,-30,0,-53)
        this.drawLine(-30,0,-53,-65,0,-58)
        this.drawLine(-30,0,-53,-46,0,-73)
        this.drawLine(-65,0,-58,-55,0,-35)
        
        this.drawLine(-77,0,-20,-50,0,50)
        this.drawLine(-90,0,18,-78,0,50)
        this.drawLine(-90,0,18,-60,0,25)
        this.drawLine(-60,0,25,-78,0,50)
        this.drawLine(-60,0,25,-85,0,35)
        this.drawLine(-90,0,18,-68,0,3)

        // 水位圈
        // this.drawLine(-110,-20,60,60,-20,60)
        // this.drawLine(60,-20,60,60,-20,-60)
        // this.drawLine(60,-20,-60,-60,-20,-110)
        // this.drawLine(-60,-20,-110,-110,-20,60)

        // 坑的边界
        this.drawLine(-100,0,50,50,0,50)
        this.drawLine(50,0,50,50,0,-50)
        this.drawLine(50,0,-50,-50,0,-100)
        this.drawLine(-50,0,-100,-100,0,50)
        // 测点
        this.setStation(0,5,50)
        this.setStation(50,5,0)
        this.setStation(30,5,-60)
        this.setStation(-67,5,-50)
        this.setStation(-80,5,0)

        // 文字
        this.text('20pt ','#00FFFF',"滨康路",0,0,160)
        this.text('20pt ','#00FFFF',"滨安路",160,0,0)
        this.text('20pt ','#00FFFF',"西兴路",-130,0,0)
        this.text('20pt ','#0000FF',"地铁五号线",0,-100,160)
        this.text('20pt ','#0000FF',"地铁一号线",160,-100,-80)
        this.text('20pt ','#00FFFF',"Ⅰ期基坑",-20,0,20)
        this.text('20pt ','#00FFFF',"Ⅱ期项目",150,0,100)
        this.text('16pt ','#00FFFF',"自动监测点",60,-10,30)
        this.text('16pt ','#00FFFF',"地下水位",-120,-70,0)
    },
    methods:{
        init() {
            // let camera, scene, renderer;

			// let scene2, renderer2;
            // let frustumSize = 500
            const aspect = window.innerWidth / window.innerHeight;
            this.camera = new THREE.OrthographicCamera( this.frustumSize * aspect / - 2, this.frustumSize * aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 1, 1000 );
            // this.camera = new THREE.OrthographicCamera( 45, this.frustumSize * aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 1, 1000 );
            this.camera.position.set( 50, 200, 400 );

            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color( 0xa0a0a0 );
            // this.scene.background = new THREE.Color( 0xC1FFC1  );
            const grid = new THREE.GridHelper( 2000, 40, 0xf0f0f0, 0xf0f0f0 );
            grid.material.opacity = 0.1;
            grid.material.transparent = true;
            this.scene.add( grid );
            this.scene2 = new THREE.Scene();

            // wireframe: false去掉平面的边线和对角线
            // const material = new THREE.MeshBasicMaterial( { color: 0xD3D3D3, wireframe: false, wireframeLinewidth: 1, side: THREE.DoubleSide } );

            // left
            this.createPlane(
                158, 20,
                '#4876FF',
                new THREE.Vector3( - 75, -10, -25 ),
                new THREE.Euler( 0,  -108.5 * THREE.MathUtils.DEG2RAD, 0 ),
            );
            // right
            this.createPlane(
                150, 20,
                '#4876FF',
                new THREE.Vector3( -25, -10, 50 ),
                new THREE.Euler( 0, 0, 0 )
                // new THREE.Euler( 0, - 30 * THREE.MathUtils.DEG2RAD, 0 )
            );
            // before
            this.createPlane(
                100, 20,
                '#4876FF',
                new THREE.Vector3( 50, -10, 0 ),
                new THREE.Euler( 0, - 90 * THREE.MathUtils.DEG2RAD, 0 )
            );
            // right
            this.createPlane(
                112, 20,
                '#4876FF',
                new THREE.Vector3( 0, -10, -75 ),
                new THREE.Euler( 0, - 27 * THREE.MathUtils.DEG2RAD, 0 )
            );

            // 路
            // 前
            this.createPlane(
                700, 50,
                '#828282',
                new THREE.Vector3( 0, 0, 125 ),
                new THREE.Euler( - 90 * THREE.MathUtils.DEG2RAD, 0, 0 )
            );
            // 右
            this.createPlane(
                50, 700,
                '#828282',
                new THREE.Vector3( 100, 0, -100 ),
                new THREE.Euler( - 90 * THREE.MathUtils.DEG2RAD, 0, 45 * THREE.MathUtils.DEG2RAD,  )
            );
            // 左
            this.createPlane(
                50, 500,
                '#828282',
                new THREE.Vector3( -100, 0, -100 ),
                new THREE.Euler( - 90 * THREE.MathUtils.DEG2RAD, 0, -20 * THREE.MathUtils.DEG2RAD,  )
            );

            let three = document.getElementById('three')
            console.log(three)
            console.log(this.$refs.three.offsetWidth)
            let w = this.$refs.three.offsetWidth
            let h = this.$refs.three.offsetHeight
            this.renderer = new THREE.WebGLRenderer();
            // 为了使背景透明 但没起作用
            // this.renderer.setClearAlpha(0);
            this.renderer.setPixelRatio( window.devicePixelRatio );
            this.renderer.setSize( w, h );
            // document.body.appendChild( this.renderer.domElement );
            three.appendChild( this.renderer.domElement );
            this.renderer2 = new CSS3DRenderer();
            // 为了使背景透明 但没起作用
            // this.renderer.setClearAlpha(0);
            this.renderer2.setSize(  w, h );
            this.renderer2.domElement.style.position = 'absolute';
            this.renderer2.domElement.style.top = 0;
            // document.body.appendChild( this.renderer2.domElement );
            three.appendChild( this.renderer2.domElement );
            const controls = new OrbitControls( this.camera, this.renderer2.domElement );
            controls.zoom = 0.1
            controls.minZoom = 0.3;
            controls.maxZoom = 2;
        },
        
        createPlane( width, height, cssColor, pos, rot ) {
            // const material = new THREE.MeshBasicMaterial( { color: 0xD3D3D3, wireframe: false, wireframeLinewidth: 1, side: THREE.DoubleSide } );
            const element = document.createElement( 'div' );
            element.style.width = width + 'px';
            element.style.height = height + 'px';
            element.style.opacity = 0.75;
            element.style.background = cssColor;

            const object = new CSS3DObject( element );
            object.position.copy( pos );
            object.rotation.copy( rot );
            // 去掉之后白色就没有了  也不会穿透其他的模型
            // this.scene2.add( object );

            const geometry = new THREE.PlaneGeometry( width, height );
            const material = new THREE.MeshBasicMaterial( { color: cssColor, wireframe: false, wireframeLinewidth: 1, side: THREE.DoubleSide,transparent: true, blending: THREE.MultiplyBlending } );
            const mesh = new THREE.Mesh( geometry, material );
            mesh.position.copy( object.position );
            mesh.rotation.copy( object.rotation );
            this.scene.add( mesh );

        },
        build(l,w,h,x,y,z,deg) {
            //  长高宽
            // let geometry = new THREE.BoxGeometry( 200, 100, 100 );
            let geometry = new THREE.BoxGeometry( l,w,h );
            let material = new THREE.MeshBasicMaterial({
                color: 0xD3D3D3,
                transparent: true,
                opacity:0.6,
            });
            let mesh = new THREE.Mesh( geometry, material );
            mesh.castShadow = true;
            // 设置向下
            // mesh.position.x = -200;
            // mesh.position.y = 50;
            // mesh.position.z = -150;
            mesh.position.x = x;
            mesh.position.y = y;
            mesh.position.z = z;
            if(deg){
                mesh.rotateY(- deg * THREE.MathUtils.DEG2RAD)
            }
            this.scene.add( mesh );
        },
        pipe(x1, y1, z1,x2, y2, z2){
            var path = new THREE.LineCurve3(new THREE.Vector3(x1, y1, z1), new THREE.Vector3(x2, y2, z2));
            // path:路径   40：沿着轨迹细分数  25：管道半径   25：管道截面圆细分数
            var geometry = new THREE.TubeGeometry(path, 40, 5, 25);
            var material = new THREE.MeshBasicMaterial( { color: 0xEEE9BF,transparent:true, opacity:0.3 } );
            var mesh = new THREE.Mesh( geometry, material );
            this.scene.add( mesh );
        },
        // 画线的函数
        drawLine(x1,y1,z1,x2,y2,z2){
            var geometryLine = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
            var p1 = new THREE.Vector3(x1, y1, z1); //顶点1坐标
            var p2 = new THREE.Vector3(x2, y2,z2); //顶点2坐标
            // 二维直线LineCurve
            var LineCurve = new THREE.LineCurve3(p1, p2);
            var pointArr = LineCurve.getPoints(10);
            geometryLine.setFromPoints(pointArr);
            var material = new THREE.LineBasicMaterial({
                color: 0x7FFF00,
                transparent: true,
                opacity:1,
            });//材质对象
            //线条模型对象
            var line = new THREE.Line(geometryLine, material);
            this.scene.add(line); //线条对象添加到场景中
        },
        // 测点
        setStation(x,y,z){
            const map = new THREE.TextureLoader().load( this.stationImg );
            const material = new THREE.SpriteMaterial( { map: map, color: 0xffffff } );

            const sprite = new THREE.Sprite( material );
            sprite.scale.set(10, 10, 1)
            this.scene.add( sprite );
            sprite.position.set(x,y,z)
        },
        // 文字
        text(font,fontColor,text,x,y,z){
            // const c = this.changeCanvas();
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext('2d');
            // ctx.font = '20pt Arial';
            ctx.font = font+'Arial';
            // ctx.fillStyle = '#696969';
            ctx.fillRect(0, 0, 0, 50);
            // ctx.fillStyle = 'white';
            // ctx.fillRect(10, 10, canvas.width - 20, canvas.height - 20);
            // ctx.fillStyle = '#00FFFF';
            ctx.fillStyle = fontColor;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            // ctx.fillText("滨康路", canvas.width / 2, 25);
            ctx.fillText(text, canvas.width / 2, 25);
            const texture = new THREE.CanvasTexture(canvas);
            const spriteMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent:true,
            opacity:1
            });
            const sprite = new THREE.Sprite(spriteMaterial);
            // sprite.scale.set(c.width / 100, c.height / 100, 0);
            sprite.scale.set( 100,  100, 0);
            // sprite.position.set(0,0,160)
            sprite.position.set(x,y,z)
            sprite.rotateX(- 90 * THREE.MathUtils.DEG2RAD)
            this.scene.add(sprite);
        },
        // 底面
        bottom(){
            var shape = new THREE.Shape();
            shape.moveTo(-100,50);//起点
            shape.lineTo(50,50);//第2点
            shape.lineTo(50,-50);//第3点
            shape.lineTo(-50,-100);//第4点
            shape.lineTo(-100,50);//第5点
            var geometry = new THREE.ShapeGeometry( shape );
            // var material = new THREE.MeshBasicMaterial( { color: 0x8B7D6B,transparent:true,opacity:0.8 } );
            var material = new THREE.MeshBasicMaterial( { color: 0x4876FF,transparent:true,opacity:1 } );
            // 设置双面可见
            material.side = THREE.DoubleSide;
            var mesh = new THREE.Mesh( geometry, material ) ;
            mesh.rotateX(90 * THREE.MathUtils.DEG2RAD)
            mesh.position.y = -20
            this.scene.add( mesh );
        },
        // 上面
        top(){
            var shape = new THREE.Shape();
            shape.moveTo(-100,50);//起点
            shape.lineTo(50,50);//第2点
            shape.lineTo(50,-50);//第3点
            shape.lineTo(-50,-100);//第4点
            shape.lineTo(-100,50);//第5点
            var geometry = new THREE.ShapeGeometry( shape );
            // var material = new THREE.MeshBasicMaterial( { color: 0x8B7D6B,transparent:true,opacity:0.8 } );
            var material = new THREE.MeshBasicMaterial( { color: 0xffffff,transparent:true,opacity:0.1 } );
            // 设置双面可见
            material.side = THREE.DoubleSide;
            var mesh = new THREE.Mesh( geometry, material ) ;
            mesh.rotateX(90 * THREE.MathUtils.DEG2RAD)
            mesh.position.y = 1
            this.scene.add( mesh );
        },
        // 水面
        bottom1(x1,z1,x2,z2,x3,z3,x4,z4,x5,z5){
            var shape = new THREE.Shape();
            // shape.moveTo(-110,60);//起点
            // shape.lineTo(60,60);//第2点
            // shape.lineTo(60,-60);//第3点
            // shape.lineTo(-60,-110);//第4点
            // shape.lineTo(-110,60);//第5点
            shape.moveTo(x1,z1);//起点
            shape.lineTo(x2,z2);//第2点
            shape.lineTo(x3,z3);//第3点
            shape.lineTo(x4,z4);//第4点
            shape.lineTo(x5,z5);//第5点
            var geometry = new THREE.ShapeGeometry( shape );
            // var material = new THREE.MeshBasicMaterial( { color: 0x8B7D6B,transparent:true,opacity:0.8 } );
            var material = new THREE.MeshBasicMaterial( { color: 0xADD8E6,transparent:true,opacity:0.5 } );
            // 设置双面可见
            material.side = THREE.DoubleSide;
            var mesh = new THREE.Mesh( geometry, material ) ;
            mesh.rotateX(90 * THREE.MathUtils.DEG2RAD)
            mesh.position.y = -45
            this.scene.add( mesh );
        },
        // 地面
        // bottom2(x1,z1,x2,z2,x3,z3,x4,z4,x5,z5,x6,z6,x7,z7,x8,z8,x9,z9,x10,z10){
        bottom2(x1,z1,x2,z2,x3,z3,x4,z4,x5,z5){
            var shape = new THREE.Shape();
            shape.moveTo(x1,z1);//起点
            shape.lineTo(x2,z2);//第2点
            shape.lineTo(x3,z3);//第3点
            shape.lineTo(x4,z4);//第4点
            shape.lineTo(x5,z5);//第5点
            // shape.lineTo(x6,z6);//第6点
            // shape.lineTo(x7,z7);//第5点
            // shape.lineTo(x8,z8);//第5点
            // shape.lineTo(x9,z9);//第5点
            // shape.lineTo(x10,z10);//第5点
            var geometry = new THREE.ShapeGeometry( shape );
            // var material = new THREE.MeshBasicMaterial( { color: 0x8B7D6B,transparent:true,opacity:0.8 } );
            var material = new THREE.MeshBasicMaterial( { color: 0xCDBE70,transparent:true,opacity:0.3} );
            // 设置双面可见
            material.side = THREE.DoubleSide;
            var mesh = new THREE.Mesh( geometry, material ) ;
            mesh.rotateX(90 * THREE.MathUtils.DEG2RAD)
            mesh.position.y = 0
            this.scene.add( mesh );
        },
        onWindowResize() {
            const aspect = window.innerWidth / window.innerHeight;
            this.camera.left = - this.frustumSize * aspect / 2;
            this.camera.right = this.frustumSize * aspect / 2;
            this.camera.top = this.frustumSize / 2;
            this.camera.bottom = - this.frustumSize / 2;
            this.camera.updateProjectionMatrix();
            // this.renderer.setSize( window.innerWidth, window.innerHeight );
            let w = this.$refs.three.offsetWidth
            let h = this.$refs.three.offsetHeight
            this.renderer.setSize( w,h );
            this.renderer2.setSize( w,h );
        },
        animate() {
            requestAnimationFrame( this.animate );
            this.renderer.render( this.scene, this.camera );
            this.renderer2.render( this.scene2, this.camera );
            // this.texture.needsUpdate = true;
        }
    }
}
</script>
<style>
   #three{
       width: 100%;
       height: 100%;
   }
</style>