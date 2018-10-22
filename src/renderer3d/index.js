import * as THREE  from "three"
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader"
import ObjectController from "./objectController";
class Renderer3D {
  constructor({
    container,
  }) {
    this.mouseX = 0
    this.mouseY = 0
    this.camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    this.camera.position.z = 600;


    // scene
    this.scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight( 0xffffff, 0.8 );
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
          this.object = object
          object.position.y = 0;
          this.scene.add( object );
          this.objectController = new ObjectController({
            camera: this.camera,
            object: this.object,
            domElement: this.renderer.domElement,
            initial: {
              position: {
                x: 44,
                y: 124,
                z: 580,
              },
              rotation: {
                x: -1.516631,
                y: 0.088158,
                z: 0.234383311,
              }
            }
          })
          }, onProgress, onError );
      });
    //
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( this.renderer.domElement );
    
    //
    window.addEventListener( 'resize', this.onWindowResize, false );
  }
  onWindowResize = () =>  {
    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;
    this.camera.updateProjectionMatrix();
  }
  //
  animate = () => {
    requestAnimationFrame( this.animate );
    this.renderer.render( this.scene, this.camera );   
  }

  resetControls = () => {
    this.objectController.resetControls()
  }

  getCurrentPosition = () => {
    console.log(this.objectController.currentPosition())
  }

  
}

export default Renderer3D
