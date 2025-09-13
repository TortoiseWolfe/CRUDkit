# Sprint Planning Commands

Simple Docker commands to run the Specify-based sprint planning workflow.

## Prerequisites

1. Start the spec-kit container:

```bash
cd docs/spec-kit
docker compose up -d speckit
```

2. Copy the constitution into the container:

```bash
docker cp docs/constitution.md speckit-dev:/workspace/constitution.md
```

## Sprint Planning Commands

All commands run inside the Docker container:

### Check Sprint Status

```bash
docker compose exec speckit-dev node /workspace/scripts/sprint-planning.js status
```

### Generate Sprint Specification

```bash
docker compose exec speckit-dev node /workspace/scripts/sprint-planning.js spec
```

### Generate Sprint Tasks

```bash
docker compose exec speckit-dev node /workspace/scripts/sprint-planning.js tasks
```

### Archive Current Sprint

```bash
docker compose exec speckit-dev node /workspace/scripts/sprint-planning.js archive
```

### Full Sprint Planning Workflow

```bash
docker compose exec speckit-dev node /workspace/scripts/sprint-planning.js full
```

## Quick Start for New Sprint

### Before Starting Sprint 4 (or any new sprint):

1. **Archive the current sprint** (if not already done):

```bash
docker compose exec speckit-dev node /workspace/scripts/sprint-planning.js archive
```

2. **Update the constitution** with completed features and new version:

```bash
# Edit docs/constitution.md to:
# - Mark completed features
# - Update version (e.g., v0.3.0 → v0.4.0)
# - Update progress percentage
```

3. **Start the new sprint planning**:

```bash
# Navigate to spec-kit directory
cd docs/spec-kit

# Start the container
docker compose up -d speckit

# Copy updated constitution to container
docker cp ../constitution.md speckit-dev:/workspace/constitution.md

# Run full sprint planning (generates basic structure)
docker compose exec speckit-dev node /workspace/scripts/sprint-planning.js full
```

4. **Enhance with AI assistant** (iterative process):

```bash
# Use these commands in your AI assistant (Claude, Copilot, etc.):
/specify  # Generate detailed specification from constitution
/plan     # Create technical implementation plan
/tasks    # Generate numbered task list

# IMPORTANT: Review and refine each document before proceeding!
```

5. **Review generated files**:

- `spec.md` - Sprint specification
- `PLAN.md` - Technical plan
- `TASKS.md` - Task breakdown

## Important Notes

- All commands run **inside** the Docker container
- The constitution must be copied to the container before generating specs
- The workflow is iterative - review and refine at each stage
- Generated documents are starting points that require human review

## Container Management

```bash
# Stop container
docker compose down

# Rebuild container (if Dockerfile changed)
docker compose build --no-cache speckit

# View container logs
docker compose logs speckit

# Enter container shell
docker compose exec speckit-dev bash
```
