import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, Eye, EyeOff, Lightbulb, BookOpen,
  ChevronDown, ChevronUp, PenTool
} from 'lucide-react';
import MathRenderer from './MathRenderer';
import { cn } from "@/lib/utils";

export default function InteractiveExercise({ 
  exercise, 
  exerciseNumber, 
  isCompleted, 
  onToggleComplete 
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  return (
    <Card 
      className={cn(
        "p-6 border-2 transition-all",
        isCompleted 
          ? "border-emerald-200 bg-emerald-50/30" 
          : "border-transparent bg-white shadow-sm"
      )}
    >
      <div className="flex items-start gap-4 mb-4">
        <button
          onClick={onToggleComplete}
          className={cn(
            "w-8 h-8 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all",
            isCompleted
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-slate-300 hover:border-emerald-400"
          )}
        >
          {isCompleted && <CheckCircle2 className="w-5 h-5" />}
        </button>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs">
              Exercise {exerciseNumber}
            </Badge>
            {isCompleted && (
              <Badge className="text-xs bg-emerald-100 text-emerald-700 border-0">
                Completed
              </Badge>
            )}
          </div>

          {/* Problem Statement */}
          <div className="mb-4">
            <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-amber-500" />
              Problem
            </h4>
            <p className="text-slate-700">
              <MathRenderer content={exercise.problem} />
            </p>
          </div>

          {/* Answer Input */}
          <div className="mb-4">
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Your Answer
            </label>
            <Textarea
              placeholder="Write your answer here... (use LaTeX notation like $\vec{i}$, $\sqrt{2}$, etc.)"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              className="min-h-[80px] font-mono text-sm"
            />
            {userAnswer && (
              <div className="mt-2 p-3 bg-slate-50 rounded-lg">
                <p className="text-xs text-slate-500 mb-1">Preview:</p>
                <MathRenderer content={userAnswer} />
              </div>
            )}
          </div>

          {/* Hint */}
          {exercise.hint && (
            <div className="mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowHint(!showHint)}
                className="text-amber-600 hover:text-amber-700"
              >
                {showHint ? (
                  <>
                    <EyeOff className="w-4 h-4 mr-1" />
                    Hide Hint
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Show Hint
                  </>
                )}
              </Button>
              {showHint && (
                <div className="mt-2 p-3 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="text-sm text-amber-800">
                    <MathRenderer content={exercise.hint} />
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Solution Toggle */}
          <div>
            <Button
              onClick={() => setShowSolution(!showSolution)}
              variant="outline"
              size="sm"
              className="mb-3"
            >
              {showSolution ? (
                <>
                  <ChevronUp className="w-4 h-4 mr-1" />
                  Hide Solution
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 mr-1" />
                  Show Solution
                </>
              )}
            </Button>

            {/* Detailed Solution */}
            {showSolution && exercise.solution && (
              <div className="border-t border-slate-200 pt-4">
                <h4 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  Step-by-Step Solution
                </h4>
                <div className="space-y-3">
                  {exercise.solution.steps?.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-xs text-blue-700 font-medium">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-slate-600">
                          <MathRenderer content={step} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Final Answer */}
                <div className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-200">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-800 mb-1">Final Answer</p>
                      <p className="text-emerald-700">
                        <MathRenderer content={exercise.solution.answer} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Explanation if provided */}
                {exercise.solution.explanation && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> <MathRenderer content={exercise.solution.explanation} />
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}