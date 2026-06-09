import React from 'react';

/**
 * Renders a 3×3 determinant as a properly aligned grid
 * with vertical bars on each side — like a textbook matrix.
 */
export default function DeterminantMatrix({ rows }) {
  return (
    <div className="inline-flex items-stretch font-mono select-none">
      {/* Left vertical bar */}
      <div className="w-[3px] bg-red-400 rounded-full mr-3 self-stretch" />

      {/* Grid */}
      <div
        className="grid gap-y-2"
        style={{ gridTemplateColumns: 'repeat(3, minmax(2.5rem, auto)', columnGap: '2rem' }}
      >
        {rows.map((row, ri) =>
          row.map((cell, ci) => (
            <span
              key={`${ri}-${ci}`}
              className="text-center text-[1.05rem] font-bold text-slate-800 leading-tight tracking-wide"
            >
              {cell}
            </span>
          ))
        )}
      </div>

      {/* Right vertical bar */}
      <div className="w-[3px] bg-red-400 rounded-full ml-3 self-stretch" />
    </div>
  );
}