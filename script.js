$(function() { // Makes sure that your function is called once all the DOM elements of the page are ready to be used.
    
    // Called function to update the name, happiness, and weight of our pet in our HTML
    checkAndUpdatePetInfoInHtml();
  
    // When each button is clicked, it will "call" function for that button (functions are below)
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);
  

  
    
  })
  
    // Add a variable "pet_info" equal to a object with the name (string), weight (number), and happiness (number) of your pet
    const pet_info = { name: "Mango", weight: 8, happiness: 10, energy: 5 };
  
    function clickedTreatButton() {
      applyPetAction(this, { weight: 1, happiness: 2, energy: 0 });
    }

    function clickedPlayButton() {
      applyPetAction(this, { weight: -1, happiness: 3, energy: -1 });
    }

    function clickedExerciseButton() {
      applyPetAction(this, { weight: -2, happiness: -2, energy: -1 });
    }

    function clickedNapButton() {
      applyPetAction(this, { weight: 0, happiness: 1, energy: 3 });
    }

    function applyPetAction(button, changes) {
      if (changes.energy < 0 && pet_info.energy === 0) {
        $('.pet-message').text("I'm out of energy! Let me take a nap first.");
        return;
      }

      const before = { ...pet_info };

      pet_info.weight += changes.weight;
      pet_info.happiness += changes.happiness;
      pet_info.energy += changes.energy;
      checkAndUpdatePetInfoInHtml();

      // jQuery's .data("message") reads the clicked button's data-message attribute.
      const message = $(button).data("message");

      // Compare the final stats with the starting stats so the message respects the zero limits.
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
      if (pet_info.weight < 0) {
        pet_info.weight = 0;
      }

      if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
      }

      if (pet_info.energy < 0) {
        pet_info.energy = 0;
      }

      updatePetInfoInHtml();
    }
    
    // Updates your HTML with the current values in your pet_info object
    function updatePetInfoInHtml() {
      $('.name').text(pet_info['name']);
      $('.weight').text(pet_info['weight']);
      $('.happiness').text(pet_info['happiness']);
      $('.energy').text(pet_info.energy);
    }
  