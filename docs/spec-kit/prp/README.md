# Product Requirements Prompt (PRP) Workflow

## Overview

The PRP workflow implements Cole Medlin's **Context Engineering** methodology, providing AI coding assistants with comprehensive implementation blueprints for major features. PRPs bridge the gap between high-level requirements and actual code implementation by supplying precise technical context.

## What is a PRP?

A **Product Requirements Prompt** is more than a traditional PRD. It includes:

- Clear product requirements and business justification
- Curated codebase intelligence with exact patterns to follow
- Precise file paths, library versions, and code examples
- Step-by-step implementation runbook
- Validation loops for quality assurance

## When to Use PRPs

PRPs are designed for **major features only**:

- ✅ New user-facing features (forms, integrations, major UI components)
- ✅ System architecture changes
- ✅ Complex multi-file implementations
- ✅ Features requiring external dependencies
- ❌ Bug fixes
- ❌ Minor updates
- ❌ Single-file changes
- ❌ Documentation updates

## Directory Structure

```
prp/
├── inbox/          # New PRPs awaiting review
├── outbox/         # Approved PRPs ready for SpecKit processing
├── archive/        # Completed PRPs for reference
├── templates/      # PRP templates
│   └── prp-template.md
├── examples/       # Example PRPs for common features
└── README.md       # This file
```

## The PRP-Enhanced SpecKit Workflow

PRPs are **context documents** that enhance the Planning phase, not a separate workflow step. They provide implementation details that `/plan` can reference.

### 1. Create PRP (Before Sprint)

For major features, create a PRP to provide context:

```bash
# Copy template to inbox
cp templates/prp-template.md inbox/feature-name-prp.md

# Fill out the PRP with comprehensive context
vim inbox/feature-name-prp.md
```

### 2. Review PRP (Inbox → Outbox)

**Human Review Point** 🔍

- Technical feasibility validated
- Dependencies available
- Resources confirmed
- No conflicts with ongoing work

```bash
# After approval, move to outbox
mv inbox/feature-name-prp.md outbox/
```

### 3. Use in Planning Phase (Outbox → Archive)

Reference the PRP during planning for rich context:

```bash
# During planning phase, reference the PRP
/plan Create technical implementation plan based on spec.md
      Include context from prp/outbox/feature-name-prp.md

# The PRP provides:
- Exact code patterns to follow
- File paths and dependencies
- Implementation runbook
- Validation criteria
```

### 4. Archive Completed PRP

After implementation:

```bash
# Move to archive with completion date
mv outbox/feature-name-prp.md archive/2025-09-13-feature-name-prp.md
```

## Example Workflow

### Creating a PRP for Web3Forms Integration

1. **Create PRP in inbox:**

```bash
cp templates/prp-template.md inbox/web3forms-integration-prp.md
```

2. **Fill out PRP with context:**

- Existing form patterns from `src/components/atomic/Form.tsx`
- Zod validation schemas already in use
- Environment variable patterns from `.env.example`
- Testing patterns from existing form tests

3. **Review and approve:**

- Verify Web3Forms API documentation
- Check no conflicting email integrations
- Confirm GDPR compliance approach

4. **Move to outbox:**

```bash
mv inbox/web3forms-integration-prp.md outbox/
```

5. **Generate specifications:**

```
"Claude, use the Web3Forms PRP in outbox to generate the specification"
```

## Integration with Existing Workflow

PRPs enhance the Planning phase with context engineering:

```
Constitution → Specify → Plan (with PRP context) → Tasks → Implement
```

- **Major features**: Create PRP, reference in `/plan` command
- **Minor features**: Skip PRP, use standard `/plan` command
- **Key insight**: PRPs are context documents, not a workflow phase

## Benefits of Context Engineering

1. **Reduced AI Hallucinations**: Comprehensive context minimizes incorrect assumptions
2. **First-Pass Success**: Production-ready code on initial generation
3. **Consistency**: Ensures new code follows existing patterns
4. **Knowledge Transfer**: PRPs document architectural decisions
5. **Quality Gates**: Built-in validation loops ensure standards

## PRP Quality Checklist

Before moving a PRP from inbox to outbox:

- [ ] **Product Requirements**
  - [ ] Clear feature description
  - [ ] Success criteria defined
  - [ ] Out of scope documented

- [ ] **Technical Context**
  - [ ] Existing patterns referenced with file paths
  - [ ] Dependencies listed with versions
  - [ ] File structure mapped

- [ ] **Implementation Details**
  - [ ] Step-by-step runbook provided
  - [ ] Testing approach defined
  - [ ] Performance requirements specified

- [ ] **Validation**
  - [ ] Pre/during/post checks defined
  - [ ] Risk mitigation strategies included
  - [ ] References to documentation provided

## Tips for Writing Effective PRPs

1. **Be Specific**: Use exact file paths, not vague descriptions
2. **Show Examples**: Include actual code snippets from the codebase
3. **Define Success**: Clear, measurable criteria for completion
4. **Think Ahead**: Identify risks and mitigation strategies
5. **Stay Focused**: One major feature per PRP

## Resources

- [Cole Medlin's Context Engineering](https://github.com/coleam00/context-engineering-intro)
- [PRP Template](templates/prp-template.md)
- [SpecKit Workflow](../WORKFLOW.md)
- [Constitution](../../constitution.md)

---

**Remember**: PRPs are for major features only. They provide the rich context needed for AI assistants to generate production-ready code on the first pass, following Cole Medlin's principle: "Stop vibe coding, start context engineering."
