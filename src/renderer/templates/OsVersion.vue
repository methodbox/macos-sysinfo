<template>
  <div>
    <p>OS: {{ ProductName }}</p>
    <p>Version: {{ ProductVersion }}</p>
    <p>Build: {{ BuildVersion }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      ProductName: {
        type: String,
        required: true
      },
      ProductVersion: {
        type: String,
        required: true
      },
      BuildVersion: {
        type: String,
        required: true
      }
    }
  }
</script>