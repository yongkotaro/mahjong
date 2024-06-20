const fs = require('fs');
const path = require('path');

// Define the directories to scan for images
const directories = [
  { dir: path.join(__dirname, 'src/img/honors'), output: 'honors.ts' },
  { dir: path.join(__dirname, 'src/img/bamboo'), output: 'bamboo.ts' },
  { dir: path.join(__dirname, 'src/img/man'), output: 'man.ts' },
  { dir: path.join(__dirname, 'src/img/pin'), output: 'pin.ts' },
];

// Function to sanitize variable names
const sanitizeVariableName = (name) => {
  return name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9]/g, '');
};

// Function to generate import statements for a directory
const generateImportStatements = (directoryPath, outputPath) => {
  const validExtensions = ['.png', '.jpg', '.jpeg', '.svg'];
  const isValidFile = (file) => validExtensions.includes(path.extname(file).toLowerCase());

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    const importStatements = files.filter(isValidFile).map((file) => {
      // Extract the suit part of the filename
      const suit = file.split('-')[0]; // Assuming the format is "suit-number.png"
      const variableName = sanitizeVariableName(suit);
      return `import ${variableName} from './${file}';`;
    });

    // Rename the images according to their file names without the indexes
    const exportStatement = `export const images = [${files.filter(isValidFile).map((file) => {
      const suit = file.split('-')[0]; // Extract suit
      return sanitizeVariableName(suit);
    }).join(', ')}];`;

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
