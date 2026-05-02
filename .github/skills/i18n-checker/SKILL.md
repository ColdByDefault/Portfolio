---
name: i18n-checker
description: "Portfolio i18n validator. Use when checking translation completeness, finding missing keys across locales, verifying key parity between en/de/es/fr/sv, or auditing hardcoded strings in components."
argument-hint: "Key path to check (e.g. 'About.badge') or leave blank for full parity audit"
---

# i18n Key Checker

Validates translation completeness across all 5 locales in the portfolio: `en`, `de`, `es`, `fr`, `sv`.

## When to Use

- After adding new translation keys to `messages/en.json`
- Before a release, to catch missing translations
- When a locale shows `[missing key]` at runtime
- To find hardcoded user-facing strings in components

## Locales

| File               | Locale                    |
| ------------------ | ------------------------- |
| `messages/en.json` | English (source of truth) |
| `messages/de.json` | German                    |
| `messages/es.json` | Spanish                   |
| `messages/fr.json` | French                    |
| `messages/sv.json` | Swedish                   |

## Procedure

### Full Parity Audit

1. Read all 5 message files.
2. Flatten each JSON to a list of dot-notation key paths (e.g. `About.badge`, `Nav.links.0`).
3. Compare every key in `en.json` against the other 4 locales.
4. Report keys present in `en` but missing from each locale.

### Single Key Check

1. Read all 5 message files.
2. Look up the provided key path in each locale.
3. Report which locales have it and which are missing.

### Hardcoded String Audit

1. Search `components/` and `app/` for JSX text nodes and `aria-label` / `title` / `placeholder` attributes that contain plain English strings (not `{t("...")}` calls).
2. Report file + line for each finding.

## Output Format

**Missing keys report:**

```
Missing in DE (3):
  - About.currentFocusItems
  - Services.cta.label
  - Blog.emptyState

Missing in FR (1):
  - Blog.emptyState
```

**Hardcoded strings report:**

```
[HARDCODED] components/hero/Hero.tsx line 42
  "Get in touch" → should use t("Hero.cta") or similar
```

Finish with: total key count in `en.json`, parity percentage per locale.
