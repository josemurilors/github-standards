const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const TEMPLATES_DIR = path.join(__dirname, '../../templates');

const TEMPLATE_FILES = [
  '.github',
  '.husky',
  'scripts',
  '.commitlintrc.json',
  '.cursorrules',
  '.env.example',
  '.gitleaks.toml',
  '.lychee.toml',
  '.markdownlint.json',
  '.markdownlintignore',
  '.releaserc.json',
  '.gitignore',
  'README.md',
  'README.pt-BR.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'CHANGELOG.md'
];

async function copyTemplates(targetDir, overwrite = []) {
  const copied = [];
  const skipped = [];

  for (const file of TEMPLATE_FILES) {
    const sourcePath = path.join(TEMPLATES_DIR, file);
    const targetPath = path.join(targetDir, file);

    if (!await fs.pathExists(sourcePath)) {
      continue;
    }

    const targetExists = await fs.pathExists(targetPath);

    if (targetExists && !overwrite.includes(file)) {
      skipped.push(file);
      continue;
    }

    await fs.copy(sourcePath, targetPath, { overwrite: true });
    copied.push(file);
  }

  return { copied, skipped };
}

async function generatePackageJson(targetDir, projectInfo) {
  const templatePath = path.join(TEMPLATES_DIR, 'package.json.template');
  const targetPath = path.join(targetDir, 'package.json');

  let template = await fs.readFile(templatePath, 'utf-8');

  template = template.replace(/\{\{PROJECT_NAME\}\}/g, projectInfo.name);
  template = template.replace(/\{\{PROJECT_DESCRIPTION\}\}/g, projectInfo.description);

  await fs.writeFile(targetPath, template, 'utf-8');
}

async function setLanguageMode(targetDir, mode) {
  const modeConfig = {
    'en-first': {
      mode: 'en-first',
      description: 'Language mode configuration for the repository',
      primary_language: 'en',
      secondary_language: 'pt-BR',
      source_of_truth: 'README.md',
      translation_file: 'README.pt-BR.md',
      modes: {
        'en-first': {
          primary: 'README.md',
          secondary: 'README.pt-BR.md',
          description: 'English is the source of truth, Portuguese is the translation'
        },
        'pt-br-first': {
          primary: 'README.pt-BR.md',
          secondary: 'README.md',
          description: 'Portuguese is the source of truth, English is the translation'
        }
      }
    },
    'pt-br-first': {
      mode: 'pt-br-first',
      description: 'Language mode configuration for the repository',
      primary_language: 'pt-BR',
      secondary_language: 'en',
      source_of_truth: 'README.pt-BR.md',
      translation_file: 'README.md',
      modes: {
        'en-first': {
          primary: 'README.md',
          secondary: 'README.pt-BR.md',
          description: 'English is the source of truth, Portuguese is the translation'
        },
        'pt-br-first': {
          primary: 'README.pt-BR.md',
          secondary: 'README.md',
          description: 'Portuguese is the source of truth, English is the translation'
        }
      }
    }
  };

  const modeDir = path.join(targetDir, '.github');
  await fs.ensureDir(modeDir);
  await fs.writeFile(
    path.join(modeDir, 'mode.json'),
    JSON.stringify(modeConfig[mode], null, 2),
    'utf-8'
  );
}

async function checkExistingFiles(targetDir) {
  const existing = [];

  for (const file of TEMPLATE_FILES) {
    const targetPath = path.join(targetDir, file);
    if (await fs.pathExists(targetPath)) {
      existing.push(file);
    }
  }

  return existing;
}

function printCopyResult(result) {
  if (result.copied.length > 0) {
    console.log(chalk.green('\n✓ Created files:'));
    result.copied.forEach(f => console.log(chalk.green(`  + ${f}`)));
  }

  if (result.skipped.length > 0) {
    console.log(chalk.yellow('\n⊘ Skipped files (already exist):'));
    result.skipped.forEach(f => console.log(chalk.yellow(`  - ${f}`)));
  }
}

module.exports = {
  copyTemplates,
  generatePackageJson,
  setLanguageMode,
  checkExistingFiles,
  printCopyResult,
  TEMPLATE_FILES
};
