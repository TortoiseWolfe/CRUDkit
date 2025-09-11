# Spec Kit Sprint Workflow

## Overview
This document describes the iterative sprint workflow for using GitHub Spec Kit with Claude Code to continuously evolve the CRUDkit project.

## Sprint Methodology
We use an **Agile-inspired sprint cycle** with Spec Kit as our planning framework. Each sprint:
- Lasts 1-2 weeks
- Has clear deliverables defined in TASKS.md
- Archives historical documents for reference
- Evolves the constitution based on learnings

## Directory Structure
```
docs/
├── constitution.md          # Living document (evolves each sprint)
├── spec-kit/
│   ├── spec.md             # Current sprint specification
│   ├── PLAN.md             # Current sprint technical plan
│   ├── TASKS.md            # Current sprint task list
│   ├── WORKFLOW.md         # This document
│   ├── CHANGELOG.md        # Sprint change history
│   └── archive/
│       ├── sprint-001/     # Completed sprint
│       │   ├── constitution-v1.0.0.md
│       │   ├── spec.md
│       │   ├── PLAN.md
│       │   ├── TASKS.md
│       │   └── SPRINT_SUMMARY.md
│       └── sprint-002/     # Next sprint archive
```

## Sprint Workflow Process

### 1. Sprint Planning (Day 1)
**Review Previous Sprint**
```bash
# Read the previous sprint summary
cat docs/spec-kit/archive/sprint-XXX/SPRINT_SUMMARY.md
```

**Update Constitution**
- Review lessons learned
- Update principles based on experience
- Version the constitution (semver)
```bash
# Edit with Claude Code
"Claude, update the constitution.md based on our sprint-001 learnings"
```

### 2. Specification Phase (Day 1-2)
**Generate New Spec**
```bash
# In Docker container
cd docs/spec-kit
docker compose exec speckit bash

# Create new specification
"Claude, create a new spec.md for sprint-002 focusing on [features]"

# Generate with Spec Kit
specify generate spec < spec.md > spec-output.md
```

**Human Review Point** 🔍
- Review spec-output.md
- Edit to add/remove features
- Ensure alignment with updated constitution

### 3. Planning Phase (Day 2)
**Generate Technical Plan**
```bash
# Ask Claude to create plan
"Claude, read spec-output.md and create PLAN.md"

# Generate with Spec Kit
specify generate plan < PLAN.md > plan-output.md
```

**Human Review Point** 🔍
- Review technical architecture
- Adjust technology choices
- Refine component structure

### 4. Task Generation (Day 2-3)
**Generate Task List**
```bash
# Ask Claude to create tasks
"Claude, break down plan-output.md into TASKS.md"

# Generate with Spec Kit
specify generate tasks < TASKS.md
```

**Human Review Point** 🔍
- Reorder task priorities
- Add missing tasks
- Remove unnecessary items
- Estimate complexity

### 5. Implementation Phase (Days 3-10)
**Execute Tasks**
```bash
# Work through TASKS.md with Claude Code
"Claude, let's start working on the tasks in TASKS.md"
```

**Daily Progress**
- Check off completed tasks
- Update TASKS.md
- Commit changes regularly
- Run tests frequently

### 6. Sprint Review (Day 10)
**Archive Sprint**
```bash
# Create archive directory
mkdir -p docs/spec-kit/archive/sprint-XXX

# Archive documents
cp docs/spec-kit/{spec.md,PLAN.md,TASKS.md} \
   docs/spec-kit/archive/sprint-XXX/

# Archive constitution version
cp docs/constitution.md \
   docs/spec-kit/archive/sprint-XXX/constitution-vX.X.X.md
```

**Create Sprint Summary**
```bash
# Generate summary with Claude
"Claude, create a SPRINT_SUMMARY.md for sprint-XXX"
```

### 7. Sprint Retrospective
**Update CHANGELOG**
```bash
# Document changes
"Claude, update CHANGELOG.md with sprint-XXX changes"
```

**Identify Improvements**
- What went well?
- What could improve?
- Action items for next sprint

## Key Commands Reference

### Docker Setup
```bash
cd docs/spec-kit
docker compose build
docker compose up -d
docker compose exec speckit bash
```

### Spec Kit Commands
```bash
# Initialize new project
specify init PROJECT_NAME --here

# Generate phases
specify generate spec < spec.md > output.md
specify generate plan < PLAN.md > output.md
specify generate tasks < TASKS.md
```

### Claude Code Integration
```bash
# Edit constitution
"Claude, update constitution.md for our new requirements"

# Create specifications
"Claude, create spec.md for [feature description]"

# Review and refine
"Claude, review spec-output.md and enhance it"

# Implementation
"Claude, implement the tasks in TASKS.md"
```

## Best Practices

### 1. Version Control
- Commit after each major phase
- Use semantic versioning for constitution
- Tag sprint completions

### 2. Documentation
- Always create SPRINT_SUMMARY.md
- Update CHANGELOG.md
- Document decisions in commits

### 3. Review Points
- Never skip human review phases
- Edit generated content before proceeding
- Validate against constitution principles

### 4. Testing
- Test after each feature implementation
- Run full test suite before sprint completion
- Document test results in summary

### 5. Communication
- Clear task descriptions
- Detailed commit messages
- Comprehensive sprint summaries

## Sprint Metrics to Track
- Tasks completed vs planned
- Time per task category
- Test coverage changes
- Performance metrics
- Bug count
- Technical debt items

## Continuous Improvement
Each sprint should:
1. Deliver working features
2. Improve code quality
3. Enhance documentation
4. Refine the process
5. Update the constitution

## Transition Checklist
- [ ] Archive current sprint documents
- [ ] Create sprint summary
- [ ] Update CHANGELOG.md
- [ ] Review and update constitution
- [ ] Plan next sprint goals
- [ ] Create new spec/plan/tasks
- [ ] Update project README if needed
- [ ] Tag the sprint in git

---

**Remember**: This is an iterative process. Each sprint builds on the previous one, and the workflow itself should evolve based on what works best for your team and project.