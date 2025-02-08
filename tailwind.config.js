const { Flowbite } = require("flowbite-react");

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
      Flowbite.content()
    ],
    theme: {
      extend: {},
    },
    plugins: [
      flowbite.plugin()
    ],
  }
  