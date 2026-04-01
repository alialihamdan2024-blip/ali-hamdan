
import { Question } from '../types';
import { questions as rawQuestions } from './data';

// --- UTILITIES ---
const shuffle = (array: string[]) => [...array].sort(() => Math.random() - 0.5);

const getDistractors = (correct: string, pool: string[], count: number = 3): string[] => {
  // Filter out the correct answer and empty strings, case-insensitive check
  const filtered = pool.filter(item => item.toLowerCase() !== correct.toLowerCase() && item && item.trim() !== '');
  // Ensure uniqueness
  const unique = Array.from(new Set(filtered));
  // Shuffle and slice
  return shuffle(unique).slice(0, count);
};

// --- DATA POOLS ---

const directionalTerms = [
  'Superior', 'Inferior', 'Anterior', 'Posterior', 'Medial', 'Lateral', 
  'Proximal', 'Distal', 'Superficial', 'Deep', 'Ipsilateral', 'Contralateral',
  'Ventral', 'Dorsal', 'Prone', 'Supine'
];

const planes = [
  'Sagittal Plane', 'Midsagittal Plane', 'Parasagittal Plane', 
  'Transverse Plane', 'Frontal / Coronal Plane', 'Oblique Plane'
];

const bodyCavities = [
  'Cranial cavity', 'Vertebral canal', 'Thoracic cavity', 'Pleural cavity', 
  'Pericardial cavity', 'Mediastinum', 'Abdominopelvic cavity', 
  'Abdominal cavity', 'Pelvic cavity'
];

const regions = [
  'Right hypochondriac', 'Epigastric', 'Left hypochondriac', 
  'Right lumbar', 'Umbilical', 'Left lumbar', 
  'Right inguinal', 'Hypogastric', 'Left inguinal'
];

const systems = [
  'Integumentary system', 'Skeletal system', 'Muscular system', 'Nervous system',
  'Endocrine system', 'Cardiovascular system', 'Lymphatic and immune system',
  'Respiratory system', 'Digestive system', 'Urinary system', 'Reproductive system'
];

const organizationLevels = [
  'Chemical', 'Cellular', 'Tissue', 'Organ', 'System', 'Organismal'
];

// Extract anatomical terms
const anatomicalTermsPool = rawQuestions
  .filter(q => q.category === 'Chapter 1: Introduction to the Human Body' && q.questionText.includes('Anatomical term'))
  .map(q => q.answerText);

// Extract definitions
const definitionsPool = rawQuestions
  .filter(q => q.category === 'Chapter 1: Introduction to the Human Body' && q.questionText.startsWith('Define the term:'))
  .map(q => q.answerText);

// Extract all answers for fallback
const allCh1Answers = rawQuestions
  .filter(q => q.category === 'Chapter 1: Introduction to the Human Body')
  .map(q => q.answerText);

// --- DEDUPLICATION LOGIC ---
// Filter unique questions based on normalized question text to prevent repeats
const uniqueCh1Questions = rawQuestions
  .filter(q => q.category === 'Chapter 1: Introduction to the Human Body')
  .filter((q, index, self) => 
    index === self.findIndex((t) => (
      t.questionText.trim().toLowerCase() === q.questionText.trim().toLowerCase()
    ))
  );

