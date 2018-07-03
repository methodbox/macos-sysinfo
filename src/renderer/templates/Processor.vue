<template>
  <div>
    <p>Model: {{ model }}</p>
    <p>Cores: {{ count }}</p>
    <p>Architecture: {{ arch }}</p>
  </div>
</template>

<style>
  #proc-div {
    
  }
</style>


<script>
  export default {
    props: {
      model: {
        type: String,
        required: true
      },
      count: {
        type: Number,
        required: true
      },
      arch: {
        type: String,
        required: true
      }
    }
  }
</script>