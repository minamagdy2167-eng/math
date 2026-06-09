import React from 'react';
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle2, XCircle, BookOpen, Lightbulb } from 'lucide-react';
import MathRenderer from './MathRenderer';
import { cn } from "@/lib/utils";

export default function QuizQuestion({ 
  question, 
  questionIndex, 
  selectedAnswer, 
  onSelectAnswer, 
  showResult,
  isCorrect 
}) {
  return (
    <Card className={cn(
      "border-2 transition-all duration-300 overflow-hidden",
      showResult && isCorrect && "border-emerald-300 shadow-emerald-100 shadow-lg",
      showResult && !isCorrect && "border-red-300 shadow-red-100 shadow-lg",
      !showResult && "border-slate-200 hover:border-slate-300"
    )}>
      {/* Question Header */}
      <div className={cn(
        "p-5 pb-4",
        showResult && isCorrect && "bg-gradient-to-r from-emerald-50 to-teal-50",
        showResult && !isCorrect && "bg-gradient-to-r from-red-50 to-orange-50",
        !showResult && "bg-white"
      )}>
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0",
            showResult && isCorrect && "bg-emerald-200 text-emerald-800",
            showResult && !isCorrect && "bg-red-200 text-red-800",
            !showResult && "bg-indigo-100 text-indigo-700"
          )}>
            {questionIndex + 1}
          </div>
          <div className="flex-1">
            <p className="text-slate-800 font-semibold leading-relaxed text-base">
              <MathRenderer content={question.question} />
            </p>
          </div>
          {showResult && (
            <div className="shrink-0">
              {isCorrect ? (
                <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  Correct!
                </div>
              ) : (
                <div className="flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold">
                  <XCircle className="w-4 h-4" />
                  Wrong
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="px-5 pb-4 bg-white">
        <RadioGroup 
          value={selectedAnswer} 
          onValueChange={onSelectAnswer}
          className="space-y-2 ml-[52px]"
          disabled={showResult}
        >
          {question.options.map((option, idx) => {
            const optionKey = String.fromCharCode(65 + idx);
            const isSelected = selectedAnswer === optionKey;
            const isCorrectOption = question.correct === optionKey;
            
            return (
              <div 
                key={idx} 
                className={cn(
                  "flex items-start space-x-3 p-3 rounded-xl border-2 transition-all cursor-pointer",
                  !showResult && isSelected && "bg-amber-50 border-amber-300 shadow-sm",
                  !showResult && !isSelected && "bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300",
                  showResult && isCorrectOption && "bg-emerald-50 border-emerald-300",
                  showResult && isSelected && !isCorrectOption && "bg-red-50 border-red-300",
                  showResult && !isSelected && !isCorrectOption && "bg-white border-slate-100 opacity-50"
                )}
              >
                <RadioGroupItem value={optionKey} id={`q${questionIndex}-${optionKey}`} className="mt-0.5" />
                <Label 
                  htmlFor={`q${questionIndex}-${optionKey}`}
                  className="flex-1 cursor-pointer text-sm leading-relaxed"
                >
                  <span className={cn(
                    "font-bold mr-2 text-base",
                    showResult && isCorrectOption && "text-emerald-700",
                    showResult && isSelected && !isCorrectOption && "text-red-700",
                    !showResult && "text-slate-700"
                  )}>{optionKey}.</span>
                  <MathRenderer content={option} />
                </Label>
                {showResult && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                )}
                {showResult && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                )}
              </div>
            );
          })}
        </RadioGroup>
      </div>

      {/* Detailed Explanation (shown after answering) */}
      {showResult && (
        <div className={cn(
          "mx-5 mb-5 rounded-2xl overflow-hidden border-2",
          isCorrect ? "border-emerald-200" : "border-red-200"
        )}>
          {/* What you got wrong / right */}
          {!isCorrect && selectedAnswer && (
            <div className="bg-red-50 px-5 py-3 border-b border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                <p className="text-sm font-bold text-red-800">Your answer was incorrect</p>
              </div>
              <p className="text-sm text-red-700 ml-6">
                You chose <span className="font-bold">{selectedAnswer}</span> but the correct answer is <span className="font-bold text-emerald-700">{question.correct}</span>.
              </p>
            </div>
          )}
          {isCorrect && (
            <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-200">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <p className="text-sm font-bold text-emerald-800">Great job! Your answer is correct ✓</p>
              </div>
            </div>
          )}

          {/* Full Explanation */}
          {question.explanation && (
            <div className="bg-blue-50 px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-blue-800 mb-2">Why is this the answer?</p>
                  {Array.isArray(question.explanation) ? (
                    <ol className="space-y-2">
                      {question.explanation.map((point, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-5 h-5 bg-blue-200 text-blue-800 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-sm text-blue-900 leading-relaxed">
                            <MathRenderer content={point} />
                          </span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <p className="text-sm text-blue-900 leading-relaxed">
                      <MathRenderer content={question.explanation} />
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tip */}
          {question.tip && (
            <div className="bg-amber-50 px-5 py-3 border-t border-amber-200">
              <div className="flex items-start gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-amber-700 mb-1">Remember This:</p>
                  {Array.isArray(question.tip) ? (
                    <ul className="space-y-1">
                      {question.tip.map((t, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                          <span className="text-amber-500 mt-0.5">→</span>
                          <MathRenderer content={t} />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-amber-800">{question.tip}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}