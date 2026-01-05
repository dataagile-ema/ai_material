# AI Coding Benchmarks - Data Documentation

Detta dokument beskriver strukturen för `benchmark-data.json` och hur du uppdaterar data.

## JSON-struktur

### Översikt

Filen `benchmark-data.json` innehåller all benchmark-data för AI-kodningsmodeller. Strukturen består av:

- **metadata**: Versionsinformation och uppdateringsdatum
- **benchmarks**: Benchmark-definitioner och bästa poäng (SOTA)
- **companies**: Företagsinformation
- **models**: Alla modeller med deras benchmark-scores och källreferenser

## Struktur i detalj

### Metadata

```json
{
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2026-01-05",
    "description": "AI coding model benchmark data with source attribution"
  }
}
```

- **version**: Semantic versioning (ändra vid stora förändringar i schemat)
- **lastUpdated**: Datum för senaste uppdateringen (YYYY-MM-DD)
- **description**: Kort beskrivning av datasetet

### Benchmarks

```json
{
  "benchmarks": {
    "definitions": [
      {
        "id": "humaneval",
        "label": "HumanEval",
        "color": "#00d4ff",
        "unit": "percentage",
        "sourceUrl": "https://github.com/openai/human-eval"
      }
    ],
    "bestScores": {
      "humaneval": {
        "value": 96.3,
        "modelId": "o1preview",
        "modelName": "o1-preview"
      }
    }
  }
}
```

- **definitions**: Lista över alla benchmarks med metadata
  - `id`: Unik identifierare (används i kod)
  - `label`: Visningsnamn
  - `color`: Hex-färgkod för visualisering
  - `unit`: Enhet (percentage eller minutes)
  - `sourceUrl`: Länk till benchmark-dokumentation

- **bestScores**: Bästa poäng (SOTA) för varje benchmark
  - `value`: Högsta poäng
  - `modelId`: ID för modell med högsta poäng
  - `modelName`: Visningsnamn för modell

### Companies

```json
{
  "companies": [
    {
      "id": "openai",
      "name": "OpenAI",
      "category": "proprietary"
    }
  ]
}
```

- **id**: Unik identifierare
- **name**: Företagsnamn (visas i dropdown)
- **category**: "proprietary" eller "open_source"

### Models

```json
{
  "models": [
    {
      "id": "gpt4",
      "name": "GPT-4",
      "displayName": "GPT-4 (Mars 2023)",
      "date": "Mars 2023",
      "releaseDate": "2023-03-14",
      "companyId": "openai",
      "company": "OpenAI",
      "scores": {
        "humaneval": {
          "value": 67,
          "source": "https://arxiv.org/abs/2303.08774"
        },
        "swebench_verified": null
      }
    }
  ]
}
```

- **id**: Unik identifierare (används som option value i dropdown)
- **name**: Kort modellnamn
- **displayName**: Visningsnamn med datum (visas i dropdown)
- **date**: Lanseringsdatum i svenskt format (för visning)
- **releaseDate**: ISO-datum (YYYY-MM-DD) för sortering
- **companyId**: Referens till företag i companies-listan
- **company**: Företagsnamn (för bakåtkompatibilitet)
- **scores**: Objekt med alla benchmark-scores
  - För varje benchmark: `{ "value": number, "source": "URL" }`
  - Om data saknas: `null`

## Hur man uppdaterar data

### 1. Lägga till en ny modell

1. Öppna `benchmark-data.json`
2. Lägg till ett nytt objekt i `models`-arrayen:

```json
{
  "id": "ny_modell_id",
  "name": "Ny Modell",
  "displayName": "Ny Modell (Jan 2026)",
  "date": "Jan 2026",
  "releaseDate": "2026-01-15",
  "companyId": "företag_id",
  "company": "Företagsnamn",
  "scores": {
    "humaneval": {
      "value": 95.0,
      "source": "https://källa.url/här"
    },
    "swebench_verified": {
      "value": 80.0,
      "source": "https://www.swebench.com/"
    },
    "swebench_pro": null,
    "taubench": {
      "value": 90.0,
      "source": "https://github.com/sierra-research/tau-bench"
    },
    "metr": null
  }
}
```

3. **Viktig:** Inkludera källreferenser för ALLA scores som inte är `null`
4. Uppdatera `metadata.lastUpdated` med dagens datum
5. Om det är en ny SOTA, uppdatera `benchmarks.bestScores`

### 2. Uppdatera befintliga scores

1. Hitta modellen i `models`-arrayen
2. Uppdatera värdet OCH källan:

```json
"humaneval": {
  "value": 98.5,  // Nytt värde
  "source": "https://uppdaterad-källa.url"  // Uppdaterad källa
}
```

