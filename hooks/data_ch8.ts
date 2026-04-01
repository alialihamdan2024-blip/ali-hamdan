
import { Question } from '../types';
import { questions as skeletonQuestions } from './data_skeleton';
import { questions as allDiagramQuestions } from './data_chapter_all';

// Filter diagram questions from the shared skeleton file that belong to Chapter 8
const ch8Diagrams = skeletonQuestions.filter(q => q.category === 'Chapter 8: The Skeletal System: The Appendicular Skeleton');

// Filter Extended Diagram Questions for Ch8
const extendedDiagrams = allDiagramQuestions.filter(q => q.category === 'Chapter 8: The Skeletal System: The Appendicular Skeleton');

const extraQuestions: Question[] = [
  // --- Text Questions ---
  {
    id: 'ch8-036',
    questionText: 'The clavicle articulates medially with which structure to form the sternoclavicular joint?',
    answerText: 'Manubrium of the sternum',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Manubrium of the sternum',
      'Body of the sternum',
      'Acromion of the scapula',
      'Coracoid process of the scapula',
      'Xiphoid process'
    ]
  },
  {
    id: 'ch8-037',
    questionText: 'Which of the following bones articulate at the glenohumeral joint?',
    answerText: 'Scapula and humerus',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Scapula and humerus',
      'Clavicle and humerus',
      'Clavicle and scapula',
      'Sternum and clavicle',
      'Humerus and ulna'
    ]
  },
  {
    id: 'ch8-038',
    questionText: 'Which of the following is the correct sequence of bones of the upper limb, from proximal to distal ends?',
    answerText: 'Humerus, radius and ulna, carpals, metacarpals, phalanges',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Humerus, radius and ulna, carpals, metacarpals, phalanges',
      'Humerus, tibia and fibula, tarsals, metatarsals, phalanges',
      'Carpals, metacarpals, phalanges, radius and ulna, humerus',
      'Radius and ulna, humerus, carpals, metacarpals, phalanges',
      'Phalanges, metacarpals, carpals, radius and ulna, humerus'
    ]
  },
  {
    id: 'ch8-039',
    questionText: 'The longest and largest bone of the upper limb is the __________.',
    answerText: 'Humerus',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Humerus',
      'Radius',
      'Ulna',
      'Femur',
      'Scapula'
    ]
  },
  {
    id: 'ch8-040',
    questionText: 'Which distal feature of the humerus articulates with the head of the radius?',
    answerText: 'Capitulum',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Capitulum',
      'Trochlea',
      'Olecranon fossa',
      'Medial epicondyle',
      'Coronoid fossa'
    ]
  },
  {
    id: 'ch8-041',
    questionText: 'The distal end of the radius articulates directly with which carpal bones?',
    answerText: 'Scaphoid and Lunate',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Scaphoid and Lunate',
      'Triquetrum and Pisiform',
      'Hamate and Capitate',
      'Trapezium and Trapezoid',
      'Lunate and Triquetrum'
    ]
  },
  {
    id: 'ch8-042',
    questionText: 'Which of the following bones of the wrist is most commonly fractured when a person falls on an outstretched hand?',
    answerText: 'Scaphoid',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Scaphoid',
      'Lunate',
      'Pisiform',
      'Hamate',
      'Capitate'
    ]
  },
  {
    id: 'ch8-043',
    questionText: 'Which digit (finger) has only two phalanges (proximal and distal) rather than three?',
    answerText: 'Thumb (Pollex)',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Thumb (Pollex)',
      'Index (II)',
      'Middle (III)',
      'Ring (IV)',
      'Little (V)'
    ]
  },
  {
    id: 'ch8-044',
    questionText: 'Which of the following bones is the largest and most superior of the three bones that make up the hip bone?',
    answerText: 'Ilium',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Ilium',
      'Ischium',
      'Pubis',
      'Sacrum',
      'Coccyx'
    ]
  },
  {
    id: 'ch8-045',
    questionText: 'In the pelvic girdle, the two hip bones unite posteriorly with the sacrum to form the __________ joint.',
    answerText: 'Sacroiliac',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Sacroiliac',
      'Pubic symphysis',
      'Acetabular',
      'Lumbosacral',
      'Sacrococcygeal'
    ]
  },
  {
    id: 'ch8-046',
    questionText: 'Which bones fuse to form the acetabulum (socket for the femoral head)?',
    answerText: 'Ilium, Ischium, and Pubis',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Ilium, Ischium, and Pubis',
      'Ilium and Ischium only',
      'Ischium and Pubis only',
      'Ilium and Pubis only',
      'Ilium, Sacrum, and Pubis'
    ]
  },
  {
    id: 'ch8-047',
    questionText: 'Which joint consists of a fibrocartilage disc that joins the two pubic bones anteriorly?',
    answerText: 'Pubic symphysis',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Pubic symphysis',
      'Sacroiliac joint',
      'Acetabulum',
      'Obturator foramen',
      'Hip joint'
    ]
  },
  {
    id: 'ch8-048',
    questionText: 'The obturator foramen is the largest foramen in the body. Which two bones surround it?',
    answerText: 'Ischium and Pubis',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Ischium and Pubis',
      'Ilium and Ischium',
      'Ilium and Pubis',
      'Sacrum and Ischium',
      'Femur and Acetabulum'
    ]
  },
  {
    id: 'ch8-049',
    questionText: 'Which landmarks form the boundary known as the pelvic brim (pelvic inlet)?',
    answerText: 'Sacral promontory, arcuate lines, and pubic crests',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Sacral promontory, arcuate lines, and pubic crests',
      'Iliac crests, ischial spines, and pubic symphysis',
      'Ischial tuberosities and coccyx',
      'Acetabulum and obturator foramen',
      'Greater and lesser sciatic notches'
    ]
  },
  {
    id: 'ch8-050',
    questionText: 'Which of the following is TRUE comparing male and female pelves?',
    answerText: 'The female pubic arch is greater than 90 degrees.',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'The female pubic arch is greater than 90 degrees.',
      'The male pelvis is wider and shallower.',
      'The female pelvic inlet is heart-shaped.',
      'The male coccyx is more movable.',
      'The female obturator foramen is rounder.'
    ]
  },
  {
    id: 'ch8-051',
    questionText: 'A forensic anthropologist examines a pelvis with a wide greater sciatic notch and a subpubic angle of 100 degrees. This pelvis most likely belongs to a:',
    answerText: 'Female',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Female',
      'Male',
      'Child (indistinguishable)',
      'Cannot be determined'
    ]
  },
  {
    id: 'ch8-052',
    questionText: 'Which of the following is the correct sequence of bones of the lower limb, from proximal to distal?',
    answerText: 'Femur, patella, tibia and fibula, tarsals, metatarsals, phalanges',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Femur, patella, tibia and fibula, tarsals, metatarsals, phalanges',
      'Femur, tibia and fibula, patella, metatarsals, tarsals, phalanges',
      'Humerus, radius and ulna, carpals, metacarpals, phalanges',
      'Femur, fibula and tibia, tarsals, phalanges, metatarsals',
      'Tibia, femur, patella, tarsals, metatarsals, phalanges'
    ]
  },
  {
    id: 'ch8-053',
    questionText: 'The fovea capitis is a small depression found on the head of which bone?',
    answerText: 'Femur',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Femur',
      'Humerus',
      'Radius',
      'Tibia',
      'Fibula'
    ]
  },
  {
    id: 'ch8-054',
    questionText: 'Which bony landmark on the femur is commonly used as a landmark for intramuscular injections in the lateral thigh?',
    answerText: 'Greater trochanter',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Greater trochanter',
      'Lesser trochanter',
      'Medial epicondyle',
      'Lateral epicondyle',
      'Ischial tuberosity'
    ]
  },
  {
    id: 'ch8-055',
    questionText: 'The head of the femur articulates with the __________ of the hip bone.',
    answerText: 'Acetabulum',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Acetabulum',
      'Obturator foramen',
      'Glenoid cavity',
      'Auricular surface',
      'Ischial spine'
    ]
  },
  {
    id: 'ch8-056',
    questionText: 'The medial and lateral condyles are distal features of the _________ that articulate with the tibia.',
    answerText: 'Femur',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Femur',
      'Tibia',
      'Fibula',
      'Patella',
      'Humerus'
    ]
  },
  {
    id: 'ch8-057',
    questionText: 'Which joint is the primary weight-bearing joint of the knee?',
    answerText: 'Tibiofemoral joint',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Tibiofemoral joint',
      'Patellofemoral joint',
      'Proximal tibiofibular joint',
      'Distal tibiofibular joint',
      'Sacroiliac joint'
    ]
  },
  {
    id: 'ch8-058',
    questionText: 'The "ankle bone" protrusions visible on the medial and lateral sides of the ankle are formed by:',
    answerText: 'Medial malleolus of Tibia and Lateral malleolus of Fibula',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Medial malleolus of Tibia and Lateral malleolus of Fibula',
      'Lateral malleolus of Tibia and Medial malleolus of Fibula',
      'Medial and Lateral condyles of the Tibia',
      'The Talus and Calcaneus bones',
      'Styloid processes of Tibia and Fibula'
    ]
  },
  {
    id: 'ch8-059',
    questionText: 'Which tarsal bone forms the heel of the foot?',
    answerText: 'Calcaneus',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Calcaneus',
      'Talus',
      'Navicular',
      'Cuboid',
      'Cuneiform'
    ]
  },
  {
    id: 'ch8-060',
    questionText: 'The tibia transfers weight to which tarsal bone?',
    answerText: 'Talus',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Talus',
      'Calcaneus',
      'Navicular',
      'Cuboid',
      'Metatarsals'
    ]
  },
  {
    id: 'ch8-061',
    questionText: 'When sitting on a hard chair, the weight of the body rests on the:',
    answerText: 'Ischial tuberosity',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: [
      'Ischial tuberosity',
      'Ischial spine',
      'Pubic symphysis',
      'Iliac crest',
      'Coccyx'
    ]
  },
  // --- True/False Questions ---
  {
    id: 'ch8-tf-001',
    questionText: 'True/False: The pectoral girdle consists of the clavicle and scapula.',
    answerText: 'True',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: ['True', 'False']
  },
  {
    id: 'ch8-tf-002',
    questionText: 'True/False: The fibula is a weight-bearing bone of the lower leg.',
    answerText: 'False',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: ['True', 'False']
  },
  {
    id: 'ch8-tf-003',
    questionText: 'True/False: The thumb (pollex) has three phalanges.',
    answerText: 'False',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: ['True', 'False']
  },
  {
    id: 'ch8-tf-004',
    questionText: 'True/False: The ulna is located on the medial side of the forearm (pinky side).',
    answerText: 'True',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: ['True', 'False']
  },
  {
    id: 'ch8-tf-005',
    questionText: 'True/False: The female pelvis typically has a subpubic angle less than 90 degrees.',
    answerText: 'False',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    options: ['True', 'False']
  }
];

export const questions: Question[] = [
  ...ch8Diagrams, 
  ...extraQuestions,
  ...extendedDiagrams
];
