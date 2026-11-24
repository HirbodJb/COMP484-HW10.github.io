# COMP484-HW10.github.io

Homework 10 uses a copy of my Mango virtual pet to demonstrate Chrome DevTools.

## Run locally

From the repository folder, start an HTTP server and open [localhost on port 8000](http://localhost:8000/) in Chrome.

```powershell
py -m http.server 8000 --bind 127.0.0.1
```

Open DevTools and expand **Homework 10 DevTools demos** below the game. The buttons log Mango’s stats, request a missing image, throw a TypeError, and run a slow click handler. Enable **Verbose** in the Console log level menu before running the slow click demo.

## Debug Mango’s nap

Reload to start with 5 energy. Enable **Reproduce the nap bug** and click **Nap** to see energy drop to 2. In `script.js`, set a line breakpoint on the `applyPetAction` call inside `clickedNapButton`. With the bug enabled, `recovery` is `3` and `energyChange` is `-3`. With the toggle off, a nap adds 3 energy.

The [Console logging guide](https://developer.chrome.com/docs/devtools/console/log/) and [JavaScript debugging guide](https://developer.chrome.com/docs/devtools/javascript/) provide the companion Chrome DevTools demos.
