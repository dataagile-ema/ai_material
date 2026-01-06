# AI-utveckling: Tidslinje 2017-2025

En interaktiv visualisering av AI-utvecklingens historia från transformer-eran till moderna reasoning models och coding agents.

## Översikt

Denna presentation visar hur AI har utvecklats med nya förmågor, produkter, upptäckter och modeller från 2017 till 2025. Målet är att ge en känsla av vilken fart utvecklingen sker och förklara den rörelse vi befinner oss i just nu.

## Funktioner

### 📊 Visualiseringar
- **Vertikal tidslinje** med milstolpskort organiserade per år
- **Accelerationsdiagram** som visar hur antalet milstolpar ökar över tid
- **Färgkodade kategorier** för enkel överblick

### 🔍 Filtrering & Sökning
- **Kategorfilter**: Forskningsgenombrott, Modellreleaser, Produkter, Benchmarks, Verktyg, Företag
- **Företagsfilter**: Filtrera efter OpenAI, Anthropic, Google, Meta, Microsoft, etc.
- **Betydelsefilter**: Visa endast de mest kritiska milstolparna (skala 1-10)
- **Realtidssökning**: Sök i titlar, beskrivningar och nyckelord

### 💡 Interaktivitet
- **Klickbara milstolpskort** som öppnar detaljerade modaler
- **Modal navigation**: Navigera mellan milstolpar med pilar eller tangentbord
- **År-navigation**: Hoppa direkt till specifika år
- **Responsiv design**: Fungerar på desktop, tablet och mobil

### 📚 Omfattande Data
Varje milstolpe innehåller:
- Datum och titel
- Kort och detaljerad beskrivning
- Betydelse för AI-utvecklingen
- Nyckelpersoner bakom genombrotten
- Kvantitativa metrics där relevant
- Verifierade källor med länkar
- Relaterade milstolpar
- Påverkansområden
- Visuella element (ikoner, företagsloggor)

## Hur man använder

1. **Öppna `index.html`** i en modern webbläsare (Chrome, Firefox, Safari, Edge)
2. **Utforska tidslinjen** genom att scrolla eller använda år-navigationsknappar
3. **Filtrera innehåll** med kategori-, företags- och betydelsefiltren
4. **Sök** efter specifika milstolpar eller koncept
5. **Klicka på milstolpskort** för detaljerad information
6. **Navigera i modalen** med piltangenter eller knappar

### Tangentbordsgenvägar

När modal är öppen:
- `←` Föregående milstolpe
- `→` Nästa milstolpe
- `ESC` Stäng modal

## Datastruktur

Milstolpsdata finns i `data/timeline-data.json`:

```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2026-01-05",
    "timeRange": { "start": "2017-06-01", "end": "2026-01-05" }
  },
  "categories": [ /* 6 kategorier */ ],
  "companies": [ /* Frontier labs */ ],
  "milestones": [ /* 38+ milstolpar */ ],
  "accelerationMetrics": { /* Utvecklingstakt */ }
}
```

### Lägga till nya milstolpar

För att lägga till en ny milstolpe, redigera `data/timeline-data.json`:

```json
{
  "id": "unique-id",
  "title": "Milstolpens namn",
  "date": "YYYY-MM-DD",
  "dateDisplay": "DD månad YYYY",
  "category": "research|models|products|benchmarks|tools|companies",
  "company": "openai|anthropic|google|meta|microsoft|stability",
  "importance": 1-10,
  "shortDesc": "Kort sammanfattning",
  "detailedDesc": "Detaljerad beskrivning",
  "significance": "Varför detta är viktigt",
  "icon": "emoji",
  "keyPeople": ["namn"],
  "tags": ["nyckelord"],
  "metrics": [{ "label": "X", "value": "Y", "context": "Z" }],
  "sources": [{ "title": "X", "url": "Y", "type": "paper|blog|announcement" }],
  "relatedMilestones": ["ids"],
  "impactAreas": ["område"]
}
```

