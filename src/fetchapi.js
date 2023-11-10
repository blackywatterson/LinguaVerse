function buttonClicked(event) {
  event.preventDefault(); // Prevent the default form submission behavior
  var wordInput = document.getElementById("searchData");
  var word = wordInput.value;

  if (word) {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Word not found in the dictionary.");
        }
        return response.json();
      })
      .then(function (data) {
        if (data && data.length > 0) {
          // Clear previous data
          var wordElement = document.getElementById("Word");
          if (wordElement) wordElement.innerHTML = "";

          var phoneticsList = document.getElementById("phoneticsList");
          if (phoneticsList) phoneticsList.innerHTML = "";

          var meaningsList = document.getElementById("meaningsList");
          if (meaningsList) meaningsList.innerHTML = "";

          var sourceUrlsList = document.getElementById("sourceUrlsList");
          if (sourceUrlsList) sourceUrlsList.innerHTML = "";

          // Loop through each entry in the data
          data.forEach(function (entry, entryIndex) {
            // Display the word
            var wordElement = document.createElement("p");
            wordElement.innerHTML = `<strong>Word (${entryIndex + 1}):</strong> ${entry.word}`;
            var Word = document.getElementById("Word");
            if (Word) Word.appendChild(wordElement);

            // Display all phonetics
            if (entry.phonetics) {
              var phoneticsList = document.createElement("div");
              phoneticsList.innerHTML = `<h3>Phonetics:</h3>`;
              entry.phonetics.forEach(function (phonetic, index) {
                var phoneticElement = document.createElement("p");
                phoneticElement.innerHTML = `<strong>Phonetic (${index + 1}):</strong> ${phonetic.text}`;
                phoneticElement.innerHTML += `<br><strong>Audio:</strong> <audio controls><source src="${phonetic.audio}" type="audio/mpeg"></audio>`;
                var phoneticsList = document.getElementById("phoneticsList");
                if (phoneticsList) phoneticsList.appendChild(phoneticElement);
              });
            }

            // Clear previous data in the meanings table
            var meaningsTableBody = document.getElementById("meaningsTableBody");
            if (meaningsTableBody) meaningsTableBody.innerHTML = "";

            // Loop through each entry in the data
            data.forEach(function (entry, entryIndex) {
              if (entry.meanings) {
                // Loop through meanings for the current entry
                entry.meanings.forEach(function (meaning) {
                  var newRow = meaningsTableBody.insertRow();
                  var partOfSpeechCell = newRow.insertCell(0);
                  var definitionCell = newRow.insertCell(1);
                  var exampleCell = newRow.insertCell(2);
                  var synonymsCell = newRow.insertCell(3);
                  var antonymsCell = newRow.insertCell(4);

                  partOfSpeechCell.innerHTML = meaning.partOfSpeech;
                  definitionCell.innerHTML = meaning.definitions.map(def => def.definition).join('<br>');
                  exampleCell.innerHTML = meaning.definitions.map(def => def.example || 'N/A').join('<br>');
                  synonymsCell.innerHTML = meaning.synonyms.join(', ') || 'N/A';
                  antonymsCell.innerHTML = meaning.antonyms.join(', ') || 'N/A';
                });
              }
            });

            // Display all source URLs for the current entry
            if (entry.sourceUrls) {
              var sourceUrlsList = document.createElement("div");
              sourceUrlsList.innerHTML = `<h3>Source URLs (${entryIndex + 1}):</h3>`;
              entry.sourceUrls.forEach(function (url, index) {
                var sourceUrlElement = document.createElement("a");
                sourceUrlElement.innerHTML = `<strong>Source URL (${index + 1}):</strong> ${url} `;
                sourceUrlElement.href = url;
                sourceUrlElement.target = "_blank"; // Open links in a new tab
                var sourceUrlsList = document.getElementById("sourceUrlsList");
                if (sourceUrlsList) sourceUrlsList.appendChild(sourceUrlElement);
              });
            }
          });
        }
      })
      .catch(function (error) {
        console.error(error);
        // Handle and display the error to the user.
        var wordElement = document.getElementById("Word");
        if (wordElement) wordElement.innerHTML = "Word not found in the dictionary.";

        var phoneticsList = document.getElementById("phoneticsList");
        if (phoneticsList) phoneticsList.innerHTML = ""; // Clear phonetics

        var meaningsList = document.getElementById("meaningsList");
        if (meaningsList) meaningsList.innerHTML = ""; // Clear meanings

        var sourceUrlsList = document.getElementById("sourceUrlsList");
        if (sourceUrlsList) sourceUrlsList.innerHTML = ""; // Clear source URLs
      });
  } else {
    // Handle empty input.
    var wordElement = document.getElementById("Word");
    if (wordElement) wordElement.innerHTML = "Please enter a word.";
  }
}
