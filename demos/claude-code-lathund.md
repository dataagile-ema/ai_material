# Claude Code - Snabbreferens

Kortfattad guide för att anpassa Claude Code.

## Anpassningsmetoder

| Typ | Vad den gör | Hur man skapar | Hur man använder |
|-----|-------------|----------------|------------------|
| **CLAUDE.md** | Projektinstruktioner och kontext som Claude kommer ihåg | Skapa `.claude/CLAUDE.md` (projekt)<br/>eller `~/.claude/CLAUDE.md` (användare)<br/>eller `/init` kommando | Laddas automatiskt vid start<br/>Redigera med `/memory` |
| **Subagent** | Specialist-assistent för specifika uppgifter (eget context-fönster) | `/agents` → Create New<br/>eller skapa `.md` i `.claude/agents/` | Automatiskt när uppgift matchar<br/>eller nämn explicit: "Use X subagent" |
| **Skill** | Lär Claude göra något specifikt (applied automatiskt) | Skapa mapp `.claude/skills/namn/`<br/>med `SKILL.md` (YAML frontmatter + instruktioner) | Automatiskt när request matchar description<br/>Fråga "What skills are available?" |
| **Hook** | Kör shell-kommandon vid specifika events | `/hooks` (interaktiv UI)<br/>eller redigera `.claude/settings.json` | Automatiskt vid events (PreToolUse, PostToolUse, etc.)<br/>Ingen manuell aktivering |
| **MCP Server** | Anslut externa verktyg, API:er, databaser | `claude mcp add --transport stdio/http/sse`<br/>eller `/mcp` (interactive menu) | Automatiskt - Claude upptäcker verktyg<br/>Resurser: `@server:protocol://path` |
| **Slash Command** | Återanvändbara prompt-mallar med kortkommando | Skapa `.md` fil i `.claude/commands/`<br/>Filnamn blir kommandots namn | `/kommando-namn`<br/>`/kommando-namn arg1 arg2` |
| **Output Style** | Ändra Claude's beteende (överskriver system prompt) | Skapa `.md` i `~/.claude/output-styles/`<br/>med YAML frontmatter | `/output-style` (välj från meny)<br/>`/output-style stylename` |
| **Plugin** | Paket med flera anpassningar (commands, agents, skills, MCP) | Skapa plugin-mapp med `plugin.json`<br/>+ komponenter | `/plugin install plugin-name`<br/>Komponenter blir automatiskt tillgängliga |
| **Settings** | Konfigurera beteende, permissions, verktyg | `/config` (UI)<br/>eller redigera `.claude/settings.json` | `/permissions` för permissions<br/>`/config` för alla inställningar |

## Filplaceringar

### Projekt (delas via git)
```
.claude/
├── CLAUDE.md              # Projektminne
├── agents/                # Projekt-subagenter
│   └── my-agent.md
├── skills/                # Projekt-skills
│   └── my-skill/
│       └── SKILL.md
├── commands/              # Slash commands
│   └── my-command.md
├── output-styles/         # Output styles
│   └── my-style.md
└── settings.json          # Projektinställningar
```

### Användare (personligt)
```
~/.claude/
├── CLAUDE.md              # Personligt minne
├── agents/                # Personliga subagenter
├── skills/                # Personliga skills
├── commands/              # Personliga commands
├── output-styles/         # Personliga output styles
├── plugins/               # Installerade plugins
└── settings.json          # Användarinställningar
```

### MCP-konfiguration
```
~/.claude.json             # Lokal MCP-config
.mcp.json                  # Projekt MCP-config (delas via git)
```

## CLAUDE.md Syntax

```markdown
# Projektinstruktioner

Använd denna stil för kod...

## Importera andra filer
@path/to/other-file.md

## Path-specifika regler
---
paths: ["src/components/**"]
---
Regler för components...
```

## Subagent Format

```markdown
---
name: my-specialist
description: When to use this agent (triggers automatic delegation)
tools: Read,Write,Bash
model: sonnet
---

System prompt för agenten...
```

## Skill Format

```markdown
---
name: my-skill
description: When to apply this skill (triggers automatic use)
allowed-tools: Read,Grep,Edit
model: sonnet
---

# How to do the thing

Instructions...
```

## Slash Command Format

```markdown
---
description: What this command does
argument-hint: "<issue-number>"
---

Fix issue #$ARGUMENTS according to project standards.

Review these files:
@src/relevant-file.js

Run diagnostic:
!npm test
```

## Hook Example