export const questions: Question[] = uniqueCh1Questions
  .map(q => {
    let options: string[] = [];
    const lowerQ = q.questionText.toLowerCase();
    const lowerA = q.answerText.toLowerCase();

    // 0. Fix specific typo
    if (q.id === 'ch1-019') {
        q.answerText = q.answerText.replace('father', 'farther');
    }

    // 0. Diagram Letters (A, B, C...) or Image References
    if (/^[a-z]$/i.test(q.answerText)) {
       const letters = ['A', 'B', 'C', 'D', 'E'];
       if (!letters.includes(q.answerText.toUpperCase())) {
           letters.push(q.answerText.toUpperCase());
       }
       options = [q.answerText, ...getDistractors(q.answerText, letters)];
    }
    
    // 1. Directional Terms
    else if (directionalTerms.some(t => t.toLowerCase() === lowerA) || 
        lowerQ.includes('directional term') || 
        (lowerQ.includes(' is ') && lowerQ.includes(' to ') && directionalTerms.some(t => lowerA.includes(t.toLowerCase())))) {
      options = [q.answerText, ...getDistractors(q.answerText, directionalTerms)];
    }
    
    // 2. Planes
    else if (planes.some(p => lowerA.includes(p.toLowerCase())) || lowerQ.includes('plane')) {
      options = [q.answerText, ...getDistractors(q.answerText, planes)];
    }

    // 3. Body Cavities
    else if (bodyCavities.some(c => lowerA.includes(c.toLowerCase())) || lowerQ.includes('cavity')) {
      options = [q.answerText, ...getDistractors(q.answerText, bodyCavities)];
    }

    // 4. Anatomical Terms
    else if (lowerQ.includes('anatomical term') || anatomicalTermsPool.includes(q.answerText)) {
      options = [q.answerText, ...getDistractors(q.answerText, anatomicalTermsPool)];
    }

    // 5. Systems
    else if (systems.some(s => lowerA.includes(s.toLowerCase())) || lowerQ.includes('system')) {
      options = [q.answerText, ...getDistractors(q.answerText, systems)];
    }

    // 6. Organization Levels
    else if (organizationLevels.some(l => lowerA.includes(l.toLowerCase())) || lowerQ.includes('level')) {
       options = [q.answerText, ...getDistractors(q.answerText, organizationLevels)];
    }

    // 7. Regions (diagrams sometimes have names too)
    else if (regions.some(r => lowerA.includes(r.toLowerCase()))) {
        options = [q.answerText, ...getDistractors(q.answerText, regions)];
    }

    // 8. Specific Fixes
    else if (q.id === 'ch1-203' || q.id === 'ch1-042') { 
        // Levels ordering
        options = [
            'Chemical, cellular, tissue, organ, system, organismal',
            'Organismal, system, organ, tissue, cellular, chemical',
            'Tissue, cellular, chemical, organ, system, organismal',
            'Cellular, tissue, organ, chemical, organismal, system'
        ];
        // Ensure the correct answer is in the list with matching case
        const exactCorrect = options.find(o => o.toLowerCase() === lowerA);
        if (exactCorrect) {
            // It's already there
        } else {
            // Replace the first one if not found (or just unshift)
            options[0] = q.answerText;
        }
    }
    else if (q.id === 'ch1-044') { // Life processes
        options = [
            q.answerText,
            'Digestion, circulation, respiration, excretion, reproduction, sensation',
            'Sensation, integration, reaction, support, movement, protection',
            'Absorption, secretion, filtration, diffusion, osmosis, dialysis'
        ];
    }
    else if (q.id === 'ch1-237') { // Feedback event order
        options = [
            q.answerText,
            'A, B, C, D, E',
            'E, D, C, B, A',
            'C, A, B, E, D'
        ];
    }
    
    // 9. Definitions (long answers)
    else if (lowerQ.startsWith('define the term:') || q.answerText.length > 20) {
       // Use definitions pool
       options = [q.answerText, ...getDistractors(q.answerText, definitionsPool)];
    }

    // Fallback: If nothing matched or options are empty
    if (options.length === 0) {
       if (q.answerText.length < 20) {
           options = [q.answerText, ...getDistractors(q.answerText, allCh1Answers)];
       } else {
           options = [q.answerText, ...getDistractors(q.answerText, definitionsPool)];
       }
    }

    // FINAL CHECK: Ensure we have at least 4 options if possible, and include answer
    // Remove duplicates
    options = Array.from(new Set(options));
    
    // Ensure correct answer is present
    if (!options.includes(q.answerText)) {
        options.unshift(q.answerText);
    }
    
    // If we still have fewer than 4, try to fill from all answers
    if (options.length < 4) {
        const randoms = getDistractors(q.answerText, allCh1Answers, 4 - options.length);
        options = [...options, ...randoms];
    }

    // Final shuffle
    options = shuffle(options).slice(0, 4);

    return {
      ...q,
      options: options
    };
  });
