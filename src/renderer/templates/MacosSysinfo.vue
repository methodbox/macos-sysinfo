<template>
  <div>
    <div class="container" id="stats-container">
      <div class="card-columns">
        <div class="card alert-success" id="proc-div">
          <div class="card-header">Processor Details</div>
          <div class="card-body">
            <processor :model="processor.model" :arch="processor.arch" :count="processor.count"></processor>
          </div>
        </div>
        <div class="card alert-success">
          <div class="card-header">System Memory</div>
          <div class="card-body">
            Total RAM: {{ systemMemory}}<span v-if="systemMemory"> GB</span>
          </div>
        </div>
        <div class="card alert-warning">
          <div class="card-header">Network Interfaces</div>
          <div class="card-body">
            <network-interface
            :v4address="netInterfacev4.address"
            :v4netmask="netInterfacev4.netmask"
            :v4mac="netInterfacev4.mac"
            :v6address="netInterfacev6.address"
            :v6netmask="netInterfacev6.netmask"
            :v6mac="netInterfacev6.mac"
            ></network-interface>
          </div>
        </div>
        <div class="card alert-dark">
          <div class="card-header">macOS Version Information</div>
          <div class="card-body">
            <os-version :ProductName="osVersion.ProductName" :ProductVersion="osVersion.ProductVersion" :BuildVersion="osVersion.BuildVersion"></os-version>
          </div>
        </div>
        <div class="card alert-dark">
          <div class="card-header">Computer Name (Hostname)</div>
          <div class="card-body">
            Name: {{ hostName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  #stats-container {
    padding: 24px;
  }
  .btn {
    border-radius: 2px;
  }
</style>


<script>
  import os from 'os'
  import nodeCMD from 'node-cmd'
  //  Templates
  import Processor from './Processor'
  import OsVersion from './OsVersion'
  import SystemMemory from './SystemMemory'
  import NetworkInterface from './NetworkInterface'
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
    components: {
      Processor,
      OsVersion,
      SystemMemory,
      NetworkInterface
    },
    created() {
      this.getOSVersion()
      this.getHostname()
      this.getCores()
      this.getMemory()
      this.getNetwork()
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