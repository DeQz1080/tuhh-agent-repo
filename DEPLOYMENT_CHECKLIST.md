# GitHub Pages Deployment Checklist

## Problem: MIME-Type-Fehler auf GitHub Pages

### Mögliche Ursachen:
1. **GitHub Pages serviert Source-Dateien statt dist/** - Prüfe Settings → Pages → Source
2. **Falscher Branch/Ordner** - Sollte `/dist` oder Branch mit dist sein
3. **Cache-Problem** - Browser cached alte Version
4. **.nojekyll fehlt** - GitHub Pages ignoriert Dateien mit Unterstrich

### Lösungsschritte:

1. **GitHub Pages Settings prüfen:**
   - Settings → Pages
   - Source: Sollte "Deploy from a branch" sein
   - Branch: `main` (oder dein Branch)
   - Folder: `/dist` (WICHTIG!)

2. **Sicherstellen dass dist/ gepusht wird:**
   - `.gitignore` sollte `dist` NICHT ignorieren (ist bereits so)
   - `git add dist/` und `git commit` und `git push`

3. **.nojekyll Datei:**
   - Muss im `dist/` Ordner sein (ist bereits vorhanden)

4. **Browser Cache leeren:**
   - Hard Refresh: Ctrl+Shift+R (Windows) oder Cmd+Shift+R (Mac)
   - Oder Incognito-Modus testen

### Debug-Informationen sammeln:

In der Browser-Konsole (F12) prüfen:
- Welche URL wird für style.css verwendet?
- Welche URL wird für die JSON-Dateien verwendet?
- Gibt es 404-Fehler?
- Was steht in Network-Tab?

