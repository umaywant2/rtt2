/**
 * RTT/2 — Regime Map API Client
 * --------------------------------
 * Provides a simple wrapper for calling the RTT/2
 * /map endpoint using fetch().
 */

export async function regimeMap(input) {
  const response = await fetch("/api/map", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input })
  });

  return response.json();
}

