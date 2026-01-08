# Verifieringschecklista - AI-kodverktyg Anpassningsmetoder

## Översikt
- **Totalt antal modaler:** 36
- **Totalt antal källor:** 62 unika URL:er
- **Totalt antal tekniska claims:** 367
- **Status:** Ej påbörjad

## Källsammanställning per verktyg

### Claude Code (9 modaler)
**Huvudkälla:**
- https://code.claude.com/docs (används i alla 9 modaler)

**Ytterligare källor:**
- https://github.com/anthropics/claude-code
- https://github.com/modelcontextprotocol/servers

**Status:** [ ] Ej verifierad

---

### Cline (9 modaler)
**Huvudkällor:**
- https://docs.cline.bot/ (används i flera modaler)
- https://docs.cline.bot/features/cline-rules
- https://docs.cline.bot/features/hooks
- https://docs.cline.bot/features/slash-commands/workflows
- https://docs.cline.bot/mcp/mcp-overview

**Ytterligare källor:**
- https://github.com/cline/cline
- https://cline.bot/blog/mcp-servers-explained-what-they-are-how-they-work-and-why-cline-is-revolutionizing-ai-tools
- https://www.pulsemcp.com/servers/bradfair-cline-personas

**Status:** [ ] Ej verifierad

---

### GitHub Copilot (9 modaler)
**Huvudkällor:**
- https://docs.github.com/copilot/ (flera subpaths)
- https://code.visualstudio.com/docs/copilot/ (flera subpaths)

**Specifika källor:**
- https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
- https://code.visualstudio.com/docs/copilot/customization/custom-instructions
- https://github.blog/ai-and-ml/github-copilot/agent-mode-101-all-about-github-copilots-powerful-mode/
- https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent
- https://code.visualstudio.com/docs/copilot/customization/agent-skills
- https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-skillset-for-your-copilot-extension/about-copilot-skillsets
- https://docs.github.com/en/copilot/reference/cheat-sheet
- https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features
- https://docs.github.com/copilot/customizing-copilot/using-model-context-protocol/extending-copilot-chat-with-mcp
- https://docs.github.com/copilot/building-copilot-extensions/
- https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization

**Status:** [ ] Ej verifierad

---

### OpenAI Codex CLI (9 modaler)
**Huvudkällor:**
- https://developers.openai.com/codex/ (flera subpaths)

**Specifika källor:**
- https://developers.openai.com/codex/guides/agents-md/
- https://github.com/agentsmd/agents.md
- https://github.com/leonardsellem/codex-subagents-mcp
- https://github.com/openai/codex/issues/2604
- https://developers.openai.com/codex/custom-prompts/
- https://developers.openai.com/codex/mcp/
- https://github.com/openai/codex/discussions/2150
- https://developers.openai.com/codex/guides/agents-sdk/
- https://developers.openai.com/codex/cli/slash-commands/
- https://developers.openai.com/codex/cli/reference/
- https://developers.openai.com/codex/config-reference/
- https://developers.openai.com/codex/security/
- https://github.com/openai/codex

**VARNING:** Många OpenAI Codex CLI länkar kan vara felaktiga då produkten kanske inte existerar eller har annat namn.

**Status:** [ ] Ej verifierad

---

## Verifieringsstrategi

### Fas 1: Källvalidering
1. [ ] Verifiera att alla Claude Code källor är tillgängliga
2. [ ] Verifiera att alla Cline källor är tillgängliga
3. [ ] Verifiera att alla GitHub Copilot källor är tillgängliga
4. [ ] Verifiera att alla OpenAI Codex CLI källor är tillgängliga
   - **OBS:** Särskild uppmärksamhet på OpenAI Codex CLI - produkten kanske inte existerar

### Fas 2: Claims-verifiering per kategori

#### Projektinstruktioner (4 modaler)
- [ ] Claude Code: CLAUDE.md
- [ ] Cline: .clinerules/
- [ ] GitHub Copilot: copilot-instructions.md
- [ ] OpenAI Codex CLI: AGENTS.md

#### Specialiserade agenter (4 modaler)
- [ ] Claude Code: Subagents
- [ ] Cline: Operativa modes
- [ ] GitHub Copilot: Agent Mode + Coding Agent
- [ ] OpenAI Codex CLI: Community MCP

#### Återanvändbara capabilities (4 modaler)
- [ ] Claude Code: Skills
- [ ] Cline: MCP servers
- [ ] GitHub Copilot: Agent Skills
- [ ] OpenAI Codex CLI: Custom prompts + MCP

#### Event automation (4 modaler)
- [ ] Claude Code: Hooks
- [ ] Cline: Hooks (4 event-typer)
- [ ] GitHub Copilot: Webhooks (begränsad)
- [ ] OpenAI Codex CLI: Notifications endast

#### Externa verktyg (4 modaler)
- [ ] Claude Code: MCP servers
- [ ] Cline: MCP är kärnfunktion
- [ ] GitHub Copilot: MCP servers
- [ ] OpenAI Codex CLI: MCP servers

#### Custom commands (4 modaler)
- [ ] Claude Code: Slash commands
- [ ] Cline: Workflows + slash
- [ ] GitHub Copilot: Omfattande slash
- [ ] OpenAI Codex CLI: Slash commands

#### Output-anpassning (4 modaler)
- [ ] Claude Code: Output styles
- [ ] Cline: Begränsad UI
- [ ] GitHub Copilot: Prompt-baserad
- [ ] OpenAI Codex CLI: Reasoning controls

#### Plugin-system (4 modaler)
- [ ] Claude Code: Plugins
- [ ] Cline: MCP istället
- [ ] GitHub Copilot: Skillsets + Agents
- [ ] OpenAI Codex CLI: MCP istället