## Kategorier

### 🔬 Forskningsgenombrott (Cyan #00d4ff)
Papers och arkitekturer som förändrade fältet
- Attention Is All You Need (2017)
- BERT (2018)
- AlphaGo Zero, AlphaZero

### 🤖 Modellreleaser (Purple #7c3aed)
Stora språk- och multimodala modeller
- GPT-serien (1, 2, 3, 4, 4o)
- Claude-serien
- Gemini
- Llama 2
- o1, o3

### ✨ Produkter & Appar (Pink #f472b6)
Publika AI-tjänster och applikationer
- ChatGPT (2022)
- GitHub Copilot (2021)
- DALL-E 2, Stable Diffusion
- Midjourney

### 📊 Benchmark-genombrott (Green #10b981)
Betydande förbättringar på standardtester
- ARC-AGI progress
- MMLU improvements
- Coding benchmarks

### 🛠️ Verktyg & Standarder (Orange #f59e0b)
Utvecklarverktyg, agenter, protokoll
- Model Context Protocol (MCP)
- Claude Code
- Cursor Composer
- Devin
- AutoGPT

### 🏢 Företag & Labs (Pink #ec4899)
Frontier labs och viktiga företagshändelser
- Anthropic grundas
- Nya modellfamiljer lanseras

## Teknisk Implementation

### Teknologier
- **HTML5** med semantisk markup
- **CSS3** med gradient backgrounds, frosted glass effects, responsive design
- **Vanilla JavaScript** (inga ramverk)
- **Chart.js 4.4.0** för accelerationsdiagram
- **Async data loading** via Fetch API

### Design Patterns
- **DataLoader pattern** för caching av JSON-data
- **Event delegation** för effektiv händelsehantering
- **Debounced search** (300ms) för performant filtrering
- **Lazy loading** för bilder (förberett)
- **Mobile-first responsive** design med breakpoint vid 768px

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Statistik

- **38 milstolpar** från 2017-2024
- **6 kategorier** för organisering
- **6 frontier labs** representerade
- **Alla milstolpar** har verifierade källor
- **100+ källor** totalt
- **Acceleration**: 8.3x fler milstolpar 2024 vs 2017

## Acceleration i siffror

| Period | Genomsnittliga dagar mellan releaser |
|--------|--------------------------------------|
| 2017-2019 | 120 dagar |
| 2020-2021 | 90 dagar |
| 2022 | 60 dagar |
| 2023 | 35 dagar |
| 2024 | 18 dagar |

## Framtida förbättringar

- [ ] Fullständig implementering av tidskompression-animation
- [ ] Bilder för alla milstolpar (nu ~15)
- [ ] Företagsloggor i SVG-format
- [ ] Exportera tidslinje som bild/PDF
- [ ] Dela specifika milstolpar via URL
- [ ] Mörkt/ljust tema-toggle
- [ ] Fler språk (engelska)
- [ ] Animerade övergångar mellan år
- [ ] Timeline zoom-funktionalitet

## Källor & Attribution

Alla milstolpar har verifierade källor från:
- Officiella företagsbloggar och pressmeddelanden
- ArXiv research papers
- Wikipedia
- Tekniska dokumentationer
- Branschpublikationer

## Kontakt & Bidrag

Detta är ett utbildningsprojekt för att visualisera AI-utvecklingens historia.

För att bidra:
1. Kontrollera att nya milstolpar har verifierade källor
2. Följ den befintliga datastrukturen i `timeline-data.json`
3. Testa att allt fungerar i webbläsaren

## Licens

Denna presentation är skapad för utbildningsändamål. Källdata och länkar tillhör respektive upphovsrättsinnehavare.

---

**Senast uppdaterad**: 2026-01-05
**Version**: 1.0.0
**Milstolpar**: 38
**Tidsperiod**: 2017-06-12 till 2024-12-20
