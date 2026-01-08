# Corrections Log - AI-kodverktyg Anpassningsmetoder

## 2026-01-07 - Fas 1: URL-verifiering

### Verifierade URL:er
- ✅ `https://code.claude.com/docs/en/output-styles` - Existerar och täcker output styles
- ✅ `https://code.claude.com/docs/en/plugins` - Existerar och täcker plugin-systemet
- ❌ `https://code.claude.com/docs/en/commands` - Existerar INTE (404)

### URL-korrigering
**Felaktig URL:** `/docs/en/commands`
**Problem:** Sidan existerar inte, returnerar 404
**Korrektion:** Använder `/docs/en/slash-commands` istället
**Källa:** Claude Code-dokumentationen använder "slash commands" som term, inte "commands"
**Påverkar:** modal-cmd-claude (rad 1605)

---

## 2026-01-07 - Fas 2: Uppdatering av Claude Code-länkar

### Problem
Generiska dokumentationslänkar pekade på `/docs` istället för specifika sidor, vilket gör det svårare för användare att hitta relevant information.

### Åtgärd
Uppdaterade 9 modaler med specifika dokumentations-URL:er:

| Rad | Modal ID | Gammal URL | Ny URL | Status |
|-----|----------|------------|--------|--------|
| 722 | modal-proj-claude | /docs | /docs/en/memory | ✅ Uppdaterad |
| 898 | modal-agent-claude | /docs | /docs/en/subagents | ✅ Uppdaterad |
| 1074 | modal-skill-claude | /docs | /docs/en/skills | ✅ Uppdaterad |
| 1252 | modal-hook-claude | /docs | /docs/en/hooks | ✅ Uppdaterad |
| 1426 | modal-mcp-claude | /docs | /docs/en/mcp | ✅ Uppdaterad |
| 1605 | modal-cmd-claude | /docs | /docs/en/slash-commands | ✅ Uppdaterad |
| 1791 | modal-output-claude | /docs | /docs/en/output-styles | ✅ Uppdaterad |
| 1984 | modal-plugin-claude | /docs | /docs/en/plugins | ✅ Uppdaterad |
| 2164 | modal-settings-claude | /docs | /docs/en/settings | ✅ Uppdaterad |

**Footer-länk (rad 656):** Behålls som generisk `/docs` (avsiktligt)

### Verifiering
Alla 9 Claude Code-länkar har verifierats vara uppdaterade genom grep-kommando 2026-01-07.

---

## Påståendeverifieringar

### 2026-01-07 - modal-skill-copilot - Skillsets källa otillgänglig

**Påstående:** "Skillsets: upp till 5 skills per set"
**Källa:** https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-skillset-for-your-copilot-extension/about-copilot-skillsets
**Problem:** Källan returnerar 404 (sidan finns inte)
**Status:** KÄLLA EJ TILLGÄNGLIG - påstående markerat som [?] i VERIFICATION_REPORT.md
**Åtgärd:** Behöver alternativ källa eller bör tas bort från HTML om det inte kan verifieras

---

### 2026-01-07 - modal-hook-copilot - FELAKTIGA webhooks-påståenden

**Felaktiga påståenden:**
1. "Webhooks kan skapas på Settings → API page"
2. "Payload structure med eventType och data"
3. "Security verification via x-copilot-signature header"

**Källa:** https://docs.github.com/copilot/
**Problem:** GitHub Copilot-dokumentationen nämner INTE webhooks, payload structures, eller x-copilot-signature headers
**Status:** FELAKTIG INFORMATION - Webhooks för GitHub Copilot Chat existerar inte eller är inte dokumenterade
**Korrektion:** Modal-texten behöver uppdateras för att ta bort felaktiga webhooks-påståenden

**Förslag:** Ändra status till "❌ Saknas" istället för "⚠️ Partial stöd" och ta bort tekniska detaljer om webhooks som inte kan verifieras.

**Åtgärd utförd:** 2026-01-07
- ✅ Ändrat modal-status från "Partial stöd - Webhooks (begränsad)" till "Saknas - Inget hooks-system"
- ✅ Tagit bort "Tillgängligt"-sektion med felaktiga webhooks-påståenden
- ✅ Uppdaterat "Begränsningar"-sektion med korrekt information
- ✅ Ändrat tabellcell från "⚠️ Webhooks (begränsad)" till "❌ Saknas"
- ✅ Ändrat CSS-klass från "status-partial" till "status-missing"

---

### 2026-01-07 - modal-mcp-copilot - FELAKTIG VS Code-version

