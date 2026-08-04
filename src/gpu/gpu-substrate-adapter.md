# **gpu-substrate-adapter — RTT/2 Substrate Adapter**  
**RTT:** 2  
**Coherence:** Declared  
**Drift:** Bounded  
**Paradox:** Structural  

---

## 1. Overview  
The **Substrate Adapter** converts GPU substrate primitives into RTT/2 structural topology suitable for **regime‑map**. It is the first stage of GPU ingestion and defines the structural foundation for drift and coherence analysis.

---

## 2. Input  
The adapter consumes:

```json
{
  "nodes": [ ... ],
  "edges": [ ... ]
}
```

### Required fields  
- `nodes[]` — substrate primitives  
- `edges[]` — directional substrate relationships  
- `tier` — S/E/R regime tag  

### Validation  
- unique node IDs  
- normalized edge weights `[0,1]`  
- tier ∈ {S, E, R}  

---

## 3. Processing  
The adapter performs:

### 3.1 Node Mapping  
Each substrate primitive becomes an RTT/2 structural node:

- `id` → node ID  
- `label` → node label  
- `tier` → regime tag  

### 3.2 Edge Mapping  
Each substrate relationship becomes an RTT/2 structural edge:

- `from` → source node  
- `to` → target node  
- `weight` → normalized structural weight  

### 3.3 Regime Assignment  
Substrate tiers map directly into RTT/2 regimes:

- **S** — structural substrate  
- **E** — energetic substrate  
- **R** — resonant substrate  

---

## 4. Output  
The adapter emits:

```json
{
  "structure": {
    "nodes": [ ... ],
    "edges": [ ... ]
  }
}
```

This structure is passed directly to **regime‑map**.

---

## 5. Determinism  
- same substrate → same structure  
- no randomness  
- no external calls  

---

## 6. Version  
`2026.1`

---
