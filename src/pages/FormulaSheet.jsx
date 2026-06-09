import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Search, Calculator, ChevronDown, ChevronUp,
  BookOpen, Lightbulb, Zap, RotateCcw, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MathRenderer from '@/components/learning/MathRenderer';
import DeterminantMatrix from '@/components/learning/DeterminantMatrix';

const term1Formulas = [
  {
    category: "Moment of Force (2D)",
    color: "amber",
    icon: "🔄",
    items: [
      {
        name: "Vector Moment Formula",
        formula: "$\\vec{M_O} = \\vec{r} \\times \\vec{F}$",
        description: "The moment of force F⃗ about point O equals the cross product of position vector r⃗ (from O to any point on the force's line of action) and the force F⃗.",
        howToUse: "Use this when you have coordinates and want the moment vector.",
        example: {
          problem: "F⃗ = (3, 4) acts at A(2, 1). Find moment about origin O(0,0).",
          steps: [
            "Position vector: r⃗ = A - O = (2-0, 1-0) = (2, 1)",
            "Apply formula: M⃗_O = r⃗ × F⃗ = (2)(4) - (1)(3)",
            "M⃗_O = 8 - 3 = 5",
            "Final answer: M⃗_O = 5k⃗ (counter-clockwise)"
          ],
          answer: "M⃗_O = 5k⃗"
        }
      },
      {
        name: "Magnitude Formula",
        formula: "$||\\vec{M_O}|| = F \\times L$",
        description: "The magnitude of the moment equals the force magnitude multiplied by the perpendicular distance (L) from the point to the line of action of the force.",
        howToUse: "Use this when you know the force magnitude and perpendicular distance.",
        example: {
          problem: "Force F = 10 N acts 3 m away from point O (perpendicular distance). Find moment magnitude.",
          steps: [
            "Identify: F = 10 N, L = 3 m",
            "Apply formula: M = F × L",
            "M = 10 × 3 = 30 N·m"
          ],
          answer: "M = 30 N·m"
        }
      },
      {
        name: "Perpendicular Distance",
        formula: "$L = \\frac{||\\vec{M_O}||}{||\\vec{F}||}$",
        description: "Rearranging the magnitude formula to find the perpendicular distance L from the reference point to the line of action.",
        howToUse: "Use this when you need to find how far the force line is from a point.",
        example: {
          problem: "M⃗_O = 7k⃗ and F⃗ = (1, -3). Find perpendicular distance L from O.",
          steps: [
            "||M⃗_O|| = 7",
            "||F⃗|| = √(1² + 3²) = √10",
            "L = 7 / √10 = 7/√10 = 7√10/10 length units"
          ],
          answer: "L = 7/√10 ≈ 2.21 units"
        }
      },
      {
        name: "2D Cross Product",
        formula: "$(x_1, y_1) \\times (x_2, y_2) = x_1 y_2 - y_1 x_2$",
        description: "In 2D, the cross product of two vectors gives a scalar (the z-component). This is how you compute the moment numerically.",
        howToUse: "The position vector comes first, then the force vector. Multiply diagonals and subtract.",
        example: {
          problem: "r⃗ = (-3, 2), F⃗ = (1, -3). Compute r⃗ × F⃗.",
          steps: [
            "r⃗ × F⃗ = x₁y₂ - y₁x₂",
            "= (-3)(-3) - (2)(1)",
            "= 9 - 2 = 7",
            "Result: 7k⃗"
          ],
          answer: "7k⃗ (positive = counter-clockwise)"
        }
      }
    ]
  },
  {
    category: "Moment of Force (3D)",
    color: "blue",
    icon: "🧊",
    items: [
      {
        name: "3D Moment Determinant",
        formula: "$\\vec{M} = \\vec{r} \\times \\vec{F} = \\begin{vmatrix} \\vec{i} & \\vec{j} & \\vec{k} \\\\ r_x & r_y & r_z \\\\ F_x & F_y & F_z \\end{vmatrix}$",
        description: "In 3D, the moment is computed as a 3×3 determinant. The result is a vector with i⃗, j⃗, k⃗ components representing moments about X, Y, Z axes respectively.",
        howToUse: "Expand the determinant using the cofactor method for each row.",
        example: {
          problem: "r⃗ = (1, 2, 3), F⃗ = (4, 5, 6). Find moment vector.",
          steps: [
            "M_x (i component): = r_y·F_z - r_z·F_y = (2)(6) - (3)(5) = 12 - 15 = -3",
            "M_y (j component): = -(r_x·F_z - r_z·F_x) = -[(1)(6) - (3)(4)] = -[6-12] = 6",
            "M_z (k component): = r_x·F_y - r_y·F_x = (1)(5) - (2)(4) = 5 - 8 = -3",
            "M⃗ = -3i⃗ + 6j⃗ - 3k⃗"
          ],
          answer: "M⃗ = -3i⃗ + 6j⃗ - 3k⃗"
        }
      },
      {
        name: "X-Component (moment about X-axis)",
        formula: "$M_x = r_y \\cdot F_z - r_z \\cdot F_y$",
        description: "The i⃗ component of the moment vector represents the moment about the X-axis.",
        howToUse: "Take y of position × z of force, then subtract z of position × y of force.",
        example: {
          problem: "r⃗ = (2, -1, 3), F⃗ = (0, 4, -2). Find M_x.",
          steps: [
            "M_x = r_y × F_z - r_z × F_y",
            "M_x = (-1)(-2) - (3)(4)",
            "M_x = 2 - 12 = -10"
          ],
          answer: "M_x = -10 (moment about X-axis)"
        }
      },
      {
        name: "Y-Component (moment about Y-axis)",
        formula: "$M_y = -(r_x \\cdot F_z - r_z \\cdot F_x)$",
        description: "The j⃗ component of the moment vector represents the moment about the Y-axis. Note the negative sign!",
        howToUse: "Take x of position × z of force, subtract z of position × x of force, then NEGATE the result.",
        example: {
          problem: "r⃗ = (2, -1, 3), F⃗ = (0, 4, -2). Find M_y.",
          steps: [
            "M_y = -(r_x × F_z - r_z × F_x)",
            "= -[(2)(-2) - (3)(0)]",
            "= -[-4 - 0] = 4"
          ],
          answer: "M_y = 4 (moment about Y-axis)"
        }
      },
      {
        name: "Z-Component (moment about Z-axis)",
        formula: "$M_z = r_x \\cdot F_y - r_y \\cdot F_x$",
        description: "The k⃗ component of the moment vector represents the moment about the Z-axis.",
        howToUse: "Take x of position × y of force, then subtract y of position × x of force.",
        example: {
          problem: "r⃗ = (2, -1, 3), F⃗ = (0, 4, -2). Find M_z.",
          steps: [
            "M_z = r_x × F_y - r_y × F_x",
            "= (2)(4) - (-1)(0)",
            "= 8 - 0 = 8"
          ],
          answer: "M_z = 8 (moment about Z-axis)"
        }
      }
    ]
  },
  {
    category: "Theorem of Moments",
    color: "purple",
    icon: "⚖️",
    items: [
      {
        name: "Main Theorem",
        formula: "$\\sum M_i = M_R$ (about the same point)",
        description: "The algebraic sum of moments of all forces about any point equals the moment of their resultant force about that same point.",
        howToUse: "Add up all individual moments, set equal to R × d (moment of resultant).",
        example: {
          problem: "Forces F₁=5N at A(1,0) and F₂=3N at A(1,0) both acting. Resultant R=8N. Verify theorem.",
          steps: [
            "Sum of individual moments about O = M₁ + M₂",
            "Moment of resultant about O = R × L",
            "Both must be equal — this is the theorem",
            "Use it to find unknown positions or forces"
          ],
          answer: "ΣMᵢ = M_resultant"
        }
      },
      {
        name: "Parallel Line of Action",
        formula: "$M_O = M_H \\Rightarrow$ line of action is parallel to $\\overrightarrow{OH}$",
        description: "If the moment of the resultant about two different points O and H are EQUAL, then the resultant's line of action is PARALLEL to the line joining O and H.",
        howToUse: "Calculate moments about two points. If equal → line of action is parallel to segment OH.",
        example: {
          problem: "Moment about O(0,0) = 10k⃗ and moment about H(4,0) = 10k⃗. What does this tell us?",
          steps: [
            "Both moments are equal: M_O = M_H = 10k⃗",
            "According to the theorem: line of action ∥ OH⃗",
            "OH⃗ goes from (0,0) to (4,0) — it's horizontal",
            "Conclusion: resultant's line of action is horizontal"
          ],
          answer: "Line of action is parallel to OH (horizontal)"
        }
      },
      {
        name: "Bisecting Line of Action",
        formula: "$M_O = -M_H \\Rightarrow$ line of action bisects $\\overrightarrow{OH}$",
        description: "If the moments about O and H are equal in magnitude but OPPOSITE in sign, the resultant's line of action passes through the MIDPOINT of OH.",
        howToUse: "Calculate moments about two points. If equal but opposite → line of action bisects OH.",
        example: {
          problem: "Moment about O = 6k⃗ and about H(2,0) = -6k⃗. Where does resultant line pass?",
          steps: [
            "M_O = 6k⃗, M_H = -6k⃗ → they are equal and opposite",
            "By theorem: line of action bisects OH",
            "Midpoint of OH = (1, 0)",
            "Conclusion: resultant passes through point (1, 0)"
          ],
          answer: "Line passes through midpoint of OH at (1,0)"
        }
      }
    ]
  },
  {
    category: "Parallel Forces",
    color: "green",
    icon: "↕️",
    items: [
      {
        name: "Same Direction Resultant",
        formula: "$R = F_1 + F_2$ (in same direction)",
        description: "When two parallel forces point in the same direction, the resultant magnitude is simply their sum, and it points in the same direction.",
        howToUse: "Add the forces. The resultant lies BETWEEN the two forces.",
        example: {
          problem: "F₁ = 20 N upward at A, F₂ = 30 N upward at B. AB = 50 cm. Find resultant.",
          steps: [
            "R = F₁ + F₂ = 20 + 30 = 50 N upward",
            "Find position: F₁ × AC = F₂ × BC",
            "20 × AC = 30 × BC",
            "If AB = 50 cm and AC + BC = 50:",
            "20x = 30(50-x) → 20x = 1500 - 30x → 50x = 1500 → x = 30",
            "C is 30 cm from A (20 cm from B)"
          ],
          answer: "R = 50 N upward, 30 cm from A"
        }
      },
      {
        name: "Opposite Direction Resultant",
        formula: "$R = |F_1 - F_2|$ (direction of larger force)",
        description: "When two parallel forces point in opposite directions, the resultant is the difference in magnitude, pointing in the direction of the larger force. Point C is OUTSIDE segment AB.",
        howToUse: "Subtract smaller from larger. The resultant is on the OUTSIDE (beyond the larger force).",
        example: {
          problem: "F₁ = 30 N up at A, F₂ = 20 N down at B. AB = 10 cm. Find resultant.",
          steps: [
            "R = 30 - 20 = 10 N upward (F₁ is larger)",
            "Position: F₁ × AC = F₂ × BC (C is outside AB, beyond B)",
            "30 × AC = 20 × BC",
            "If BC = AC - 10 (C beyond B): 30x = 20(x-10) → 30x = 20x - 200 → 10x = -200",
            "Wait: C beyond A: BC = AC + AB",
            "Let AC = x: 30x = 20(x+10) → 30x = 20x + 200 → x = 20 cm from A"
          ],
          answer: "R = 10 N upward, 20 cm from A (outside segment, beyond B)"
        }
      },
      {
        name: "Position of Resultant (Inverse Proportion)",
        formula: "$F_1 \\times AC = F_2 \\times BC$",
        description: "The resultant divides the distance between forces in INVERSE proportion to the force magnitudes. The larger force is closer to the resultant.",
        howToUse: "Set up the proportion equation. Larger force → shorter distance to resultant.",
        example: {
          problem: "Forces 4 N and 6 N same direction, 10 cm apart. Find resultant position from each force.",
          steps: [
            "Let AC = x (from 4N side), BC = 10 - x (from 6N side)",
            "Inverse proportion: 4 × x = 6 × (10-x)",
            "4x = 60 - 6x",
            "10x = 60",
            "x = 6 cm from 4N force (4 cm from 6N force)"
          ],
          answer: "Resultant is 6 cm from 4N and 4 cm from 6N"
        }
      }
    ]
  },
  {
    category: "Equilibrium of Parallel Forces",
    color: "teal",
    icon: "🔧",
    items: [
      {
        name: "Force Equilibrium (1st Condition)",
        formula: "$\\sum F = 0$ (Upward = Downward)",
        description: "For a body to be in equilibrium, the sum of ALL forces must be zero. This means total upward forces equal total downward forces.",
        howToUse: "Write: R₁ + R₂ = W₁ + W₂ + ... This gives you one equation.",
        example: {
          problem: "Beam weight 10 N, load 20 N. Two supports R₁ and R₂. Find sum condition.",
          steps: [
            "All upward forces: R₁ + R₂",
            "All downward forces: 10 + 20 = 30 N",
            "Equilibrium: R₁ + R₂ = 30 N",
            "This is the first equation you need"
          ],
          answer: "R₁ + R₂ = 30 N (1st condition)"
        }
      },
      {
        name: "Moment Equilibrium (2nd Condition)",
        formula: "$\\sum M = 0$ (about any point)",
        description: "The sum of all moments about ANY chosen point must be zero. Choose a smart reference point to eliminate unknown forces.",
        howToUse: "Pick the point where an unknown force acts. Its moment = 0, simplifying the equation.",
        example: {
          problem: "Beam AB = 100 cm, weight 10 N at center (50 cm). Load 20 N at 30 cm from A. R₁ at A, R₂ at B. Find R₂.",
          steps: [
            "Take moments about A (R₁ disappears!)",
            "Clockwise: 10 × 50 + 20 × 30 = 500 + 600 = 1100 N·cm",
            "Counter-clockwise: R₂ × 100",
            "Set equal: R₂ × 100 = 1100",
            "R₂ = 11 N"
          ],
          answer: "R₂ = 11 N, then R₁ = 30 - 11 = 19 N"
        }
      },
      {
        name: "About to Rotate Condition",
        formula: "Reaction at far support = 0",
        description: "When a body is 'about to rotate' around one support, the reaction at the OTHER support becomes zero. This is the critical condition.",
        howToUse: "Set the reaction at the 'pivot's opposite' support to zero, then solve.",
        example: {
          problem: "Rod AB with supports at C and D. About to rotate about C. What is R_D?",
          steps: [
            "'About to rotate about C' means the rod is on the verge of lifting at D",
            "Therefore: R_D = 0",
            "Now use ΣF = 0 to find R_C",
            "And ΣM about D = 0 to find unknown position/weight"
          ],
          answer: "R_D = 0 when about to rotate about C"
        }
      }
    ]
  },
  {
    category: "Couple",
    color: "orange",
    icon: "🔁",
    items: [
      {
        name: "Couple Moment",
        formula: "$M = F \\times r$",
        description: "The moment of a couple equals the force magnitude times the perpendicular distance (arm) between the two force lines. The sign tells the direction of rotation.",
        howToUse: "Positive = counter-clockwise, Negative = clockwise.",
        example: {
          problem: "Two forces of 8 N are 5 cm apart forming a couple. Find the moment.",
          steps: [
            "F = 8 N (magnitude of each force)",
            "r = 5 cm (perpendicular distance between force lines)",
            "M = F × r = 8 × 5 = 40 N·cm",
            "Direction depends on which way the couple rotates"
          ],
          answer: "M = 40 N·cm (direction depends on rotation)"
        }
      },
      {
        name: "Equivalent Couples",
        formula: "$M_1 = M_2 \\Rightarrow$ couples are equivalent",
        description: "Two couples are equivalent if and only if their moments are equal. The forces and arm can be different as long as the moment product is the same.",
        howToUse: "Set F₁ × r₁ = F₂ × r₂ to find unknown force or arm.",
        example: {
          problem: "Couple 1: F=12N, r=8cm. Couple 2: r=6cm. Find force of Couple 2 if equivalent.",
          steps: [
            "M₁ = 12 × 8 = 96 N·cm",
            "M₂ = F₂ × 6",
            "For equivalence: M₁ = M₂",
            "96 = F₂ × 6",
            "F₂ = 16 N"
          ],
          answer: "F₂ = 16 N"
        }
      },
      {
        name: "Equilibrating Couples",
        formula: "$M_1 + M_2 = 0 \\Rightarrow M_1 = -M_2$",
        description: "Two couples equilibrate (cancel each other) when their moments are equal in magnitude but opposite in sign. One must be clockwise, the other counter-clockwise.",
        howToUse: "If M₁ is given, the equilibrating couple has moment = -M₁.",
        example: {
          problem: "Couple M₁ = +50 N·cm (CCW). Find M₂ to equilibrate.",
          steps: [
            "For equilibrium: M₁ + M₂ = 0",
            "50 + M₂ = 0",
            "M₂ = -50 N·cm",
            "M₂ is clockwise with magnitude 50 N·cm"
          ],
          answer: "M₂ = -50 N·cm (clockwise)"
        }
      },
      {
        name: "Resultant Couple",
        formula: "$M = M_1 + M_2 + M_3 + ...$",
        description: "Multiple couples combine into one resultant couple. The resultant moment is the algebraic sum of all individual couple moments (with sign).",
        howToUse: "Add all CCW moments as positive, all CW moments as negative.",
        example: {
          problem: "Three couples: M₁ = +60 N·cm, M₂ = -90 N·cm, M₃ = +40 N·cm. Find resultant.",
          steps: [
            "M = M₁ + M₂ + M₃",
            "M = +60 + (-90) + (+40)",
            "M = 60 - 90 + 40 = +10 N·cm",
            "Result: 10 N·cm counter-clockwise"
          ],
          answer: "M = +10 N·cm (counter-clockwise)"
        }
      }
    ]
  }
];