**Felaktigt påstående:** "Full MCP-support i VS Code 1.102+"
**Källa:** https://docs.github.com/copilot/customizing-copilot/using-model-context-protocol/extending-copilot-chat-with-mcp
**Problem:** Dokumentationen anger "Visual Studio Code version 1.99 or later", inte 1.102+
**Korrektion:** Ändrat från "1.102+" till "1.99+"
**Påverkar:** modal-mcp-copilot (rad 1484)
**Bevis från källa:** "Visual Studio Code version 1.99 or later. For information on installing Visual Studio Code, see the Visual Studio Code download page."

**Åtgärd utförd:** 2026-01-07
- ✅ Korrigerat versionsnummer från "VS Code 1.102+" till "VS Code 1.99+" på rad 1484

---

### 2026-01-07 - modal-output-copilot - FELAKTIG "experimental" markering

**Felaktigt påstående:** "Reusable Prompt Files (experimental)"
**Källa:** https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features
**Problem:** Dokumentationen markerar INTE Reusable Prompt Files som "experimental" eller "preview" - de är en stabil feature
**Korrektion:** Tog bort "(experimental)" från beskrivningen
**Påverkar:** modal-output-copilot (rad 1863)
**Bevis från källa:** "Define reusable prompts for common tasks like generating code or performing a code review." (ingen experimental-markering)

**Åtgärd utförd:** 2026-01-07
- ✅ Tog bort "(experimental)" från "Reusable Prompt Files" på rad 1863

---

### 2026-01-07 - modal-plugin-copilot - FELAKTIGT påstående om "1,400+ connectors"

**Felaktigt påstående:** "1,400+ external connectors (M365)"
**Källor:**
- https://github.blog/news-insights/product-news/your-stack-your-rules-introducing-custom-agents-in-github-copilot-for-observability-iac-and-security/
- https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/
**Problem:**
1. GitHub Copilot och Microsoft 365 Copilot är OLIKA produkter
2. GitHub Copilot har 18+ partner-built custom agents (enligt GitHub Blog 2025)
3. Microsoft 365 Copilot har "över 100" connectors (INTE 1,400+)
4. Påståendet blandade ihop två olika produkter och överdrev antalet kraftigt

**Korrektion:** Ändrat från "1,400+ external connectors (M365)" till "18+ partner-built custom agents"
**Påverkar:** modal-plugin-copilot (rad 2058)
**Bevis från källa:** GitHub Blog nämner "18+ partner-built agents" som är tillgängliga. Microsoft 365 Copilot dokumentationen anger "more than 100 prebuilt connectors" - långt under 1,400+.

**Åtgärd utförd:** 2026-01-07
- ✅ Korrigerat från "1,400+ external connectors (M365)" till "18+ partner-built custom agents" på rad 2058

---

### 2026-01-07 - modal-agent-cline - MASSIVT FEL: Blandade ihop Cline och Roo Code

**Felaktiga påståenden:** Hela modalen beskrev Roo Code's modes, inte Clines
1. "Code Mode: Full verktygsåtkomst för implementation"
2. "Architect Mode: High-level design utan kod-exekvering"
3. "Ask Mode: Research utan fil-modifieringar"
4. "Debug Mode: Systematisk problemdiagnos"
5. "Växla via dropdown eller slash commands (/ask, /code, etc.)"

**Källor:**
- https://docs.cline.bot/features/plan-and-act
- https://apidog.com/blog/roocode-vs-cline/
- https://www.qodo.ai/blog/roo-code-vs-cline/

**Problem:**
HTML-filen beskrev Roo Code's fyra modes (Code, Architect, Ask, Debug), men Cline har ENDAST två modes:
- **Plan Mode**: Read-only access, analyserar codebase utan fil-ändringar
- **Act Mode**: Full verktygsåtkomst för implementation

Detta var en total sammanblandning av två olika produkter (Cline vs Roo Code).

**Korrektion:** Omskrev hela modal-sektionen för att korrekt beskriva Clines Plan och Act modes
**Påverkar:** modal-agent-cline (rader 916-935)
**Bevis från källa:**
- Cline dokumentation: "Plan Mode can read your entire codebase to understand the context, won't make any changes to your files"
- Roo Code dokumentation: "default modes: Code, Debug, Architect, and Ask"

**Åtgärd utförd:** 2026-01-07
- ✅ Omskrev "Tillgängliga modes" från 4 felaktiga Roo Code modes till 2 korrekta Cline modes
- ✅ Uppdaterade Implementation-beskrivning
- ✅ Korrigerade Begränsningar-sektionen
- ✅ Uppdaterade länk till Plan & Act-dokumentation

---

### 2026-01-07 - modal-cmd-cline - FELAKTIGA slash commands (Roo Code igen)

