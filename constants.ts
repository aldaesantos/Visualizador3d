import { MoleculeData } from './types';

// Element Colors (CPK Coloring)
export const ELEMENT_COLORS: Record<string, string> = {
  H: '#FFFFFF', // White
  C: '#333333', // Dark Gray
  O: '#FF0D0D', // Red
  N: '#3050F8', // Blue
  Cl: '#1FF01F', // Green
  S: '#FFFF30', // Yellow
};

export const ELEMENT_RADII: Record<string, number> = {
  H: 0.35,
  C: 0.6,
  O: 0.5,
  N: 0.55,
  Cl: 0.7,
  S: 0.75,
};

// Helper to scale coordinates for better viewing
const s = 1.5; 

export const MOLECULES: MoleculeData[] = [
  {
    id: 'water',
    name: 'Água',
    formula: 'H₂O',
    atoms: [
      { id: 0, element: 'O', position: [0, 0, 0] },
      { id: 1, element: 'H', position: [0.75 * s, -0.45 * s, 0] },
      { id: 2, element: 'H', position: [-0.75 * s, -0.45 * s, 0] }
    ],
    bonds: [
      { source: 0, target: 1, order: 1 },
      { source: 0, target: 2, order: 1 }
    ]
  },
  {
    id: 'methane',
    name: 'Metano',
    formula: 'CH₄',
    atoms: [
      { id: 0, element: 'C', position: [0, 0, 0] },
      { id: 1, element: 'H', position: [0.63 * s, 0.63 * s, 0.63 * s] },
      { id: 2, element: 'H', position: [-0.63 * s, -0.63 * s, 0.63 * s] },
      { id: 3, element: 'H', position: [-0.63 * s, 0.63 * s, -0.63 * s] },
      { id: 4, element: 'H', position: [0.63 * s, -0.63 * s, -0.63 * s] }
    ],
    bonds: [
      { source: 0, target: 1, order: 1 }, { source: 0, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 }, { source: 0, target: 4, order: 1 }
    ]
  },
  {
    id: 'ammonia',
    name: 'Amônia',
    formula: 'NH₃',
    atoms: [
      { id: 0, element: 'N', position: [0, 0.2 * s, 0] },
      { id: 1, element: 'H', position: [0, -0.2 * s, 0.94 * s] },
      { id: 2, element: 'H', position: [0.81 * s, -0.2 * s, -0.47 * s] },
      { id: 3, element: 'H', position: [-0.81 * s, -0.2 * s, -0.47 * s] }
    ],
    bonds: [
      { source: 0, target: 1, order: 1 }, { source: 0, target: 2, order: 1 }, { source: 0, target: 3, order: 1 }
    ]
  },
  {
    id: 'ethanol',
    name: 'Etanol',
    formula: 'C₂H₆O',
    atoms: [
      { id: 0, element: 'C', position: [-0.8 * s, 0, 0] }, // C1
      { id: 1, element: 'C', position: [0.7 * s, 0, 0] },  // C2
      { id: 2, element: 'O', position: [1.4 * s, 0.8 * s, 0] }, // O
      { id: 3, element: 'H', position: [-1.1 * s, 0.5 * s, 0.9 * s] }, // H on C1
      { id: 4, element: 'H', position: [-1.1 * s, 0.5 * s, -0.9 * s] }, // H on C1
      { id: 5, element: 'H', position: [-1.1 * s, -1.0 * s, 0] }, // H on C1
      { id: 6, element: 'H', position: [1.0 * s, -0.5 * s, 0.9 * s] }, // H on C2
      { id: 7, element: 'H', position: [1.0 * s, -0.5 * s, -0.9 * s] }, // H on C2
      { id: 8, element: 'H', position: [2.3 * s, 0.5 * s, 0] }, // H on O
    ],
    bonds: [
      { source: 0, target: 1, order: 1 }, { source: 1, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 }, { source: 0, target: 4, order: 1 }, { source: 0, target: 5, order: 1 },
      { source: 1, target: 6, order: 1 }, { source: 1, target: 7, order: 1 },
      { source: 2, target: 8, order: 1 }
    ]
  },
  {
    id: 'methanal',
    name: 'Metanal (Formaldeído)',
    formula: 'CH₂O',
    atoms: [
      { id: 0, element: 'C', position: [0, 0, 0] },
      { id: 1, element: 'O', position: [0, 1.2 * s, 0] },
      { id: 2, element: 'H', position: [0.94 * s, -0.54 * s, 0] },
      { id: 3, element: 'H', position: [-0.94 * s, -0.54 * s, 0] }
    ],
    bonds: [
      { source: 0, target: 1, order: 2 },
      { source: 0, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 }
    ]
  },
  {
    id: 'chloroform',
    name: 'Clorofórmio',
    formula: 'CHCl₃',
    atoms: [
      { id: 0, element: 'C', position: [0, 0.5 * s, 0] },
      { id: 1, element: 'H', position: [0, 1.6 * s, 0] },
      { id: 2, element: 'Cl', position: [1.4 * s, -0.5 * s, 0] },
      { id: 3, element: 'Cl', position: [-0.7 * s, -0.5 * s, 1.2 * s] },
      { id: 4, element: 'Cl', position: [-0.7 * s, -0.5 * s, -1.2 * s] }
    ],
    bonds: [
      { source: 0, target: 1, order: 1 },
      { source: 0, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 },
      { source: 0, target: 4, order: 1 }
    ]
  },
  {
    id: 'propane',
    name: 'Propano',
    formula: 'C₃H₈',
    atoms: [
      { id: 0, element: 'C', position: [-1.2 * s, 0, 0] },
      { id: 1, element: 'C', position: [0, 0.8 * s, 0] },
      { id: 2, element: 'C', position: [1.2 * s, 0, 0] },
      // Hydrogens approximated for visual clarity
      { id: 3, element: 'H', position: [-1.2 * s, -0.6 * s, 0.9 * s] },
      { id: 4, element: 'H', position: [-1.2 * s, -0.6 * s, -0.9 * s] },
      { id: 5, element: 'H', position: [-2.1 * s, 0.5 * s, 0] },
      { id: 6, element: 'H', position: [0, 1.4 * s, 0.9 * s] },
      { id: 7, element: 'H', position: [0, 1.4 * s, -0.9 * s] },
      { id: 8, element: 'H', position: [1.2 * s, -0.6 * s, 0.9 * s] },
      { id: 9, element: 'H', position: [1.2 * s, -0.6 * s, -0.9 * s] },
      { id: 10, element: 'H', position: [2.1 * s, 0.5 * s, 0] },
    ],
    bonds: [
      { source: 0, target: 1, order: 1 }, { source: 1, target: 2, order: 1 },
      { source: 0, target: 3, order: 1 }, { source: 0, target: 4, order: 1 }, { source: 0, target: 5, order: 1 },
      { source: 1, target: 6, order: 1 }, { source: 1, target: 7, order: 1 },
      { source: 2, target: 8, order: 1 }, { source: 2, target: 9, order: 1 }, { source: 2, target: 10, order: 1 }
    ]
  },
  {
      id: 'ethene',
      name: 'Eteno',
      formula: 'C₂H₄',
      atoms: [
        { id: 0, element: 'C', position: [-0.67 * s, 0, 0] },
        { id: 1, element: 'C', position: [0.67 * s, 0, 0] },
        { id: 2, element: 'H', position: [-1.2 * s, 0.9 * s, 0] },
        { id: 3, element: 'H', position: [-1.2 * s, -0.9 * s, 0] },
        { id: 4, element: 'H', position: [1.2 * s, 0.9 * s, 0] },
        { id: 5, element: 'H', position: [1.2 * s, -0.9 * s, 0] }
      ],
      bonds: [
          { source: 0, target: 1, order: 2},
          { source: 0, target: 2, order: 1}, { source: 0, target: 3, order: 1},
          { source: 1, target: 4, order: 1}, { source: 1, target: 5, order: 1}
      ]
  },
  {
    id: 'ethyl_ether',
    name: 'Éter Etílico',
    formula: 'C₄H₁₀O',
    atoms: [
        { id: 0, element: 'O', position: [0, 0.5 * s, 0] },
        { id: 1, element: 'C', position: [-1.2 * s, 0, 0] },
        { id: 2, element: 'C', position: [1.2 * s, 0, 0] },
        { id: 3, element: 'C', position: [-2.2 * s, 0.8 * s, 0] },
        { id: 4, element: 'C', position: [2.2 * s, 0.8 * s, 0] },
        // Simplified Hydrogens
        { id: 5, element: 'H', position: [-1.2 * s, -1.0 * s, 0] },
        { id: 6, element: 'H', position: [1.2 * s, -1.0 * s, 0] },
        // ... more H would make it cluttered, these show the backbone
    ],
    bonds: [
        { source: 0, target: 1, order: 1 }, { source: 0, target: 2, order: 1 },
        { source: 1, target: 3, order: 1 }, { source: 2, target: 4, order: 1 },
        { source: 1, target: 5, order: 1 }, { source: 2, target: 6, order: 1 }
    ]
  },
  {
    id: 'carbon_dioxide',
    name: 'Dióxido de Carbono',
    formula: 'CO₂',
    atoms: [
        { id: 0, element: 'C', position: [0, 0, 0] },
        { id: 1, element: 'O', position: [-1.2 * s, 0, 0] },
        { id: 2, element: 'O', position: [1.2 * s, 0, 0] },
    ],
    bonds: [
        { source: 0, target: 1, order: 2 },
        { source: 0, target: 2, order: 2 }
    ]
  },
  {
    id: 'acetylene',
    name: 'Etino (Acetileno)',
    formula: 'C₂H₂',
    atoms: [
        { id: 0, element: 'C', position: [-0.6 * s, 0, 0] },
        { id: 1, element: 'C', position: [0.6 * s, 0, 0] },
        { id: 2, element: 'H', position: [-1.6 * s, 0, 0] },
        { id: 3, element: 'H', position: [1.6 * s, 0, 0] },
    ],
    bonds: [
        { source: 0, target: 1, order: 3 }, // Triple bond
        { source: 0, target: 2, order: 1 },
        { source: 1, target: 3, order: 1 }
    ]
  },
  {
    id: 'ethyl_acetate',
    name: 'Etanoato de Etila',
    formula: 'C₄H₈O₂',
    atoms: [
        // Acetate group
        { id: 0, element: 'C', position: [-0.5 * s, 0, 0] }, // Carbonyl C
        { id: 1, element: 'O', position: [-0.5 * s, 1.2 * s, 0] }, // Carbonyl O (Double)
        { id: 2, element: 'O', position: [0.8 * s, -0.5 * s, 0] }, // Ester O
        { id: 3, element: 'C', position: [-1.8 * s, -0.6 * s, 0] }, // Methyl C
        // Ethyl group
        { id: 4, element: 'C', position: [2.0 * s, 0, 0] },
        { id: 5, element: 'C', position: [3.0 * s, 1.0 * s, 0] },
    ],
    bonds: [
        { source: 0, target: 1, order: 2 }, // C=O
        { source: 0, target: 2, order: 1 }, // C-O
        { source: 0, target: 3, order: 1 }, // C-C
        { source: 2, target: 4, order: 1 }, // O-C
        { source: 4, target: 5, order: 1 }, // C-C
    ]
  },
  {
    id: 'benzene',
    name: 'Benzeno',
    formula: 'C₆H₆',
    atoms: [
        // Ring
        { id: 0, element: 'C', position: [1.4 * s, 0, 0] },
        { id: 1, element: 'C', position: [0.7 * s, 1.2 * s, 0] },
        { id: 2, element: 'C', position: [-0.7 * s, 1.2 * s, 0] },
        { id: 3, element: 'C', position: [-1.4 * s, 0, 0] },
        { id: 4, element: 'C', position: [-0.7 * s, -1.2 * s, 0] },
        { id: 5, element: 'C', position: [0.7 * s, -1.2 * s, 0] },
        // H
        { id: 6, element: 'H', position: [2.4 * s, 0, 0] },
        { id: 7, element: 'H', position: [1.2 * s, 2.1 * s, 0] },
        { id: 8, element: 'H', position: [-1.2 * s, 2.1 * s, 0] },
        { id: 9, element: 'H', position: [-2.4 * s, 0, 0] },
        { id: 10, element: 'H', position: [-1.2 * s, -2.1 * s, 0] },
        { id: 11, element: 'H', position: [1.2 * s, -2.1 * s, 0] },
    ],
    bonds: [
        // Aromatic ring often represented as alternating double/single or 1.5. 
        // We will do alternating for viz
        { source: 0, target: 1, order: 2 }, { source: 1, target: 2, order: 1 },
        { source: 2, target: 3, order: 2 }, { source: 3, target: 4, order: 1 },
        { source: 4, target: 5, order: 2 }, { source: 5, target: 0, order: 1 },
        
        { source: 0, target: 6, order: 1 }, { source: 1, target: 7, order: 1 },
        { source: 2, target: 8, order: 1 }, { source: 3, target: 9, order: 1 },
        { source: 4, target: 10, order: 1 }, { source: 5, target: 11, order: 1 }
    ]
  }
];