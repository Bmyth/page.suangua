<template>
  <v-app id="app">
    <router-view/>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html, body{
  height: 100%;
}
#app {
  font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.v-tooltip__content{
  background: transparent !important;
  box-shadow: none;
}

.v-tooltip__content p, .v-tooltip__content span{
  font-size: 14px;
  color: #666;
  padding-bottom: 5px;
  margin: 0;
  text-align: center;
  line-height: 1.4;
}
</style>
