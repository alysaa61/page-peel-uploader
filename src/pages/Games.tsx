import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gamepad2, Play, Trophy, Clock, Target } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { medicalDictionary, shuffleArray } from '../medicalDictionary';

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [gameScore, setGameScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const games = [
    {
      id: 'memory-flip',
      title: 'MEMORY FLIP',
      subtitle: 'Med Match',
      description: 'Flip cards to match medical terms with their definitions',
      color: 'text-foreground border-secondary',
      icon: '🧠'
    },
    {
      id: 'yes-no-blitz',
      title: 'YES/NO BLITZ',
      subtitle: 'Quick Decisions',
      description: 'Rapid-fire true/false medical statements (Coming Soon)',
      color: 'text-accent border-accent',
      icon: '⚡'
    },
    {
      id: 'quick-sort',
      title: 'QUICK SORT',
      subtitle: 'Organ Panic',
      description: 'Drag medical terms into correct categories (Coming Soon)',
      color: 'text-muted-foreground border-muted',
      icon: '📦'
    },
    {
      id: 'typing-challenge',
      title: 'TYPING CHALLENGE',
      subtitle: 'One-Word Speed',
      description: 'Type medical terms as fast as possible',
      color: 'text-secondary border-secondary',
      icon: '⌨️'
    },
    {
      id: 'click-symptom',
      title: 'CLICK THE SYMPTOM',
      subtitle: 'Symptom Hunter',
      description: 'Click the correct symptom from multiple options (Coming Soon)',
      color: 'text-accent border-accent',
      icon: '🎯'
    },
    {
      id: 'scrambled-terms',
      title: 'SCRAMBLED TERMS',
      subtitle: 'Word Unscrambler',
      description: 'Unscramble medical terminology',
      color: 'text-foreground border-secondary',
      icon: '🔤'
    },
    {
      id: 'recall-challenge',
      title: '5-SECOND RECALL',
      subtitle: 'Memory Test',
      description: 'Remember lists shown for 5 seconds (Coming Soon)',
      color: 'text-muted-foreground border-muted',
      icon: '🧠'
    },
    {
      id: 'flashcard-duel',
      title: 'FLASHCARD DUEL',
      subtitle: 'Quick Review',
      description: 'Fast-paced flashcard review session',
      color: 'text-accent border-accent',
      icon: '⚔️'
    },
    {
      id: 'retro-snake',
      title: 'RETRO SNAKE',
      subtitle: 'Classic Arcade',
      description: 'Guide the snake to collect medical terms (Coming Soon)',
      color: 'text-secondary border-secondary',
      icon: '🐍'
    },
    {
      id: 'diagnosis-dash',
      title: 'DIAGNOSIS DASH',
      subtitle: 'Time Trial',
      description: 'Make correct diagnoses under time pressure (Coming Soon)',
      color: 'text-muted-foreground border-muted',
      icon: '⏱️'
    },
    {
      id: 'anatomy-runner',
      title: 'ANATOMY RUNNER',
      subtitle: 'Endless Runner',
      description: 'Run through anatomical structures (Coming Soon)',
      color: 'text-accent border-accent',
      icon: '🏃'
    }
  ];

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
    const [timeLeft, setTimeLeft] = useState(30);
    const [isActive, setIsActive] = useState(false);
    const [terms, setTerms] = useState<string[]>([]);

    useEffect(() => {
      const shuffled = shuffleArray([...medicalDictionary]).slice(0, 20);
      setTerms(shuffled.map(t => t.term));
      setCurrentTerm(shuffled[0].term);
    }, []);

    useEffect(() => {
      if (isActive && timeLeft > 0) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setIsActive(false);
      }
    }, [isActive, timeLeft]);

    const handleInputChange = (value: string) => {
      setUserInput(value);
      if (value.toLowerCase() === currentTerm.toLowerCase()) {
        setScore(score + 1);
        setUserInput('');
        const nextIndex = (terms.indexOf(currentTerm) + 1) % terms.length;
        setCurrentTerm(terms[nextIndex]);
      }
    };

    return (
      <div className="border border-muted p-6">
        <div className="text-center mb-6">
          <h3 className="text-xl font-pixel mb-4">TYPING CHALLENGE</h3>
          <div className="flex justify-between mb-4">
            <div className="text-sm">SCORE: {score}</div>
            <div className="text-sm">TIME: {timeLeft}s</div>
          </div>
        </div>

        {!isActive && timeLeft === 30 ? (
          <div className="text-center">
            <p className="mb-4">Type medical terms as fast as you can!</p>
            <button
              onClick={() => setIsActive(true)}
              className="bg-primary text-primary-foreground py-3 px-6 font-pixel hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              START
            </button>
          </div>
        ) : timeLeft === 0 ? (
          <div className="text-center">
            <h3 className="text-xl font-pixel mb-4">TIME'S UP!</h3>
            <p className="text-lg mb-4">Final Score: {score}</p>
            <button
              onClick={() => setSelectedGame(null)}
              className="border border-secondary px-6 py-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              BACK TO GAMES
            </button>
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
              {games.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedGame(game.id)}
                  className={`border ${game.color} p-6 cursor-pointer hover:bg-opacity-10 hover:bg-current transition-all duration-300 group`}
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
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              <div className="border border-secondary p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-pixel">0</div>
                <div className="text-sm opacity-75">GAMES PLAYED</div>
              </div>
              <div className="border border-muted p-4 text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-pixel">0%</div>
                <div className="text-sm opacity-75">ACCURACY</div>
              </div>
              <div className="border border-accent p-4 text-center">
                <Clock className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-pixel">--</div>
                <div className="text-sm opacity-75">BEST TIME</div>
              </div>
              <div className="border border-secondary p-4 text-center">
                <Gamepad2 className="w-8 h-8 mx-auto mb-2" />
                <div className="text-2xl font-pixel">0</div>
                <div className="text-sm opacity-75">STREAK</div>
              </div>
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
