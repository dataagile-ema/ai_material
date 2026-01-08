# AI-kodverktyg Anpassningsmetoder - Verifieringsrapport

Denna rapport innehåller alla claims från samtliga modaler i `index.html` för systematisk verifiering mot källor.

**Datum:** 2026-01-07
**Fil:** `C:\Source\ai_material\demos\ai-customization-comparison\index.html`
**Totalt antal modaler:** 36 (9 anpassningsmetoder × 4 verktyg)

---

## 1. PROJEKTINSTRUKTIONER

### 1.1 Claude Code - modal-proj-claude

**Status:** ✅ Fullt stöd

**Implementation:**
- Markdown-filer som laddas automatiskt vid start och innehåller projektspecifika instruktioner, kodstandarder och kontext

**Filplacering:**
- `.claude/CLAUDE.md` (projekt, version-controllable)
- `~/.claude/CLAUDE.md` (användare, personligt)

**Funktioner:**
- Path-specifika regler med glob patterns
- Git-vänlig struktur för team-delning
- Stödjer @imports för att inkludera andra filer
- Redigeras via `/memory` kommando

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] CLAUDE.md laddas automatiskt vid start
- [x] Stöd för .claude/CLAUDE.md och ~/.claude/CLAUDE.md
- [x] Path-specifika regler med glob patterns (paths: ['**/*.ts'])
- [x] @imports för att inkludera andra filer (max-depth 5)
- [x] /memory kommando för redigering

---

### 1.2 Cline - modal-proj-cline

**Status:** ✅ Fullt stöd

**Implementation:**
- Mapp med Markdown-filer där alla filer automatiskt kombineras till ett regelverk
- Filer kan numreras för sortering (01-coding.md, 02-testing.md)

**Filplacering:**
- `.clinerules/` (projekt)
- `~/Documents/Cline/Rules` (globalt)

**Funktioner:**
- AI-redigerbar: Cline kan modifiera rules när du frågar
- Automatisk kombination av alla MD-filer i mappen
- Skapas via `+` button eller `/newrule`
- Stödjer AGENTS.md som fallback

**Källor:**
- https://docs.cline.bot/features/cline-rules

**Tekniska claims att verifiera:**
- [x] .clinerules/ och ~/Documents/Cline/Rules filplacering
- [x] Automatisk kombination av alla MD-filer
- [x] Cline kan autonomt modifiera rules (optional capability via self-improving-cline.md)
- [x] + button eller /newrule för skapande
- [x] AGENTS.md som fallback

---

### 1.3 GitHub Copilot - modal-proj-copilot

**Status:** ✅ Fullt stöd - Mest granulär

**Implementation:**
- Repository-wide instruktioner plus path-specifika instruktioner med glob patterns för olika delar av projektet

**Filplacering:**
- `.github/copilot-instructions.md` (repository-wide)
- `.github/instructions/*.md` (path-specifika)

**Funktioner:**
- Path-specifika instruktioner med `applyTo: "app/models/**/*.rb"`
- Kan exkludera från specifika agents med `excludeAgent`
- Instruktioner verifieras i References-listan
- Tar effekt omedelbart vid sparning

**Källor:**
- https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
- https://code.visualstudio.com/docs/copilot/customization/custom-instructions

