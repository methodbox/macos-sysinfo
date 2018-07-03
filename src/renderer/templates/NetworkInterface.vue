<template>
  <div>
    <p>IPv4 Address: {{ v4address }}</p>
    <p>Subnet Mask: {{ v4netmask }}</p>
    <p>MAC Address: {{ v4mac }}</p>
    <br />
    <p>IPv6 Address: {{ v6address }}</p>
    <p>Subnet Mask: {{ v6netmask }}</p>
    <p>MAC Address: {{ v6mac }}</p>
  </div>
</template>

<script>
  export default {
    props: {
      v4address: {
        type: String,
        required: true
      },
      v4netmask: {
        type: String,
        required: true
      },
      v4mac: {
        type: String,
        required: true
      },
      v6address: {
        type: String,
        required: true
      },
      v6netmask: {
        type: String,
        required: true
      },
      v6mac: {
        type: String,
        required: true
      }
    }
  }
</script>
