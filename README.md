# Mobile app — Auberge Les Sources

A clickable on-property mobile web app for inn guests at Auberge Les Sources in La Malbaie, Charlevoix.

## What's here

- **`index.html`** — open this; renders the prototype inside an iPhone frame at 414 × 880.
- **`app.jsx`** — root component; tab routing.
- **`screens.jsx`** — Home, Discover, Breakfast, Stay.
- **`components.jsx`** — Eyebrow, SectionStart, Button, Chip, PhotoCard, EditorialCard, ListRow, ScreenHeader, TabBar.
- **`icons.jsx`** — Lucide-derived line icons (currentColor stroke).

## Screens

| Tab          | Screen           | What it shows                                                                                                            |
| ------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Accueil      | `HomeScreen`     | Hero photo, owner card, 4 quick tiles, editorial coups de cœur, restos teaser                                            |
| Découvrir    | `DiscoverScreen` | Segmented Activités / Restos; category chips; editorial cards with quotes from the owners and "Voir l'itinéraire" CTA   |
| Petit-déj.   | `BreakfastScreen`| Full reservation flow: date, time grid, preferences chips, party-size stepper, confirm → bottom-sheet confirmation        |
| Séjour       | `StayScreen`     | Segmented Infos pratiques / Nos produits — arrival, Wi-Fi, parking, phone, FAQ accordion; product grid                   |

The Discover and Stay tabs both ship with internal segmented controls so the six brief sections (home + activities + restos + infos + breakfast + products) fit in 4 tab slots without becoming a flat list.

## Voice & content

All copy is in French ("vous", warm hosted register). Examples lifted directly from the spec / website:

- *« Bienvenue à l'Auberge des Sources »* — *« Le charme d'une maison d'époque, la douceur d'une pause à La Malbaie. »*
- Restaurant quote: *« Notre rituel — un latte et un pain doré, en regardant la lumière entrer. »*
- Confirmation: *« C'est noté. À demain matin, 8 h 30. »*

## Visual rules used

- **No emoji**, no decorative SVGs invented from scratch.
- Photography is from `assets/images/` (real inn shots from the Wix CDN).
- Cormorant Garamond for display, Lora italic for editorial body, Manrope for UI.
- Cream `#FBF7F1` page, terracotta `#B36A5E` as accent, ink `#29211C` as primary action.
- Cards `--radius-xl` (28 px); buttons `--radius-pill`; soft cocoa-tinted shadows.
- TabBar floats over content with 20 px blur and a 1 px hairline border.
- Crossfade-only transitions (`--dur-normal` 240 ms, `--ease-soft`).

## Caveats

- Restaurant names beyond the official site (e.g. *Café Chez Cynthia*, *MalBrew*) are illustrative — please replace with the inn's real curated list.
- Photos repeat across screens for now; ask for additional masters.
- No real maps; "Voir l'itinéraire" is wired to nothing.
- No real auth or guest data binding.
