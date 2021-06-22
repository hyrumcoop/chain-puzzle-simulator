import { onMounted, ref, shallowRef } from 'vue';
import * as THREE from 'three';

const FOV = 75;

const useRenderer = () => {
  const viewport = ref(null);

  const scene = shallowRef(null);
  const camera = shallowRef(null);
  const renderer = shallowRef(null);

  const animations = [];

  const initRenderer = () => {
    const width = viewport.value.offsetWidth;
    const height = viewport.value.offsetHeight;

    scene.value = new THREE.Scene();
    camera.value = new THREE.PerspectiveCamera(FOV, width / height, 0.1, 1000);

    renderer.value = new THREE.WebGLRenderer({antialias: true});
    renderer.value.setSize(width, height);
    renderer.value.setClearColor(0xffffff, 1);
    viewport.value.appendChild(renderer.value.domElement);

    new ResizeObserver(onResize).observe(viewport.value);
  }

  const onAnimate = func => {
    if (typeof func === 'function') {
      animations.push(func)
    }
  }

  const animate = () => {
    requestAnimationFrame(animate);

    animations.forEach(func => func());

    renderer.value.render(scene.value, camera.value);
  }

  const onResize = () => {
    const width = viewport.value.offsetWidth;
    const height = viewport.value.offsetHeight;

    camera.value.aspect = width / height;
    camera.value.updateProjectionMatrix();

    renderer.value.setSize(width, height);
  }
  
  onMounted(initRenderer);

  return {
    viewport,
    scene,
    camera,
    renderer,

    initRenderer,
    onResize,
    onAnimate,
    animate
  }
}

export default useRenderer;