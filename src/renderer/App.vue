<template>
  <div id="app-body" class="card">
    <div class="text-center card-header alert-primary">{{name}}</div>
    <div class="card-body">
      <macos-sysinfo></macos-sysinfo>
    </div>
  </div>
</template>
<style>
  #app-body {
    border: none;
  }
</style>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
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
