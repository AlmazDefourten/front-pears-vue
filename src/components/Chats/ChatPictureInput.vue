<template>
  <div id="app">
    <h1>vue-picture-input Example</h1>
    <br><br>
    <picture-input
      ref="pictureInput"
      :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a 😺 GIF or GTFO'
      }"
      :removable="true"
      accept="image/jpeg,image/png"
      height="600"
      margin="16"
      size="10"
      width="600"
      @change="onChange">
    </picture-input>
    <br><br>
    <a class="btn btn-success" href="https://github.com/alessiomaffeis/vue-picture-input">View project on GitHub</a>
  </div>
</template>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'app',
  data() {
    return {}
  },
  components: {
    PictureInput
  },
  methods: {
    onChange() {
      console.log('New picture selected!')
      if (this.$refs.pictureInput.image) {
        console.log('Picture loaded.')
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
