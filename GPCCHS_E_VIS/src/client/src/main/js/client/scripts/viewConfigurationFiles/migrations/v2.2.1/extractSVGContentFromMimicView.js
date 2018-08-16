const _ = require('lodash/fp');
const fs = require('fs');
const path = require('path');
const ViewConfiguration = require('../../models/ViewConfiguration');


module.exports = {
  MimicView: {
    update: (viewConfiguration, {inputPath, outputPath}) => {
      let updatedContent = viewConfiguration.content;

      const svgContentPath =
        path.join(
          '/views',
          `${path.basename(outputPath || inputPath)}.svg`
        );

      updatedContent = _.unset('content', updatedContent);
      updatedContent = _.set('contentPath', svgContentPath, updatedContent);

      return new ViewConfiguration(updatedContent);
    },
    hook: (viewConfiguration, migratedViewConfiguration) => {
      const outputPath =
        path.join(process.env.ISIS_DOCUMENT_DIR, migratedViewConfiguration.content.contentPath);

      const content = viewConfiguration.content.content.toString();

      try {
        fs.writeFileSync(outputPath, content, 'utf8');
      } catch (error) {
        console.error(error);
      }
    },
  },
};
