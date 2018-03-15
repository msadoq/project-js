const chalk       = require('chalk');
const clear       = require('clear');
const figlet      = require('figlet');
const inquirer   = require('inquirer');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;
const resolve = require('path').resolve;
const CLI         = require('clui')
const Spinner     = CLI.Spinner;
const simpleGit = require('simple-git')();
const asyncLib = require('async');
const GIT_PATH = '/usr/bin/git';
const DOC_PATH = 'README.md'
const ECLIPSE_PATH =  '../ECLIPSE_ACCELEO';
const RSA_WORKSPACE = process.env.RSA_WORKSPACE;
const spawn = require('child_process').spawn;
const fs = require('fs');
const showdown  = require('showdown')
const shell = require('shelljs');
const listOfRepos = [
    {
        name: "CCSDS/COM",
        parent: 'CCSDS',
        path: '../CCSDS/COM',
        remote:'gitolite@isis.cnes-isis.toulouse.atos.net:ccsds/CCSDS/COM.git',
    },
    {
        name: "CCSDS/CS",
        parent: 'CCSDS',
        path: '../CCSDS/CS',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:ccsds/CCSDS/CS.git',
        
    },
    {
        name: "CCSDS/MAL",
        parent: 'CCSDS',
        path: '../CCSDS/MAL',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:ccsds/CCSDS/MAL.git',
    },
    {
        name: "CCSDS/MC",
        parent: 'CCSDS',
        path: '../CCSDS/MC',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:ccsds/CCSDS/MC.git',
    },
    {
        name: "CCSDS/PROFILES",
        parent: 'CCSDS',
        path: '../CCSDS/PROFILES',
        remote:'gitolite@isis.cnes-isis.toulouse.atos.net:ccsds/CCSDS/PROFILES.git',
    },
    {
        name: "GPAU_RSA",
        path: '../GPAU_RSA',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpau-gpa/LPISIS/GPAU_RSA.git',
    },
    {
        name: "GPCC_RSA",
        path: '../GPCC_RSA',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpcc/LPISIS/GPCC_RSA.git',
    },{
        name: "GPDS_RSA",
        path: '../GPDS_RSA',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpds/LPISIS/GPDS_RSA.git',
    },{
        name: "GPIN_RSA",
        path: '../GPIN_RSA',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpin/LPISIS/GPIN_RSA.git',
    },{
        name: "GPMC_RSA",
        path: '../GPMC_RSA',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpmc/LPISIS/GPMC_RSA.git',
    },{
       name: "GPOS_RSA",
       path: '../GPOS_RSA',
       remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpos/LPISIS/GPOS_RSA.git', 
    },{
       name: "GPVI_RSA",
       path: '../GPVI_RSA',
       remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpvi/LPISIS/GPVI_RSA.git',
    },{
        name: "LPISIS",
        path: '../LPISIS',
        remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:lpisis/LPISIS.git',
     }
];
const GENERATORS = {
    name: 'GENERATORS',
    remote: 'gitolite@isis.cnes-isis.toulouse.atos.net:gpvi/TOOLS/GENERATORS.git',
    branch: 'R8',
};
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

const CHECK_VERSION = 0;
const UPDATE_VERSION = 1;
const GENERATE_VERSION = 2;

