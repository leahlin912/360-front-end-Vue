<template>
  <div id="highSidebar">
    <!-- <router-view name="navbarnew"></router-view> -->
    <router-view id="sidebar" name="sidebar"></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'HighSidebar'
  
  }
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
#highSidebar {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, Microsoft JhengHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #F9FBFD;
}

</style>
