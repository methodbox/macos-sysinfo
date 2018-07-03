<template>
  <div>
    {{ systemMemory }} GB
  </div>
</template>

<script>
  export default {
    props: {
      systemMemory: {
        type: Number,
        required: true
      }
    }
  }
</script>