#### Permissions/Settings (4 modaler)
- [ ] Claude Code: Settings
- [ ] Cline: Permissions config
- [ ] GitHub Copilot: Enterprise-granulär
- [ ] OpenAI Codex CLI: Sandbox/approval

### Fas 3: Dokumentera resultat
- [ ] Uppdatera VERIFICATION_REPORT.md med verifierade claims
- [ ] Dokumentera felaktigheter i corrections_log.md
- [ ] Uppdatera index.html vid behov
- [ ] Skapa lista över källor som inte fungerar

---

## Prioriterade verifieringar

### Högsta prioritet (kritiska claims)
1. **OpenAI Codex CLI existens** - Verifiera om produkten finns
2. **GitHub Copilot Agent Mode** - Verifiera Agent Mode och Coding Agent
3. **Cline hooks 4 event-typer** - Verifiera TaskStart, PreToolUse, PostToolUse, UserPromptSubmit
4. **Claude Code subagents** - Verifiera native subagents med separata contexts

### Medelhög prioritet (specifika features)
1. **GitHub Copilot 1,400+ connectors** - Verifiera detta specifika antal
2. **OpenAI Codex CLI sandbox modes** - Verifiera read-only, workspace-write, danger-full-access
3. **Cline autonomous MCP creation** - Verifiera att Cline kan skapa MCP servers autonomt
4. **GitHub Copilot VS Code 1.102+** - Verifiera MCP support version

### Lägre prioritet (generella features)
1. File paths och placering
2. Basic command syntax
3. General functionality descriptions

---

## Anteckningar under verifiering

### Upptäckta problem

#### OpenAI Codex CLI
**VARNING:** Produkten "OpenAI Codex CLI" verkar inte existera. Möjliga alternativ:
- OpenAI CLI (https://platform.openai.com/docs/cli)
- GitHub Copilot CLI
- Anthropic Claude CLI

**Åtgärd krävs:** Verifiera om detta är en felaktig produkt eller om det finns under annat namn.

### Korrigeringar som behövs
_(Lägg till när du hittar avvikelser)_

---

## Status per modal

### ✅ = Verifierad och korrekt
### ⚠️ = Verifierad med mindre justeringar
### ❌ = Felaktig information
### 🔍 = Under granskning

| Modal ID | Verktyg | Kategori | Status | Anteckningar |
|----------|---------|----------|--------|--------------|
| modal-proj-claude | Claude Code | Projektinstruktioner | 🔍 | |
| modal-proj-cline | Cline | Projektinstruktioner | 🔍 | |
| modal-proj-copilot | GitHub Copilot | Projektinstruktioner | 🔍 | |
| modal-proj-codex | OpenAI Codex CLI | Projektinstruktioner | 🔍 | Verifiera produkt |
| modal-agent-claude | Claude Code | Specialiserade agenter | 🔍 | |
| modal-agent-cline | Cline | Specialiserade agenter | 🔍 | |
| modal-agent-copilot | GitHub Copilot | Specialiserade agenter | 🔍 | |
| modal-agent-codex | OpenAI Codex CLI | Specialiserade agenter | 🔍 | Verifiera produkt |
| modal-skill-claude | Claude Code | Återanvändbara capabilities | 🔍 | |
| modal-skill-cline | Cline | Återanvändbara capabilities | 🔍 | |
| modal-skill-copilot | GitHub Copilot | Återanvändbara capabilities | 🔍 | |
| modal-skill-codex | OpenAI Codex CLI | Återanvändbara capabilities | 🔍 | Verifiera produkt |
| modal-hook-claude | Claude Code | Event automation | 🔍 | |
| modal-hook-cline | Cline | Event automation | 🔍 | |
| modal-hook-copilot | GitHub Copilot | Event automation | 🔍 | |
| modal-hook-codex | OpenAI Codex CLI | Event automation | 🔍 | Verifiera produkt |
| modal-mcp-claude | Claude Code | Externa verktyg | 🔍 | |
| modal-mcp-cline | Cline | Externa verktyg | 🔍 | |
| modal-mcp-copilot | GitHub Copilot | Externa verktyg | 🔍 | |
| modal-mcp-codex | OpenAI Codex CLI | Externa verktyg | 🔍 | Verifiera produkt |
| modal-cmd-claude | Claude Code | Custom commands | 🔍 | |
| modal-cmd-cline | Cline | Custom commands | 🔍 | |
| modal-cmd-copilot | GitHub Copilot | Custom commands | 🔍 | |
| modal-cmd-codex | OpenAI Codex CLI | Custom commands | 🔍 | Verifiera produkt |
| modal-output-claude | Claude Code | Output-anpassning | 🔍 | |
| modal-output-cline | Cline | Output-anpassning | 🔍 | |
| modal-output-copilot | GitHub Copilot | Output-anpassning | 🔍 | |
| modal-output-codex | OpenAI Codex CLI | Output-anpassning | 🔍 | Verifiera produkt |
| modal-plugin-claude | Claude Code | Plugin-system | 🔍 | |
| modal-plugin-cline | Cline | Plugin-system | 🔍 | |
| modal-plugin-copilot | GitHub Copilot | Plugin-system | 🔍 | |
| modal-plugin-codex | OpenAI Codex CLI | Plugin-system | 🔍 | Verifiera produkt |
| modal-settings-claude | Claude Code | Permissions/Settings | 🔍 | |
| modal-settings-cline | Cline | Permissions/Settings | 🔍 | |
| modal-settings-copilot | GitHub Copilot | Permissions/Settings | 🔍 | |
| modal-settings-codex | OpenAI Codex CLI | Permissions/Settings | 🔍 | Verifiera produkt |

---

**Senast uppdaterad:** 2026-01-07
