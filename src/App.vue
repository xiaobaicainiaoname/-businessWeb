<template>
  <div id="app">

    <img src="./assets/logo.png">
    <!-- <router-view/> -->

    <tree/>
    <!--  aaaa
    <dialogs/> -->
    <!-- <study/> -->
  </div>
</template>

<script>
import tree from './components/Tree'
import dialogs from './components/dialogs'
import study from './components/study'

export default {
  name: 'App',
  components: {
    tree,
    dialogs,
    study
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
