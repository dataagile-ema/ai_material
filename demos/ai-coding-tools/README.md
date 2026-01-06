# AI Kodningsverktyg - Komplett Jämförelsesystem

En interaktiv visualisering som jämför AI-kodningsverktyg (kommersiella och open source), deras funktioner, säkerhetsstandarder, deployment-alternativ och hur features konvergerat över tid.

## 🎯 Syfte

Detta projekt ger en strukturerad översikt över AI-kodningsverktyg för att:
- **Jämföra features**: Code completion, agentic coding, MCP-stöd, multi-file editing
- **Utvärdera standards**: ISO 27001, SOC2, GDPR, HIPAA
- **Förstå deployment**: SaaS, Azure, AWS, GCP, lokal, on-premises
- **Spåra konvergens**: Hur verktyg adopterat liknande funktioner över tid

## 📁 Projektstruktur

```
ai-coding-tools/
├── data/
│   └── coding-tools-data.json    # Strukturerad data om alla verktyg
├── ai-coding-tools.html           # Interaktiv visualisering
└── README.md                      # Denna fil
```

## 🚀 Komma igång

### Visa visualiseringen

1. **Lokal webbserver (rekommenderat)**:
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js
   npx serve

   # PHP
   php -S localhost:8000
   ```

2. **Öppna i webbläsare**:
   ```
   http://localhost:8000/ai-coding-tools.html
   ```

3. **Viktigt**: Använd en webbserver, inte `file://` protokollet, annars kan JSON-data inte laddas p.g.a. CORS.

## 📊 Funktioner

### Interaktiv jämförelsetabell
- Filtrera efter kategori (alla, kommersiella, open source)
- Jämför code completion, agentic coding, MCP-stöd, multi-file editing
- Klicka på verktyg för detaljerad information i modal

### Konvergens-tidslinje
- Visualiserar hur features spridit sig mellan verktyg
- Visar adoption-datum för nyckelfunktioner
- Identifierar trender: open source först, kommersiellt följer

### Deployment-matrix
- Stacked bar chart som visar deployment-flexibilitet
- Jämför SaaS, cloud-providers, local, on-premises

### Verktygsdetaljer
- Modals med komplett information om varje verktyg
- Features med adoption-datum
- Källor med länkar till dokumentation

## 📝 Data-schema

### `coding-tools-data.json` struktur

```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2026-01-05",
    "description": "...",
    "language": "sv"
  },

  "categories": {
    "commercial": { },
    "opensource": { },
    "ide": { }
  },

  "features": [
    {
      "id": "feature_id",
      "label": "Feature Name",
      "description": "...",
      "adoptionYear": 2023
    }
  ],

  "tools": [
    {
      "id": "tool_id",
      "name": "Tool Name",
      "category": "commercial|opensource",
      "vendor": "Company Name",
      "launched": "2023-01-15",
      "features": {
        "feature_id": {
          "supported": true,
          "since": "2023-03",
          "notes": "Extra info"
        }
      },
      "standards": { "iso_27001": true, ... },
      "deployment": { "saas": true, ... },
      "pricing": { },
      "sources": [
        {
          "title": "Source name",
          "url": "https://...",
          "type": "docs|announcement|security"
        }
      ]
    }
  ],

  "convergenceTimeline": [
    {
      "year": 2024,
      "quarter": "Q2",
      "event": "Event Name",
      "description": "What happened",
      "adopters": ["tool1", "tool2"],
      "features": ["feature1"],
      "significance": "high|medium|low"
    }
  ]
}
```

## ➕ Lägga till fler verktyg

### Steg 1: Researcha verktyget

Samla information om:
1. **Grundfakta**: Namn, vendor, lansering, website
2. **Features**: Vilka features stöds och sedan när?
3. **Standards**: Compliance-certifieringar (ISO, SOC2, GDPR)
4. **Deployment**: Var kan verktyget köras?
5. **Pricing**: Gratis tier? Subscription-priser?
6. **Källor**: URLs till officiell dokumentation

### Steg 2: Uppdatera JSON-filen

Lägg till ett nytt objekt i `tools`-arrayen i `data/coding-tools-data.json`:

```json
{
  "id": "new_tool",
  "name": "New Tool",
  "category": "commercial",
  "vendor": "Company Name",
  "launched": "2024-01-15",
  "website": "https://example.com",
  "description": "Brief description",

  "features": {
    "code_completion": {
      "supported": true,
      "since": "2024-01"
    },
    "agentic_coding": {
      "supported": false
    }
    // ... fortsätt för alla features
  },

  "standards": {
    "iso_27001": true,
    "soc2": true,
    "gdpr": true
  },

  "deployment": {
    "saas": true,
    "local": false
    // ... för alla deployment options
  },

  "pricing": {
    "free_tier": true,
    "individual": {
      "price": 15,
      "currency": "USD",
      "period": "month"
    }
  },

  "sources": [
    {
      "title": "Official Documentation",
      "url": "https://docs.example.com",
      "type": "docs"
    }
  ]
}
```

