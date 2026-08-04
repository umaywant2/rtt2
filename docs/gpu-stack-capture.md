# RTT/2 — GPU Stack Capture  
**File:** docs/gpu-stack-capture.md  
**RTT:** 2  
**Coherence:** Declared  
**Drift:** Bounded  
**Paradox:** Structural  

---

## 1. Scenario

This capture demonstrates the **GPU Stack Operator** (`gpu-stack`) ingesting a simple OpenGPU stack:

- one substrate graph (GPU queue + RDP endpoint)  
- one rendering path (GPU → encoder → client display)  
- one execution unit (queue) with stable behavior  

The goal is to show:

- how `openGpuStack` is structured,  
- how the three adapters interpret it,  
- what `regimeView`, `driftView`, and `coherenceView` look like.

---

## 2. Example Input — `openGpuStack`

```json
{
  "substrate": {
    "nodes": [
      {
        "id": "substrate:rocm.queue.0",
        "label": "ROCm Queue 0",
        "tier": "S"
      },
      {
        "id": "substrate:rdp.endpoint.client",
        "label": "RDP Client Endpoint",
        "tier": "R"
      }
    ],
    "edges": [
      {
        "from": "substrate:rocm.queue.0",
        "to": "substrate:rdp.endpoint.client",
        "weight": 0.8
      }
    ]
  },

  "rendering": {
    "primitives": [
      {
        "id": "render:compose.frame",
        "stage": "compose-frame",
        "source": "substrate:rocm.queue.0",
        "target": "substrate:rdp.endpoint.client",
        "instability": 0.2
      }
    ],
    "paths": [
      {
        "label": "rdp:gpu→client.display",
        "regimes": ["S", "E", "R"],
        "direction": "SER"
      }
    ]
  },

  "execution": {
    "units": [
      {
        "id": "exec:rocm.queue.0",
        "label": "ROCm Queue 0",
        "regimes": ["S", "E"],
        "stability": 0.9,
        "alignment": 0.85
      }
    ],
    "overlays": [
      {
        "label": "exec:minor-jitter",
        "magnitude": 0.1
      }
    ]
  }
}
```

---

## 3. Adapter Views

### 3.1 Substrate Adapter Output (Structure)

```json
{
  "structure": {
    "nodes": [
      {
        "id": "substrate:rocm.queue.0",
        "label": "ROCm Queue 0",
        "tier": "S"
      },
      {
        "id": "substrate:rdp.endpoint.client",
        "label": "RDP Client Endpoint",
        "tier": "R"
      }
    ],
    "edges": [
      {
        "from": "substrate:rocm.queue.0",
        "to": "substrate:rdp.endpoint.client",
        "weight": 0.8
      }
    ]
  }
}
```

### 3.2 Rendering Drift Adapter Output (Drift)

```json
{
  "vectors": {
    "structural": [
      {
        "label": "compose-frame",
        "from": "substrate:rocm.queue.0",
        "to": "substrate:rdp.endpoint.client",
        "magnitude": 0.2
      }
    ],
    "energetic": [],
    "resonant": [],
    "cross": []
  },
  "fields": [
    {
      "label": "rdp:gpu→client.display",
      "regimes": ["S", "E", "R"],
      "direction": "SER"
    }
  ]
}
```

### 3.3 Execution Coherence Adapter Output (Geometry)

```json
{
  "alignment": [
    {
      "from": "substrate:rocm.queue.0",
      "to": "exec:rocm.queue.0",
      "magnitude": 0.85
    }
  ],
  "stability": [
    {
      "label": "exec:rocm.queue.0",
      "gradient": 0.9
    }
  ],
  "surfaces": [
    {
      "label": "ROCm Queue 0 Surface",
      "regimes": ["S", "E"]
    }
  ]
}
```

---

## 4. gpu-stack Output

The GPU Stack Operator wraps these views into a unified RTT/2 result:

```json
{
  "engine": "RTT/2",
  "operator": "gpu-stack",
  "version": "2026.1",

  "regimeView": {
    "structure": {
      "nodes": [
        {
          "id": "substrate:rocm.queue.0",
          "label": "ROCm Queue 0",
          "tier": "S"
        },
        {
          "id": "substrate:rdp.endpoint.client",
          "label": "RDP Client Endpoint",
          "tier": "R"
        }
      ],
      "edges": [
        {
          "from": "substrate:rocm.queue.0",
          "to": "substrate:rdp.endpoint.client",
          "weight": 0.8
        }
      ]
    }
  },

  "driftView": {
    "vectors": {
      "structural": [
        {
          "label": "compose-frame",
          "from": "substrate:rocm.queue.0",
          "to": "substrate:rdp.endpoint.client",
          "magnitude": 0.2
        }
      ],
      "energetic": [],
      "resonant": [],
      "cross": []
    },
    "fields": [
      {
        "label": "rdp:gpu→client.display",
        "regimes": ["S", "E", "R"],
        "direction": "SER"
      }
    ]
  },

  "coherenceView": {
    "alignment": [
      {
        "from": "substrate:rocm.queue.0",
        "to": "exec:rocm.queue.0",
        "magnitude": 0.85
      }
    ],
    "stability": [
      {
        "label": "exec:rocm.queue.0",
        "gradient": 0.9
      }
    ],
    "surfaces": [
      {
        "label": "ROCm Queue 0 Surface",
        "regimes": ["S", "E"]
      }
    ]
  }
}
```

---

## 5. Interpretation

- **Substrate:**  
  A simple S→R path from ROCm queue to RDP client endpoint, with strong structural weight (`0.8`).

- **Rendering Drift:**  
  A low‑instability (`0.2`) compose‑frame operation along a full SER path, indicating mild drift but stable routing.

- **Execution Coherence:**  
  High stability (`0.9`) and strong alignment (`0.85`) for the queue, with only minor jitter (`0.1` overlay).

Together, this capture shows a **well‑aligned, low‑drift GPU stack** as seen through RTT/2.

---

## 6. Version

**Capture Version:** `2026.1`  
Aligned with GPU Stack Operator, Protocol, and Schema.
