/**
 * RTT/2 — Regime Map API Test
 * --------------------------------
 * Tests the /api/map endpoint using the local client wrapper.
 */

import { regimeMap } from "./map.client.js";

(async () => {
  const input = {
    structure: {
      nodes: ["S", "E", "R"],
      edges: [
        { from: "S", to: "E", weight: 0.4 },
        { from: "E", to: "R", weight: 0.3 }
      ]
    }
  };

  const result = await regimeMap(input);

  console.log("RTT/2 Regime Map Test Result:");
  console.log(JSON.stringify(result, null, 2));
})();

