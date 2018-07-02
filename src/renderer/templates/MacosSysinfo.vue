<template>
  <div>
    <div class="btn-group">
      <button class="btn" @click="getHostname">Hostname</button>
      <button class="btn" @click="getCores">CPU Model</button>
      <button class="btn" @click="getNetwork">Network</button>
      <button class="btn" @click="getOSVersion">macOS Version</button>
      <button class="btn" @click="getMemory">RAM</button>
      <button class="btn btn-reset" @click="resetStats">RESET</button>
    </div>
    <ul id="stats-list">
      <li v-if="hostName">
        <h3>Hostname: {{ hostName }}</h3>
      </li>
      <li v-if="processor.model">
        <h3>Processor Details</h3>
        <p>Model: {{ processor.model }}</p>
        <p>Cores: {{ processor.count }}</p>
        <p>Architecture: {{ processor.arch }}</p>
      </li>
      <li v-if="osVersion.ProductName">
        <h3>macOS Version Information</h3>
        <p>{{ osVersion.ProductName }}</p>
        <p>{{ osVersion.ProductVersion }}</p>
        <p>{{ osVersion.BuildVersion }}</p>
      </li>
      <li v-if="systemMemory">
        <h3>Total System RAM</h3>
        <p>{{ systemMemory }} GB</p>
      </li>
      <li>
        <div v-if="netInterfacev4.address">
          <h3>IPv4 Network Interface</h3>
          <p><span id="ip-address-v4">IPv4 Address: </span> {{ netInterfacev4.address }}</p>
          <p><span id="subnet-mask-v4">Subnet Mask: </span>{{ netInterfacev4.netmask }}</p>
          <p><span id="mac-address-v4">MAC Address: </span>{{ netInterfacev4.mac }}</p>
          <p></p>
        </div>
        <div v-if="netInterfacev6.address">
          <h3>IPv6 Network Interface</h3>
          <p><span id="ip-address-v6">IPv6 Address: </span> {{ netInterfacev6.address }}</p>
          <p><span id="subnet-mask-v6">Subnet Mask: </span>{{ netInterfacev6.netmask }}</p>
          <p><span id="mac-address-v6">MAC Address: </span>{{ netInterfacev6.mac }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<style>
  li {
    list-style: none;
    margin-left: -25px;
    margin-bottom: 20px;
  }
  h3 {
    color: purple
  }
  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 2px;
    color: #fff;
    text-transform: uppercase;
  }
  .btn:hover {
    background: #4668a5
  }
  .btn-group {
    margin-left: 12%;
  }
  .btn-reset {
    background-color: red
  }
  #stats-list {
    margin-left: 20%;
  }
</style>


<script>
  import os from 'os'
  import nodeCMD from 'node-cmd'
  export default {
    data() {
      return {
        osVersion: {
          ProductName: null,
          ProductVersion: null,
          BuildVersion: null
        },
        hostName: null,
        processor: {
          model: null,
          arch: null,
          count: null 
        },
        systemMemory: null,
        netInterfacev4: {},
        netInterfacev6: {}
      }
    },
    methods: {
      resetStats() {
          this.osVersion.ProductName = null
          this.osVersion.ProductVersion = null
          this.osVersion.BuildVersion = null
          this.hostName = null
          this.processor.model = null
          this.processor.arch = null
          this.processor.count = null
          this.systemMemory = null
          this.netInterfacev4 = {}
          this.netInterfacev6 = {}
      },
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
        this.hostName = os.hostname()
      },
      getCores() {
        let cores = os.cpus()
        this.processor.model = os.cpus()[0].model
        this.processor.arch = os.arch()
        this.processor.count = os.cpus().length
      },
      getMemory() {
        let totalRAM = os.totalmem()
        this.systemMemory = parseInt(totalRAM * 1e-6 / 1024)
      },
      getNetwork() {
        let network = os.networkInterfaces().en0
        this.netInterfacev6 = network[0]
        this.netInterfacev4 = network[1]
      }
    }
  }
</script>