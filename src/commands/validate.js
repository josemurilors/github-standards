const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const { execSync } = require('child_process');
const { TEMPLATE_FILES } = require('../utils/copy-files');

async function validate() {
  console.log(chalk.blue.bold('\n🔍 GitHub Standards - Validate Configuration\n'));

  const targetDir = process.cwd();
  let passed = 0;
  let failed = 0;
  const issues = [];

  console.log(chalk.cyan('Checking required files...\n'));

  for (const file of TEMPLATE_FILES) {
    const filePath = path.join(targetDir, file);
    const exists = await fs.pathExists(filePath);

    if (exists) {
      console.log(chalk.green(`  ✓ ${file}`));
      passed++;
    } else {
      console.log(chalk.red(`  ✗ ${file} (missing)`));
      issues.push(`Missing: ${file}`);
      failed++;
    }
  }

  console.log(chalk.cyan('\nChecking package.json scripts...\n'));

  const packageJsonPath = path.join(targetDir, 'package.json');
  if (await fs.pathExists(packageJsonPath)) {
    const packageJson = await fs.readJson(packageJsonPath);
    const requiredScripts = [
      'lint:md',
      'lint:links',
      'lint:secrets',
      'mode:en',
      'mode:pt',
      'test'
    ];

    for (const script of requiredScripts) {
      if (packageJson.scripts && packageJson.scripts[script]) {
        console.log(chalk.green(`  ✓ scripts.${script}`));
        passed++;
      } else {
        console.log(chalk.red(`  ✗ scripts.${script} (missing)`));
        issues.push(`Missing script: ${script}`);
        failed++;
      }
    }
  } else {
    console.log(chalk.red('  ✗ package.json (missing)'));
    issues.push('Missing: package.json');
    failed++;
  }

  console.log(chalk.cyan('\nChecking .github/mode.json...\n'));

  const modeJsonPath = path.join(targetDir, '.github', 'mode.json');
  if (await fs.pathExists(modeJsonPath)) {
    try {
      const modeJson = await fs.readJson(modeJsonPath);
      if (modeJson.mode && ['en-first', 'pt-br-first'].includes(modeJson.mode)) {
        console.log(chalk.green(`  ✓ Language mode: ${modeJson.mode}`));
        passed++;
      } else {
        console.log(chalk.red('  ✗ Invalid mode configuration'));
        issues.push('Invalid mode in .github/mode.json');
        failed++;
      }
    } catch (error) {
      console.log(chalk.red('  ✗ Could not parse mode.json'));
      issues.push('Invalid JSON in .github/mode.json');
      failed++;
    }
  } else {
    console.log(chalk.red('  ✗ .github/mode.json (missing)'));
    issues.push('Missing: .github/mode.json');
    failed++;
  }

  console.log(chalk.cyan('\nChecking Git hooks...\n'));

  const huskyDir = path.join(targetDir, '.husky');
  if (await fs.pathExists(huskyDir)) {
    const hooks = ['commit-msg', 'pre-commit'];
    for (const hook of hooks) {
      const hookPath = path.join(huskyDir, hook);
      if (await fs.pathExists(hookPath)) {
        console.log(chalk.green(`  ✓ .husky/${hook}`));
        passed++;
      } else {
        console.log(chalk.red(`  ✗ .husky/${hook} (missing)`));
        issues.push(`Missing hook: .husky/${hook}`);
        failed++;
      }
    }
  } else {
    console.log(chalk.red('  ✗ .husky/ directory (missing)'));
    issues.push('Missing: .husky/ directory');
    failed++;
  }

  console.log(chalk.cyan('\nRunning validation tests...\n'));

  try {
    execSync('npm run lint:md', { stdio: 'pipe', cwd: targetDir });
    console.log(chalk.green('  ✓ Markdown lint passed'));
    passed++;
  } catch (error) {
    console.log(chalk.red('  ✗ Markdown lint failed'));
    issues.push('Markdown lint failed');
    failed++;
  }

  try {
    execSync('npm run lint:secrets', { stdio: 'pipe', cwd: targetDir });
    console.log(chalk.green('  ✓ Secret scan passed'));
    passed++;
  } catch (error) {
    console.log(chalk.red('  ✗ Secret scan failed'));
    issues.push('Secret scan failed');
    failed++;
  }

  console.log(chalk.cyan('\n' + '─'.repeat(40)));
  console.log(chalk.white(`\nResults: ${chalk.green(passed + ' passed')}, ${chalk.red(failed + ' failed')}`));

  if (issues.length > 0) {
    console.log(chalk.yellow('\nIssues found:'));
    issues.forEach(issue => console.log(chalk.gray(`  • ${issue}`)));
    console.log(chalk.cyan('\nRun `github-standards setup` to fix missing files.'));
  } else {
    console.log(chalk.green.bold('\n✓ All checks passed!'));
  }

  console.log('');

  if (failed > 0) {
    process.exit(1);
  }
}

module.exports = { validate };