const term2Formulas = [
  {
    category: "Differentiation in Kinematics",
    color: "violet",
    icon: "📐",
    items: [
      {
        name: "Velocity from Displacement",
        formula: "$\\vec{V} = \\frac{d\\vec{S}}{dt}$",
        description: "Velocity is the rate of change of displacement with respect to time. Differentiate the displacement function to get velocity.",
        howToUse: "Differentiate S(t) with respect to t to get V(t).",
        example: {
          problem: "S = 2t³ - 3t² + 5t. Find velocity at t = 2.",
          steps: [
            "V = dS/dt = 6t² - 6t + 5",
            "At t = 2: V = 6(4) - 6(2) + 5",
            "V = 24 - 12 + 5 = 17"
          ],
          answer: "V = 17 units of speed"
        }
      },
      {
        name: "Acceleration from Velocity",
        formula: "$\\vec{a} = \\frac{d\\vec{V}}{dt} = \\frac{d^2\\vec{S}}{dt^2}$",
        description: "Acceleration is the rate of change of velocity. Differentiate velocity once (or displacement twice) to get acceleration.",
        howToUse: "Differentiate V(t) once to get a(t).",
        example: {
          problem: "V = 3t² - 6t + 2. Find acceleration at t = 3.",
          steps: [
            "a = dV/dt = 6t - 6",
            "At t = 3: a = 6(3) - 6 = 18 - 6 = 12"
          ],
          answer: "a = 12 acceleration units"
        }
      },
      {
        name: "Accelerated vs Decelerated Motion",
        formula: "$V \\times a > 0 \\Rightarrow$ accelerated; $V \\times a < 0 \\Rightarrow$ decelerated",
        description: "If velocity and acceleration have the SAME sign (both + or both -), motion is accelerating. If they have OPPOSITE signs, motion is decelerating (slowing down).",
        howToUse: "Find V and a at a time. Multiply them. Positive = speeding up, Negative = slowing down.",
        example: {
          problem: "At t=2: V = -4 m/s and a = 3 m/s². Is the motion accelerated or decelerated?",
          steps: [
            "V = -4 (negative direction)",
            "a = +3 (positive direction)",
            "V × a = (-4)(3) = -12 < 0",
            "Motion is DECELERATED (slowing down)"
          ],
          answer: "Decelerated (slowing down), because V and a have opposite signs"
        }
      },
      {
        name: "Direction Reversal",
        formula: "$V = 0 \\Rightarrow$ particle reverses direction",
        description: "When velocity equals zero, the particle momentarily stops and may reverse direction. Also, at maximum height in vertical motion, V = 0.",
        howToUse: "Set V(t) = 0 and solve for t. Check if direction changes around that time.",
        example: {
          problem: "V = t² - 4. When does the particle reverse direction? (for t > 0)",
          steps: [
            "Set V = 0: t² - 4 = 0",
            "t² = 4 → t = 2 seconds",
            "Before t=2: V = 1-4 = -3 (negative direction)",
            "After t=2: V = 9-4 = 5 (positive direction)",
            "Direction reverses at t = 2 seconds"
          ],
          answer: "Particle reverses at t = 2 s"
        }
      }
    ]
  },
  {
    category: "Integration in Kinematics",
    color: "cyan",
    icon: "∫",
    items: [
      {
        name: "Velocity from Acceleration",
        formula: "$\\vec{V} = \\int \\vec{a} \\, dt + C$",
        description: "Integrate acceleration with respect to time to find velocity. Don't forget the constant of integration C, which is determined from initial conditions.",
        howToUse: "Integrate a(t) then use V₀ (initial velocity at t=0) to find C.",
        example: {
          problem: "a = 6t - 4, V₀ = 2. Find V(t).",
          steps: [
            "V = ∫(6t - 4)dt = 3t² - 4t + C",
            "At t = 0: V₀ = 2, so C = 2",
            "V = 3t² - 4t + 2"
          ],
          answer: "V = 3t² - 4t + 2"
        }
      },
      {
        name: "Displacement from Velocity",
        formula: "$\\vec{S} = \\int \\vec{V} \\, dt + C$",
        description: "Integrate velocity with respect to time to find displacement. The constant C is found from initial position S₀.",
        howToUse: "Integrate V(t) then use S₀ (initial position at t=0) to find C.",
        example: {
          problem: "V = 3t² - 4t + 2, S₀ = 5. Find S(t).",
          steps: [
            "S = ∫(3t² - 4t + 2)dt = t³ - 2t² + 2t + C",
            "At t = 0: S₀ = 5, so C = 5",
            "S = t³ - 2t² + 2t + 5"
          ],
          answer: "S = t³ - 2t² + 2t + 5"
        }
      },
      {
        name: "Distance Traveled (with direction change)",
        formula: "$d = |S(t_1) - S(t_0)| + |S(t_2) - S(t_1)|$",
        description: "Distance traveled is always positive. If the particle reverses direction, you must split the calculation at the turning point to avoid subtraction cancellation.",
        howToUse: "Find when V=0 (reversal). Calculate distance in each segment and ADD the absolute values.",
        example: {
          problem: "S = t² - 4t for 0 ≤ t ≤ 5. Find total distance traveled.",
          steps: [
            "V = 2t - 4 = 0 → t = 2 (reversal point)",
            "S(0) = 0, S(2) = 4-8 = -4, S(5) = 25-20 = 5",
            "From t=0 to t=2: |S(2)-S(0)| = |-4-0| = 4",
            "From t=2 to t=5: |S(5)-S(2)| = |5-(-4)| = 9",
            "Total distance = 4 + 9 = 13 units"
          ],
          answer: "Total distance = 13 units"
        }
      }
    ]
  },
  {
    category: "Momentum",
    color: "pink",
    icon: "🏃",
    items: [
      {
        name: "Momentum Definition",
        formula: "$\\vec{H} = m \\times \\vec{V}$",
        description: "Momentum is mass times velocity. It is a VECTOR — it has the same direction as velocity. SI unit: kg·m/s",
        howToUse: "Multiply mass (kg) by velocity (m/s) to get momentum (kg·m/s).",
        example: {
          problem: "A 3 kg ball moves at 4 m/s east. Find its momentum.",
          steps: [
            "m = 3 kg, V = 4 m/s east",
            "H = m × V = 3 × 4 = 12 kg·m/s",
            "Direction: eastward (same as velocity)"
          ],
          answer: "H = 12 kg·m/s eastward"
        }
      },
      {
        name: "Change in Momentum",
        formula: "$\\Delta \\vec{H} = m(\\vec{V_2} - \\vec{V_1})$",
        description: "The change in momentum equals mass times the change in velocity. This is crucial for impact and collision problems.",
        howToUse: "Take final velocity minus initial velocity, multiply by mass. Watch signs for direction!",
        example: {
          problem: "0.5 kg ball moving at 6 m/s hits wall and bounces at 4 m/s. Find change in momentum.",
          steps: [
            "Take towards wall as positive (+)",
            "V₁ = +6 m/s, V₂ = -4 m/s (bounced back)",
            "ΔH = m(V₂ - V₁) = 0.5(-4 - 6)",
            "ΔH = 0.5 × (-10) = -5 kg·m/s",
            "Magnitude: 5 kg·m/s away from wall"
          ],
          answer: "ΔH = 5 kg·m/s away from wall"
        }
      },
      {
        name: "Unit Conversions for Momentum",
        formula: "$1 \\text{ kg.wt} = 9.8 \\text{ N}$, $\\; 72 \\text{ km/h} = 20 \\text{ m/s}$",
        description: "Common unit conversions needed in momentum problems. Always convert to SI units (kg, m/s) before calculating.",
        howToUse: "Multiply km/h by 5/18 to get m/s. Multiply kg.wt by 9.8 to get N.",
        example: {
          problem: "Convert 90 km/h to m/s and 5 kg.wt to N.",
          steps: [
            "90 km/h × (5/18) = 90/3.6 = 25 m/s",
            "5 kg.wt × 9.8 = 49 N",
            "Always convert first before calculations"
          ],
          answer: "90 km/h = 25 m/s; 5 kg.wt = 49 N"
        }
      }
    ]
  },
  {
    category: "Newton's Laws",
    color: "red",
    icon: "🚀",
    items: [
      {
        name: "Newton's 2nd Law",
        formula: "$\\vec{F} = m\\vec{a}$",
        description: "The net force equals mass times acceleration. The net force is the SUM of all forces acting on the body. Direction of acceleration = direction of net force.",
        howToUse: "Draw all forces on the body. Find net force (ΣF). Divide by mass to get acceleration.",
        example: {
          problem: "Net force 50 N on 10 kg body. Find acceleration.",
          steps: [
            "F = ma",
            "50 = 10 × a",
            "a = 5 m/s²"
          ],
          answer: "a = 5 m/s²"
        }
      },
      {
        name: "Lift Accelerating Up",
        formula: "$R = m(g + a)$ (apparent weight increases)",
        description: "When a lift accelerates upward, the normal reaction R (what the scale reads) is GREATER than actual weight. You feel heavier.",
        howToUse: "Apply F=ma with upward positive: R - mg = ma, so R = m(g+a).",
        example: {
          problem: "60 kg person in lift accelerating up at 2 m/s². Find apparent weight.",
          steps: [
            "R = m(g + a)",
            "R = 60(9.8 + 2)",
            "R = 60 × 11.8 = 708 N",
            "In kg.wt: 708/9.8 ≈ 72.2 kg.wt"
          ],
          answer: "R = 708 N ≈ 72.2 kg.wt (heavier than actual 60 kg)"
        }
      },
      {
        name: "Lift Accelerating Down",
        formula: "$R = m(g - a)$ (apparent weight decreases)",
        description: "When a lift accelerates downward, the normal reaction R is LESS than actual weight. You feel lighter. If a=g (free fall), R=0 — weightlessness!",
        howToUse: "Apply F=ma with downward positive: mg - R = ma, so R = m(g-a).",
        example: {
          problem: "60 kg person in lift accelerating down at 2 m/s². Find apparent weight.",
          steps: [
            "R = m(g - a)",
            "R = 60(9.8 - 2)",
            "R = 60 × 7.8 = 468 N",
            "In kg.wt: 468/9.8 ≈ 47.8 kg.wt"
          ],
          answer: "R = 468 N ≈ 47.8 kg.wt (lighter than actual 60 kg)"
        }
      }
    ]
  },
  {
    category: "Inclined Plane",
    color: "lime",
    icon: "📏",
    items: [
      {
        name: "Force Parallel to Plane",
        formula: "$F_{\\parallel} = mg \\sin\\theta$",
        description: "The component of gravity along the slope equals mg sinθ. This is the force pulling the object DOWN the slope.",
        howToUse: "Identify the angle θ (or sin θ). Multiply weight by sin θ.",
        example: {
          problem: "5 kg on plane with sin θ = 0.6. Find gravity component along the slope.",
          steps: [
            "F∥ = mg sin θ",
            "= 5 × 9.8 × 0.6",
            "= 29.4 N (down the slope)"
          ],
          answer: "F∥ = 29.4 N down the slope"
        }
      },
      {
        name: "Normal Reaction on Plane",
        formula: "$R = mg \\cos\\theta$",
        description: "The normal reaction from the slope surface equals mg cosθ for a smooth (frictionless) inclined plane. It acts perpendicular to the surface.",
        howToUse: "Multiply weight by cosθ to find normal reaction.",
        example: {
          problem: "5 kg on plane with cos θ = 0.8. Find normal reaction.",
          steps: [
            "R = mg cos θ",
            "= 5 × 9.8 × 0.8",
            "= 39.2 N (perpendicular to surface)"
          ],
          answer: "R = 39.2 N"
        }
      }
    ]
  },
  {
    category: "Pulleys",
    color: "indigo",
    icon: "⚙️",
    items: [
      {
        name: "Vertical Pulley (Atwood) — Acceleration",
        formula: "$a = \\frac{(m_1 - m_2)g}{m_1 + m_2}$ where $m_1 > m_2$",
        description: "For two masses hanging over a smooth pulley: the larger mass goes down, smaller goes up. Both accelerate at the same rate.",
        howToUse: "Subtract masses (top - bottom), divide by sum, multiply by g.",
        example: {
          problem: "Masses 5 kg and 3 kg over vertical pulley. Find acceleration.",
          steps: [
            "m₁ = 5 kg, m₂ = 3 kg",
            "a = (m₁ - m₂)g / (m₁ + m₂)",
            "a = (5-3) × 9.8 / (5+3)",
            "a = 2 × 9.8 / 8 = 2.45 m/s²"
          ],
          answer: "a = 2.45 m/s²"
        }
      },
      {
        name: "Vertical Pulley — Tension",
        formula: "$T = \\frac{2m_1 m_2 g}{m_1 + m_2}$",
        description: "The string tension is the same throughout (smooth pulley). It equals 2m₁m₂g divided by the sum of masses.",
        howToUse: "Use the formula, or derive by substituting 'a' into one of the equations of motion.",
        example: {
          problem: "Masses 5 kg and 3 kg. Find tension.",
          steps: [
            "T = 2m₁m₂g / (m₁ + m₂)",
            "= 2(5)(3)(9.8) / (5+3)",
            "= 294 / 8 = 36.75 N"
          ],
          answer: "T = 36.75 N"
        }
      },
      {
        name: "Pulley Pressure (Vertical)",
        formula: "$P = 2T$",
        description: "The force on the axle of the pulley (pressure) equals twice the string tension, because both sides of the string pull on the pulley with tension T.",
        howToUse: "After finding T, simply double it for the pulley pressure.",
        example: {
          problem: "T = 36.75 N. Find pulley pressure.",
          steps: [
            "P = 2T = 2 × 36.75 = 73.5 N"
          ],
          answer: "P = 73.5 N"
        }
      },
      {
        name: "Horizontal Table Pulley — Acceleration",
        formula: "$a = \\frac{m_1 g}{m_1 + m_2}$ ($m_1$ hangs, $m_2$ on table)",
        description: "When one mass hangs and the other is on a smooth horizontal table: only the hanging mass's weight drives the system.",
        howToUse: "Hanging mass weight divided by total mass gives acceleration.",
        example: {
          problem: "50 g hangs, 200 g on table. Find acceleration.",
          steps: [
            "m₁ = 50 g, m₂ = 200 g",
            "a = m₁g / (m₁ + m₂)",
            "= 50 × 980 / (50+200)",
            "= 49000 / 250 = 196 cm/s²"
          ],
          answer: "a = 196 cm/s²"
        }
      },
      {
        name: "Horizontal Table Pulley — Pressure",
        formula: "$P = \\sqrt{2} \\times T$",
        description: "For the horizontal table setup, the two string segments are at 90° to each other. The resultant force on pulley = √2 × T.",
        howToUse: "Find T first, then multiply by √2.",
        example: {
          problem: "T = 39200 dyne. Find pulley pressure.",
          steps: [
            "Strings at 90° → P = √2 × T",
            "P = 1.414 × 39200 ≈ 55437 dyne"
          ],
          answer: "P = 39200√2 dyne"
        }
      }
    ]
  }
];

