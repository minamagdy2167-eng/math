const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Trophy, Target, ArrowRight, Sparkles, 
  TrendingUp, Info, Calculator, Zap, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import LessonCard from '@/components/learning/LessonCard';
import ProgressRing from '@/components/learning/ProgressRing';
import { lessonsData, getTotalProgress } from '@/components/learning/lessonsData';
import { motion } from 'framer-motion';

export default function Home() {
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
    queryFn: () => db.entities.QuizAttempt.filter({ created_by: user?.email }),
    enabled: !!user?.email,
    initialData: []
  });

  const totalProgress = getTotalProgress(
    progressData?.completed_lessons,
    progressData?.completed_exercises
  );

  const completedLessons = progressData?.completed_lessons?.length || 0;
  const totalLessons = lessonsData.length;
  const averageQuizScore = quizAttempts?.length > 0 
    ? Math.round(quizAttempts.reduce((sum, q) => sum + q.score, 0) / quizAttempts.length)
    : 0;

  const nextLesson = lessonsData.find(
    l => !progressData?.completed_lessons?.includes(l.number)
  ) || lessonsData[0];

  const statCards = [
    { label: 'Lessons Done', value: `${completedLessons}/${totalLessons}`, icon: BookOpen, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
    { label: 'Avg Quiz Score', value: `${averageQuizScore}%`, icon: Trophy, iconBg: 'bg-indigo-50', iconColor: 'text-indigo-600' },
    { label: 'Quizzes Taken', value: `${quizAttempts?.length || 0}`, icon: CheckCircle2, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }}
              className="space-y-7"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-full">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="text-sm font-medium text-indigo-700">Unit 1: Statics and Dynamics</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Master{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Mechanics
                </span>{' '}
                with Confidence
              </h1>
              
              <p className="text-lg text-slate-500 max-w-xl leading-relaxed">
                Interactive lessons on moments, forces, couples, and equilibrium. 
                Track your progress, practice with quizzes, and ace your exams.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to={createPageUrl(`Lesson?id=${nextLesson.number}`)}>
                  <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-200 h-12 px-8 rounded-xl">
                    {completedLessons > 0 ? 'Continue Learning' : 'Start Learning'}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to={createPageUrl('Progress')}>
                  <Button size="lg" variant="outline" className="h-12 px-8 rounded-xl border-2 border-slate-200 text-slate-700 hover:bg-slate-50">
                    <Trophy className="w-5 h-5 mr-2 text-indigo-500" />
                    View Progress
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-4"
            >
              <Card className="p-6 col-span-2 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 flex items-center gap-6">
                <ProgressRing progress={totalProgress} size={80} />
                <div>
                  <p className="text-3xl font-bold text-slate-900">{Math.round(totalProgress)}%</p>
                  <p className="text-sm text-slate-500">Overall Progress</p>
                  <div className="mt-2 h-1.5 w-40 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                      style={{ width: `${totalProgress}%` }}
                    />
                  </div>
                </div>
              </Card>

              {statCards.map((stat, i) => (
                <Card key={i} className="p-5 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40">
                  <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center mb-3`}>
                    <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                  </div>
                  <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{stat.label}</p>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 24 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-1">
            <Zap className="w-5 h-5 text-indigo-500" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Quick Access
            </h2>
          </div>
          <p className="text-slate-500 text-sm mb-6">Jump directly to what you need</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { page: 'PracticeExam', icon: Target, label: 'Practice Exam', desc: 'Test your knowledge with a full exam', bg: 'from-indigo-50 to-purple-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
              { page: 'FormulaSheet', icon: Calculator, label: 'Formula Sheet', desc: 'All formulas with worked examples', bg: 'from-purple-50 to-pink-50', iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
              { page: 'Glossary', icon: Info, label: 'Glossary', desc: 'Every concept explained from scratch', bg: 'from-indigo-50 to-blue-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
              { page: 'Progress', icon: TrendingUp, label: 'My Progress', desc: 'Detailed analytics of your learning', bg: 'from-violet-50 to-purple-50', iconBg: 'bg-violet-100', iconColor: 'text-violet-600' },
            ].map((item) => (
              <Link key={item.page} to={createPageUrl(item.page)}>
                <Card className={`group p-5 bg-gradient-to-br ${item.bg} rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer h-full`}>
                  <div className={`w-11 h-11 ${item.iconBg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-1">{item.label}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lessons Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  All Lessons
                </h2>
              </div>
              <p className="text-slate-500 text-sm">18 comprehensive lessons on Statics and Dynamics</p>
            </div>
            <Link to={createPageUrl('AllLessons')}>
              <Button variant="ghost" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-xl">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {lessonsData.map((lesson) => (
              <LessonCard 
                key={lesson.number}
                lesson={lesson}
                isCompleted={progressData?.completed_lessons?.includes(lesson.number)}
                progress={progressData}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}