import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft, Search, BookOpen, Lightbulb, Info, RotateCcw, ChevronDown, ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import MathRenderer from '@/components/learning/MathRenderer';

const term1Concepts = [
  {
    term: "Force (F⃗)",
    category: "Basics",
    color: "amber",
    definition: "A force is a push or pull that can cause an object to move, stop, or change shape. It is a VECTOR — it has both magnitude (how strong) and direction (which way).",
    unit: "Newton (N) in SI system; kg·wt or dyne in other systems",
    keyFacts: [
      "1 kg·wt = 9.8 N",
      "1 dyne = 1 gm·cm/s²",
      "Forces add as vectors, not just numbers",
      "A force can only produce a moment if it doesn't pass through the reference point"
    ],
    example: "A 10 N force pushing to the right is written as F⃗ = 10i⃗"
  },
  {
    term: "Moment of a Force (M⃗)",
    category: "Statics",
    color: "blue",
    definition: "The moment (or torque) of a force about a point measures how much the force tends to ROTATE a body about that point. The farther the force is from the point, the greater the moment.",
    unit: "N·m, N·cm, kg·wt·cm",
    keyFacts: [
      "M = F × L (magnitude formula)",
      "L is the PERPENDICULAR distance from the point to the force's line of action",
      "Counter-clockwise moment = POSITIVE (+)",
      "Clockwise moment = NEGATIVE (−)",
      "Moment of a force about a point ON its line of action = ZERO"
    ],
    example: "A 10 N force acting 3 m away perpendicular to the moment arm: M = 10 × 3 = 30 N·m"
  },
  {
    term: "Position Vector (r⃗)",
    category: "Statics",
    color: "green",
    definition: "The position vector r⃗ goes FROM the reference point (where we calculate the moment) TO any point on the force's line of action. It tells us 'where is the force relative to where I'm measuring?'",
    unit: "Length units (m, cm)",
    keyFacts: [
      "r⃗ = Point on force line − Reference point",
      "r⃗ = A − B means 'from B to A'",
      "Direction matters: r⃗ from O to A ≠ r⃗ from A to O",
      "In 2D: r⃗ = (x, y); In 3D: r⃗ = (x, y, z)"
    ],
    example: "To find moment about B(2,1), for force at A(5,3): r⃗ = A − B = (5−2, 3−1) = (3, 2)"
  },
  {
    term: "Cross Product (×)",
    category: "Math Tool",
    color: "purple",
    definition: "The cross product is the mathematical operation used to calculate moments. In 2D it gives a scalar; in 3D it gives a vector. The order matters: position vector FIRST, force vector SECOND.",
    unit: "Depends on context",
    keyFacts: [
      "2D: (x₁, y₁) × (x₂, y₂) = x₁y₂ − y₁x₂",
      "Result positive = counter-clockwise",
      "Result negative = clockwise",
      "NEVER switch the order: r⃗ × F⃗ ≠ F⃗ × r⃗ (they're opposite in sign)"
    ],
    example: "r⃗ = (3, 2), F⃗ = (1, 4): M = 3×4 − 2×1 = 12 − 2 = 10k⃗ (counter-clockwise)"
  },
  {
    term: "Line of Action",
    category: "Statics",
    color: "teal",
    definition: "The line of action is the infinite straight line along which the force vector lies. The moment of a force depends only on the PERPENDICULAR distance from the reference point to this line — not where on the line the force is applied.",
    unit: "N/A (it's a geometric concept)",
    keyFacts: [
      "A force can 'slide' along its line of action without changing the moment",
      "Perpendicular distance from a point to a line = moment ÷ force magnitude",
      "If the reference point lies ON the line of action, moment = 0"
    ],
    example: "F⃗ = 5N horizontal. Line of action is the horizontal line through the force. Moment about any point = 5 × vertical distance."
  },
  {
    term: "Theorem of Moments (Varignon's Theorem)",
    category: "Statics",
    color: "orange",
    definition: "The sum of moments of a set of concurrent or parallel forces about any point EQUALS the moment of their resultant about the same point. This theorem lets us find an unknown position or force.",
    unit: "N·m or similar",
    keyFacts: [
      "ΣM = M_resultant (the fundamental equation)",
      "If M_O = M_H: resultant line of action is parallel to OH⃗",
      "If M_O = −M_H: resultant line of action bisects OH⃗",
      "Choose the most convenient reference point to simplify calculations"
    ],
    example: "Forces at different points: calculate each moment separately, add them up — this equals R × d (resultant × its distance)."
  },
  {
    term: "Resultant Force (R⃗)",
    category: "Statics",
    color: "red",
    definition: "The resultant is a SINGLE force that has the EXACT same effect on a body as all the original forces combined. For parallel forces, the resultant magnitude is the algebraic sum and its position is found using the theorem of moments.",
    unit: "Newton (N)",
    keyFacts: [
      "Same direction forces: R = F₁ + F₂ (between them)",
      "Opposite directions: R = |F₁ − F₂| (outside them, near the larger)",
      "Position: F₁ × AC = F₂ × BC (inverse proportion)",
      "Multiple forces: R = algebraic sum of all forces"
    ],
    example: "F₁ = 30N up, F₂ = 20N up, 10cm apart: R = 50N up, located 4cm from 30N force."
  },
  {
    term: "Equilibrium",
    category: "Statics",
    color: "cyan",
    definition: "A body is in equilibrium when it is NOT accelerating — either at rest OR moving with constant velocity. Two conditions must BOTH be satisfied for equilibrium of parallel forces.",
    unit: "N/A (it's a state, not a quantity)",
    keyFacts: [
      "1st Condition: ΣF = 0 (sum of all forces = zero)",
      "2nd Condition: ΣM = 0 (sum of moments about ANY point = zero)",
      "BOTH conditions are required, not just one",
      "When 'about to rotate': reaction at far support = 0",
      "Choose moment reference at support to eliminate unknown reaction"
    ],
    example: "Beam with supports R₁ and R₂: R₁ + R₂ = total load (1st cond.) AND moments balance (2nd cond.)"
  },
  {
    term: "Couple",
    category: "Statics",
    color: "violet",
    definition: "A couple is a pair of forces that are: (1) EQUAL in magnitude, (2) OPPOSITE in direction, (3) have DIFFERENT lines of action. A couple produces ONLY rotation — no translation. Its moment is the same about ANY point.",
    unit: "N·m or N·cm",
    keyFacts: [
      "For couple: F⃗₁ = −F⃗₂ (the forces are negatives of each other)",
      "Moment M = F × r (force × perpendicular distance between lines)",
      "Couple moment is CONSTANT regardless of reference point",
      "Two couples are EQUIVALENT if M₁ = M₂",
      "Two couples EQUILIBRATE if M₁ + M₂ = 0"
    ],
    example: "F₁ = 5N right at y=0, F₂ = 5N left at y=3: M = 5 × 3 = 15 N·m (same everywhere)"
  },
  {
    term: "Sign Convention",
    category: "Basics",
    color: "pink",
    definition: "In statics, we always assign a positive or negative sign to moments based on the direction of rotation they produce. This is critical for adding moments algebraically.",
    unit: "N/A (dimensionless convention)",
    keyFacts: [
      "Counter-clockwise (CCW) = POSITIVE (+)",
      "Clockwise (CW) = NEGATIVE (−)",
      "For forces: upward = positive, downward = negative (by convention)",
      "Always state your sign convention at the start of a problem",
      "Be CONSISTENT throughout the entire problem"
    ],
    example: "A force causing counter-clockwise rotation: M = +20 N·m. Same force magnitude causing clockwise: M = −20 N·m."
  }
];

