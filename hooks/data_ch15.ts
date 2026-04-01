import { Question } from '../types';

export const questions: Question[] = [
  {
    id: 'ch15-001',
    questionText: 'Which branch of the nervous system is under voluntary control?',
    answerText: 'Somatic nervous system',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Somatic nervous system',
      'Autonomic nervous system',
      'Enteric nervous system',
      'Central nervous system'
    ],
    explanation: 'The somatic nervous system controls voluntary movements of skeletal muscles, whereas the autonomic nervous system regulates involuntary visceral functions.'
  },
  {
    id: 'ch15-002',
    questionText: 'What is the main function of the autonomic nervous system (ANS)?',
    answerText: 'Maintains homeostasis by regulating involuntary processes',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Maintains homeostasis by regulating involuntary processes',
      'Controls voluntary skeletal muscle movements',
      'Processes conscious sensory information',
      'Regulates higher cognitive functions and memory'
    ],
    explanation: 'The ANS maintains internal homeostasis by automatically increasing or decreasing the activity of cardiac muscle, smooth muscle, and glands.'
  },
  {
    id: 'ch15-003',
    questionText: 'How many motor neurons are required for the autonomic nervous system to relay information from the CNS to the effector?',
    answerText: 'Two (preganglionic and postganglionic)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Two (preganglionic and postganglionic)',
      'One (direct from CNS to effector)',
      'Three (upper, middle, and lower motor neurons)',
      'None (relies entirely on hormones)'
    ],
    explanation: 'Unlike the somatic system which uses a single motor neuron, the ANS uses a two-neuron chain: a preganglionic neuron from the CNS synapses with a postganglionic neuron in an autonomic ganglion.'
  },
  {
    id: 'ch15-004',
    questionText: 'What is an interoceptor?',
    answerText: 'A sensory receptor in blood vessels and visceral organs that monitors the internal environment',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'A sensory receptor in blood vessels and visceral organs that monitors the internal environment',
      'A motor neuron that innervates skeletal muscle',
      'A receptor in the skin that detects external temperature',
      'A ganglion located entirely within the central nervous system'
    ],
    explanation: 'Interoceptors (like chemoreceptors and stretch receptors) monitor the body\'s internal environment and send signals to the ANS.'
  },
  {
    id: 'ch15-005',
    questionText: 'Which division of the autonomic nervous system is responsible for "fight or flight" responses?',
    answerText: 'Sympathetic division',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sympathetic division',
      'Parasympathetic division',
      'Somatic division',
      'Enteric division'
    ],
    explanation: 'The sympathetic division prepares the body for stressful or emergency situations, increasing heart rate, dilating airways, and mobilizing energy.'
  },
  {
    id: 'ch15-006',
    questionText: 'Which division of the autonomic nervous system is responsible for "rest and digest" responses?',
    answerText: 'Parasympathetic division',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Parasympathetic division',
      'Sympathetic division',
      'Somatic division',
      'Central division'
    ],
    explanation: 'The parasympathetic division conserves energy and replenishes nutrient stores when the body is relaxed, promoting digestion and slowing the heart rate.'
  },
  {
    id: 'ch15-007',
    questionText: 'What does dual innervation of ANS effectors mean?',
    answerText: 'Effectors receive inputs from both the sympathetic and parasympathetic divisions',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Effectors receive inputs from both the sympathetic and parasympathetic divisions',
      'Effectors are controlled by both the central and peripheral nervous systems',
      'Effectors receive both sensory and motor innervation from the same nerve',
      'Effectors are innervated by two different somatic motor neurons'
    ],
    explanation: 'Most visceral organs are innervated by both divisions of the ANS, which typically exert antagonistic (opposite) effects to finely tune organ activity.'
  },
  {
    id: 'ch15-008',
    questionText: 'Which division of the ANS is characterized by short preganglionic axons and long postganglionic axons?',
    answerText: 'Sympathetic division',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sympathetic division',
      'Parasympathetic division',
      'Somatic nervous system',
      'Enteric nervous system'
    ],
    explanation: 'In the sympathetic division, ganglia are located close to the spinal cord, resulting in short preganglionic fibers and long postganglionic fibers reaching the effectors.'
  },
  {
    id: 'ch15-009',
    questionText: 'Which division of the ANS is characterized by long preganglionic axons and short postganglionic axons?',
    answerText: 'Parasympathetic division',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Parasympathetic division',
      'Sympathetic division',
      'Somatic nervous system',
      'Central nervous system'
    ],
    explanation: 'Parasympathetic ganglia (terminal ganglia) are located near or within the target organs, meaning the preganglionic fibers are very long and postganglionic fibers are short.'
  },
  {
    id: 'ch15-010',
    questionText: 'From where in the central nervous system do the preganglionic neurons of the sympathetic division arise?',
    answerText: 'Thoracic and lumbar regions of the spinal cord (T1-L2/L3)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Thoracic and lumbar regions of the spinal cord (T1-L2/L3)',
      'Brainstem and sacral region of the spinal cord',
      'Cervical and thoracic regions of the spinal cord',
      'Only the cerebral cortex and hypothalamus'
    ],
    explanation: 'Because its preganglionic neurons originate from the lateral horns of the thoracic and upper lumbar spinal cord, the sympathetic division is also called the thoracolumbar division.'
  },
  {
    id: 'ch15-011',
    questionText: 'From where in the central nervous system do the preganglionic neurons of the parasympathetic division arise?',
    answerText: 'Brainstem and sacral region of the spinal cord (S2-S4)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Brainstem and sacral region of the spinal cord (S2-S4)',
      'Thoracic and lumbar regions of the spinal cord',
      'Cervical and thoracic regions of the spinal cord',
      'Dorsal root ganglia of all spinal nerves'
    ],
    explanation: 'Because its preganglionic neurons originate in the brainstem (cranial nerves III, VII, IX, X) and the sacral spinal cord, the parasympathetic division is also called the craniosacral division.'
  },
  {
    id: 'ch15-012',
    questionText: 'Where are the sympathetic trunk ganglia located?',
    answerText: 'Parallel to the spinal cord, on the left and right sides',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Parallel to the spinal cord, on the left and right sides',
      'Within or very close to the effector organs',
      'In the dorsal root of the spinal nerves',
      'Inside the brainstem'
    ],
    explanation: 'Sympathetic trunk (chain) ganglia lie in a vertical row on either side of the vertebral column, allowing sympathetic signals to quickly reach widespread areas of the body.'
  },
  {
    id: 'ch15-013',
    questionText: 'What are prevertebral (collateral) ganglia?',
    answerText: 'Sympathetic ganglia located anterior to the vertebral column in the abdominopelvic cavity',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sympathetic ganglia located anterior to the vertebral column in the abdominopelvic cavity',
      'Parasympathetic ganglia located within the walls of target organs',
      'Sensory ganglia located in the dorsal roots of spinal nerves',
      'Motor ganglia located in the brainstem'
    ],
    explanation: 'Prevertebral ganglia (like the celiac and mesenteric ganglia) are unpaired sympathetic ganglia that primarily innervate organs below the diaphragm.'
  },
  {
    id: 'ch15-014',
    questionText: 'What are terminal ganglia and where are they located?',
    answerText: 'Parasympathetic ganglia located near or within effector organs',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Parasympathetic ganglia located near or within effector organs',
      'Sympathetic ganglia located parallel to the spinal cord',
      'Sensory ganglia located in the dorsal root',
      'Motor ganglia located in the ventral horn'
    ],
    explanation: 'Parasympathetic preganglionic axons are long and travel almost all the way to the target organ before synapsing in terminal (intramural) ganglia.'
  },
  {
    id: 'ch15-015',
    questionText: 'What is the role of the white rami communicantes?',
    answerText: 'They carry preganglionic sympathetic axons from the ventral root to the sympathetic trunk ganglion.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'They carry preganglionic sympathetic axons from the ventral root to the sympathetic trunk ganglion.',
      'They carry postganglionic sympathetic axons from the trunk to peripheral structures.',
      'They carry parasympathetic fibers to the terminal ganglia.',
      'They carry somatic motor fibers to skeletal muscles.'
    ],
    explanation: 'White rami communicantes contain myelinated preganglionic sympathetic fibers entering the sympathetic trunk.'
  },
  {
    id: 'ch15-016',
    questionText: 'What is the role of the gray rami communicantes?',
    answerText: 'They carry postganglionic sympathetic axons from the sympathetic trunk to the spinal nerves.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'They carry postganglionic sympathetic axons from the sympathetic trunk to the spinal nerves.',
      'They carry preganglionic sympathetic axons from the spinal cord to the sympathetic trunk.',
      'They carry parasympathetic outflow from the spinal cord.',
      'They contain somatic motor fibers traveling to skeletal muscles.'
    ],
    explanation: 'Gray rami communicantes contain unmyelinated postganglionic sympathetic fibers that rejoin spinal nerves to be distributed to target organs like sweat glands and blood vessels in the skin.'
  },
  {
    id: 'ch15-017',
    questionText: 'What neurotransmitter is always secreted by the preganglionic motor neurons of BOTH the sympathetic and parasympathetic divisions?',
    answerText: 'Acetylcholine (ACh)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Acetylcholine (ACh)',
      'Norepinephrine (NE)',
      'Epinephrine',
      'Dopamine'
    ],
    explanation: 'All preganglionic neurons in the ANS are cholinergic, meaning they release acetylcholine to excite the postganglionic neurons.'
  },
  {
    id: 'ch15-018',
    questionText: 'What neurotransmitter is released by ALL parasympathetic postganglionic neurons?',
    answerText: 'Acetylcholine (ACh)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Acetylcholine (ACh)',
      'Norepinephrine (NE)',
      'Epinephrine',
      'Serotonin'
    ],
    explanation: 'Parasympathetic postganglionic neurons are cholinergic and release ACh to bind to muscarinic receptors on the target effectors.'
  },
  {
    id: 'ch15-019',
    questionText: 'What neurotransmitter is released by MOST sympathetic postganglionic neurons?',
    answerText: 'Norepinephrine (NE)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Norepinephrine (NE)',
      'Acetylcholine (ACh)',
      'Dopamine',
      'Glutamate'
    ],
    explanation: 'Most sympathetic postganglionic neurons are adrenergic and release norepinephrine. A notable exception is the sympathetic innervation of sweat glands, which uses ACh.'
  },
  {
    id: 'ch15-020',
    questionText: 'Which sympathetic postganglionic neurons release acetylcholine instead of norepinephrine?',
    answerText: 'Those that innervate sweat glands',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Those that innervate sweat glands',
      'Those that innervate the heart',
      'Those that innervate smooth muscle in blood vessels',
      'Those that innervate the adrenal medulla'
    ],
    explanation: 'While most sympathetic postganglionic neurons are adrenergic, the ones innervating sweat glands are cholinergic and release ACh.'
  },
  {
    id: 'ch15-021',
    questionText: 'What are cholinergic neurons?',
    answerText: 'Neurons that release acetylcholine (ACh) from their synaptic terminals',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Neurons that release acetylcholine (ACh) from their synaptic terminals',
      'Neurons that release norepinephrine from their synaptic terminals',
      'Neurons that only exist in the central nervous system',
      'Neurons that respond exclusively to adrenaline'
    ],
    explanation: 'Cholinergic neurons synthesize and release acetylcholine. This includes all preganglionic neurons and all parasympathetic postganglionic neurons.'
  },
  {
    id: 'ch15-022',
    questionText: 'What are adrenergic neurons?',
    answerText: 'Neurons that release norepinephrine (NE) from their synaptic terminals',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Neurons that release norepinephrine (NE) from their synaptic terminals',
      'Neurons that release acetylcholine (ACh) from their synaptic terminals',
      'Neurons that are found exclusively in the parasympathetic division',
      'Neurons that inhibit the adrenal medulla'
    ],
    explanation: 'Adrenergic neurons release norepinephrine. Most sympathetic postganglionic neurons fall into this category.'
  },
  {
    id: 'ch15-023',
    questionText: 'What are the two kinds of cholinergic receptors (receptors that bind acetylcholine)?',
    answerText: 'Nicotinic and muscarinic',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Nicotinic and muscarinic',
      'Alpha and beta',
      'Adrenergic and dopaminergic',
      'Somatic and visceral'
    ],
    explanation: 'Cholinergic receptors are divided into nicotinic (always excitatory) and muscarinic (can be excitatory or inhibitory) based on the toxins that can also bind to them.'
  },
  {
    id: 'ch15-024',
    questionText: 'What effect does the binding of acetylcholine have on cells containing nicotinic receptors?',
    answerText: 'Always excitatory (depolarization)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Always excitatory (depolarization)',
      'Always inhibitory (hyperpolarization)',
      'Either excitatory or inhibitory depending on the target cell',
      'No effect unless norepinephrine is also present'
    ],
    explanation: 'Nicotinic receptors are ligand-gated ion channels. When ACh binds to them, they open to allow sodium ions to enter, always resulting in depolarization and excitation.'
  },
  {
    id: 'ch15-025',
    questionText: 'Where are nicotinic receptors found?',
    answerText: 'On the dendrites and cell bodies of all postganglionic neurons and at the neuromuscular junction',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'On the dendrites and cell bodies of all postganglionic neurons and at the neuromuscular junction',
      'Only on the effector organs of the parasympathetic nervous system',
      'Exclusively within the brainstem and hypothalamus',
      'On the smooth muscle of blood vessels'
    ],
    explanation: 'Nicotinic receptors are located on all autonomic ganglionic cells (both sympathetic and parasympathetic) and on skeletal muscle cells.'
  },
  {
    id: 'ch15-026',
    questionText: 'What are the main types of adrenergic receptors (receptors that bind norepinephrine and epinephrine)?',
    answerText: 'Alpha and Beta',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Alpha and Beta',
      'Nicotinic and muscarinic',
      'Cholinergic and somatic',
      'Primary and secondary'
    ],
    explanation: 'Adrenergic receptors are classified into alpha (α1, α2) and beta (β1, β2, β3) subtypes, which mediate the various effects of the sympathetic nervous system.'
  },
  {
    id: 'ch15-027',
    questionText: 'How is acetylcholine (ACh) removed from the synaptic cleft?',
    answerText: 'It is broken down by the enzyme acetylcholinesterase (AChE)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'It is broken down by the enzyme acetylcholinesterase (AChE)',
      'It is reabsorbed intact by the presynaptic neuron',
      'It is degraded by monoamine oxidase (MAO)',
      'It diffuses into the bloodstream to be filtered by the kidneys'
    ],
    explanation: 'Acetylcholinesterase rapidly breaks down ACh in the synaptic cleft, ensuring that its effects are brief and localized.'
  },
  {
    id: 'ch15-028',
    questionText: 'How is norepinephrine (NE) eliminated from synapses?',
    answerText: 'It is broken down by monoamine oxidase (MAO) or catechol-O-methyltransferase (COMT)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'It is broken down by monoamine oxidase (MAO) or catechol-O-methyltransferase (COMT)',
      'It is degraded by acetylcholinesterase (AChE)',
      'It is permanently bound to the postsynaptic receptor',
      'It is exhaled through the lungs'
    ],
    explanation: 'NE is either taken back up into the presynaptic neuron or broken down by enzymes like MAO and COMT. This process is slower than ACh degradation, prolonging sympathetic effects.'
  },
  {
    id: 'ch15-029',
    questionText: 'Why are the effects of the sympathetic division generally more widespread and longer-lasting than the parasympathetic division?',
    answerText: 'Sympathetic axons diverge extensively, and norepinephrine degrades more slowly than acetylcholine.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sympathetic axons diverge extensively, and norepinephrine degrades more slowly than acetylcholine.',
      'Sympathetic preganglionic neurons are longer and myelinated.',
      'The parasympathetic division only innervates the head and neck.',
      'Acetylcholine is released directly into the bloodstream.'
    ],
    explanation: 'Sympathetic preganglionic fibers branch extensively to synapse with many postganglionic neurons. Additionally, the release of epinephrine/norepinephrine into the blood by the adrenal medulla prolongs the effects.'
  },
  {
    id: 'ch15-030',
    questionText: 'Over 90% of all preganglionic parasympathetic fibers are found in which cranial nerve?',
    answerText: 'Vagus nerve (CN X)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Vagus nerve (CN X)',
      'Oculomotor nerve (CN III)',
      'Facial nerve (CN VII)',
      'Glossopharyngeal nerve (CN IX)'
    ],
    explanation: 'The vagus nerve (CN X) provides extensive parasympathetic innervation to the organs of the thorax and most of the abdomen.'
  },
  {
    id: 'ch15-031',
    questionText: 'Which cranial nerve carries parasympathetic innervation to control the production of tears, nasal secretions, and saliva?',
    answerText: 'Facial nerve (CN VII)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Facial nerve (CN VII)',
      'Oculomotor nerve (CN III)',
      'Glossopharyngeal nerve (CN IX)',
      'Vagus nerve (CN X)'
    ],
    explanation: 'The facial nerve (CN VII) carries parasympathetic fibers to the lacrimal (tear) glands, nasal glands, and the submandibular and sublingual salivary glands.'
  },
  {
    id: 'ch15-032',
    questionText: 'Which statement is true concerning the innervation of the adrenal medulla?',
    answerText: 'Preganglionic sympathetic axons terminate in the adrenal medulla and stimulate the release of epinephrine and norepinephrine.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Preganglionic sympathetic axons terminate in the adrenal medulla and stimulate the release of epinephrine and norepinephrine.',
      'Postganglionic parasympathetic neurons synapse with cells of the adrenal medulla.',
      'The adrenal medulla is innervated by somatic motor neurons.',
      'The adrenal medulla only receives sensory innervation.'
    ],
    explanation: 'The adrenal medulla acts as a modified sympathetic ganglion. Preganglionic sympathetic fibers stimulate its chromaffin cells to release hormones (epinephrine and norepinephrine) directly into the blood.'
  },
  {
    id: 'ch15-033',
    questionText: 'What does the adrenal medulla secrete when stimulated by the sympathetic nervous system?',
    answerText: 'Epinephrine and Norepinephrine',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Epinephrine and Norepinephrine',
      'Acetylcholine and Dopamine',
      'Cortisol and Aldosterone',
      'Serotonin and Melatonin'
    ],
    explanation: 'The chromaffin cells of the adrenal medulla secrete large amounts of epinephrine (adrenaline) and norepinephrine into the bloodstream, amplifying the fight-or-flight response.'
  },
  {
    id: 'ch15-034',
    questionText: 'Which of these structures are innervated ONLY by the sympathetic nervous system (no parasympathetic innervation)?',
    answerText: 'Sweat glands, arrector pili muscles, and most blood vessels',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sweat glands, arrector pili muscles, and most blood vessels',
      'Heart, lungs, and digestive tract',
      'Salivary glands and pupils',
      'Urinary bladder and reproductive organs'
    ],
    explanation: 'While most organs have dual innervation, sweat glands, the arrector pili muscles of the skin, and the smooth muscle of most blood vessels receive only sympathetic innervation.'
  },
  {
    id: 'ch15-035',
    questionText: 'What is the effect of sympathetic stimulation on the pupils of the eyes?',
    answerText: 'Dilation',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Dilation',
      'Constriction',
      'No effect',
      'Rapid oscillation'
    ],
    explanation: 'Sympathetic stimulation causes the radial muscles of the iris to contract, dilating the pupils to allow more light in for better distance vision during emergencies.'
  },
  {
    id: 'ch15-036',
    questionText: 'What is the effect of parasympathetic stimulation on the heart?',
    answerText: 'Decreased heart rate',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Decreased heart rate',
      'Increased heart rate and force of contraction',
      'Vasodilation of coronary arteries',
      'No effect'
    ],
    explanation: 'The parasympathetic division (via the vagus nerve) releases ACh onto the heart\'s pacemaker cells, slowing the heart rate during rest.'
  },
  {
    id: 'ch15-037',
    questionText: 'What is the effect of sympathetic stimulation on the respiratory bronchioles in the lungs?',
    answerText: 'Dilation (bronchodilation)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Dilation (bronchodilation)',
      'Constriction (bronchoconstriction)',
      'Increased mucus secretion',
      'No effect'
    ],
    explanation: 'Sympathetic stimulation relaxes the smooth muscle of the airways, dilating them to increase airflow and oxygen intake during fight-or-flight situations.'
  },
  {
    id: 'ch15-038',
    questionText: 'What is the effect of parasympathetic stimulation on the digestive system?',
    answerText: 'Increased peristalsis and glandular secretions',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Increased peristalsis and glandular secretions',
      'Decreased motility and inhibition of secretions',
      'Constriction of blood vessels supplying the GI tract',
      'Relaxation of the gallbladder'
    ],
    explanation: 'The parasympathetic division promotes "rest and digest" functions, actively stimulating digestion, motility, and the release of digestive enzymes.'
  },
  {
    id: 'ch15-039',
    questionText: 'In the CNS, which structure is considered the overall integrating and command center of the autonomic nervous system?',
    answerText: 'Hypothalamus',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Hypothalamus',
      'Thalamus',
      'Cerebellum',
      'Medulla oblongata'
    ],
    explanation: 'The hypothalamus acts as the main control center for the ANS, regulating temperature, hunger, thirst, and coordinating autonomic responses to emotions.'
  },
  {
    id: 'ch15-040',
    questionText: 'What is autonomic tone?',
    answerText: 'The continual, baseline activity of both the sympathetic and parasympathetic divisions',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'The continual, baseline activity of both the sympathetic and parasympathetic divisions',
      'The sound produced by vibrating visceral organs',
      'The maximum level of sympathetic activation possible',
      'The complete shutdown of the parasympathetic system during stress'
    ],
    explanation: 'Autonomic tone refers to the balance of baseline activity from both divisions, allowing the ANS to increase or decrease activity in target organs as needed.'
  },
  {
    id: 'ch15-041',
    questionText: 'While most organs express antagonistic effects from dual innervation, what is the best example of a cooperative autonomic effect?',
    answerText: 'Sexual function of the male reproductive system (erection and ejaculation)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sexual function of the male reproductive system (erection and ejaculation)',
      'Control of heart rate',
      'Regulation of pupil diameter',
      'Control of digestive peristalsis'
    ],
    explanation: 'In sexual function, the parasympathetic division controls erection (vasodilation), while the sympathetic division controls ejaculation. They work cooperatively rather than antagonistically.'
  },
  {
    id: 'ch15-042',
    questionText: 'What is neuronal convergence in the autonomic nervous system?',
    answerText: 'Axons from many preganglionic cells synapsing on a single ganglionic cell',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Axons from many preganglionic cells synapsing on a single ganglionic cell',
      'One preganglionic axon branching to synapse with many postganglionic cells',
      'The merging of sympathetic and parasympathetic nerves into a single plexus',
      'The crossing of motor fibers in the medulla oblongata'
    ],
    explanation: 'Neuronal convergence occurs when multiple preganglionic neurons synapse on one postganglionic neuron, allowing for integrated control.'
  },
  {
    id: 'ch15-043',
    questionText: 'Which region of the spinal cord does NOT contain any autonomic preganglionic neurons?',
    answerText: 'Cervical',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Cervical',
      'Thoracic',
      'Lumbar',
      'Sacral'
    ],
    explanation: 'Sympathetic preganglionic neurons are in the thoracic and lumbar regions, and parasympathetic are in the brainstem and sacral regions. The cervical spinal cord lacks autonomic preganglionic cell bodies.'
  },
  {
    id: 'ch15-044',
    questionText: 'What is the enteric nervous system?',
    answerText: 'A specialized network of nerves that functions entirely within the wall of the digestive tube',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'A specialized network of nerves that functions entirely within the wall of the digestive tube',
      'The division of the ANS that controls the heart',
      'A somatic nerve plexus in the lower limbs',
      'The sensory pathway for olfactory information'
    ],
    explanation: 'The enteric nervous system is often considered a third division of the ANS. It contains both motor and sensory neurons and can operate independently to control GI tract motility and secretions.'
  },
  {
    id: 'ch15-045',
    questionText: 'What is referred pain?',
    answerText: 'Visceral pain that is perceived as somatic in origin (e.g., feeling a heart attack in the left arm)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Visceral pain that is perceived as somatic in origin (e.g., feeling a heart attack in the left arm)',
      'Pain that travels from the skin to the internal organs',
      'A type of phantom limb pain',
      'Pain caused exclusively by sympathetic overstimulation'
    ],
    explanation: 'Referred pain occurs because visceral sensory neurons and somatic sensory neurons often converge on the same ascending pathways in the spinal cord, confusing the brain about the true source of the pain.'
  },
  {
    id: 'ch15-046',
    questionText: 'What influence does the cerebral cortex have on the autonomic nervous system?',
    answerText: 'It can trigger voluntary sympathetic activation via the amygdala when recalling a stressful event.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'It can trigger voluntary sympathetic activation via the amygdala when recalling a stressful event.',
      'It directly innervates all visceral organs, bypassing the hypothalamus.',
      'It has absolutely no influence on autonomic functions.',
      'It exclusively controls the parasympathetic division during sleep.'
    ],
    explanation: 'While the ANS is involuntary, higher brain centers like the cerebral cortex and limbic system (amygdala) can influence the hypothalamus to trigger autonomic responses based on emotions or memories.'
  },
  {
    id: 'ch15-047',
    questionText: 'Which neurotransmitters are classified as catecholamines?',
    answerText: 'Dopamine, Norepinephrine, and Epinephrine',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Dopamine, Norepinephrine, and Epinephrine',
      'Acetylcholine, Serotonin, and Histamine',
      'GABA, Glutamate, and Glycine',
      'Endorphins, Enkephalins, and Substance P'
    ],
    explanation: 'Catecholamines are a class of monoamine neurotransmitters derived from the amino acid tyrosine. They play a major role in the sympathetic nervous system.'
  },
  {
    id: 'ch15-048',
    questionText: 'The micturition autonomic reflex is associated with the control of which organ?',
    answerText: 'Urinary bladder',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Urinary bladder',
      'Gallbladder',
      'Stomach',
      'Heart'
    ],
    explanation: 'The micturition reflex controls urination. Parasympathetic stimulation causes contraction of the bladder wall and relaxation of the internal sphincter to promote voiding.'
  },
  {
    id: 'ch15-049',
    questionText: 'What do general visceral sensory neurons monitor?',
    answerText: 'Stretch, temperature, chemical changes, and irritation in internal organs',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Stretch, temperature, chemical changes, and irritation in internal organs',
      'Light, sound, and balance',
      'Conscious touch, pressure, and vibration on the skin',
      'Skeletal muscle tension and joint position'
    ],
    explanation: 'Visceral sensory neurons gather information from interoceptors about the internal state of the body, which is crucial for autonomic reflexes.'
  },
  {
    id: 'ch15-050',
    questionText: 'Where are the cell bodies of visceral sensory neurons located?',
    category: 'Chapter 15: The Autonomic Nervous System',
    answerText: 'Dorsal root ganglia',
    options: [
      'Dorsal root ganglia',
      'Ventral horn of the spinal cord',
      'Sympathetic trunk ganglia',
      'Prevertebral ganglia'
    ],
    explanation: 'Like somatic sensory neurons, the cell bodies of visceral sensory neurons are located in the dorsal root ganglia of spinal nerves.'
  },
  {
    id: 'ch15-051',
    questionText: 'Where are the cell bodies of somatic motor neurons located?',
    answerText: 'Ventral horn of the spinal cord',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Ventral horn of the spinal cord',
      'Dorsal root ganglia',
      'Sympathetic trunk',
      'Lateral horn of the spinal cord'
    ],
    explanation: 'Somatic motor neurons, which control voluntary skeletal muscles, have their cell bodies located in the ventral (anterior) horn of the spinal cord gray matter.'
  },
  {
    id: 'ch15-052',
    questionText: 'Where do sympathetic preganglionic fibers synapse?',
    answerText: 'Sympathetic trunk and collateral ganglia',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sympathetic trunk and collateral ganglia',
      'Body wall of the target organ',
      'Dorsal root ganglia',
      'In the thoracic and lumbar regions of the spinal cord'
    ],
    explanation: 'Sympathetic preganglionic fibers leave the spinal cord and synapse with postganglionic neurons either in the sympathetic trunk (chain) ganglia or in collateral (prevertebral) ganglia.'
  },
  {
    id: 'ch15-053',
    questionText: 'Which characteristic best describes the parasympathetic division?',
    answerText: 'Localized effects on specific organs and short postganglionic axons near the organ of innervation',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Localized effects on specific organs and short postganglionic axons near the organ of innervation',
      'Widespread effects on specific organs and short postganglionic axons near the organ of innervation',
      'Widespread effects on specific organs and long postganglionic axons',
      'Release of norepinephrine from the postganglionic axons'
    ],
    explanation: 'The parasympathetic division has long preganglionic and short postganglionic fibers, leading to highly localized and specific effects on target organs.'
  },
  {
    id: 'ch15-054',
    questionText: 'How does the general visceral motor system (ANS) differ from the general somatic motor system?',
    answerText: 'Motor units in the ANS include a chain of two motor neurons.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Motor units in the ANS include a chain of two motor neurons.',
      'The conduction of impulses through the ANS is quicker than through the somatic motor system.',
      'ANS motor axons are more thickly myelinated than somatic motor axons.',
      'The dorsal root ganglia contain cell bodies of motor neurons.'
    ],
    explanation: 'The somatic motor system uses a single, heavily myelinated neuron to reach the effector, whereas the ANS uses a two-neuron chain (preganglionic and postganglionic) that is lightly or unmyelinated.'
  },
  {
    id: 'ch15-055',
    questionText: 'Which of these statements accurately describes a similarity between the sympathetic and parasympathetic divisions?',
    answerText: 'They innervate many of the same visceral organs.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'They innervate many of the same visceral organs.',
      'Both divisions include cranial nerves to transmit impulses to the head and neck.',
      'Both divisions provide rapid systemic responses to dangerous stimuli.',
      'They innervate different organs but induce similar effects.'
    ],
    explanation: 'Most visceral organs receive dual innervation, meaning they are innervated by both the sympathetic and parasympathetic divisions, usually with antagonistic effects.'
  },
  {
    id: 'ch15-056',
    questionText: 'The cell body of which autonomic neuron lies entirely outside the central nervous system (CNS)?',
    answerText: 'Postganglionic neuron',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Postganglionic neuron',
      'Preganglionic neuron',
      'Somatic motor neuron',
      'Interneuron'
    ],
    explanation: 'The cell body of a postganglionic neuron is located in an autonomic ganglion outside the CNS, and its axon extends to the effector organ.'
  },
  {
    id: 'ch15-057',
    questionText: 'The cell body of which autonomic neuron lies within the central nervous system (CNS)?',
    answerText: 'Preganglionic neuron',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Preganglionic neuron',
      'Postganglionic neuron',
      'Afferent sensory neuron',
      'Ganglionic neuron'
    ],
    explanation: 'The preganglionic neuron has its cell body in the brainstem or spinal cord (CNS), and its axon projects to an autonomic ganglion.'
  },
  {
    id: 'ch15-058',
    questionText: 'Which division is dominant during exercise, excitement, or emergencies?',
    answerText: 'Sympathetic division',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Sympathetic division',
      'Parasympathetic division',
      'Enteric nervous system',
      'Somatic nervous system'
    ],
    explanation: 'The sympathetic division is responsible for the "fight or flight" response, activating during periods of stress, exercise, or emergency.'
  },
  {
    id: 'ch15-059',
    questionText: 'Which of the following is NOT innervated by the autonomic nervous system?',
    answerText: 'Skeletal muscle',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Skeletal muscle',
      'Smooth muscle',
      'Cardiac muscle',
      'Glands'
    ],
    explanation: 'Skeletal muscles are innervated by the somatic nervous system, which controls voluntary movements. The ANS innervates smooth muscle, cardiac muscle, and glands.'
  },
  {
    id: 'ch15-060',
    questionText: 'What is another name for the autonomic nervous system?',
    answerText: 'General visceral motor system',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'General visceral motor system',
      'General somatic motor system',
      'Branchial motor system',
      'General peripheral nervous system'
    ],
    explanation: 'Because it controls the motor functions of the visceral organs (internal organs), the ANS is also referred to as the general visceral motor system.'
  },
  {
    id: 'ch15-061',
    questionText: 'Which of these descriptions is NOT a result of parasympathetic stimulation?',
    answerText: 'Production of goose bumps',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Production of goose bumps',
      'Increased peristalsis of the digestive viscera',
      'Constriction of the pupils',
      'Contraction of the bladder wall in urination'
    ],
    explanation: 'Goose bumps are caused by the contraction of arrector pili muscles, which are innervated exclusively by the sympathetic nervous system.'
  },
  {
    id: 'ch15-062',
    questionText: 'What kind of cell bodies do the sympathetic trunk ganglia contain?',
    answerText: 'Postganglionic sympathetic',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Postganglionic sympathetic',
      'Preganglionic sympathetic',
      'Preganglionic parasympathetic',
      'Postganglionic parasympathetic'
    ],
    explanation: 'Sympathetic trunk ganglia house the cell bodies of postganglionic sympathetic neurons, where preganglionic neurons synapse with them.'
  },
  {
    id: 'ch15-063',
    questionText: 'Sympathetic pathways to the extremities direct impulses to which of these structures?',
    answerText: 'Arrector pili muscles and sweat glands',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Arrector pili muscles and sweat glands',
      'The heart and lungs',
      'Peripheral blood vessels and salivary glands',
      'Skeletal muscles of the arms and legs'
    ],
    explanation: 'In the extremities (limbs), sympathetic fibers primarily target the smooth muscle of blood vessels, sweat glands, and arrector pili muscles in the skin.'
  },
  {
    id: 'ch15-064',
    questionText: 'What are the short nerve branches that connect the ventral rami of spinal nerves to the sympathetic ganglia?',
    answerText: 'Rami communicantes',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Rami communicantes',
      'Splanchnic nerves',
      'Sympathetic trunks',
      'Dorsal roots'
    ],
    explanation: 'The white and gray rami communicantes are short pathways that connect the spinal nerves to the sympathetic trunk ganglia.'
  },
  {
    id: 'ch15-065',
    questionText: 'Which of the following cranial nerves does NOT supply parasympathetic fibers to the head?',
    answerText: 'Vagus nerve (CN X)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Vagus nerve (CN X)',
      'Oculomotor nerve (CN III)',
      'Facial nerve (CN VII)',
      'Glossopharyngeal nerve (CN IX)'
    ],
    explanation: 'While the vagus nerve carries the vast majority of parasympathetic fibers, it travels down to innervate the organs of the thorax and abdomen, not the head.'
  },
  {
    id: 'ch15-066',
    questionText: 'Parasympathetic postganglionic fibers of the head often travel within branches of which nerve to reach their targets?',
    answerText: 'Trigeminal nerve (CN V)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Trigeminal nerve (CN V)',
      'Vestibulocochlear nerve (CN VIII)',
      'Accessory nerve (CN XI)',
      'Vagus nerve (CN X)'
    ],
    explanation: 'Although the trigeminal nerve does not contain preganglionic parasympathetic fibers, postganglionic fibers from other cranial nerves "hitchhike" along its branches to reach their final destinations in the face.'
  },
  {
    id: 'ch15-067',
    questionText: 'Where would you NOT find an autonomic ganglion?',
    answerText: 'In the armpit (axilla)',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'In the armpit (axilla)',
      'In the cervical region',
      'Alongside the vertebral column',
      'In the head'
    ],
    explanation: 'Autonomic ganglia are found in the head, neck (cervical region), alongside the vertebral column (sympathetic trunk), and in the abdominopelvic cavity. They are not found in the armpit.'
  },
  {
    id: 'ch15-068',
    questionText: 'Control of temperature, autonomic nervous reflexes, hunger, and sleep are functions associated with the:',
    answerText: 'Hypothalamus',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Hypothalamus',
      'Thalamus',
      'Medulla oblongata',
      'Cerebellum'
    ],
    explanation: 'The hypothalamus is the main integration center of the autonomic nervous system, regulating many vital homeostatic processes.'
  },
  {
    id: 'ch15-069',
    questionText: 'In the baroreceptor reflex, stimulation of the vagus nerve causes:',
    answerText: 'Decreased heart rate',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Decreased heart rate',
      'Increased gastric secretions',
      'Erection of the penis',
      'Decreased oxygen demand by the body'
    ],
    explanation: 'When blood pressure is too high, baroreceptors trigger a reflex that increases parasympathetic stimulation via the vagus nerve, which slows the heart rate to lower blood pressure.'
  },
  {
    id: 'ch15-070',
    questionText: 'Which sympathetic pathway is responsible for the prolonged effect of the "fight or flight" response?',
    answerText: 'Adrenal medulla pathway',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Adrenal medulla pathway',
      'Spinal nerve pathway',
      'Postganglionic sympathetic nerve pathway',
      'Splanchnic nerve pathway'
    ],
    explanation: 'The adrenal medulla releases epinephrine and norepinephrine directly into the bloodstream, causing widespread and prolonged sympathetic effects.'
  },
  {
    id: 'ch15-071',
    questionText: 'Where are prevertebral (collateral) ganglia located?',
    answerText: 'Only in the abdominopelvic cavity, anterior to the vertebral column',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Only in the abdominopelvic cavity, anterior to the vertebral column',
      'Only in the thoracic cavity, posterior to the heart',
      'Inside the walls of the target organs',
      'In the cervical region of the neck'
    ],
    explanation: 'Prevertebral ganglia (like the celiac and mesenteric ganglia) are located anterior to the vertebral column and primarily innervate organs below the diaphragm.'
  },
  {
    id: 'ch15-072',
    questionText: 'Are muscarinic cholinergic receptors always excitatory?',
    answerText: 'No, they can be either excitatory or inhibitory depending on the target cell.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'No, they can be either excitatory or inhibitory depending on the target cell.',
      'Yes, they always cause depolarization.',
      'No, they are always inhibitory.',
      'Yes, but only when binding to norepinephrine.'
    ],
    explanation: 'Unlike nicotinic receptors which are always excitatory, muscarinic receptors can cause depolarization (excitation) or hyperpolarization (inhibition) depending on the specific receptor subtype on the effector cell.'
  },
  {
    id: 'ch15-073',
    questionText: 'Which of these statements concerning gray rami communicantes is INCORRECT?',
    answerText: 'They contain all the preganglionic fibers traveling to the sympathetic chain.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'They contain all the preganglionic fibers traveling to the sympathetic chain.',
      'They carry postganglionic fibers to peripheral structures.',
      'Their fibers are unmyelinated.',
      'They are associated with sympathetic trunk ganglia.'
    ],
    explanation: 'Preganglionic fibers travel through the WHITE rami communicantes, not the gray. Gray rami carry unmyelinated postganglionic fibers.'
  },
  {
    id: 'ch15-074',
    questionText: 'Which structures receive parasympathetic innervation from the vagus nerve (CN X)?',
    answerText: 'Liver and Lungs',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Liver and Lungs',
      'Urinary Bladder and Uterus',
      'Salivary glands and Lacrimal glands',
      'Pupils and Ciliary muscles'
    ],
    explanation: 'The vagus nerve innervates thoracic and abdominal organs like the heart, lungs, liver, and stomach. Pelvic organs (bladder, uterus) are innervated by sacral parasympathetic nerves.'
  },
  {
    id: 'ch15-075',
    questionText: 'What would happen if sympathetic tone to blood vessels did not exist?',
    answerText: 'Further dilation of vessels would not be possible; they would remain fully dilated.',
    category: 'Chapter 15: The Autonomic Nervous System',
    options: [
      'Further dilation of vessels would not be possible; they would remain fully dilated.',
      'Blood vessels would permanently constrict, raising blood pressure.',
      'The parasympathetic system would take over vasoconstriction.',
      'Heart rate would drop to dangerously low levels.'
    ],
    explanation: 'Sympathetic tone keeps blood vessels in a continuous state of partial constriction. If this tone were lost, the vessels would fully dilate, and the body could not dilate them any further to adjust blood flow.'
  }
];
