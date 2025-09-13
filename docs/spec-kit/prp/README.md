# Product Requirements Prompt (PRP) Workflow

## Overview

The PRP workflow implements Cole Medlin's **Context Engineering** methodology through an iterative process with SpecKit. PRPs are **generated outputs** from the SpecKit+AI collaboration, not manual inputs. They provide comprehensive implementation blueprints for major features identified during constitution processing.

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

## The SpecKit → PRP Generation Workflow

PRPs are **generated from SpecKit's constitution analysis**, not manually created. This is a pair programming process between you, the AI, and SpecKit's Docker processing.

### 1. SpecKit Processes Constitution

```bash
# Feed constitution to SpecKit Docker container
docker cp ../constitution.md speckit-dev:/workspace/constitution.md

# Run SpecKit PowerShell script
docker compose exec speckit pwsh -File /workspace/.specify/scripts/powershell/create-new-feature.ps1 \
  -InputFilePath /workspace/constitution.md \
  -FeatureName "Sprint-3-Analysis"
```

### 2. AI Analyzes SpecKit Output → Generates PRPs

```bash
# Review SpecKit's processed output
docker compose exec speckit cat /workspace/.specify/features/Sprint-3-Analysis/spec.md

# AI identifies major features and generates PRPs
"Claude, analyze this SpecKit output and generate PRPs for all major features"

# PRPs are created in inbox/ based on SpecKit's analysis
# Each PRP includes context from existing codebase patterns
```

### 3. Review Generated PRPs (Inbox → Outbox)

**Human Review Point** 🔍

- Verify SpecKit correctly identified features
- Validate technical approach
- Add missing constraints or context
- Confirm dependencies available

```bash
# Review each generated PRP
cat inbox/web3forms-integration-prp.md

# Edit if needed to add context
vim inbox/web3forms-integration-prp.md

# After approval, move to outbox
mv inbox/feature-name-prp.md outbox/
```

### 4. Use PRPs in Planning Phase (Outbox → Archive)

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

### Generating PRPs from Constitution

1. **SpecKit processes constitution:**

```bash
docker compose exec speckit pwsh -File /workspace/.specify/scripts/powershell/create-new-feature.ps1 \
  -InputFilePath /workspace/constitution.md \
  -FeatureName "Sprint-3"
```

2. **AI analyzes output and identifies features:**

```
"Claude, from the SpecKit output, I see these major features need PRPs:
- Web3Forms email integration (Section 6, Phase 2)
- Firebase authentication (Section 6, Phase 3)
- Stripe payment processing (Section 6, Phase 4)
Generate PRPs for each."
```

3. **AI generates PRPs with codebase context:**

For each feature, the AI:

- References existing patterns from the codebase
- Includes specific file paths and code examples
- Defines validation criteria
- Creates implementation runbook

4. **Review generated PRPs:**

- Verify feature identification is correct
- Check technical approach is sound
- Add any missing context

5. **Move to outbox and use in planning:**

```bash
mv inbox/*.prp.md outbox/

# Use PRPs to create enhanced specification
/specify Create enhanced specification using PRPs from outbox/
```

## Integration with SpecKit Workflow

PRPs are generated outputs from SpecKit processing:

```
Constitution → SpecKit (Docker) → Basic Spec → AI Analysis → PRPs (Generated) →
→ Enhanced Spec → Plan → Tasks → Implement
```

- **SpecKit processes**: Constitution through PowerShell scripts
- **AI enhances**: Analyzes SpecKit output, generates PRPs
- **Human reviews**: Validates and refines generated PRPs
- **Key insight**: PRPs are OUTPUTS from SpecKit+AI collaboration, not manual inputs

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

## Understanding PRP Generation

When the AI generates PRPs from SpecKit output, it:

1. **Identifies Features**: Extracts major features from constitution sections
2. **Maps to Codebase**: Finds existing patterns and files to reference
3. **Defines Context**: Includes specific dependencies and versions
4. **Creates Runbook**: Step-by-step implementation guide
5. **Sets Validation**: Clear success criteria and test requirements

**The template** (`templates/prp-template.md`) shows the structure PRPs should follow, but they're generated automatically, not filled manually.

## Resources

- [Cole Medlin's Context Engineering](https://github.com/coleam00/context-engineering-intro)
- [PRP Template](templates/prp-template.md)
- [SpecKit Workflow](../WORKFLOW.md)
- [Constitution](../../constitution.md)

---

**Remember**: PRPs are generated BY SpecKit+AI collaboration, not created manually. This iterative process ensures comprehensive context engineering, following Cole Medlin's principle: "Stop vibe coding, start context engineering." The power comes from SpecKit's Docker processing combined with AI's ability to enhance and contextualize the output.
