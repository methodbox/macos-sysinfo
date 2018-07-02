<template>
  <div>
    <h1>{{name}}</h1>
    <macos-sysinfo></macos-sysinfo>
  </div>
</template>

<script>
  import MacosSysinfo from './templates/MacosSysinfo'
  export default {
    data() {
      return {
        name: 'System Info'
      }
    },
    components: {
      MacosSysinfo
    }
  }
</script>
