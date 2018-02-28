# GPCCHS (VIMA)

Desktop visualisation application for ISIS project.

# Installation

Clone the vima (if needed):
> cd /data/work/gitRepositories/LPISIS/
> git clone gitolite@isis.cnes-isis.toulouse.atos.net:gpcc/LPISIS/GPCCHS.git GPCCHS
> git checkout R10-dev

Clone the rtd (if needed):
> cd /data/work/gitRepositories/LPISIS/
> git clone gitolite@isis.cnes-isis.toulouse.atos.net:gpds/LPISIS/GPDS.git GPDS
> git checkout R10-fwk

Switch to client folder:
> cd /data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client

Set configuration files and install dependencies:
> npm run hello

## Launch project for development

Launch webpack server (in a separate terminal):
> npm run webpack

Launch client with hot reload:
> npm run start-hot

## Package and run bundled project

See PACKAGE.md.

## Other procedures

Run unit tests on business logic (store and computing logic):
> npm test

Run unit tests on graphical components:
> npm run snapshot

Run unit tests on graphical components with watch mode:
> npm run snapshot:watch

If you have an ENOSPC error, maybe due to too much watched files, execute this command to
enlarge number of watchers on your system
> echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p

Check the project source code linting:
> npm run lint

Run Jest snapshot testing:
>npm run snapshot

Run Jest snapshot watcher:
>npm run snapshot-watch

Clean out of date snapshots:
>npm run snapshot-clean

------------------------------------------------------------------

# Code editors

#### VSCode

Launch VSCode in working directory:
```
/usr/share/code/code --new-window .
```
then install eslint plugin by Dirk Baeumer.

#### Atom

Install atom:
```
( unset http_proxy ; unset https_proxy ; yum install atom )
```

Launch Atom in working directory:
```
atom .
```
then install linter-eslint  plugin by AtomLinter.


### Webpack bundle analyzer

#### Configuration
You need to forward the 4242 and 4243 port between your host and desktopx.

please add this in .ssh/config on your host machine :
```
Host desktopx
    HostName 192.168.57.9
    Port 22
    User lambda
    LocalForward 4242 127.0.0.1:4242
    LocalForward 4243 127.0.0.1:4243
```

#### Usage
analyze renderer bundle :
```bash
# listen on 4242 port
npm run stats:main
```

analyze main bundle :
```bash
# listen on 4243 port
npm run stats:renderer
```
Then run your usual firefox on corresponding port.

------------------------

# Lodash FP documentation
You can find a lodash fp documentation here : https://gist.github.com/jfmengels/6b973b69c491375117dc

-------------------

# Launch VIMA connected to a real DataController daemon (no stubs)

## for GPCCHS

### Host configuration

You need to forward 2 ports between host and desktopx.

In your `~/.ssh/config`, add :
```
Host desktopx
    HostName <IP desktopx>
    Port 22
    User lambda
    RemoteForward 20002 <IP dc>:20002
    LocalForward 0.0.0.0:20003 127.0.0.1:20003
```

#### desktopx configuration
 Add this lines in `config.local.json` :
 ```
{
  "ZMQ_GPCCDC_PUSH": "tcp://127.0.0.1:20002",
  "ZMQ_GPCCDC_PULL": "tcp://127.0.0.1:20003",
  "STUB_DC_ON": "off"
}
 ```

 #### ssh daemon configuration
 Connect with `root` user, then, add this lines in `/etc/ssh/sshd_config` :
 ```
GatewayPorts yes
AllowTcpForwarding yes
 ```

## for DC

### Host Configuration

You need to forward 2 ports between host and desktopx.

In your `~/.ssh/config`, add :
```
Host desktopx
    HostName <IP desktopx>
    Port 22
    User lambda
    RemoteForward 20003 <IP vima>:20003
    LocalForward 0.0.0.0:20002 127.0.0.1:20002
```

#### desktopx Configuration

 #### ssh daemon configuration
 Connect with `root` user, then, add this lines in `/etc/ssh/sshd_config` :
 ```
GatewayPorts yes
AllowTcpForwarding yes
 ```


--------------------------------------------
# Troubleshoot

In case of error "Error: Module version mismatch expected 50, got 48." on launch, run following command in client folder:

```
hsc && cd node_modules/server/node_modules/common && rm -Rf node_modules && npm i
hsc && npm run start-hot
```


In case of error 'ENOSPC' when run 'npm run test:watch' :

```
su root
echo fs.inotify.max_user_watches=524288 | tee -a /etc/sysctl.conf && sysctl -p
```

In case of error 'ImportError: No module named GPINUC_L_UCL.unitConverterLibrary.unitConverter'

```
```

------------------------------------------------------------------

# Doxygen tags / Unit tests
@see http://isis.cnes-isis.toulouse.atos.net/plugins/docman/?group_id=111&action=show&id=8533

```javascript
/** 
 * @brief test description
 * @ElementUnderTest /data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/adapters/isis/userEvent/userEvent.spec.js
**/ 
```
