# **gpu-execution-coherence-adapter — RTT/2 Execution Coherence Adapter**  
**RTT:** 2  
**Coherence:** Declared  
**Drift:** Bounded  
**Paradox:** Structural  

---

## 1. Overview  
The **Execution Coherence Adapter** converts GPU execution primitives, scheduling behavior, and health metrics into RTT/2 coherence geometry suitable for **coherence‑geometry**. It is the third stage of GPU ingestion.

---

## 2. Input  
The adapter consumes:

```json
{
  "units": [ ... ],
  "overlays": [ ... ]
}
```

### Required fields  
- `units[]` — execution primitives  
- `overlays[]` — execution drift overlays  

### Validation  
- stability normalized `[0,1]`  
- alignment normalized `[0,1]`  
- regimes ∈ {S, E, R}  

---

## 3. Processing  
The adapter performs:

### 3.1 Coherence Surface Mapping  
Each execution unit becomes a coherence surface:

- `label` → surface name  
- `regimes[]` → S/E/R involvement  

### 3.2 Stability Gradient Mapping  
Execution health metrics become stability gradients:

- `stability` → gradient magnitude  

### 3.3 Alignment Vector Mapping  
Execution alignment becomes alignment vectors:

- `from` → intended regime  
- `to` → actual regime  
- `magnitude` → alignment strength  

### 3.4 Drift Overlay Mapping  
Execution anomalies become drift overlays:

- `label` → overlay name  
- `magnitude` → drift magnitude  

---

## 4. Output  
The adapter emits:

```json
{
  "alignment": [ ... ],
  "stability": [ ... ],
  "surfaces": [ ... ]
}
```

This geometry view is passed directly to **coherence‑geometry**.

---

## 5. Determinism  
- same execution → same geometry  
- no randomness  
- no external calls  

---

## 6. Version  
`2026.1`
