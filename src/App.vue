<template>
  <div id="app">
    <router-view name="navbarnew"></router-view>
    <!-- <router-view id="sidebar" name="sidebar"></router-view> -->
    <router-view/>
    
  </div>
</template>

<script>
export default {
  name: 'App'
  
  }
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, Microsoft JhengHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: #F9FBFD;
}


</style>
