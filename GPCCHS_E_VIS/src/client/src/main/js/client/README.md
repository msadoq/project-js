# GPCCHS (VIMA)

Desktop visualisation application for ISIS project.

## Installation

Clone the project and switch to client folder:
> cd /data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client

Set configuration files and install dependencies:
> npm run hello

# Launch project for development

Launch webpack server (in a separate terminal):
> npm run webpack

Launch client with hot reload:
> npm run start-hot

# Package and run bundled project

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

## Git hooks

### Git prepare-commit hook

It's may be useful to have some additional git local hooks.

here is a little script to add automatically prefix in the commit message :

```bash
#!/bin/sh

# keep the original commit content
FILE_CONTENT="$(cat $1)"

# erase commit content
echo -n > $1

if [[ "$HL" -eq "" ]]; then
        echo -n "[FT:#$TICKET] " >> $1
else
        echo -n "[HL] " >> $1
fi

# rewrite original commit content
echo "$FILE_CONTENT" >> $1
```

##### Installation
copy this script in `/data/work/gitRepositories/LPISIS/GPCCHS/.git/hooks/prepare-commit-msg`

##### Usage
```bash
# [FT:#xxxx] <msg>
export TICKET=3622 # to set the task number.
git c -m 'Your message'

# [HL] <msg>
HL=1 git c -m 'Hors Livraison'
```

### Git pre-commit hook

```bash
#!/bin/sh
HAS_DESCRIBE_ONLY=$(git grep --cached "describe\.only" -- '*.spec.js' | wc -l)
HAS_DESCRIBE_SKIP=$(git grep --cached "describe\.skip" -- '*.spec.js' | wc -l)
HAS_IT_ONLY=$(git grep --cached "it\.only" -- '*.spec.js' | wc -l)
HAS_IT_SKIP=$(git grep --cached "it\.skip" -- '*.spec.js' | wc -l)

function error() {
	echo ====== ERROR ======
	echo "Do not commit '$1'"
	exit 1
}

if [[ "$HAS_DESCRIBE_ONLY" -ne "0" ]]; then
	error describe.only
fi

if [[ "$HAS_DESCRIBE_SKIP" -ne "0" ]]; then
	error describe.skip
fi

if [[ "$HAS_IT_ONLY" -ne "0" ]]; then
	error it.only
fi

if [[ "$HAS_IT_SKIP" -ne "0" ]]; then
	error it.skip
fi

```

##### Installation
copy this script in `/data/work/gitRepositories/LPISIS/GPCCHS/.git/hooks/pre-commit`

##### Usage
just make a normal commit, it will be rejected when you forget a 'describe.only', 'describe.skip', 'it.only' or 'it.skip'



# Troubleshoot

In case of error "Error: Module version mismatch expected 50, got 48." on launch, run following command in client folder:

```
hsc && cd node_modules/server/node_modules/common && rm -Rf node_modules && npm i
hsc && npm run start-hot
```
