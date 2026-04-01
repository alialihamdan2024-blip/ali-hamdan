
import { Question } from '../types';

// --- DIAGRAM INTELLIGENCE ENGINE ---
// Maps existing image URLs to their full anatomical legends to generate exhaustive questions.

interface DiagramLabel {
  letter: string;
  name: string;
  description: string;
  function?: string;
  clinical?: string;
}

interface DiagramMap {
  id: string;
  image: string;
  category: string;
  title: string;
  labels: DiagramLabel[];
}

const diagramDatabase: DiagramMap[] = [
  // --- SKULL & AXIAL SKELETON ---
  {
    id: 'boost-skull-ant',
    image: 'https://o.quizlet.com/yJj4.8386tkSSRsvg2tSEA.png',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    title: 'Anterior Skull',
    labels: [
      { letter: 'A', name: 'Frontal Bone', description: 'Forms the forehead and superior orbits', function: 'Protects frontal lobes' },
      { letter: 'B', name: 'Parietal Bone', description: 'Forms the superior and lateral cranium', function: 'Protects parietal lobes' },
      { letter: 'C', name: 'Sphenoid Bone', description: 'Keystone of the cranial floor', function: 'Articulates with all other cranial bones' },
      { letter: 'D', name: 'Temporal Bone', description: 'Lateral skull bone', function: 'Houses hearing organs' },
      { letter: 'E', name: 'Ethmoid Bone', description: 'Deep cranial bone', function: 'Forms nasal structure' },
      { letter: 'F', name: 'Lacrimal Bone', description: 'Medial orbital wall', function: 'Houses lacrimal sac' },
      { letter: 'G', name: 'Nasal Bone', description: 'Bridge of nose', function: 'Supports nasal cartilages' },
      { letter: 'H', name: 'Zygomatic Bone', description: 'Cheekbone', function: 'Forms lateral orbit' },
      { letter: 'I', name: 'Maxilla', description: 'Upper jaw', function: 'Holds upper teeth' },
      { letter: 'J', name: 'Mandible', description: 'Lower jaw', function: 'Only movable skull bone' }
    ]
  },
  {
    id: 'boost-skull-lat',
    image: 'https://o.quizlet.com/vMhhaYvPmI5zVcZDAjEEBg.png',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    title: 'Lateral Skull',
    labels: [
      { letter: 'A', name: 'Frontal Bone', description: 'Anterior cranium', function: 'Forms forehead' },
      { letter: 'B', name: 'Parietal Bone', description: 'Superior cranium', function: 'Joined by coronal suture' },
      { letter: 'C', name: 'Sphenoid Bone', description: 'Temporal region', function: 'Greater wing visible' },
      { letter: 'D', name: 'Lacrimal Bone', description: 'Anterior medial orbit', function: 'Tear drainage' },
      { letter: 'E', name: 'Occipital Bone', description: 'Posterior cranium', function: 'Visual cortex protection' },
      { letter: 'F', name: 'Temporal Bone', description: 'Lateral cranium', function: 'Houses ear canal' },
      { letter: 'H', name: 'Zygomatic Arch', description: 'Cheek arch', function: 'Masseter origin' },
      { letter: 'J', name: 'Mastoid Process', description: 'Posterior to ear', function: 'Neck muscle attachment' },
      { letter: 'K', name: 'Styloid Process', description: 'Needle-like inferior projection', function: 'Tongue muscle attachment' }
    ]
  },
  {
    id: 'boost-vert',
    image: 'https://o.quizlet.com/jwTOsBrb3UgJWtbPu1-K2A.png',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    title: 'Vertebra Structure',
    labels: [
      { letter: 'A', name: 'Superior Articular Process', description: 'Superior projection', function: 'Articulates with vertebra above' },
      { letter: 'B', name: 'Transverse Process', description: 'Lateral projection', function: 'Muscle attachment' },
      { letter: 'C', name: 'Vertebral Body', description: 'Anterior weight-bearing cylinder', function: 'Supports body weight' },
      { letter: 'D', name: 'Intervertebral Foramen', description: 'Lateral opening', function: 'Passage for spinal nerves' },
      { letter: 'E', name: 'Spinous Process', description: 'Posterior projection', function: 'Muscle/ligament attachment' },
      { letter: 'F', name: 'Inferior Articular Process', description: 'Inferior projection', function: 'Articulates with vertebra below' },
      { letter: 'G', name: 'Intervertebral Disc', description: 'Fibrocartilage pad', function: 'Shock absorption' }
    ]
  },

  // --- APPENDICULAR SKELETON ---
  {
    id: 'boost-humerus-prox',
    image: 'https://o.quizlet.com/tuGVXzbyVQ3nbBu4aMnecA.png',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    title: 'Proximal Humerus',
    labels: [
      { letter: '1', name: 'Head of Humerus', description: 'Proximal ball', function: 'Articulates with glenoid cavity' },
      { letter: '2', name: 'Anatomical Neck', description: 'Groove distal to head', function: 'Attachment for capsule' },
      { letter: '3', name: 'Deltoid Tuberosity', description: 'Lateral shaft roughness', function: 'Insertion of deltoid' },
      { letter: '4', name: 'Greater Tubercle', description: 'Lateral proximal projection', function: 'Rotator cuff attachment' }
    ]
  },
  {
    id: 'boost-humerus-dist',
    image: 'https://o.quizlet.com/rg87NhVIFkENHia11N-pdg.png',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    title: 'Distal Humerus',
    labels: [
      { letter: '1', name: 'Trochlea', description: 'Medial pulley-shaped condyle', function: 'Articulates with ulna' },
      { letter: '2', name: 'Capitulum', description: 'Lateral rounded condyle', function: 'Articulates with radius' },
      { letter: '3', name: 'Medial Epicondyle', description: 'Large medial projection', function: 'Flexor origin', clinical: 'Ulnar nerve runs behind' },
      { letter: '4', name: 'Lateral Epicondyle', description: 'Small lateral projection', function: 'Extensor origin' }
    ]
  },
  {
    id: 'boost-pelvis',
    image: 'https://o.quizlet.com/ZJ4wJNN0ukpH-ZktMP1UZw.png',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    title: 'Pelvic Bone',
    labels: [
      { letter: '1', name: 'Ilium', description: 'Superior blade-like region', function: 'Muscle attachment' },
      { letter: '2', name: 'Ischium', description: 'Posterior inferior region', function: 'Weight bearing when sitting' },
      { letter: '3', name: 'Pubis', description: 'Anterior inferior region', function: 'Forms pubic symphysis' },
      { letter: '4', name: 'Acetabulum', description: 'Hip socket', function: 'Articulates with femoral head' }
    ]
  },

  // --- JOINTS (Chapter 9) ---
  {
    id: 'boost-joints-synovial',
    image: 'https://o.quizlet.com/OKAIwD26NRAS8pXQSEYdGg.png',
    category: 'Chapter 9: Joints',
    title: 'Types of Synovial Joints',
    labels: [
      { letter: 'A', name: 'Planar Joint', description: 'Flat surfaces, gliding movement', function: 'Intercarpal joints' },
      { letter: 'B', name: 'Hinge Joint', description: 'Convex into concave, uniaxial', function: 'Elbow, Knee (modified)' },
      { letter: 'C', name: 'Pivot Joint', description: 'Rounded surface in ring, uniaxial rotation', function: 'Atlanto-axial joint' },
      { letter: 'D', name: 'Condyloid Joint', description: 'Oval projection into depression, biaxial', function: 'Wrist (Radiocarpal)' },
      { letter: 'E', name: 'Saddle Joint', description: 'Saddle-shaped surfaces, biaxial', function: 'Thumb (CMC joint)' },
      { letter: 'F', name: 'Ball-and-Socket Joint', description: 'Ball in cup, multiaxial', function: 'Shoulder, Hip' }
    ]
  },

  // --- BONE TISSUE (Chapter 6) ---
  {
    id: 'boost-fractures',
    image: 'https://o.quizlet.com/Wly9qyQfVd.JMq7sHxU0iA.png',
    category: 'Chapter 6: The Skeletal System: Bone Tissue',
    title: 'Types of Fractures',
    labels: [
      { letter: 'A', name: 'Open (Compound) Fracture', description: 'Bone protrudes through skin', clinical: 'High risk of infection' },
      { letter: 'B', name: 'Comminuted Fracture', description: 'Bone is splintered or crushed', clinical: 'Difficult to treat' },
      { letter: 'C', name: 'Greenstick Fracture', description: 'One side breaks, other bends', clinical: 'Common in children' },
      { letter: 'E', name: 'Pott\'s Fracture', description: 'Distal fibula fracture with tibial injury', clinical: 'Ankle injury' },
      { letter: 'F', name: 'Colles\' Fracture', description: 'Distal radius fracture', clinical: 'Fall on outstretched hand' }
    ]
  },

  // --- MUSCLE TISSUE ---
  {
    id: 'boost-sarcomere',
    image: 'https://o.quizlet.com/OrOJJ5ImcbrOG9kdHQHhCA.jpg',
    category: 'Chapter 10: Muscle Tissue',
    title: 'Sarcomere Structure',
    labels: [
      { letter: 'A', name: 'Z Disc', description: 'Zig-zag boundary line', function: 'Anchors thin filaments' },
      { letter: 'B', name: 'A Band', description: 'Dark band', function: 'Length of thick filaments' },
      { letter: 'C', name: 'I Band', description: 'Light band', function: 'Thin filaments only' },
      { letter: 'D', name: 'H Zone', description: 'Central light region', function: 'Thick filaments only' },
      { letter: 'E', name: 'M Line', description: 'Center line', function: 'Anchors thick filaments' }
    ]
  },
  {
    id: 'boost-muscle-fiber',
    image: 'https://o.quizlet.com/44KF4eS2z0KrIwg8RUCYvg.jpg',
    category: 'Chapter 10: Muscle Tissue',
    title: 'Muscle Fiber Anatomy',
    labels: [
      { letter: '1', name: 'Mitochondria', description: 'Organelle', function: 'ATP Production' },
      { letter: '2', name: 'Sarcolemma', description: 'Plasma membrane', function: 'Conducts AP' },
      { letter: '3', name: 'Myofibril', description: 'Contractile rod', function: 'Contraction' },
      { letter: '5', name: 'Thin Filament (Actin)', description: 'Contractile protein', function: 'Binding site for myosin' },
      { letter: '7', name: 'T-Tubule', description: 'Invagination', function: 'Carries AP deep into cell' },
      { letter: '9', name: 'Sarcoplasmic Reticulum', description: 'Smooth ER', function: 'Stores Calcium' }
    ]
  },

  // --- MUSCULAR SYSTEM (ANATOMY) ---
  {
    id: 'boost-face-muscles',
    image: 'https://o.quizlet.com/d4YbwcX-eAdgjORNH9belA.png',
    category: 'Chapter 11: The Muscular System',
    title: 'Facial Muscles',
    labels: [
      { letter: 'A', name: 'Frontalis', description: 'Forehead', function: 'Raises eyebrows' },
      { letter: 'B', name: 'Temporalis', description: 'Side of head', function: 'Elevates mandible' },
      { letter: 'D', name: 'Orbicularis Oculi', description: 'Around eye', function: 'Closes eye' },
      { letter: 'E', name: 'Zygomaticus Major', description: 'Cheek to corner of mouth', function: 'Smiling' },
      { letter: 'H', name: 'Masseter', description: 'Jaw angle', function: 'Prime mover of jaw closure' },
      { letter: 'I', name: 'Buccinator', description: 'Cheek wall', function: 'Compresses cheeks (whistling)' },
      { letter: 'K', name: 'Orbicularis Oris', description: 'Around mouth', function: 'Closes lips (kissing)' },
      { letter: 'P', name: 'Sternocleidomastoid', description: 'Neck', function: 'Rotates head' }
    ]
  },
  {
    id: 'boost-torso-muscles',
    image: 'https://o.quizlet.com/KOqQpwJtU9NthFGVDxmnIQ.png',
    category: 'Chapter 11: The Muscular System',
    title: 'Anterior Torso Muscles',
    labels: [
      { letter: 'A', name: 'Pectoralis Major', description: 'Chest', function: 'Adducts arm' },
      { letter: 'F', name: 'Deltoid', description: 'Shoulder cap', function: 'Abducts arm' },
      { letter: 'G', name: 'External Oblique', description: 'Lateral abdomen', function: 'Flexes/rotates trunk' },
      { letter: 'C', name: 'Rectus Femoris', description: 'Anterior thigh center', function: 'Extends knee' },
      { letter: 'B', name: 'Sartorius', description: 'Diagonal thigh strap', function: 'Flexes/rotates thigh' },
      { letter: 'H', name: 'Tibialis Anterior', description: 'Shin', function: 'Dorsiflexion' }
    ]
  },
  {
    id: 'boost-arm-muscles',
    image: 'https://o.quizlet.com/H6xxxhMbpYTwPLR0ttyLZw.png',
    category: 'Chapter 11: The Muscular System',
    title: 'Arm Muscles',
    labels: [
      { letter: 'A', name: 'Biceps Brachii', description: 'Anterior arm', function: 'Flexes elbow/Supinates' },
      { letter: 'B', name: 'Brachialis', description: 'Deep to biceps', function: 'Prime flexor of elbow' },
      { letter: 'C', name: 'Brachioradialis', description: 'Lateral forearm', function: 'Flexes elbow' },
      { letter: 'D', name: 'Pronator Teres', description: 'Proximal forearm', function: 'Pronates forearm' },
      { letter: 'E', name: 'Flexor Carpi Radialis', description: 'Anterior forearm', function: 'Flexes wrist' },
      { letter: 'G', name: 'Flexor Carpi Ulnaris', description: 'Medial forearm', function: 'Flexes wrist' }
    ]
  },
  {
    id: 'boost-post-body',
    image: 'https://o.quizlet.com/v.V7riqe0Rf4Fej3D5a-KA.png',
    category: 'Chapter 11: The Muscular System',
    title: 'Posterior Muscles',
    labels: [
      { letter: 'A', name: 'Trapezius', description: 'Upper back kite-shape', function: 'Extends head/Moves scapula' },
      { letter: 'B', name: 'Deltoid (Posterior)', description: 'Shoulder', function: 'Extends/Abducts arm' },
      { letter: 'D', name: 'Latissimus Dorsi', description: 'Lower back wings', function: 'Extends/Adducts arm' },
      { letter: 'E', name: 'Teres Major', description: 'Inferior scapula to humerus', function: 'Adducts arm' },
      { letter: 'F', name: 'Teres Minor', description: 'Lateral scapula border', function: 'Lateral rotation' },
      { letter: 'G', name: 'Infraspinatus', description: 'Infraspinous fossa', function: 'Lateral rotation' },
      { letter: 'H', name: 'Levator Scapulae', description: 'Neck to scapula', function: 'Elevates scapula' },
      { letter: 'I', name: 'Rhomboid Major', description: 'Between scapula and spine', function: 'Retracts scapula' }
    ]
  },
  {
    id: 'boost-leg-post',
    image: 'https://o.quizlet.com/P6.PP9VCuTsX7bKqCSmk-g.png',
    category: 'Chapter 11: The Muscular System',
    title: 'Posterior Leg Muscles',
    labels: [
      { letter: 'E', name: 'Gluteus Maximus', description: 'Buttocks', function: 'Extends thigh' },
      { letter: 'J', name: 'Gluteus Medius', description: 'Lateral hip', function: 'Abducts thigh' },
      { letter: 'K', name: 'Adductor Magnus', description: 'Medial thigh', function: 'Adducts thigh' },
      { letter: 'L', name: 'Semitendinosus', description: 'Medial hamstring', function: 'Flexes knee/Extends thigh' },
      { letter: 'M', name: 'Biceps Femoris', description: 'Lateral hamstring', function: 'Flexes knee/Extends thigh' },
      { letter: 'N', name: 'Semimembranosus', description: 'Deep medial hamstring', function: 'Flexes knee/Extends thigh' },
      { letter: 'O', name: 'Gastrocnemius', description: 'Calf', function: 'Plantar flexion' },
      { letter: 'P', name: 'Soleus', description: 'Deep to gastrocnemius', function: 'Plantar flexion' }
    ]
  },

  // --- NERVOUS SYSTEM ---
  {
    id: 'boost-neuron',
    image: 'https://o.quizlet.com/SZokOfbx0eUA30xK-eJ1Kw.png',
    category: 'Chapter 12: Nervous Tissue',
    title: 'Neuron Structure',
    labels: [
      { letter: 'A', name: 'Dendrites', description: 'Branching processes', function: 'Receive signals' },
      { letter: 'C', name: 'Cell Body (Soma)', description: 'Central region', function: 'Metabolic center' },
      { letter: 'E', name: 'Axon', description: 'Long process', function: 'Propagates Action Potential' },
      { letter: 'H', name: 'Axon Terminals', description: 'End branches', function: 'Release neurotransmitter' },
      { letter: 'D', name: 'Trigger Zone (Axon Hillock)', description: 'Junction of soma and axon', function: 'Initiates AP' }
    ]
  },
  {
    id: 'boost-spinal-cord',
    image: 'https://o.quizlet.com/Ywovo1nJHaaW4chExCFX7g.png',
    category: 'Chapter 13: Spinal Cord and Spinal Nerves',
    title: 'Spinal Cord Cross Section',
    labels: [
      { letter: 'A', name: 'Subarachnoid Space', description: 'Contains CSF', function: 'Shock absorption/Chemical circulation' },
      { letter: 'B', name: 'Posterior Root Ganglion', description: 'Swelling on posterior root', function: 'Contains sensory neuron cell bodies' },
      { letter: 'C', name: 'Anterior Root', description: 'Ventral bundle', function: 'Motor output' },
      { letter: 'D', name: 'Posterior Root', description: 'Dorsal bundle', function: 'Sensory input' },
      { letter: 'E', name: 'Spinal Nerve', description: 'Fusion of roots', function: 'Mixed sensory and motor' },
      { letter: 'F', name: 'Epidural Space', description: 'Fat-filled space', clinical: 'Site for anesthesia' },
      { letter: 'G', name: 'Posterior Ramus', description: 'Branch to back', function: 'Innervates deep back muscles' },
      { letter: 'H', name: 'Anterior Ramus', description: 'Branch to limbs/trunk', function: 'Forms plexuses' }
    ]
  },
  {
    id: 'boost-brain-sagittal',
    image: 'https://o.quizlet.com/UaMOd-osmyKUdQmPHol5Iw.jpg',
    category: 'Chapter 14: The Brain and Cranial Nerves',
    title: 'Midsagittal Brain',
    labels: [
      { letter: 'A', name: 'Cerebrum', description: 'Superior brain', function: 'Higher mental functions' },
      { letter: 'B', name: 'Corpus Callosum', description: 'White matter bridge', function: 'Connects hemispheres' },
      { letter: 'C', name: 'Thalamus', description: 'Diencephalon center', function: 'Sensory relay' },
      { letter: 'D', name: 'Hypothalamus', description: 'Below thalamus', function: 'Homeostasis control' },
      { letter: 'E', name: 'Cerebellum', description: 'Posterior brain', function: 'Balance and coordination' },
      { letter: 'F', name: 'Pons', description: 'Brainstem bulge', function: 'Relay center' },
      { letter: 'G', name: 'Medulla Oblongata', description: 'Inferior brainstem', function: 'Vital centers (heart/lung)' }
    ]
  },

  // --- SPECIAL SENSES ---
  {
    id: 'boost-eye',
    image: 'https://o.quizlet.com/U5hBro0wq2Rx89loOm5bwQ.png',
    category: 'Chapter 17: Special Senses',
    title: 'Eye Anatomy',
    labels: [
      { letter: 'A', name: 'Cornea', description: 'Clear anterior window', function: 'Refracts light' },
      { letter: 'D', name: 'Sclera', description: 'White outer layer', function: 'Protection' },
      { letter: 'E', name: 'Choroid', description: 'Vascular middle layer', function: 'Nutrients' },
      { letter: 'F', name: 'Optic Nerve', description: 'Posterior nerve', function: 'Visual transmission' },
      { letter: 'G', name: 'Lens', description: 'Clear disc', function: 'Focusing' }, 
      { letter: 'H', name: 'Ciliary Body', description: 'Muscle ring', function: 'Controls lens shape' },
      { letter: 'B', name: 'Optic Disc', description: 'Blind spot', function: 'Exit point of nerve' }
    ]
  },
  {
    id: 'boost-ear',
    image: 'https://o.quizlet.com/vtBT0CuTw7mQGEjZoHMPLg.png',
    category: 'Chapter 17: Special Senses',
    title: 'Ear Anatomy',
    labels: [
      { letter: 'A', name: 'Malleus', description: 'Auditory ossicle 1', function: 'Transmits vibration' },
      { letter: 'B', name: 'Incus', description: 'Auditory ossicle 2', function: 'Transmits vibration' },
      { letter: 'J', name: 'Stapes', description: 'Auditory ossicle 3', function: 'Transmits vibration to oval window' },
      { letter: 'K', name: 'Tympanic Membrane', description: 'Eardrum', function: 'Vibrates with sound' },
      { letter: 'G', name: 'Cochlea', description: 'Snail shell structure', function: 'Hearing receptor organ' },
      { letter: 'F', name: 'Semicircular Canals', description: 'Loops', function: 'Dynamic equilibrium' },
      { letter: 'D', name: 'Internal Auditory Canal', description: 'Bony passage', function: 'Nerve passage' }
    ]
  }
];

