import React from 'react';

/**
 * MathRenderer — converts LaTeX / computer-style math into clean, readable notation
 * as you would write it on a calculator or whiteboard.
 */

const VECTOR_START = '<<VEC>>';
const VECTOR_END = '<</VEC>>';
const OVERVECTOR_START = '<<OVER>>';
const OVERVECTOR_END = '<</OVER>>';

function formatMath(math) {
  let s = math.trim();

  // ── Vectors ──────────────────────────────────────────────────────────────
  // Replace \vec{X} and \overrightarrow{X} with placeholders.
  // These placeholders are rendered later as a stable arrow overlay.
  s = s.replace(/\\vec\{([^}]+)\}/g, `${VECTOR_START}$1${VECTOR_END}`);
  s = s.replace(/\\overrightarrow\{([^}]+)\}/g, `${OVERVECTOR_START}$1${OVERVECTOR_END}`);

  // ── Fractions  \frac{a}{b}  →  (a)/(b)  ────────────────────────────────
  // Iterative replacement to handle nested fracs from inside out
  let prev;
  do {
    prev = s;
    s = s.replace(/\\frac\{([^{}]*)\}\{([^{}]*)\}/g, (_, num, den) => {
      const n = num.trim();
      const d = den.trim();
      // single tokens stay clean, complex ones get parens
      const isSimple = (str) => /^[A-Za-z0-9_^αβθφωΔΣμπλ⃗².·×±]+$/.test(str);
      return `${isSimple(n) ? n : `(${n})`}/${isSimple(d) ? d : `(${d})`}`;
    });
  } while (s !== prev);

  // ── Square roots ─────────────────────────────────────────────────────────
  s = s.replace(/\\sqrt\{([^}]+)\}/g, '√($1)');
  s = s.replace(/\\sqrt\s+([A-Za-z0-9]+)/g, '√$1');

  // ── Trig / functions ─────────────────────────────────────────────────────
  s = s.replace(/\\sin/g, 'sin');
  s = s.replace(/\\cos/g, 'cos');
  s = s.replace(/\\tan/g, 'tan');

  // ── Greek letters ─────────────────────────────────────────────────────────
  s = s.replace(/\\theta/g, 'θ');
  s = s.replace(/\\alpha/g, 'α');
  s = s.replace(/\\beta/g, 'β');
  s = s.replace(/\\phi/g, 'φ');
  s = s.replace(/\\omega/g, 'ω');
  s = s.replace(/\\Delta/g, 'Δ');
  s = s.replace(/\\delta/g, 'δ');
  s = s.replace(/\\sigma/g, 'σ');
  s = s.replace(/\\Sigma/g, 'Σ');
  s = s.replace(/\\mu/g, 'μ');
  s = s.replace(/\\pi/g, 'π');
  s = s.replace(/\\lambda/g, 'λ');

  // ── Operators / symbols ──────────────────────────────────────────────────
  s = s.replace(/\\times/g, '×');
  s = s.replace(/\\cdot/g, '·');
  s = s.replace(/\\pm/g, '±');
  s = s.replace(/\\neq/g, '≠');
  s = s.replace(/\\leq/g, '≤');
  s = s.replace(/\\geq/g, '≥');
  s = s.replace(/\\approx/g, '≈');
  s = s.replace(/\\infty/g, '∞');
  s = s.replace(/\\Rightarrow/g, '⇒');
  s = s.replace(/\\rightarrow/g, '→');
  s = s.replace(/\\implies/g, '⇒');
  s = s.replace(/\\parallel/g, '∥');
  s = s.replace(/\\perp/g, '⊥');
  s = s.replace(/\\angle/g, '∠');
  s = s.replace(/\\sum/g, 'Σ');
  s = s.replace(/\\int/g, '∫');
  s = s.replace(/\\partial/g, '∂');

  // ── Unit vector notation  \vec{i}, \vec{j}, \vec{k} ─────────────────────
  s = s.replace(/\\vec\{i\}/g, 'î');
  s = s.replace(/\\vec\{j\}/g, 'ĵ');
  s = s.replace(/\\vec\{k\}/g, 'k̂');

  // ── Superscripts  ^{expr}  →  ^(expr)  or unicode for simple cases ───────
  s = s.replace(/\^2/g, '²');
  s = s.replace(/\^3/g, '³');
  s = s.replace(/\^\{2\}/g, '²');
  s = s.replace(/\^\{3\}/g, '³');
  s = s.replace(/\^\{([^}]+)\}/g, '^($1)');
  // lone caret + single char
  s = s.replace(/\^([A-Za-z0-9])/g, '^$1');

  // ── Subscripts  _{expr}  →  readable ────────────────────────────────────
  // Map common subscripts to unicode subscript digits
  const subMap = { '0':'₀','1':'₁','2':'₂','3':'₃','4':'₄','5':'₅','6':'₆','7':'₇','8':'₈','9':'₉' };
  s = s.replace(/_\{([^}]+)\}/g, (_, inner) => {
    if (/^[0-9]+$/.test(inner)) return inner.split('').map(c => subMap[c] || c).join('');
    return `_${inner}`;   // leave text subscripts like _x as is
  });
  s = s.replace(/_([0-9])/g, (_, d) => subMap[d] || d);

  // ── Norms / absolute value  ||...||  →  |...|  ──────────────────────────
  s = s.replace(/\|\|\s*([^|]+?)\s*\|\|/g, '|$1|');

  // ── Determinant / matrix (simplify to plain text) ────────────────────────
  s = s.replace(/\\begin\{vmatrix\}([\s\S]*?)\\end\{vmatrix\}/g, (_, body) => {
    // Convert to a readable 3-row format
    const rows = body.trim().split('\\\\').map(row =>
      row.trim().split('&').map(cell => cell.trim()).join('  ')
    );
    return `[${rows.join(' | ')}]`;
  });
  s = s.replace(/\\begin\{pmatrix\}([\s\S]*?)\\end\{pmatrix\}/g, (_, body) => {
    const rows = body.trim().split('\\\\').map(row =>
      row.trim().split('&').map(cell => cell.trim()).join(', ')
    );
    return `(${rows.join('; ')})`;
  });

  // ── Clean up remaining backslashes / spaces ───────────────────────────────
  s = s.replace(/\\,/g, ' ');
  s = s.replace(/\\;/g, ' ');
  s = s.replace(/\\!/g, '');
  s = s.replace(/\\ /g, ' ');
  s = s.replace(/\s{2,}/g, ' ');

  return s.trim();
}

