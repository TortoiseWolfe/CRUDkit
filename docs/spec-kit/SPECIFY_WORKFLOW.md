# SpecKit + AI Iterative Workflow: From Constitution to Implementation

## The Complete Process

This document describes the **iterative pair programming workflow** between you, the AI assistant (Claude), and SpecKit's Docker processing to transform a constitution into actionable sprint plans with PRPs.

## Overview: Human-Driven Iteration

This is a collaborative process where humans review and approve each step before proceeding. SpecKit provides Docker-powered processing, AI provides enhancement, and humans provide direction and quality control.

```
Constitution → SpecKit (Docker) → Basic Output → 🔍 Human Review →
→ AI Enhancement → PRPs → 🔍 Human Review → Enhanced Spec → 🔍 Human Review →
→ Plan → 🔍 Human Review → Tasks → Implementation
```

## Phase 0: Preparation

### Start the SpecKit Container

```bash
cd docs/spec-kit
docker compose build --no-cache speckit
docker compose up -d speckit

# Verify PowerShell is available
docker compose exec speckit pwsh --version
# Should output: PowerShell 7.4.6
```

### Update the Constitution

```bash
# Open in VSCode or your preferred editor
code ../constitution.md
# Update requirements, mark completed features, increment version

# Copy to container for processing
docker cp ../constitution.md speckit-dev:/workspace/constitution.md
```

## Phase 1: SpecKit Processing (Docker)

### Run SpecKit's PowerShell Script

```bash
# Process constitution through SpecKit
docker compose exec speckit pwsh -File /workspace/.specify/scripts/powershell/create-new-feature.ps1 \
  -InputFilePath /workspace/constitution.md \
  -FeatureName "Sprint-3-Foundation"
```

### Review SpecKit Output

```bash
# Check what SpecKit generated
docker compose exec speckit cat /workspace/.specify/features/Sprint-3-Foundation/spec.md

# Copy to local for review in VSCode
docker cp speckit-dev:/workspace/.specify/features/Sprint-3-Foundation/spec.md ./speckit-output.md
code ./speckit-output.md
```

**🔍 Human Review Point #1**

- Does SpecKit's output capture the constitution correctly?
- Is the basic structure suitable for enhancement?
- Should we run SpecKit again with different parameters?

## Phase 2: AI Analysis → PRP Generation

After human approval of SpecKit output, proceed to PRP generation.

### Request AI Analysis

```
"Claude, analyze the SpecKit output in speckit-output.md and identify all major features that need PRPs"
```

The AI will respond with a list like:

- Web3Forms integration (Section 6, Phase 2)
- Firebase authentication (Section 6, Phase 3)
- Stripe payment processing (Section 6, Phase 4)

**🔍 Human Review Point #2**

- Are all major features identified?
- Should any be split or combined?
- Are there features that don't need PRPs?

### Generate PRPs (After Human Approval)

```
"Claude, generate PRPs for the approved feature list:
1. Web3Forms integration
2. Firebase authentication
3. Stripe payments"
```

The AI generates PRPs to `prp/inbox/`:

- `web3forms-integration-prp.md`
- `firebase-auth-prp.md`
- `stripe-payment-prp.md`

## Phase 3: Human Review & Refinement

### Review Generated PRPs in VSCode

```bash
# Open all PRPs in VSCode
code prp/inbox/*.md

# Review each PRP for:
# - Accuracy of requirements
# - Correct code patterns referenced
# - Realistic implementation steps
# - Proper validation criteria
```

**🔍 Human Review Point #3**

- [ ] Requirements align with constitution
- [ ] Technical approach is sound
- [ ] Dependencies are available
- [ ] No conflicts with existing code
- [ ] Implementation steps are clear

### After Review, Move to Outbox

```bash
# Only after human approval
mv prp/inbox/*.prp.md prp/outbox/
```

## Phase 4: Enhanced Specification

### Request Enhanced Spec from AI

```
"Claude, create an enhanced specification using:
- SpecKit output from speckit-output.md
- All approved PRPs from prp/outbox/
- Constitution v0.3.0 requirements"
```

### Save and Review

```bash
# AI generates enhanced spec, save it
code spec.md
# Paste AI output and review
```

**🔍 Human Review Point #4**

- Does spec cover all Sprint 3 requirements?
- Are PRPs properly incorporated?
- Is scope realistic for sprint duration?
- Any missing features or overreach?

## Phase 5: Technical Planning

### Generate Plan (After Spec Approval)

```
"Claude, create the technical implementation plan using:
- Approved spec.md
- PRPs from prp/outbox/ for implementation details
- 8-week sprint timeline"
```

### Review Technical Decisions

```bash
# Open plan in VSCode
code PLAN.md
# Review architecture decisions, technology choices, risk assessments
```

**🔍 Human Review Point #5**

- Architecture decisions sound?
- Technology stack appropriate?
- Risks properly identified?
- Timeline realistic?

## Phase 6: Task Breakdown

### Generate Tasks (After Plan Approval)

```
"Claude, break down the approved PLAN.md into detailed tasks with:
- Clear task IDs (S3T001, S3T002, etc.)
- Time estimates
- Dependencies
- Priority levels (P0, P1, P2)"
```

### Review and Adjust Tasks

```bash
# Open tasks in VSCode
code TASKS.md

# Review for:
# - Completeness
# - Realistic estimates
# - Proper sequencing
# - Clear descriptions
```

**🔍 Human Review Point #6**

