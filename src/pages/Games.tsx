import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, Play, Trophy, Clock, Target, Heart, Activity, Thermometer, Wind } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { medicalDictionary, shuffleArray } from '../data/medicalDictionary';
import { diagnosisCases, shuffleCases, DiagnosisCase } from '../data/diagnosisCases';
import AnatomyRunnerGame from '@/components/games/AnatomyRunnerGame';

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Row-based colors: red, teal, yellow (repeating pattern of 3)
  const getRowColor = (index: number) => {
    const rowIndex = Math.floor(index / 3);
    const colors = [
      { text: 'text-card-red', border: 'border-card-red', hover: 'hover:bg-card-red/20' },
      { text: 'text-card-teal', border: 'border-card-teal', hover: 'hover:bg-card-teal/20' },
      { text: 'text-card-yellow', border: 'border-card-yellow', hover: 'hover:bg-card-yellow/20' },
    ];
    return colors[rowIndex % 3];
  };

  const games = [
    {
      id: 'diagnosis-dash',
      title: 'DIAGNOSIS DASH',
      subtitle: 'Time Trial',
      description: 'Swipe through patient cases and make diagnoses under pressure',
      icon: '⏱️'
    },
    {
      id: 'anatomy-runner',
      title: 'ANATOMY RUNNER',
      subtitle: 'Endless Runner',
      description: 'Catch correct anatomy terms, avoid wrong ones!',
      icon: '🏃'
    },
    {
      id: 'memory-flip',
      title: 'MEMORY FLIP',
      subtitle: 'Med Match',
      description: 'Flip cards to match medical terms with their definitions',
      icon: '🧠'
    },
    {
      id: 'typing-challenge',
      title: 'TYPING CHALLENGE',
      subtitle: 'One-Word Speed',
      description: 'Type medical terms as fast as possible',
      icon: '⌨️'
    },
    {
      id: 'scrambled-terms',
      title: 'SCRAMBLED TERMS',
      subtitle: 'Word Unscrambler',
      description: 'Unscramble medical terminology',
      icon: '🔤'
    },
    {
      id: 'flashcard-duel',
      title: 'FLASHCARD DUEL',
      subtitle: 'Quick Review',
      description: 'Fast-paced flashcard review session',
      icon: '⚔️'
    },
    {
      id: 'yes-no-blitz',
      title: 'YES/NO BLITZ',
      subtitle: 'Quick Decisions',
      description: 'Rapid-fire true/false medical statements (Coming Soon)',
      icon: '⚡'
    },
    {
      id: 'quick-sort',
      title: 'QUICK SORT',
      subtitle: 'Organ Panic',
      description: 'Drag medical terms into correct categories (Coming Soon)',
      icon: '📦'
    },
    {
      id: 'click-symptom',
      title: 'CLICK THE SYMPTOM',
      subtitle: 'Symptom Hunter',
      description: 'Click the correct symptom from multiple options (Coming Soon)',
      icon: '🎯'
    },
    {
      id: 'recall-challenge',
      title: '5-SECOND RECALL',
      subtitle: 'Memory Test',
      description: 'Remember lists shown for 5 seconds (Coming Soon)',
      icon: '🧠'
    },
    {
      id: 'retro-snake',
      title: 'RETRO SNAKE',
      subtitle: 'Classic Arcade',
      description: 'Guide the snake to collect medical terms (Coming Soon)',
      icon: '🐍'
    }
  ];

  const DiagnosisDashGame = () => {
    const [cases, setCases] = useState<DiagnosisCase[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(90);
    const [isActive, setIsActive] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [totalAnswered, setTotalAnswered] = useState(0);

    useEffect(() => {
      const shuffled = shuffleCases(diagnosisCases);
      setCases(shuffled);
    }, []);

    useEffect(() => {
      if (isActive && timeLeft > 0 && !gameOver) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setGameOver(true);
        setIsActive(false);
      }
    }, [isActive, timeLeft, gameOver]);

    const handleAnswer = (answer: string) => {
      if (showFeedback || !isActive) return;
      
      setSelectedAnswer(answer);
      setShowFeedback(true);
      
      const isCorrect = answer === cases[currentIndex].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
      setTotalAnswered(totalAnswered + 1);

      setTimeout(() => {
        if (currentIndex < cases.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setSelectedAnswer(null);
          setShowFeedback(false);
        } else {
          setGameOver(true);
          setIsActive(false);
        }
      }, 2000);
    };

    const startGame = () => {
      setIsActive(true);
      setScore(0);
      setCurrentIndex(0);
      setTimeLeft(90);
      setGameOver(false);
      setTotalAnswered(0);
      setCases(shuffleCases(diagnosisCases));
    };

    if (cases.length === 0) {
      return <div className="text-center p-6">Loading cases...</div>;
    }

    if (!isActive && !gameOver) {
      return (
        <div className="border border-accent p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-pixel mb-4">DIAGNOSIS DASH</h3>
            <p className="text-base opacity-75 mb-6">
              Review patient cases and select the correct diagnosis.
              <br />
              You have 90 seconds. Work fast but accurately!
            </p>
            <div className="bg-muted/20 border border-muted p-4 mb-6 text-sm">
              <p className="mb-2">Each case includes:</p>
              <ul className="text-left max-w-md mx-auto space-y-1 opacity-75">
                <li>• Patient demographics & medical history</li>
                <li>• Vital signs & lab values</li>
                <li>• Presenting symptoms & chief complaint</li>
                <li>• Multiple diagnosis options</li>
              </ul>
            </div>
          </div>
          <button
            onClick={startGame}
            className="w-full bg-primary text-primary-foreground py-3 px-6 font-pixel hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            START DIAGNOSIS DASH
          </button>
        </div>
      );
    }

    if (gameOver) {
      const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
      return (
        <div className="border border-accent p-6 text-center">
          <h3 className="text-2xl font-pixel mb-6">DIAGNOSIS COMPLETE</h3>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="border border-secondary p-4">
              <div className="text-3xl font-pixel text-accent mb-2">{score}</div>
              <div className="text-sm opacity-75">CORRECT</div>
            </div>
            <div className="border border-secondary p-4">
              <div className="text-3xl font-pixel text-accent mb-2">{totalAnswered}</div>
              <div className="text-sm opacity-75">TOTAL</div>
            </div>
            <div className="border border-secondary p-4">
              <div className="text-3xl font-pixel text-accent mb-2">{accuracy}%</div>
              <div className="text-sm opacity-75">ACCURACY</div>
            </div>
          </div>

          <div className="text-sm opacity-75 mb-6">
            <span className="text-accent">KAI:</span>{' '}
            {accuracy >= 80 ? "Impressive diagnostic skills. Don't let it go to your head." :
             accuracy >= 60 ? "Not bad. Keep studying those cases." :
             "Your patients would be concerned. Time to hit the books."}
          </div>

          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="flex-1 bg-primary text-primary-foreground py-3 px-6 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              RETRY
            </button>
            <button
              onClick={() => setSelectedGame(null)}
              className="flex-1 border border-secondary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              BACK TO GAMES
            </button>
          </div>
        </div>
      );
    }

    const currentCase = cases[currentIndex];
    const isCorrect = selectedAnswer === currentCase.correctAnswer;

    return (
      <div className="border border-accent p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-secondary">
          <div className="text-sm">
            <span className="text-accent">CASE</span> {currentIndex + 1}/{cases.length}
          </div>
          <div className="text-sm">
            <span className="text-accent">SCORE</span> {score}/{totalAnswered}
          </div>
          <div className="text-sm">
            <Clock className="inline mr-2" size={16} />
            <span className={timeLeft < 20 ? 'text-accent' : ''}>{timeLeft}s</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Patient Card */}
            <div className="bg-background/50 border border-secondary p-4 mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs opacity-50 mb-1">PATIENT INFO</div>
                  <div className="text-sm">
                    {currentCase.patientInfo.age}yo {currentCase.patientInfo.gender}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-50 mb-1">CHIEF COMPLAINT</div>
                  <div className="text-sm text-accent">{currentCase.presentation.chiefComplaint}</div>
                </div>
              </div>

              {/* Medical History */}
              <div className="mb-4">
                <div className="text-xs opacity-50 mb-2">HISTORY</div>
                <div className="flex flex-wrap gap-2">
                  {currentCase.patientInfo.history.map((item, idx) => (
                    <span key={idx} className="text-xs border border-muted px-2 py-1 bg-muted/20">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vitals */}
              <div className="grid grid-cols-5 gap-2 mb-4 p-3 bg-background border border-muted">
                <div className="text-center">
                  <Activity size={16} className="mx-auto mb-1 text-accent" />
                  <div className="text-xs opacity-50">BP</div>
                  <div className="text-xs font-pixel">{currentCase.vitals.bp}</div>
                </div>
                <div className="text-center">
                  <Heart size={16} className="mx-auto mb-1 text-accent" />
                  <div className="text-xs opacity-50">HR</div>
                  <div className="text-xs font-pixel">{currentCase.vitals.hr}</div>
                </div>
                <div className="text-center">
                  <Thermometer size={16} className="mx-auto mb-1 text-accent" />
                  <div className="text-xs opacity-50">TEMP</div>
                  <div className="text-xs font-pixel">{currentCase.vitals.temp}°C</div>
                </div>
                <div className="text-center">
                  <Wind size={16} className="mx-auto mb-1 text-accent" />
                  <div className="text-xs opacity-50">RR</div>
                  <div className="text-xs font-pixel">{currentCase.vitals.rr}</div>
                </div>
                <div className="text-center">
                  <Target size={16} className="mx-auto mb-1 text-accent" />
                  <div className="text-xs opacity-50">SpO2</div>
                  <div className="text-xs font-pixel">{currentCase.vitals.spo2}%</div>
                </div>
              </div>

              {/* Labs */}
              {currentCase.labs && (
                <div className="mb-4">
                  <div className="text-xs opacity-50 mb-2">KEY LABS</div>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(currentCase.labs).map(([key, value], idx) => (
                      <div key={idx} className="text-xs bg-muted/20 border border-muted px-2 py-1">
                        <span className="opacity-75">{key}:</span> <span className="text-accent">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Symptoms */}
              <div>
                <div className="text-xs opacity-50 mb-2">PRESENTING SYMPTOMS</div>
                <div className="space-y-1">
                  {currentCase.presentation.symptoms.map((symptom, idx) => (
                    <div key={idx} className="text-sm flex items-start">
                      <span className="text-accent mr-2">•</span>
                      {symptom}
                    </div>
                  ))}
                  <div className="text-xs opacity-50 mt-2">Duration: {currentCase.presentation.duration}</div>
                </div>
              </div>
            </div>

            {/* Diagnosis Options */}
            <div className="space-y-3">
              <div className="text-sm opacity-75 mb-3">SELECT DIAGNOSIS:</div>
              {currentCase.options.map((option, idx) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === currentCase.correctAnswer;
                const showCorrect = showFeedback && isCorrectOption;
                const showIncorrect = showFeedback && isSelected && !isCorrect;

                return (
                  <motion.button
                    key={idx}
                    onClick={() => handleAnswer(option)}
                    disabled={showFeedback}
                    className={`w-full text-left p-4 border transition-all ${
                      showCorrect
                        ? 'border-primary bg-primary/20 text-primary-foreground'
                        : showIncorrect
                        ? 'border-destructive bg-destructive/20 text-destructive-foreground'
                        : 'border-secondary hover:border-accent hover:bg-accent/10'
                    } ${showFeedback ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-pixel">{option}</span>
                      {showCorrect && <span className="text-xs">✓ CORRECT</span>}
                      {showIncorrect && <span className="text-xs">✗ INCORRECT</span>}
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback */}
            {showFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 border ${
                  isCorrect ? 'border-primary bg-primary/10' : 'border-muted bg-muted/10'
                }`}
              >
                <div className="text-sm mb-2">
                  <span className="font-pixel text-accent">EXPLANATION:</span>
                </div>
                <div className="text-sm opacity-90">{currentCase.explanation}</div>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  };

  const MemoryFlipGame = () => {
    const [cards, setCards] = useState<any[]>([]);
    const [flipped, setFlipped] = useState<number[]>([]);
    const [matched, setMatched] = useState<number[]>([]);
    const [moves, setMoves] = useState(0);

   useEffect(() => {
  const shuffledTerms = shuffleArray([...medicalDictionary]).slice(0, 8);
  const pairs = shuffledTerms.flatMap((term, index) => ([
    { id: index * 2, content: term.term, type: 'term', pairId: index },
    { id: index * 2 + 1, content: term.definition, type: 'definition', pairId: index }
  ]));
  setCards(shuffleArray(pairs));
}, []);


    const handleCardClick = (index: number) => {
      if (flipped.includes(index) || matched.includes(index)) return;
      
      const newFlipped = [...flipped, index];
      setFlipped(newFlipped);
      
      if (newFlipped.length === 2) {
        setMoves(moves + 1);
        const [firstIdx, secondIdx] = newFlipped;
        const firstCard = cards[firstIdx];
        const secondCard = cards[secondIdx];
        
        const isMatch = firstCard.pairId === secondCard.pairId;
        
        if (isMatch) {
          setMatched([...matched, firstIdx, secondIdx]);
          setTimeout(() => setFlipped([]), 1000);
        } else {
          setTimeout(() => setFlipped([]), 1000);
        }
      }
    };

    return (
      <div className="border border-secondary p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-pixel mb-4">MEMORY FLIP: MED MATCH</h3>
          <p className="text-sm opacity-75">Match medical terms with their definitions</p>
        </div>

        <div className="grid grid-cols-4 gap-4 max-w-2xl mx-auto mb-6">
          {cards.map((card, index) => {
            const isRevealed = flipped.includes(index) || matched.includes(index);
            return (
              <motion.div
                key={card.id}
                onClick={() => handleCardClick(index)}
                className={`aspect-square flex items-center justify-center border cursor-pointer text-xs p-1 transition-all duration-300 ${
                  isRevealed 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'bg-background text-foreground border-secondary hover:border-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRevealed ? (
                  <span className="text-center leading-tight text-xs">{card.content}</span>
                ) : (
                  <span className="text-2xl">🧠</span>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-sm mb-4">Moves: {moves}</p>
          {matched.length === cards.length && matched.length > 0 && (
            <div className="text-center">
              <p className="text-lg font-pixel text-muted-foreground mb-4">🎉 ALL MATCHED! 🎉</p>
              <div className="text-sm opacity-75">
                <span className="text-accent">KAI:</span> Nice match! Unlike your sleep schedule.
              </div>
            </div>
          )}
          <button
            onClick={() => setSelectedGame(null)}
            className="mt-4 border border-secondary px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            BACK TO GAMES
          </button>
        </div>
      </div>
    );
  };

  const TypingChallengeGame = () => {
    const [currentTerm, setCurrentTerm] = useState('');
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [terms, setTerms] = useState<string[]>([]);
    const [totalCharsTyped, setTotalCharsTyped] = useState(0);
    const [correctKeystrokes, setCorrectKeystrokes] = useState(0);
    const [totalKeystrokes, setTotalKeystrokes] = useState(0);

    const timeOptions = [
      { label: '30 secs', value: 30 },
      { label: '1 min', value: 60 },
      { label: '3 mins', value: 180 },
      { label: '5 mins', value: 300 },
    ];

    const difficultyOptions = [
      { label: 'Easy', value: 'easy' as const, description: 'Short terms (≤10 chars)' },
      { label: 'Medium', value: 'medium' as const, description: 'Medium terms (11-18 chars)' },
      { label: 'Hard', value: 'hard' as const, description: 'Complex terms (>18 chars)' },
    ];

    const getTermsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
      const allTerms = [...medicalDictionary];
      switch (difficulty) {
        case 'easy':
          return allTerms.filter(t => t.term.length <= 10);
        case 'medium':
          return allTerms.filter(t => t.term.length > 10 && t.term.length <= 18);
        case 'hard':
          return allTerms.filter(t => t.term.length > 18);
        default:
          return allTerms;
      }
    };

    const loadTerms = (difficulty: 'easy' | 'medium' | 'hard') => {
      const filtered = getTermsByDifficulty(difficulty);
      const shuffled = shuffleArray(filtered).slice(0, 50);
      setTerms(shuffled.map(t => t.term));
      setCurrentTerm(shuffled[0]?.term || '');
    };

    useEffect(() => {
      if (isActive && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0 && isActive) {
        setIsActive(false);
      }
    }, [isActive, timeLeft]);

    const handleInputChange = (value: string) => {
      // Track keystrokes for accuracy
      if (value.length > userInput.length) {
        // User typed a new character
        const newChar = value[value.length - 1];
        const expectedChar = currentTerm[userInput.length];
        setTotalKeystrokes(prev => prev + 1);
        if (newChar?.toLowerCase() === expectedChar?.toLowerCase()) {
          setCorrectKeystrokes(prev => prev + 1);
        }
      }
      
      setUserInput(value);
      if (value.toLowerCase() === currentTerm.toLowerCase()) {
        setScore(score + 1);
        setTotalCharsTyped(prev => prev + currentTerm.length);
        setUserInput('');
        const nextIndex = (terms.indexOf(currentTerm) + 1) % terms.length;
        setCurrentTerm(terms[nextIndex]);
      }
    };

    const startGame = (duration: number) => {
      if (!selectedDifficulty) return;
      loadTerms(selectedDifficulty);
      setSelectedDuration(duration);
      setTimeLeft(duration);
      setIsActive(true);
      setScore(0);
      setTotalCharsTyped(0);
      setCorrectKeystrokes(0);
      setTotalKeystrokes(0);
      setUserInput('');
    };

    const resetGame = () => {
      setSelectedDuration(null);
      setSelectedDifficulty(null);
      setIsActive(false);
      setScore(0);
      setTotalCharsTyped(0);
      setCorrectKeystrokes(0);
      setTotalKeystrokes(0);
    };

    const formatTime = (seconds: number) => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
    };

    const calculateWPM = () => {
      if (!selectedDuration) return 0;
      const timeInMinutes = selectedDuration / 60;
      const wordsTyped = totalCharsTyped / 5; // Standard: 5 chars = 1 word
      return Math.round(wordsTyped / timeInMinutes);
    };

    const calculateAccuracy = () => {
      if (totalKeystrokes === 0) return 100;
      return Math.round((correctKeystrokes / totalKeystrokes) * 100);
    };

    return (
      <div className="border border-muted p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-pixel mb-4">TYPING CHALLENGE</h3>
          {isActive && (
            <div className="flex justify-between mb-4">
              <div className="text-sm">SCORE: {score}</div>
              <div className="text-sm">TIME: {formatTime(timeLeft)}</div>
            </div>
          )}
        </div>

        {!isActive && selectedDuration === null ? (
          <div className="text-center">
            <p className="mb-6">Type medical terms as fast as you can!</p>
            
            {!selectedDifficulty ? (
              <>
                <p className="mb-4 text-sm text-muted-foreground">Select difficulty:</p>
                <div className="flex flex-col gap-3 max-w-xs mx-auto">
                  {difficultyOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedDifficulty(option.value)}
                      className="border border-secondary py-3 px-4 font-pixel hover:bg-primary hover:text-primary-foreground transition-colors text-left"
                    >
                      <span className="block">{option.label}</span>
                      <span className="block text-xs text-muted-foreground mt-1">{option.description}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="mb-2 text-sm">
                  Difficulty: <span className="text-primary font-bold capitalize">{selectedDifficulty}</span>
                  <button onClick={() => setSelectedDifficulty(null)} className="ml-2 text-xs underline hover:text-primary">change</button>
                </p>
                <p className="mb-4 text-sm text-muted-foreground">Select duration:</p>
                <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
                  {timeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => startGame(option.value)}
                      className="border border-secondary py-3 px-4 font-pixel hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : !isActive && timeLeft === 0 ? (
          <div className="text-center">
            <h3 className="text-xl font-pixel mb-4">TIME'S UP!</h3>
            <div className="space-y-2 mb-6">
              <p className="text-lg">Words Typed: <span className="text-primary font-bold">{score}</span></p>
              <p className="text-2xl font-pixel text-primary">{calculateWPM()} WPM</p>
              <p className="text-lg">Accuracy: <span className="text-primary font-bold">{calculateAccuracy()}%</span></p>
              <p className="text-xs text-muted-foreground">({correctKeystrokes}/{totalKeystrokes} keystrokes)</p>
              <p className="text-sm text-muted-foreground capitalize">
                {selectedDifficulty} • {timeOptions.find(t => t.value === selectedDuration)?.label}
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => startGame(selectedDuration!)}
                className="bg-primary text-primary-foreground py-2 px-6 font-pixel hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={resetGame}
                className="border border-secondary px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                CHANGE SETTINGS
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-6">
              <h4 className="text-2xl font-pixel mb-4">{currentTerm}</h4>
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full bg-background border border-secondary px-3 py-2 text-foreground focus:outline-none focus:border-accent"
              placeholder="Type here..."
              autoFocus
            />
          </div>
        )}
      </div>
    );
  };

  const ScrambledTermsGame = () => {
    const [terms, setTerms] = useState<Array<{scrambled: string, answer: string}>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
      const selected = shuffleArray([...medicalDictionary]).slice(0, 10);
      const scrambled = selected.map(term => ({
        scrambled: term.term.split('').sort(() => Math.random() - 0.5).join(''),
        answer: term.term
      }));
      setTerms(scrambled);
    }, []);

    const handleSubmit = () => {
      if (userInput.toLowerCase() === terms[currentIndex].answer.toLowerCase()) {
        setScore(score + 1);
      }
      
      if (currentIndex < terms.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setUserInput('');
      } else {
        setGameOver(true);
      }
    };

    if (terms.length === 0) return <div>Loading...</div>;

    return (
      <div className="border border-accent p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-pixel mb-4">SCRAMBLED TERMS</h3>
          <div className="flex justify-between mb-4">
            <div className="text-sm">SCORE: {score}</div>
            <div className="text-sm">TERM: {currentIndex + 1}/{terms.length}</div>
          </div>
        </div>

        {!gameOver ? (
          <div>
            <div className="text-center mb-6">
              <h4 className="text-3xl font-pixel mb-4 text-accent">{terms[currentIndex].scrambled}</h4>
              <p className="text-sm opacity-75">Unscramble this medical term</p>
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              className="w-full bg-background border border-secondary px-3 py-2 text-foreground focus:outline-none focus:border-accent mb-4"
              placeholder="Type your answer..."
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-primary-foreground py-2 px-4 hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              SUBMIT
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-pixel mb-4">GAME OVER!</h3>
            <p className="text-lg mb-4">Final Score: {score}/{terms.length}</p>
            <button
              onClick={() => setSelectedGame(null)}
              className="border border-secondary px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              BACK TO GAMES
            </button>
          </div>
        )}
      </div>
    );
  };

  const FlashcardDuelGame = () => {
    const [flashcards, setFlashcards] = useState<Array<{term: string, definition: string}>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [score, setScore] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
      const selected = shuffleArray([...medicalDictionary]).slice(0, 15);
      setFlashcards(selected);
    }, []);

    const handleKnow = () => {
      setScore(score + 1);
      setTotal(total + 1);
      nextCard();
    };

    const handleDontKnow = () => {
      setTotal(total + 1);
      nextCard();
    };

    const nextCard = () => {
      if (currentIndex < flashcards.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setShowAnswer(false);
      }
    };

    if (flashcards.length === 0) return <div>Loading...</div>;
    if (currentIndex >= flashcards.length) {
      return (
        <div className="border border-secondary p-6 text-center">
          <h3 className="text-xl font-pixel mb-4">DUEL COMPLETE!</h3>
          <p className="text-lg mb-4">Score: {score}/{total}</p>
          <p className="text-base mb-4">Accuracy: {Math.round((score / total) * 100)}%</p>
          <button
            onClick={() => setSelectedGame(null)}
            className="border border-secondary px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            BACK TO GAMES
          </button>
        </div>
      );
    }

    return (
      <div className="border border-secondary p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-pixel mb-4">FLASHCARD DUEL</h3>
          <div className="flex justify-between mb-4">
            <div className="text-sm">SCORE: {score}/{total}</div>
            <div className="text-sm">CARD: {currentIndex + 1}/{flashcards.length}</div>
          </div>
        </div>

        <div className="border border-secondary p-8 min-h-64 flex items-center justify-center cursor-pointer mb-6"
             onClick={() => setShowAnswer(!showAnswer)}>
          <div className="text-center">
            <div className="text-sm opacity-50 mb-4">
              {showAnswer ? 'DEFINITION' : 'TERM'}
            </div>
            <div className="text-xl leading-relaxed">
              {showAnswer ? flashcards[currentIndex].definition : flashcards[currentIndex].term}
            </div>
            <div className="text-sm opacity-50 mt-4">
              [CLICK TO {showAnswer ? 'FLIP' : 'REVEAL'}]
            </div>
          </div>
        </div>

        {showAnswer && (
          <div className="flex space-x-4">
            <button
              onClick={handleDontKnow}
              className="flex-1 border border-destructive py-3 px-6 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              DON'T KNOW
            </button>
            <button
              onClick={handleKnow}
              className="flex-1 border border-primary py-3 px-6 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              KNOW IT
            </button>
          </div>
        )}
      </div>
    );
  };

  const GameComponent: React.FC<{ gameId: string }> = ({ gameId }) => {
    if (gameId === 'diagnosis-dash') return <DiagnosisDashGame />;
    if (gameId === 'anatomy-runner') return <AnatomyRunnerGame onBack={() => setSelectedGame(null)} />;
    if (gameId === 'memory-flip') return <MemoryFlipGame />;
    if (gameId === 'typing-challenge') return <TypingChallengeGame />;
    if (gameId === 'scrambled-terms') return <ScrambledTermsGame />;
    if (gameId === 'flashcard-duel') return <FlashcardDuelGame />;

    return (
      <div className="border border-muted p-6 text-center">
        <h3 className="text-xl font-pixel mb-4">GAME COMING SOON</h3>
        <p className="text-base opacity-75 mb-4">This game is still in development.</p>
        <button
          onClick={() => setSelectedGame(null)}
          className="border border-secondary px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          BACK TO GAMES
        </button>
      </div>
    );
  };

  const kaiGameComments = [
    "Nice match! Unlike your sleep schedule.",
    "Your brain cells are getting a workout. Finally.",
    "That was almost impressive. Almost.",
    "Your caffeine levels just clapped in approval.",
    "Correct. Go touch grass. Please."
  ];

  return (
    <div className="min-h-screen bg-black text-foreground font-terminal">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-pixel mb-4 terminal-glow">NEURAL GAMES</h1>
          <p className="text-lg opacity-75">Cognitive enhancement protocols</p>
        </motion.div>

        {selectedGame ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="mb-6">
              <button
                onClick={() => setSelectedGame(null)}
                className="border border-secondary px-4 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                ← BACK TO GAMES
              </button>
            </div>
            <GameComponent gameId={selectedGame} />
          </motion.div>
        ) : (
          <>
            {/* Game Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {games.map((game, index) => {
                const rowColor = getRowColor(index);
                return (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setSelectedGame(game.id)}
                    className={`border ${rowColor.border} ${rowColor.text} ${rowColor.hover} p-6 cursor-pointer transition-all duration-300 group`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-3">{game.icon}</div>
                      <h3 className="text-lg font-pixel mb-1">{game.title}</h3>
                      <p className="text-xs opacity-75 mb-2">{game.subtitle}</p>
                      <p className="text-xs opacity-50">{game.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* KAI's Gaming Wisdom */}
            <div className="border border-muted p-6">
              <h3 className="font-pixel mb-3 text-accent">KAI'S GAMING WISDOM</h3>
              <p className="text-sm opacity-75">
                {kaiGameComments[Math.floor(Math.random() * kaiGameComments.length)]}
              </p>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Games;