// --- GENERATOR LOGIC ---

const generateQuestions = (): Question[] => {
  const generatedQuestions: Question[] = [];

  diagramDatabase.forEach((diagram) => {
    // 1. Identify Questions (What is A?)
    diagram.labels.forEach((label) => {
      // Basic Identification
      const distractors = diagram.labels
        .filter(l => l.letter !== label.letter)
        .map(l => l.name)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      generatedQuestions.push({
        id: `gen-${diagram.id}-ident-${label.letter}`,
        questionText: `In the diagram of the ${diagram.title}, identify the structure labeled **${label.letter}**.`,
        answerText: label.name,
        category: diagram.category,
        questionImage: diagram.image,
        options: [label.name, ...distractors].sort(() => 0.5 - Math.random()),
        explanation: `${label.letter} indicates the ${label.name}. ${label.description}.`
      });

      // Reverse Identification
      const letterDistractors = diagram.labels
        .filter(l => l.letter !== label.letter)
        .map(l => l.letter)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      generatedQuestions.push({
        id: `gen-${diagram.id}-rev-${label.letter}`,
        questionText: `In the diagram of the ${diagram.title}, which letter indicates the **${label.name}**?`,
        answerText: label.letter,
        category: diagram.category,
        questionImage: diagram.image,
        options: [label.letter, ...letterDistractors].sort(),
        explanation: `The ${label.name} is indicated by the letter ${label.letter}.`
      });

      // Function Question (if available)
      if (label.function) {
        // Collect other functions for distractors
        const functionDistractors = diagram.labels
          .filter(l => l.letter !== label.letter && l.function)
          .map(l => l.function!)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        
        // Only add if we have enough distinct distractors
        if (functionDistractors.length >= 2) {
             generatedQuestions.push({
                id: `gen-${diagram.id}-func-${label.letter}`,
                questionText: `What is the primary function of the structure labeled **${label.letter}** in the ${diagram.title} diagram?`,
                answerText: label.function,
                category: diagram.category,
                questionImage: diagram.image,
                options: [label.function, ...functionDistractors].sort(() => 0.5 - Math.random()),
                explanation: `The ${label.name} functions to: ${label.function}.`
             });
        }
      }
      
      // Clinical Question (if available)
      if (label.clinical) {
         generatedQuestions.push({
            id: `gen-${diagram.id}-clin-${label.letter}`,
            questionText: `Clinical Application: Which structure in the diagram is associated with: ${label.clinical}?`,
            answerText: label.name,
            category: diagram.category,
            questionImage: diagram.image,
            options: [label.name, ...distractors].sort(() => 0.5 - Math.random()),
            explanation: `The ${label.name} is the relevant structure.`
         });
      }
    });
  });

  return generatedQuestions;
};

