const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');
const { promptConfirm, promptOverwrite } = require('../utils/prompts');
const {
  copyTemplates,
  setLanguageMode,
  swapReadmes,
  checkExistingFiles,
  printCopyResult
} = require('../utils/copy-files');

async function setup(options) {
  console.log(chalk.blue.bold('\n🔧 GitHub Standards - Setup Existing Project\n'));

  try {
    const targetDir = process.cwd();

    const packageJsonPath = path.join(targetDir, 'package.json');
    if (!await fs.pathExists(packageJsonPath)) {
      console.log(chalk.yellow('⚠ No package.json found in current directory'));
      console.log(chalk.gray('  Run `npm init` first or use `github-standards init` for a new project'));
      process.exit(1);
    }

    const existingFiles = await checkExistingFiles(targetDir);

    let filesToOverwrite = [];

    if (existingFiles.length > 0 && !options.force) {
      console.log(chalk.yellow(`\n⚠ ${existingFiles.length} file(s) already exist:`));
      existingFiles.forEach(f => console.log(chalk.gray(`  - ${f}`)));

      const confirmed = await promptConfirm('\nContinue with setup?');
      if (!confirmed) {
        console.log(chalk.yellow('\n⊘ Setup cancelled'));
        return;
      }

      filesToOverwrite = await promptOverwrite(existingFiles);
    } else if (options.force) {
      filesToOverwrite = existingFiles;
    }

    const mode = options.mode || 'en-first';

    console.log(chalk.cyan('\n📁 Applying GitHub standards...'));

    const result = await copyTemplates(targetDir, filesToOverwrite);
    printCopyResult(result);

    console.log(chalk.cyan('\n🌐 Setting language mode...'));
    await setLanguageMode(targetDir, mode);
    console.log(chalk.green(`  ✓ Mode set to: ${mode}`));

    console.log(chalk.cyan('\n📄 Swapping READMEs based on language mode...'));
    await swapReadmes(targetDir, mode);
    console.log(chalk.green('  ✓ READMEs swapped'));

    console.log(chalk.cyan('\n📦 Installing dependencies...'));
    try {
      execSync('npm install', { stdio: 'inherit', cwd: targetDir });
      console.log(chalk.green('  ✓ Dependencies installed'));
    } catch (error) {
      console.log(chalk.yellow('  ! Could not install dependencies. Run `npm install` manually.'));
    }

    console.log(chalk.cyan('\n🪝 Setting up Git hooks...'));
    try {
      execSync('npm run prepare', { stdio: 'inherit', cwd: targetDir });
      console.log(chalk.green('  ✓ Git hooks configured'));
    } catch (error) {
      console.log(chalk.yellow('  ! Could not setup hooks. Run `npm run prepare` manually.'));
    }

    console.log(chalk.green.bold('\n✨ Setup completed successfully!\n'));
    console.log(chalk.white('Next steps:'));
    console.log(chalk.gray('  1. Review the changes'));
    console.log(chalk.gray('  2. Customize README.md and README.pt-BR.md'));
    console.log(chalk.gray('  3. Run `npm test` to validate'));
    console.log(chalk.gray('  4. Commit and push your changes'));
    console.log('');

  } catch (error) {
    console.error(chalk.red(`\n✗ Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { setup };
