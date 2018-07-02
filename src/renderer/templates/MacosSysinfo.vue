<template>
  <div>
    <button @click="getHostname">Hostname</button>
    <button @click="getCores">CPU Model</button>
    <button @click="getNetwork">Network</button>
    <button @click="getOSVersion">macOS Version</button>
    <ul>
      <li>
        {{ hostName }}
      </li>
      <li v-if="osVersion.ProductName !== ''">
        <h3>macOS Version Information</h3>
        <ul>
          <li>{{ osVersion.ProductName }}</li>
          <li>{{ osVersion.ProductVersion }}</li>
          <li>{{ osVersion.BuildVersion }}</li>
        </ul>
      </li>
      <li v-for="(core) in cpuModel" :key="core.id">
        {{ core }}
      </li>
      <li v-for="(netIf, netKey) in netInterfacev4" v-bind:key="netKey.id" v-if="netInterfacev4 !== []">
        <h3>IPV4 Network Interface</h3>
        <p>{{ netIf.address }}</p>
        <p>{{ netIf.netmask }}</p>
        <p>{{ netIf.family }}</p>
        <p>{{ netIf.mac }}</p>
      </li>
    </ul>
  </div>
</template>
<style>
  li {
    list-style: none;
    margin-left: -25px;
    margin-bottom: 10px;
  }
</style>


<script>
  import os from 'os'
  import nodeCMD from 'node-cmd'
  export default {
    data() {
      return {
        osVersion: {
          ProductName: '',
          ProductVersion: '',
          BuildVersion: ''
        },
        hostName: null,
        cpuModel: [],
        netInterfacev4: [],
        netInterfacev6: []
      }
    },
    methods: {
      getOSVersion() {
        nodeCMD.get(
          'sw_vers',
          (err, data, stderr) => {
            let cleanedData = data.split('\n').toString().replace(/\s/g,' ').split(',')
            this.osVersion.ProductName = cleanedData[0].split(':')[1].toString().trim()
            this.osVersion.ProductVersion = cleanedData[1].split(':')[1].toString().trim()
            this.osVersion.BuildVersion = cleanedData[2].split(':')[1].toString().trim()
          }
        )
      },
      getHostname() {
        this.hostname = null
        let hostname = os.hostname()
        this.hostName = hostname
      },
      getCores() {
        let cores = os.cpus()
        let coreCount = 0
        this.cpuModel = []
        cores.forEach((core) => {
          coreCount += 1
          this.cpuModel.push('Core ' + coreCount + ' ' + core.model)
        })
      },
      getNetwork() {
        this.netInterfacev6 = []
        this.netInterfacev4 = []
        let network = os.networkInterfaces().en0
        this.netInterfacev6.push(network[0])
        this.netInterfacev4.push(network[1])
      }
    }
  }
</script>