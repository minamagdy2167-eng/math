export const quizData = {
  1: [
    {
      question: "What is the moment of a force about a point?",
      options: [
        "The linear displacement caused by the force",
        "The measure of its tendency to cause rotation about that point",
        "The magnitude of the force multiplied by time",
        "The direction of the force"
      ],
      correct: "B",
      explanation: [
        "A moment measures how much a force tries to ROTATE a body around a specific point.",
        "It depends on TWO things: the size of the force AND how far it acts from the point.",
        "The formula is: M = F × L, where L is the perpendicular distance from the point to the line of the force.",
        "As a vector: M⃗ = r⃗ × F⃗, where r⃗ is the position vector from the point to where the force acts.",
        "Option A is wrong — displacement is movement, not rotation tendency.",
        "Option C is wrong — force × time = impulse, which is a completely different quantity."
      ],
      tip: [
        "Think of opening a door: the moment is what makes it swing.",
        "Pushing far from the hinge creates a BIGGER moment than pushing near the hinge with the same force.",
        "Bigger distance from the point = bigger rotational effect."
      ]
    },
    {
      question: "If $\\vec{F} = 2\\vec{i} + 3\\vec{j}$ acts at point A(1,0), what is the position vector from origin O to A?",
      options: [
        "$\\vec{r} = 2\\vec{i} + 3\\vec{j}$",
        "$\\vec{r} = \\vec{i}$",
        "$\\vec{r} = -\\vec{i}$",
        "$\\vec{r} = \\vec{j}$"
      ],
      correct: "B",
      explanation: [
        "The position vector r⃗ goes FROM the reference point TO where the force acts.",
        "Here, we go from origin O(0,0) to point A(1,0).",
        "Formula: r⃗ = A − O = (1−0, 0−0) = (1, 0) = i⃗.",
        "The coordinates of point A directly give the position vector from the origin.",
        "IMPORTANT: r⃗ = i⃗ is NOT the same as F⃗ = 2i⃗ + 3j⃗. They are completely different vectors!",
        "Option A is wrong — that is the force vector F⃗, not the position vector.",
        "Option C is wrong — that would point to A(−1, 0), but A is at (1, 0)."
      ],
      tip: [
        "Position vector r⃗ from origin to point A = the coordinates of A written as a vector.",
        "r⃗ from point B to point A = A − B (always: destination minus starting point).",
        "Never confuse the force vector with the position vector — they describe completely different things."
      ]
    },
    {
      question: "What sign convention is used for counter-clockwise rotation?",
      options: [
        "Negative",
        "Zero",
        "Positive",
        "Undefined"
      ],
      correct: "C",
      explanation: [
        "In mechanics, we follow the standard mathematical convention for rotation direction.",
        "Counter-clockwise (CCW) rotation = POSITIVE (+).",
        "Clockwise (CW) rotation = NEGATIVE (−).",
        "When you compute the cross product r⃗ × F⃗ in 2D: a positive result = CCW moment, a negative result = CW moment.",
        "This is the same convention used on the unit circle in mathematics.",
        "Option A is wrong — negative is reserved for clockwise, not counter-clockwise."
      ],
      tip: [
        "CCW = + (like rotating forward on a number line).",
        "CW = − (going backwards).",
        "If your calculated moment is positive, the force tries to rotate the body counter-clockwise."
      ]
    },
    {
      question: "The moment of a force about a point on its own line of action is:",
      options: [
        "Maximum",
        "Minimum but not zero",
        "Zero",
        "Cannot be determined"
      ],
      correct: "C",
      explanation: [
        "The moment formula is M = F × L, where L is the perpendicular distance from the point to the force's line.",
        "If the point lies ON the force's line of action, then L = 0 (zero perpendicular distance).",
        "Therefore: M = F × 0 = 0.",
        "Mathematically, if the point is on the line of action, then r⃗ is parallel to F⃗.",
        "The cross product of two parallel vectors is always zero: r⃗ × F⃗ = 0.",
        "Option A is wrong — if the point were farthest from the line, the moment would be maximum.",
        "Option B is wrong — zero is absolutely possible and is exactly what happens here."
      ],
      tip: [
        "If the force passes THROUGH the point → moment = zero.",
        "The force has no rotational effect about a point it passes through.",
        "This is why a force along a door doesn't open it — it passes through the door plane without causing rotation."
      ]
    },
    {
      question: "If $||\\vec{M_O}|| = 5$ N·m and $||\\vec{F}|| = \\sqrt{10}$ N, what is the perpendicular distance L?",
      options: [
        "$L = 5/\\sqrt{10}$",
        "$L = \\sqrt{10}/5$",
        "$L = 50$",
        "$L = \\sqrt{50}$"
      ],
      correct: "A",
      explanation: [
        "Start with the moment formula: M = F × L.",
        "Rearrange to find L: L = M / F.",
        "Substitute the values: L = 5 / √10 length units.",
        "Option B is wrong — that would be F/M = √10/5, which is the formula flipped upside-down.",
        "Option C is wrong — that would be M × F = 5 × √10 ≈ 15.8, not a correct rearrangement.",
        "Option D (√50) is also wrong — there is no squaring involved in this formula."
      ],
      tip: [
        "Memorise the 3 forms of the moment formula: M = F × L → L = M ÷ F → F = M ÷ L.",
        "If they give you M and F, use L = M/F.",
        "If they give you M and L, use F = M/L.",
        "If they give you F and L, use M = F × L."
      ]
    }
  ],
  2: [
    {
      question: "What does the Theorem of Moments state?",
      options: [
        "All moments are equal in magnitude",
        "The sum of moments equals the moment of the resultant",
        "Moments always cancel out",
        "Moments depend only on force direction"
      ],
      correct: "B",
      explanation: [
        "The Theorem of Moments (also called Varignon's Theorem) is a powerful shortcut.",
        "It states: the sum of moments of ALL forces about any point = the moment of their RESULTANT about that same point.",
        "In formula: ΣMᵢ = M_R (sum of individual moments = moment of resultant).",
        "This means you do NOT have to find the resultant force first — just add up the individual moments.",
        "Option A is wrong — moments are generally different in magnitude unless there is perfect symmetry.",
        "Option C is wrong — moments cancel only if the system is in equilibrium.",
        "Option D is wrong — moments depend on BOTH force magnitude and perpendicular distance, not just direction."
      ],
      tip: [
        "Varignon's Theorem = a shortcut. Instead of finding R then computing its moment, just add all individual moments.",
        "Use it whenever you need the moment of a resultant — it's almost always faster.",
        "Works about ANY reference point — choose the most convenient one."
      ]
    },
    {
      question: "If $M_O = M_H$, what can we conclude about the resultant's line of action?",
      options: [
        "It passes through O",
        "It passes through H",
        "It is parallel to $\\overrightarrow{OH}$",
        "It bisects $\\overrightarrow{OH}$"
      ],
      correct: "C",
      explanation: [
        "When moments about two points O and H are EQUAL (same magnitude AND same direction/sign), there is a special geometric relationship.",
        "The resultant's line of action is PARALLEL to the segment OH.",
        "Why? If a force creates the same rotational effect about every point along a line, it must be running parallel to that line.",
        "Option A is wrong — if the line passed through O, the moment about O would be zero (not equal to M_H).",
        "Option B is wrong — same reason; passing through H would make M_H = 0.",
        "Option D is wrong — bisecting OH would mean M_O = −M_H (equal magnitude but opposite sign)."
      ],
      tip: [
        "Equal moments (same sign) → resultant line is PARALLEL to OH.",
        "Equal magnitude but opposite sign → resultant line BISECTS OH (passes through midpoint).",
        "These are special cases worth memorising for exam questions."
      ]
    },
    {
      question: "If $M_O = -M_H$, what can we conclude?",
      options: [
        "The forces cancel out",
        "The line of action is parallel to OH",
        "The line of action bisects $\\overrightarrow{OH}$",
        "The moment is zero"
      ],
      correct: "C",
      explanation: [
        "When M_O = −M_H, the moments are equal in MAGNITUDE but opposite in SIGN.",
        "This means the force creates a CCW moment about one point and an equal CW moment about the other.",
        "Geometrically, this only happens when the force's line of action passes through the MIDPOINT of segment OH.",
        "'Bisects OH' means the line cuts through the middle of OH — splitting it into two equal halves.",
        "Option A is wrong — the forces do NOT cancel; there is still a resultant.",
        "Option B is wrong — parallel lines would give M_O = M_H (same sign), not M_O = −M_H.",
        "Option D is wrong — the moment is not zero, it is ±M in magnitude."
      ],
      tip: [
        "M_O = M_H (same sign) → line is PARALLEL to OH.",
        "M_O = −M_H (opposite sign) → line BISECTS OH.",
        "M_O = 0 → line passes THROUGH O.",
        "Learn all three cases — exam questions test each one."
      ]
    },
    {
      question: "For forces $\\vec{F_1}$ and $\\vec{F_2}$ acting at the same point, the moment of resultant about O equals:",
      options: [
        "$\\vec{M_1} \\times \\vec{M_2}$",
        "$\\vec{M_1} + \\vec{M_2}$",
        "$\\vec{M_1} - \\vec{M_2}$",
        "$||\\vec{M_1}|| + ||\\vec{M_2}||$"
      ],
      correct: "B",
      explanation: [
        "By Varignon's Theorem: the moment of the resultant = the algebraic sum of individual moments.",
        "Formula: M_R = M₁ + M₂ (algebraic sum, meaning WITH signs).",
        "'Algebraic sum' means: a CCW moment (+5) + a CW moment (−3) = +2, not 8.",
        "Option A is wrong — cross-multiplying moments has no physical meaning here.",
        "Option C is wrong — subtraction would only apply in a specific case, not in general.",
        "Option D is wrong — adding MAGNITUDES ignores the signs (directions), giving a wrong answer when moments oppose each other."
      ],
      tip: [
        "Always add moments ALGEBRAICALLY (keep the + and − signs).",
        "CCW moments are positive (+), CW moments are negative (−).",
        "DO NOT just add magnitudes — the direction (sign) matters because moments can cancel each other."
      ]
    }
  ],
  3: [
    {
      question: "In 3D, the moment vector is calculated using:",
      options: [
        "Simple multiplication",
        "Dot product",
        "Cross product (determinant)",
        "Division"
      ],
      correct: "C",
      explanation: [
        "In 3D, moment is calculated as M⃗ = r⃗ × F⃗ using the CROSS PRODUCT.",
        "The cross product is evaluated using a 3×3 determinant with i⃗, j⃗, k⃗ in the first row.",
        "It gives THREE components: M_x = r_y·F_z − r_z·F_y (moment about X-axis).",
        "M_y = −(r_x·F_z − r_z·F_x) (moment about Y-axis).",
        "M_z = r_x·F_y − r_y·F_x (moment about Z-axis).",
        "Option B (dot product) gives a SCALAR (single number) — used for work or projection, NOT moments.",
        "In 3D, moments are VECTORS with three components, so we need the cross product."
      ],
      tip: [
        "Cross product → VECTOR result (has i⃗, j⃗, k⃗ components). Use for moments.",
        "Dot product → SCALAR result (single number). Use for work or angle between vectors.",
        "In 3D problems, always expand the 3×3 determinant carefully — sign errors are common in the j⃗ component (it has a minus sign in front)."
      ]
    },
    {
      question: "The moment about the X-axis refers to which component of $\\vec{M}$?",
      options: [
        "The $\\vec{i}$ component",
        "The $\\vec{j}$ component",
        "The $\\vec{k}$ component",
        "The magnitude of $\\vec{M}$"
      ],
      correct: "A",
      explanation: [
        "In 3D coordinate systems: i⃗ represents the x-direction, j⃗ the y-direction, k⃗ the z-direction.",
        "The moment about the X-AXIS = the i⃗ (x) component of the moment vector: M_x = r_y·F_z − r_z·F_y.",
        "The moment about the Y-AXIS = the j⃗ (y) component: M_y = −(r_x·F_z − r_z·F_x).",
        "The moment about the Z-AXIS = the k⃗ (z) component: M_z = r_x·F_y − r_y·F_x.",
        "Option D is wrong — the magnitude ||M⃗|| = √(M_x² + M_y² + M_z²) is a single number, not a directional component."
      ],
      tip: [
        "Match the axis to its component letter: X-axis → i⃗ component, Y-axis → j⃗ component, Z-axis → k⃗ component.",
        "If the question says 'find moment about Y-axis,' extract only the j⃗ component from your result.",
        "Don't forget the NEGATIVE sign in the j⃗ component formula: M_y = −(r_x·F_z − r_z·F_x)."
      ]
    },
    {
      question: "If $\\vec{F} = (2, 3, -1)$ acts at A(1, 0, 2), and we want moment about origin, $\\vec{r}$ equals:",
      options: [
        "(2, 3, -1)",
        "(1, 0, 2)",
        "(-1, 0, -2)",
        "(3, 3, 1)"
      ],
      correct: "B",
      explanation: [
        "The position vector r⃗ goes from the reference point to where the force is applied.",
        "Reference point is the origin O(0, 0, 0). Force applied at A(1, 0, 2).",
        "r⃗ = A − O = (1−0, 0−0, 2−0) = (1, 0, 2).",
        "When finding r⃗ from the origin, the result is simply the coordinates of the point.",
        "Option A is wrong — (2, 3, −1) is the force vector F⃗, not the position vector r⃗.",
        "Option C is wrong — (−1, 0, −2) would be the vector from A back to O (going the wrong way).",
        "Option D is wrong — (3, 3, 1) is a made-up combination of the coordinates."
      ],
      tip: [
        "r⃗ from origin to any point = that point's coordinates written as a vector.",
        "r⃗ from point B to point A = A − B (subtract B from A).",
        "NEVER use the force vector as the position vector — they describe completely different things."
      ]
    },
    {
      question: "The perpendicular distance from origin to line of action in 3D is:",
      options: [
        "$||\\vec{M}|| \\times ||\\vec{F}||$",
        "$||\\vec{M}|| + ||\\vec{F}||$",
        "$||\\vec{M}|| / ||\\vec{F}||$",
        "$||\\vec{F}|| / ||\\vec{M}||$"
      ],
      correct: "C",
      explanation: [
        "The formula is the same as in 2D: L = M / F, but now both M and F are magnitudes of 3D vectors.",
        "Step 1: Calculate the moment vector M⃗ = r⃗ × F⃗ using the determinant.",
        "Step 2: Find ||M⃗|| = √(M_x² + M_y² + M_z²).",
        "Step 3: Find ||F⃗|| = √(F_x² + F_y² + F_z²).",
        "Step 4: L = ||M⃗|| / ||F⃗||.",
        "Option A is wrong — multiplying them gives M × F which has no useful meaning here.",
        "Option D is wrong — that is F/M, which is the formula flipped upside-down."
      ],
      tip: [
        "L = ||M⃗|| ÷ ||F⃗|| — always divide the moment magnitude by the force magnitude.",
        "In 3D, you MUST compute the full magnitude of both vectors before dividing.",
        "The formula M = F × L works in ALL dimensions (2D and 3D)."
      ]
    }
  ],
  4: [
    {
      question: "For two parallel forces in the SAME direction, the resultant magnitude is:",
      options: [
        "$F_1 - F_2$",
        "$F_1 + F_2$",
        "$F_1 \\times F_2$",
        "$\\sqrt{F_1^2 + F_2^2}$"
      ],
      correct: "B",
      explanation: [
        "When two parallel forces act in the SAME direction, they work together and add up.",
        "Resultant = F₁ + F₂ (simple addition).",
        "The resultant has the SAME direction as both forces.",
        "The resultant acts BETWEEN the two forces, closer to the larger force.",
        "Option A (F₁ − F₂) is for forces in OPPOSITE directions.",
        "Option C (F₁ × F₂) is multiplication — this has no physical meaning for parallel forces.",
        "Option D (√(F₁²+F₂²)) is used for PERPENDICULAR forces (at 90° to each other), not parallel ones."
      ],
      tip: [
        "Same direction parallel forces → ADD them: R = F₁ + F₂.",
        "Opposite direction parallel forces → SUBTRACT them: R = |F₁ − F₂|.",
        "Perpendicular forces → USE PYTHAGORAS: R = √(F₁² + F₂²).",
        "Never confuse these three cases in an exam!"
      ]
    },
    {
      question: "For two parallel forces in OPPOSITE directions, the resultant is:",
      options: [
        "Always zero",
        "$|F_1 - F_2|$ in direction of larger force",
        "$F_1 + F_2$",
        "Perpendicular to both"
      ],
      correct: "B",
      explanation: [
        "When two parallel forces act in OPPOSITE directions, the smaller one partially cancels the larger one.",
        "Resultant = |F₁ − F₂|, acting in the direction of the LARGER force.",
        "The resultant acts OUTSIDE the segment AB — beyond the side of the larger force.",
        "Special case: if F₁ = F₂ (equal forces in opposite directions), the resultant IS zero — this is called a COUPLE.",
        "Option A is only true when the forces are equal — a couple, not the general case.",
        "Option C (F₁ + F₂) applies to SAME-direction forces, not opposite.",
        "Option D is wrong — opposite parallel forces don't produce a perpendicular resultant."
      ],
      tip: [
        "Opposite directions → subtract: R = |F₁ − F₂|.",
        "The bigger force 'wins' the direction.",
        "The point of action is OUTSIDE segment AB (beyond the larger force side) — this is different from same-direction forces where the point is BETWEEN A and B."
      ]
    },
    {
      question: "Point of action C divides AB according to:",
      options: [
        "$F_1 \\times AC = F_2 \\times BC$ (inverse proportion)",
        "$F_1 + AC = F_2 + BC$",
        "$F_1 / AC = F_2 / BC$",
        "Equal division always"
      ],
      correct: "A",
      explanation: [
        "The resultant divides the distance between forces in INVERSE proportion.",
        "The rule is: F₁ × AC = F₂ × BC.",
        "This means: the LARGER force is CLOSER to the resultant (smaller distance).",
        "'Inverse proportion' means the big force gets the small distance, and the small force gets the big distance.",
        "Think of it like a seesaw (lever): for balance, heavier side × shorter arm = lighter side × longer arm.",
        "Option B (adding distances to forces) makes no physical or mathematical sense.",
        "Option C (direct proportion F₁/AC = F₂/BC) is wrong — that would mean bigger force gets bigger distance, which is the opposite of what happens.",
        "Option D is wrong — equal division only happens when F₁ = F₂."
      ],
      tip: [
        "Inverse proportion rule: F₁ × AC = F₂ × BC.",
        "Bigger force → closer to resultant (shorter distance).",
        "Think of a lever/seesaw: to balance, heavy weight needs to be close to the fulcrum."
      ]
    },
    {
      question: "If forces 10 N and 20 N act in the same direction 30 cm apart, the resultant is at distance from the 20 N force of:",
      options: [
        "10 cm",
        "15 cm",
        "20 cm",
        "25 cm"
      ],
      correct: "A",
      explanation: [
        "Step 1: The resultant magnitude = F₁ + F₂ = 10 + 20 = 30 N (same direction).",
        "Step 2: Let x = distance of resultant from the 10 N force, so (30 − x) = distance from 20 N force.",
        "Step 3: Apply inverse proportion: 10 × x = 20 × (30 − x).",
        "Step 4: Expand: 10x = 600 − 20x → 30x = 600 → x = 20 cm from the 10 N force.",
        "Step 5: Distance from the 20 N force = 30 − 20 = 10 cm.",
        "This confirms the rule: resultant is CLOSER to the LARGER force (10 cm from 20 N, but 20 cm from 10 N).",
        "Option B (15 cm) would only be correct if both forces were equal (symmetric division)."
      ],
      tip: [
        "After solving, always double-check: is the resultant closer to the bigger force? It should be!",
        "Set up the equation: F₁ × d₁ = F₂ × d₂, where d₁ + d₂ = total distance between forces.",
        "Be careful about which distance you label — define your variables clearly."
      ]
    }
  ],
  5: [
    {
      question: "To find the magnitude of resultant of multiple parallel forces:",
      options: [
        "Multiply all forces",
        "Take algebraic sum (considering direction)",
        "Take average",
        "Use Pythagorean theorem"
      ],
      correct: "B",
      explanation: [
        "When you have many parallel forces, the resultant magnitude = their ALGEBRAIC SUM.",
        "Assign a positive direction (e.g., upward = +) and a negative direction (e.g., downward = −).",
        "Add all forces with their signs: R = ΣF = F₁ + F₂ + F₃ + ...",
        "If R is positive → resultant acts in the positive direction.",
        "If R is negative → resultant acts in the negative direction.",
        "If R = 0 → the system is in equilibrium (no resultant).",
        "Option A (multiply) makes no physical sense for forces.",
        "Option C (average) would give the wrong magnitude unless all forces are equal.",
        "Option D (Pythagorean theorem) only applies to perpendicular forces, not parallel ones."
      ],
      tip: [
        "TWO steps for any parallel force problem: (1) Find R = algebraic sum. (2) Find position using moments.",
        "Choose a consistent positive direction and stick to it for the entire problem.",
        "Always state which direction you chose as positive at the start of your working."
      ]
    },
    {
      question: "To find position of resultant, we use:",
      options: [
        "Only force magnitudes",
        "Sum of moments about any point",
        "Average position",
        "Largest force position"
      ],
      correct: "B",
      explanation: [
        "After finding the resultant magnitude R, you need its position (where it acts).",
        "Use the Theorem of Moments: ΣMoments of all forces about a point = Moment of resultant about that point.",
        "Choose a convenient reference point (often one of the force positions to eliminate one term).",
        "Set up the equation: ΣFᵢ × dᵢ = R × x, where x is the unknown distance of the resultant.",
        "Solve for x: x = (ΣFᵢ × dᵢ) / R.",
        "Option A is wrong — you need distances too, not just magnitudes.",
        "Option C is wrong — average position is only valid for equal forces equally spaced.",
        "Option D is wrong — the resultant position is determined by the balance of moments, not just the largest force."
      ],
      tip: [
        "Choose the leftmost force or leftmost support as your moment reference point — this often eliminates one unknown.",
        "Always take moments as positive in one consistent direction (usually CCW).",
        "Check your answer: the resultant should be between the outermost forces (for same-direction forces)."
      ]
    },
    {
      question: "If upward forces total 50 N and downward forces total 30 N, the resultant is:",
      options: [
        "80 N downward",
        "80 N upward",
        "20 N downward",
        "20 N upward"
      ],
      correct: "D",
      explanation: [
        "Assign upward = positive (+) and downward = negative (−).",
        "Total upward = +50 N. Total downward = −30 N.",
        "Algebraic sum: R = +50 + (−30) = +50 − 30 = +20 N.",
        "The result is POSITIVE (+20), so the resultant is UPWARD.",
        "The magnitude is 20 N.",
        "Option A (80 N downward) is doubly wrong — wrong magnitude and wrong direction.",
        "Option B (80 N upward) is wrong — 80 would only be correct if BOTH were upward (50+30=80).",
        "Option C (20 N downward) has the right magnitude but wrong direction — the upward forces are larger, so upward wins."
      ],
      tip: [
        "R = (total upward) − (total downward). Positive result = upward; negative = downward.",
        "The LARGER side always determines the direction of the resultant.",
        "If they're equal, R = 0 (equilibrium — no resultant)."
      ]
    }
  ],
  6: [
    {
      question: "For equilibrium of coplanar parallel forces, which condition(s) must hold?",
      options: [
        "Only ΣF = 0",
        "Only ΣM = 0",
        "Both ΣF = 0 and ΣM = 0",
        "Neither is required"
      ],
      correct: "C",
      explanation: [
        "For complete equilibrium, a body must have NO translation AND NO rotation.",
        "Condition 1: ΣF = 0 — the sum of all forces must be zero (no tendency to slide or move).",
        "Condition 2: ΣM = 0 — the sum of all moments about ANY point must be zero (no tendency to spin).",
        "BOTH must hold simultaneously. Satisfying only one is not enough.",
        "Example of failure: If ΣF = 0 but ΣM ≠ 0 → the body will ROTATE even though it doesn't translate.",
        "Example of failure: If ΣM = 0 but ΣF ≠ 0 → the body will SLIDE even though it doesn't rotate.",
        "Options A and B are wrong because one condition alone does not guarantee full equilibrium."
      ],
      tip: [
        "Equilibrium = NO movement at all: no sliding (ΣF=0) AND no spinning (ΣM=0).",
        "In exam problems, you always use BOTH equations to find two unknown reactions.",
        "You can take moments about ANY point — choose a point where an unknown force acts to eliminate it from the equation."
      ]
    },
    {
      question: "'About to rotate' means:",
      options: [
        "All reactions are equal",
        "Reaction at the far support is zero",
        "The body is moving",
        "Sum of forces is maximum"
      ],
      correct: "B",
      explanation: [
        "'About to rotate' is a critical phrase in equilibrium problems — it means the body is on the verge of tipping.",
        "When a body is 'about to rotate about point C,' it is on the verge of LIFTING OFF the other support (say D).",
        "At this verge: the reaction at D becomes ZERO: R_D = 0.",
        "The body is still in equilibrium (just barely), so we can still use ΣF = 0 and ΣM = 0.",
        "Set R_D = 0 as the starting condition, then solve for whatever is asked.",
        "Option A is wrong — 'about to rotate' says nothing about reactions being equal.",
        "Option C is wrong — the body is NOT moving yet; it is at the tipping point but still stationary.",
        "Option D is wrong — 'about to rotate' tells you about reaction forces, not about the applied load being maximum."
      ],
      tip: [
        "'About to rotate about C' → set reaction at the OTHER support = 0.",
        "This gives you one equation for free, simplifying the problem significantly.",
        "Think of it as: one support has just barely left the ground — it carries zero load at that moment."
      ]
    },
    {
      question: "A beam with supports at ends has reactions. If a load is placed at the center:",
      options: [
        "One reaction is zero",
        "Reactions are unequal",
        "Reactions are equal",
        "Both reactions are zero"
      ],
      correct: "C",
      explanation: [
        "When the load is exactly at the CENTRE of the beam, the geometry is perfectly symmetrical.",
        "Both supports are the same distance from the load.",
        "By symmetry: each support carries EXACTLY half the load: R₁ = R₂ = W/2.",
        "Verify using moments: take moments about R₁: W × (L/2) = R₂ × L → R₂ = W/2. Similarly R₁ = W/2. ✓",
        "Option A is wrong — zero reaction would mean one support does nothing, which violates the symmetric setup.",
        "Option B is wrong — unequal reactions only occur when the load is NOT at the centre.",
        "Option D is wrong — if both were zero, the beam would fall!"
      ],
      tip: [
        "Symmetric loading (load at centre) → equal reactions, each = W/2.",
        "Load closer to one support → that support carries MORE of the load.",
        "Always verify your reaction results using BOTH equilibrium equations: ΣF = 0 and ΣM = 0."
      ]
    }
  ],
  7: [
    {
      question: "A couple consists of:",
      options: [
        "Two forces of equal magnitude in same direction",
        "Two forces of equal magnitude, opposite direction, different lines of action",
        "Three or more forces",
        "A single large force"
      ],
      correct: "B",
      explanation: [
        "A couple has THREE specific requirements — all must be met simultaneously.",
        "Requirement 1: The two forces must be EQUAL in magnitude (same size).",
        "Requirement 2: They must act in OPPOSITE directions (anti-parallel).",
        "Requirement 3: They must have DIFFERENT lines of action (parallel but NOT the same line).",
        "If lines were the same: forces would cancel completely (no rotation, no translation) — that's just equilibrium.",
        "Different lines create a PURE ROTATION with NO translation (the resultant force is zero, but the moment is not).",
        "Option A is wrong — same direction would just add up to a larger single force.",
        "Option C is wrong — a couple is specifically and exactly TWO forces.",
        "Option D is wrong — a couple is always two forces, never one."
      ],
      tip: [
        "Couple = equal magnitude, opposite direction, different lines.",
        "The key property: a couple has ZERO net force but NON-ZERO moment.",
        "The perpendicular distance between the two force lines is called the 'ARM' of the couple."
      ]
    },
    {
      question: "The moment of a couple is:",
      options: [
        "Different at different points",
        "Constant regardless of reference point",
        "Always zero",
        "Depends on force direction only"
      ],
      correct: "B",
      explanation: [
        "This is the most important and unique property of a couple: its moment is CONSTANT.",
        "No matter which reference point you choose, the couple produces the same moment M = F × r.",
        "This is why couples are called 'free vectors' — they can be placed anywhere in a plane without changing their rotational effect.",
        "Mathematical proof: For any point P at distance d from the first force line: M = F × (d + r) − F × d = F × r + F × d − F × d = F × r. The d cancels!",
        "Option A is wrong — this constant property is what distinguishes couples from regular forces.",
        "Option C is wrong — a couple's moment is zero ONLY if F = 0 or r = 0, which would mean no couple exists.",
        "Option D is wrong — the moment depends on both force magnitude AND arm length, not just direction."
      ],
      tip: [
        "Couple moment = F × r = constant everywhere. This is what makes couples special.",
        "For regular forces, the moment changes depending on the reference point.",
        "For couples, the moment is the same about every single point in the plane."
      ]
    },
    {
      question: "If moment of couple is 100 N·m and force is 20 N, the arm is:",
      options: [
        "2000 m",
        "80 m",
        "5 m",
        "120 m"
      ],
      correct: "C",
      explanation: [
        "The couple moment formula is M = F × r, where r is the arm (perpendicular distance between the two force lines).",
        "Rearrange to find the arm: r = M / F.",
        "Substitute: r = 100 / 20 = 5 m.",
        "Option A (2000) would be M × F = 100 × 20. That is the wrong operation.",
        "Option B (80) would be M − F = 100 − 20. Subtracting force from moment has no physical meaning.",
        "Option D (120) would be M + F = 100 + 20. Also has no physical meaning."
      ],
      tip: [
        "Couple formula: M = F × r (moment = force × arm).",
        "To find arm: r = M ÷ F.",
        "To find force: F = M ÷ r.",
        "The 'arm' is the perpendicular distance between the two parallel lines of the couple's forces."
      ]
    },
    {
      question: "Two couples equilibrate when:",
      options: [
        "$M_1 = M_2$",
        "$M_1 + M_2 = 0$",
        "$M_1 \\times M_2 = 0$",
        "$M_1 = 2M_2$"
      ],
      correct: "B",
      explanation: [
        "For equilibrium, the algebraic sum of ALL moments must equal zero: ΣM = 0.",
        "For two couples: M₁ + M₂ = 0, which means M₂ = −M₁.",
        "This means the two couples must be EQUAL in magnitude but OPPOSITE in direction.",
        "One must be CCW (+) and the other CW (−) with the exact same magnitude.",
        "Option A (M₁ = M₂) means the two couples are EQUIVALENT — they have the same effect. This is NOT equilibrium; it would double the rotation!",
        "Option C (M₁ × M₂ = 0) would only be true if one couple has zero moment — meaning it doesn't exist.",
        "Option D (M₁ = 2M₂) creates a net resultant of M₁ + M₂ = 2M₂ + M₂ = 3M₂ ≠ 0."
      ],
      tip: [
        "Equilibrating couples: M₁ = −M₂ (sum = 0, opposite signs).",
        "Equivalent couples: M₁ = M₂ (same magnitude AND same sign).",
        "These two concepts are easy to confuse — know the difference!"
      ]
    }
  ],
  8: [
    {
      question: "The resultant of multiple couples is:",
      options: [
        "A single force",
        "A single resultant couple",
        "Always zero",
        "Two parallel forces"
      ],
      correct: "B",
      explanation: [
        "When you add multiple couples together, the result is always ONE resultant couple.",
        "The resultant couple's moment = algebraic sum of all individual couple moments: M = M₁ + M₂ + M₃ + ...",
        "A couple can NEVER become a single force — couples have zero net force, and adding zeros still gives zero.",
        "Option A is wrong — a force has a net translational effect; couples have zero net force, so they can never reduce to a force.",
        "Option C (always zero) is wrong — the resultant is zero ONLY if all the moments cancel perfectly.",
        "Option D (two parallel forces) is wrong — that would describe the individual couples within the system, not the resultant."
      ],
      tip: [
        "Couples + couples = one couple (always).",
        "The resultant moment = algebraic sum of all couple moments.",
        "Even the resultant couple can be zero if all moments cancel — this is the equilibrium condition for a system of couples."
      ]
    },
    {
      question: "Resultant moment of couples is calculated as:",
      options: [
        "$M_1 \\times M_2 \\times M_3$",
        "$M_1 + M_2 + M_3 + ...$",
        "Average of all moments",
        "Maximum moment only"
      ],
      correct: "B",
      explanation: [
        "The resultant couple moment is the ALGEBRAIC SUM of all individual couple moments.",
        "Formula: M_total = M₁ + M₂ + M₃ + ... (include ALL couples with their signs).",
        "CCW couples are positive (+). CW couples are negative (−).",
        "Example: +120 + (−180) + (−120) = −180 N·cm (the remaining moment after cancellations).",
        "Option A (multiply) has no physical basis — you never multiply moments.",
        "Option C (average) would give the wrong answer unless all moments happened to be equal.",
        "Option D (maximum only) ignores all other couples — clearly wrong."
      ],
      tip: [
        "Sum all moments with their signs. CCW = (+), CW = (−).",
        "Moments in the same direction reinforce each other. Opposite directions cancel.",
        "The final sign of M_total tells you the overall rotation direction of the system."
      ]
    },
    {
      question: "To equilibrate a couple of moment +200 N·cm, we need a couple of moment:",
      options: [
        "+200 N·cm",
        "-200 N·cm",
        "0 N·cm",
        "+400 N·cm"
      ],
      correct: "B",
      explanation: [
        "To EQUILIBRATE a couple means to cancel it out completely so ΣM = 0.",
        "The original couple has +200 N·cm (CCW direction).",
        "We need a couple that makes the total = 0: +200 + M_new = 0.",
        "Solve: M_new = −200 N·cm (a CW couple of magnitude 200 N·cm).",
        "Option A (+200 N·cm) would DOUBLE the rotation, not cancel it. Same sign = equivalent, not equilibrating.",
        "Option C (0 N·cm) means no couple at all — doing nothing doesn't equilibrate anything.",
        "Option D (+400 N·cm) would give a total of +600 N·cm — making things worse, not better."
      ],
      tip: [
        "To equilibrate: flip the sign of the moment. Equilibrating couple = −M_original.",
        "CCW (+) couple needs a CW (−) couple of the same magnitude to cancel it.",
        "Think of it like a tug-of-war: to stop the rotation, pull the other way with the same force."
      ]
    },
    {
      question: "In a parallelogram with angle 60°, the perpendicular distance between opposite sides is:",
      options: [
        "side × cos(60°)",
        "side × sin(60°)",
        "side × tan(60°)",
        "side / sin(60°)"
      ],
      correct: "B",
      explanation: [
        "Consider a parallelogram with side length 'a' and interior angle θ = 60°.",
        "To find the perpendicular HEIGHT (distance between two parallel sides), drop a perpendicular from a corner to the opposite side.",
        "This creates a right triangle where: hypotenuse = a (the side), angle = 60°.",
        "The perpendicular height = opposite side of the right triangle = a × sin(60°) = a × (√3/2).",
        "Option A (cos 60°) would give the horizontal projection of the side, not the height.",
        "cos gives the horizontal component; sin gives the vertical (perpendicular) component.",
        "Option C (tan 60°) is used for the ratio of opposite/adjacent — not directly applicable here.",
        "Option D (side / sin 60°) is greater than the side length — that's too large to be a height inside the shape."
      ],
      tip: [
        "Perpendicular height in a parallelogram = side × sin(angle).",
        "SIN = perpendicular (height) component. COS = parallel (horizontal) component.",
        "This formula is also used for the arm of couples in parallelogram shapes."
      ]
    }
  ],
  9: [
    {
      question: "A particle has S = 3t - 0.5t². What is the initial velocity?",
      options: [
        "V₀ = 0",
        "V₀ = 3",
        "V₀ = -1",
        "V₀ = 6"
      ],
      correct: "B",
      explanation: [
        "Velocity is the FIRST DERIVATIVE of displacement: V = dS/dt.",
        "Differentiate S = 3t − 0.5t²: V = dS/dt = 3 − 2(0.5)t = 3 − t.",
        "Initial velocity means the velocity at t = 0 (the very start of motion).",
        "Substitute t = 0: V₀ = 3 − 0 = 3 units of speed.",
        "Option A (0) would mean the particle starts from rest — incorrect here since V₀ = 3.",
        "Option C (−1) has no basis in the calculation.",
        "Option D (6) — perhaps confused with the coefficient of t² (which is 0.5, and 2 × 0.5 = 1), or confused with the 2nd derivative."
      ],
      tip: [
        "Initial velocity = V at t = 0. Always differentiate S first to get V, then substitute t = 0.",
        "Do NOT read the initial velocity directly from S — you must differentiate first!",
        "Initial conditions: t = 0 → gives initial values. The word 'initial' always means t = 0."
      ]
    },
    {
      question: "If V = t² - 6t, the motion is decelerated when:",
      options: [
        "0 < t < 3",
        "3 < t < 6",
        "t > 6",
        "t < 0"
      ],
      correct: "B",
      explanation: [
        "Deceleration (retardation) means the speed is DECREASING — velocity and acceleration have OPPOSITE signs.",
        "The condition for deceleration is: V × a < 0.",
        "Find acceleration: a = dV/dt = 2t − 6.",
        "Now analyse the signs of V and a in each interval:",
        "For 0 < t < 3: V = t²−6t = t(t−6). Since 0<t<3, t>0 and (t−6)<0, so V < 0. Also a = 2t−6 < 0 (since t<3). Both V and a are negative → same sign → V × a > 0 → ACCELERATED.",
        "For 3 < t < 6: V = t(t−6). t>0, but (t−6)<0, so V < 0. But a = 2t−6 > 0 (since t>3). V is negative, a is positive → OPPOSITE signs → V × a < 0 → DECELERATED. ✓",
        "For t > 6: V > 0 (both factors positive) and a > 0 → same sign → ACCELERATED again."
      ],
      tip: [
        "Deceleration = V and a have OPPOSITE signs (V × a < 0).",
        "Acceleration = V and a have SAME signs (V × a > 0).",
        "Make a sign table: find where V = 0 and a = 0, then check each interval.",
        "V = 0 means the particle momentarily stops (direction change). a = 0 means acceleration changes direction."
      ]
    }
  ],
  10: [
    {
      question: "If V = 10 - 2t, what is the displacement in the 3rd second (from t=2 to t=3)?",
      options: [
        "3 m",
        "5 m",
        "6 m",
        "4 m"
      ],
      correct: "B",
      explanation: [
        "The 'nth second' means the time interval from t = (n−1) to t = n. So the 3rd second = t=2 to t=3.",
        "First, check if direction changes in [2, 3]: set V = 0 → 10 − 2t = 0 → t = 5 s. Since t=5 is outside [2,3], no direction change.",
        "Because there is no direction change, displacement = distance traveled.",
        "Integrate V to get S: S = ∫(10 − 2t) dt = 10t − t² + C.",
        "Displacement in 3rd second = S(3) − S(2) = (10×3 − 3²) − (10×2 − 2²) = (30 − 9) − (20 − 4) = 21 − 16 = 5 m.",
        "Option A (3) and Option C (6) have no basis in the calculation.",
        "Option D (4) might come from a sign error or forgetting to subtract S(2)."
      ],
      tip: [
        "nth second = interval from t=(n−1) to t=n. For 3rd second: t=2 to t=3.",
        "Always check if V = 0 in the interval — if yes, split the interval at that point.",
        "Displacement in interval = S(end) − S(start). This can be negative if motion reverses."
      ]
    },
    {
      question: "A particle starts from rest. With acceleration a = 6t - 4, what is V(t)?",
      options: [
        "V = 6t - 4",
        "V = 3t² - 4t",
        "V = 3t² - 4t + C (C unknown)",
        "V = 6t"
      ],
      correct: "B",
      explanation: [
        "To find V from acceleration, integrate: V = ∫a dt = ∫(6t − 4) dt.",
        "Perform the integration: V = 3t² − 4t + C (where C is the integration constant).",
        "'Starts from rest' means V₀ = 0, meaning V = 0 when t = 0.",
        "Substitute t = 0: 0 = 3(0)² − 4(0) + C → C = 0.",
        "Therefore: V = 3t² − 4t.",
        "Option A (V = 6t − 4) is wrong — that just copies the acceleration formula directly without integrating.",
        "Option C is technically the correct integral but with C unknown — the initial condition V₀ = 0 makes C = 0, so B is the complete answer.",
        "Option D (V = 6t) seems to only integrate one term and drops the −4 term."
      ],
      tip: [
        "'Starts from rest' → V₀ = 0 → use this to find C = 0 after integrating.",
        "'Starts from origin' → S₀ = 0 → use this to find the constant after the second integration.",
        "Always find the integration constant using given initial conditions — never leave it unknown if data is provided."
      ]
    }
  ],
  11: [
    {
      question: "A 2 kg ball moving at 6 m/s hits a wall and bounces back at 4 m/s. The magnitude of change in momentum is:",
      options: [
        "4 kg·m/s",
        "20 kg·m/s",
        "2 kg·m/s",
        "12 kg·m/s"
      ],
      correct: "B",
      explanation: [
        "Change in momentum: ΔH = m(V₂ − V₁), where signs matter!",
        "Choose towards the wall as positive: V₁ = +6 m/s (moving towards wall).",
        "After bouncing: the ball moves AWAY from the wall: V₂ = −4 m/s (opposite direction).",
        "ΔH = m × (V₂ − V₁) = 2 × (−4 − 6) = 2 × (−10) = −20 kg·m/s.",
        "The MAGNITUDE of change = |−20| = 20 kg·m/s.",
        "Option A (4 kg·m/s) = 2 × 2 (using only |V₂ − V₁| = 2, which forgets the signs).",
        "Option C (2 kg·m/s) is also wrong — too small.",
        "Option D (12 kg·m/s) = 2 × 6 = momentum before impact, not the change."
      ],
      tip: [
        "Always assign positive/negative to DIRECTIONS before calculating ΔH.",
        "When a ball bounces back, the return velocity has the OPPOSITE sign to the incoming velocity.",
        "ΔH = m(V_final − V_initial). The signs make ΔH larger than either individual momentum when the ball reverses direction."
      ]
    },
    {
      question: "A train of mass 40 tonnes moves at 72 km/h. Its momentum is:",
      options: [
        "2880 kg·m/s",
        "8 × 10⁵ kg·m/s",
        "40 × 72 kg·m/s",
        "8 × 10³ kg·m/s"
      ],
      correct: "B",
      explanation: [
        "ALWAYS convert to SI units before calculating.",
        "Mass: 40 tonnes = 40 × 1000 kg = 40,000 kg = 4 × 10⁴ kg.",
        "Speed: 72 km/h × (5/18) = 72 × 5 / 18 = 360/18 = 20 m/s.",
        "(The conversion factor: multiply km/h by 5/18 to get m/s, or divide by 3.6.)",
        "Momentum: H = m × V = 40,000 × 20 = 800,000 = 8 × 10⁵ kg·m/s.",
        "Option A (2880) = 40 × 72 = using km/h directly without converting. WRONG units.",
        "Option C (40 × 72) same error — mixed units (tonnes × km/h).",
        "Option D (8 × 10³) = 8000, which is off by a factor of 100 (possibly forgot to convert tonnes fully)."
      ],
      tip: [
        "ALWAYS convert before calculating: kg (not tonnes), m/s (not km/h).",
        "1 tonne = 1000 kg.",
        "km/h to m/s: multiply by 5/18 (or divide by 3.6).",
        "m/s to km/h: multiply by 18/5 (or multiply by 3.6)."
      ]
    }
  ],
  12: [
    {
      question: "A car moves at uniform velocity. Engine force = 600 N. Air resistance ∝ V. At double the speed, the engine force to maintain uniform velocity is:",
      options: [
        "600 N",
        "900 N",
        "1200 N",
        "300 N"
      ],
      correct: "C",
      explanation: [
        "At UNIFORM VELOCITY: acceleration = 0, so net force = 0.",
        "This means engine force = resistance force.",
        "At original speed V: engine = resistance = 600 N.",
        "Given: resistance ∝ V (proportional to velocity). This means R/V = constant.",
        "At double the speed 2V: new resistance R₂ = R₁ × (2V/V) = 2 × 600 = 1200 N.",
        "For uniform motion at 2V: new engine force must equal new resistance = 1200 N.",
        "Option A (600 N) is wrong — same force at double speed would mean the car decelerates (resistance > engine).",
        "Option B (900 N) would be correct if R ∝ V^(some other power) — not for R ∝ V.",
        "Option D (300 N) would halve the resistance, which makes no sense for doubling speed."
      ],
      tip: [
        "R ∝ V: double speed → double resistance. New engine = 2 × old engine.",
        "R ∝ V²: double speed → 4× resistance. New engine = 4 × old engine.",
        "At uniform velocity: Engine force = Resistance (always, since a = 0)."
      ]
    }
  ],
  13: [
    {
      question: "A 5 kg body starts from rest and travels 160 cm in 4 seconds. The net force is:",
      options: [
        "0.5 N",
        "2.5 N",
        "1 N",
        "5 N"
      ],
      correct: "C",
      explanation: [
        "Step 1: Convert units. S = 160 cm = 1.6 m (must be in metres for SI).",
        "Step 2: Find acceleration. 'Starts from rest' → V₀ = 0. Use: S = V₀t + ½at².",
        "1.6 = 0×4 + ½ × a × 4² → 1.6 = ½ × a × 16 → 1.6 = 8a → a = 0.2 m/s².",
        "Step 3: Apply Newton's 2nd Law: F = ma = 5 × 0.2 = 1 N.",
        "Option A (0.5 N): uses F = ma but with a wrong calculation (perhaps using cm instead of m: 1.6/8 = 0.2, but ½ × 5 × 0.2 = 0.5? No — F = 5 × 0.2 = 1, not 0.5).",
        "Option B (2.5 N): perhaps calculated a = 0.5 m/s² (forgot the ½ in kinematic equation).",
        "Option D (5 N): perhaps used F = m × S/t² = 5 × 1.6/16 = 0.5, or some other error."
      ],
      tip: [
        "Always convert cm to m before using SI formulas.",
        "'From rest' means V₀ = 0 — use S = ½at² to find a.",
        "Two-step process: (1) Find a from kinematics. (2) Find F = ma."
      ]
    },
    {
      question: "A 60 kg person is in a lift. The balance reads 72 kg·wt when the lift moves upward. The acceleration is:",
      options: [
        "g/5 ≈ 1.96 m/s²",
        "g ≈ 9.8 m/s²",
        "2g ≈ 19.6 m/s²",
        "0"
      ],
      correct: "A",
      explanation: [
        "When a lift accelerates UPWARD, the person feels heavier — the scale reads MORE than actual weight.",
        "The equation of motion for upward acceleration: R = m(g + a).",
        "Convert: R = 72 kg·wt = 72 × 9.8 N = 705.6 N. Mass m = 60 kg.",
        "Substitute: 705.6 = 60 × (9.8 + a).",
        "Divide: 705.6/60 = 11.76 = 9.8 + a.",
        "Solve: a = 11.76 − 9.8 = 1.96 m/s² ≈ g/5.",
        "Option D (0) would mean the lift is stationary or at constant speed — but scale reading > actual weight means there IS acceleration.",
        "Option B (g = 9.8) would mean doubling the weight — extreme acceleration.",
        "Option C (2g) would mean the scale reads 3× the actual weight — also extreme."
      ],
      tip: [
        "Scale reads MORE than actual mass → lift is accelerating UPWARD (or decelerating downward): R = m(g+a).",
        "Scale reads LESS than actual mass → lift is accelerating DOWNWARD (or decelerating upward): R = m(g−a).",
        "Scale reads SAME as actual mass → uniform motion or rest: R = mg."
      ]
    }
  ],
  14: [
    {
      question: "A 20 kg body on a smooth plane with sin θ = 0.5, starting from rest with force 200 N up the plane. After 3 seconds, velocity is:",
      options: [
        "15 m/s",
        "12 m/s",
        "18 m/s",
        "9 m/s"
      ],
      correct: "A",
      explanation: [
        "Step 1: Find the gravity component along the plane (opposing upward motion).",
        "Gravity down the slope = mg sin θ = 20 × 10 × 0.5 = 100 N.",
        "(Using g = 10 m/s² for cleaner numbers.)",
        "Step 2: Apply Newton's 2nd Law along the plane (taking up as positive).",
        "Net force = Applied force − gravity component = 200 − 100 = 100 N.",
        "Step 3: Find acceleration: a = F/m = 100/20 = 5 m/s².",
        "Step 4: Find velocity after 3 seconds (starts from rest, so V₀ = 0).",
        "V = V₀ + at = 0 + 5 × 3 = 15 m/s.",
        "Option B (12) and D (9) correspond to different accelerations.",
        "Option C (18) would require a = 6 m/s², which is too large."
      ],
      tip: [
        "On an inclined plane, gravity has TWO components: mg sinθ (along the slope) and mg cosθ (perpendicular to slope).",
        "For forces along the slope: apply F = ma along that direction only.",
        "Normal reaction R = mg cosθ (perpendicular to slope — no motion in that direction)."
      ]
    }
  ],
  15: [
    {
      question: "Two masses m₁ = 6 kg and m₂ = 2 kg hang over a smooth vertical pulley. The acceleration is:",
      options: [
        "2.45 m/s²",
        "4.9 m/s²",
        "9.8 m/s²",
        "1.96 m/s²"
      ],
      correct: "B",
      explanation: [
        "For a vertical pulley system (Atwood machine), use the standard formula.",
        "a = (m₁ − m₂) × g / (m₁ + m₂).",
        "Substitute: a = (6 − 2) × 9.8 / (6 + 2) = 4 × 9.8 / 8 = 39.2 / 8 = 4.9 m/s².",
        "The heavier mass (6 kg) falls down. The lighter mass (2 kg) rises up. Both move at the same acceleration.",
        "Option A (2.45) = g/4 — this would be the result for masses 6 and 2 if only the difference mattered without the sum.",
        "Option C (9.8) = g — this would only be the case if one mass were zero (free fall).",
        "Option D (1.96) = g/5 — this corresponds to different mass values."
      ],
      tip: [
        "Vertical pulley (Atwood machine) formula: a = (m₁ − m₂)g / (m₁ + m₂).",
        "Both masses have the SAME acceleration (they're connected by the same string).",
        "The heavier mass always moves DOWN; the lighter mass always moves UP.",
        "Tension T = 2m₁m₂g / (m₁ + m₂). Always between the two individual weights."
      ]
    },
    {
      question: "For masses m₁ and m₂ over a vertical pulley, the string tension T is:",
      options: [
        "$T = \\frac{m_1 m_2 g}{m_1 + m_2}$",
        "$T = \\frac{2m_1 m_2 g}{m_1 + m_2}$",
        "$T = (m_1 - m_2)g$",
        "$T = (m_1 + m_2)g$"
      ],
      correct: "B",
      explanation: [
        "Derive T step by step from Newton's 2nd Law for each mass.",
        "For m₁ (heavier, falling): m₁a = m₁g − T ... (equation 1).",
        "For m₂ (lighter, rising): m₂a = T − m₂g ... (equation 2).",
        "Add both equations: (m₁ + m₂)a = (m₁ − m₂)g → a = (m₁ − m₂)g / (m₁ + m₂).",
        "Substitute a back into equation 2: T = m₂(g + a) = m₂[g + (m₁−m₂)g/(m₁+m₂)].",
        "Simplify: T = m₂g × [(m₁+m₂ + m₁−m₂)/(m₁+m₂)] = m₂g × [2m₁/(m₁+m₂)] = 2m₁m₂g/(m₁+m₂).",
        "Option A is T/2 — missing the factor of 2.",
        "Option C would be the net force, not the tension.",
        "Option D would be the total weight — greater than any tension in this system."
      ],
      tip: [
        "Memorise: T = 2m₁m₂g / (m₁ + m₂).",
        "The tension is ALWAYS between m₂g and m₁g: m₂g < T < m₁g.",
        "Pulley pressure P = 2T (two string tensions pull down on the pulley axle)."
      ]
    }
  ]
};

export const getQuizForLesson = (lessonNumber) => {
  return quizData[lessonNumber] || [];
};