### Steg 3: Uppdatera convergenceTimeline

Om verktyget introducerat nya features först eller adopterat viktiga features, lägg till i timeline:

```json
{
  "year": 2024,
  "quarter": "Q2",
  "event": "New Feature Adoption",
  "description": "Tool X adopts feature Y",
  "adopters": ["new_tool"],
  "features": ["feature_y"],
  "significance": "medium"
}
```

### Steg 4: Verifiera

1. Kontrollera att JSON-filen är giltig (använd JSON validator)
2. Ladda om `ai-coding-tools.html` i webbläsaren
3. Verifiera att verktyget visas i tabellen
4. Klicka på verktygets "Info"-knapp för att kontrollera modal

## 🔍 Verktyg som finns idag

### Kommersiella (3)
- **GitHub Copilot** (Microsoft, 2021) - Code completion & chat
- **Cursor** (Anysphere, 2023) - AI-first editor med Composer
- **Claude Code** (Anthropic, 2024) - Terminal-baserad agent med MCP

### Open Source (2)
- **Aider** (2023) - CLI-baserad agentic coding, git-integration
- **Continue** (2023) - VSCode/JetBrains extension, code completion & chat

## 📚 Källor & Attribution

Alla påståenden i `coding-tools-data.json` måste ha källattribution. Källor inkluderar:

- **Officiell dokumentation**: Primär källa för features
- **Pricing pages**: För prenumerationspriser
- **Trust centers**: För compliance och säkerhet (t.ex. trust.github.com)
- **GitHub repos**: För open source-verktyg (README, releases)
- **Announcements**: Bloggposter för launch-datum

### Källformat

```json
"sources": [
  {
    "title": "Descriptive title",
    "url": "https://full.url.com",
    "type": "docs|announcement|security|code|pricing"
  }
]
```

## 🎨 Visualiseringsstil

Projektet följer samma designspråk som de andra AI-projekten:
- **Färger**: Cyan (#00d4ff), Purple (#7c3aed), Green (#10b981), Pink (#f472b6), Orange (#f59e0b)
- **Tema**: Dark gradient background (#0f0f1a → #1a1a2e → #16213e)
- **Charts**: Chart.js med responsiv design
- **UI**: Frosted glass cards, hover-effekter

## 🔧 Teknisk implementation

### Frontend
- **HTML5** med semantisk markup
- **CSS3** med gradient backgrounds, flexbox, grid
- **JavaScript** (vanilla, ingen framework) med DataLoader-pattern
- **Chart.js** för interaktiva visualiseringar

### Data-hantering
- **JSON** för strukturerad data
- **Fetch API** för data-laddning
- **Client-side rendering** för flexibilitet

## 📈 Nyckelinsikter

### Open Source vs Kommersiellt

| Aspekt | Open Source | Kommersiellt |
|--------|-------------|--------------|
| **Innovation** | Först med nya features (t.ex. Aider → agentic coding 2023) | Följer 6-12 månader senare |
| **Deployment** | Full flexibilitet (lokal, cloud, on-prem) | Oftast SaaS, ibland enterprise |
| **Standards** | Inga compliance-certifieringar | ISO 27001, SOC2, GDPR |
| **Pris** | Gratis (API-kostnader) | $10-40/månad |
| **Anpassning** | Fullt konfigurerbar | Begränsad anpassning |

### Konvergensmönster

1. **Config-filer (.md)**: Cursor (.cursorrules) → Claude Code (.claude.md) → Becoming standard
2. **Agentic coding**: Aider (maj 2023) → Cursor Composer (aug 2024) → Claude Code (dec 2024)
3. **Multi-file editing**: Open source först → GitHub Copilot Workspace (okt 2024)
4. **MCP Protocol**: Anthropic's bet på standardisering (nov 2024)

## 🚧 Framtida utökningar

Verktyg att lägga till:
- **Kommersiella**: Tabnine, Codeium, Amazon CodeWhisperer, Replit AI
- **Open Source**: GPT Engineer, Mentat, AutoGPT, MetaGPT, SWE-agent

Features att spåra:
- Voice input (Cursor med voice mode)
- Visual debugging
- Automated PR reviews
- Security vulnerability scanning

## 📝 Licens & Attribution

Data är sammanställd från offentliga källor med källattribution. All kod i detta projekt är skapad för demonstrations- och utbildningssyfte.

## 📧 Uppdateringar

Detta projekt uppdaterades senast: **2026-01-05**

För att hålla data aktuell:
1. Kontrollera verktygs officiella websites kvartalsvis
2. Uppdatera pricing om det ändrats
3. Lägg till nya features när de lanseras
4. Uppdatera `metadata.lastUpdated` i JSON-filen

---

**Genererad med Claude Code** - Ett exempel på hur AI-kodningsverktyg kan dokumenteras och jämföras systematiskt.
