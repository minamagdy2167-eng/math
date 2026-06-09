import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, BookOpen, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function LessonCard({ lesson, isCompleted, progress }) {
  const completedExercises = progress?.completed_exercises?.filter(
    e => e.startsWith(`L${lesson.number}-`)
  )?.length || 0;
  
  const totalExercises = lesson.exercises?.length || 0;
  const exercisePercent = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

  return (
    <Link to={createPageUrl(`Lesson?id=${lesson.number}`)}>
      <Card className="group relative overflow-hidden bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer h-full">
        {/* Top accent bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${isCompleted ? 'from-emerald-400 to-teal-400' : 'from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100'} transition-opacity`} />
        
        <div className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
              isCompleted 
                ? 'bg-emerald-100' 
                : 'bg-indigo-50 group-hover:bg-indigo-100'
            }`}>
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              ) : (
                <span className="text-sm font-bold text-indigo-600">{lesson.number}</span>
              )}
            </div>
            <Badge className="bg-indigo-50 text-indigo-600 border-0 text-xs rounded-full px-2.5 py-0.5">
              Unit {lesson.unit}
            </Badge>
          </div>

          <h3 className="text-sm font-semibold text-slate-800 mb-2 group-hover:text-slate-900 transition-colors line-clamp-2 leading-snug">
            {lesson.title}
          </h3>
          
          <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">
            {lesson.description}
          </p>

          <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{lesson.examples?.length || 0} examples</span>
            </div>
            <div className="flex items-center gap-1">
              <Dumbbell className="w-3 h-3" />
              <span>{completedExercises}/{totalExercises}</span>
            </div>
          </div>

          {totalExercises > 0 && (
            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${isCompleted ? 'bg-gradient-to-r from-emerald-400 to-teal-400' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                style={{ width: `${exercisePercent}%` }}
              />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}