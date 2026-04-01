
import { Question } from '../types';
import { questions as rawQuestions } from './data';

const optionsMap: Record<string, string[]> = {
  "ch3-001": [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J"
  ],
  "ch3-002": [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J"
  ],
  "ch3-003": [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J"
  ],
  "ch3-004": [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J"
  ],
  "ch3-005": [
    "A",
    "B",
    "C",
    "D",
    "E"
  ],
  "ch3-006": [
    "A",
    "B",
    "C",
    "D",
    "E"
  ],
  "ch3-007": [
    "A",
    "B",
    "C",
    "D",
    "E"
  ],
  "ch3-008": [
    "A & F",
    "B & C",
    "D & E",
    "G & H"
  ],
  "ch3-009": [
    "cholesterol",
    "phospholipid",
    "glycolipid",
    "integral protein"
  ],
  "ch3-010": [
    "integral proteins",
    "peripheral proteins",
    "glycoproteins",
    "cholesterol"
  ],
  "ch3-011": [
    "glycoprotein",
    "glycolipid",
    "phospholipid",
    "cholesterol"
  ],
  "ch3-012": [
    "A",
    "B",
    "C",
    "D",
    "E"
  ],
  "ch3-013": [
    "A",
    "B",
    "C",
    "D",
    "E"
  ],
  "ch3-014": [
    "binding > vesicle formation > uncoating > fusion with endosome > recycling of receptors to plasma membrane > degradation in lysosomes",
    "binding > uncoating > vesicle formation > fusion with endosome > degradation in lysosomes > recycling of receptors to plasma membrane",
    "vesicle formation > binding > uncoating > fusion with endosome > recycling of receptors to plasma membrane > degradation in lysosomes",
    "binding > vesicle formation > fusion with endosome > uncoating > recycling of receptors to plasma membrane > degradation in lysosomes"
  ],
  "ch3-015": [
    "pseudopods surround particle > phagosome formed > fusion of lysosome and phagosome > digestion by lysosomal enzymes > residual body formed",
    "phagosome formed > pseudopods surround particle > fusion of lysosome and phagosome > digestion by lysosomal enzymes > residual body formed",
    "pseudopods surround particle > fusion of lysosome and phagosome > phagosome formed > digestion by lysosomal enzymes > residual body formed",
    "pseudopods surround particle > phagosome formed > digestion by lysosomal enzymes > fusion of lysosome and phagosome > residual body formed"
  ],
  "ch3-016": [
    "plasma membrane forms vesicle around extracellular droplets > vesicle formed pinches off into cytosol > fusion of lysosome and vesicle > digestion by enzymes > solutes released",
    "vesicle formed pinches off into cytosol > plasma membrane forms vesicle around extracellular droplets > fusion of lysosome and vesicle > digestion by enzymes > solutes released",
    "plasma membrane forms vesicle around extracellular droplets > fusion of lysosome and vesicle > vesicle formed pinches off into cytosol > digestion by enzymes > solutes released",
    "plasma membrane forms vesicle around extracellular droplets > vesicle formed pinches off into cytosol > digestion by enzymes > fusion of lysosome and vesicle > solutes released"
  ],
  "ch3-017": [
    "A & B",
    "C & D",
    "D & E",
    "E & F"
  ]
};

export const questions: Question[] = rawQuestions
  .filter(q => q.category === 'Chapter 3: The Cellular Level of Organization')
  .map(q => {
    if (optionsMap[q.id]) {
      return { ...q, options: optionsMap[q.id] };
    }
    if (!q.options || q.options.length < 2) {
      return { ...q, options: [q.answerText, 'Option B', 'Option C', 'Option D'] };
    }
    return q;
  });
