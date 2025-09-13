# Specify Tool Tutorial: Iterative Sprint Planning with Docker Processing

## Overview

This tutorial documents the **iterative workflow** for using GitHub's Specify tool to generate sprint specifications, plans, and tasks through Docker-powered PowerShell scripts. This is NOT just AI prompts - Specify uses actual Docker processing to transform inputs into structured outputs.

**IMPORTANT**: This is an iterative process with human review at each stage. Generated documents are starting points that require careful review, refinement, and multiple iterations to get right.

## Prerequisites

### 1. Working Docker Environment

```bash
# Ensure Docker and Docker Compose are installed
docker --version
docker compose version
```

### 2. PowerShell in Docker Container

The Specify tool requires PowerShell to run its scripts. Our `Dockerfile.speckit` includes PowerShell installation:

```dockerfile
# Install PowerShell for Specify scripts
RUN apt-get update && apt-get install -y git wget curl libicu-dev && \
    wget -q https://github.com/PowerShell/PowerShell/releases/download/v7.4.6/powershell-7.4.6-linux-x64.tar.gz && \
    mkdir -p /opt/microsoft/powershell/7 && \
    tar zxf powershell-7.4.6-linux-x64.tar.gz -C /opt/microsoft/powershell/7 && \
    chmod +x /opt/microsoft/powershell/7/pwsh && \
    ln -s /opt/microsoft/powershell/7/pwsh /usr/bin/pwsh && \
    rm powershell-7.4.6-linux-x64.tar.gz
```

## Initial Setup

### Step 1: Build the Spec Kit Container

```bash
cd docs/spec-kit
docker compose build --no-cache speckit
docker compose up -d speckit
```

### Step 2: Verify PowerShell Installation

```bash
docker compose exec speckit pwsh --version
# Should output: PowerShell 7.4.6
```

### Step 3: Initialize Specify Project (One-Time Setup)

```bash
docker compose exec speckit specify init CRUDkit --here
```

This creates the `.specify/` directory with:

- Configuration files
- PowerShell scripts
- Templates
- Feature directories

## The Specify Workflow

### Understanding the Two-Part System

1. **Specify CLI Tool** (`specify`): Python-based initialization tool
2. **PowerShell Scripts**: The actual processing engine that transforms inputs

### What Specify Actually Does

When you use Specify commands, you're triggering PowerShell scripts that:

1. Read input files (like constitution.md)
2. Process them through templates
3. Generate structured output files
4. Create feature branches
5. Organize specifications

**This is NOT just prompting an AI - it's actual Docker processing!**

## The Iterative Process

### Why Iteration is Essential

Sprint planning is not a one-shot process. Each generated document requires:

1. **Initial Generation** - Get the first draft from Specify/AI
2. **Human Review** - Check alignment, completeness, feasibility
3. **Refinement** - Edit, regenerate, or manually adjust
4. **Validation** - Ensure consistency across all documents
5. **Final Review** - Get team/stakeholder approval

### Review Points 🔍

Throughout this process, you'll see **Human Review Points** marked with 🔍. These are critical moments where you must:

- Stop and review the generated output
- Compare against your requirements
- Make necessary adjustments
- Decide whether to proceed or iterate

## Generating Sprint Documentation (Iterative)

### Step 1: Prepare Your Input Document

Create or update your constitution/requirements document:

```bash
# Example: docs/constitution.md
```

### Step 2: Copy Input to Container

```bash
docker cp /path/to/constitution.md speckit-dev:/workspace/constitution.md
```

### Step 3: Run Specify PowerShell Scripts

```bash
# Generate a feature specification
docker compose exec speckit pwsh -File /workspace/.specify/scripts/powershell/create-new-feature.ps1 \
  -InputFilePath /workspace/constitution.md \
  -FeatureName "Sprint-3-Foundation-Completion"
```

### Step 4: Use AI Agents for Enhanced Generation (With Review)

After the basic PowerShell processing, use AI agents iteratively to generate comprehensive documentation:

#### Phase 1: Generate Specification

Use the `/specify` command in your AI assistant:

```
/specify Create Sprint 3 specification based on constitution v0.3.0 focusing on remaining 30% of requirements
```

**🔍 Human Review Point - Specification**

