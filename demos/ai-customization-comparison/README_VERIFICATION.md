# Verifieringsdokumentation - AI-kodverktyg Anpassningsmetoder

## Översikt

Denna mapp innehåller en jämförelse av anpassningsmetoder för fyra AI-kodverktyg:
- Claude Code
- Cline
- GitHub Copilot
- OpenAI Codex CLI

**Huvudfil:** `index.html` (2367 rader, 36 modaler)

## Verifieringsdokument

### 1. VERIFICATION_REPORT.md
**Syfte:** Komplett rapport med alla modaler, claims och källor

**Innehåll:**
- 36 modaler i detalj (9 anpassningsmetoder × 4 verktyg)
- Alla tekniska claims (367 stycken)
- Alla källor (62 unika URL:er)
- Checkboxar för att markera verifierade claims

**När att använda:** Systematisk genomgång av varje modal och claim

---

### 2. VERIFICATION_CHECKLIST.md
**Syfte:** Spåra verifieringsprocessen och status

**Innehåll:**
- Checklista per källa och verktyg
- Fas-baserad verifieringsstrategi
- Prioriterade verifieringar (hög/medel/låg)
- Status-tabell för alla 36 modaler
- Anteckningssektion för upptäckta problem

**När att använda:** Projektledning och progressspårning

---

### 3. SOURCES_QUICK_REFERENCE.md
**Syfte:** Snabb översikt över alla källor

**Innehåll:**
- Källsammanställning per verktyg
- Alla 62 unika URL:er
- Kritiska claims per kategori
- Specifika numeriska claims
- Footer-källor

**När att använda:** När du behöver hitta en specifik källa snabbt

---

### 4. README_VERIFICATION.md (denna fil)
**Syfte:** Guide till verifieringsprocessen

---

## Upptäckt kritisk varning

### ⚠️ OpenAI Codex CLI - Produktens existens oklar

**Problem:** Alla källor för "OpenAI Codex CLI" pekar på `https://developers.openai.com/codex/*` som troligen inte existerar.

**Möjliga alternativ:**
1. **OpenAI CLI** - https://platform.openai.com/docs/cli
2. **GitHub Copilot CLI** - Del av GitHub Copilot
3. **Anthropic Claude CLI** - Claude Code (som redan finns med)

**Åtgärd:** Verifiera om detta är:
- En felaktig produkt som borde tas bort
- En produkt med fel namn
- En produkt som heter något annat

**Impact:** 9 modaler (25% av totalen) kan behöva skrivas om eller tas bort

---

## Verifieringsstrategi

### Fas 1: Källvalidering (Högsta prioritet)

#### Steg 1: Verifiera OpenAI Codex CLI
```
Åtgärd: Besök https://developers.openai.com/codex/
Status: [ ] Klar

Om 404:
- [ ] Sök efter "OpenAI Codex CLI"
- [ ] Sök efter "OpenAI CLI"
- [ ] Bestäm om produkt ska tas bort eller bytas ut
```

#### Steg 2: Verifiera primära källor
```
Claude Code:
- [ ] https://code.claude.com/docs

Cline:
- [ ] https://docs.cline.bot/

GitHub Copilot:
- [ ] https://docs.github.com/copilot/
- [ ] https://code.visualstudio.com/docs/copilot/
```

### Fas 2: Kritiska claims

#### Numeriska claims (lätt att verifiera)
```
- [ ] Cline: 4 event-typer (TaskStart, PreToolUse, PostToolUse, UserPromptSubmit)
- [ ] Copilot: Max 64 tecken namn, 1024 tecken description
- [ ] Copilot: Skillsets max 5 skills
- [ ] Copilot: 1,400+ connectors (M365)
- [ ] Copilot: VS Code 1.102+ för MCP
- [ ] Codex: 32 KiB AGENTS.md limit
- [ ] Codex: $1-$9 positional arguments
```

#### Feature-existens (medel svårighet)
```
- [ ] Claude: Native subagents med separata contexts
- [ ] Cline: AI-redigerbar rules
- [ ] Copilot: Agent Mode vs Coding Agent
- [ ] Copilot: @workspace, @github, @terminal
- [ ] Cline: Autonomous MCP server creation
```