const colorMap = {
  amber: { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-100 text-amber-800", icon: "bg-amber-100 text-amber-600", header: "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-100" },
  blue: { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-100 text-blue-800", icon: "bg-blue-100 text-blue-600", header: "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-100 text-purple-800", icon: "bg-purple-100 text-purple-600", header: "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-100" },
  green: { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-100 text-green-800", icon: "bg-green-100 text-green-600", header: "bg-gradient-to-r from-green-50 to-teal-50 border-green-100" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", badge: "bg-teal-100 text-teal-800", icon: "bg-teal-100 text-teal-600", header: "bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-100" },
  orange: { bg: "bg-orange-50", border: "border-orange-200", badge: "bg-orange-100 text-orange-800", icon: "bg-orange-100 text-orange-600", header: "bg-gradient-to-r from-orange-50 to-red-50 border-orange-100" },
  violet: { bg: "bg-violet-50", border: "border-violet-200", badge: "bg-violet-100 text-violet-800", icon: "bg-violet-100 text-violet-600", header: "bg-gradient-to-r from-violet-50 to-purple-50 border-violet-100" },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", badge: "bg-cyan-100 text-cyan-800", icon: "bg-cyan-100 text-cyan-600", header: "bg-gradient-to-r from-cyan-50 to-sky-50 border-cyan-100" },
  pink: { bg: "bg-pink-50", border: "border-pink-200", badge: "bg-pink-100 text-pink-800", icon: "bg-pink-100 text-pink-600", header: "bg-gradient-to-r from-pink-50 to-rose-50 border-pink-100" },
  red: { bg: "bg-red-50", border: "border-red-200", badge: "bg-red-100 text-red-800", icon: "bg-red-100 text-red-600", header: "bg-gradient-to-r from-red-50 to-orange-50 border-red-100" },
  lime: { bg: "bg-lime-50", border: "border-lime-200", badge: "bg-lime-100 text-lime-800", icon: "bg-lime-100 text-lime-600", header: "bg-gradient-to-r from-lime-50 to-green-50 border-lime-100" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", badge: "bg-indigo-100 text-indigo-800", icon: "bg-indigo-100 text-indigo-600", header: "bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100" },
};

// Parse a vmatrix string into a 3×3 array of cell strings
function parseVMatrix(formulaStr) {
  const match = formulaStr.match(/\\begin\{vmatrix\}([\s\S]*?)\\end\{vmatrix\}/);
  if (!match) return null;
  const body = match[1];
  const rows = body.trim().split('\\\\').map(row =>
    row.trim().split('&').map(cell => {
      // Clean up each cell: remove \vec{x} → x⃗, \vec{i} → î etc.
      let c = cell.trim();
      c = c.replace(/\\vec\{i\}/g, 'î').replace(/\\vec\{j\}/g, 'ĵ').replace(/\\vec\{k\}/g, 'k̂');
      c = c.replace(/\\vec\{([^}]+)\}/g, '$1⃗');
      c = c.replace(/_([a-zA-Z])/g, '$1'); // r_x → rx
      return c.trim();
    })
  );
  return rows;
}

function FormulaItem({ item, color }) {
  const [showExample, setShowExample] = useState(false);
  const c = colorMap[color] || colorMap.amber;

  // Detect if formula contains a vmatrix
  const vmatrixRows = item.formula.includes('\\begin{vmatrix}') ? parseVMatrix(item.formula) : null;

  // For vmatrix formulas, extract the prefix part (e.g. "M⃗ = r⃗ × F⃗ =")
  let formulaPrefix = '';
  if (vmatrixRows) {
    const prefixMatch = item.formula.match(/^\$(.+?)\\begin\{vmatrix\}/);
    if (prefixMatch) {
      formulaPrefix = prefixMatch[1].trim();
    }
  }

  return (
    <Card className={`border ${c.border} overflow-hidden`}>
      <div className="p-5 bg-white">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-slate-800 text-base">{item.name}</h3>
        </div>

        {/* Formula Box */}
        <div className={`${c.bg} rounded-xl p-4 mb-3 border ${c.border} text-center`}>
          {vmatrixRows ? (
            <div className="flex flex-col items-center gap-3">
              {formulaPrefix && (
                <p className="text-base font-semibold text-slate-700 font-mono">
                  <MathRenderer content={`$${formulaPrefix}$`} />
                </p>
              )}
              <DeterminantMatrix rows={vmatrixRows} />
            </div>
          ) : (
            <p className="text-xl font-semibold text-slate-900 tracking-wide leading-relaxed">
              <MathRenderer content={item.formula} />
            </p>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-3">{item.description}</p>

        {/* How to use */}
        <div className="flex items-start gap-2 mb-3 p-2 bg-amber-50 rounded-lg border border-amber-100">
          <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-800 font-medium">{item.howToUse}</p>
        </div>

        {/* Toggle Example */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowExample(!showExample)}
          className={`w-full justify-between text-sm ${c.badge} border-0 hover:opacity-80`}
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Worked Example
          </span>
          {showExample ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </Button>
      </div>

      {showExample && item.example && (
        <div className={`border-t ${c.border} ${c.bg} p-5`}>
          <p className="text-sm font-semibold text-slate-700 mb-4">
            📝 Problem: {item.example.problem}
          </p>
          <div className="space-y-2 mb-4">
            {item.example.steps.map((step, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-sm border border-slate-200">
                  <span className="text-xs font-bold text-slate-600">{i + 1}</span>
                </div>
                <p className="text-sm text-slate-700">
                  <MathRenderer content={step} />
                </p>
              </div>
            ))}
          </div>
          <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-sm font-semibold text-emerald-800">
              ✅ Answer: <MathRenderer content={item.example.answer} />
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}

function TermSection({ formulas }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = formulas.map(cat => ({
    ...cat,
    items: cat.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <Input
          placeholder="Search formulas..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-white border-slate-200 focus:border-amber-400 text-base"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">No formulas found for "{searchTerm}"</p>
          <Button variant="ghost" onClick={() => setSearchTerm('')} className="mt-2">
            <RotateCcw className="w-4 h-4 mr-2" />Clear
          </Button>
        </div>
      ) : (
        <div className="space-y-10">
          {filtered.map((category, ci) => {
            const c = colorMap[category.color] || colorMap.amber;
            return (
              <div key={ci}>
                <div className={`flex items-center gap-3 mb-5 p-4 rounded-2xl border ${c.header}`}>
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{category.category}</h2>
                    <p className="text-sm text-slate-500">{category.items.length} formula{category.items.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {category.items.map((item, ii) => (
                    <FormulaItem key={ii} item={item} color={category.color} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function FormulaSheet() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Calculator className="w-5 h-5 text-indigo-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Formula Reference</h1>
          </div>
          <p className="text-slate-500">Every formula with description, usage guide, and worked example</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Intro Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 mb-8 text-white shadow-lg shadow-indigo-200">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-5 h-5" />
            <h2 className="text-lg font-bold">Complete Formula Reference</h2>
          </div>
          <p className="text-indigo-100 text-sm">Every formula includes a full description, how to use it, and a worked example. Click "Worked Example" on any formula to see it in action!</p>
        </div>

        <Tabs defaultValue="term1">
          <TabsList className="bg-white border border-slate-200/60 p-1 w-full mb-8 rounded-2xl shadow-sm">
            <TabsTrigger value="term1" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              📚 Term 1 — Statics
            </TabsTrigger>
            <TabsTrigger value="term2" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              🚀 Term 2 — Dynamics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="term1">
            <TermSection formulas={term1Formulas} />
          </TabsContent>
          <TabsContent value="term2">
            <TermSection formulas={term2Formulas} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}