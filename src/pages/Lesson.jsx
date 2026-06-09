const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, ArrowRight, BookOpen, Lightbulb, CheckCircle2, 
  PlayCircle, BookMarked, ChevronDown, ChevronUp, Bookmark,
  PenTool, Brain
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { lessonsData, getLesson } from '@/components/learning/lessonsData';
import { getExerciseSolution } from '@/components/learning/exerciseSolutions';
import MathRenderer from '@/components/learning/MathRenderer';
import InteractiveExercise from '@/components/learning/InteractiveExercise';
import VideoPlayer from '@/components/learning/VideoPlayer';
import { cn } from "@/lib/utils";

export default function Lesson() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const lessonId = parseInt(urlParams.get('id')) || 1;
  const lesson = getLesson(lessonId);
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('concepts');
  const [expandedExamples, setExpandedExamples] = useState({});
  const [completedExercises, setCompletedExercises] = useState(new Set());

  // Reset state when lesson changes
  useEffect(() => {
    setActiveTab('concepts');
    setExpandedExamples({});
    window.scrollTo(0, 0);
  }, [lessonId]);

  useEffect(() => {
    db.auth.me().then(setUser).catch(() => {});
  }, []);

  const { data: progressData, refetch: refetchProgress } = useQuery({
    queryKey: ['userProgress', user?.email],
    queryFn: async () => {
      const results = await db.entities.UserProgress.filter({ created_by: user?.email });
      return results[0] || null;
    },
    enabled: !!user?.email
  });

  useEffect(() => {
    if (progressData?.completed_exercises) {
      const lessonExercises = progressData.completed_exercises.filter(
        e => e.startsWith(`L${lessonId}-E`)
      );
      setCompletedExercises(new Set(lessonExercises));
    }
  }, [progressData, lessonId]);

  const updateProgress = useMutation({
    mutationFn: async (updates) => {
      if (progressData?.id) {
        return db.entities.UserProgress.update(progressData.id, updates);
      } else {
        return db.entities.UserProgress.create(updates);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userProgress']);
      refetchProgress();
    }
  });

  const markLessonComplete = () => {
    const currentCompleted = progressData?.completed_lessons || [];
    if (!currentCompleted.includes(lessonId)) {
      updateProgress.mutate({
        completed_lessons: [...currentCompleted, lessonId],
        last_accessed_lesson: lessonId
      });
    }
  };

  const toggleExerciseComplete = (exerciseId) => {
    const currentCompleted = progressData?.completed_exercises || [];
    const newCompleted = currentCompleted.includes(exerciseId)
      ? currentCompleted.filter(e => e !== exerciseId)
      : [...currentCompleted, exerciseId];
    
    updateProgress.mutate({ completed_exercises: newCompleted });
    
    setCompletedExercises(prev => {
      const newSet = new Set(prev);
      if (newSet.has(exerciseId)) {
        newSet.delete(exerciseId);
      } else {
        newSet.add(exerciseId);
      }
      return newSet;
    });
  };

  const isLessonComplete = progressData?.completed_lessons?.includes(lessonId);
  const prevLesson = lessonId > 1 ? lessonId - 1 : null;
  const nextLesson = lessonId < lessonsData.length ? lessonId + 1 : null;

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500">Lesson not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Lesson Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title Section */}
        <div className="mb-8 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">Lesson {lesson.number}</span>
                <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full">Unit {lesson.unit}</span>
                {isLessonComplete && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                {lesson.title}
              </h1>
              <p className="text-slate-500 leading-relaxed">{lesson.description}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {!isLessonComplete && (
                <Button 
                  size="sm" 
                  onClick={markLessonComplete}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md shadow-indigo-200"
                >
                  Mark Complete
                </Button>
              )}
              <Link to={createPageUrl(`Quiz?lesson=${lessonId}`)}>
                <Button size="sm" variant="outline" className="rounded-xl border-2 border-slate-200">
                  <Brain className="w-4 h-4 mr-2" />
                  Take Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Video Section */}
        {lesson.videoUrl && (
          <div className="mb-8">
            <VideoPlayer videoUrl={lesson.videoUrl} lessonNumber={lesson.number} />
          </div>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-5">
          <TabsList className="bg-white border border-slate-200/60 p-1 rounded-2xl shadow-sm">
            <TabsTrigger value="concepts" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <Lightbulb className="w-4 h-4 mr-2" />
              Concepts
            </TabsTrigger>
            <TabsTrigger value="examples" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <PlayCircle className="w-4 h-4 mr-2" />
              Examples
            </TabsTrigger>
            <TabsTrigger value="exercises" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
              <PenTool className="w-4 h-4 mr-2" />
              Exercises
            </TabsTrigger>
          </TabsList>

          {/* Concepts Tab */}
          <TabsContent value="concepts" className="space-y-4">
            {lesson.concepts?.map((concept, idx) => (
              <Card key={idx} className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
                    <span className="text-indigo-600 font-bold text-sm">{idx + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">{concept.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      <MathRenderer content={concept.content} />
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-5 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100">
              <div className="flex items-center gap-3 text-indigo-800">
                <BookMarked className="w-5 h-5 text-indigo-500" />
                <span className="font-medium text-sm">Ready to see these concepts in action? Check out the worked examples!</span>
              </div>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples" className="space-y-4">
            {lesson.examples?.map((example, idx) => (
              <Card key={idx} className="overflow-hidden bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedExamples(prev => ({ ...prev, [idx]: !prev[idx] }))}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center shrink-0">
                        <PlayCircle className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-800 mb-2">Example {idx + 1}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          <MathRenderer content={example.problem} />
                        </p>
                      </div>
                    </div>
                    <button className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
                      {expandedExamples[idx] ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </button>
                  </div>
                </div>

                {expandedExamples[idx] && (
                  <div className="border-t border-slate-100 bg-slate-50/70 p-6">
                    <h4 className="font-semibold text-slate-700 mb-4 flex items-center gap-2 text-sm">
                      <BookOpen className="w-4 h-4 text-indigo-500" />
                      Step-by-step Solution
                    </h4>
                    <div className="space-y-3">
                      {example.solution.map((step, stepIdx) => (
                        <div key={stepIdx} className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-xs text-indigo-700 font-bold">{stepIdx + 1}</span>
                          </div>
                          <p className="text-slate-600 text-sm">
                            <MathRenderer content={step} />
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 p-4 bg-white rounded-2xl border border-indigo-100 shadow-sm">
                      <p className="font-semibold text-indigo-800 text-sm">
                        <CheckCircle2 className="w-4 h-4 inline mr-2 text-indigo-500" />
                        Answer: <MathRenderer content={example.answer} />
                      </p>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </TabsContent>

          {/* Exercises Tab */}
          <TabsContent value="exercises" className="space-y-4">
            <Card className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
              <p className="text-sm text-indigo-800">
                <Brain className="w-4 h-4 inline mr-2 text-indigo-500" />
                Write your answer in the text box, then reveal the step-by-step solution to check your work!
              </p>
            </Card>

            {lesson.exercises?.map((exercise, idx) => {
              // Get solution from either exercise.solution or exerciseSolutions
              const exerciseSolution = exercise.solution || getExerciseSolution(exercise.id);
              const exerciseWithSolution = { ...exercise, solution: exerciseSolution };
              
              return (
                <InteractiveExercise
                  key={exercise.id}
                  exercise={exerciseWithSolution}
                  exerciseNumber={idx + 1}
                  isCompleted={completedExercises.has(exercise.id)}
                  onToggleComplete={() => toggleExerciseComplete(exercise.id)}
                />
              );
            })}
          </TabsContent>
        </Tabs>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-8 border-t border-slate-200">
          {prevLesson ? (
            <Link to={createPageUrl(`Lesson?id=${prevLesson}`)}>
              <Button variant="outline" className="gap-2 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50">
                <ArrowLeft className="w-4 h-4" />
                Previous Lesson
              </Button>
            </Link>
          ) : (
            <div />
          )}
          
          {nextLesson ? (
            <Link to={createPageUrl(`Lesson?id=${nextLesson}`)}>
              <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md shadow-indigo-200">
                Next Lesson
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          ) : (
            <Link to={createPageUrl('PracticeExam')}>
              <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md shadow-indigo-200">
                Take Practice Exam
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}