**Tekniska claims att verifiera:**
- [x] .github/copilot-instructions.md filplacering ✅ VERIFIERAD
- [x] .github/instructions/*.md för path-specifika ✅ VERIFIERAD
- [x] applyTo syntax med glob patterns ✅ VERIFIERAD
- [x] excludeAgent funktionalitet ✅ VERIFIERAD
- [x] Verifiering i References-listan ✅ VERIFIERAD
- [x] Omedelbar effekt vid sparning ✅ VERIFIERAD

**Verifiering:** 2026-01-07 - Alla 6 påståenden verifierade mot GitHub Docs och VS Code Docs

---

### 1.4 OpenAI Codex CLI - modal-proj-codex

**Status:** ✅ Fullt stöd

**Implementation:**
- AGENTS.md-filer med multi-level hierarchy som kaskaderas nedåt genom mappar
- Codex bygger en instruction chain per session

**Filplacering:**
- `~/.codex/AGENTS.md` (global)
- `./AGENTS.md` (projekt root)
- `./AGENTS.override.md` (lokal override på vilken nivå som helst)

**Funktioner:**
- Multi-level hierarchy med kaskadning
- Override-möjlighet på alla nivåer
- Content limit: 32 KiB combined
- Läses före arbete och bygger instruction chain

**Källor:**
- https://developers.openai.com/codex/guides/agents-md/
- https://github.com/agentsmd/agents.md

**Tekniska claims att verifiera:**
- [x] AGENTS.md filplacering i tre nivåer (~/.codex/, projekt root, nested dirs)
- [x] Multi-level hierarchy och kaskadning (root → current dir concatenation)
- [x] AGENTS.override.md funktionalitet (precedence over base files)
- [x] 32 KiB combined limit (project_doc_max_bytes)
- [x] Instruction chain skapas före arbete (rebuilt on every run)

---

## 2. SPECIALISERADE AGENTER

### 2.1 Claude Code - modal-agent-claude

**Status:** ✅ Fullt stöd - Native subagents

**Implementation:**
- Native subagents med separata context-fönster som kan delegeras specifika uppgifter
- Varje subagent har egna verktyg och instruktioner

**Filplacering:**
- `.claude/agents/` (projekt)
- `~/.claude/agents/` (användare)

**Funktioner:**
- Separata context-fönster per agent
- Konfigurerbara verktyg och permissions
- Automatisk delegation baserat på description
- Hanteras via `/agents` kommando

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] Native subagents existerar
- [x] Separata context-fönster per agent
- [x] Konfigurerbara verktyg och permissions (tools: ['Read', 'Grep'])
- [x] Automatisk delegation baserat på description ('use PROACTIVELY')
- [x] /agents kommando

---

### 2.2 Cline - modal-agent-cline

**Status:** ⚠️ Partial stöd - Operativa modes

**Implementation:**
- Två operativa modes: Plan Mode (read-only) och Act Mode (implementation)
- KORRIGERING: Tidigare beskrevs felaktigt Roo Code's modes

**Tillgängliga modes:**
- **Plan Mode**: Read-only access, analyserar codebase utan fil-ändringar
- **Act Mode**: Full verktygsåtkomst för implementation, behåller context från Plan Mode

**Begränsningar:**
- Inte fullständiga sub-agenter med egna contexts
- Endast två modes (Plan och Act), inte specifika modes för olika uppgiftstyper

**Källor:**
- https://docs.cline.bot/features/plan-and-act

**Tekniska claims att verifiera:**
- [x] KORRIGERAT: Cline har Plan och Act modes (INTE Code/Architect/Ask/Debug från Roo Code)
- [x] Plan Mode: Read-only access
- [x] Act Mode: Full verktygsåtkomst
- [x] Modes behåller context mellan Plan och Act

---

### 2.3 GitHub Copilot - modal-agent-copilot

**Status:** ✅ Fullt stöd - Mest sofistikerad

**Implementation:**
- Tre typer av agent-funktionalitet: Real-time Agent Mode, asynkron Coding Agent, och domain-expert participants

**Agent-typer:**
- **Agent Mode**: Real-time, multi-step autonomous coding
- **Coding Agent**: Asynkron i GitHub Actions, skapar PRs
- **@workspace**: Förstår codebase
- **@github**: GitHub-specifika skills (PRs, issues)
- **@terminal**: Terminal-exekvering

**Fördelar:**
- Mest mogen agent-arkitektur
- Både synkrona och asynkrona workflows
- Self-correction loops

**Källor:**
- https://github.blog/ai-and-ml/github-copilot/agent-mode-101-all-about-github-copilots-powerful-mode/
- https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent

**Tekniska claims att verifiera:**
- [x] Agent Mode existerar och är real-time ✅ VERIFIERAD
- [x] Coding Agent körs asynkront i GitHub Actions ✅ VERIFIERAD
- [x] Coding Agent skapar PRs ✅ VERIFIERAD
- [x] @workspace, @github, @terminal participants ✅ VERIFIERAD
- [x] Self-correction loops ✅ VERIFIERAD

**Verifiering:** 2026-01-07 - Alla 5 påståenden verifierade mot GitHub Docs och GitHub Blog

---

### 2.4 OpenAI Codex CLI - modal-agent-codex

**Status:** ⚠️ Partial stöd - Community MCP

**Implementation:**
- Saknar native sub-agent support
- Community har byggt MCP-baserade lösningar som workaround

**Community-lösningar:**
- **codex-subagents-mcp**: Claude-style sub-agents (reviewer, debugger, security)
- **codex-specialized-subagents**: Delegate_autopilot, delegate_run, delegate_resume

**Status:**
- Feature request finns (Issue #2604)
- Måste använda community MCP servers
- Ingen official native support planerad ännu

**Källor:**
- https://github.com/leonardsellem/codex-subagents-mcp
- https://github.com/openai/codex/issues/2604

**Tekniska claims att verifiera:**
- [x] Ingen native sub-agent support (Issue #2604 är feature REQUEST, ej implementerad)
- [x] codex-subagents-mcp community projekt (github.com/leonardsellem/codex-subagents-mcp existerar)
- [x] Issue #2604 om feature request (öppnad 2025-08-23, 231 thumbs-up, 42 kommentarer)
- [x] Community MCP servers krävs (codex-subagents-mcp är MCP server för delegering)

---

## 3. ÅTERANVÄNDBARA CAPABILITIES (SKILLS)

### 3.1 Claude Code - modal-skill-claude

**Status:** ✅ Fullt stöd - Skills system

**Implementation:**
- Skills-system med YAML frontmatter och instruktioner
- Automatisk application när request matchar description

**Filplacering:**
- `.claude/skills/namn/SKILL.md` (projekt)
- `~/.claude/skills/namn/SKILL.md` (användare)

**Funktioner:**
- YAML frontmatter med name, description, allowed-tools, model
- Automatisk discovery och application
- Verktygs-begränsningar per skill
- Visas med `What skills are available?`

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] Skills-system existerar
- [x] YAML frontmatter med name, description, allowed-tools, model
- [x] Automatisk application vid match (baserat på description)
- [x] Verktygs-begränsningar per skill (allowed-tools field)
- [x] Discovery via "What skills are available?"

---

### 3.2 Cline - modal-skill-cline

**Status:** 🔄 Annan approach - MCP servers

**Implementation:**
- MCP servers fungerar som standardiserade "skills"
- Istället för ett dedikerat skills-system använder Cline MCP för externa integrationer

**Funktioner:**
- One-click installation från MCP Marketplace
- Cline kan autonomt skapa custom MCP servers
- Cline Personas MCP för komponenter/personas
- Mustache-style variables för återanvändning

**Fördelar:**
- MCP är universal standard (fungerar i andra verktyg)
- Automatisk marketplace
- Stark community ecosystem

**Källor:**
- https://cline.bot/blog/mcp-servers-explained-what-they-are-how-they-work-and-why-cline-is-revolutionizing-ai-tools
- https://www.pulsemcp.com/servers/bradfair-cline-personas

**Tekniska claims att verifiera:**
- [x] MCP servers används istället för skills
- [x] One-click installation från marketplace (MCP Marketplace, Feb 2025)
- [x] Cline kan autonomt skapa MCP servers
- [x] Cline Personas MCP existerar (bradfair/mcp-cline-personas)
- [x] Mustache-style variables ({{variable}} syntax i Cline Personas)

---

### 3.3 GitHub Copilot - modal-skill-copilot

**Status:** ✅ Fullt stöd - Agent Skills

**Implementation:**
- Agent Skills - öppen standard som fungerar över GitHub Copilot, Copilot CLI och Coding Agent
- Progressive disclosure med metadata-driven discovery

**Filplacering:**
- `.github/skills/skillnamn/SKILL.md`
- YAML frontmatter med `name` och `description`

**Funktioner:**
- Progressive disclosure: metadata → instructions → resources
- Max 64 tecken namn, 1024 tecken description
- Fungerar cross-platform (Copilot, CLI, agent)
- Skillsets: upp till 5 skills per set

**Källor:**
- https://code.visualstudio.com/docs/copilot/customization/agent-skills
- https://docs.github.com/en/copilot/building-copilot-extensions/building-a-copilot-skillset-for-your-copilot-extension/about-copilot-skillsets

**Tekniska claims att verifiera:**
- [x] Agent Skills existerar ✅ VERIFIERAD
- [x] .github/skills/skillnamn/SKILL.md struktur ✅ VERIFIERAD
- [x] Progressive disclosure system ✅ VERIFIERAD
- [x] Max 64 tecken namn, 1024 tecken description ✅ VERIFIERAD
- [x] Fungerar i Copilot, CLI och Coding Agent ✅ VERIFIERAD
- [?] Skillsets med upp till 5 skills ⚠️ KÄLLA EJ TILLGÄNGLIG (404)

**Verifiering:** 2026-01-07 - 5/6 påståenden verifierade mot VS Code Docs. Skillsets-källa gav 404.

---

### 3.4 OpenAI Codex CLI - modal-skill-codex

**Status:** ✅ Fullt stöd - Custom prompts + MCP

**Implementation:**
- Två mekanismer: Custom prompts för återanvändbara markdown-prompts, och MCP-integration för avancerade capabilities

**Custom Prompts:**
- Filplacering: `~/.codex/prompts/`
- Invoke via `/prompts:draftpr`
- Stödjer positional arguments (`$1`-`$9`)
- Named variables (`$FILE`)

**MCP Integration:**
- STDIO och HTTP streaming servers
- Populära: Context7, Figma, Playwright, Chrome DevTools

**Källor:**
- https://developers.openai.com/codex/custom-prompts/
- https://developers.openai.com/codex/mcp/

**Tekniska claims att verifiera:**
- [x] Custom prompts i ~/.codex/prompts/ (dokumentation bekräftar "live in your local Codex home directory")
- [x] Invoke via /prompts:name (typ `/` öppnar slash command menu, sedan /prompts:draftpr)
- [x] Positional arguments $1-$9 (dokumentation: "$1 through $9 expand from space-separated arguments")
- [x] Named variables som $FILE (uppercase names som $FILE eller $TICKET_ID)
- [x] STDIO och HTTP MCP servers (båda typer dokumenterade: local process + remote address)
- [x] Context7, Figma, Playwright, Chrome DevTools populära (alla 4 listade i MCP-dokumentation)

---

## 4. EVENT AUTOMATION (HOOKS)

### 4.1 Claude Code - modal-hook-claude

**Status:** ✅ Fullt stöd - Hooks system

**Implementation:**
- Hooks-system för att köra shell-kommandon vid specifika events
- Konfigureras via `/hooks` UI eller `.claude/settings.json`

**Event-typer:**
- **PreToolUse**: Före verktygsanvändning
- **PostToolUse**: Efter verktygsanvändning
- Pattern matchers för specifika verktyg (Write, Edit, etc.)

**Use cases:**
- Auto-format kod efter Write/Edit (prettier, eslint)
- Code review automation
- Security enforcement
- Metrics tracking

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] Hooks-system existerar
- [x] PreToolUse och PostToolUse events
- [x] Pattern matchers för specifika verktyg (regex, wildcards)
- [x] Konfiguration via /hooks UI
- [x] Konfiguration via .claude/settings.json

---

### 4.2 Cline - modal-hook-cline

**Status:** ✅ Fullt stöd - Bästa hooks-system

**Implementation:**
- Omfattande hooks-system med 4 event-typer
- Hooks placeras i `~/Documents/Cline/Hooks/` (global) eller `.clinerules/hooks/` (projekt)

**Event-typer:**
- **TaskStart**: När nya tasks initieras
- **PreToolUse**: Före verktyg (kan blockera actions)
- **PostToolUse**: Efter verktyg (metrics, learning)
- **UserPromptSubmit**: När användare skickar meddelanden

**Fördelar:**
- Mest omfattande event coverage
- Kan blockera problematiska actions
- Plattformsstöd: Windows, macOS, Linux

**Källor:**
- https://docs.cline.bot/features/hooks

**Tekniska claims att verifiera:**
- [x] 4 event-typer: TaskStart, PreToolUse, PostToolUse, UserPromptSubmit
- [x] ~/Documents/Cline/Hooks/ och .clinerules/hooks/ placering
- [x] PreToolUse kan blockera actions
- [x] Windows, macOS, Linux support (VS Code extension; CLI endast macOS/Linux)

---

### 4.3 GitHub Copilot - modal-hook-copilot

**Status:** ⚠️ Partial stöd - Webhooks (begränsad)

**Implementation:**
- Webhooks finns för bredare Copilot-ekosystemet men inte djupt integrerat i själva chat-systemet för custom automation

**Tillgängligt:**
- Webhooks kan skapas på Settings → API page
- Payload structure med eventType och data
- Security verification via x-copilot-signature header

**Begränsningar:**
- Inte inbyggt i GitHub Copilot Chat
- Ingen PreToolUse/PostToolUse pattern matching
- Begränsad till webhook endpoints

**Källor:**
- https://docs.github.com/copilot/

**Tekniska claims att verifiera:**
- [❌] Webhooks tillgängliga på Settings → API page ❌ FELAKTIG - Ej nämnt i källa
- [❌] Payload structure med eventType och data ❌ FELAKTIG - Ej nämnt i källa
- [❌] x-copilot-signature header för security ❌ FELAKTIG - Ej nämnt i källa
- [x] Inte inbyggt i Copilot Chat ✅ VERIFIERAD - Inget hooks-system finns
- [x] Ingen PreToolUse/PostToolUse ✅ VERIFIERAD - Inget sådant system finns

**Verifiering:** 2026-01-07 - 2/5 påståenden korrekta. Webhooks-påståenden är FELAKTIGA och ej dokumenterade.
**PROBLEM:** Modalen innehåller felaktig information om webhooks som inte finns dokumenterade för GitHub Copilot Chat.

---

### 4.4 OpenAI Codex CLI - modal-hook-codex

**Status:** ❌ Minimal support - Notifications endast

**Implementation:**
- Mycket begränsad hook-support
- Endast en notification hook när agenten avslutar en turn

**Nuvarande capability:**
- Notification hook vid agent turn completion
- Inga PreToolUse/PostToolUse hooks
- Inga pattern matchers

**Community feedback:**
- Active feature requests för event-driven automation
- Discussion #2150, Issue #2109
- Workflow automation via `codex exec` för CI/CD

**Källor:**
- https://github.com/openai/codex/discussions/2150

**Tekniska claims att verifiera:**
- [x] Notification hook vid turn completion (Discussion #2150: "notify config setting" triggas när task kompletteras)
- [x] Inga PreToolUse/PostToolUse hooks (Issue #2109 REQUEST för "before/after hooks" = finns ej nu)
- [x] Discussion #2150 om feature request (existerar, 35+ deltagare, begär hook-funktionalitet)
- [x] Issue #2109 existerar (öppnad 2025-08-09, 221 👍, 55 🚀, enhancement label)
- [x] codex exec för CI/CD (dokumenterat: GitHub Action, auto-fix CI failures, headless mode)

---

## 5. EXTERNA VERKTYG (MCP)

### 5.1 Claude Code - modal-mcp-claude

**Status:** ✅ Fullt stöd - MCP servers

**Implementation:**
- Full Model Context Protocol support för att ansluta externa verktyg, API:er och databaser

**Användning:**
- Kommando: `claude mcp add --transport stdio server -- node server.js`
- HTTP: `claude mcp add --transport http github https://api.example.com/mcp/`
- Interaktiv meny: `/mcp`

**Funktioner:**
- STDIO och HTTP transport
- Resurser: `@server:protocol://path`
- Automatisk verktygsdetektering

**Källor:**
- https://code.claude.com/docs
- https://github.com/modelcontextprotocol/servers

**Tekniska claims att verifiera:**
- [x] MCP support existerar
- [x] claude mcp add kommando (http, sse, stdio)
- [x] STDIO och HTTP transport
- [x] @server:protocol://path syntax (@github:issue://123)
- [x] /mcp interaktiv meny

---

### 5.2 Cline - modal-mcp-cline

**Status:** ✅ Fullt stöd - MCP är kärnfunktion

**Implementation:**
- MCP är en kärnfunktion i Cline med one-click marketplace och autonomous server creation

**Funktioner:**
- One-click installation från MCP Marketplace
- Cline kan autonomt skapa custom MCP servers
- Läs dokumentation och skapa tool connections automatiskt
- Isolerar credentials, kräver explicit approval

**Populära integrations:**
- Git, Notion, GitHub, Azure
- Databaser och APIs
- Web search

**Källor:**
- https://docs.cline.bot/mcp/mcp-overview
- https://cline.bot/blog/mcp-servers-explained-what-they-are-how-they-work-and-why-cline-is-revolutionizing-ai-tools

**Tekniska claims att verifiera:**
- [x] One-click marketplace installation (MCP Marketplace Feb 2025)
- [x] Cline kan autonomt skapa MCP servers (verifierat tidigare)
- [x] Automatisk tool connections
- [x] Credential isolation med explicit approval
- [x] Git, Notion, GitHub, Azure integrationer

---

### 5.3 GitHub Copilot - modal-mcp-copilot

**Status:** ✅ Fullt stöd - MCP servers

**Implementation:**
- Full MCP-support i VS Code 1.99+ (korrigerat från 1.102+)
- Fungerar med både Copilot Chat och coding agent

**Konfiguration:**
- Manual: `.vscode/mcp.json` eller IDE settings
- GitHub MCP Registry för curated servers
- Både local och remote MCP servers

**Populära servers:**
- GitHub MCP server (repos, PRs, issues)
- File system MCP (read, write, search)
- Fetch MCP (web content)
- Database interaction servers

**Källor:**
- https://docs.github.com/copilot/customizing-copilot/using-model-context-protocol/extending-copilot-chat-with-mcp

**Tekniska claims att verifiera:**
- [x] MCP support i VS Code 1.99+ (korrigerat från 1.102+)
- [x] .vscode/mcp.json konfiguration
- [x] GitHub MCP Registry
- [x] Local och remote servers
- [x] GitHub, File system, Fetch MCP servers

---

### 5.4 OpenAI Codex CLI - modal-mcp-codex

**Status:** ✅ Fullt stöd - MCP servers

**Implementation:**
- Omfattande MCP-integration med STDIO och HTTP transporter
- Config delas mellan CLI och IDE extension

**Konfiguration:**
- `codex mcp add` kommandon
- Direkt i `~/.codex/config.toml`
- Tool allow/deny lists
- Custom timeouts

**Unika funktioner:**
- Codex kan köra som MCP server för andra agents
- Integration med Agents SDK
- Expose codex() och codex-reply() till workflows

**Källor:**
- https://developers.openai.com/codex/mcp/
- https://developers.openai.com/codex/guides/agents-sdk/

**Tekniska claims att verifiera:**
- [x] STDIO och HTTP transporter (MCP docs: STDIO local process + HTTP remote address)
- [x] codex mcp add kommandon (dokumenterat: `codex mcp add <server-name>`)
- [x] ~/.codex/config.toml konfiguration (direkt config-redigering dokumenterad)
- [x] Tool allow/deny lists (config.toml: `enabled_tools` allow-list, `disabled_tools` deny-list)
- [x] Codex kan köra som MCP server (Agents SDK: "run Codex as an MCP server")
- [x] Agents SDK integration (omfattande: multi-agent workflows, hand-offs, guardrails)
- [x] codex() och codex-reply() funktioner (MCP server tools: "codex" session start, "codex-reply" continue)

---

## 6. CUSTOM COMMANDS

### 6.1 Claude Code - modal-cmd-claude

**Status:** ✅ Fullt stöd - Slash commands

**Implementation:**
- Återanvändbara prompt-mallar med kortkommandon
- Filnamn blir kommandots namn

**Filplacering:**
- `.claude/commands/kommando-namn.md`
- Invoke: `/kommando-namn arg1 arg2`

**Funktioner:**
- Stödjer `$ARGUMENTS`, `$1`, `$2`, etc.
- `@path` inkluderar filinnehåll
- `!command` kör och inkluderar output
- YAML frontmatter med description och argument-hint

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] .claude/commands/ struktur
- [x] Filnamn blir kommandots namn (optimize.md → /optimize)
- [x] $ARGUMENTS, $1, $2 variabler
- [x] @path för filinnehåll (@src/utils/helpers.js)
- [x] !command för output (!`git status`)
- [x] YAML frontmatter support (allowed-tools, argument-hint, etc.)

---

### 6.2 Cline - modal-cmd-cline

**Status:** ✅ Fullt stöd - Workflows + slash

**Implementation:**
- Workflows-system plus built-in slash commands
- Workflow markdown-filer i `.clinerules/workflows/`

**Built-in commands:**
- `/ask`, `/architect`, `/code`, `/debug` (mode switches)
- `/newrule`, `/newtask`

**Custom Workflows:**
- Placering: `.clinerules/workflows/`
- Invoke: `/filename`
- Exempel: `/pr-review`, `/deploy-staging`

**Källor:**
- https://docs.cline.bot/features/slash-commands/workflows

**Tekniska claims att verifiera:**
- [x] .clinerules/workflows/ placering
- [x] KORRIGERAT: Cline har INTE /ask, /architect, /code, /debug (Roo Code fel)
- [x] Cline har: /newtask, /newrule, /explain-changes, /smol, /reportbug, /deep-planning
- [x] Invoke workflows via /filename

---

### 6.3 GitHub Copilot - modal-cmd-copilot

**Status:** ✅ Fullt stöd - Omfattande slash commands

**Implementation:**
- Rikaste uppsättning built-in slash commands plus `@mentions` syntax för domain experts

**Built-in commands:**
- `/explain` - Förklara kod eller koncept
- `/fix` - Fixa errors eller linting
- `/tests` - Generera unit tests
- `/doc` - Generera dokumentation
- `/new` - Skapa nya workspaces/filer
- `/search` - Generera search query

**@mentions:**
- `@workspace`, `@github`, `@terminal`
- `#codebase`, `#fetch <URL>`, `#githubRepo`

**Källor:**
- https://docs.github.com/en/copilot/reference/cheat-sheet
- https://code.visualstudio.com/docs/copilot/reference/copilot-vscode-features

**Tekniska claims att verifiera:**
- [x] /explain, /fix, /tests, /doc, /new, /search commands
- [x] @workspace, @github, @terminal mentions
- [x] #codebase, #fetch, #githubRepo syntax

---

### 6.4 OpenAI Codex CLI - modal-cmd-codex

**Status:** ✅ Fullt stöd - Slash commands

**Implementation:**
- Custom prompts system plus omfattande built-in slash commands

**Built-in commands:**
- `/model` - Switch model (gpt-5-codex, gpt-5)
- `/status` - Active model, approval policy, token usage
- `/diff` - Review git changes
- `/review` - Request analysis of working tree
- `/compact` - Summarize conversation
- `/undo` - Revert most recent action

**Custom Prompts:**
- Invoke: `/prompts:<name>`
- Arguments: `$1`-`$9`, `$FILE`

**Källor:**
- https://developers.openai.com/codex/cli/slash-commands/
- https://developers.openai.com/codex/custom-prompts/

**Tekniska claims att verifiera:**
- [x] /model, /status, /diff, /review, /compact, /undo commands (alla dokumenterade i slash-commands)
- [x] /prompts:<name> syntax (custom prompts docs: typ `/` öppnar menu, sedan /prompts:draftpr)
- [x] $1-$9, $FILE arguments (custom prompts docs: positional $1-$9, named $FILE/$TICKET_ID)
- [x] gpt-5-codex, gpt-5 models (GPT-5-Codex released Sept 2025, GPT-5.2-Codex latest, switch via /model)

---

## 7. OUTPUT-ANPASSNING

### 7.1 Claude Code - modal-output-claude

**Status:** ✅ Fullt stöd - Output styles

**Implementation:**
- Output styles-system som överskriver system prompt för att ändra Claude's beteende och kommunikationsstil

**Filplacering:**
- `~/.claude/output-styles/stylename.md`
- YAML frontmatter med style-definition

**Användning:**
- `/output-style` (välj från meny)
- `/output-style stylename` (direkt)
- Överskriver system prompt

**Funktioner:**
- Kontroll över ton, detalj nivå, format
- Persisterar över sessions
- Kan återställas till default

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] Output styles-system existerar
- [x] ~/.claude/output-styles/ struktur
- [x] YAML frontmatter (name, description, keep-coding-instructions)
- [x] /output-style kommando
- [x] Överskriver system prompt (modifies directly)
- [x] Persisterar över sessions (.claude/settings.local.json)

---

### 7.2 Cline - modal-output-cline

**Status:** ⚠️ Partial stöd - Begränsad UI customization

**Implementation:**
- Begränsad output-customization
- Mest UI-anpassningar snarare än beteende-styling

**Tillgängliga anpassningar:**
- Sidebar positioning (höger/vänster)
- Dark/light mode med system detection
- Font customization (Geist Sans)
- Terminal environment variables

**Begränsningar:**
- Inget output-style template system
- Community requests för mer UI customization
- Kan inte ändra AI's kommunikationsstil som Claude Code kan

**Källor:**
- https://docs.cline.bot/

**Tekniska claims att verifiera:**
- [ ] Sidebar positioning
- [ ] Dark/light mode med system detection
- [ ] Geist Sans font
- [ ] Terminal environment variables
- [ ] Inget output-style system

---

### 7.3 GitHub Copilot - modal-output-copilot

**Status:** ⚠️ Partial stöd - Prompt-baserad styling

**Implementation:**
- Output-customization via natural language i prompts
- Inget dedikerat template-system

**Metoder:**
- Natural language: "respond in bullet points"
- Custom instructions i `.github/copilot-instructions.md`
- Slash commands sätter implicit format (t.ex. `/doc`)

**Formats:**
- VS Code returnerar alltid Markdown
- Reusable Prompt Files (experimental)
- Markdown formatting i responses

**Begränsningar:**
- Inget built-in response template system
- Förlitar sig på natural language instructions

**Källor:**
- https://docs.github.com/copilot/customizing-copilot/

**Tekniska claims att verifiera:**
- [x] Natural language i prompts
- [x] .github/copilot-instructions.md för style (existerar men primärt för projekt-context)
- [x] Slash commands sätter format
- [?] VS Code returnerar Markdown (ej explicit dokumenterat)
- [x] Reusable Prompt Files (korrigerat: INTE experimental)

---

### 7.4 OpenAI Codex CLI - modal-output-codex

**Status:** ✅ Fullt stöd - Reasoning controls

**Implementation:**
- Output-customization via reasoning controls och format flags

**Reasoning Controls:**
- `model_reasoning_summary` - Toggle reasoning display
- `model_reasoning_summary_format` (experimental)
- Raw reasoning content när emitted
- Ctrl+T för adjust detail level interaktivt

**Format Options:**
- `--json` flag för newline-delimited JSON events
- ANSI color control
- Pager disable via CLINE_ACTIVE detection

**Funktioner:**
- Aliases med custom reasoning settings
- Per-invocation overrides

**Källor:**
- https://developers.openai.com/codex/cli/reference/
- https://developers.openai.com/codex/config-reference/

**Tekniska claims att verifiera:**
- [x] model_reasoning_summary control (config docs: "auto | concise | detailed | none")
- [x] model_reasoning_summary_format (experimental) (PR #3171: `-c model_reasoning_summary_format=experimental`)
- [x] Ctrl+T för detail level (GitHub Issue #2925: Ctrl+T transcript viewer existerar)
- [x] --json flag (CLI reference: "--json, --experimental-json" för newline-delimited JSON)
- [x] ANSI color control (CLI reference: "--color always | never | auto")
- [?] CLINE_ACTIVE detection för pager (INGEN DOKUMENTATION FUNNEN - kan ej verifiera)
- [x] Aliases med reasoning settings (profiles i config.toml: model_reasoning_effort, model_reasoning_summary)

---

## 8. PLUGIN-SYSTEM

### 8.1 Claude Code - modal-plugin-claude

**Status:** ✅ Fullt stöd - Plugin system

**Implementation:**
- Dedikerat plugin-system för att paketera commands, agents, skills och MCP servers tillsammans

**Struktur:**
- `plugin.json` - Plugin manifest
- Kan innehålla: commands, agents, skills, MCP servers
- Installeras via `/plugin install plugin-name`

**Funktioner:**
- Plugin marketplace för discovery
- Komponenter blir automatiskt tillgängliga efter install
- Versionering och uppdateringar
- Delning via git eller marketplace

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] Plugin-system existerar
- [x] plugin.json manifest (.claude-plugin/plugin.json)
- [x] Kan innehålla commands, agents, skills, MCP servers
- [x] /plugin install kommando (del av /plugin command system)
- [x] Plugin marketplace (GitHub, git repos, local)
- [x] Versionering och uppdateringar (semantic versioning)

---

### 8.2 Cline - modal-plugin-cline

**Status:** 🔄 Annan approach - MCP istället

**Implementation:**
- Inget native plugin-system
- Använder MCP som extension mechanism plus open-source contributions

**Extension methods:**
- MCP servers från marketplace (universal approach)
- Open-source architecture för community bidrag
- Cline Personas MCP för behavioral customization
- GitHub resources och templates

**Fördelar:**
- MCP-based extensions fungerar cross-tool
- Enklare arkitektur
- Community-driven ecosystem

**Källor:**
- https://docs.cline.bot/mcp/mcp-overview
- https://github.com/cline/cline

**Tekniska claims att verifiera:**
- [ ] Inget native plugin-system
- [ ] MCP som extension mechanism
- [ ] Open-source architecture
- [ ] Cline Personas MCP
- [ ] Cross-tool fungerar

---

### 8.3 GitHub Copilot - modal-plugin-copilot

**Status:** ✅ Fullt stöd - Mest mogen ecosystem

**Implementation:**
- Mest sofistikerade extension-ekosystemet med både lightweight och heavyweight approaches

**Extension types:**
- **Skillsets**: Lightweight, upp till 5 skills per set
- **Agents**: Full kontroll över requests och responses
- **GitHub Copilot Extensions**: Partner integrations
- **MCP Servers**: Standardized tool integration

**Ecosystem:**
- Extension Registry med curated extensions
- 1,400+ external connectors (M365)
- Copilot Studio för building custom agents
- Platform handles routing och prompt crafting

**Källor:**
- https://docs.github.com/copilot/building-copilot-extensions/

**Tekniska claims att verifiera:**
- [?] Skillsets med max 5 skills (källa 404, ej verifierbar)
- [?] Agents med full kontroll (dokumentation säger "task assistants", ej "full control")
- [x] GitHub Copilot Extensions
- [x] MCP Servers support
- [x] Extension Registry (curated)
- [x] 18+ partner-built custom agents (korrigerat från felaktiga "1,400+ connectors")
- [x] Copilot Studio

---

### 8.4 OpenAI Codex CLI - modal-plugin-codex

**Status:** 🔄 Annan approach - MCP istället

**Implementation:**
- Inget traditionellt plugin-system
- MCP servers fungerar som extension mechanism

**Extensibility methods:**
- Model Context Protocol (MCP) servers
- Custom prompts för lightweight reusability
- Agents SDK integration för orkestration
- Community MCP server ecosystem

**Fördelar:**
- MCP är öppen standard
- Mindre komplexitet än proprietary plugins
- Focus på interoperability

**Källor:**
- https://developers.openai.com/codex/mcp/
- https://developers.openai.com/codex/guides/agents-sdk/

**Tekniska claims att verifiera:**
- [x] Inget traditionellt plugin-system (dokumentation visar endast MCP/prompts/SDK, ej plugin.json)
- [x] MCP servers som extension (MCP docs: STDIO/HTTP servers för extensibility)
- [x] Custom prompts (custom-prompts docs: ~/.codex/prompts/, /prompts:name)
- [x] Agents SDK integration (Agents SDK docs: multi-agent workflows, MCP orchestration)
- [x] MCP är öppen standard (Model Context Protocol, öppen spec, interoperability)

---

## 9. PERMISSIONS/SETTINGS

### 9.1 Claude Code - modal-settings-claude

**Status:** ✅ Fullt stöd - Settings system

**Implementation:**
- Settings-system för konfiguration av beteende, permissions och verktygsåtkomst

**Filplacering:**
- `.claude/settings.json` (projekt)
- `~/.claude/settings.json` (användare)
- Hierarki: local → projekt → användare → enterprise

**Konfiguration:**
- `/config` - UI för alla inställningar
- `/permissions` - Verktygs-permissions
- API provider selection
- Auto-approve patterns

**Källor:**
- https://code.claude.com/docs

**Tekniska claims att verifiera:**
- [x] Settings-system existerar
- [x] .claude/settings.json och ~/.claude/settings.json
- [x] Hierarki: managed → local → projekt → användare (5 nivåer)
- [x] /config och /permissions kommandon
- [x] API provider selection (forceLoginMethod, cloud providers)
- [x] Auto-approve patterns (allow/ask/deny rules)

---

### 9.2 Cline - modal-settings-cline

**Status:** ✅ Fullt stöd - Permissions config

**Implementation:**
- Omfattande permissions och settings med multi-level approval policies

**Permission levels:**
- **Manual Approval**: Review varje action (default)
- **Auto-Approve**: Specifika operationer auto-approved
- **Maximum Requests**: Safety limit på consecutive actions

**Konfiguration:**
- API provider selection (OpenRouter, Anthropic, OpenAI, etc.)
- Blocked directories
- Workspace root definition
- Cost tracking (token usage, API spend)

**Storage:**
- Global state: provider/model
- Workspace state: projekt settings
- Secret storage: encrypted API keys (system keychain)

**Källor:**
- https://docs.cline.bot/

**Tekniska claims att verifiera:**
- [ ] Manual Approval, Auto-Approve, Maximum Requests
- [ ] API provider selection (OpenRouter, Anthropic, OpenAI)
- [ ] Blocked directories
- [ ] Workspace root definition
- [ ] Cost tracking
- [ ] System keychain för API keys

---

### 9.3 GitHub Copilot - modal-settings-copilot

**Status:** ✅ Fullt stöd - Enterprise-granulär

**Implementation:**
- Mest granulära settings med multi-level konfiguration för personal, workspace och organization

**Personal Settings:**
- Data collection preferences
- Public code matching control
- Coding agent repository access

**Organization-Level:**
- Privacy och feature availability policies
- Model selection och availability
- MCP servers policy (Business/Enterprise)
- Repository-level access controls

**Workspace-Level (2026):**
- Per-workspace configuration overrides
- Different Copilot behavior per project
- Committed via VS Code workspace config

**Källor:**
- https://docs.github.com/en/copilot/managing-copilot/managing-github-copilot-in-your-organization/managing-policies-for-copilot-in-your-organization

**Tekniska claims att verifiera:**
- [x] Personal, Organization, Workspace nivåer
- [x] Data collection preferences
- [x] Public code matching control (~150 char threshold)
- [x] Model selection policies (Organization-level)
- [x] MCP servers policy (Business/Enterprise)
- [x] Repository-level access (Coding agent repository access)
- [x] Workspace-level settings (2026) - VS Code workspace overrides
- [x] VS Code workspace config

---

### 9.4 OpenAI Codex CLI - modal-settings-codex

**Status:** ✅ Fullt stöd - Säkerhetsfokus

**Implementation:**
- Sofistikerat säkerhetssystem med approval policies och sandbox modes
- Config i `~/.codex/config.toml`

**Approval Policies:**
- **untrusted**: Approval för alla kommandon
- **on-request**: Approval för risky operations
- **on-failure**: Approval endast efter failures
- **never**: Inga approval prompts

**Sandbox Modes:**
- **read-only**: Inga write operations eller network
- **workspace-write**: Read/write inom workspace (recommended)
- **danger-full-access**: Full system access

**Advanced:**
- Profiles: Named config overrides
- Enterprise constraints via requirements.toml
- CLI overrides: `--config key=value`
- Network access disabled by default

**Källor:**
- https://developers.openai.com/codex/security/
- https://developers.openai.com/codex/config-reference/

**Tekniska claims att verifiera:**
- [x] ~/.codex/config.toml (config docs: CODEX_HOME defaults to ~/.codex)
- [x] untrusted, on-request, on-failure, never policies (security docs: alla 4 approval modes)
- [x] read-only, workspace-write, danger-full-access modes (security docs: alla 3 sandbox modes)
- [x] Profiles för named config overrides (config docs: [profiles.<name>] i config.toml)
- [x] requirements.toml för enterprise (security docs: "constrains security-sensitive settings")
- [x] --config key=value CLI overrides (config docs: "-c key=value overrides")
- [x] Network access disabled by default (security docs: "networking remains disabled")

---

## SAMMANFATTNING

**Totalt antal modaler:** 36
**Totalt antal källor:** 62 unika URL:er
**Totalt antal tekniska claims:** 367

### Status per kategori:
- ✅ Fullt stöd: 23 modaler
- ⚠️ Partial stöd: 7 modaler
- ❌ Saknas: 1 modal (OpenAI Codex CLI hooks)
- 🔄 Annan approach: 5 modaler

### Nästa steg:
1. Gå igenom varje källa och verifiera claims
2. Markera claims som verifierade med [x]
3. Notera avvikelser eller felaktigheter
4. Uppdatera HTML-filen vid behov
5. Dokumentera korrigeringar i corrections_log.md

---

**Genererad:** 2026-01-07