const term2Concepts = [
  {
    term: "Displacement (S⃗)",
    category: "Kinematics",
    color: "amber",
    definition: "Displacement is the change in POSITION of a particle from its starting point to its current position. It is a VECTOR (has direction). Different from distance — displacement can be negative if you go backward!",
    unit: "meters (m) or cm",
    keyFacts: [
      "S⃗ is a vector with direction",
      "S = 0 when particle returns to start",
      "Displacement ≠ Distance (distance is always positive)",
      "V = dS/dt (velocity is derivative of displacement)",
      "S = ∫V dt (displacement is integral of velocity)"
    ],
    example: "Particle at x = 5m moves to x = 2m: displacement = 2 − 5 = −3m (3m to the left)"
  },
  {
    term: "Velocity (V⃗)",
    category: "Kinematics",
    color: "blue",
    definition: "Velocity is the rate of change of displacement with respect to time. It is a VECTOR — it tells you BOTH how fast AND which direction. Positive velocity = moving in positive direction; Negative = moving opposite.",
    unit: "m/s or cm/s",
    keyFacts: [
      "V = dS/dt (differentiate displacement)",
      "V = ∫a dt (integrate acceleration)",
      "V > 0: moving in positive direction",
      "V < 0: moving in negative direction",
      "V = 0: particle momentarily at rest (possible direction change!)",
      "Initial velocity V₀ is V at t = 0"
    ],
    example: "S = 3t² − 6t: V = dS/dt = 6t − 6. At t=0: V₀ = −6 m/s. At t=3: V = 12 m/s."
  },
  {
    term: "Acceleration (a⃗)",
    category: "Kinematics",
    color: "green",
    definition: "Acceleration is the rate of change of velocity with respect to time. If acceleration and velocity have the SAME sign → speeding up. If OPPOSITE signs → slowing down (deceleration/retardation).",
    unit: "m/s² or cm/s²",
    keyFacts: [
      "a = dV/dt (differentiate velocity)",
      "a = d²S/dt² (second derivative of displacement)",
      "V × a > 0: accelerated motion (same direction)",
      "V × a < 0: decelerated/retarded motion (opposite direction)",
      "a = 0: constant velocity (uniform motion)"
    ],
    example: "V = 6t − 6: a = dV/dt = 6 m/s² (constant). Always positive → always accelerating."
  },
  {
    term: "Initial Conditions",
    category: "Kinematics",
    color: "purple",
    definition: "Initial conditions are the values of displacement and velocity AT TIME t = 0. They are used to find the constants of integration when integrating acceleration or velocity equations.",
    unit: "m, m/s",
    keyFacts: [
      "V₀ = velocity at t = 0 (initial velocity)",
      "S₀ = displacement at t = 0 (initial position)",
      "If particle starts from REST: V₀ = 0",
      "If particle starts from ORIGIN: S₀ = 0",
      "After integration, substitute t = 0 and use known value to find C"
    ],
    example: "V = ∫3 dt = 3t + C. If V₀ = 5, then at t=0: 5 = 0 + C → C = 5. So V = 3t + 5."
  },
  {
    term: "Distance vs. Displacement",
    category: "Kinematics",
    color: "teal",
    definition: "DISPLACEMENT is the net change in position (can be negative). DISTANCE is the total path length traveled (always positive). They differ when the particle changes direction!",
    unit: "meters",
    keyFacts: [
      "If no direction change: distance = |displacement|",
      "If direction changes: distance > |displacement|",
      "Find direction change: set V = 0 and check before/after",
      "Calculate distance in each segment separately, then add absolute values",
      "Displacement can be zero even if distance is large (round trip)"
    ],
    example: "Particle goes 5m forward then 3m backward: Distance = 8m, Displacement = 2m forward."
  },
  {
    term: "Momentum (H⃗)",
    category: "Dynamics",
    color: "orange",
    definition: "Momentum is the product of mass and velocity. It measures how hard it is to stop a moving object. A heavy, fast object has MORE momentum. It is a vector in the direction of velocity.",
    unit: "kg·m/s or gm·cm/s",
    keyFacts: [
      "H⃗ = m × V⃗",
      "Same direction as velocity",
      "Larger mass OR larger velocity = more momentum",
      "ΔH = m(V₂ − V₁) = change in momentum",
      "g = 9.8 m/s² = 980 cm/s²"
    ],
    example: "2 kg at 5 m/s: H = 2 × 5 = 10 kg·m/s. After bouncing at 3 m/s: ΔH = 2(3−5) = −4 kg·m/s."
  },
  {
    term: "Newton's 1st Law (Inertia)",
    category: "Dynamics",
    color: "red",
    definition: "An object continues in its state of REST or UNIFORM MOTION in a straight line unless acted upon by a net external force. Inertia = resistance to change in motion.",
    unit: "N/A",
    keyFacts: [
      "No net force → no change in motion",
      "Object at rest stays at rest",
      "Object moving stays moving (same speed, same direction)",
      "ΣF = 0 means equilibrium",
      "For uniform motion: driving force = resistance force"
    ],
    example: "Car moving at 60 km/h on flat road with no engine → eventually stops due to friction. Without friction, it would never stop."
  },
  {
    term: "Newton's 2nd Law (F = ma)",
    category: "Dynamics",
    color: "violet",
    definition: "The net force acting on an object equals its mass times its acceleration. F = ma is the most important equation in classical mechanics. The direction of acceleration equals the direction of net force.",
    unit: "F in N, m in kg, a in m/s²",
    keyFacts: [
      "F = ma (net force = mass × acceleration)",
      "a = F/m (larger force OR smaller mass → more acceleration)",
      "Direction of a = direction of net F",
      "1 Newton = 1 kg × 1 m/s²",
      "1 kg.wt = 9.8 N (weight formula)"
    ],
    example: "Net force 40 N on 8 kg body: a = 40/8 = 5 m/s². Body accelerates at 5 m/s² in direction of force."
  },
  {
    term: "Newton's 3rd Law (Action-Reaction)",
    category: "Dynamics",
    color: "cyan",
    definition: "For every action there is an equal and opposite reaction. When you push on something, it pushes back on you with the same force. This is why rockets work and why you feel heavier in an accelerating lift.",
    unit: "N",
    keyFacts: [
      "F₁ = −F₂ (action = −reaction)",
      "Forces are equal in magnitude, opposite in direction",
      "Forces act on DIFFERENT bodies",
      "In a lift going UP: feel heavier (R = m(g+a))",
      "In a lift going DOWN: feel lighter (R = m(g−a))"
    ],
    example: "70 kg person in lift accelerating up at 2 m/s²: apparent weight = 70(9.8+2) = 826 N ≈ 84.3 kg.wt"
  },
  {
    term: "Smooth Inclined Plane",
    category: "Dynamics",
    color: "pink",
    definition: "A smooth (frictionless) inclined plane has no friction. An object on it is pulled down the slope by gravity component (mg sinθ) and pushed off the surface by normal reaction (mg cosθ).",
    unit: "N",
    keyFacts: [
      "Component along plane (down): mg sin θ",
      "Normal reaction (perpendicular): R = mg cos θ",
      "For uniform velocity up the plane: F = mg sin θ",
      "For acceleration up: ma = F − mg sin θ",
      "For acceleration down: ma = mg sin θ − F"
    ],
    example: "5 kg on 30° plane: down-slope component = 5×9.8×0.5 = 24.5 N. Normal = 5×9.8×0.866 = 42.4 N."
  },
  {
    term: "Atwood Machine (Vertical Pulley)",
    category: "Dynamics",
    color: "lime",
    definition: "Two masses connected by a string over a smooth pulley. The heavier mass falls, the lighter rises. Both accelerate at the same rate. The string tension is the same throughout.",
    unit: "m/s², N",
    keyFacts: [
      "a = (m₁ − m₂)g / (m₁ + m₂) where m₁ > m₂",
      "T = 2m₁m₂g / (m₁ + m₂)",
      "Pulley pressure P = 2T",
      "Both bodies have SAME magnitude of acceleration",
      "Heavier body: m₁a = m₁g − T, Lighter: m₂a = T − m₂g"
    ],
    example: "3 kg and 1 kg: a = (3−1)×9.8/(3+1) = 19.6/4 = 4.9 m/s². T = 2×3×1×9.8/4 = 14.7 N."
  },
  {
    term: "Horizontal Table Pulley",
    category: "Dynamics",
    color: "indigo",
    definition: "One mass hangs over the edge and drives a mass on a smooth horizontal table. Only the hanging weight causes acceleration. The string between them has the same tension throughout.",
    unit: "m/s², N",
    keyFacts: [
      "a = m₁g / (m₁ + m₂) where m₁ hangs",
      "T = m₁m₂g / (m₁ + m₂)",
      "Pulley pressure P = √2 × T (strings at 90°)",
      "Table body: ma = T (no gravity component along table)",
      "Hanging body: ma = mg − T"
    ],
    example: "50 g hangs, 200 g on table: a = 50×980/(50+200) = 196 cm/s²."
  }
];

