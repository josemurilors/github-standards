#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { init } = require('../src/commands/init');
const { setup } = require('../src/commands/setup');
const { validate } = require('../src/commands/validate');
const { installSkill } = require('../src/commands/install-skill');

const packageJson = require('../package.json');

program
  .name('github-standards')
  .description(chalk.blue('CLI to standardize GitHub repositories with best practices'))
  .version(packageJson.version);

program
  .command('init')
  .description('Initialize a new project with GitHub standards')
  .option('-m, --mode <mode>', 'Language mode (en-first or pt-br-first)', 'en-first')
  .option('-n, --name <name>', 'Project name')
  .option('-d, --description <desc>', 'Project description')
  .option('--skip-install', 'Skip npm install', false)
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .action(init);

program
  .command('setup')
  .description('Apply GitHub standards to an existing project')
  .option('-m, --mode <mode>', 'Language mode (en-first or pt-br-first)', 'en-first')
  .option('--force', 'Overwrite existing files', false)
  .action(setup);

program
  .command('validate')
  .description('Validate current project configuration')
  .action(validate);

program
  .command('install-skill')
  .description('Install skill globally in AI agents (OpenCode, Claude Code, Codex, Cursor, etc)')
  .option('-a, --all', 'Install to all detected agents without prompting', false)
  .action(installSkill);

program.parse();
