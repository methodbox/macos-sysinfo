<template>
  <div>
    <h2 id="app-title">{{name}}</h2>
    <macos-sysinfo></macos-sysinfo>
  </div>
</template>
<style>
  body {
    background: cornflowerblue;
    color: lightgray;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif
  }
  #app-title {
    padding: 30px;
    text-align: center;
  }
</style>

<script>
  import MacosSysinfo from './templates/MacosSysinfo'
  export default {
    data() {
      return {
        name: 'macOS System Info'
      }
    },
    components: {
      MacosSysinfo
    }
  }
</script>