3. Uppdatera `metadata.lastUpdated`
4. Kontrollera om `benchmarks.bestScores` behöver uppdateras

### 3. Lägga till ett nytt företag

Om modellen kommer från ett nytt företag:

1. Lägg till företaget i `companies`-arrayen:

```json
{
  "id": "nytt_företag",
  "name": "Nytt Företag",
  "category": "proprietary"  // eller "open_source"
}
```

2. Använd `id`-värdet som `companyId` i modellen

### 4. Lägga till ett nytt benchmark

Om ett helt nytt benchmark läggs till:

1. Lägg till i `benchmarks.definitions`:

```json
{
  "id": "nytt_bench",
  "label": "Nytt Benchmark",
  "color": "#hex-färg",
  "unit": "percentage",
  "sourceUrl": "https://benchmark.url"
}
```

2. Lägg till i `benchmarks.bestScores`:

```json
"nytt_bench": {
  "value": 100,
  "modelId": "bästa_modell_id",
  "modelName": "Bästa Modell"
}
```

3. Lägg till `"nytt_bench": null` eller `{ "value": X, "source": "URL" }` för ALLA modeller

## Källreferenser

### Krav

- **Varje** score (som inte är `null`) MÅSTE ha en källreferens
- Källan ska vara en publik URL
- Föredra officiella källor (tekniska rapporter, leaderboards)

### Rekommenderade källor per benchmark

- **HumanEval**: https://github.com/openai/human-eval eller modellens tekniska rapport
- **SWE-bench Verified**: https://www.swebench.com/
- **SWE-bench Pro**: https://scale.com/leaderboard/swe_bench_pro_public
- **TAU-bench**: https://github.com/sierra-research/tau-bench
- **METR**: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/

### Källprioritet

1. **Officiella tekniska rapporter** från modellens tillverkare
2. **Officiella leaderboards** för specifikt benchmark
3. **Peer-reviewed publikationer**
4. **Verifierade blogginlägg** från tillverkaren

## Validering

### Innan du commitar ändringar

1. **JSON-syntax**: Validera med en JSON-validator (online eller editor)
2. **Alla scores har källor**: Kontrollera att ingen score saknar `source`-fält
3. **Datum**: Kontrollera att `releaseDate` är i ISO-format (YYYY-MM-DD)
4. **SOTA**: Verifiera att `bestScores` är korrekta
5. **Company IDs**: Kontrollera att alla `companyId` finns i `companies`

### Testa lokalt

1. Starta en lokal webbserver:
   ```bash
   # Python
   python -m http.server

   # Node.js
   npx http-server
   ```

2. Öppna `http://localhost:8000/demos/ai-coding-trends/ai-coding-benchmarks.html`

3. Kontrollera att:
   - Dropdown populeras korrekt
   - Alla modeller visas
   - Grafer renderas utan fel
   - Inga console errors i utvecklarverktygen

### Vanliga fel

| Fel | Orsak | Lösning |
|-----|-------|---------|
| Dropdown tom | JSON laddas inte | Använd webbserver, inte `file://` |
| Modell saknas | Fel i JSON-syntax | Validera JSON |
| Graf visar fel data | Score-värden felaktiga | Dubbelkolla siffror |
| Console error om `null` | Saknar `null` för benchmark | Lägg till `"benchmark": null` |

## Best Practices

1. **Uppdatera metadata.lastUpdated** vid VARJE ändring
2. **Verifiera källor** innan du lägger till dem
3. **Testa lokalt** innan commit
4. **Commit-meddelande**: Beskriv vad som ändrats (t.ex. "Uppdatera GPT-5 scores med nya SOTA-värden")
5. **Små commits**: En modell eller ett benchmark åt gången
6. **Backup**: Ta backup av filen före större ändringar

## Exempel: Fullständig uppdateringsprocess

```bash
# 1. Öppna filen
code data/benchmark-data.json

# 2. Gör ändringar (lägg till ny modell, uppdatera scores, etc.)

# 3. Validera JSON
# (använd editor-plugin eller online validator)

# 4. Uppdatera metadata
# Ändra "lastUpdated": "2026-01-06"

# 5. Testa lokalt
python -m http.server
# Öppna http://localhost:8000/demos/ai-coding-trends/ai-coding-benchmarks.html

# 6. Commit
git add data/benchmark-data.json
git commit -m "Lägg till Claude 5 Opus med benchmark-scores"
```

## Support

Vid frågor eller problem, kontakta:
- Öppna en issue i projektet
- Kontrollera console-loggar i webbläsaren
- Verifiera att JSON-syntaxen är korrekt

## Version History

- **1.0.0** (2026-01-05): Initial version med 21 modeller och 5 benchmarks
