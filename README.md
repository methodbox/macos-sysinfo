# macos-sysinfo

## Built With

![image of Electron](https://avatars3.githubusercontent.com/u/13409222?s=200&v=4&s=50)
![Image of Vue](https://avatars3.githubusercontent.com/u/6128107?s=200&v=4&s=50)
![Image of webpack](https://avatars1.githubusercontent.com/u/2105791?s=200&v=4&s=50)

## System Info app for macOS.

### Super-alpha release @ https://github.com/methodbox/macos-sysinfo/releases

Currently supports:

CPU model, speed and arch.

Network interface (en0 only IPv4/6)

Hostname

OS Version

RAM

#### Basic Usage

Clone the repo.

```bash
git clone https://github.com/methodbox/macos-sysinfo.git
```

Install the Node modules.

```bash
cd macos-sysinfo
npm install
```

#### Run the App or Build

```bash
# Run the app without building
npm start

# Build the app
npm run build
```

#### Install the app on your Mac

After building you will find a `.dmg` file in the `dist` folder `macos-sysinfo/dist/macos-sysinfo-[version].dmg`. Double-click the `.dmg` file and drag-and-drop the app into you Applications folder.
