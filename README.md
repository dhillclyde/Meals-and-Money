# Home Apps — Expo shell

Two web apps (Meal Planner, Money HQ) wrapped in a native iOS shell so the bottom
navigation is the **real** iOS 26 Liquid Glass tab bar (`UITabBar`), not a CSS imitation.

## Why this and not CSS
On iOS 26 the system draws the tab bar itself — glass material, rim refraction, content
lensing, minimize-on-scroll, scrub-between-tabs. None of that is reachable from HTML/CSS.
Expo Router's `NativeTabs` mounts the actual system bar, so it is pixel-correct and stays
correct as Apple changes it.

## Run it
```bash
cd expo
npm install
npx expo start        # press i, or scan the QR with Expo Go on an iOS 26 device
```

Expo Go on iOS 26 renders the native glass bar. For a standalone build, set the iOS
deployment target to 26.0:

```bash
npx expo install expo-build-properties
# app.json → plugins: [["expo-build-properties", { "ios": { "deploymentTarget": "26.0" } }]]
npx expo prebuild --platform ios --clean && npx expo run:ios
```

## How it fits together
- `assets/meal.html`, `assets/money.html` — the apps, unchanged except their own web tab
  bar hides itself when `window.__HIDE_WEB_NAV__` is set.
- `components/WebAppHost.jsx` — one shared WebView per app (so localStorage and app state
  are shared across tabs). Sets `__HIDE_WEB_NAV__` before load, forwards `haptic` messages
  to `expo-haptics`, exposes `setTab`.
- `app/meal/_layout.jsx`, `app/money/_layout.jsx` — `NativeTabs` with SF Symbols,
  brand `tintColor`, and `minimizeBehavior="onScrollDown"`.
- `app/meal/planner.jsx` etc — transparent screens; on focus each one calls
  `window.__setTab("Planner")` in the WebView. The glass bar floats over the page.

## Swapping icons
`sf={{ default: 'calendar', selected: 'calendar' }}` — any SF Symbol name works; use
outline for default and `.fill` for selected, the iOS convention.

## Publish a scannable QR (EAS Update)

Run these once from the `expo/` folder. `eas init` writes the real project id into
`app.json` (replacing `PROJECT_ID_FILLED_BY_EAS_INIT` in `updates.url` and
`extra.eas.projectId`), so don't edit those by hand.

```bash
npm install -g eas-cli
eas login              # free Expo account
eas init               # creates the project, fills in the ids
eas update --branch preview --message "first publish"
```

The last command prints a URL and a QR code. Scan it with the iPhone Camera app and it
opens in Expo Go — no dev server, no same-Wi-Fi requirement, and the link keeps working.
Re-run `eas update` after any change to push a new bundle to the same QR.

### Notes
- Expo Go can only run published updates for the SDK version it ships with. This project is
  on SDK 54; if your Expo Go is newer, run `npx expo install --fix` first.
- For a standalone TestFlight build instead of Expo Go:
  ```bash
  npx expo install expo-build-properties
  # app.json -> plugins: [["expo-build-properties", { "ios": { "deploymentTarget": "26.0" } }]]
  eas build --platform ios --profile preview
  ```
  Requires an Apple Developer account. This is the route if you want the app on the home
  screen with its own icon rather than inside Expo Go.

## Browser-only route (no terminal on your machine)

Snack cannot run this project — its bundler can't resolve `expo-router`'s subpath
exports, which is where native tabs live. Use GitHub + EAS Workflows instead; every
step is a web page.

1. **github.com** — New repository (private is fine). On the empty repo page choose
   *uploading an existing file* and drag in the **contents** of this `expo` folder
   (`app/`, `assets/`, `components/`, `.eas/`, `package.json`, `app.json`,
   `eas.json`, `babel.config.js`, `metro.config.js`). Commit to `main`.
2. **expo.dev** — sign in, *Create a project*, name it, then in the project's
   **GitHub** tab connect your repo.
3. In **Workflows**, run *Publish update*. It builds the bundle on Expo's servers.
4. The run page shows an Expo Go link and QR. Scan with the iPhone Camera app.

`.eas/workflows/publish-update.yml` also fires on every push to `main`, so later
edits publish themselves.
