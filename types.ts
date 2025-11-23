export interface Atom {
  id: number;
  element: string; // 'H', 'C', 'O', 'N', etc.
  position: [number, number, number]; // x, y, z
  radius?: number; // Optional override
}

export interface Bond {
  source: number; // Atom ID
  target: number; // Atom ID
  order?: number; // 1, 2, 3 (for visualization thickness)
}

export interface MoleculeData {
  id: string;
  name: string;
  formula: string;
  atoms: Atom[];
  bonds: Bond[];
  description?: string; // Initial short description
}

export interface GeminiMoleculeInfo {
  description: string;
  properties: string[];
  funFact: string;
  safety: string;
}
