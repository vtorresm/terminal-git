export const COMMIT_TYPES = {
  feat: {
    emoji: '🆕',
    description: 'Add new feature',
    release: true // que si haces un commit de este tipo, luego deberias hacer un release
  },
  fix: {
    emoji: '🥖',
    description: 'Submit a fix to a bug',
    release: true
  },
  perf: {
    emoji: '⚡',
    description: 'Improve performance',
    release: true
  },
  refactor: {
    emoji: '♻',
    description: 'Refactor code',
    release: true
  },
  docs: {
    emoji: '📚',
    description: 'Add or update documentation',
    release: true
  },
  test: {
    emoji: '🧪',
    description: 'Add or update test',
    release: true
  },
  build: {
    emoji: '💱',
    description: 'Add or update build scripts',
    release: true
  }
}
