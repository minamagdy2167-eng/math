const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, Target, BookOpen, CheckCircle2,
  TrendingUp, Award, Brain, BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { lessonsData, getTotalProgress } from '@/components/learning/lessonsData';
import ProgressRing from '@/components/learning/ProgressRing';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { format } from 'date-fns';
import { motion } from 'framer-motion';

export default function Progress() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.auth.me().then(setUser).catch(() => {});
  }, []);

  const { data: progressData } = useQuery({
    queryKey: ['userProgress'],
    queryFn: async () => {
      const results = await db.entities.UserProgress.filter({ created_by: user?.email });
      return results[0] || {};
    },
    enabled: !!user?.email,
    initialData: {}
  });

  const { data: quizAttempts } = useQuery({
    queryKey: ['quizAttempts'],
    queryFn: () => db.entities.QuizAttempt.filter({ created_by: user?.email }, '-created_date'),
    enabled: !!user?.email,
    initialData: []
  });

  const totalProgress = getTotalProgress(
    progressData?.completed_lessons,
    progressData?.completed_exercises
  );

  const completedLessons = progressData?.completed_lessons?.length || 0;
  const completedExercises = progressData?.completed_exercises?.length || 0;
  const totalExercises = lessonsData.reduce((sum, l) => sum + (l.exercises?.length || 0), 0);

  const lessonProgressData = lessonsData.map(lesson => {
    const lessonExercises = lesson.exercises?.length || 0;
    const completed = progressData?.completed_exercises?.filter(
      e => e.startsWith(`L${lesson.number}-E`)
    )?.length || 0;
    return {
      name: `L${lesson.number}`,
      exercises: lessonExercises,
      completed: completed,
      percentage: lessonExercises > 0 ? Math.round((completed / lessonExercises) * 100) : 0
    };
  });

  const quizScoreData = quizAttempts?.slice(0, 10).reverse().map((attempt, idx) => ({
    name: `Q${idx + 1}`,
    score: attempt.score,
    lesson: attempt.lesson_number
  })) || [];

  const averageScore = quizAttempts?.length > 0 
    ? Math.round(quizAttempts.reduce((sum, q) => sum + q.score, 0) / quizAttempts.length)
    : 0;

  const bestScore = quizAttempts?.length > 0 
    ? Math.max(...quizAttempts.map(q => q.score))
    : 0;

  const overviewStats = [
    { label: 'Overall Progress', value: `${Math.round(totalProgress)}%`, icon: Target, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600', extra: <ProgressRing progress={totalProgress} size={44} strokeWidth={3} /> },
    { label: 'Lessons Completed', value: `${completedLessons} / ${lessonsData.length}`, icon: BookOpen, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    { label: 'Exercises Done', value: `${completedExercises} / ${totalExercises}`, icon: CheckCircle2, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { label: 'Avg Quiz Score', value: `${averageScore}%`, icon: Trophy, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-indigo-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                My Progress
              </h1>
            </div>
            <p className="text-slate-500">Track your learning journey and quiz performance</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Overview Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overviewStats.map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  {stat.extra && <div>{stat.extra}</div>}
                </div>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-5">
          <Card className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-4 h-4 text-indigo-500" />
              <h3 className="font-semibold text-slate-800">Lesson Progress</h3>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lessonProgressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                  <YAxis stroke="#94a3b8" fontSize={10} />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="completed" fill="url(#indigo)" radius={[4, 4, 0, 0]} name="Completed" />
                  <Bar dataKey="exercises" fill="#f1f5f9" radius={[4, 4, 0, 0]} name="Total" />
                  <defs>
                    <linearGradient id="indigo" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-2 mb-5">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <h3 className="font-semibold text-slate-800">Quiz Score Trend</h3>
            </div>
            {quizScoreData.length > 0 ? (
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={quizScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} />
                    <YAxis stroke="#94a3b8" fontSize={10} domain={[0, 100]} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                    <Line type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4, strokeWidth: 0 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-56 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Brain className="w-7 h-7 text-indigo-300" />
                  </div>
                  <p className="text-slate-400 text-sm">No quiz attempts yet</p>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Lesson Details */}
        <Card className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
          <div className="flex items-center gap-2 mb-5">
            <BookOpen className="w-4 h-4 text-indigo-500" />
            <h3 className="font-semibold text-slate-800">Lesson Details</h3>
          </div>
          <div className="space-y-2">
            {lessonsData.map(lesson => {
              const isCompleted = progressData?.completed_lessons?.includes(lesson.number);
              const lessonExercises = lesson.exercises?.length || 0;
              const completedLessonEx = progressData?.completed_exercises?.filter(
                e => e.startsWith(`L${lesson.number}-E`)
              )?.length || 0;
              const lessonQuizzes = quizAttempts?.filter(q => q.lesson_number === lesson.number) || [];
              const bestLessonScore = lessonQuizzes.length > 0 
                ? Math.max(...lessonQuizzes.map(q => q.score))
                : null;

              return (
                <div 
                  key={lesson.number}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                      isCompleted ? 'bg-indigo-100' : 'bg-slate-100'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                      ) : (
                        <span className="text-sm font-semibold text-slate-500">{lesson.number}</span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">{lesson.title}</h4>
                      <p className="text-xs text-slate-400">
                        {completedLessonEx}/{lessonExercises} exercises
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {bestLessonScore !== null && (
                      <Badge className="bg-indigo-50 text-indigo-700 border-0 text-xs rounded-full">
                        Best: {bestLessonScore}%
                      </Badge>
                    )}
                    <Link to={createPageUrl(`Lesson?id=${lesson.number}`)}>
                      <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl text-xs">
                        {isCompleted ? 'Review' : 'Continue'}
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Recent Quiz Attempts */}
        {quizAttempts?.length > 0 && (
          <Card className="p-6 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
            <div className="flex items-center gap-2 mb-5">
              <Award className="w-4 h-4 text-purple-500" />
              <h3 className="font-semibold text-slate-800">Recent Quiz Attempts</h3>
            </div>
            <div className="space-y-2">
              {quizAttempts.slice(0, 5).map((attempt, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      attempt.score >= 70 ? 'bg-indigo-100' : attempt.score >= 50 ? 'bg-amber-100' : 'bg-red-100'
                    }`}>
                      <span className={`text-sm font-bold ${
                        attempt.score >= 70 ? 'text-indigo-600' : attempt.score >= 50 ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {attempt.score}%
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-800">
                        Lesson {attempt.lesson_number} Quiz
                      </h4>
                      <p className="text-xs text-slate-400">
                        {attempt.correct_answers}/{attempt.total_questions} correct &bull; {format(new Date(attempt.created_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                  </div>
                  <Link to={createPageUrl(`Quiz?lesson=${attempt.lesson_number}`)}>
                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl text-xs">
                      Retry
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}