const fs = require('fs');
const path = require('path');

// Define the directories to scan for images
const directories = [
  { dir: path.join(__dirname, 'src/img/honors'), output: 'honors.ts' },
  { dir: path.join(__dirname, 'src/img/bamboo'), output: 'bamboo.ts' },
  { dir: path.join(__dirname, 'src/img/man'), output: 'man.ts' },
  { dir: path.join(__dirname, 'src/img/pin'), output: 'pin.ts' },
];

// Function to generate import statements for a directory
const generateImportStatements = (directoryPath, outputPath) => {
  const validExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
  const isValidFile = (file) => validExtensions.includes(path.extname(file).toLowerCase());

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    const importStatements = files.filter(isValidFile).map((file, index) => {
      const variableName = `image${index + 1}`;
      return `import ${variableName} from './${file}';`;
    });

    const exportStatement = `export const images = [${files.filter(isValidFile).map((_, index) => `image${index + 1}`).join(', ')}];`;

    const fileContent = `${importStatements.join('\n')}\n\n${exportStatement}`;

    fs.writeFile(outputPath, fileContent, (err) => {
      if (err) {
        return console.log('Unable to write file: ' + err);
      }
      console.log(`Imports file generated successfully at ${outputPath}`);
    });
  });
};

// Generate import statements for each directory
directories.forEach(({ dir, output }) => {
  const outputPath = path.join(dir, output);
  generateImportStatements(dir, outputPath);
});
