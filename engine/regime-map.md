# **RTT/2 — Regime Map Operator**  
### *engine/regime-map.md*

## Overview  
**Regime Map** is the RTT/2 operator responsible for constructing the structural map of the **S / E / R** regimes. It computes regime weights, regime transitions, and regime intersections, forming the foundational topology used by all downstream RTT/2 operators.

This operator is the RTT/2 successor to RTT/1’s *structural‑clarity* and *regime‑diagnostic* modules.

---

## Purpose  
The regime‑map operator provides:

- Structural regime weights  
- Regime transitions (edges)  
- Regime intersections (surfaces)  
- A unified structural topology for RTT/2 geometry and drift engines  

It is used by:

- RTT/2 drift‑scan  
- RTT/2 coherence‑geometry  
- RTT/2 diagnostic overlays  
- RTT/3 structural‑topology engines  

---

## Input  
The operator accepts one upstream input:

### **input**  
Raw structural or contextual data from RTT/1 or RTT/2 upstream modules.

Contains:

- structural nodes  
- structural edges  
- contextual metadata  

---

## Output  
The operator produces a structured regime‑map object:

```json
{
  "engine": "RTT/2",
  "operator": "regime-map",
  "version": "2026.1",
  "weights": {},
  "transitions": [],
  "intersections": []
}
```

### **weights**  
Computed weights for each regime:

- S  
- E  
- R  

### **transitions**  
Edges representing directional regime relationships.

### **intersections**  
Surfaces representing regime overlaps.

---

## Regime Components

### **Regime Weights**  
Quantify the relative influence of each regime.

### **Regime Transitions**  
Represent directional structural relationships.

### **Regime Intersections**  
Represent geometric overlaps between regimes.

---

## Engine Implementation  
Defined in:

```
src/regime/regime-map.js
```

Key methods:

- `computeWeights(input)`  
- `computeTransitions(input)`  
- `computeIntersections(input)`  
- `build(input)`  

---

## Graph Representation  
Defined in:

```
src/regime/regime-map.graph.js
```

Graph nodes:

- S, E, R regime nodes  
- intersection nodes  

Graph edges:

- transitions  

---

## Worker  
Defined in:

```
src/regime/regime-map.worker.js
```

The worker wraps the engine and returns:

```json
{
  "ok": true,
  "engine": "RTT/2",
  "operator": "regime-map",
  "version": "2026.1",
  "result": { ... }
}
```

---

## API  
OpenAPI specification:

```
src/regime/regime-map.openapi.yaml
```

Endpoint:

```
POST /regime-map
```

---

## Schema  
JSON schema:

```
src/regime/regime-map.schema.json
```

Defines:

- input structure  
- output structure  
- weight, transition, and intersection types  

---

## Tests  
Located in:

```
src/tests/regime.test.json
```

Covers:

- regime weights  
- regime transitions  
- regime intersections  

---

## Version  
**2026.1** — first RTT/2 release of regime‑map.
