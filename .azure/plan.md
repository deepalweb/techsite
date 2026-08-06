# Azure Deployment Plan

> **Status:** Validated

Generated: 2026-08-06

---

## 1. Project Overview

**Goal:** Publish the redesigned DR TECH React site to the existing GitHub repository and allow the existing Azure Static Web Apps workflow to deploy it.

**Path:** Modify Existing Azure Application

---

## 2. Requirements

| Attribute | Value |
|-----------|-------|
| Classification | Production customer-facing website |
| Scale | Small |
| Budget | Cost-Optimized |
| Subscription | Existing Azure Static Web App; no subscription change required |
| Location | Existing Azure Static Web App region; no location change required |

---

## 3. Components Detected

| Component | Type | Technology | Path |
|-----------|------|------------|------|
| web | SPA frontend | React 18, Vite 6, Tailwind CSS | `/src`, `/public` |
| deployment | CI/CD | GitHub Actions, Azure Static Web Apps deploy action | `/.github/workflows/azure-static-web-apps-mango-desert-04668b71e.yml` |

No API, database, background worker, container, or server-side runtime is present.

---

## 4. Recipe Selection

**Selected:** Existing GitHub Actions deployment workflow

**Rationale:** The Azure Static Web App already exists and its workflow deploys pushes to `main`. No new infrastructure or AZD configuration is needed for this content update.

---

## 5. Architecture

**Stack:** Static Web Apps

| Component | Azure Service | SKU |
|-----------|---------------|-----|
| React SPA | Existing Azure Static Web App | Existing SKU unchanged |

Supporting Azure resources are unchanged. This deployment does not add Log Analytics, Application Insights, Key Vault, managed identities, or infrastructure resources.

---

## 6. Provisioning Limit Checklist

| Resource Type | Number to Deploy | Total After Deployment | Limit/Quota | Notes |
|---------------|------------------|------------------------|-------------|-------|
| New Azure resources | 0 | Existing resources unchanged | Not applicable | GitHub-triggered content deployment only; no provisioning or capacity change |

**Status:** ✅ No new resources or quota requirements.

---

## 7. Execution Checklist

### Planning
- [x] Analyze workspace
- [x] Scan codebase and existing deployment workflow
- [x] Confirm deployment target from existing repository configuration
- [x] Confirm no new Azure provisioning is required
- [x] User approved this plan

### Execution
- [x] Exclude local-only `.claude/` settings from the commit
- [x] Run the production build
- [x] Review the exact Git changes to be published
- [ ] Commit the application migration and redesign
- [ ] Push `main` to `origin`
- [ ] Monitor the Azure Static Web Apps GitHub Actions run
- [ ] Verify the deployed website

### Validation
- [x] Record local production-build result
- [ ] Record GitHub Actions deployment result

### Validation Proof

| Check | Command | Result | Date |
|-------|---------|--------|------|
| Production build | `npm run build` | ✅ Vite build completed; 1,984 modules transformed | 2026-08-06 |
| Translation syntax | PowerShell `ConvertFrom-Json` for en/si/ta | ✅ All locale files parsed | 2026-08-06 |
| Patch quality | `git diff --check` | ✅ No whitespace errors | 2026-08-06 |
| GitHub remote | `git ls-remote --exit-code origin refs/heads/main` | ✅ Remote main branch reachable | 2026-08-06 |

**Validated by:** azure-validate workflow

---

## 8. Files to Generate or Update

| File | Purpose | Status |
|------|---------|--------|
| `.azure/plan.md` | Deployment source of truth | ✅ |
| `.gitignore` | Exclude local-only editor/agent settings | Planned |
| Existing application files | React site redesign | Ready for review |
| Existing SWA workflow | Build Vite and publish `dist` | Ready for review |

---

## 9. Next Steps

1. Obtain user approval for this deployment plan.
2. Validate, commit, and push the scoped changes.
3. Monitor GitHub Actions until Azure deployment completes.
