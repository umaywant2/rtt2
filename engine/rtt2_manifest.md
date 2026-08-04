# **RTT/2 Engine Manifest**  
### *engine/rtt2_manifest.md*

## Overview  
**RTT/2** is the second‑generation Resonance‑Time Theory engine.  
It extends RTT/1 by introducing geometric, drift, and regime‑mapping operators that form the structural core of RTT/2’s analytical and visualization layers.

RTT/2 provides:

- Regime mapping  
- Drift scanning  
- Coherence geometry  
- Unified S/E/R topology  
- Worker‑based computation  
- Graph‑level visualization  

RTT/2 is the foundation for RTT/3’s topology engine and RTT/12’s extended multi‑regime architecture.

---

## Operators  
RTT/2 contains **three primary operators**, each implemented as an engine, graph, worker, schema, and OpenAPI definition.

### **1. Regime Map**  
**Directory:** `src/regime/`  
**Purpose:** Computes structural regime weights, transitions, and intersections.  
**Files:**

- `regime-map.js` — engine  
- `regime-map.graph.js` — graph representation  
- `regime-map.worker.js` — worker wrapper  
- `regime-map.openapi.yaml` — API definition  
- `regime-map.schema.json` — schema  
- `regime.test.json` — tests  

---

### **2. Drift Scan**  
**Directory:** `src/drift/`  
**Purpose:** Computes structural, energetic, resonant, and cross‑regime drift vectors and drift fields.  
**Files:**

- `drift-scan.js` — engine  
- `drift-scan.graph.js` — graph representation  
- `drift-scan.worker.js` — worker wrapper  
- `drift-scan.openapi.yaml` — API definition  
- `drift-scan.schema.json` — schema  
- `drift.test.json` — tests  

---

### **3. Coherence Geometry**  
**Directory:** `src/coherence/`  
**Purpose:** Computes alignment vectors, stability gradients, drift overlays, and coherence surfaces.  
**Files:**

- `coherence-geometry.js` — engine  
- `coherence-geometry.graph.js` — graph representation  
- `coherence-geometry.worker.js` — worker wrapper  
- `coherence-geometry.openapi.yaml` — API definition  
- `coherence-geometry.schema.json` — schema  
- `coherence.test.json` — tests  

---

## Pipeline  
RTT/2 operators form a **three‑stage pipeline**:

1. **Regime Map**  
   - Computes structural topology  
   - Produces weights, transitions, intersections  

2. **Drift Scan**  
   - Consumes regime‑map  
   - Computes drift vectors and drift fields  

3. **Coherence Geometry**  
   - Consumes regime‑map + drift‑scan  
   - Produces full coherence geometry  

This pipeline mirrors RTT/1’s clarity → diagnostics → geometry flow, but with RTT/2’s expanded S/E/R regime model.

---

## Version  
**RTT/2 Version:** `2026.1`  
This is the first stable release of the RTT/2 engine.

---

## Compatibility  
### **RTT/1 → RTT/2**  
RTT/2 consumes structural outputs from RTT/1 modules.

### **RTT/2 → RTT/3**  
RTT/3 consumes RTT/2 geometry and drift outputs to build regime topology.

### **RTT/2 → RTT/12**  
RTT/12 extends RTT/2’s S/E/R model into multi‑regime (12‑mode) architecture.

---

## Directory Structure

```
rtt2/
  engine/
    rtt2_manifest.md
    coherence-geometry.md
    drift-scan.md
    regime-map.md

  src/
    regime/
      regime-map.js
      regime-map.graph.js
      regime-map.worker.js
      regime-map.openapi.yaml
      regime-map.schema.json

    drift/
      drift-scan.js
      drift-scan.graph.js
      drift-scan.worker.js
      drift-scan.openapi.yaml
      drift-scan.schema.json

    coherence/
      coherence-geometry.js
      coherence-geometry.graph.js
      coherence-geometry.worker.js
      coherence-geometry.openapi.yaml
      coherence-geometry.schema.json

    tests/
      regime.test.json
      drift.test.json
      coherence.test.json
```
