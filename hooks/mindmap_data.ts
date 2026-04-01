
import { 
  Activity, Microscope, Layers, ShieldCheck, Bone, 
  Dna, Network, Brain, Eye, Stethoscope, 
  HeartPulse, Wind, Utensils, Droplet, Baby, Ear, Target,
  FlaskConical, GitBranch, Component, Move, AlertTriangle,
  Accessibility, Database, Cpu, Zap
} from 'lucide-react';

export interface TreeNode {
  id: string;
  label: string;
  description?: string;
  children?: TreeNode[];
  collapsed?: boolean;
  icon?: any;
  summary?: string;
  isMatch?: boolean;
}

export const FULL_CURRICULUM: Record<string, TreeNode> = {
  "Ch 1: Introduction": {
    id: "c1", label: "Anatomy & Physiology Foundations", icon: Activity, description: "The study of human structure and function.",
    children: [
      { id: "c1-l1", label: "Levels of Organization", children: [
          { id: "c1-p1", label: "Chemical Level", description: "Atoms (C,H,N,O) & Molecules (DNA, Glucose)." },
          { id: "c1-p2", label: "Cellular Level", description: "Basic units of life (Muscle cells, Neurons)." },
          { id: "c1-p3", label: "Tissue Level", description: "Groups of similar cells (Epithelial, Connective)." },
          { id: "c1-p4", label: "Organ Level", description: "Different tissues working together (Stomach, Heart)." },
          { id: "c1-p5", label: "System Level", description: "Functional groups (Digestive, Cardiovascular)." }
      ]},
      { id: "c1-l2", label: "Homeostatic Control", children: [
          { id: "c1-h1", label: "Negative Feedback", description: "Reverses a change to return to setpoint (Body temp, BP)." },
          { id: "c1-h2", label: "Positive Feedback", description: "Reinforces a change (Childbirth, Blood clotting)." },
          { id: "c1-h3", label: "Clinical Imbalance", description: "Diseases and disorders (Diabetes, Hypertension)." }
      ]}
    ]
  },
  "Ch 7: Axial Skeleton": {
    id: "c7", label: "Axial Skeleton Deep Dive", icon: Component,
    children: [
      { id: "c7-s1", label: "Cranial Vault", children: [
          { id: "c7-c1", label: "Frontal Bone", description: "Forehead, supraorbital margin." },
          { id: "c7-c2", label: "Temporal Bone", description: "Zygomatic process, Mastoid process, Styloid process." },
          { id: "c7-c3", label: "Sphenoid Bone", description: "Sella turcica (pituitary seat), Keystone of skull." },
          { id: "c7-c4", label: "Ethmoid Bone", description: "Cribriform plate (olfactory), Crista galli." }
      ]},
      { id: "c7-s2", label: "Vertebral Column", children: [
          { id: "c7-v1", label: "Cervical (C1-C7)", description: "Atlas (No body), Axis (Dens)." },
          { id: "c7-v2", label: "Thoracic (T1-T12)", description: "Articulate with ribs, heart-shaped bodies." },
          { id: "c7-v3", label: "Lumbar (L1-L5)", description: "Largest bodies, weight-bearing." },
          { id: "c7-v4", label: "Sacrum & Coccyx", description: "Fused vertebrae for pelvic stability." }
      ]}
    ]
  },
  "Ch 11: Muscular System": {
    id: "c11", label: "Systemic Myology", icon: Accessibility,
    children: [
      { id: "c11-m1", label: "Head & Neck", children: [
          { id: "c11-f1", label: "Facial Expression", description: "Orbicularis oculi, Zygomaticus, Buccinator." },
          { id: "c11-f2", label: "Mastication", description: "Masseter, Temporalis, Pterygoids." },
          { id: "c11-f3", label: "Neck Flexors", description: "Sternocleidomastoid, Scalenes." }
      ]},
      { id: "c11-m2", label: "Upper Limb", children: [
          { id: "c11-u1", label: "Shoulder Girdle", description: "Trapezius, Serratus anterior, Rhomboids." },
          { id: "c11-u2", label: "Arm (Humerus)", description: "Deltoid, Pectoralis major, Latissimus dorsi." },
          { id: "c11-u3", label: "Forearm", description: "Biceps brachii (Flexion), Triceps (Extension)." }
      ]},
      { id: "c11-m3", label: "Lower Limb", children: [
          { id: "c11-l1", label: "Hip/Thigh", description: "Gluteals, Quadriceps, Hamstrings, Adductors." },
          { id: "c11-l2", label: "Leg/Foot", description: "Gastrocnemius, Soleus, Tibialis anterior." }
      ]}
    ]
  },
  "Ch 14: The Brain": {
    id: "c14", label: "Neuroanatomy", icon: Brain,
    children: [
      { id: "c14-b1", label: "Cerebrum", children: [
          { id: "c14-p1", label: "Frontal Lobe", description: "Motor control, Personality, Broca's area." },
          { id: "c14-p2", label: "Parietal Lobe", description: "Somatosensory, Spatial awareness." },
          { id: "c14-p3", label: "Temporal Lobe", description: "Hearing, Memory, Wernicke's area." },
          { id: "c14-p4", label: "Occipital Lobe", description: "Visual processing." }
      ]},
      { id: "c14-b2", label: "Brainstem & Diencephalon", children: [
          { id: "c14-d1", label: "Thalamus", description: "Sensory relay station." },
          { id: "c14-d2", label: "Hypothalamus", description: "Homeostasis boss (Temp, Hunger, Hormones)." },
          { id: "c14-d3", label: "Medulla Oblongata", description: "Vital centers (Heart, Breathing)." }
      ]}
    ]
  }
};

// Fill others...
["Ch 2: Chemistry", "Ch 3: The Cell", "Ch 4: Tissues", "Ch 5: Integumentary", "Ch 6: Bone Tissue", "Ch 8: Appendicular", "Ch 9: Joints", "Ch 10: Muscle Tissue", "Ch 12: Nervous System", "Ch 13: Spinal Cord", "Ch 15: The Eye", "Ch 16: Sensation", "Ch 17: Special Senses"].forEach(ch => {
    if(!FULL_CURRICULUM[ch]) {
        FULL_CURRICULUM[ch] = { id: ch.toLowerCase(), label: ch, icon: Database, description: "Comprehensive clinical study module.", children: [{id: ch+"-1", label: "Advanced Concepts", description: "Click for details."}] };
    }
});
