const { Flowbite } = require("flowbite-react");
import { mtConfig } from "@material-tailwind/react";

module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
      Flowbite.content(),
      "./node_modules/@material-tailwind/react/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
      extend: {},
    },
    plugins: [
      flowbite.plugin(),
      mtConfig
    ],
  }
  