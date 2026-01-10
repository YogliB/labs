# git-gaiden

Turn Git history into choose-your-own-adventure games

## Features

- **Interactive Storytelling**: Explore your Git repository as a choose-your-own-adventure game
- **AI-Powered Narratives**: Uses local AI models to generate engaging story scenes from commit messages
- **Branch Exploration**: Navigate through different branches and merge points
- **State Persistence**: Save and resume your game progress
- **Caching**: Optimized performance with scene caching
- **CLI Interface**: Simple command-line interface with rich terminal UI

## Installation

Requires Node.js 18+ and Git.

```bash
npm install -g git-gaiden
```

## Usage

Run in any Git repository:

```bash
gaiden
```

## Options

- `--branch, -b <name>`: Filter by branch name
- `--start <hash>`: Start from specific commit hash
- `--model <model>`: AI model for narrative generation (default: phi-3.5-mini)
- `--reset`: Reset game state
- `--no-cache`: Disable scene caching
- `--help`: Show help message
- `--version`: Show version number

## Examples

Start a new game:

```bash
gaiden
```

Explore a specific branch:

```bash
gaiden --branch main
```

Reset and start over:

```bash
gaiden --reset
```

## How It Works

git-gaiden parses your Git repository's commit history and maps it to an interactive story graph. Each commit becomes a story scene, with branches representing different narrative paths. The AI narrative engine generates engaging descriptions and choices based on commit messages and metadata. The terminal UI, built with Ink and React, provides an immersive gaming experience.

## Requirements

- Node.js 18+
- Git repository
- Internet connection for initial model download (models run locally thereafter)

```

```