#### Komplexa claims (svårare att verifiera)
```
- [ ] Claude: Output styles överskriver system prompt
- [ ] Cline: PreToolUse kan blockera actions
- [ ] Copilot: Self-correction loops
- [ ] Codex: Kan köra som MCP server
```

### Fas 3: Dokumentera resultat

```
För varje fel/avvikelse:
1. [ ] Uppdatera VERIFICATION_REPORT.md checkboxen
2. [ ] Lägg till i VERIFICATION_CHECKLIST.md "Upptäckta problem"
3. [ ] Dokumentera i corrections_log.md
4. [ ] Uppdatera index.html om nödvändigt
```

---

## Användarguide

### För initial översikt
1. Läs denna README_VERIFICATION.md
2. Öppna SOURCES_QUICK_REFERENCE.md för källöversikt
3. Skanna VERIFICATION_CHECKLIST.md för status

### För djupverifiering av en modal
1. Öppna VERIFICATION_REPORT.md
2. Sök efter modal-ID (t.ex. "modal-proj-claude")
3. Läs alla claims
4. Besök källorna
5. Markera checkboxar i rapporten
6. Dokumentera avvikelser

### För att verifiera en specifik källa
1. Öppna SOURCES_QUICK_REFERENCE.md
2. Hitta källan i listan
3. Se vilka modaler som använder den
4. Gå till VERIFICATION_REPORT.md för detaljerad information

---

## Filstruktur

```
ai-customization-comparison/
├── index.html                          (Huvudfil - 36 modaler)
├── README_VERIFICATION.md              (Denna fil - guide)
├── VERIFICATION_REPORT.md              (Komplett rapport - 367 claims)
├── VERIFICATION_CHECKLIST.md           (Status tracking)
├── SOURCES_QUICK_REFERENCE.md          (Snabbreferens - 62 källor)
└── corrections_log.md                  (Kommer skapas vid behov)
```

---

## Statistik

**Index.html:**
- Rader: 2367
- Modaler: 36 (9 kategorier × 4 verktyg)
- Anpassningsmetoder: 9
  1. Projektinstruktioner
  2. Specialiserade agenter
  3. Återanvändbara capabilities (Skills)
  4. Event automation (Hooks)
  5. Externa verktyg (MCP)
  6. Custom commands
  7. Output-anpassning
  8. Plugin-system
  9. Permissions/Settings

**Verktyg:** 4
- Claude Code
- Cline
- GitHub Copilot
- OpenAI Codex CLI (⚠️ verifiera existens)

**Claims:**
- Totalt: 367 tekniska claims
- Per modal: ~10 claims i genomsnitt

**Källor:**
- Totalt: 62 unika URL:er
- Claude Code: 3 källor
- Cline: 8 källor
- GitHub Copilot: 14 källor
- OpenAI Codex CLI: 14 källor (⚠️ alla misstänkta)

**Status-fördelning i HTML:**
- ✅ Fullt stöd: 23 modaler (64%)
- ⚠️ Partial stöd: 7 modaler (19%)
- ❌ Saknas: 1 modal (3%)
- 🔄 Annan approach: 5 modaler (14%)

---

## Nästa steg

### Omedelbart (Dag 1)
1. [ ] Verifiera OpenAI Codex CLI existens
2. [ ] Bestäm om Codex CLI ska tas bort eller ersättas
3. [ ] Verifiera primära källor för Claude, Cline, Copilot

### Kort sikt (Dag 2-3)
1. [ ] Verifiera alla numeriska claims
2. [ ] Verifiera kritiska features
3. [ ] Dokumentera avvikelser

### Lång sikt (Dag 4+)
1. [ ] Verifiera alla 367 claims
2. [ ] Korrigera index.html
3. [ ] Skapa final corrections_log.md

---

## Kontakt och support

Om du hittar fel eller har frågor:
1. Dokumentera i VERIFICATION_CHECKLIST.md under "Upptäckta problem"
2. Uppdatera status-tabellen
3. Lägg till detaljer i corrections_log.md

---

**Dokumentation skapad:** 2026-01-07
**Senast uppdaterad:** 2026-01-07
**Version:** 1.0
