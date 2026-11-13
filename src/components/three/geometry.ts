import * as THREE from "three";

/**
 * A superellipse sampled at angle `t`. Used for the headband's rounded
 * rectangular cross-section so it catches light like a machined part.
 */
function superellipse(t: number, w: number, h: number, n = 3.4) {
  const c = Math.cos(t);
  const s = Math.sin(t);
  const x = Math.sign(c) * Math.pow(Math.abs(c), 2 / n) * (w / 2);
  const y = Math.sign(s) * Math.pow(Math.abs(s), 2 / n) * (h / 2);
  return new THREE.Vector2(x, y);
}

export interface BandResult {
  geometry: THREE.BufferGeometry;
  curve: THREE.CatmullRomCurve3;
}

/**
 * Sweeps a rounded-rectangle profile along a curve. The profile's local X is
 * radial thickness, local Y is band width (depth of the headband).
 */
export function createBandGeometry(
  points: Array<[number, number, number]>,
  width = 0.62,
  thickness = 0.1,
  segments = 120,
  cross = 16,
): BandResult {
  const curve = new THREE.CatmullRomCurve3(
    points.map((p) => new THREE.Vector3(...p)),
    false,
    "catmullrom",
    0.5,
  );
  const frames = curve.computeFrenetFrames(segments, false);
  const positions: number[] = [];
  const indices: number[] = [];

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const point = curve.getPointAt(t);
    const normal = frames.normals[i];
    const binormal = frames.binormals[i];
    for (let j = 0; j < cross; j++) {
      const angle = (j / cross) * Math.PI * 2;
      const profile = superellipse(angle, thickness, width);
      const vertex = point
        .clone()
        .addScaledVector(normal, profile.x)
        .addScaledVector(binormal, profile.y);
      positions.push(vertex.x, vertex.y, vertex.z);
    }
  }

  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < cross; j++) {
      const a = i * cross + j;
      const b = i * cross + ((j + 1) % cross);
      const c = (i + 1) * cross + j;
      const d = (i + 1) * cross + ((j + 1) % cross);
      indices.push(a, b, c, b, d, c);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return { geometry, curve };
}

/** Revolved earcup shell. Local +Y is the outward face. */
export function createCupShellGeometry() {
  const profile: Array<[number, number]> = [
    [0, 0.46],
    [0.24, 0.452],
    [0.46, 0.43],
    [0.64, 0.386],
    [0.8, 0.316],
    [0.91, 0.226],
    [0.975, 0.11],
    [1.0, -0.02],
    [1.0, -0.24],
    [0.955, -0.31],
    [0.86, -0.34],
  ];
  const geometry = new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    96,
  );
  geometry.computeVertexNormals();
  return geometry;
}

/** A shallow inset plate that sits on the outer face of the cup. */
export function createCapGeometry() {
  const profile: Array<[number, number]> = [
    [0, 0.06],
    [0.4, 0.055],
    [0.58, 0.03],
    [0.66, -0.01],
    [0.66, -0.08],
    [0.55, -0.12],
    [0, -0.12],
  ];
  return new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    96,
  );
}

/** Inner acoustic plate with a stepped lip. */
export function createInnerPlateGeometry() {
  const profile: Array<[number, number]> = [
    [0, 0.03],
    [0.3, 0.025],
    [0.55, 0.0],
    [0.63, -0.04],
    [0.63, -0.1],
    [0.52, -0.14],
    [0, -0.14],
  ];
  return new THREE.LatheGeometry(
    profile.map(([r, y]) => new THREE.Vector2(r, y)),
    80,
  );
}

export function createYokeCurve(side: 1 | -1) {
  return new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(side * 1.56, 0.32, 0),
      new THREE.Vector3(side * 1.9, 0.12, 0),
      new THREE.Vector3(side * 2.06, -0.3, 0),
      new THREE.Vector3(side * 2.02, -0.62, 0),
    ],
    false,
    "catmullrom",
    0.5,
  );
}

export const HEADPHONE_BOUNDS = {
  height: 4.9,
  width: 5.1,
  depth: 1.4,
};
