// const ApiError = require('../utils/apiError');
// const path = require ('path');
/**
* Ici je fais appel à deux functions :
*                         << VERIFICATION D'UNE PAGE >>
****      -- SI j'ai une page => je récupére le path de la page
*            ET je l'insère dans un tableau
*             RETURN map de path; => req.body clé/valeur
*                         << VERIFICATION D'UNE VIEW >>
*         -- SI j'ai une view => je récupére le path de la view
*            ET je l'insère dans un tableau
*             RETURN tableau de path;
* mon middleware doit renvoyer un objet JSON du contenu de tous les path
**/

// module.exports = (req, res, next) => {
//   const filepath = req.validated.path;
//
//   if (filepath.workspace) {
//     res.send(filepath);
//   }
//
//   if (filepath.workspace) {
//     res.sendFile(filepath.pages);
//   } else if (filepath.pages) {
//     res.send(filepath.views);
//   } else {
//     return next(new ApiError(400, 'empty workspace, create a new page', '/body'));
//   }
//
  // try {
  //   const content = JSON.parse();
  //   // eslint-disable-next-line no-param-reassign
  //   req.validated = Object.assign({}, req.validated, { content });
  // } catch (e) {
  //   return next(new ApiError(400, 'Invalid JSON in requested file', '/body'));
  // }

  // return next();
// };
