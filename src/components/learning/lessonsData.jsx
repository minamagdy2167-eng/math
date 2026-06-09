export const lessonsData = [
  {
    number: 1,
    unit: 1,
    title: "Moment of a Force About a Point in 2-D System",
    description: "Learn how to calculate the rotational effect of a force about a point using vectors and magnitudes.",
    videoUrl: "https://www.youtube.com/watch?v=WA0b7M4XIv4&t=687s",
    concepts: [
      {
        title: "Vector Definition",
        content: "The moment of a force is calculated as M⃗_O = r⃗ × F⃗ where r⃗ is the position vector from the point of rotation (O) to any point on the line of action of the force."
      },
      {
        title: "Magnitude Formula",
        content: "||M⃗_O|| = F × L, where L is the perpendicular distance from the point to the line of action."
      },
      {
        title: "Sign Convention",
        content: "Counter-clockwise rotation is positive (+); Clockwise rotation is negative (-)."
      },
      {
        title: "Important Note",
        content: "The moment of a force about a point on its own line of action is zero."
      }
    ],
    examples: [
      {
        id: "L1-EX1",
        problem: "F⃗ = i⃗ - 3j⃗ acts at A(-1,2). Find the moment about B(2, 0) and the perpendicular length (L) from B.",
        solution: [
          "Find position vector: r⃗ = BA⃗ = A - B = (-1-2, 2-0) = (-3, 2)",
          "Calculate moment: M⃗_B = r⃗ × F⃗ = (-3)(−3) − (2)(1) = 9 - 2 = 7",
          "M⃗_B = 7k⃗",
          "Find perpendicular length: L = ||M⃗_B|| / ||F⃗|| = 7 / √(1² + (-3)²) = 7/√10 length units"
        ],
        answer: "M⃗_B = 7k⃗, L = 7/√10 units"
      },
      {
        id: "L1-EX2",
        problem: "Force F⃗ = -3i⃗ + kj⃗ acts at A(3,1). Moment about B(-2,4) is 6k⃗. Find k.",
        solution: [
          "Position vector: r⃗ = A - B = (3-(-2), 1-4) = (5, -3)",
          "Moment: M⃗_B = (5)(k) - (-3)(-3) = 5k - 9",
          "Given M⃗_B = 6k⃗, so 5k - 9 = 6",
          "5k = 15",
          "k = 3"
        ],
        answer: "k = 3"
      },
      {
        id: "L1-EX3",
        problem: "F⃗ = i⃗ + j⃗ acts at A(2,2). Prove moment about origin is zero.",
        solution: [
          "Position vector: r⃗ = (2, 2)",
          "Force vector: F⃗ = (1, 1)",
          "Moment: M⃗_O = (2)(1) - (2)(1) = 2 - 2 = 0",
          "The moment is zero because the line of action passes through the origin."
        ],
        answer: "M⃗_O = 0 (line of action passes through origin)"
      },
      {
        id: "L1-EX4",
        problem: "F⃗₁ = i⃗ - j⃗ at A(3,0) and F⃗₂ = mi⃗ + 2j⃗ at B(0,3). If sum of moments about origin is zero, find m.",
        solution: [
          "M⃗₁ = r⃗₁ × F⃗₁ = (3,0) × (1,-1) = (3)(-1) - (0)(1) = -3",
          "M⃗₂ = r⃗₂ × F⃗₂ = (0,3) × (m,2) = (0)(2) - (3)(m) = -3m",
          "Sum of moments = 0: -3 + (-3m) = 0",
          "-3 - 3m = 0",
          "m = -1"
        ],
        answer: "m = -1"
      }
    ],
    exercises: [
      {
        id: "L1-E1",
        problem: "The force F⃗ = 3i⃗ + 4j⃗ acts at A(3,0). Find the moment vector about B(-2,4) and the perpendicular length from B.",
        hint: "First find r⃗ = A - B, then calculate the cross product.",
        solution: {
          steps: [
            "Vector r⃗: r⃗ = BA⃗ = A - B = (3 - (-2), 0 - 4) = (5, -4)",
            "Moment M⃗_B: M⃗_B = r⃗ × F⃗ = (5, -4) × (3, 4)",
            "M⃗_B = (5)(4) - (-4)(3) = 20 + 12 = 32",
            "Therefore M⃗_B = 32k⃗",
            "Magnitude of force: ||F⃗|| = √(3² + 4²) = √(9 + 16) = 5",
            "Perpendicular length: L = ||M⃗_B|| / ||F⃗|| = 32 / 5 = 6.4 length units"
          ],
          answer: "M⃗_B = 32k⃗, L = 6.4 length units"
        }
      },
      {
        id: "L1-E2",
        problem: "Forces F⃗₁ = i⃗ + 6j⃗ and F⃗₂ = 3i⃗ - 2j⃗ act at A(-1,2). Find the moment vector of the two forces with respect to point B(0,7).",
        hint: "Add the forces first to get resultant, then find moment of resultant.",
        solution: {
          steps: [
            "Resultant Force: R⃗ = F⃗₁ + F⃗₂ = (1+3)i⃗ + (6-2)j⃗ = 4i⃗ + 4j⃗",
            "Vector r⃗: r⃗ = BA⃗ = A - B = (-1-0, 2-7) = (-1, -5)",
            "Moment: M⃗_B = r⃗ × R⃗ = (-1, -5) × (4, 4)",
            "M⃗_B = (-1)(4) - (-5)(4) = -4 + 20 = 16"
          ],
          answer: "M⃗_B = 16k⃗"
        }
      },
      {
        id: "L1-E3",
        problem: "Forces F⃗₁ = 5i⃗ + j⃗ and F⃗₂ = -i⃗ + 2j⃗ act at A(2,5). Find the moment vector with respect to B(1,1).",
        hint: "Combine forces first, then use moment formula.",
        solution: {
          steps: [
            "Resultant: R⃗ = (5-1)i⃗ + (1+2)j⃗ = 4i⃗ + 3j⃗",
            "Vector r⃗: BA⃗ = (2-1, 5-1) = (1, 4)",
            "Moment: M⃗_B = (1, 4) × (4, 3) = (1)(3) - (4)(4) = 3 - 16 = -13"
          ],
          answer: "M⃗_B = -13k⃗"
        }
      },
      {
        id: "L1-E4",
        problem: "Force F⃗ = mi⃗ + nj⃗ acts at A(4,2). If moment about origin is -15k⃗ and moment about B(0,5) is 15k⃗, find m, n.",
        hint: "Set up two equations from the two moment conditions.",
        solution: {
          steps: [
            "Moment about Origin: r⃗_O = (4, 2), M⃗_O = (4, 2) × (m, n) = 4n - 2m = -15 ... (1)",
            "Moment about B: r⃗_B = A - B = (4, -3), M⃗_B = (4, -3) × (m, n) = 4n + 3m = 15 ... (2)",
            "Subtract (1) from (2): (4n + 3m) - (4n - 2m) = 15 - (-15)",
            "5m = 30, therefore m = 6",
            "Substitute into (1): 4n - 12 = -15, so 4n = -3, therefore n = -0.75"
          ],
          answer: "m = 6, n = -0.75"
        }
      },
      {
        id: "L1-E5",
        problem: "Force F⃗ = 6i⃗ + 8j⃗ acts at A(-1,2). Find the moment vector with respect to B(2,5).",
        hint: "Calculate r⃗ = A - B, then find cross product.",
        solution: {
          steps: [
            "Vector r⃗: BA⃗ = (-1-2, 2-5) = (-3, -3)",
            "Moment: M⃗_B = (-3, -3) × (6, 8)",
            "M⃗_B = (-3)(8) - (-3)(6) = -24 + 18 = -6"
          ],
          answer: "M⃗_B = -6k⃗"
        }
      }
    ]
  },
  {
    number: 2,
    unit: 1,
    title: "Theorem of Moments",
    description: "Understand how the sum of moments equals the moment of the resultant force.",
    videoUrl: "https://www.youtube.com/watch?v=eRxHXdfqPTc&t=12s",
    concepts: [
      {
        title: "Main Theorem",
        content: "The sum of moments of a set of forces about a point equals the moment of their resultant about the same point."
      },
      {
        title: "Parallel Line of Action",
        content: "If M⃗_O = M⃗_H, the line of action of the resultant is parallel to OH⃗."
      },
      {
        title: "Bisecting Line of Action",
        content: "If M⃗_O = -M⃗_H, the line of action of the resultant bisects OH⃗."
      }
    ],
    examples: [
      {
        id: "L2-EX1",
        problem: "Forces F⃗₁ = 2i⃗ + 3j⃗ and F⃗₂ = -i⃗ + 4j⃗ act at A(-2,5). Find sum of moments about origin and perpendicular distance.",
        solution: [
          "Resultant: R⃗ = F⃗₁ + F⃗₂ = (2-1, 3+4) = (1, 7)",
          "Position vector: r⃗ = (-2, 5)",
          "Moment: M⃗_O = r⃗ × R⃗ = (-2)(7) - (5)(1) = -14 - 5 = -19",
          "M⃗_O = -19k⃗",
          "||R⃗|| = √(1² + 7²) = √50 = 5√2",
          "Perpendicular distance L = 19 / 5√2 = 19√2/10"
        ],
        answer: "M⃗_O = -19k⃗, L = 19√2/10 units"
      },
      {
        id: "L2-EX2",
        problem: "Rectangle ABCD (AB=8, BC=12). Forces 16, 14, F, K on sides. Sum of moments about C and Center = 0. Find F, K.",
        solution: [
          "Let A be at origin, forces on AB(16→), BC(14↑), CD(F←), DA(K↓)",
          "Moments about C: 16(12) - 14(0) + F(0) - K(8) = 0",
          "192 = 8K → K = 24",
          "Moments about Center M(4,6): 16(6) - 14(4) + F(6) - 24(4) = 0",
          "96 - 56 + 6F - 96 = 0",
          "6F = 56 → F ≈ 8"
        ],
        answer: "K = 24, F = 8"
      }
    ],
    exercises: [
      {
        id: "L2-E1",
        problem: "Forces F⃗₁ = 5i⃗ + j⃗, F⃗₂ = -i⃗ + 2j⃗ act at A(2,5). Find moment of resultant about B(1,1) and perpendicular distance.",
        hint: "Find resultant first, then calculate its moment."
      },
      {
        id: "L2-E2",
        problem: "Forces F⃗₁ = 5i⃗ - 4j⃗, F⃗₂ = i⃗ - 4j⃗ act at origin. Prove resultant passes through A(-3,4) and find moment about B(2,-5).",
        hint: "If resultant passes through A, moment about A is zero."
      },
      {
        id: "L2-E3",
        problem: "Rectangle ABCD (AB=8, BC=4). Forces 12, 10, F, K on sides. Sum of moments about A and C vanishes. Find F, K.",
        hint: "Set up two equations using moments about A and C."
      },
      {
        id: "L2-E4",
        problem: "Square ABCD, forces 6, F, K, 3 on sides. Sum of moments about B and Center M vanishes. Find F, K.",
        hint: "Use the property that moments about two points are zero."
      }
    ]
  },
  {
    number: 3,
    unit: 1,
    title: "Moment in 3-D Coordinate System",
    description: "Extend moment calculations to three dimensions using determinants.",
    videoUrl: "https://www.youtube.com/watch?v=UdcRhBnLxIo",
    concepts: [
      {
        title: "3D Moment Formula",
        content: "For F⃗ = (Fₓ, Fᵧ, F_z) acting at point A, the moment about origin uses the determinant formula with i⃗, j⃗, k⃗ components."
      },
      {
        title: "Determinant Method",
        content: "M⃗ = r⃗ × F⃗ calculated using a 3×3 determinant with position and force components."
      }
    ],
    examples: [
      {
        id: "L3-EX1",
        problem: "F⃗ = 2i⃗ - j⃗ + 3k⃗ at A(-3,1,2). Find moment about B(2,2,-1).",
        solution: [
          "Position vector: r⃗ = A - B = (-3-2, 1-2, 2-(-1)) = (-5, -1, 3)",
          "Using determinant expansion:",
          "M⃗ₓ = (-1)(3) - (3)(-1) = -3 + 3 = 0",
          "M⃗ᵧ = -[(−5)(3) - (3)(2)] = -[-15 - 6] = 21",
          "M⃗_z = (−5)(−1) - (−1)(2) = 5 + 2 = 7",
          "M⃗ = 21j⃗ + 7k⃗",
          "Distance L = ||M⃗|| / ||F⃗|| = √(441+49) / √(4+1+9) = √490/√14 = √35"
        ],
        answer: "M⃗ = 21j⃗ + 7k⃗, L = √35 units"
      },
      {
        id: "L3-EX2",
        problem: "F⃗ = Ki⃗ + 4j⃗ - k⃗ at A(1,2,2). Y-component of moment is 7. Find K.",
        solution: [
          "r⃗ = (1, 2, 2)",
          "M⃗ᵧ = -(xF_z - zFₓ) = -[(1)(-1) - (2)(K)]",
          "M⃗ᵧ = -(-1 - 2K) = 1 + 2K",
          "Given M⃗ᵧ = 7: 1 + 2K = 7",
          "K = 3"
        ],
        answer: "K = 3"
      }
    ],
    exercises: [
      {
        id: "L3-E1",
        problem: "F⃗ = 2i⃗ + 3j⃗ - k⃗ at A(1,-1,4). Find moment about origin, and moment about B(2,-3,1).",
        hint: "Calculate the determinant for each point separately."
      },
      {
        id: "L3-E2",
        problem: "F⃗ = 2i⃗ + Lj⃗ - k⃗ at A(4,-2,0). Moment about origin is 2i⃗ + 4j⃗ + 16k⃗. Find L.",
        hint: "Set up equations for each component of the moment."
      },
      {
        id: "L3-E3",
        problem: "F⃗ = 2i⃗ + bj⃗ + k⃗ at A(-1,3,-2). Moment about X-axis is 3 units. Find b and perpendicular distance from origin.",
        hint: "Moment about X-axis is the i⃗ component."
      },
      {
        id: "L3-E4",
        problem: "F⃗ = 15i⃗ - 25j⃗ + 40k⃗ at A(-3,-3,2). Find moment component about Y-axis.",
        hint: "Calculate only the j⃗ component of the moment."
      }
    ]
  },
  {
    number: 4,
    unit: 1,
    title: "Resultant of Two Parallel Forces",
    description: "Learn to find the resultant of parallel forces acting in same or opposite directions.",
    videoUrl: "https://www.youtube.com/watch?v=qmdSXkxDeqY",
    concepts: [
      {
        title: "Same Direction",
        content: "R = F₁ + F₂. Point of action C divides AB inversely as forces: F₁ × AC = F₂ × BC"
      },
      {
        title: "Opposite Directions",
        content: "R = |F₁ - F₂| (Direction of larger force). Point of action C is outside AB: F₁ × AC = F₂ × BC"
      }
    ],
    examples: [
      {
        id: "L4-EX1",
        problem: "Same direction forces 20, 30 N. AB = 100 cm. Find resultant.",
        solution: [
          "Resultant magnitude: R = 20 + 30 = 50 N",
          "Position: Let C be at distance x from B",
          "Using inverse proportion: 20 × (100-x) = 30 × x",
          "2000 - 20x = 30x",
          "2000 = 50x",
          "x = 40 cm from B"
        ],
        answer: "R = 50 N, 40 cm from B (or 60 cm from A)"
      },
      {
        id: "L4-EX2",
        problem: "Opposite directions. F₁ > F₂. Resultant 90 N at C. AB=36, AC=16. Find forces.",
        solution: [
          "R = F₁ - F₂ = 90 (since F₁ > F₂)",
          "Since C is outside AB: BC = AC + AB = 16 + 36 = 52",
          "Moment equation: F₁ × 16 = F₂ × 52",
          "From R = 90: F₁ = 90 + F₂",
          "(90 + F₂) × 16 = F₂ × 52",
          "1440 + 16F₂ = 52F₂",
          "1440 = 36F₂",
          "F₂ = 40 N, F₁ = 130 N"
        ],
        answer: "F₁ = 130 N, F₂ = 40 N"
      },
      {
        id: "L4-EX3",
        problem: "Forces 12, F. Resultant 3 at distance 30 cm from 12. Find F.",
        solution: [
          "Since R = 3 < 12, forces must be opposite",
          "Case 1 (12 > F): R = 12 - F = 3 → F = 9 N",
          "Case 2 (F > 12): R = F - 12 = 3 → F = 15 N",
          "Both cases are valid depending on geometry"
        ],
        answer: "F = 9 N or F = 15 N"
      }
    ],
    exercises: [
      {
        id: "L4-E1",
        problem: "Forces 4, 6 N same direction, AB=25. Find Resultant position.",
        hint: "Use inverse proportion rule."
      },
      {
        id: "L4-E2",
        problem: "Forces 7, 12 N opposite directions, AB=20. Find Resultant.",
        hint: "Subtract forces and find position outside AB."
      },
      {
        id: "L4-E3",
        problem: "Resultant 350 N. Force 500 N acts 51 cm from resultant. Find second force and distance between forces.",
        hint: "Consider both same and opposite direction cases."
      },
      {
        id: "L4-E4",
        problem: "Opposite forces 7, 12 N. Find magnitude of resultant.",
        hint: "Simply subtract the smaller from larger."
      },
      {
        id: "L4-E5",
        problem: "Same direction forces 7, 10 N, AB=51. Find AC (distance from A to resultant).",
        hint: "Use moment equation about C."
      }
    ]
  },
  {
    number: 5,
    unit: 1,
    title: "Resultant of a Set of Parallel Forces",
    description: "Calculate resultant of multiple parallel forces using algebraic sum and moments.",
    videoUrl: "https://www.youtube.com/watch?v=L783UdTDK1Y",
    concepts: [
      {
        title: "Magnitude",
        content: "Algebraic sum of forces (Forces in one direction minus Forces in opposite)."
      },
      {
        title: "Position",
        content: "Sum of moments of all forces about a point = Moment of the resultant about that point."
      }
    ],
    examples: [
      {
        id: "L5-EX1",
        problem: "Forces 5, 7, 9 N upwards at distances 0, 30, 70 cm from A. Find resultant.",
        solution: [
          "Resultant magnitude: R = 5 + 7 + 9 = 21 N (upward)",
          "Taking moments about A:",
          "5(0) + 7(30) + 9(70) = 21 × X",
          "0 + 210 + 630 = 21X",
          "840 = 21X",
          "X = 40 cm from A"
        ],
        answer: "R = 21 N upward, 40 cm from A"
      },
      {
        id: "L5-EX2",
        problem: "Forces 16, 18 N up; 8, 14 N down. Find resultant.",
        solution: [
          "R = (16 + 18) - (8 + 14) = 34 - 22 = 12 N upward",
          "Use moments about any convenient point to find position"
        ],
        answer: "R = 12 N upward"
      }
    ],
    exercises: [
      {
        id: "L5-E1",
        problem: "Set of parallel forces perpendicular to AB (Forces 6, 4, 3, 1, 5 at intervals). Find magnitude, direction, and point of action.",
        hint: "Add forces algebraically, then use moments to find position."
      },
      {
        id: "L5-E2",
        problem: "Forces 60, 30, 50, 80, 40 gm.wt on line ABCDE. First three same direction, others opposite. Find resultant.",
        hint: "Assign positive to one direction, negative to other."
      },
      {
        id: "L5-E3",
        problem: "Forces 3, 5, 7, 1 N spaced by 1 cm. Find resultant.",
        hint: "Calculate total force and use moments."
      }
    ]
  },
  {
    number: 6,
    unit: 1,
    title: "Equilibrium of Coplanar Parallel Forces",
    description: "Apply equilibrium conditions for bodies under parallel forces.",
    videoUrl: "https://www.youtube.com/watch?v=4pCvFzooclE",
    concepts: [
      {
        title: "First Condition",
        content: "Sum of forces = 0 (Upward forces = Downward forces)"
      },
      {
        title: "Second Condition",
        content: "Sum of moments about any point = 0"
      }
    ],
    examples: [
      {
        id: "L6-EX1",
        problem: "Beam with total load 40 kg supported at two points. Find reactions.",
        solution: [
          "Let reactions be r and T",
          "Equilibrium: r + T = 40",
          "Sum of moments about one support = 0",
          "Solve to get T = 10, r = 30"
        ],
        answer: "r = 30 kg.wt, T = 10 kg.wt"
      },
      {
        id: "L6-EX2",
        problem: "Rod AB length 40 cm, weight 6 kg. Supports at C and D. About to rotate if 9 kg suspended from A. Find positions.",
        solution: [
          "'About to rotate' means reaction at far support = 0",
          "Let r₂ = 0 (at D)",
          "Take moments about C",
          "Solve for distances: 8 cm and 12 cm"
        ],
        answer: "C is 8 cm from A, D is 20 cm from A"
      },
      {
        id: "L6-EX3",
        problem: "Rod length 60 cm, weight 3.6 kg. Supports at 5 cm and 10 cm from ends. Find reactions.",
        solution: [
          "r₁ + r₂ = 3.6 (equilibrium)",
          "Taking moments about support 1:",
          "3.6 × 25 = r₂ × 45",
          "r₂ = 2 kg.wt, r₁ = 1.6 kg.wt"
        ],
        answer: "r₁ = 1.6 kg.wt, r₂ = 2 kg.wt"
      }
    ],
    exercises: [
      {
        id: "L6-E1",
        problem: "Wooden board 200 cm, weight 16 kg. Supports at 20 cm from ends. Box 24 kg at 60 cm from A. Find pressure on supports.",
        hint: "Use ΣF = 0 and ΣM = 0."
      },
      {
        id: "L6-E2",
        problem: "Board mass 10 kg, length 4 m. Child 50 kg. Where must child stand for equal reactions?",
        hint: "If reactions are equal, they each carry half the total weight."
      },
      {
        id: "L6-E3",
        problem: "Rod AB 90 cm, weight 50 N. Supports at A and C. Weight 20 N added. Find pressures.",
        hint: "Apply equilibrium conditions."
      },
      {
        id: "L6-E4",
        problem: "Rod 2 m, mass 75 kg. Supports at ends. Weight 15 kg at 50 cm from one end. Find reactions.",
        hint: "Take moments about one support."
      }
    ]
  },
  {
    number: 7,
    unit: 1,
    title: "Couple",
    description: "Understand couples - pairs of equal, opposite, parallel forces.",
    videoUrl: "https://www.youtube.com/watch?v=cx0yaMOmB6I",
    concepts: [
      {
        title: "Definition",
        content: "A Couple consists of two forces of equal magnitude, opposite direction, and different lines of action."
      },
      {
        title: "Moment of Couple",
        content: "M = F × r (constant regardless of point chosen). r is perpendicular distance between forces."
      },
      {
        title: "Equivalence",
        content: "Two couples are equivalent if M₁ = M₂."
      },
      {
        title: "Equilibrium",
        content: "Two couples equilibrate if M₁ + M₂ = 0."
      }
    ],
    examples: [
      {
        id: "L7-EX1",
        problem: "F⃗₁ = 2i⃗ - bj⃗ and F⃗₂ = ai⃗ - 5j⃗ form a couple. Find a, b.",
        solution: [
          "For a couple: F⃗₁ = -F⃗₂",
          "2 = -a → a = -2",
          "-b = -(-5) → b = 5"
        ],
        answer: "a = -2, b = 5"
      },
      {
        id: "L7-EX2",
        problem: "Moment 350 N.m, Force 70 N. Find arm.",
        solution: [
          "M = F × r",
          "350 = 70 × r",
          "r = 5 m"
        ],
        answer: "r = 5 m"
      },
      {
        id: "L7-EX3",
        problem: "F⃗₁ = -3i⃗ + 2j⃗ at A(1,1), F⃗₂ at B(-1,-2). Find moment.",
        solution: [
          "F⃗₂ = -F⃗₁ = 3i⃗ - 2j⃗",
          "AB⃗ = B - A = (-2, -3)",
          "M⃗ = AB⃗ × F⃗₂ = (-2)(-2) - (-3)(3) = 4 + 9 = 13",
          "M⃗ = 13k⃗",
          "Perpendicular distance = |M|/|F| = 13/√13 = √13"
        ],
        answer: "M⃗ = 13k⃗, arm = √13 units"
      }
    ],
    exercises: [
      {
        id: "L7-E1",
        problem: "F⃗₁ = 3i⃗ - bj⃗, F⃗₂ = ai⃗ - 5j⃗ form a couple. Find a, b.",
        hint: "Use F⃗₁ = -F⃗₂"
      },
      {
        id: "L7-E2",
        problem: "Couple (Force 12 N, arm 8 cm) is equivalent to Couple (Arm 6 cm). Find force magnitude.",
        hint: "Equal moments means F₁r₁ = F₂r₂"
      },
      {
        id: "L7-E3",
        problem: "Find 2a+b for vectors forming a couple.",
        hint: "First establish the couple condition."
      },
      {
        id: "L7-E4",
        problem: "Equilibrium couples, find M⃗₁ - M⃗₂.",
        hint: "For equilibrium, M₁ + M₂ = 0"
      },
      {
        id: "L7-E5",
        problem: "Find force given points and moment vector k⃗.",
        hint: "Use M = r × F formula."
      }
    ]
  },
  {
    number: 8,
    unit: 1,
    title: "Resultant Couple",
    description: "Combine multiple couples into a single resultant couple - covering all cases.",
    videoUrl: "https://drive.google.com/file/d/1YmcHeTf33r1mJ8TkO1wH7z6tSjPA-FbV/view",
    concepts: [
      {
        title: "Resultant Moment",
        content: "M = M₁ + M₂ + M₃ + ... (Algebraic sum of all couple moments)"
      },
      {
        title: "Sign Convention",
        content: "Counter-clockwise couples are positive, clockwise couples are negative."
      }
    ],
    examples: [
      {
        id: "L8-EX1",
        problem: "Square ABCD side 30 cm. Force pairs (4,4), (6,6), (2√2, 2√2) form couples. Find resultant.",
        solution: [
          "M₁ = 4 × 30 = 120 N.cm (assume CCW)",
          "M₂ = 6 × 30 = 180 N.cm (CW → negative)",
          "M₃ = 2√2 × 30√2 = 120 N.cm (CW → negative)",
          "M = 120 - 180 - 120 = -180 N.cm"
        ],
        answer: "M = -180 N.cm (clockwise)"
      },
      {
        id: "L8-EX2",
        problem: "Parallelogram with angle 60°. Forces 6 and 9 N form couples. Find resultant moment.",
        solution: [
          "Perpendicular distance = side × sin(60°) = 8 × sin(60°) = 4√3",
          "M₁ = 6 × 4√3 = 24√3 (assume direction)",
          "M₂ = 9 × 3√3 = 27√3 (opposite direction)",
          "M = -24√3 + 27√3 = 3√3 N.cm"
        ],
        answer: "M = 3√3 N.cm"
      },
      {
        id: "L8-EX3",
        problem: "Rectangle with forces 15, 30 N. Find forces perpendicular to AC to equilibrate.",
        solution: [
          "Calculate resultant moment of existing couples",
          "Resultant = -300 N.cm",
          "To equilibrate: new couple must be +300",
          "F × AC = 300"
        ],
        answer: "Equilibrating force depends on AC length"
      }
    ],
    exercises: [
      {
        id: "L8-E1",
        problem: "Square with forces 12, 8, 12, 8 on sides forming couples. Find algebraic measure of the couple.",
        hint: "Identify the couples and their directions."
      },
      {
        id: "L8-E2",
        problem: "Rectangle AB=12, AD=5. Forces 39 N act at A and C along BD direction. Find norm of moment.",
        hint: "Find perpendicular distance between lines of action."
      },
      {
        id: "L8-E3",
        problem: "Rectangle AB=30, BC=40. Forces 15, 30 on sides. Find moment. Then find two forces perpendicular to AC to equilibrate.",
        hint: "Calculate AC using Pythagorean theorem."
      },
      {
        id: "L8-E4",
        problem: "Parallelogram (∠C = 60°). Forces 8, 10 on sides. Prove equivalent to couple and find moment.",
        hint: "Use perpendicular distance = side × sin(angle)."
      }
    ]
  },
  {
    number: 9,
    unit: 2,
    title: "Differentiation of Vector Functions",
    description: "Learn velocity and acceleration as derivatives of displacement and velocity with respect to time.",
    concepts: [
      {
        title: "Velocity from Displacement",
        content: "If S⃗ = f(t), then V⃗ = dS/dt (velocity is the rate of change of displacement)"
      },
      {
        title: "Acceleration from Velocity", 
        content: "If V⃗ = f(t), then a⃗ = dV/dt (acceleration is the rate of change of velocity)"
      },
      {
        title: "Acceleration vs Deceleration",
        content: "Motion is accelerated if V × a > 0 (same direction). Motion is decelerated if V × a < 0 (opposite directions)."
      },
      {
        title: "Direction Changes",
        content: "Particle reverses direction when V = 0. At maximum height, V = 0."
      }
    ],
    examples: [
      {
        id: "L9-EX1",
        problem: "A particle moves with V = 3t + t². Find acceleration after 4 seconds.",
        solution: [
          "a = dV/dt = 3 + 2t",
          "At t = 4: a = 3 + 2(4) = 3 + 8 = 11"
        ],
        answer: "a = 11 acceleration units"
      },
      {
        id: "L9-EX2",
        problem: "If S = 2t³ - 3t² + 15t, find initial velocity.",
        solution: [
          "V = dS/dt = 6t² - 6t + 15",
          "At t = 0: V₀ = 6(0)² - 6(0) + 15 = 15"
        ],
        answer: "V₀ = 15 units of speed"
      }
    ],
    exercises: [
      {
        id: "L9-E1",
        problem: "Particle moves with S = 3t - 0.5t². Find distance traveled in first 6 seconds.",
        hint: "Find when V = 0 to determine direction changes."
      },
      {
        id: "L9-E2",
        problem: "If S = 6t - t², find traveling distance for 0 ≤ t ≤ 6.",
        hint: "Check if particle changes direction in the interval."
      },
      {
        id: "L9-E3",
        problem: "If V⃗ = (t² - 6t)e⃗, find when motion is retardation.",
        hint: "Find when V and a have opposite signs."
      }
    ]
  },
  {
    number: 10,
    unit: 2,
    title: "Integration of Vector Functions",
    description: "Calculate displacement from velocity and velocity from acceleration using integration.",
    concepts: [
      {
        title: "Velocity from Acceleration",
        content: "If a⃗ = dV⃗/dt, then V⃗ = ∫ a⃗ dt (integrate acceleration to get velocity)"
      },
      {
        title: "Displacement from Velocity",
        content: "If V⃗ = dS⃗/dt, then S⃗ = ∫ V⃗ dt (integrate velocity to get displacement)"
      },
      {
        title: "Initial Conditions",
        content: "Use initial values (t = 0) to find integration constants: V₀, S₀"
      }
    ],
    examples: [
      {
        id: "L10-EX1",
        problem: "Particle starts from rest 8m from origin with a = 6t - 4. Find V(t) and S(t).",
        solution: [
          "V = ∫(6t - 4)dt = 3t² - 4t + C",
          "At t = 0, V₀ = 0, so C = 0",
          "Therefore V = 3t² - 4t",
          "S = ∫(3t² - 4t)dt = t³ - 2t² + C₁",
          "At t = 0, S₀ = 8, so C₁ = 8",
          "Therefore S = t³ - 2t² + 8"
        ],
        answer: "V = 3t² - 4t, S = t³ - 2t² + 8"
      }
    ],
    exercises: [
      {
        id: "L10-E1",
        problem: "Particle starts from rest with V = t² + 2t. Find distance traveled in 2 seconds.",
        hint: "Integrate velocity and use initial condition S₀ = 0."
      },
      {
        id: "L10-E2",
        problem: "If V = 10 - 2t, find traveling distance in third second.",
        hint: "Calculate S(3) - S(2)."
      },
      {
        id: "L10-E3",
        problem: "If a = 3 and V₀ = -1, find displacement in interval [0, 2].",
        hint: "First find V(t), then integrate for S(t)."
      }
    ]
  },
  {
    number: 11,
    unit: 2,
    title: "Momentum",
    description: "Understand momentum as mass times velocity and calculate changes in momentum.",
    concepts: [
      {
        title: "Definition of Momentum",
        content: "H⃗ = m × V⃗. Momentum is a vector with same direction as velocity. Magnitude: H = m × v"
      },
      {
        title: "Units of Momentum",
        content: "kg·m/s or gm·cm/s. Also: 1 newton = 1 kg·m/s², 1 dyne = 1 gm·cm/s²"
      },
      {
        title: "Change in Momentum",
        content: "ΔH⃗ = m(V⃗ - V⃗₀). Change equals mass times change in velocity."
      }
    ],
    examples: [
      {
        id: "L11-EX1",
        problem: "Stone of 2 kg falls from 8.1m height. Find momentum at ground.",
        solution: [
          "V² = V₀² + 2gS = 0 + 2(9.8)(8.1)",
          "V = 12.6 m/s",
          "H = m × V = 2 × 12.6 = 25.2"
        ],
        answer: "H = 25.2 kg·m/s"
      },
      {
        id: "L11-EX2",
        problem: "Train of 40 tons moves north at 72 km/h. Find momentum.",
        solution: [
          "m = 40 × 10³ kg",
          "V = 72 × (5/18) = 20 m/s",
          "H = 40 × 10³ × 20 = 8 × 10⁵"
        ],
        answer: "H = 8 × 10⁵ kg·m/s north"
      }
    ],
    exercises: [
      {
        id: "L11-E1",
        problem: "Bullet of 100 gm moves at 240 m/s. Find momentum.",
        hint: "Convert mass to kg: 100 gm = 0.1 kg."
      },
      {
        id: "L11-E2",
        problem: "Body of 500 gm falls from 4.9m. Find momentum at ground.",
        hint: "Use V² = 2gS to find final velocity."
      },
      {
        id: "L11-E3",
        problem: "Ball of 200 gm at 40 m/s hits wall. ΔH = 12 kg·m/s. Find rebound velocity.",
        hint: "ΔH = m(V₂ + V₁) for collision."
      }
    ]
  },
  {
    number: 12,
    unit: 2,
    title: "Newton's First Law",
    description: "Study equilibrium and uniform motion - forces balance when acceleration is zero.",
    concepts: [
      {
        title: "Law Statement",
        content: "Every body preserves its state of rest or uniform motion unless acted upon by unbalanced external force."
      },
      {
        title: "Equilibrium Condition",
        content: "Sum of forces = 0 when body is at rest or moving with constant velocity (a = 0)."
      },
      {
        title: "Resistance Proportions",
        content: "If R ∝ V, then R₁/R₂ = V₁/V₂. If R ∝ V², then R₁/R₂ = V₁²/V₂²"
      }
    ],
    examples: [
      {
        id: "L12-EX1",
        problem: "Body at rest under forces: 40N, 20N, 70N, F₁, F₂. Find F₁, F₂.",
        solution: [
          "For equilibrium: F₂ + 40 = 70",
          "F₂ = 30 N",
          "F₁ = F₂ + 20 = 50 N"
        ],
        answer: "F₁ = 50 N, F₂ = 30 N"
      }
    ],
    exercises: [
      {
        id: "L12-E1",
        problem: "Car of 3 tons moves with uniform velocity. Resistance 75 kg·wt per ton. Find engine force.",
        hint: "For uniform motion: F = R."
      },
      {
        id: "L12-E2",
        problem: "Parachute descends uniformly. Air resistance ∝ V². When V = 15 km/h, R = 0.25W. Find terminal velocity.",
        hint: "At terminal velocity: R = W."
      }
    ]
  },
  {
    number: 13,
    unit: 2,
    title: "Newton's Second Law",
    description: "Apply F = ma to find forces, masses, and accelerations in motion.",
    concepts: [
      {
        title: "Law Statement",
        content: "Rate of change of momentum equals applied force: F⃗ = ma⃗"
      },
      {
        title: "Force Units",
        content: "1 newton = 1 kg·m/s². 1 dyne = 1 gm·cm/s². 1 kg·wt = 9.8 N. 1 gm·wt = 980 dyne"
      },
      {
        title: "Motion Equation",
        content: "ma = F for constant mass. Direction of acceleration matches net force direction."
      }
    ],
    examples: [
      {
        id: "L13-EX1",
        problem: "Force F moves 1 ton at rest 156.8m in 16 seconds. Find F.",
        solution: [
          "S = (1/2)at²: 156.8 = (1/2)a(16)²",
          "a = 1.225 m/s²",
          "F = ma = 1000 × 1.225 = 1225 N"
        ],
        answer: "F = 1225 N"
      },
      {
        id: "L13-EX2",
        problem: "50 kg body with 160 cm/s² acceleration. Find force.",
        solution: [
          "Convert: a = 1.6 m/s²",
          "F = ma = 50 × 1.6 = 80 N"
        ],
        answer: "F = 80 N"
      }
    ],
    exercises: [
      {
        id: "L13-E1",
        problem: "6 kg·wt force causes 4.9 m/s² acceleration. Find mass.",
        hint: "F = 6 × 9.8 N. Use ma = F."
      },
      {
        id: "L13-E2",
        problem: "10 N on 8 kg from rest. Find distance after 12 seconds.",
        hint: "Find a first, then use S = (1/2)at²."
      },
      {
        id: "L13-E3",
        problem: "Train at 20 m/s stops in 200m. Find brake force per ton.",
        hint: "Use V² = V₀² + 2aS to find a."
      }
    ]
  },
  {
    number: 14,
    unit: 2,
    title: "Newton's Third Law & Lift Problems",
    description: "Action-reaction pairs and apparent weight in accelerating lifts.",
    concepts: [
      {
        title: "Law Statement",
        content: "For every action, there's equal and opposite reaction: F₁ = -F₂"
      },
      {
        title: "Lift at Rest or Uniform Motion",
        content: "R = mg (normal reaction equals weight)"
      },
      {
        title: "Lift Accelerating Up",
        content: "ma = R - mg, so R = m(g + a). Apparent weight increases."
      },
      {
        title: "Lift Accelerating Down",
        content: "ma = mg - R, so R = m(g - a). Apparent weight decreases."
      }
    ],
    examples: [
      {
        id: "L14-EX1",
        problem: "70 kg man in lift. Find pressure on floor: (a) uniform motion (b) up at 1.4 m/s² (c) down at 1.4 m/s²",
        solution: [
          "(a) Uniform: R = mg = 70 kg·wt",
          "(b) Up: R = m(g+a) = 70(9.8+1.4) = 784 N = 80 kg·wt",
          "(c) Down: R = m(g-a) = 70(9.8-1.4) = 588 N = 60 kg·wt"
        ],
        answer: "(a) 70 kg·wt (b) 80 kg·wt (c) 60 kg·wt"
      }
    ],
    exercises: [
      {
        id: "L14-E1",
        problem: "50 kg on balance in lift moving up at 1.4 m/s². Find balance reading.",
        hint: "Use R = m(g + a)."
      },
      {
        id: "L14-E2",
        problem: "Balance reads 30 kg·wt when lift descends at 1.4 m/s². Find actual weight.",
        hint: "30 = m(g - 1.4). Solve for m."
      },
      {
        id: "L14-E3",
        problem: "20 kg hanging from spring balance. Balance reads 17 kg·wt. Find lift acceleration and direction.",
        hint: "Since R < mg, lift accelerates downward."
      }
    ]
  },
  {
    number: 15,
    unit: 2,
    title: "Motion on Smooth Inclined Plane",
    description: "Analyze forces and motion for objects on frictionless inclined planes.",
    concepts: [
      {
        title: "Force Components",
        content: "Parallel to plane: mg sin θ. Perpendicular: mg cos θ. Normal reaction: R = mg cos θ"
      },
      {
        title: "Uniform Velocity",
        content: "F = mg sin θ (force balances component)"
      },
      {
        title: "Motion Up",
        content: "ma = F - mg sin θ (net force up the plane)"
      },
      {
        title: "Motion Down",
        content: "ma = mg sin θ - F (net force down the plane)"
      }
    ],
    examples: [
      {
        id: "L15-EX1",
        problem: "10 kg on plane, sin θ = 3/5. Force 80 N up the slope. Find acceleration and normal reaction.",
        solution: [
          "mg sin θ = 10 × 9.8 × (3/5) = 58.8 N",
          "Since F > mg sin θ, motion is up",
          "ma = F - mg sin θ",
          "10a = 80 - 58.8",
          "a = 2.12 m/s²",
          "R = mg cos θ = 10 × 9.8 × (4/5) = 78.4 N"
        ],
        answer: "a = 2.12 m/s² up, R = 78.4 N"
      }
    ],
    exercises: [
      {
        id: "L15-E1",
        problem: "Particle projected at 73.5 m/s up 30° plane. Find time to maximum height.",
        hint: "At max height, V = 0. Use V = V₀ - g sin θ × t."
      },
      {
        id: "L15-E2",
        problem: "2.5 kg on plane (sin θ = 3/5) with 9.7 N force up. Find normal reaction in kg·wt.",
        hint: "R = mg cos θ, convert to kg·wt by dividing by 9.8."
      },
      {
        id: "L15-E3",
        problem: "Body on plane (sin θ = 0.1) projected at 49 cm/s up. Find time to max height.",
        hint: "Deceleration = g sin θ = 980 × 0.1 cm/s²."
      }
    ]
  },
  {
    number: 16,
    unit: 2,
    title: "Simple Pulleys - Case 1 (Vertical)",
    description: "Two masses connected by string over pulley, both hanging vertically.",
    concepts: [
      {
        title: "System Setup",
        content: "Two bodies m₁, m₂ (m₁ > m₂) hanging from string over smooth pulley."
      },
      {
        title: "Equations of Motion",
        content: "m₁a = m₁g - T and m₂a = T - m₂g. Both move with same acceleration a."
      },
      {
        title: "Solving",
        content: "Add equations: (m₁ + m₂)a = (m₁ - m₂)g, so a = (m₁ - m₂)g/(m₁ + m₂)"
      },
      {
        title: "Pulley Pressure",
        content: "P = 2T (two string tensions pull on pulley)"
      }
    ],
    examples: [
      {
        id: "L16-EX1",
        problem: "Masses 1 kg and 3 kg on vertical string over pulley. Find acceleration and pulley pressure.",
        solution: [
          "3a = 3(9.8) - T",
          "1a = T - 1(9.8)",
          "Add: 4a = 2(9.8)",
          "a = 4.9 m/s²",
          "T = 1(9.8) + 1(4.9) = 14.7 N",
          "P = 2T = 29.4 N"
        ],
        answer: "a = 4.9 m/s², P = 29.4 N"
      }
    ],
    exercises: [
      {
        id: "L16-E1",
        problem: "Masses 4 kg and 1 kg. Find acceleration and pulley pressure.",
        hint: "Use (m₁ + m₂)a = (m₁ - m₂)g."
      },
      {
        id: "L16-E2",
        problem: "Masses m and 2m. T = 20 N. Find pulley pressure.",
        hint: "From T, find m first. Then P = 2T."
      },
      {
        id: "L16-E3",
        problem: "Masses 3m and m from rest. Bodies in same plane initially. Find vertical distance after 1 second.",
        hint: "Each body moves S = (1/2)at². Total separation = 2S."
      }
    ]
  },
  {
    number: 17,
    unit: 2,
    title: "Simple Pulleys - Case 2 (Horizontal Table)",
    description: "One mass on horizontal table, other hanging vertically.",
    concepts: [
      {
        title: "System Setup",
        content: "Mass m₁ hangs vertically, m₂ on smooth horizontal table. Connected by string over pulley at table edge."
      },
      {
        title: "Equations of Motion",
        content: "m₁a = m₁g - T (vertical body), m₂a = T (horizontal body)"
      },
      {
        title: "Solving",
        content: "Add: (m₁ + m₂)a = m₁g, so a = m₁g/(m₁ + m₂)"
      },
      {
        title: "Pulley Pressure",
        content: "P = √2 T (tensions at 90° angle)"
      }
    ],
    examples: [
      {
        id: "L17-EX1",
        problem: "195 gm on table, 50 gm hanging. System starts at rest 100 cm from pulley. Find velocity at pulley and pressure.",
        solution: [
          "50a = 50(980) - T",
          "195a = T",
          "Add: 245a = 50(980)",
          "a = 200 cm/s²",
          "T = 195(200) = 39000 dyne",
          "P = 39000√2 dyne",
          "V² = 2aS = 2(200)(100)",
          "V = 200 cm/s"
        ],
        answer: "V = 200 cm/s, P = 39000√2 dyne"
      }
    ],
    exercises: [
      {
        id: "L17-E1",
        problem: "45 gm on table, 4 kg hanging. Find common acceleration.",
        hint: "Convert units first. Use a = m₁g/(m₁ + m₂)."
      },
      {
        id: "L17-E2",
        problem: "600 gm on table, 150 gm hanging. Find pulley pressure.",
        hint: "Find T first, then P = √2 T."
      },
      {
        id: "L17-E3",
        problem: "2g on table, 5g hanging from rest. Find: (a) acceleration (b) tension (c) pressure (d) distance after 2s (e) velocity after 2s.",
        hint: "Systematic: find a, then T, then P, then use kinematics."
      }
    ]
  },
  {
    number: 18,
    unit: 2,
    title: "Simple Pulleys - Case 3 (Inclined Plane)",
    description: "One mass on inclined plane, other hanging vertically.",
    concepts: [
      {
        title: "System Setup",
        content: "Mass m₁ hangs vertically, m₂ on smooth inclined plane (angle θ). String over pulley at top of plane."
      },
      {
        title: "Force Analysis",
        content: "Compare m₁g with m₂g sin θ to determine motion direction."
      },
      {
        title: "Equations (m₁ > m₂ sin θ)",
        content: "m₁a = m₁g - T, m₂a = T - m₂g sin θ (body moves up plane)"
      },
      {
        title: "Pulley Pressure",
        content: "P = 2T cos(θ/2) (strings at angle θ)"
      }
    ],
    examples: [
      {
        id: "L18-EX1",
        problem: "10 kg on 60° plane, 8 kg hanging. Prove a ≈ 0.36 m/s². Find pulley pressure.",
        solution: [
          "10g sin 60° = 10(9.8)(√3/2) = 84.9 N",
          "8g = 78.4 N",
          "Since 10g sin 60° > 8g, body moves down plane",
          "8a = T - 78.4",
          "10a = 84.9 - T",
          "Add: 18a = 6.5",
          "a = 0.36 m/s²",
          "T = 81.3 N",
          "P = 2(81.3)cos(30°) = 157 N"
        ],
        answer: "a = 0.36 m/s², P = 157 N"
      }
    ],
    exercises: [
      {
        id: "L18-E1",
        problem: "Equal masses m on 30° plane and hanging. Find: (a) acceleration (b) tension (c) pressure.",
        hint: "Compare mg with mg sin 30° = 0.5mg."
      },
      {
        id: "L18-E2",
        problem: "Masses m and 2m at 30° plane start from same horizontal level. After moving 20 cm, find vertical distance between them.",
        hint: "Vertical distance = S(1 + sin θ)."
      },
      {
        id: "L18-E3",
        problem: "14 kg on 30° plane, 3.5 kg hanging. Find string tension.",
        hint: "Set up both equations and solve for T directly."
      }
    ]
  }
];

/**
 * @param {number|string} lessonNumber
 * @returns {object|undefined}
 */
export const getLesson = (lessonNumber) => {
  return lessonsData.find(l => l.number === parseInt(String(lessonNumber), 10));
};

/**
 * @param {Array<any>} completedLessons
 * @param {Array<any>} completedExercises
 * @returns {number}
 */
export const getTotalProgress = (completedLessons, completedExercises) => {
  const totalLessons = lessonsData.length;
  const totalExercises = lessonsData.reduce((sum, l) => sum + (l.exercises?.length || 0), 0);
  
  const lessonProgress = (completedLessons?.length || 0) / totalLessons;
  const exerciseProgress = (completedExercises?.length || 0) / totalExercises;
  
  return (lessonProgress * 0.4 + exerciseProgress * 0.6) * 100;
};