// --- PRESERVED MANUAL QUESTIONS ---
const manualQuestions: Question[] = [
  {
    id: 'boost-ch7-skull-001',
    questionText: 'Identify the bone that forms the bridge of the nose.',
    answerText: 'Nasal Bone',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    questionImage: 'https://o.quizlet.com/yJj4.8386tkSSRsvg2tSEA.png',
    options: ['Nasal Bone', 'Vomer', 'Ethmoid Bone', 'Lacrimal Bone'],
    explanation: 'The paired nasal bones meet at the midline to form the bridge of the nose.'
  },
  {
    id: 'boost-ch7-skull-002',
    questionText: 'Identify the smallest bones of the face, located in the medial wall of each orbit.',
    answerText: 'Lacrimal Bone',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    questionImage: 'https://o.quizlet.com/yJj4.8386tkSSRsvg2tSEA.png',
    options: ['Lacrimal Bone', 'Ethmoid Bone', 'Palatine Bone', 'Nasal Bone'],
    explanation: 'Lacrimal bones house the lacrimal sac which gathers tears.'
  },
  {
    id: 'boost-ch7-skull-foramen-001',
    questionText: 'Identify the foramen through which the infraorbital nerve passes, located just below the orbit.',
    answerText: 'Infraorbital Foramen',
    category: 'Chapter 7: The Skeletal System: The Axial Skeleton',
    questionImage: 'https://o.quizlet.com/yJj4.8386tkSSRsvg2tSEA.png',
    options: ['Infraorbital Foramen', 'Mental Foramen', 'Supraorbital Foramen', 'Incissive Foramen'],
    explanation: 'The infraorbital foramen is an opening in the maxillary bone.'
  },
  {
    id: 'boost-ch8-hum-001',
    questionText: 'Identify the rough surface on the lateral side of the humerus shaft where the major shoulder muscle attaches.',
    answerText: 'Deltoid Tuberosity',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    questionImage: 'https://o.quizlet.com/tuGVXzbyVQ3nbBu4aMnecA.png',
    options: ['Deltoid Tuberosity', 'Greater Tubercle', 'Lesser Tubercle', 'Radial Groove'],
    explanation: 'The deltoid tuberosity is a V-shaped area for deltoid muscle insertion.'
  },
  {
    id: 'boost-ch8-hum-002',
    questionText: 'Which structure of the humerus is a common site of fracture, located just distal to the tubercles?',
    answerText: 'Surgical Neck',
    category: 'Chapter 8: The Skeletal System: The Appendicular Skeleton',
    questionImage: 'https://o.quizlet.com/tuGVXzbyVQ3nbBu4aMnecA.png',
    options: ['Surgical Neck', 'Anatomical Neck', 'Intertubercular Sulcus', 'Shaft'],
    explanation: 'The surgical neck is called so because fractures often occur here, requiring surgery.'
  },
  {
    id: 'boost-ch11-clin-001',
    questionText: 'A patient is unable to "whistle" or keep food between their teeth while chewing. Which muscle is likely paralyzed?',
    answerText: 'Buccinator',
    category: 'Chapter 11: The Muscular System',
    questionImage: 'https://o.quizlet.com/QUgnvXJLSgDn6uLQLeYt8w.jpg',
    options: ['Buccinator', 'Masseter', 'Orbicularis Oris', 'Risorius'],
    explanation: 'The buccinator compresses the cheeks against the teeth.'
  },
  {
    id: 'boost-ch11-clin-002',
    questionText: 'During a physical exam, a patient cannot shrug their shoulders against resistance. Which cranial nerve and muscle are involved?',
    answerText: 'Accessory Nerve (XI) / Trapezius',
    category: 'Chapter 11: The Muscular System',
    questionImage: 'https://o.quizlet.com/v.V7riqe0Rf4Fej3D5a-KA.png', // FIXED BROKEN IMAGE
    options: ['Accessory Nerve (XI) / Trapezius', 'Facial Nerve (VII) / Platysma', 'Accessory Nerve (XI) / Sternocleidomastoid', 'Long Thoracic Nerve / Serratus Anterior'],
    explanation: 'The Trapezius is the primary muscle for shrugging (elevation of scapula).'
  },
  {
    id: 'boost-ch14-brain-001',
    questionText: 'A patient suffers a stroke and can understand speech but cannot physically produce words. Where is the lesion?',
    answerText: 'Broca\'s Area (Frontal Lobe)',
    category: 'Chapter 14: The Brain and Cranial Nerves',
    questionImage: 'https://o.quizlet.com/UaMOd-osmyKUdQmPHol5Iw.jpg',
    options: ['Broca\'s Area (Frontal Lobe)', 'Wernicke\'s Area (Temporal Lobe)', 'Primary Motor Cortex', 'Prefrontal Cortex'],
    explanation: 'Broca\'s area is responsible for motor speech production.'
  },
  {
    id: 'boost-ch9-knee-001',
    questionText: 'Identify the intracapsular ligament that prevents the tibia from sliding forward on the femur.',
    answerText: 'Anterior Cruciate Ligament (ACL)',
    category: 'Chapter 9: Joints',
    questionImage: 'https://o.quizlet.com/MEaKvxq09lBHujj3Wj9H.Q.png',
    options: ['Anterior Cruciate Ligament (ACL)', 'Posterior Cruciate Ligament (PCL)', 'Medial Collateral Ligament (MCL)', 'Lateral Collateral Ligament (LCL)']
  },
  {
    id: 'boost-ch9-knee-002',
    questionText: 'Identify the C-shaped fibrocartilage discs that provide shock absorption in the knee joint.',
    answerText: 'Menisci',
    category: 'Chapter 9: Joints',
    questionImage: 'https://o.quizlet.com/gLQi8rAoROgo00QPH1KOwQ.png',
    options: ['Menisci', 'Articular Cartilage', 'Fat Pads', 'Bursae'],
    explanation: 'The medial and lateral menisci deepen the tibial plateau.'
  },
  {
    id: 'boost-ch4-tiss-001',
    questionText: 'Identify the tissue shown, characterized by a single layer of cube-shaped cells with central nuclei.',
    answerText: 'Simple Cuboidal Epithelium',
    category: 'Chapter 4: The Tissue Level of Organization',
    questionImage: 'https://o.quizlet.com/OPjsLQYlUUMF2hRujZ23SQ.jpg',
    options: ['Simple Cuboidal Epithelium', 'Simple Squamous Epithelium', 'Simple Columnar Epithelium', 'Stratified Cuboidal Epithelium'],
    explanation: 'Simple cuboidal epithelium is found in kidney tubules and gland ducts.'
  },
  {
    id: 'boost-ch4-tiss-002',
    questionText: 'Identify the tissue shown, which is the most abundant type of cartilage in the body.',
    answerText: 'Hyaline Cartilage',
    category: 'Chapter 4: The Tissue Level of Organization',
    questionImage: 'https://o.quizlet.com/LnhkCUhhuiKwg.yoAIHlaA.jpg',
    options: ['Hyaline Cartilage', 'Elastic Cartilage', 'Fibrocartilage', 'Osseous Tissue']
  }
];

export const questions: Question[] = [
  ...generateQuestions(),
  ...manualQuestions
];
