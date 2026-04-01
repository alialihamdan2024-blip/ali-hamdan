
import { Question } from '../types';
import { questions as rawQuestions } from './data';
import { questions as allDiagramQuestions } from './data_chapter_all';

const enhancedIds = new Set(allDiagramQuestions.map(q => q.id));

const baseQuestions = rawQuestions
  .filter(q => 
    q.category === 'Chapter 6: The Skeletal System: Bone Tissue' &&
    !enhancedIds.has(q.id)
  )
  .map((q, i, arr) => {
    if (!q.options || q.options.length < 2) {
      const otherAnswers = arr
        .filter(other => other.id !== q.id && other.answerText && other.answerText.length > 10)
        .map(other => other.answerText);
      const shuffled = otherAnswers.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      const options = [q.answerText, ...selected].sort(() => 0.5 - Math.random());
      return {
        ...q,
        options
      };
    }
    return q;
  });

// Filter only Chapter 6 questions from the all-chapter file
const chapter6Diagrams = allDiagramQuestions.filter(q => q.category === 'Chapter 6: The Skeletal System: Bone Tissue');

export const questions: Question[] = [...baseQuestions, ...chapter6Diagrams];
