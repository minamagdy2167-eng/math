const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, ArrowRight, Brain, CheckCircle2, XCircle,
  Trophy, RotateCcw, Clock, Target
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { getLesson } from '@/components/learning/lessonsData';
import { getQuizForLesson } from '@/components/learning/quizData';
import QuizQuestion from '@/components/learning/QuizQuestion';
import { motion, AnimatePresence } from 'framer-motion';

export default function Quiz() {
  const urlParams = new URLSearchParams(window.location.search);
  const lessonId = parseInt(urlParams.get('lesson')) || 1;
  const lesson = getLesson(lessonId);
  const questions = getQuizForLesson(lessonId);
  const queryClient = useQueryClient();

  const [user, setUser] = useState(null);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    db.auth.me().then(setUser).catch(() => {});
    setStartTime(Date.now());
  }, []);

  const saveQuizAttempt = useMutation({
    mutationFn: (data) => db.entities.QuizAttempt.create(data),
    onSuccess: () => queryClient.invalidateQueries(['quizAttempts'])
  });

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) correct++;
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    };
  };

  const handleSubmit = () => {
    const score = calculateScore();
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    
    saveQuizAttempt.mutate({
      lesson_number: lessonId,
      score: score.percentage,
      total_questions: score.total,
      correct_answers: score.correct,
      time_taken_seconds: timeTaken,
      answers: Object.entries(answers).map(([q, a]) => ({ question: parseInt(q), answer: a }))
    });

    setShowResults(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setShowResults(false);
    setStartTime(Date.now());
    setCurrentQuestion(0);
  };

  const score = showResults ? calculateScore() : null;
  const answeredCount = Object.keys(answers).length;
  const progress = (answeredCount / questions.length) * 100;

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center">
          <Brain className="w-12 h-12 mx-auto text-slate-300 mb-4" />
          <h2 className="text-xl font-semibold text-slate-800 mb-2">No Quiz Available</h2>
          <p className="text-slate-500 mb-6">There's no quiz for this lesson yet.</p>
          <Link to={createPageUrl(`Lesson?id=${lessonId}`)}>
            <Button>Back to Lesson</Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl(`Lesson?id=${lessonId}`)}>
              <Button variant="ghost" size="sm" className="text-slate-500">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Lesson
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="text-slate-500">
                <Clock className="w-3 h-3 mr-1" />
                {Math.floor((Date.now() - startTime) / 60000)}:{String(Math.floor(((Date.now() - startTime) % 60000) / 1000)).padStart(2, '0')}
              </Badge>
              <Badge className="bg-amber-100 text-amber-700 border-0">
                {answeredCount} / {questions.length} Answered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="mb-3 bg-blue-50 text-blue-700 border-blue-200">
            Lesson {lessonId} Quiz
          </Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
            {lesson?.title}
          </h1>
          <p className="text-slate-500">Test your understanding of the concepts</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        {!showResults ? (
          <>
            {/* Questions */}
            <div className="space-y-6">
              {questions.map((question, idx) => (
                <QuizQuestion
                  key={idx}
                  question={question}
                  questionIndex={idx}
                  selectedAnswer={answers[idx]}
                  onSelectAnswer={(value) => setAnswers(prev => ({ ...prev, [idx]: value }))}
                  showResult={false}
                />
              ))}
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex justify-center">
              <Button 
                size="lg" 
                onClick={handleSubmit}
                disabled={answeredCount < questions.length}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 h-12 px-12"
              >
                <Target className="w-5 h-5 mr-2" />
                Submit Quiz
              </Button>
            </div>
            {answeredCount < questions.length && (
              <p className="text-center text-sm text-slate-500 mt-3">
                Answer all questions to submit
              </p>
            )}
          </>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Results Summary */}
              <Card className="p-8 mb-8 text-center border-0 shadow-lg bg-gradient-to-br from-white to-slate-50">
                <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                  score.percentage >= 70 ? 'bg-emerald-100' : score.percentage >= 50 ? 'bg-amber-100' : 'bg-red-100'
                }`}>
                  {score.percentage >= 70 ? (
                    <Trophy className="w-10 h-10 text-emerald-500" />
                  ) : score.percentage >= 50 ? (
                    <Target className="w-10 h-10 text-amber-500" />
                  ) : (
                    <XCircle className="w-10 h-10 text-red-500" />
                  )}
                </div>
                
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  {score.percentage}%
                </h2>
                <p className="text-lg text-slate-600 mb-6">
                  You got {score.correct} out of {score.total} questions correct
                </p>

                <div className="flex justify-center gap-4">
                  <Button onClick={resetQuiz} variant="outline" className="gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Retry Quiz
                  </Button>
                  <Link to={createPageUrl(`Lesson?id=${lessonId}`)}>
                    <Button className="gap-2 bg-amber-500 hover:bg-amber-600">
                      Review Lesson
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </Card>

              {/* Detailed Results */}
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Detailed Results</h3>
              <div className="space-y-4">
                {questions.map((question, idx) => (
                  <QuizQuestion
                    key={idx}
                    question={question}
                    questionIndex={idx}
                    selectedAnswer={answers[idx]}
                    showResult={true}
                    isCorrect={answers[idx] === question.correct}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}