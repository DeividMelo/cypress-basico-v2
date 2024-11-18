const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 880,
  viewportWidth: 1280,
  video: true, // Deve estar ativado
  videosFolder: 'cypress/videos', // Verifique se essa é a pasta correta


  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
