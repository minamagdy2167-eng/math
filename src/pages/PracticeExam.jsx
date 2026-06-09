const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState, useEffect } from 'react';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, ArrowRight, Brain, CheckCircle2, XCircle,
  Trophy, RotateCcw, Clock, Target, AlertTriangle, Play,
  BookOpen, Lightbulb, ChevronDown, ChevronUp, List
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { quizData } from '@/components/learning/quizData';
import QuizQuestion from '@/components/learning/QuizQuestion';
import { motion, AnimatePresence } from 'framer-motion';
import MathRenderer from '@/components/learning/MathRenderer';

const LESSON_LABELS = {
  1: "Moment 2D", 2: "Theorem of Moments", 3: "Moment 3D",
  4: "Parallel Forces (2)", 5: "Parallel Forces (Set)", 6: "Equilibrium",
  7: "Couple", 8: "Resultant Couple", 9: "Differentiation",
  10: "Integration", 11: "Momentum", 12: "Newton's 1st Law",
  13: "Newton's 2nd Law", 14: "Newton's 3rd Law", 15: "Inclined Plane"
};

const getAllQuestions = () => {
  const allQuestions = [];
  Object.entries(quizData).forEach(([lessonNum, questions]) => {
    questions.forEach(q => {
      allQuestions.push({ ...q, lessonNumber: parseInt(lessonNum) });
    });
  });
  return allQuestions.sort(() => Math.random() - 0.5);
};

const getTerm1Questions = () => {
  const allQ = [];
  [1,2,3,4,5,6,7,8].forEach(n => {
    (quizData[n] || []).forEach(q => allQ.push({ ...q, lessonNumber: n }));
  });
  return allQ.sort(() => Math.random() - 0.5);
};

const getTerm2Questions = () => {
  const allQ = [];
  [9,10,11,12,13,14,15].forEach(n => {
    (quizData[n] || []).forEach(q => allQ.push({ ...q, lessonNumber: n }));
  });
  return allQ.sort(() => Math.random() - 0.5);
};