- [ ] Does it align with constitutional requirements?
- [ ] Is the scope realistic for the sprint duration?
- [ ] Are all missing features addressed?
- [ ] Are priorities correctly assigned?
- [ ] **If issues found**: Edit or regenerate with refined prompts

#### Phase 2: Generate Technical Plan

After reviewing and approving the specification, use the `/plan` command:

```
/plan Create technical implementation plan based on Sprint 3 specification
```

**🔍 Human Review Point - Technical Plan**

- [ ] Are architecture decisions sound?
- [ ] Do technology choices match team capabilities?
- [ ] Are risks properly identified and mitigated?
- [ ] Is the timeline realistic?
- [ ] **If issues found**: Refine the plan or regenerate with specific guidance

#### Phase 3: Generate Task List

After approving the plan, use the `/tasks` command:

```
/tasks Generate Sprint 3 task list from specification and plan
```

**🔍 Human Review Point - Task List**

- [ ] Are all features broken down into actionable tasks?
- [ ] Are time estimates realistic?
- [ ] Are dependencies correctly identified?
- [ ] Are priorities (P0/P1/P2) appropriate?
- [ ] **If issues found**: Add missing tasks, adjust estimates, or regenerate

## Complete Sprint Planning Process (Iterative)

### 1. Review Previous Sprint

```bash
# Check previous sprint achievements
cat archive/sprint-002/SPRINT_SUMMARY.md
```

**🔍 Human Review Point - Sprint Retrospective**

- What was achieved vs planned?
- What blockers were encountered?
- What should be carried over?

### 2. Update Constitution

```bash
# Edit constitution with new version
vim ../constitution.md
# Update version to v0.3.0 or appropriate
```

**🔍 Human Review Point - Constitution Update**

- Are all completed features marked?
- Is the progress percentage accurate?
- Are new priorities reflected?

### 3. Iterative Document Generation

```bash
# Build and start container
docker compose build speckit
docker compose up -d speckit

# Copy constitution to container
docker cp ../constitution.md speckit-dev:/workspace/constitution.md
```

#### Iteration 1: Basic Generation

```bash
# Run PowerShell script for initial structure
docker compose exec speckit pwsh -File /workspace/.specify/scripts/powershell/create-new-feature.ps1 \
  -InputFilePath /workspace/constitution.md \
  -FeatureName "Sprint-3"
```

**🔍 Review basic output before proceeding**

#### Iteration 2: Specification Enhancement

```
# Use /specify command with AI assistant
# Review output, refine prompt if needed
# May require 2-3 iterations to get right
```

**🔍 Review and approve spec before continuing**

#### Iteration 3: Technical Planning

```
# Use /plan command based on approved spec
# Review architecture decisions
# Iterate if technology choices need adjustment
```

**🔍 Review and approve plan before continuing**

#### Iteration 4: Task Breakdown

```
# Use /tasks command based on approved plan
# Review task completeness and estimates
# Add/remove/adjust tasks as needed
```

**🔍 Final review of all documents together**

### 4. Refinement and Validation

```bash
# Review generated files for consistency
cat spec.md      # Sprint specification
cat PLAN.md      # Technical plan
cat TASKS.md     # Task breakdown

# Check cross-document alignment
# - Do tasks cover all spec items?
# - Does plan support all features?
# - Are timelines consistent?

# Make necessary adjustments
vim spec.md      # Edit as needed
vim PLAN.md      # Adjust architecture
vim TASKS.md     # Fix estimates
```

**🔍 Human Review Point - Final Validation**

- [ ] All documents align with each other
- [ ] Timeline is realistic
- [ ] Resources are available
- [ ] Risks are acceptable
- [ ] Team agrees with plan

### 5. Archive Previous Sprint

```bash
# Create archive directory
mkdir -p archive/sprint-002

# Move previous sprint documents
cp spec.md PLAN.md TASKS.md archive/sprint-002/
cp ../constitution.md archive/sprint-002/constitution-v0.2.0.md

# Create sprint summary
echo "# Sprint 2 Summary" > archive/sprint-002/SPRINT_SUMMARY.md
```

## Important Notes

### Docker Processing is Real

- Specify uses PowerShell scripts that run in Docker
- These scripts process files and generate outputs
- This is NOT just AI prompting - there's actual code execution

### File Locations Matter

