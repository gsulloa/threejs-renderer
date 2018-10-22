import * as THREE  from "three"
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader"

class Renderer3D {
  constructor({
    container,
  }) {
    this.mouseX = 0
    this.mouseY = 0
    this.camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 0.1, 2000 );
    this.camera.position.z = 250;
    // scene
    this.scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight( 0xcccccc, 1 );
    this.scene.add( ambientLight );
    this.scene.add( this.camera );
    // model
    const onProgress = function ( xhr ) {
      if ( xhr.lengthComputable ) {
        const percentComplete = xhr.loaded / xhr.total * 100;
        console.log( Math.round( percentComplete, 2 ) + '% downloaded' );
      }
    };
    const onError = function ( xhr ) { };
    new MTLLoader()
      .setPath( 'models/obj/abdomen/' )
      .load( 'ToraxAbdomen2.mtl', ( materials ) => {
        materials.preload();
        new OBJLoader()
        .setMaterials( materials )
        .setPath( 'models/obj/abdomen/' )
        .load( 'ToraxAbdomen2.obj', ( object ) => {
          object.position.y = - 95;
          this.scene.add( object );
          }, onProgress, onError );
      });
    //
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( this.renderer.domElement );
    this.onWindowResize()
    document.addEventListener( 'mousemove', this.onDocumentMouseMove, false );
    //
    window.addEventListener( 'resize', this.onWindowResize, false );
  }
  onWindowResize = () =>  {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }
  onDocumentMouseMove = ( event ) => {
    this.mouseX = ( event.clientX - this.windowHalfX ) / 2;
    this.mouseY = ( event.clientY - this.windowHalfY ) / 2;
  }
  //
  animate = () => {
    requestAnimationFrame( this.animate );
    this.camera.position.x += ( this.mouseX - this.camera.position.x ) * .05;
    this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * .05;
    this.camera.lookAt( this.scene.position );
    this.renderer.render( this.scene, this.camera );
    console.log(this)
  }
}

export default Renderer3D
