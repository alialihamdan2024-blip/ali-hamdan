
import { Question } from '../types';
import { questions as diagramQuestions } from './data_ch11_diagrams';
import { questions as conceptQuestions } from './data_ch11_concepts';
import { questions as newQuestions } from './data_ch11_additions';
import { questions as quizletQuestions } from './data_ch11_quizlet';

// 1. Gather all text-based questions (Concepts + Additions + Quizlet)
// Combining these ensures we don't lose any content.
const rawTextQuestions = [...conceptQuestions, ...newQuestions, ...quizletQuestions];

// 2. Helper to generate options for questions that are missing them
// (This fixes the issue where some questions "don't work" in Quiz mode)
const withOptions = (qs: Question[]): Question[] => {
  // Create a pool of all possible answers to use as distractors
  const answerPool = qs.map(q => q.answerText).filter(a => a && a.trim() !== '');
  
  return qs.map(q => {
    // If options already exist and are sufficient (>= 2), keep them
    if (q.options && q.options.length >= 2) {
      return q;
    }

    // Otherwise, generate distractors from the pool
    // Filter out the correct answer from the pool to avoid duplicates
    // Also filter out single letter answers to prevent them from being used as distractors for text questions
    const distractors = answerPool
      .filter(a => a !== q.answerText && a.length > 1)
      .sort(() => 0.5 - Math.random()) // Shuffle
      .slice(0, 3); // Take 3 random wrong answers
    
    // Combine correct answer + distractors and shuffle
    const options = [q.answerText, ...distractors].sort(() => 0.5 - Math.random());
    
    return {
      ...q,
      options
    };
  });
};

// 3. Apply the option generation to text questions
const processedTextQuestions = withOptions(rawTextQuestions);

// 4. Deduplicate based on ID to ensure no conflicts (safety check)
const uniqueText = Array.from(new Map(processedTextQuestions.map(item => [item.id, item])).values());

// 5. Combine with Diagram questions
// Diagram questions usually already have specific options (A, B, C, D) defined in their file
export const questions: Question[] = [...uniqueText, ...diagramQuestions];