- PowerShell scripts need correct paths
- Use absolute paths in Docker container (/workspace/...)
- Copy files into container before processing

### PowerShell is Required

- Without PowerShell, Specify scripts won't run
- Our Dockerfile installs PowerShell 7.4.6
- Always verify PowerShell is available in container

## Troubleshooting

### PowerShell Not Found

```bash
# Rebuild container with PowerShell
docker compose build --no-cache speckit
```

### Scripts Not Found

```bash
# Check if scripts exist
docker compose exec speckit ls -la /workspace/.specify/scripts/powershell/
```

### Permission Issues

```bash
# Fix permissions in container
docker compose exec speckit chown -R appuser:appuser /workspace
```

### File Not Found Errors

```bash
# Ensure files are copied to container
docker cp local-file.md speckit-dev:/workspace/file.md
```

## Example: Complete Sprint 3 Generation

```bash
# 1. Setup
cd docs/spec-kit
docker compose up -d speckit

# 2. Copy constitution
docker cp ../constitution.md speckit-dev:/workspace/constitution.md

# 3. Basic generation with PowerShell
docker compose exec speckit pwsh -File /workspace/.specify/scripts/powershell/create-new-feature.ps1 \
  -InputFilePath /workspace/constitution.md \
  -FeatureName "Sprint-3-Foundation-Completion"

# 4. Enhanced generation with AI agents
# Use /specify to generate spec.md
# Use /plan to generate PLAN.md
# Use /tasks to generate TASKS.md

# 5. Review results
cat spec.md    # 1278 lines of specification
cat PLAN.md    # 441 lines of technical plan
cat TASKS.md   # 667 lines with 128 tasks

# 6. Begin implementation
# Start with task S3T001 from TASKS.md
```

## Real-World Iteration Example

### Sprint 3 Generation Journey

Our actual Sprint 3 planning required multiple iterations:

**Iteration 1 - Initial Confusion**

- First attempt treated Specify as just AI prompts
- Generated docs without Docker processing
- **Result**: Incomplete and disconnected documents

**Iteration 2 - PowerShell Discovery**

- Realized Specify needs PowerShell scripts
- Container didn't have PowerShell installed
- **Fix**: Updated Dockerfile to install PowerShell

**Iteration 3 - Successful Generation**

- PowerShell scripts now working
- Generated basic structure with Docker
- Enhanced with AI agents
- **Review found**: Some features missing, estimates too optimistic

**Iteration 4 - Refinement**

- Adjusted scope based on reality check
- Fixed time estimates
- Added missing dependencies
- **Final result**: 128 tasks, realistic 8-week plan

### Lessons Learned

- Don't accept first generation as final
- Each iteration improves quality
- Human judgment is irreplaceable
- Technical validation is crucial

## Key Takeaways

1. **Specify = Docker Processing**: Real scripts running in containers, not just AI
2. **PowerShell Required**: Scripts are written in PowerShell, must be installed
3. **Iterative Process**: Multiple rounds of generation and review required
4. **Human Review Critical**: Generated docs are starting points, not final products
5. **File Management**: Copy files to container, use correct paths
6. **Validation Essential**: Check alignment, feasibility, and completeness
7. **Repeatable Workflow**: Once set up, can be used for all future sprints

## Resources

- [Spec Kit Repository](https://github.com/github/spec-kit)
- [PowerShell Downloads](https://github.com/PowerShell/PowerShell/releases)
- [Docker Documentation](https://docs.docker.com/)

## Summary: The Iterative Workflow

The Specify tool is powerful, but it's not magic. Success requires:

1. **Multiple Iterations** - Rarely get it right the first time
2. **Human Review** - At every stage, stop and evaluate
3. **Refinement** - Edit, regenerate, or manually adjust
4. **Validation** - Ensure all pieces work together
5. **Reality Checks** - Compare against actual capabilities

Remember: Specify generates **starting points**, not final products. The quality of your sprint planning depends on the quality of your review and iteration process.

### The Golden Rule

**Generate → Review → Refine → Repeat**

Each iteration gets you closer to a realistic, achievable sprint plan that your team can actually execute.

---

_This tutorial documents the actual Specify workflow with Docker processing, not just AI prompting. The "magical Docker processing" is real PowerShell scripts that transform your inputs into structured sprint documentation through an **iterative process with human review at every stage**._
