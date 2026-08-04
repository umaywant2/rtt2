# **RTT/2 — Coherence Geometry Operator**  
### *engine/coherence-geometry.md*

## Overview  
**Coherence Geometry** is the RTT/2 operator responsible for generating the geometric representation of coherence across the **S / E / R** regimes. It integrates alignment vectors, stability gradients, drift vectors, and coherence surfaces into a unified geometric model.

This operator is the RTT/2 successor to RTT/1’s *clarity geometry* and *diagnostic geometry* modules.

---

## Purpose  
The coherence‑geometry operator provides:

- A geometric interpretation of regime interactions  
- Alignment vectors between S/E/R  
- Stability gradients across regime boundaries  
- Drift vectors (structural, energetic, resonant)  
- Coherence surfaces representing intersections of regimes  

It is used by:

- RTT/2 visualization layers  
- RTT/2 diagnostic overlays  
- RTT/2 coherence‑map and drift‑scan operators  
- RTT/3 regime‑topology engines  

---

## Input  
The operator accepts two upstream inputs:

### **regimeMap**  
Produced by `/regime-map`  
Contains:

- regime weights  
- regime transitions  
- regime intersections  

### **driftScan**  
Produced by `/drift-scan`  
Contains:

- structural drift  
- energetic drift  
- resonant drift  
- cross‑regime drift  
- drift fields  

---

## Output  
The operator produces a structured coherence geometry object:

```json
{
  "engine": "RTT/2",
  "operator": "coherence-geometry",
  "version": "2026.1",
  "alignment": [],
  "stability": [],
  "drift": [],
  "surfaces": []
}
```

### **alignment**  
Vectors representing alignment between regimes.

### **stability**  
Gradients representing stability relationships.

### **drift**  
All drift vectors from drift‑scan:

- structural  
- energetic  
- resonant  
- cross‑regime  

### **surfaces**  
Coherence surfaces representing intersections of regimes.

---

## Geometry Components

### **Alignment Vectors**  
Describe directional coherence between S/E/R.

### **Stability Gradients**  
Represent stability tendencies across regime boundaries.

### **Drift Vectors**  
Imported from drift‑scan:

- structural  
- energetic  
- resonant  
- cross  

### **Coherence Surfaces**  
Represent geometric intersections of regimes.

---

## Engine Implementation  
Defined in:

```
src/coherence/coherence-geometry.js
```

Key methods:

- `computeAlignment(regimeMap)`
- `computeStability(regimeMap)`
- `computeDrift(driftScan)`
- `computeSurfaces(regimeMap)`
- `build(input)`

---

## Graph Representation  
Defined in:

```
src/coherence/coherence-geometry.graph.js
```

Graph nodes:

- regime nodes  
- coherence surfaces  

Graph edges:

- alignment vectors  
- stability gradients  
- drift vectors  

---

## Worker  
Defined in:

```
src/coherence/coherence-geometry.worker.js
```

The worker wraps the engine and returns:

```json
{
  "ok": true,
  "engine": "RTT/2",
  "operator": "coherence-geometry",
  "version": "2026.1",
  "result": { ... }
}
```

---

## API  
OpenAPI specification:

```
src/coherence/coherence-geometry.openapi.yaml
```

Endpoint:

```
POST /coherence-geometry
```

---

## Schema  
JSON schema:

```
src/coherence/coherence-geometry.schema.json
```

Defines:

- input structure  
- output structure  
- vector and surface types  

---

## Tests  
Located in:

```
src/tests/coherence.test.json
```

Covers:

- alignment  
- stability  
- drift  
- surfaces  

---

## Version  
**2026.1** — first RTT/2 release of coherence geometry.
