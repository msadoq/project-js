const electron = require('electron');

function displayLoadingContent() {
  const loadingContainer = `
    <div id="waitingRenderer" style="text-align: center; margin-top: 20%;">
      <style>
        .loader {
          border: 8px solid #f3f3f3; /* Light grey */
          border-top: 8px solid #192A4B; /* Blue */
          border-radius: 50%;
          width: 64px;
          height: 64px;
          animation: spin 2s linear infinite;
          display: inline-block;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
      <p id="loadingContent" style="font-family: arial; font-size: 43px; font-weight: bold; color: #D6D6D6;">
        Loading renderer ...
      </p>
      <div style="text-align: center;">
       <div class="loader"></div>
      </div>
      <p id="loadingErrors" style="margin-top: 20px; font-family: 'arial'; font-size: 22px; color: #900;">
      </p>
    </div>
    <div id="root">

    </div>
  `;
  document.body.innerHTML = loadingContainer;
}

function initParameters() {
  // https://github.com/electron/electron/issues/5224
  global.parameters = electron.remote.getCurrentWindow().parameters;
}

function loadBundle() {
  const bundle = document.createElement('script');
  bundle.src = global.parameters.get('IS_BUNDLED') === 'on'
   ? './dist/codeEditor.bundle.js'
   : `http://localhost:${global.parameters.get('WEBPACK_PORT')}/dist/codeEditor.bundle.js`;
  document.body.appendChild(bundle);

  if (global.parameters.get('IS_BUNDLED')) {
    const linkCss = document.createElement('link');
    linkCss.setAttribute('rel', 'stylesheet');
    linkCss.setAttribute('href', './dist/style.css');
    document.body.appendChild(linkCss);
  }
}

displayLoadingContent();

window.onerror = (e) => {
  document.getElementById('loadingErrors').innerHTML = `An error occured: ${e}`;
};

initParameters();
loadBundle();