```json
{
  "hooks": [
    {
      "event": "PostToolUse",
      "matchers": ["Write", "Edit"],
      "command": "prettier --write {{FILE_PATH}}"
    }
  ]
}
```

## MCP Kommandon

```bash
# Installera MCP server
claude mcp add --transport stdio my-server -- node server.js

# HTTP server
claude mcp add --transport http github https://api.example.com/mcp/

# Lista MCP servers
claude mcp list

# Ta bort
claude mcp remove my-server
```

## Vanliga Slash Commands

| Kommando | Vad det gör | Exempel |
|----------|-------------|---------|
| `/init` | Skapar initial CLAUDE.md fil för projektet | `/init` |
| `/memory` | Öppnar och redigerar CLAUDE.md filer (projekt och personliga) | `/memory` |
| `/agents` | Öppnar meny för att skapa och hantera subagenter | `/agents` |
| `/skills` | Visar lista över tillgängliga skills | `/skills` |
| `/hooks` | Interaktiv UI för att konfigurera hooks (event-triggers) | `/hooks` |
| `/mcp` | MCP server-hanteringsmeny (lägg till, ta bort, lista) | `/mcp` |
| `/plugin` | Hantera plugins (installera, avinstallera, sök) | `/plugin install plugin-name` |
| `/config` | Öppnar inställningsmeny för Claude Code | `/config` |
| `/permissions` | Hantera verktygs-permissions (vilka verktyg får köras automatiskt) | `/permissions` |
| `/output-style` | Välj eller ändra output style | `/output-style minimal` |
| `/status` | Visar aktuell setup (aktiva skills, agents, MCP servers, etc.) | `/status` |
| `/help` | Visa hjälp och dokumentation | `/help` |
| `/clear` | Rensa konversationshistorik | `/clear` |
| `/tasks` | Visa pågående bakgrundsuppgifter | `/tasks` |
| `/rewind` | Gå tillbaka till en tidigare punkt i konversationen | `/rewind` |
| `/undo` | Ångra senaste åtgärd/ändringar | `/undo` |
| `/commit` | Skapa git commit (skill från official plugins) | `/commit` |
| `/review-pr` | Granska pull request (skill från official plugins) | `/review-pr 123` |

**Tips:** Kör `/help` för att se alla tillgängliga kommandon inklusive projekt-specifika slash commands.

## Prioritetsordning

När flera anpassningar finns:

### Settings
1. `.claude/settings.local.json` (högst - ej i git)
2. `.claude/settings.json` (projekt)
3. `~/.claude/settings.json` (användare)
4. Enterprise settings (lägst)

### CLAUDE.md
1. `.claude/rules/*.md` (path-specifika)
2. `./CLAUDE.local.md` (lokal)
3. `./.claude/CLAUDE.md` (projekt)
4. `./CLAUDE.md` (projekt root)
5. `~/.claude/CLAUDE.md` (användare)
6. Enterprise memory (lägst)

## Tips

- **Dela med team**: Använd `.claude/` för projekt-anpassningar
- **Håll privat**: Använd `.local` suffix eller `~/.claude/`
- **Automatisera**: Skills och Hooks körs automatiskt
- **Dokumentera**: Använd tydliga descriptions för automatic triggering
- **Testa**: `/status` visar vad som är aktivt
- **Arguments**: Slash commands stödjer `$1, $2, $ARGUMENTS`
- **Files**: `@path` inkluderar filinnehåll i prompts
- **Bash**: `!command` kör och inkluderar output

## Starta Claude Code

### Från Terminalen

```bash
# Grundläggande start
claude

# Med Chrome-integration (webbläsarautomation)
claude --chrome

# YOLO-mode (hoppar över alla säkerhetsprompts)
claude --dangerously-skip-permissions

# Kombinera flaggor
claude --chrome --dangerously-skip-permissions
```

**OBS:** `--dangerously-skip-permissions` kör alla verktyg automatiskt utan att fråga om tillåtelse. Använd med försiktighet!

## Snabbstart

```bash
# 1. Skapa projektminne
/init

# 2. Lägg till en skill
/agents   # eller skapa .claude/skills/my-skill/SKILL.md

# 3. Installera en MCP server
claude mcp add --transport stdio github -- npx github-mcp

# 4. Skapa ett slash command
# Skapa .claude/commands/review.md

# 5. Lägg till en hook
/hooks
```

## Länkar

- Dokumentation: https://code.claude.com/docs
- Plugin marketplace: `/plugin` → Search
- MCP servers: https://github.com/modelcontextprotocol/servers
