
import { Question } from '../types';
import { questions as rawQuestions } from './data';
import { questions as tissueFixes } from './data_custom_fixes';

const fixIds = new Set(tissueFixes.map(q => q.id));

// Get base questions from raw data that don't have a better "fix" available
const baseQuestions = rawQuestions
  .filter(q => 
    q.category === 'Chapter 4: The Tissue Level of Organization' &&
    !fixIds.has(q.id) && 
    // Also skip the specific ID ranges we know are replaced by data_custom_fixes (ch10-tissue-xx maps to old ch4-092+)
    !q.id.startsWith('ch4-092') && 
    !q.id.startsWith('ch4-093') &&
    !q.id.startsWith('ch4-094') &&
    !q.id.startsWith('ch4-095') &&
    !q.id.startsWith('ch4-096') &&
    !q.id.startsWith('ch4-097') &&
    !q.id.startsWith('ch4-098') &&
    !q.id.startsWith('ch4-099') &&
    !q.id.startsWith('ch4-10') && 
    !q.id.startsWith('ch4-11')    
  )
  .map(q => {
    // Fix: Ensure options exist
    if (!q.options || q.options.length === 0) {
      return {
        ...q,
        options: [q.answerText]
      };
    }
    return q;
  });

export const questions: Question[] = [...baseQuestions, ...tissueFixes];
