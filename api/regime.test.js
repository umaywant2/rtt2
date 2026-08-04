/**
 * RTT/2 — Regime API Test
 * --------------------------------
 * Tests the /api/regime endpoint using the local client wrapper.
 */

import { regime } from "./regime.client.js";

(async () => {
  const input = {
    nodes: ["S", "E", "R"],
    edges: [
      { from: "S", to: "E", weight: 0.4 },
      { from: "E", to: "R", weight: 0.3 }
    ]
  };

  const result = await regime(input);

  console.log("RTT/2 Regime API Test Result:");
  console.log(JSON.stringify(result, null, 2));
})();

