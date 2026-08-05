const inquirer = require('inquirer');

async function promptProjectInfo(options) {
  const questions = [];

  if (!options.name) {
    questions.push({
      type: 'input',
      name: 'name',
      message: 'Project name:',
      default: process.cwd().split('/').pop(),
      validate: (input) => {
        if (!input || input.trim() === '') {
          return 'Project name is required';
        }
        if (!/^[a-z0-9-]+$/i.test(input)) {
          return 'Project name can only contain letters, numbers, and hyphens';
        }
        return true;
      }
    });
  }

  if (!options.description) {
    questions.push({
      type: 'input',
      name: 'description',
      message: 'Project description:',
      default: 'A project following GitHub standards'
    });
  }

  if (!options.mode || !['en-first', 'pt-br-first'].includes(options.mode)) {
    questions.push({
      type: 'list',
      name: 'mode',
      message: 'Language mode:',
      choices: [
        { name: 'EN-first (English is source of truth)', value: 'en-first' },
        { name: 'PT-BR-first (Portuguese is source of truth)', value: 'pt-br-first' }
      ],
      default: 'en-first'
    });
  }

  if (questions.length === 0) {
    return {
      name: options.name,
      description: options.description,
      mode: options.mode
    };
  }

  return inquirer.prompt(questions);
}

async function promptConfirm(message, defaultYes = true) {
  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message,
      default: defaultYes
    }
  ]);
  return confirmed;
}

async function promptOverwrite(files) {
  const { overwrite } = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'overwrite',
      message: 'The following files already exist. Which ones do you want to overwrite?',
      choices: files.map(f => ({ name: f, value: f, checked: false }))
    }
  ]);
  return overwrite;
}

module.exports = {
  promptProjectInfo,
  promptConfirm,
  promptOverwrite
};
