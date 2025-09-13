# Product Requirements Prompt (PRP) Template

<!-- Based on Cole Medlin's Context Engineering Framework -->

**Feature Name**: [FEATURE_NAME]  
**Priority**: P0 | P1 | P2  
**Sprint**: [SPRINT_NUMBER]  
**Status**: 📥 Inbox | 📤 Outbox | ✅ Processed  
**Created**: [DATE]  
**Author**: [AUTHOR]

---

## 1. Product Requirements

### What We're Building

<!-- Clear, concise description of the feature -->

### Why We're Building It

<!-- Business value and user impact -->

### Success Criteria

<!-- Measurable outcomes that define success -->

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

### Out of Scope

<!-- What this feature explicitly does NOT include -->

---

## 2. Context & Codebase Intelligence

### Existing Patterns to Follow

<!-- Reference existing code patterns that should be replicated -->

#### Component Structure

```typescript
// Example from existing codebase
// Path: src/components/example.tsx
```

#### Testing Patterns

```typescript
// Example test structure
// Path: src/__tests__/example.test.tsx
```

#### Styling Conventions

```css
/* DaisyUI classes and theme usage */
```

### Dependencies & Libraries

<!-- List all required dependencies with versions -->

- Next.js: 15.5.2
- React: 19.1.0
- [Additional dependencies specific to feature]

### File Structure

```
src/
├── components/
│   └── [feature]/
│       ├── index.tsx
│       ├── [Feature].tsx
│       ├── [Feature].test.tsx
│       └── [Feature].stories.tsx
```

---

## 3. Technical Specifications

### API Endpoints (if applicable)

```typescript
// GET /api/[endpoint]
// POST /api/[endpoint]
```

### Data Models

```typescript
interface [ModelName] {
  // Define interfaces and types
}
```

### State Management

<!-- How state should be managed for this feature -->

### Performance Requirements

- Load time: < [X]ms
- Lighthouse score: > [X]
- Bundle size impact: < [X]KB

---

## 4. Implementation Runbook

### Step 1: Setup & Dependencies

```bash
# Commands to run
```

### Step 2: Core Implementation

<!-- Detailed implementation steps -->

1. Create component structure
2. Implement business logic
3. Add styling with DaisyUI
4. Integrate with existing systems

### Step 3: Testing

- [ ] Unit tests with Vitest
- [ ] Integration tests
- [ ] Accessibility testing with Pa11y
- [ ] Manual testing checklist

### Step 4: Documentation

- [ ] Update Storybook stories
- [ ] Add component documentation
- [ ] Update CHANGELOG.md

---

## 5. Validation Loops

### Pre-Implementation Checks

- [ ] Constitution alignment verified
- [ ] Dependencies available
- [ ] No conflicting work in progress

### During Implementation

- [ ] Tests passing at each step
- [ ] Lint and type checks passing
- [ ] Build succeeding

### Post-Implementation

- [ ] All tests passing
- [ ] Coverage threshold met
- [ ] Performance benchmarks met
- [ ] Accessibility checks passing

---

## 6. Risk Mitigation

### Potential Risks

1. **Risk**: [Description]
   **Mitigation**: [Strategy]

2. **Risk**: [Description]
   **Mitigation**: [Strategy]

---

## 7. References

### Internal Documentation

- Constitution: `/docs/constitution.md`
- Architecture Decision Records: `/ADRs/`
- Previous similar implementations: [Links]

### External Resources

- [Relevant documentation links]
- [API documentation]
- [Library documentation]

---

## PRP Workflow Status

### Review Checklist (Inbox → Outbox)

- [ ] Product requirements clear and complete
- [ ] Technical approach validated
- [ ] Resources available
- [ ] No blocking dependencies
- [ ] Approved by: [APPROVER]

### Processing Status (Outbox → Processed)

- [ ] Specification generated
- [ ] Plan created
- [ ] Tasks broken down
- [ ] Implementation started
- [ ] Completed on: [DATE]

---

<!--
PRP Template v1.0
Based on Cole Medlin's Context Engineering methodology
Adapted for CRUDkit SpecKit workflow
-->
