const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');
const { promptProjectInfo, promptConfirm } = require('../utils/prompts');
const {
  copyTemplates,
  generatePackageJson,
  setLanguageMode,
  printCopyResult
} = require('../utils/copy-files');

async function init(options) {
  console.log(chalk.blue.bold('\n🚀 GitHub Standards - Initialize New Project\n'));

  try {
    const projectInfo = await promptProjectInfo(options);

    console.log(chalk.cyan('\n📋 Configuration:'));
    console.log(chalk.white(`   Name:        ${projectInfo.name}`));
    console.log(chalk.white(`   Description: ${projectInfo.description}`));
    console.log(chalk.white(`   Mode:        ${projectInfo.mode}`));

    const confirmed = options.yes || await promptConfirm('\nProceed with initialization?');

    if (!confirmed) {
      console.log(chalk.yellow('\n⊘ Initialization cancelled'));
      return;
    }

    const targetDir = path.join(process.cwd(), projectInfo.name);

    if (await fs.pathExists(targetDir)) {
      console.error(chalk.red(`\n✗ Error: Directory "${projectInfo.name}" already exists`));
      process.exit(1);
    }

    console.log(chalk.cyan(`\n📁 Creating project directory: ${projectInfo.name}/`));
    await fs.ensureDir(targetDir);

    console.log(chalk.cyan('\n📁 Creating project structure...'));

    const result = await copyTemplates(targetDir, []);
    printCopyResult(result);

    console.log(chalk.cyan('\n📝 Generating package.json...'));
    await generatePackageJson(targetDir, projectInfo);
    console.log(chalk.green('  ✓ package.json created'));

    console.log(chalk.cyan('\n🌐 Setting language mode...'));
    await setLanguageMode(targetDir, projectInfo.mode);
    console.log(chalk.green(`  ✓ Mode set to: ${projectInfo.mode}`));

    console.log(chalk.cyan('\n📦 Initializing git repository...'));
    try {
      execSync('git init', { stdio: 'inherit', cwd: targetDir });
      console.log(chalk.green('  ✓ Git repository initialized'));
    } catch (error) {
      console.log(chalk.yellow('  ! Could not initialize git repository. Run `git init` manually.'));
    }

    if (!options.skipInstall) {
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
    }

    console.log(chalk.green.bold('\n✨ Project initialized successfully!\n'));
    console.log(chalk.white('Next steps:'));
    console.log(chalk.gray(`  1. cd ${projectInfo.name}`));
    console.log(chalk.gray('  2. Review the generated files'));
    console.log(chalk.gray('  3. Customize README.md and README.pt-BR.md'));
    console.log(chalk.gray('  4. Make your first commit'));
    console.log(chalk.gray('  5. Push to GitHub and configure branch protection rules'));
    console.log('');

  } catch (error) {
    console.error(chalk.red(`\n✗ Error: ${error.message}`));
    process.exit(1);
  }
}

module.exports = { init };