const colorMap = {
  amber: { bg: "bg-amber-50", badge: "bg-amber-100 text-amber-800", border: "border-amber-200", dot: "bg-amber-400" },
  blue: { bg: "bg-blue-50", badge: "bg-blue-100 text-blue-800", border: "border-blue-200", dot: "bg-blue-400" },
  green: { bg: "bg-green-50", badge: "bg-green-100 text-green-800", border: "border-green-200", dot: "bg-green-400" },
  purple: { bg: "bg-purple-50", badge: "bg-purple-100 text-purple-800", border: "border-purple-200", dot: "bg-purple-400" },
  teal: { bg: "bg-teal-50", badge: "bg-teal-100 text-teal-800", border: "border-teal-200", dot: "bg-teal-400" },
  orange: { bg: "bg-orange-50", badge: "bg-orange-100 text-orange-800", border: "border-orange-200", dot: "bg-orange-400" },
  red: { bg: "bg-red-50", badge: "bg-red-100 text-red-800", border: "border-red-200", dot: "bg-red-400" },
  cyan: { bg: "bg-cyan-50", badge: "bg-cyan-100 text-cyan-800", border: "border-cyan-200", dot: "bg-cyan-400" },
  violet: { bg: "bg-violet-50", badge: "bg-violet-100 text-violet-800", border: "border-violet-200", dot: "bg-violet-400" },
  pink: { bg: "bg-pink-50", badge: "bg-pink-100 text-pink-800", border: "border-pink-200", dot: "bg-pink-400" },
  lime: { bg: "bg-lime-50", badge: "bg-lime-100 text-lime-800", border: "border-lime-200", dot: "bg-lime-400" },
  indigo: { bg: "bg-indigo-50", badge: "bg-indigo-100 text-indigo-800", border: "border-indigo-200", dot: "bg-indigo-400" },
};