**Felaktiga påståenden:** "/ask, /architect, /code, /debug (mode switches)"
**Källa:** https://docs.cline.bot/features/slash-commands/workflows
**Problem:** Cline har INTE dessa slash commands. Detta är Roo Code commands igen.
**Cline's faktiska built-in commands:**
- /newtask - Skapa ny task
- /newrule - Skapa ny rule
- /explain-changes - Förklara ändringar
- /smol - Smaller/optimized variant
- /reportbug - Rapportera bugs
- /deep-planning - Djupare planering

**Korrektion:** Ersatte felaktiga commands med korrekta Cline commands
**Påverkar:** modal-cmd-cline (rad 1621)
**Bevis från källa:** Cline dokumentationen listar 6 built-in commands, men INTE /ask, /architect, /code eller /debug

**Åtgärd utförd:** 2026-01-07
- ✅ Ersatte felaktiga Roo Code commands med korrekta Cline commands på rad 1621-1623

---

## 2026-01-08 - Kompletteringsverifiering

### Session 5: Verifiering av tidigare oklara påståenden

**Status:** 16/19 påståenden verifierade, 3 förblir oklara

**Verifierade påståenden:**
1. ✅ GitHub Copilot Skillsets (5 skills limit) - GitHub Docs bekräftar "up to five per skillset"
2. ✅ GitHub Copilot VS Code Markdown output - Chat responses preserve markdown formatting
3. ✅ GitHub Copilot Agents autonom kontroll - Dokumentation bekräftar "works autonomously"
4. ✅ Cline sidebar positioning - Docs visar "opening-cline-in-sidebar" option
5. ✅ Cline dark/light mode - data-theme="dark", prefers-color-scheme media queries
6. ✅ Cline Geist Sans font - CSS visar "font-family: 'Geist Sans'"
7. ✅ Cline terminal environment variables - "terminal-integration-guide" i docs
8. ✅ Cline inget output-style system - ingen dokumentation om templates
9. ✅ Cline Manual Approval/Auto-Approve - Docs visar "Auto Approve", "YOLO Mode"
10. ✅ Cline API provider selection - Multi-provider support dokumenterat
11. ✅ Cline workspace root - "Multi-Root Workspaces" functionality
12. ✅ Cline cost tracking - Mentioned i model comparison
13. ✅ Cline inget native plugin-system - Ingen plugin.json dokumentation
14. ✅ Cline MCP som extension mechanism - MCP marketplace verifierat
15. ✅ Cline open-source architecture - GitHub repo github.com/cline/cline
16. ✅ Cline Personas MCP - github.com/bradfair/mcp-cline-personas

**Slutgiltigt oklara påståenden (ingen dokumentation):**
1. ⚠️ OpenAI Codex CLI CLINE_ACTIVE pager detection
2. ⚠️ Cline blocked directories (refereras men ej detaljer)
3. ⚠️ Cline system keychain för API keys (ej detaljer)

**Källor:**
- https://docs.github.com/en/copilot/building-copilot-extensions/
- https://docs.cline.bot/
- https://docs.cline.bot/features/settings
- https://github.com/cline/cline

**Slutresultat:** 196/199 påståenden verifierade (98.5% coverage)

---

## 2026-01-08 - Borttagning av oklara påståenden

### Åtgärd: Ta bort 3 påståenden med otillräcklig dokumentation från HTML

**Problem:** 3 påståenden kunde inte verifieras pga. bristande eller otillgänglig dokumentation

**Borttagna påståenden:**

1. **OpenAI Codex CLI - Output (rad 1915):**
   - **Påstående:** "Pager disable via CLINE_ACTIVE detection"
   - **Problem:** Ingen dokumentation funnen för CLINE_ACTIVE miljövariabel
   - **Åtgärd:** Borttagen från Format Options-listan

2. **Cline - Settings (rad 2191):**
   - **Påstående:** "Blocked directories"
   - **Problem:** Refereras i navigering men inga detaljer i tillgänglig dokumentation
   - **Åtgärd:** Borttagen från Konfiguration-listan

3. **Cline - Settings (rad 2202):**
   - **Påstående:** "Secret storage: encrypted API keys (system keychain)"
   - **Problem:** Inga detaljer om keychain-integration i tillgänglig dokumentation
   - **Åtgärd:** Borttagen från Storage-listan

**Motivering:** För att säkerställa 100% verifierbarhet och undvika potentiellt vilseledande information valde vi att ta bort påståenden som inte kunde bekräftas med dokumentation.

**Slutresultat:** 196/196 påståenden i HTML är nu fullständigt verifierade (100% coverage)

