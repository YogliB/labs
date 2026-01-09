---
id: task-024
title: Set up GitHub Actions workflow for automated testing and coverage
status: To Do
assignee: []
created_date: '2026-01-09 20:33'
updated_date: '2026-01-09 20:33'
labels:
    - ci-cd
    - testing
    - infrastructure
dependencies: []
priority: low
---

## Description

<!-- SECTION:DESCRIPTION:BEGIN -->

Create GitHub Actions workflow for automated testing and coverage reporting. Workflow should run vitest with coverage on pull requests and main branch pushes, upload coverage reports to external service, and fail builds if coverage thresholds not met.

<!-- SECTION:DESCRIPTION:END -->

## Acceptance Criteria

<!-- AC:BEGIN -->

- [ ] #1 GitHub Actions workflow created at .github/workflows/test.yml
- [ ] #2 Workflow runs tests on pull requests and pushes to main
- [ ] #3 Workflow runs npm run test:coverage
- [ ] #4 Coverage reports uploaded to code coverage service (e.g., Codecov)
- [ ] #5 Workflow fails if coverage drops below thresholds
- [ ] #6 Workflow results visible in PR checks
- [ ] #7 Workflow runs on multiple Node.js versions (18, 20, 22)
- [ ] #8 Build time reasonable (under 5 minutes)
  <!-- AC:END -->

## Implementation Plan

<!-- SECTION:PLAN:BEGIN -->

1. Create .github/workflows/test.yml in repo root
2. Configure workflow to trigger on:
    - Push to main branch
    - Pull requests to main
    - Manual trigger (workflow_dispatch)
3. Set up job matrix for Node.js versions: 18, 20, 22
4. Workflow steps:
    - Checkout code
    - Set up Node.js
    - Cache dependencies (node_modules)
    - Install dependencies
    - Run linting (if applicable)
    - Run tests with coverage: npm run test:coverage
5. Upload coverage reports:
    - Archive HTML report as workflow artifact
    - Upload to Codecov via codecov/codecov-action@v3
    - Set Codecov fail threshold
6. Add status checks:
    - Fail if coverage drops below configured thresholds
    - Display coverage summary in PR comments
7. Performance optimization:
    - Cache node_modules for faster builds
    - Parallel job matrix for efficiency
8. Documentation:
    - Add badge to README.md for build/coverage status
      <!-- SECTION:PLAN:END -->

## Implementation Notes

<!-- SECTION:NOTES:BEGIN -->

Integrate with Codecov or similar coverage service

Set coverage thresholds in workflow

Archive HTML coverage reports as artifacts

Consider caching node_modules for speed

<!-- SECTION:NOTES:END -->
