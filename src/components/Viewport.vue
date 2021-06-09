<template>
  <div class='viewport'></div>
</template>

<script>
import * as THREE from 'three';

export default {
  props: {
    fov: {
      type: Number,
      default: 75
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      new ResizeObserver(this.onResize).observe(this.$el);

      const width = this.$el.offsetWidth;
      const height = this.$el.offsetHeight;

      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(this.fov, width / height, 0.1, 1000);

      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      this.$el.appendChild(this.renderer.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
      this.cube = new THREE.Mesh(geometry, material);
      this.scene.add(this.cube);

      this.camera.position.z = 5;

      this.animate()
    },
    animate() {
      requestAnimationFrame(this.animate);

      this.cube.rotation.x += 0.01;
			this.cube.rotation.y += 0.01;

      this.renderer.render(this.scene, this.camera);
    },
    onResize() {
      const width = this.$el.offsetWidth;
      const height = this.$el.offsetHeight;

      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(width, height);
    }
  }
}
</script>

<style scoped>

.viewport {
  height: 100%;
}

</style>