- All features have tasks?
- Estimates add up correctly?
- Dependencies make sense?
- Priorities appropriate?

## Phase 7: Implementation

### Begin Implementation with PRPs

```
"Claude, let's implement task S3T001 using the Web3Forms PRP as our guide"
```

The AI will:

1. Reference the specific PRP
2. Follow the implementation runbook
3. Use exact code patterns specified
4. Include validation steps

### Track Progress

```bash
# Update TASKS.md in VSCode as you complete tasks
code TASKS.md
# Change [ ] to [x] for completed tasks
# Add notes about any issues or changes
```

## The Iteration Loop

Each phase can require multiple iterations:

### Example Iteration Flow

```
1. SpecKit generates basic output
   ↓
2. 🔍 Human: "This is too basic, we need more structure"
   ↓
3. Re-run SpecKit with different parameters
   ↓
4. 🔍 Human: "Better, now let's enhance with AI"
   ↓
5. AI generates PRPs
   ↓
6. 🔍 Human: "The Firebase PRP needs more context about our auth flow"
   ↓
7. "Claude, regenerate the Firebase PRP with context about our OAuth implementation"
   ↓
8. 🔍 Human: "Good, now all PRPs are ready"
   ↓
9. Continue to specification...
```

## Real-World Example: Sprint 3 Generation

```bash
# 1. Human reviews previous sprint
code archive/sprint-002/SPRINT_SUMMARY.md
# Decision: "We need to focus on the remaining 30% of features"

# 2. Human updates constitution
code ../constitution.md
# Updates version to v0.3.0, marks completed features

# 3. Feed to SpecKit
docker cp ../constitution.md speckit-dev:/workspace/constitution.md
docker compose exec speckit pwsh -File /workspace/.specify/scripts/powershell/create-new-feature.ps1 \
  -InputFilePath /workspace/constitution.md \
  -FeatureName "Sprint-3"

# 4. Human reviews SpecKit output
docker cp speckit-dev:/workspace/.specify/features/Sprint-3/spec.md ./speckit-output.md
code ./speckit-output.md
# Decision: "Output is good, ready for AI enhancement"

# 5. AI analyzes and identifies features
"Claude, analyze speckit-output.md and identify major features for PRPs"
# Human reviews list
# Decision: "Yes, those 5 features all need PRPs"

# 6. AI generates PRPs
"Claude, generate PRPs for the 5 approved features"
# Human reviews each PRP in VSCode
code prp/inbox/*.md
# Decision: "Web3Forms PRP needs rate limiting section added"

# 7. Iterate on specific PRP
"Claude, update the Web3Forms PRP to include rate limiting strategy"
# Human reviews again
# Decision: "Good, move all to outbox"
mv prp/inbox/*.md prp/outbox/

# 8. Generate enhanced specification
"Claude, create enhanced spec using SpecKit output and approved PRPs"
code spec.md
# Human reviews: "Looks comprehensive, approved"

# 9. Generate plan
"Claude, create technical plan from spec and PRPs"
code PLAN.md
# Human reviews: "Timeline too aggressive, extend to 8 weeks"

# 10. Regenerate with feedback
"Claude, adjust the plan for 8-week timeline"
# Human reviews: "Better, approved"

# 11. Generate tasks
"Claude, break down plan into detailed tasks"
code TASKS.md
# Human reviews: "Add tasks for documentation, then approved"

# 12. Begin implementation
"Claude, let's start with S3T001 following the Web3Forms PRP"
```

## Key Insights

### Human Review is Critical

- **Never skip review points** - Quality comes from human judgment
- **Iterate when needed** - Don't accept subpar output
- **Provide specific feedback** - Help AI improve the output
- **Use proper tools** - VSCode for editing, not vim

### The Power of Collaboration

- **SpecKit**: Provides structure and Docker processing
- **AI (Claude)**: Analyzes, enhances, generates content
- **Human**: Reviews, refines, approves, directs
- **Together**: Create high-quality sprint plans

### PRPs as Living Documents

PRPs are:

- Generated by AI from SpecKit analysis
- Reviewed and refined by humans
- Used as implementation guides
- Updated based on learnings

## Common Iteration Patterns

### "This needs more detail"

```
Human: "The PRP lacks error handling details"
Claude: "I'll regenerate with comprehensive error handling section"
```

### "Scope is too large"

```
Human: "This sprint has too many P0 tasks"
Claude: "I'll adjust priorities and move some features to Sprint 4"
```

### "Missing dependencies"

```
Human: "The plan doesn't account for the new auth system"
Claude: "I'll update to include auth system integration points"
```

## Best Practices

1. **Always review in proper editor** (VSCode, not vim)
2. **Don't rush through review points** - They ensure quality
3. **Iterate until satisfied** - First output is rarely perfect
4. **Document decisions** - Add comments about why changes were made
5. **Keep PRPs focused** - One major feature per PRP
6. **Version everything** - Track constitution and document evolution

## Summary

The SpecKit + AI workflow is a **human-driven iterative process**:

1. **Humans decide** what to build (constitution)
2. **SpecKit processes** in Docker (structure)
3. **Humans review** and approve output
4. **AI enhances** with PRPs and specifications
5. **Humans review** and refine at each step
6. **Together implement** with clear guidance

Success comes from the collaboration, not any single component.

---

_Remember: This is a human-driven process. SpecKit and AI are powerful tools, but human review and iteration at each step ensures quality._
