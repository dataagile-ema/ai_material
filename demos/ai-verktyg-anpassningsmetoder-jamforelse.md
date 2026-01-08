# AI-kodverktyg: Jämförelse av anpassningsmetoder

Översikt över hur Claude Code's anpassningsmetoder motsvaras i Cline, GitHub Copilot och OpenAI Codex CLI.

## Sammanfattning

| Anpassningsmetod | Claude Code | Cline | GitHub Copilot | OpenAI Codex CLI |
|------------------|-------------|-------|----------------|------------------|
| **Projektinstruktioner** | ✅ `.claude/CLAUDE.md` | ✅ `.clinerules/` | ✅ `.github/copilot-instructions.md` | ✅ `AGENTS.md` |
| **Specialiserade agenter** | ✅ Subagents | ⚠️ Operativa modes | ✅ Agent Mode + Coding Agent | ⚠️ Community MCP |
| **Återanvändbara capabilities** | ✅ Skills | 🔄 MCP servers | ✅ Agent Skills | ✅ Custom prompts + MCP |
| **Event automation** | ✅ Hooks | ✅ Hooks | ⚠️ Webhooks (begränsad) | ❌ Notifications endast |
| **Externa verktyg** | ✅ MCP servers | ✅ MCP servers | ✅ MCP servers | ✅ MCP servers |
| **Custom commands** | ✅ Slash commands | ✅ Workflows + slash | ✅ Omfattande slash | ✅ Slash commands |
| **Output-anpassning** | ✅ Output styles | ⚠️ Begränsad | ⚠️ Prompt-baserad | ✅ Reasoning controls |
| **Plugin-system** | ✅ Plugins | 🔄 MCP istället | ✅ Skillsets + Agents | 🔄 MCP istället |
| **Permissions/Settings** | ✅ Settings | ✅ Permissions config | ✅ Enterprise-granulär | ✅ Sandbox/approval |

**Symboler**: ✅ Fullt stöd | ⚠️ Partial stöd | ❌ Saknas | 🔄 Annan approach

---

## 1. Projektinstruktioner och kontext

**Vad det är**: Markdown-filer som innehåller projektspecifika instruktioner, kodstandarder och kontext som AI-verktyget automatiskt läser vid start.

**Jämförelse**:
- **Claude Code**: `.claude/CLAUDE.md` (projekt) eller `~/.claude/CLAUDE.md` (användare), supports path-specifika regler
- **Cline**: `.clinerules/` mapp där alla MD-filer kombineras automatiskt, AI-redigerbar
- **GitHub Copilot**: `.github/copilot-instructions.md` + path-specifika instruktioner med glob patterns (`applyTo: "app/models/**/*.rb"`)
- **OpenAI Codex**: `AGENTS.md` med multi-level hierarchy (global `~/.codex/AGENTS.md` + projekt + `AGENTS.override.md`)

**Skillnader**: GitHub Copilot har mest granulär path-specifik kontroll. Alla verktyg har liknande grundfunktionalitet.

---

## 2. Specialiserade agenter och sub-agenter

**Vad det är**: Möjlighet att delegera specifika uppgifter till specialiserade AI-assistenter med egna context-fönster och verktyg.

**Jämförelse**:
- **Claude Code**: Native subagents med separata context-fönster, `.claude/agents/` directory
- **Cline**: Operativa modes (Code, Architect, Ask, Debug) men ej fullständiga sub-agenter
- **GitHub Copilot**: Agent Mode (real-time), Coding Agent (asynkron), Domain-expert participants (`@workspace`, `@github`, `@terminal`)
- **OpenAI Codex**: Saknar native stöd, community har byggt MCP-baserade lösningar (codex-subagents-mcp)

**Skillnader**: GitHub Copilot har mest sofistikerad agent-arkitektur. Claude Code och Copilot har native stöd, Cline partial, Codex använder workarounds.

---

## 3. Skills och återanvändbara capabilities

**Vad det är**: Fördefinierade färdigheter eller arbetssätt som AI-verktyget kan använda automatiskt när relevant.

**Jämförelse**:
- **Claude Code**: `.claude/skills/` med `SKILL.md` filer (YAML frontmatter + instruktioner)
- **Cline**: MCP servers fungerar som skills, plus Cline Personas MCP för komponenter
- **GitHub Copilot**: Agent Skills i `.github/skills/` med `SKILL.md` (liknande Claude), progressive disclosure
- **OpenAI Codex**: Custom prompts i `~/.codex/prompts/` + MCP-integration, stödjer arguments (`$1`-`$9`)

**Skillnader**: GitHub Copilot och Claude Code har mest liknande skills-system. Cline och Codex använder MCP mer centralt.

---

## 4. Hooks och event-triggered automation

**Vad det är**: Möjlighet att köra shell-kommandon eller scripts automatiskt vid specifika events (före/efter verktygsanvändning, vid start, etc.).

**Jämförelse**:
- **Claude Code**: Hooks system med events (PreToolUse, PostToolUse, etc.)
- **Cline**: Hooks system med TaskStart, PreToolUse, PostToolUse, UserPromptSubmit events
- **GitHub Copilot**: Webhooks finns men begränsad integration i själva chat-systemet
- **OpenAI Codex**: Minimal support, endast notification hook när agent avslutar turn

**Skillnader**: Claude Code och Cline har robusta hooks-system. GitHub Copilot och Codex saknar mogen event-automation.

---

## 5. MCP servers och externa verktyg

**Vad det är**: Model Context Protocol (MCP) - öppen standard för att ansluta AI-verktyg till externa tjänster, API:er, databaser och verktyg.