const checkVersion = (callback) => {
   const asyncCb = listOfRepos.map(({ name, path }) => {
       return (cb) => {
        const correctPath = `${RSA_WORKSPACE}/RSA/${name}`;
        exec(`git symbolic-ref --short HEAD`, {
            cwd: correctPath,
        }, (error, stdout, stderr) => {
            cb(null, {
                error,
                stdout,
                stderr,
                correctPath,
                name
            });
        });
       }
   });
   asyncLib.series(asyncCb, (err, results) => {
    results.forEach(({error, stdout, stderr, correctPath, name}) => {
        console.log(`${chalk.yellow(name)} is on ${chalk.blue(stdout)}`);
    })
    if(callback) {
        callback();
    }
   })
}
const updateVersion = (callback) => {

    const questionsBis = listOfRepos.map(({name, path}, index) => {
        
        return {
            name,
            prefix: `[${index + 1}/${listOfRepos.length}] ${name}`,
            type: 'list',
            message: 'Quelle branche choisir ?',
            choices: () => {
                return new Promise((resolve, reject) => {
                    const correctPath = `${RSA_WORKSPACE}/RSA/${name}`;
                    exec(`for branch in \`git branch -r | grep -v HEAD\`;do echo -e \`git show --format="%ci %cr" $branch | head -n 1\` \\\t$branch; done | sort -r`, {
                        cwd: correctPath,
                    }, (error, stdout, stderr) => {
                        resolve(stdout.split('\n'));
                    });
                })
            },
            filter: function(value) {
                return {
                    value,
                    path,
                    name
                };
            }
        }  
    });
    inquirer.prompt(questionsBis).then((response) => {
    
        const mapped = Object.keys(response).map((key) => {
            return response[key];
        });
        const asyncArray = mapped.map(({name, path, value}) => {
            return (cb) => {
                
                const branch = value.split("origin/").pop();
                //const branch = value;
                const status = new Spinner(`Pulling ${branch} for ${name}`);
                status.start();
                exec(`git checkout ${branch} && git pull`, {
                    cwd: `${RSA_WORKSPACE}/RSA/${name}`,
                }, (error, stdout, stderr) => {
                    status.stop();
                    cb(null, {
                        stdout,
                        stderr,
                        error,
                        name,
                        branch,
                    });
                });
            }

        });
        asyncLib.series(asyncArray, (err, results) => {
            results.forEach(({
                        stdout,
                        stderr,
                        error,
                        name,
                        branch,
                    }) => {
                console.log(`${chalk.bold.yellow(name)} on branch ${chalk.bold.blue(branch)} : `);
                console.log('\t', chalk.green('stdout :'), stdout);
                console.log('\t', chalk.red('stderr :'), stderr);
                console.log('\t', chalk.red('error :'), error);
            })
            if(callback) {
                callback();
            }
        });
    // console.log(mapped);
  });
};
const generateVersion = () => {
//     console.log(chalk.red('CELA RISQUE DE PRENDRE UN PEU DE TEMPS, JE VOUS PROPOSE CE CAFE AFIN DE PATIENTER'));
//     console.log(`
//                             (
//                           )     (
//                    ___...(-------)-....___
//                .-""       )    (          ""-.
//          .-''''|-._             )         _.-|
//         /  .--.|   '""---...........---""'   |
//        /  /    |                             |
//        |  |    |                             |
//         \\  \\   |                             |
//          '\\ '\\ |                             |
//            '\\ '|                             |
//            _/ /\\                             /
//           (__/  \\                           /
//        _..---""' \\                         /'""---.._
//     .-'           \\                       /          '-.
//    :               '-.__             __.-'              :
//    :                  ) ""---...---"" (                 :
//     '._               '"--...___...--"'              _.'
//       \\""--..__                              __..--""/
//        '._     """----.....______.....----"""     _.'
//           '""--..,,_____            _____,,..--""'
//                         '"""----"""'
//                     `);
console.log(chalk.hex('#551A8B')(`
                      88 ${chalk.hex('#EBA53D')('""')}                                   
                      88 ${chalk.hex('#EBA53D')('""')}                                     
                      88                                      
 ,adPPYba,  ,adPPYba, 88 88 8b,dPPYba,  ,adPPYba,  ,adPPYba,  
a8P_____88 a8"     "" 88 88 88P'    "8a I8[    "" a8P_____88  
8PP""""""" 8b         88 88 88       d8  '"Y8ba,  8PP"""""""  
"8b,   ,aa "8a,   ,aa 88 88 88b,   ,a8" aa    ]8I "8b,   ,aa  
 '"Ybbd8"'  '"Ybbd8"' 88 88 88'YbbdP"'  '"YbbdP"'  '"Ybbd8"'  
                            88                                
                            88                                

`));
    console.log(chalk.yellow(`=== Adapters creation via CLI is not impemented yet  ===`));
    console.log(chalk.yellow(`===              Please use Eclipse                  ===`));

    const question = [{
        name: 'eclipse',
        type: 'list',
        message: 'Would you like to open Eclipse ?',
        choices: [
            { 
                name: 'Yes',
                value: true,
            }, 
            {
                name:  'No',
                value: false,
            }
        ],
    }]
    inquirer.prompt(question).then((response) => {
        if(response['eclipse']) {
            console.log("Checking if Eclipse exists");
            if(!fs.existsSync(`${__dirname}/${ECLIPSE_PATH}`)){
                console.log(chalk.red.bold("Eclipse not found!"));
                console.log('Please provide your login name to fetch Eclipse from the host\n');
                askPName().then(({ userName }) => {
                    console.log('This may take some time (Eclipse is voluminous)');
                    fs.mkdirSync(`${__dirname}/${ECLIPSE_PATH}`);
                    const statusEclipse = new Spinner(`Copying Eclipse from isis/visu`);
                    statusEclipse.start();
                    execSync(`scp -r ${userName}@192.168.57.1:/isis/visu/eclipse_generateur/* ${__dirname}/${ECLIPSE_PATH}`);
                    statusEclipse.stop();
                    launchEclipse();
                });
                // 
            }else {
                launchEclipse();
            }
        } else {
            console.log("YOU GADDAM RIGHT, ECLIPSE SUCKS");
        }
    });
}

