import * as THREE  from "three"
import { OBJLoader, MTLLoader } from "three-obj-mtl-loader"
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
          }, onProgress, onError );
      });
    //
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( this.renderer.domElement );
    let isDragging = false
    let isMoving = false
    let previousMousePosition = {
      x: 0,
      y: 0
  };
    this.renderer.domElement.addEventListener("mousedown", (e) => {
      switch (e.button) {
        case 0:
          isDragging = true
          break
        case 1:
          isMoving = true
          break
        default:
          break;
      }
    })
    this.renderer.domElement.addEventListener("mousemove", e => {
      if (isDragging) {
        const deltaMove = {
          x: e.offsetX-previousMousePosition.x,
          y: e.offsetY-previousMousePosition.y
        }
        const deltaRotationQuaternion = new THREE.Quaternion()
            .setFromEuler(new THREE.Euler(
                toRadians(deltaMove.y * 1),
                toRadians(deltaMove.x * 1),
                0,
                'XYZ'
            ));
            this.object.quaternion.multiplyQuaternions(deltaRotationQuaternion, this.object.quaternion);

            console.log(this.camera.position, this.object.rotation)
      } else if (isMoving) {
        const deltaMove = {
          x: e.offsetX-previousMousePosition.x,
          y: e.offsetY-previousMousePosition.y
        }
        this.camera.position.x -= deltaMove.x
        this.camera.position.y += deltaMove.y
      }
      previousMousePosition = {
        x: e.offsetX,
        y: e.offsetY
      };
    })
    this.renderer.domElement.addEventListener("mouseup", e => {
      isDragging = false
      isMoving = false
    })
    this.renderer.domElement.addEventListener("mousewheel", e => {
      this.camera.position.z += Math.sign(e.deltaY) * 20
    })
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
    this.object.rotation.set(-1.516631, 0.088158, 0.234383311, "XYZ")

    this.camera.position.set(44,124,580)
  }
}

export default Renderer3D

function toRadians(angle) {
	return angle * (Math.PI / 180);
}

function toDegrees(angle) {
	return angle * (180 / Math.PI);
}