export default function MathRenderer({ content, className = "" }) {
  if (!content) return null;

  // Split on $...$ inline math tokens
  const parts = content.split(/(\$[^$]+\$)/g);

  const renderMathContent = (inner, keyPrefix) => {
    const parts = [];
    const markerRegex = /<<(VEC|OVER)>>(.*?)<<\/\1>>/g;
    let lastIndex = 0;
    let match;

    while ((match = markerRegex.exec(inner)) !== null) {
      const [full, type, content] = match;
      parts.push(inner.slice(lastIndex, match.index));
      parts.push(
        <span key={`vec-${keyPrefix}-${match.index}`} className="relative inline-flex items-center overflow-visible">
          <span className="absolute left-1/2 -top-[0.9em] -translate-x-1/2 text-[0.75em] leading-none tracking-[0.03em] whitespace-nowrap pointer-events-none">
            {type === 'OVER' ? '⟶' : '→'}
          </span>
          <span className="relative">{content}</span>
        </span>
      );
      lastIndex = match.index + full.length;
    }

    parts.push(inner.slice(lastIndex));
    return parts;
  };

  const rendered = parts.map((part, i) => {
    if (part.startsWith('$') && part.endsWith('$')) {
      const inner = formatMath(part.slice(1, -1));
      return (
        <span
          key={i}
          className="inline-block font-sans bg-indigo-50 text-indigo-800 px-1.5 py-0.5 rounded-md mx-0.5 text-[0.92em] font-medium overflow-visible whitespace-nowrap"
          style={{ fontFamily: '"Segoe UI Symbol", "Segoe UI", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif', lineHeight: 1.3 }}
        >
          {renderMathContent(inner, i)}
        </span>
      );
    }
    // For plain text, only run formatMath if it contains LaTeX backslash commands
    const plain = part.includes('\\') ? formatMath(part) : part;
    return <span key={i}>{plain}</span>;
  });

  return <span className={className}>{rendered}</span>;
}