**Jämförelse**:
- **Claude Code**: Full MCP-support, `claude mcp add` kommando
- **Cline**: MCP är kärnfunktion med one-click marketplace, Cline kan autonomt skapa MCP servers
- **GitHub Copilot**: Full MCP-support i VS Code 1.102+, GitHub MCP Registry
- **OpenAI Codex**: Full MCP-support (STDIO + HTTP), delar config mellan CLI och IDE, kan köra som MCP server

**Skillnader**: Alla verktyg har utmärkt MCP-support. Cline har mest automatiserad marketplace-upplevelse.

---

## 6. Custom commands och slash commands

**Vad det är**: Kortkommandon som startar fördefinierade arbetsflöden eller prompt-mallar.

**Jämförelse**:
- **Claude Code**: `.claude/commands/` med markdown-filer, stödjer `$ARGUMENTS`
- **Cline**: Workflows i `.clinerules/workflows/` + built-in slash commands (`/ask`, `/architect`, `/code`, `/debug`)
- **GitHub Copilot**: Omfattande built-in commands (`/explain`, `/fix`, `/tests`, `/doc`) + `@mentions` syntax
- **OpenAI Codex**: Custom prompts (`/prompts:namn`) + built-in (`/model`, `/status`, `/diff`, `/review`)

**Skillnader**: GitHub Copilot har flest built-in commands. Alla verktyg stödjer custom commands väl.

---

## 7. Output style och beteendeanpassning

**Vad det är**: Kontroll över hur AI-verktyget presenterar svar, formaterar kod och kommunicerar.

**Jämförelse**:
- **Claude Code**: `~/.claude/output-styles/` med YAML frontmatter som överskriver system prompt
- **Cline**: Begränsad UI-anpassning (sidebar position, tema, font), ingen output-style system
- **GitHub Copilot**: Prompt-baserad styling via natural language, inget template-system
- **OpenAI Codex**: Reasoning controls (`model_reasoning_summary`), `--json` flag, ANSI color control

**Skillnader**: Claude Code har mest utvecklat output-style system. Codex har bra reasoning-kontroll. Cline och Copilot mer begränsade.

---

## 8. Plugin och extension system

**Vad det är**: Ekosystem för att installera och dela paket med anpassningar, verktyg och integrationer.

**Jämförelse**:
- **Claude Code**: Plugin system med `plugin.json`, kan innehålla commands, agents, skills, MCP
- **Cline**: Inget native plugin-system, använder MCP som extension mechanism + open-source bidrag
- **GitHub Copilot**: Skillsets (upp till 5 skills) + Agents (full kontroll) + Extension Registry, mest mogen ekosystem
- **OpenAI Codex**: Inget plugin-system, MCP servers fungerar som extensions

**Skillnader**: GitHub Copilot har mest omfattande extension-ekosystem. Claude Code har dedikerat plugin-system. Cline och Codex förlitar sig på MCP.

---

## 9. Settings och permissions

**Vad det är**: Konfiguration av säkerhet, verktygs-permissions, API-providers och beteende.

**Jämförelse**:
- **Claude Code**: `.claude/settings.json`, permissions-hantering via `/config` och `/permissions`
- **Cline**: Permission levels (Manual, Auto-Approve, Maximum Requests), blocked directories, cost tracking
- **GitHub Copilot**: Multi-level (personal, workspace, organization), privacy controls, MCP policies för Enterprise
- **OpenAI Codex**: Approval policies (untrusted/on-request/on-failure/never), sandbox modes (read-only/workspace-write/danger-full-access)

**Skillnader**: GitHub Copilot har mest granulära enterprise-controls. Codex har starkast säkerhetsfokus med sandbox-modes.

---

## Slutsatser

### Styrkor per verktyg

**Claude Code**
- Komplett anpassnings-suite med alla features native
- Bäst output-style customization
- Tydlig struktur för projekt-delning via git

**Cline**
- Bästa hooks-system
- Automatisk MCP marketplace
- AI-redigerbara rules

**GitHub Copilot**
- Mest mogen agent-arkitektur
- Rikaste extension-ekosystem
- Bäst enterprise-governance

**OpenAI Codex CLI**
- Starkast säkerhetsfokus (sandbox modes)
- Bäst reasoning controls
- Bra för CI/CD-integration

### Rekommendationer

- **Små team, flexibilitet**: Claude Code eller Cline
- **Enterprise, governance**: GitHub Copilot
- **Säkerhet, CI/CD**: OpenAI Codex CLI
- **Hooks/automation**: Claude Code eller Cline
- **Extension-ekosystem**: GitHub Copilot

---

## Källor

### Claude Code
- https://code.claude.com/docs
- https://github.com/anthropics/claude-code

### Cline
- https://docs.cline.bot/
- https://github.com/cline/cline
- https://docs.cline.bot/features/hooks
- https://cline.bot/blog/mcp-servers-explained-what-they-are-how-they-work-and-why-cline-is-revolutionizing-ai-tools

### GitHub Copilot
- https://docs.github.com/copilot/customizing-copilot/
- https://code.visualstudio.com/docs/copilot/customization/
- https://docs.github.com/copilot/building-copilot-extensions/
- https://github.blog/ai-and-ml/github-copilot/agent-mode-101-all-about-github-copilots-powerful-mode/

### OpenAI Codex CLI
- https://developers.openai.com/codex/
- https://developers.openai.com/codex/guides/agents-md/
- https://developers.openai.com/codex/mcp/
- https://github.com/openai/codex
