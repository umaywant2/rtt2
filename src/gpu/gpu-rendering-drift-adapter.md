# **gpu-rendering-drift-adapter — RTT/2 Rendering Drift Adapter**  
**RTT:** 2  
**Coherence:** Declared  
**Drift:** Bounded  
**Paradox:** Structural  

---

## 1. Overview  
The **Rendering Drift Adapter** converts rendering primitives and primitive‑stream paths into RTT/2 drift vectors and drift fields suitable for **drift‑scan**. It is the second stage of GPU ingestion.

---

## 2. Input  
The adapter consumes:

```json
{
  "primitives": [ ... ],
  "paths": [ ... ]
}
```

### Required fields  
- `primitives[]` — rendering operators  
- `paths[]` — primitive‑stream routes  

### Validation  
- instability normalized `[0,1]`  
- path regimes ∈ {S, E, R}  
- canonical direction signatures  

---

## 3. Processing  
The adapter performs:

### 3.1 Drift Vector Mapping  
Each rendering primitive becomes a drift vector:

- `stage` → vector label  
- `source` → upstream node  
- `target` → downstream node  
- `instability` → drift magnitude  

Vectors are classified into:

- structural  
- energetic  
- resonant  
- cross  

### 3.2 Drift Field Mapping  
Each primitive‑stream path becomes a drift field:

- `label` → field name  
- `regimes[]` → S/E/R involvement  
- `direction` → path signature  

---

## 4. Output  
The adapter emits:

```json
{
  "vectors": {
    "structural": [ ... ],
    "energetic": [ ... ],
    "resonant": [ ... ],
    "cross": [ ... ]
  },
  "fields": [ ... ]
}
```

This drift view is passed directly to **drift‑scan**.

---

## 5. Determinism  
- same rendering → same drift vectors/fields  
- no randomness  
- no external calls  

---

## 6. Version  
`2026.1`

---
