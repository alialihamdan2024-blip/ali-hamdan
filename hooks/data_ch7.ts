
import { Question } from '../types';
import { questions as skeletonQuestions } from './data_skeleton';
import { questions as allDiagramQuestions } from './data_chapter_all';

const extraQuestions: Question[] = [
  {
    id: 'ch7-extra-001',
    questionText: 'The embryonic skull begins developing during the fourth week after fertilization. Which part of these embryonic connective tissues will eventually form the facial bones?',
    answerText: 'the membranous viscerocranium',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    options: ['the cartilaginous neurocranium', 'the membranous neurocranium', 'the cartilaginous viscerocranium', 'the membranous viscerocranium', 'the mesenchyme']
  },
  {
    id: 'ch7-extra-002',
    questionText: 'True/False: The bones of the skull develop from mesenchymal cells of the mesoderm.',
    answerText: 'False',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    options: ['True', 'False']
  }
];

// Filter Extended Diagram Questions for Ch7
const extendedDiagrams = allDiagramQuestions.filter(q => q.category === 'Chapter 7: The Skeletal System: The Axial Skeleton');

export const questions: Question[] = [
  ...skeletonQuestions.filter(q => q.category === 'Chapter 7: The Skeletal System: The Axial Skeleton').map(q => {
    if (!q.options || q.options.length < 2) {
      const allLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
      const otherLetters = allLetters.filter(l => l !== q.answerText);
      const shuffled = otherLetters.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      const options = [q.answerText, ...selected].sort(() => 0.5 - Math.random());
      return {
        ...q,
        options
      };
    }
    return q;
  }),
  ...extraQuestions,
  ...extendedDiagrams
];
