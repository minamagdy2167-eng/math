const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, BookOpen, CheckCircle2, Layers
} from 'lucide-react';
import { lessonsData } from '@/components/learning/lessonsData';
import LessonCard from '@/components/learning/LessonCard';
import { motion } from 'framer-motion';

export default function AllLessons() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCompleted, setShowCompleted] = useState('all');

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

  const filteredLessons = lessonsData.filter(lesson => {
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isCompleted = progressData?.completed_lessons?.includes(lesson.number);
    
    const matchesFilter = 
      showCompleted === 'all' ||
      (showCompleted === 'completed' && isCompleted) ||
      (showCompleted === 'incomplete' && !isCompleted);

    return matchesSearch && matchesFilter;
  });

  const completedCount = progressData?.completed_lessons?.length || 0;

  const filters = [
    { key: 'all', label: 'All Lessons', count: lessonsData.length },
    { key: 'completed', label: 'Completed', count: completedCount },
    { key: 'incomplete', label: 'In Progress', count: lessonsData.length - completedCount },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-5 h-5 text-indigo-500" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                All Lessons
              </h1>
            </div>
            <p className="text-slate-500">Browse and track your progress across all {lessonsData.length} lessons</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search lessons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 h-11 bg-white border-slate-200/60 rounded-xl shadow-sm focus:border-indigo-300 focus:ring-indigo-200"
            />
          </div>
          <div className="flex gap-2">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setShowCompleted(f.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all border-2 ${
                  showCompleted === f.key
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-200 hover:text-indigo-600'
                }`}
              >
                {f.key === 'completed' && <CheckCircle2 className="w-3.5 h-3.5" />}
                {f.key === 'all' && <Layers className="w-3.5 h-3.5" />}
                {f.label}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${showCompleted === f.key ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {f.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Lessons Grid */}
        {filteredLessons.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredLessons.map((lesson, i) => (
              <motion.div
                key={lesson.number}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <LessonCard 
                  lesson={lesson}
                  isCompleted={progressData?.completed_lessons?.includes(lesson.number)}
                  progress={progressData}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-indigo-300" />
            </div>
            <p className="text-slate-500 font-medium">No lessons found</p>
            <p className="text-slate-400 text-sm mt-1">Try a different search term or filter</p>
          </div>
        )}
      </div>
    </div>
  );
}