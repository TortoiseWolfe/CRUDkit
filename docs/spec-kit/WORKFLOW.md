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
# Navigate to spec-kit directory
cd docs/spec-kit
```

**Use AI Assistant Commands (in Claude, Copilot, etc.)**

```
# For regular features:
/specify Create Sprint-002 specification based on constitution.md focusing on [features]

# The AI will generate a structured spec.md file
# Save the output to docs/spec-kit/spec.md
```

**Human Review Point** 🔍

- Review spec-output.md
- Edit to add/remove features
- Ensure alignment with updated constitution

### 3. Planning Phase (Day 2)

**Generate Technical Plan**

```
# For major features, include PRP for context:
/plan Create technical implementation plan based on spec.md
      Include context from prp/outbox/feature-name-prp.md

# For regular features:
/plan Create technical implementation plan based on spec.md

# The AI will generate a detailed PLAN.md
# Review and save to docs/spec-kit/PLAN.md
```

**Human Review Point** 🔍

- Review technical architecture
- Adjust technology choices
- Refine component structure

**Note**: PRPs provide implementation context during planning phase

### 4. Task Generation (Day 2-3)

**Generate Task List**

```
# Use AI assistant command
/tasks Break down PLAN.md into actionable tasks

# The AI will generate TASKS.md with numbered items
# Review and save to docs/spec-kit/TASKS.md
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

## PRP (Product Requirements Prompt) Integration

PRPs provide rich context engineering for major features. They work as **context inputs** during the Planning phase rather than a separate workflow step.

### When to Create PRPs

**Major Features** (Use PRP):

- New user-facing features (forms, integrations, UI components)
- System architecture changes
- Complex multi-file implementations
- Features requiring external dependencies

**Minor Features** (Skip PRP):

- Bug fixes
- Small updates
- Single-file changes
- Documentation updates

### PRP Workflow

1. **Create PRP** (Before Sprint Planning)

```bash
cd docs/spec-kit/prp
cp templates/prp-template.md inbox/feature-name-prp.md
# Fill out comprehensive context
```

2. **Review & Approve**

```bash
# After technical review
mv inbox/feature-name-prp.md outbox/
```

3. **Use During Planning**

```
# Reference PRP in /plan command
/plan Create plan based on spec.md
      Include context from prp/outbox/feature-name-prp.md
```

4. **Archive After Implementation**

```bash
mv outbox/feature-name-prp.md archive/
```

**Key Insight**: PRPs aren't a new phase - they're context documents that enhance the Planning phase with implementation details, code patterns, and validation criteria.

## Key Commands Reference

### Docker Setup

```bash
cd docs/spec-kit
docker compose build
docker compose up -d
docker compose exec speckit bash
```

### Spec Kit CLI vs AI Assistant Commands

#### CLI Tool (specify)

```bash
# Initialize new project only
specify init PROJECT_NAME --here
specify init PROJECT_NAME --ai claude  # Specify AI assistant
```

#### AI Assistant Commands (Claude, Copilot, Gemini)

```
# These are used in your AI chat interface, NOT in terminal:
/specify [description]  # Generate specification
/plan [requirements]    # Create technical plan
/tasks                  # Break down into tasks
```

**IMPORTANT**: The `specify` CLI tool only initializes projects. All spec/plan/task generation is done through AI assistant commands in your chat interface.

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
