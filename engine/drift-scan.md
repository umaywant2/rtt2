# **RTT/2 — Drift Scan Operator**  
### *engine/drift-scan.md*

## Overview  
**Drift Scan** is the RTT/2 operator responsible for detecting and quantifying drift across the **S / E / R** regimes. It computes structural, energetic, resonant, and cross‑regime drift vectors, along with directional drift fields.

This operator is the RTT/2 successor to RTT/1’s *drift diagnostics* and *structural‑critique drift overlays*.

---

## Purpose  
The drift‑scan operator provides:

- Structural drift vectors  
- Energetic drift vectors  
- Resonant drift vectors  
- Cross‑regime drift vectors  
- Directional drift fields  
- A unified drift model for RTT/2 geometry and coherence engines  

It is used by:

- RTT/2 coherence‑geometry  
- RTT/2 regime‑map  
- RTT/2 diagnostic overlays  
- RTT/3 drift‑topology engines  

---

## Input  
The operator accepts one upstream input:

### **regimeMap**  
Produced by `/regime-map`  
Contains:

- regime weights  
- regime transitions  
- regime intersections  

Drift is computed relative to these structural relationships.

---

## Output  
The operator produces a structured drift‑scan object:

```json
{
  "engine": "RTT/2",
  "operator": "drift-scan",
  "version": "2026.1",
  "vectors": {
    "structural": [],
    "energetic": [],
    "resonant": [],
    "cross": []
  },
  "fields": []
}
```

### **vectors.structural**  
Drift caused by structural regime relationships.

### **vectors.energetic**  
Drift caused by energetic regime transitions.

### **vectors.resonant**  
Drift caused by resonant interactions.

### **vectors.cross**  
Drift across non‑adjacent regimes.

### **fields**  
Directional drift surfaces across S/E/R.

---

## Drift Components

### **Structural Drift**  
Represents drift induced by structural regime adjacency.

### **Energetic Drift**  
Represents drift induced by energetic transitions.

### **Resonant Drift**  
Represents drift induced by resonance between regimes.

### **Cross‑Regime Drift**  
Represents drift across non‑adjacent modes.

### **Drift Fields**  
Directional surfaces representing drift flow across regimes.

---

## Engine Implementation  
Defined in:

```
src/drift/drift-scan.js
```

Key methods:

- `computeStructural(regimeMap)`  
- `computeEnergetic(regimeMap)`  
- `computeResonant(regimeMap)`  
- `computeCross(regimeMap)`  
- `computeFields(regimeMap)`  
- `build(input)`  

---

## Graph Representation  
Defined in:

```
src/drift/drift-scan.graph.js
```

Graph nodes:

- regime nodes  
- drift fields  

Graph edges:

- structural drift  
- energetic drift  
- resonant drift  
- cross‑regime drift  

---

## Worker  
Defined in:

```
src/drift/drift-scan.worker.js
```

The worker wraps the engine and returns:

```json
{
  "ok": true,
  "engine": "RTT/2",
  "operator": "drift-scan",
  "version": "2026.1",
  "result": { ... }
}
```

---

## API  
OpenAPI specification:

```
src/drift/drift-scan.openapi.yaml
```

Endpoint:

```
POST /drift-scan
```

---

## Schema  
JSON schema:

```
src/drift/drift-scan.schema.json
```

Defines:

- input structure  
- output structure  
- drift vector types  
- drift field types  

---

## Tests  
Located in:

```
src/tests/drift.test.json
```

Covers:

- structural drift  
- energetic drift  
- resonant drift  
- cross‑regime drift  
- drift fields  

---

## Version  
**2026.1** — first RTT/2 release of drift‑scan.