const launchEclipse = () => {
    spawn(`${__dirname}/${ECLIPSE_PATH}/eclipse`, [], {
        detached: true,
        stdio: 'ignore',
    }).unref();
    
    exec('firefox doc.html &', {
        cwd: `${__dirname}/doc`,
        detached: true,
        stdio: 'ignore',
    }).unref();
}
const menu = {
    [CHECK_VERSION]: checkVersion,
    [UPDATE_VERSION]: updateVersion,
    [GENERATE_VERSION]: () => {
        checkIfVerionUpToDate((promise) => {
            promise.then(({ update }) => {
                if(update){
                    updateVersion(generateVersion);
                } else {
                    generateVersion();
                }
                
            })
        })
    },
}

const checkIfVerionUpToDate = (callback) => {
    checkVersion(() => {
        const questions = [{
        name: 'update',
        type: 'list',
        message: 'VWould you like to update the RSA repositories ? Check above for current branches.',
        choices: [
            {
                name: 'Yes',
                value: true
            }, 
            {
                name: 'No',
                value: false
            }
        ]
    }]
    callback(inquirer.prompt(questions));
    });
    
}

const askPName = () => {
    const question = [{
        name: "userName",
        type: "input",
        message: "Login (pNom)",
    }];
    return inquirer.prompt(question);
};

const askDoYouWantToDo = () => {
    const questions = [{
        name: 'menuChoice',
        type: 'list',
        message: 'What do you want to do ?',
        choices: [
            { 
                name: 'Check currents branches of RSA repositories',
                value: CHECK_VERSION,
            }, 
            {
                name:  'Change/update branches of RSA repositories',
                value: UPDATE_VERSION,
            },
            {
                name: 'Generate adapters/protos',
                value: GENERATE_VERSION,
            } 
        ],
    }]
    return inquirer.prompt(questions);
}

clear();
console.log(
  chalk.yellow(
    figlet.textSync('RSA Updater', { horizontalLayout: 'full' })
  )
);



const run = () => {
  const asyncArray = [];
  if(!fs.existsSync(`${RSA_WORKSPACE}/RSA`)){
    fs.mkdirSync(`${RSA_WORKSPACE}/RSA`);
  }
  console.log('Checking GENERATORS repositories');
  if(!fs.existsSync(`${RSA_WORKSPACE}/RSA/${GENERATORS.name}`)){
    const statusGen = new Spinner(`Cloning GENERATORS`);
    statusGen.start();
    execSync(`git clone ${GENERATORS.remote}`,{
        cwd: `${RSA_WORKSPACE}/RSA`,
    });
    execSync(`git checkout ${GENERATORS.branch}`,{
        cwd: `${RSA_WORKSPACE}/RSA/${GENERATORS.name}`,
    });
    statusGen.stop();
  } else {
    console.log(chalk.green("GENERATORS repo present.\n"));
  }
  console.log("Checking RSA git repositories");
  const status = new Spinner(`Checking git repositories`);
  status.start();
  listOfRepos.forEach(({name, parent, remote}) => {
    if(!fs.existsSync(`${RSA_WORKSPACE}/RSA/${name}`)){
        let realPath = `${RSA_WORKSPACE}/RSA`;
        if(parent) {
            realPath = `${realPath}/${parent}`;
            shell.mkdir('-p', realPath);
        }
        asyncArray.push((cb) => {
            const statusClone = new Spinner(`Cloning ${name}`);
            statusClone.start();
            exec(`git clone ${remote}`, {
                cwd: realPath,
            }, (error, stdout, stderr) => {
              statusClone.stop();
              cb(null, {error, stdout, stderr});  
            });
        });
    }
  });
   status.stop();
  if(asyncArray.length !== 0) {
    console.log(chalk.red("Cloning missing repositories"));
    asyncLib.series(asyncArray, (truc, results) => {
        results.forEach(({error, stdout, stderr}) => {

        })
        askDoYouWantToDo().then(({ menuChoice }) => {
            menu[menuChoice]();
        });
    });
  } else {
      
      status.stop();
      console.log(chalk.green("All RSA repositories present.\n"));
      askDoYouWantToDo().then(({ menuChoice }) => {
            menu[menuChoice]();
      });
  }  
  
}

run();
