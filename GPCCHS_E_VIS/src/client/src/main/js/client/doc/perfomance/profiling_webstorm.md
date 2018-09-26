Profiling node avec webstorm
===

Génération des fichiers de log
---

Dans le fichier
`/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/lib/mainProcess/index.js`
, modifier la ligne 341 pour ajouter ces arguments :   
`'--inspect=40882', '--prof', '--nologfile_per_isolate', '--logfile=nameFile.log', '--log-timer-events'`.

L'argument `--inspect=[host:port]` permet d'activer le protocol d'inspecteur (non obligatoire,
j'ai utilisé cette option utilisé par webstorm par défaut).  

L'argument `--prof` active le profiler et génére un fichier .log avec les informations qui nous
intéresse mais non lisible.  

L'argument `--nologfile_per_isolate` permet d'enlever le nom par défaut du fichier générer
'isolate_nombreHexadécimal'.  

L'argument `--logfile` permet de nommer le fichier de log générer.  

L'argument `--log-timer-events` permet de récupérer les temps des événements des callbacks externes.  

Votre fichier est générer ici : `/data/work/gitRepositories/LPISIS/GPCCHS/GPCCHS_E_VIS/src/client/src/main/js/client/nameFile.log`  

Génération des graph de v8-profiler avec Webstorm
---

Une fois votre fichier généré ouvrer Webstorm, aller dans l'onglet 'Tools' -> 'V8 Profiling' -> 'Analyze V8 profiling Log ...'.

Sélectionnez votre fichier fraichement généré et attendez les graphs.

### Potentiels problèmes lors de la génération des graph

#### Disque plein

Les fichiers de log sont lourds il est possible que votre disque se remplisse rapidement, quasiment 1GB par fichier si vous faites des tests autour de deux min.
Si votre disque est plein regardé si vous n'avez pas générez bcp de profiling avec webstorm. Webstorm écris les graph ici: `/home/lambda/.Webstorm.X/system/v8/`.
Supprimer les dossiers qui ne vous intéresse plus.

#### Lenteur de Webstorm

Les fichiers analysé étant lourds et complexe Webstorm met du temps à les analyser et aura besoin de plus de mémoire pour les analyser sans crash.
5-6 GB a alloué permet d'analyser des fichiers de log entre 700 et 1000 MB sans trop de soucis.
