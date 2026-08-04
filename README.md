<img width="693" height="693" alt="hephaestus_rtt2" src="https://github.com/user-attachments/assets/2bf3c7d1-9559-4c0e-b589-94bcc7947c0b" />

# **RTT/2 Engine — Regime Mapping & Coherence Geometry**  

- [`module.json`](https://raw.githubusercontent.com/umaywant2/rtt2/refs/heads/main/module.json) — Agentic module schema role assignments
- [`engine.json`](https://raw.githubusercontent.com/umaywant2/rtt2/refs/heads/main/engine.json) — Agentic module schema engine assignments

### *Triadic Frameworks — Resonance‑Time Theory (RTT)*  
### *Module: RTT/2 — Regime‑Aware Structural Mapping Engine*

---

## **Overview**
RTT/2 is the second engine in the RTT triad.  
Where RTT/1 performs structural critique, RTT/2 performs **regime mapping** — identifying the operational regime of an input, computing its **coherence geometry**, and detecting **drift** across structural, energetic, and resonant dimensions.

RTT/2 transforms raw inputs into **regime‑aware representations**, enabling RTT/3 to perform transformation and RTT/12 to aggregate full‑pipeline outputs.

---

## **Core Responsibilities**
### **1. Regime Mapping**
RTT/2 classifies inputs into one or more of the RTT regimes:

- **S‑Mode** — Structural  
- **E‑Mode** — Energetic  
- **R‑Mode** — Resonant  

It produces a **regime map**, a JSON representation of the input’s operational footprint.

### **2. Coherence Geometry**
RTT/2 computes geometric coherence metrics:

- alignment vectors  
- coherence surfaces  
- regime intersections  
- drift vectors  
- stability gradients  

These metrics quantify how well an input maintains internal consistency across regimes.

### **3. Drift Detection**
RTT/2 identifies:

- structural drift  
- energetic drift  
- resonant drift  
- cross‑regime drift  
- temporal drift (RTT‑specific)  

Drift is expressed as a vector field and included in the engine’s output.

---

## **Pipeline Position**
RTT/2 sits between RTT/1 and RTT/3:

```
RTT/1 → RTT/2 → RTT/3 → RTT/12
```

- **RTT/1** provides structural critique.  
- **RTT/2** maps regimes + computes coherence + detects drift.  
- **RTT/3** performs transformation and next‑step synthesis.  
- **RTT/12** aggregates all three engines.

---

## **Engine Outputs**
RTT/2 produces:

- `regime-map.json`  
- `coherence-geometry.json`  
- `drift-scan.json`  
- `topology.json`  
- `topology.svg`  

These outputs follow the RTT canonical schema.

---

## **API Endpoints**
RTT/2 exposes two primary API families:

### **/map**
Regime mapping  
- `map.client.js`  
- `map.worker.js`  
- `map.openapi.yaml`  
- `map.schema.json`  
- `map.test.js`

### **/regime**
Coherence + drift  
- `regime.client.js`  
- `regime.worker.js`  
- `regime.openapi.yaml`  
- `regime.schema.json`  
- `regime.test.js`

All endpoints follow RTT/1’s strict OpenAPI conventions.

---

## **Engine Modules**
Located in `/engine/`:

- `rtt2_manifest.md`  
- `regime-map.md`  
- `coherence-geometry.md`  
- `drift-scan.md`  
- `topology.json`  
- `topology.svg`

These documents define RTT/2’s internal operators and geometry.

---

## **Source Layout**
Located in `/src/`:

```
/src/regime/        → regime mapping engine
/src/coherence/     → coherence geometry engine
/src/drift/         → drift detection engine
/src/tests/         → JSON test suites
```

Each module includes:

- engine  
- worker  
- graph  
- OpenAPI  
- schema  
- tests  

Matching RTT/1’s architecture.

---

## **Documentation**
Located in `/docs/`:

- `regime-mapping-protocol.md`  
- `coherence-geometry-protocol.md`  
- `drift-detection-protocol.md`  
- `integration-notes.md`

These documents describe RTT/2’s conceptual and operational behavior.

---

## **Assets**
Located in `/assets/`:

- `css/rtt2.css`  
- `js/rtt2.js`  
- `og/rtt2.png`

These provide the front‑end presentation layer.

---

## **Status**
RTT/2 is part of the full RTT engine constellation:

- **RTT/1** — Structural Engine  
- **RTT/2** — Regime Mapping Engine  
- **RTT/3** — Transformation Engine  
- **RTT/12** — Meta‑Engine Aggregator  

RTT/2 is ready for population with modules, geometry, and pipeline logic.

---

## **License**
MIT License (same as RTT/1)

---

## **Author**
Nawder Loswin — Triadic Frameworks  