export default function PracticeExam() {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [examStarted, setExamStarted] = useState(false);
  const [examType, setExamType] = useState('full');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => { db.auth.me().then(setUser).catch(() => {}); }, []);

  useEffect(() => {
    let interval;
    if (examStarted && !showResults) {
      interval = setInterval(() => setElapsedTime(Math.floor((Date.now() - startTime) / 1000)), 1000);
    }
    return () => clearInterval(interval);
  }, [examStarted, showResults, startTime]);

  const saveQuizAttempt = useMutation({
    mutationFn: (data) => db.entities.QuizAttempt.create(data),
    onSuccess: () => queryClient.invalidateQueries(['quizAttempts'])
  });

  const startExam = (type) => {
    setExamType(type);
    let examQuestions;
    if (type === 'term1') examQuestions = getTerm1Questions().slice(0, 15);
    else if (type === 'term2') examQuestions = getTerm2Questions().slice(0, 15);
    else examQuestions = getAllQuestions().slice(0, 20);
    setQuestions(examQuestions);
    setAnswers({});
    setShowResults(false);
    setStartTime(Date.now());
    setElapsedTime(0);
    setExamStarted(true);
    window.scrollTo(0, 0);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => { if (answers[idx] === q.correct) correct++; });
    return { correct, total: questions.length, percentage: Math.round((correct / questions.length) * 100) };
  };

  const handleSubmit = () => {
    const score = calculateScore();
    saveQuizAttempt.mutate({
      lesson_number: 0,
      score: score.percentage,
      total_questions: score.total,
      correct_answers: score.correct,
      time_taken_seconds: elapsedTime,
      answers: Object.entries(answers).map(([q, a]) => ({ question: parseInt(q), answer: a, lesson: questions[parseInt(q)]?.lessonNumber }))
    });
    setShowResults(true);
    window.scrollTo(0, 0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(answers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  const score = showResults ? calculateScore() : null;

  const getResultsByLesson = () => {
    const results = {};
    questions.forEach((q, idx) => {
      if (!results[q.lessonNumber]) results[q.lessonNumber] = { correct: 0, total: 0, questions: [] };
      results[q.lessonNumber].total++;
      const isCorrect = answers[idx] === q.correct;
      if (isCorrect) results[q.lessonNumber].correct++;
      results[q.lessonNumber].questions.push({ ...q, idx, isCorrect, selectedAnswer: answers[idx] });
    });
    return results;
  };

  const getScoreColor = (pct) => {
    if (pct >= 80) return 'text-emerald-600';
    if (pct >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = (pct) => {
    if (pct >= 80) return 'from-indigo-50 to-purple-50 border-indigo-200';
    if (pct >= 60) return 'from-amber-50 to-orange-50 border-amber-200';
    return 'from-red-50 to-orange-50 border-red-200';
  };

  // Start Screen
  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
        <div className="bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link to="/"><Button variant="ghost" size="sm" className="text-slate-500"><ArrowLeft className="w-4 h-4 mr-2" />Back to Home</Button></Link>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Target className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-3">Practice Exam</h1>
            <p className="text-slate-500 text-lg">Choose your exam type below. After submission, you'll receive full detailed explanations for every question.</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            <Card className="p-6 border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 hover:shadow-lg transition-all cursor-pointer group" onClick={() => startExam('term1')}>
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Term 1 Exam</h3>
              <p className="text-sm text-slate-500 mb-3">Statics: Moments, Forces, Couples, Equilibrium</p>
              <Badge className="bg-amber-100 text-amber-800 border-0">15 Questions</Badge>
            </Card>

            <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-lg transition-all cursor-pointer group" onClick={() => startExam('term2')}>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Term 2 Exam</h3>
              <p className="text-sm text-slate-500 mb-3">Dynamics: Kinematics, Newton's Laws, Pulleys</p>
              <Badge className="bg-blue-100 text-blue-800 border-0">15 Questions</Badge>
            </Card>

            <Card className="p-6 border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 hover:shadow-lg transition-all cursor-pointer group" onClick={() => startExam('full')}>
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-1">Full Exam</h3>
              <p className="text-sm text-slate-500 mb-3">All topics — comprehensive coverage of both terms</p>
              <Badge className="bg-emerald-100 text-emerald-800 border-0">20 Questions</Badge>
            </Card>
          </div>

          <Card className="p-5 bg-blue-50 border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800 mb-1">How this exam works</p>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Answer all questions, then click Submit to see your results</li>
                  <li>• Every question gets a FULL explanation — right or wrong</li>
                  <li>• Wrong answers show exactly what you got wrong and why</li>
                  <li>• Questions are randomly shuffled each attempt</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Sticky Header */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-sm">
                <Target className="w-3 h-3 mr-1" />
                {examType === 'term1' ? 'Term 1' : examType === 'term2' ? 'Term 2' : 'Full'} Exam
              </Badge>
              {!showResults && (
                <Badge variant="outline" className="text-slate-500">
                  <Clock className="w-3 h-3 mr-1" />{formatTime(elapsedTime)}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              {!showResults && (
                <Badge className="bg-amber-100 text-amber-800 border-0 text-sm">
                  {answeredCount} / {questions.length} answered
                </Badge>
              )}
              {showResults && score && (
                <Badge className={`border-0 text-sm font-bold ${score.percentage >= 60 ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                  Score: {score.percentage}%
                </Badge>
              )}
            </div>
          </div>
          {!showResults && (
            <div className="mt-2">
              <Progress value={progress} className="h-1.5" />
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <>
            <div className="space-y-5">
              {questions.map((question, idx) => (
                <div key={idx}>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs text-slate-500">
                      Lesson {question.lessonNumber} — {LESSON_LABELS[question.lessonNumber] || 'General'}
                    </Badge>
                  </div>
                  <QuizQuestion
                    question={question}
                    questionIndex={idx}
                    selectedAnswer={answers[idx]}
                    onSelectAnswer={(value) => setAnswers(prev => ({ ...prev, [idx]: value }))}
                    showResult={false}
                  />
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={answeredCount < questions.length}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 h-14 px-16 text-lg shadow-lg shadow-emerald-200"
              >
                <Target className="w-5 h-5 mr-2" />
                Submit &amp; See Full Results
              </Button>
              {answeredCount < questions.length && (
                <p className="text-center text-sm text-slate-400 mt-3">
                  {questions.length - answeredCount} question{questions.length - answeredCount !== 1 ? 's' : ''} remaining
                </p>
              )}
            </div>
          </>
        ) : (
          <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              {/* Score Banner */}
              <Card className={`p-8 mb-8 text-center border-2 bg-gradient-to-br ${getScoreBg(score.percentage)}`}>
                <div className="flex justify-center mb-4">
                  {score.percentage >= 80 ? (
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Trophy className="w-12 h-12 text-emerald-500" />
                    </div>
                  ) : score.percentage >= 60 ? (
                    <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center">
                      <Target className="w-12 h-12 text-amber-500" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                      <BookOpen className="w-12 h-12 text-red-500" />
                    </div>
                  )}
                </div>
                <p className={`text-6xl font-black mb-2 ${getScoreColor(score.percentage)}`}>{score.percentage}%</p>
                <p className="text-xl text-slate-600 mb-1">You got <span className="font-bold text-slate-800">{score.correct}</span> out of <span className="font-bold text-slate-800">{score.total}</span> correct</p>
                <p className="text-sm text-slate-400 mb-6">Time: {formatTime(elapsedTime)}</p>
                <p className="text-slate-600 text-base mb-6">
                  {score.percentage >= 80 ? "🎉 Excellent work! You have a strong understanding of the material." :
                    score.percentage >= 60 ? "👍 Good effort! Review the wrong answers below to improve." :
                    "📖 Keep studying! Read the detailed explanations below — they will help you understand where you went wrong."}
                </p>

                {/* Per-lesson breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {Object.entries(getResultsByLesson()).map(([lesson, data]) => (
                    <div key={lesson} className={`p-3 rounded-xl border ${data.correct === data.total ? 'bg-emerald-50 border-emerald-200' : data.correct > data.total / 2 ? 'bg-amber-50 border-amber-200' : 'bg-red-50 border-red-200'}`}>
                      <p className="text-xs text-slate-500 truncate">{LESSON_LABELS[parseInt(lesson)] || `L${lesson}`}</p>
                      <p className={`font-bold text-lg ${data.correct === data.total ? 'text-emerald-700' : data.correct > data.total / 2 ? 'text-amber-700' : 'text-red-700'}`}>
                        {data.correct}/{data.total}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center gap-4 flex-wrap">
                  <Button onClick={() => startExam(examType)} variant="outline" className="gap-2 rounded-xl border-2 border-slate-200">
                    <RotateCcw className="w-4 h-4" />Retry Exam
                  </Button>
                  <Link to="/"><Button className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl shadow-md shadow-indigo-200">Back to Home<ArrowRight className="w-4 h-4" /></Button></Link>
                </div>
              </Card>

              {/* Detailed Review */}
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Full Question Review</h2>
                <p className="text-slate-500 text-sm">Every question is shown below with your answer, the correct answer, and a full step-by-step explanation.</p>
              </div>

              <Tabs defaultValue="all">
                <TabsList className="bg-white border border-slate-200/60 p-1 mb-6 rounded-2xl shadow-sm">
                  <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
                    <List className="w-4 h-4 mr-1" />All ({questions.length})
                  </TabsTrigger>
                  <TabsTrigger value="wrong" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
                    <XCircle className="w-4 h-4 mr-1" />Wrong ({questions.filter((_, i) => answers[i] !== questions[i]?.correct).length})
                  </TabsTrigger>
                  <TabsTrigger value="correct" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md">
                    <CheckCircle2 className="w-4 h-4 mr-1" />Correct ({score.correct})
                  </TabsTrigger>
                </TabsList>

                {['all', 'wrong', 'correct'].map(tab => (
                  <TabsContent key={tab} value={tab} className="space-y-5">
                    {questions
                      .filter((q, i) => {
                        const correct = answers[i] === q.correct;
                        if (tab === 'wrong') return !correct;
                        if (tab === 'correct') return correct;
                        return true;
                      })
                      .map((question, displayIdx) => {
                        const realIdx = questions.indexOf(question);
                        const isCorrect = answers[realIdx] === question.correct;
                        return (
                          <div key={realIdx}>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="text-xs">
                                Lesson {question.lessonNumber} — {LESSON_LABELS[question.lessonNumber] || 'General'}
                              </Badge>
                            </div>
                            <QuizQuestion
                              question={question}
                              questionIndex={realIdx}
                              selectedAnswer={answers[realIdx]}
                              showResult={true}
                              isCorrect={isCorrect}
                            />
                          </div>
                        );
                      })}
                  </TabsContent>
                ))}
              </Tabs>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}