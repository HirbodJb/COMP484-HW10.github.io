// I use jQuery's ready callback so the dashboard and buttons exist when I set up the game.
$(function() {
    
    checkAndUpdatePetInfoInHtml();
  
    // jQuery's .click() gives me the clicked button as `this` so I can look up its reaction.
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);

    document.querySelector('#demo-logs').addEventListener('click', logMangoStats);
    document.querySelector('#demo-404').addEventListener('click', requestMissingImage);
    document.querySelector('#demo-typeerror').addEventListener('click', triggerTypeError);
    document.querySelector('#demo-violation').addEventListener('click', triggerSlowClick);
  

  
    
  })
  
    const pet_info = { name: "Mango", weight: 8, happiness: 10, energy: 5 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let nextPlayReaction = 0;
  
    function clickedTreatButton() {
      applyPetAction(this, { weight: 1, happiness: 2, energy: 0 });

      // I skip Mango's treat hop if the player prefers less motion.
      if (!reducedMotion.matches) {
        document.querySelector('.pet-image').animate([
          { transform: 'translateY(0)' },
          { transform: 'translateY(-16px)', offset: 0.45 },
          { transform: 'translateY(0)' }
        ], { duration: 360, easing: 'ease-in-out' });
      }
    }

    function clickedPlayButton() {
      applyPetAction(this, { weight: -1, happiness: 3, energy: -1 });
    }

    function clickedExerciseButton() {
      applyPetAction(this, { weight: -2, happiness: -2, energy: -1 });
    }

    function clickedNapButton() {
      const energyBefore = pet_info.energy;
      const recovery = 3;
      const reproduceNapBug = document.querySelector('#reproduce-nap-bug').checked;
      // I keep the wrong sign available for the breakpoint demo. Normal naps restore energy.
      const energyChange = reproduceNapBug ? -recovery : recovery;

      // I use the correct sign for the nap energy change in the normal game.
      //const energyChange = recovery;

      applyPetAction(this, { weight: 0, happiness: 1, energy: energyChange });
      console.info(`[Mango nap] Energy ${energyBefore} → ${pet_info.energy}`);

      // I float the nap text up and fade it out after about a second.
      const rise = reducedMotion.matches ? 'translateY(0)' : 'translateY(-18px)';
      document.querySelector('.nap-effect').animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 1, offset: 0.55 },
        { opacity: 0, transform: rise }
      ], { duration: 1000, easing: 'ease-out' });
    }

    function logMangoStats() {
      console.info('[Mango audit] Pet dashboard is ready.');
      console.warn('[Mango audit] Demo warning: check Mango’s energy before play.');
      console.error('[Mango audit] Demo error: Mango’s toy inventory could not load.');

      console.group('Mango snapshot');
      console.table([
        { stat: 'Weight', value: pet_info.weight, unit: 'lb' },
        { stat: 'Happiness', value: pet_info.happiness, unit: 'wags/min' },
        { stat: 'Energy', value: pet_info.energy, unit: 'points' }
      ]);
      console.log('%cMango status check complete', 'color: #fff; background: #9a411b; font-weight: bold; padding: 2px 6px');
      console.groupEnd();

      console.info('[Mango audit] End of dashboard snapshot.');
    }

    function requestMissingImage() {
      // I request a nonexistent file so the HTTP server produces a real 404.
      const image = new Image();
      image.src = 'images/hw10-missing-mango-toy.png';
    }

    function triggerTypeError() {
      const missingToy = undefined;
      // I leave this exception uncaught so Chrome reports the TypeError and its stack.
      return missingToy.name;
    }

    function triggerSlowClick() {
      // I block this demo click briefly so Chrome can report a long-running handler.
      const end = performance.now() + 350;
      while (performance.now() < end) {
        // Keep the main thread busy until the demo interval ends.
      }
    }

    function applyPetAction(button, changes) {
      // Block energy-costing actions at zero and point the player to Nap.
      if (changes.energy < 0 && pet_info.energy === 0) {
        $('.pet-message').text("I'm out of energy! Let me take a nap first.");
        return;
      }

      const before = { ...pet_info };

      pet_info.weight += changes.weight;
      pet_info.happiness += changes.happiness;
      pet_info.energy += changes.energy;
      checkAndUpdatePetInfoInHtml();

      const wasUnhappy = before.happiness <= 4;
      const isUnhappy = pet_info.happiness <= 4;

      if (wasUnhappy !== isUnhappy) {
        // I use jQuery's .fadeTo() only when Mango crosses the low-happiness threshold.
        // It takes 250 ms to dim the image to 55% opacity or bring it back to full opacity.
        $('.pet-image').fadeTo(250, isUnhappy ? 0.55 : 1);
      }

      // I use jQuery's .data("message") to read each button's reaction from the HTML.
      // Play stores a JSON array, so I can cycle through it after each successful play.
      const buttonMessage = $(button).data("message");
      let message = buttonMessage;

      if (Array.isArray(buttonMessage)) {
        message = buttonMessage[nextPlayReaction];
        nextPlayReaction = (nextPlayReaction + 1) % buttonMessage.length;
      }

      // Compare the stats after applying their minimums so the message shows the actual changes.
      const weightChange = formatChange(pet_info.weight - before.weight);
      const happinessChange = formatChange(pet_info.happiness - before.happiness);
      const energyChange = formatChange(pet_info.energy - before.energy);

      $('.pet-message').text(
        `${message} Weight ${weightChange} | Happiness ${happinessChange} | Energy ${energyChange}`
      );
    }

    function formatChange(change) {
      return change > 0 ? `+${change}` : String(change);
    }
  
    function checkAndUpdatePetInfoInHtml() {
      // I use one pound as the weight floor. Happiness and energy can reach zero.
      if (pet_info.weight < 1) {
        pet_info.weight = 1;
      }

      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }

      if (pet_info.energy < 0) {
        pet_info.energy = 0;
      }

      updatePetInfoInHtml();
    }
    
    // I use jQuery's .text() to display my pet_info values as plain text in the dashboard.
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info.energy);

      // I use the same zero-stat checks for the mood label and the grumpy image.
      const moods = [];
      if (pet_info.energy === 0) moods.push('Sleepy');
      if (pet_info.happiness === 0) moods.push('Grumpy');
      $('.mood').text(moods.join(' and ') || 'Content');

      const showGrumpyImage = moods.length > 0;
      const petImage = document.querySelector('.pet-image');
      const imagePath = showGrumpyImage ? 'images/Grumpy-Mango.png' : 'images/Orange-Kitten.png';

      if (petImage.getAttribute('src') !== imagePath) {
        petImage.src = imagePath;
        petImage.alt = showGrumpyImage
          ? 'Mango the orange tabby kitten looking grumpy'
          : 'Mango the orange tabby kitten';
      }
    }