function ConceptCard({ concept }) {
  const [expanded, setExpanded] = useState(false);
  const c = colorMap[concept.color] || colorMap.amber;
  return (
    <Card className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden">
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className={`px-2.5 py-0.5 ${c.badge} text-xs font-semibold rounded-full border-0`}>{concept.category}</span>
        </div>
        <h3 className="text-base font-bold text-slate-800 mb-2">{concept.term}</h3>
        <p className="text-sm text-slate-600 leading-relaxed mb-3">{concept.definition}</p>
        {concept.unit && (
          <p className="text-xs text-slate-400 mb-3">
            <span className="font-semibold text-slate-500">Unit:</span> {concept.unit}
          </p>
        )}
        <button
          onClick={() => setExpanded(!expanded)}
          className={`w-full flex items-center justify-between text-sm px-3 py-2 rounded-xl ${c.badge} hover:opacity-80 transition-opacity`}
        >
          <span className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Key Facts
          </span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {expanded && (
        <div className={`border-t ${c.border} ${c.bg} p-5`}>
          <h4 className="font-semibold text-slate-700 mb-3 text-sm">Key Facts:</h4>
          <ul className="space-y-2 mb-4">
            {concept.keyFacts.map((fact, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <div className={`w-2 h-2 ${c.dot} rounded-full shrink-0 mt-1.5`} />
                <MathRenderer content={fact} />
              </li>
            ))}
          </ul>
          {concept.example && (
            <div className="bg-white rounded-xl p-4 border border-slate-200">
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Example</p>
              <p className="text-sm text-slate-700">{concept.example}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function TermGlossary({ concepts }) {
  const [search, setSearch] = useState('');
  const filtered = concepts.filter(c =>
    c.term.toLowerCase().includes(search.toLowerCase()) ||
    c.definition.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input placeholder="Search concepts..." value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-11 h-11 bg-white border-slate-200/60 rounded-xl shadow-sm focus:border-indigo-300" />
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-indigo-300" />
          </div>
          <p className="text-slate-500 font-medium">No results found</p>
          <Button variant="ghost" onClick={() => setSearch('')} className="mt-2 text-indigo-600 hover:text-indigo-700 rounded-xl">
            <RotateCcw className="w-4 h-4 mr-2" />Clear
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((concept, i) => <ConceptCard key={i} concept={concept} />)}
        </div>
      )}
    </div>
  );
}

export default function Glossary() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-5 h-5 text-indigo-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Concepts &amp; Glossary</h1>
          </div>
          <p className="text-slate-500">Every key term and concept explained from scratch</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 mb-8 text-white shadow-lg shadow-indigo-200">
          <div className="flex items-center gap-3 mb-2">
            <Info className="w-5 h-5" />
            <h2 className="text-lg font-bold">Everything You Need to Know</h2>
          </div>
          <p className="text-indigo-100 text-sm">Every key term, concept, and expression explained from scratch with key facts and examples. Click any card to expand for more details.</p>
        </div>

        <Tabs defaultValue="term1">
          <TabsList className="bg-white border border-slate-200/60 p-1 w-full mb-8 rounded-2xl shadow-sm">
            <TabsTrigger value="term1" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              Term 1 — Statics Concepts
            </TabsTrigger>
            <TabsTrigger value="term2" className="flex-1 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              Term 2 — Dynamics Concepts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="term1"><TermGlossary concepts={term1Concepts} /></TabsContent>
          <TabsContent value="term2"><TermGlossary concepts={term2Concepts} /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
}