# COMP484-HW10.github.io

Homework 10 uses a copy of my Mango virtual pet to demonstrate Chrome DevTools.

Link to website: https://hirbodjb.github.io/COMP484-HW10.github.io/ 

## Debug Mango’s nap

Reload to start with 5 energy. Enable **Reproduce the nap bug** and click **Nap** to see energy drop to 2. In `script.js`, set a line breakpoint on the `applyPetAction` call inside `clickedNapButton`. With the bug enabled, `recovery` is `3` and `energyChange` is `-3`. With the toggle off, a nap adds 3 energy.
