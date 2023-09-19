<template>
  <div>
    <div class="post-header container-fluid"></div>
    <img class="container-fluid p-0 post-image" src="/src/image.png"/>
    <div class="post-footer container-fluid"></div>
  </div>
</template>

<script>

export default {
  name: 'Frame',
  props: {},
  data() {
    return {
      raw8ne3: ' ',
      raw94ld: ' ',
    }
  },
}
</script>

<style scoped>
.post-header {
  background: #007E3E; /* Цвет фона */
  color: #fff; /* Цвет текста */
  border-radius: 4vh 4vh 0 0; /* Уголки */
  height: 10%;
}
.post-footer {
  border-radius: 0 0 4vh 4vh;
  border-top: 1px solid rgba(0, 0, 0, 0.10);
  background: #FFF;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  height: 30%;
  flex-shrink: 0;
}
.post-image {
}
</style>
