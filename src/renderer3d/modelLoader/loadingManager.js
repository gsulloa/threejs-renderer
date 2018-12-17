import * as THREE from "three"

export default function initLoadingManager({ last = true } = {}) {
  const manager = new THREE.LoadingManager();

  const progressBar = document.querySelector( '#progress' );
  const loadingOverlay = document.querySelector( '#loading-overlay' );
  let percentComplete = 1;
  let frameID = null;
  const animateBar = () => {
    if ( percentComplete >= 100 ) {
      progressBar.style.backgroundColor = 'blue'
      percentComplete = 100;
    }
    progressBar.style.width = percentComplete + '%';
    frameID = requestAnimationFrame( animateBar )

  }

  manager.onStart = () => {
    // prevent the timer being set again
    // if onStart is called multiple times
    if ( frameID !== null ) return;
    animateBar();
  };

  manager.onLoad = function ( ) {

    
    // reset the bar in case we need to use it again
    percentComplete = 0;
    progressBar.style.width = 0;
    if (last) {
      loadingOverlay.classList.add( 'loading-overlay-hidden' );
      cancelAnimationFrame( frameID );
    }

  };
  
  manager.onError = function ( e ) { 
    
    console.error( e ); 
    
    progressBar.style.backgroundColor = 'red';
  
  }

  manager.onProgress = (item, loaded, total) => {
    percentComplete = (loaded / total) * 100
  }
  
  return manager;
}