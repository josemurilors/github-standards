const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const chalk = require('chalk');
const { promptConfirm } = require('../utils/prompts');

const HOME_DIR = os.homedir();

const AGENTS = [
  {
    name: 'OpenCode',
    dir: path.join(HOME_DIR, '.agents', 'skills'),
    configFiles: ['opencode.json', '.opencode/config.json'],
    icon: '🔧'
  },
  {
    name: 'Claude Code',
    dir: path.join(HOME_DIR, '.claude', 'skills'),
    configFiles: ['.claude/settings.json'],
    icon: '🤖'
  },
  {
    name: 'Codex',
    dir: path.join(HOME_DIR, '.codex', 'skills'),
    configFiles: ['.codex/config.json'],
    icon: '📦'
  },
  {
    name: 'Cursor',
    dir: path.join(HOME_DIR, '.cursor', 'skills'),
    configFiles: ['.cursor/rules'],
    icon: '🎯'
  },
  {
    name: 'GitHub Copilot',
    dir: path.join(HOME_DIR, '.config', 'github-copilot', 'skills'),
    configFiles: ['.config/github-copilot'],
    icon: '🐙'
  },
  {
    name: 'OpenClaude',
    dir: path.join(HOME_DIR, '.openclaude', 'skills'),
    configFiles: ['.openclaude/config.json'],
    icon: '🦾'
  },
  {
    name: 'Hermes',
    dir: path.join(HOME_DIR, '.hermes', 'skills'),
    configFiles: ['.hermes/config.json'],
    icon: '⚡'
  }
];

async function detectInstalledAgents() {
  const installed = [];

  for (const agent of AGENTS) {
    const agentDir = agent.dir;
    const parentDir = path.dirname(agentDir);
    
    if (await fs.pathExists(parentDir)) {
      installed.push({
        ...agent,
        exists: await fs.pathExists(agentDir),
        parentExists: true
      });
    }
  }

  return installed;
}

async function installSkillToAgent(agent, skillDir) {
  try {
    if (!await fs.pathExists(agent.dir)) {
      await fs.ensureDir(agent.dir);
    }

    const targetDir = path.join(agent.dir, 'github-standards');
    
    await fs.copy(skillDir, targetDir, {
      overwrite: true,
      filter: (src) => {
        const relativePath = path.relative(skillDir, src);
        return !relativePath.includes('node_modules') &&
               !relativePath.includes('.git') &&
               !relativePath.includes('templates');
      }
    });

    return { success: true, agent: agent.name };
  } catch (error) {
    return { success: false, agent: agent.name, error: error.message };
  }
}

async function installSkill(options) {
  console.log(chalk.blue.bold('\n🎯 GitHub Standards - Install Skill\n'));

  const skillDir = path.join(__dirname, '../../');
  
  console.log(chalk.cyan('Detecting installed AI agents...\n'));

  const installedAgents = await detectInstalledAgents();

  if (installedAgents.length === 0) {
    console.log(chalk.yellow('⚠ No supported AI agents detected'));
    console.log(chalk.gray('\nSupported agents:'));
    AGENTS.forEach(agent => {
      console.log(chalk.gray(`  ${agent.icon} ${agent.name}: ${agent.dir}`));
    });
    return;
  }

  console.log(chalk.green(`✓ Found ${installedAgents.length} agent(s):\n`));
  
  installedAgents.forEach(agent => {
    const status = agent.exists ? chalk.green('(ready)') : chalk.yellow('(will create)');
    console.log(chalk.white(`  ${agent.icon} ${agent.name} ${status}`));
    console.log(chalk.gray(`     ${agent.dir}`));
  });

  let targetAgents = installedAgents;

  if (!options.all && installedAgents.length > 1) {
    const confirmed = await promptConfirm('\nInstall to all detected agents?');
    
    if (!confirmed) {
      console.log(chalk.yellow('\n⊘ Installation cancelled'));
      console.log(chalk.gray('\nTip: Use --all to install to all agents without prompting'));
      return;
    }
  }

  console.log(chalk.cyan('\n📦 Installing skill...\n'));

  const results = [];

  for (const agent of targetAgents) {
    process.stdout.write(chalk.gray(`  Installing to ${agent.name}... `));
    
    const result = await installSkillToAgent(agent, skillDir);
    results.push(result);

    if (result.success) {
      console.log(chalk.green('✓'));
    } else {
      console.log(chalk.red('✗'));
      console.log(chalk.red(`    Error: ${result.error}`));
    }
  }

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(chalk.green.bold(`\n✨ Installed to ${successful.length} agent(s)`));

  if (failed.length > 0) {
    console.log(chalk.red(`\n✗ Failed to install to ${failed.length} agent(s):`));
    failed.forEach(r => {
      console.log(chalk.red(`  • ${r.agent}: ${r.error}`));
    });
  }

  console.log(chalk.cyan('\n📝 Next steps:'));
  console.log(chalk.gray('  1. Restart your AI agent to load the skill'));
  console.log(chalk.gray('  2. The skill will be available in all projects with git'));
  console.log(chalk.gray('  3. Use: github-standards init (to scaffold new projects)'));
  console.log('');
}

module.exports = { installSkill, detectInstalledAgents, AGENTS };
