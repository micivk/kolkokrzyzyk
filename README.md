# Kółko i krzyżyk — PITax challenge

Responsywna wersja klasycznej gry dla dwóch graczy, przygotowana jako zadanie rekrutacyjne. Interfejs korzysta z pomarańczowo-granatowej palety inspirowanej marką PITax.

## Funkcje

- rozgrywka lokalna dla dwóch graczy,
- wykrywanie zwycięstwa i remisu,
- wyróżnienie zwycięskiej kombinacji,
- licznik wygranych i remisów,
- osobny reset rundy oraz całego wyniku,
- obsługa klawiatury, czytników ekranu i urządzeń dotykowych,
- responsywny interfejs na telefon i komputer.

## Uruchomienie lokalne

Wymagany jest Node.js 22 lub nowszy.

```bash
npm install
npm run dev
```

Aplikacja będzie dostępna pod adresem wyświetlonym w terminalu.

## GitHub Codespaces

Repozytorium zawiera konfigurację `.devcontainer`. Po wybraniu **Code → Codespaces → Create codespace on main** zależności zainstalują się automatycznie. Następnie uruchom:

```bash
npm run dev
```

Podgląd aplikacji otworzy się na porcie `3000`.

## Deployment na Vercel

1. Umieść projekt w publicznym repozytorium GitHub.
2. W Vercel wybierz **Add New → Project** i zaimportuj repozytorium.
3. Vercel automatycznie rozpozna Next.js oraz konfigurację z `vercel.json`.
4. Kliknij **Deploy** — zmienne środowiskowe nie są potrzebne.

## Logika gry

Plansza jest tablicą dziewięciu wartości: `X`, `O` albo `null`. Po każdym ruchu funkcja `getWinner` porównuje osiem możliwych zwycięskich kombinacji. Jeśli żadna nie pasuje, ale wszystkie pola są zajęte, rozgrywka kończy się remisem. Stan planszy, aktywnego gracza i wyniku jest zarządzany przez hook `useState`.

## Technologie

- Next.js
- React
- TypeScript
- CSS
