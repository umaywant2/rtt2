/**
 * RTT/2 — Regime API Client
 * --------------------------------
 * Wrapper for calling the RTT/2 /regime endpoint.
 */

export async function regime(input) {
  const response = await fetch("/api/regime", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ input })
  });

  return response.json();
}

