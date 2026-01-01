import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trophy, Target, Zap } from 'lucide-react';
import catSprite from '@/assets/cat-runner-sprite.png';
import { anatomyPrompts, getRandomPrompt, AnatomyPrompt } from '@/data/anatomyPrompts';

interface Word {
  id: number;
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  lane: number;
}

interface AnatomyRunnerGameProps {
  onBack: () => void;
}

const AnatomyRunnerGame: React.FC<AnatomyRunnerGameProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [currentPrompt, setCurrentPrompt] = useState<AnatomyPrompt | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [playerY, setPlayerY] = useState(1); // 0 = top, 1 = middle, 2 = bottom (lanes)
  const [isJumping, setIsJumping] = useState(false);
  const [isSliding, setIsSliding] = useState(false);
  const [spriteFrame, setSpriteFrame] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(1); // Start slower
  const [feedback, setFeedback] = useState<{ text: string; isCorrect: boolean } | null>(null);
  const [learningMode, setLearningMode] = useState(true);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const wordIdRef = useRef(0);
  const collisionRef = useRef<Set<number>>(new Set());

  // Sprite animation
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const interval = setInterval(() => {
      setSpriteFrame(prev => (prev + 1) % 6);
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying, gameOver]);

  // Spawn words - slower at start, faster as level increases
  useEffect(() => {
    if (!isPlaying || gameOver || !currentPrompt) return;
    
    // Base spawn interval: 3000ms at level 1, decreasing to 1500ms at level 5
    const baseInterval = Math.max(1500, 3500 - (level * 400));
    
    const spawnInterval = setInterval(() => {
      const isCorrect = Math.random() > 0.4;
      const wordPool = isCorrect ? currentPrompt.correctWords : currentPrompt.incorrectWords;
      const text = wordPool[Math.floor(Math.random() * wordPool.length)];
      const lane = Math.floor(Math.random() * 3);
      
      const newWord: Word = {
        id: wordIdRef.current++,
        text,
        isCorrect,
        x: 100,
        y: lane * 33 + 10,
        lane
      };
      
      setWords(prev => [...prev, newWord]);
    }, baseInterval);
    
    return () => clearInterval(spawnInterval);
  }, [isPlaying, gameOver, currentPrompt, level]);

  // Handle collision logic
  const handleCollision = useCallback((word: Word) => {
    setWords(prev => prev.filter(w => w.id !== word.id));
    
    if (word.isCorrect) {
      const points = 10 * (1 + Math.floor(combo / 5));
      setScore(prev => prev + points);
      setCombo(prev => {
        const newCombo = prev + 1;
        if (newCombo > maxCombo) setMaxCombo(newCombo);
        return newCombo;
      });
      setCorrectCount(prev => prev + 1);
      setFeedback({ text: `+${points} ${word.text}`, isCorrect: true });
    } else {
      setLives(prev => {
        const newLives = prev - 1;
        if (newLives <= 0) {
          setGameOver(true);
          setIsPlaying(false);
        }
        return newLives;
      });
      setCombo(0);
      setWrongCount(prev => prev + 1);
      setFeedback({ text: `Wrong! ${word.text} is not correct`, isCorrect: false });
    }
    
    if (learningMode && !word.isCorrect) {
      setTimeout(() => setFeedback(null), 2000);
    } else {
      setTimeout(() => setFeedback(null), 1000);
    }
  }, [combo, maxCombo, learningMode]);

  // Move words and check collisions
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    
    // Movement speed: starts at 0.15, increases to 0.4 at level 5
    const moveSpeed = 0.15 + (level * 0.05);
    
    const gameLoop = () => {
      setWords(prev => {
        const updated = prev.map(word => ({
          ...word,
          x: word.x - moveSpeed
        })).filter(word => word.x > -20);
        
        // Check collision with player (player is at x ~15%)
        updated.forEach(word => {
          if (word.x <= 18 && word.x >= 8 && word.lane === playerY && !collisionRef.current.has(word.id)) {
            collisionRef.current.add(word.id);
            handleCollision(word);
          }
        });
        
        // Clean up old collision IDs
        const currentIds = new Set(updated.map(w => w.id));
        collisionRef.current.forEach(id => {
          if (!currentIds.has(id)) collisionRef.current.delete(id);
        });
        
        return updated.filter(word => word.x > 5 || collisionRef.current.has(word.id)).filter(word => word.x > -5);
      });
      
      animationRef.current = requestAnimationFrame(gameLoop);
    };
    
    animationRef.current = requestAnimationFrame(gameLoop);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, gameOver, playerY, level, handleCollision]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isPlaying || gameOver) return;
      
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (playerY > 0) {
          setPlayerY(prev => prev - 1);
          setIsJumping(true);
          setTimeout(() => setIsJumping(false), 300);
        }
      } else if (e.code === 'ArrowDown') {
        e.preventDefault();
        if (playerY < 2) {
          setPlayerY(prev => prev + 1);
          setIsSliding(true);
          setTimeout(() => setIsSliding(false), 300);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, gameOver, playerY]);

  // Level progression - slower scaling
  useEffect(() => {
    const newLevel = Math.min(5, 1 + Math.floor(score / 150)); // 150 points per level instead of 100
    if (newLevel !== level) {
      setLevel(newLevel);
      setCurrentPrompt(getRandomPrompt(newLevel));
    }
  }, [score, level]);

  // Change prompt periodically
  useEffect(() => {
    if (!isPlaying || gameOver) return;
    const interval = setInterval(() => {
      setCurrentPrompt(getRandomPrompt(level));
    }, 15000);
    return () => clearInterval(interval);
  }, [isPlaying, gameOver, level]);

  const startGame = () => {
    setIsPlaying(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setCombo(0);
    setMaxCombo(0);
    setCorrectCount(0);
    setWrongCount(0);
    setLevel(1);
    setGameSpeed(1);
    setWords([]);
    setPlayerY(1);
    setCurrentPrompt(getRandomPrompt(1));
    wordIdRef.current = 0;
    collisionRef.current.clear();
    gameRef.current?.focus();
  };

  const accuracy = correctCount + wrongCount > 0 
    ? Math.round((correctCount / (correctCount + wrongCount)) * 100) 
    : 0;

  // Start screen
  if (!isPlaying && !gameOver) {
    return (
      <div className="border border-accent p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-pixel mb-4">ANATOMY RUNNER</h3>
          <p className="text-base opacity-75 mb-4">
            Run through anatomical terms! Collect correct answers, avoid wrong ones.
          </p>
          
          <div className="bg-muted/20 border border-muted p-4 mb-6 text-sm">
            <p className="mb-2 text-accent font-pixel">HOW TO PLAY:</p>
            <ul className="text-left max-w-md mx-auto space-y-1 opacity-75">
              <li>• Read the prompt at the top</li>
              <li>• Use <span className="text-accent">↑/SPACE</span> to jump up lanes</li>
              <li>• Use <span className="text-accent">↓</span> to slide down lanes</li>
              <li>• Catch words that match the prompt</li>
              <li>• Avoid incorrect terms!</li>
            </ul>
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={learningMode}
                onChange={(e) => setLearningMode(e.target.checked)}
                className="accent-primary"
              />
              <span>Learning Mode (shows explanations)</span>
            </label>
          </div>
        </div>
        
        <button
          onClick={startGame}
          className="w-full bg-primary text-primary-foreground py-3 px-6 font-pixel hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          START RUNNING
        </button>
      </div>
    );
  }

  // Game over screen
  if (gameOver) {
    return (
      <div className="border border-accent p-6 text-center">
        <h3 className="text-2xl font-pixel mb-6">RUN COMPLETE</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="border border-secondary p-4">
            <Trophy className="mx-auto mb-2 text-accent" size={24} />
            <div className="text-2xl font-pixel text-accent">{score}</div>
            <div className="text-xs opacity-75">SCORE</div>
          </div>
          <div className="border border-secondary p-4">
            <Target className="mx-auto mb-2 text-accent" size={24} />
            <div className="text-2xl font-pixel text-accent">{accuracy}%</div>
            <div className="text-xs opacity-75">ACCURACY</div>
          </div>
          <div className="border border-secondary p-4">
            <Zap className="mx-auto mb-2 text-accent" size={24} />
            <div className="text-2xl font-pixel text-accent">{maxCombo}</div>
            <div className="text-xs opacity-75">MAX COMBO</div>
          </div>
          <div className="border border-secondary p-4">
            <div className="text-2xl mb-2">📚</div>
            <div className="text-2xl font-pixel text-accent">L{level}</div>
            <div className="text-xs opacity-75">LEVEL</div>
          </div>
        </div>

        <div className="text-sm opacity-75 mb-6 border border-muted p-4">
          <span className="text-accent">KAI:</span>{' '}
          {accuracy >= 80 ? "Impressive reflexes! Your anatomy knowledge is sharp." :
           accuracy >= 60 ? "Not bad. Keep running those neural pathways." :
           "Those anatomical terms are running circles around you. Time to review!"}
        </div>

        <div className="flex gap-4">
          <button
            onClick={startGame}
            className="flex-1 bg-primary text-primary-foreground py-3 px-6 hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            RUN AGAIN
          </button>
          <button
            onClick={onBack}
            className="flex-1 border border-secondary px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            BACK TO GAMES
          </button>
        </div>
      </div>
    );
  }

  // Game screen
  return (
    <div 
      ref={gameRef}
      tabIndex={0}
      className="border border-accent focus:outline-none"
    >
      {/* HUD */}
      <div className="flex justify-between items-center p-4 border-b border-secondary bg-background/80">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                size={20} 
                className={i < lives ? 'text-card-red fill-card-red' : 'text-muted'} 
              />
            ))}
          </div>
          <div className="text-sm">
            <span className="text-accent">COMBO:</span> {combo}x
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs opacity-50">LEVEL {level}</div>
          <div className="font-pixel text-lg text-accent">{score}</div>
        </div>
        <button
          onClick={() => {
            setIsPlaying(false);
            setGameOver(true);
          }}
          className="text-xs border border-muted px-3 py-1 hover:bg-muted/20"
        >
          END
        </button>
      </div>

      {/* Prompt */}
      <div className="bg-primary/20 border-b border-primary p-3 text-center">
        <span className="font-pixel text-primary text-lg">{currentPrompt?.prompt}</span>
      </div>

      {/* Game Area */}
      <div className="relative h-64 bg-gradient-to-b from-background via-muted/10 to-muted/20 overflow-hidden">
        {/* Lane lines */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-0 right-0 border-t border-dashed border-muted/30" />
          <div className="absolute top-2/3 left-0 right-0 border-t border-dashed border-muted/30" />
        </div>

        {/* Ground */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-muted/40" />

        {/* Player (Cat) */}
        <motion.div
          className="absolute left-[10%]"
          animate={{ 
            top: `${playerY * 33 + 5}%`,
            scaleY: isSliding ? 0.6 : 1,
            y: isJumping ? -10 : 0
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {/* Sprite is 3 columns x 2 rows: frame 0-2 top row, 3-5 bottom row */}
          <div 
            className="w-16 h-16 relative"
            style={{
              backgroundImage: `url(${catSprite})`,
              backgroundSize: '300% 200%',
              backgroundPosition: `${(spriteFrame % 3) * 50}% ${spriteFrame < 3 ? 0 : 100}%`,
            }}
          />
        </motion.div>

        {/* Words */}
        <AnimatePresence>
          {words.map(word => (
            <motion.div
              key={word.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute px-3 py-1 rounded border font-pixel text-sm whitespace-nowrap"
              style={{
                left: `${word.x}%`,
                top: `${word.y}%`,
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--secondary))'
              }}
            >
              {word.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded font-pixel text-sm ${
                feedback.isCorrect 
                  ? 'bg-primary/20 border border-primary text-primary' 
                  : 'bg-destructive/20 border border-destructive text-destructive'
              }`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls hint */}
      <div className="p-2 text-center text-xs opacity-50 border-t border-muted">
        <span className="mr-4">↑ / SPACE = Jump Up</span>
        <span>↓ = Slide Down</span>
      </div>
    </div>
  );
};

export default AnatomyRunnerGame;
