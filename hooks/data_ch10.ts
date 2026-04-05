
import { Question } from '../types';
import { questions as allDiagramQuestions } from './data_chapter_all';

const baseQuestions: Question[] = [
  // --- MUSCLE TISSUE CONCEPTS ---
  {
    id: 'ch10-001',
    questionText: 'Muscle tissue, one of the four basic tissue groups, consists chiefly of cells that are highly specialized for',
    answerText: 'contraction',
    category: 'Chapter 10: Muscle Tissue',
    options: ['contraction', 'cushioning', 'conduction', 'peristalsis', 'secretion']
  },
  {
    id: 'ch10-002',
    questionText: 'Which of the following is a recognized function of skeletal muscle?',
    answerText: 'All of the answers are correct.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['produce movement', 'maintain posture', 'maintain body temperature', 'guard body entrances and exits', 'All of the answers are correct.']
  },
  {
    id: 'ch10-003',
    questionText: 'At each end of the muscle, the collagen fibers of the epimysium, perimysium, and endomysium, come together to form a',
    answerText: 'tendon',
    category: 'Chapter 10: Muscle Tissue',
    options: ['tendon', 'sheath', 'ligament', 'tenosynovium', 'cartilage']
  },
  {
    id: 'ch10-004',
    questionText: 'The dense layer of connective tissue that surrounds an entire skeletal muscle is the',
    answerText: 'epimysium',
    category: 'Chapter 10: Muscle Tissue',
    options: ['epimysium', 'endomysium', 'perimysium', 'fascicle', 'tendon']
  },
  {
    id: 'ch10-005',
    questionText: 'Nerves and blood vessels that service a muscle fiber are located in the connective tissues of its',
    answerText: 'Perimysium',
    category: 'Chapter 10: Muscle Tissue',
    options: ['Endomysium', 'Perimysium', 'Sarcolemma', 'Sarcomere', 'Myofibrils']
  },
  {
    id: 'ch10-006',
    questionText: 'What is a fascicle',
    answerText: 'a bundle of skeletal muscle fibers',
    category: 'Chapter 10: Muscle Tissue',
    options: ['a bundle of skeletal muscle fibers', 'a group of myofibrils', 'a single muscle cell', 'a layer of connective tissue', 'an organelle']
  },
  {
    id: 'ch10-007',
    questionText: 'The delicate connective tissue that surrounds the skeletal muscle fibers and ties adjacent muscle fibers together is the',
    answerText: 'endomysium',
    category: 'Chapter 10: Muscle Tissue',
    options: ['endomysium', 'perimysium', 'epimysium', 'superficial fascia', 'deep fascia']
  },
  {
    id: 'ch10-008',
    questionText: 'The bundle of collagen fibers at the end of a skeletal muscle that attaches the muscle to bone is called a(n)',
    answerText: 'tendon',
    category: 'Chapter 10: Muscle Tissue',
    options: ['tendon', 'ligament', 'myofibril', 'fascicle', 'epimysium']
  },
  {
    id: 'ch10-009',
    questionText: 'Put the following structures in order from superficial to deep. 1. muscle fiber 2. perimysium 3. myofibril 4. fascicle 5. endomysium 6. epimysium',
    answerText: '6,2,4,5,1,3',
    category: 'Chapter 10: Muscle Tissue',
    options: ['6,2,4,5,1,3', '1,3,5,4,2,6', '6,4,2,5,1,3', '1,5,4,3,2,6']
  },
  {
    id: 'ch10-010',
    questionText: 'A(n) ________ can be described as a broad tendinous sheet.',
    answerText: 'Aponeurosis',
    category: 'Chapter 10: Muscle Tissue',
    options: ['Aponeurosis', 'Fascicle', 'Tendon', 'Ligament', 'Perimysium']
  },
  {
    id: 'ch10-011',
    questionText: 'Interactions between actin and myosin filaments of the sarcomere are responsible for',
    answerText: 'muscle contraction',
    category: 'Chapter 10: Muscle Tissue',
    options: ['muscle contraction', 'muscle relaxation', 'the striped appearance of skeletal muscles', 'muscle fatigue', 'conduction of neural stimulation']
  },
  {
    id: 'ch10-012',
    questionText: 'In a sarcomere, the central portion of thick filaments are linked laterally by proteins of the',
    answerText: 'M line',
    category: 'Chapter 10: Muscle Tissue',
    options: ['M line', 'Z line', 'A band', 'I band', 'H band']
  },
  {
    id: 'ch10-013',
    questionText: 'The advantage of having many nuclei in a skeletal muscle fiber is the ability to',
    answerText: 'produce large amounts of muscle proteins needed for growth and repair',
    category: 'Chapter 10: Muscle Tissue',
    options: ['produce large amounts of muscle proteins needed for growth and repair', 'store extra DNA for division', 'produce more ATP', 'contract faster', 'conduct impulses faster']
  },
  {
    id: 'ch10-014',
    questionText: 'Skeletal muscle fibers are formed from embryonic cells called',
    answerText: 'myoblasts',
    category: 'Chapter 10: Muscle Tissue',
    options: ['myoblasts', 'myocytes', 'sarcomeres', 'myofibrils', 'fibroblasts']
  },
  {
    id: 'ch10-015',
    questionText: 'The repeating unit of a skeletal muscle fiber is the',
    answerText: 'sarcomere',
    category: 'Chapter 10: Muscle Tissue',
    options: ['sarcomere', 'myofibril', 'myofilament', 'sarcoplasmic reticulum', 'fascicle']
  },
  {
    id: 'ch10-016',
    questionText: 'The plasma membrane of a skeletal muscle fiber is called the',
    answerText: 'sarcolemma',
    category: 'Chapter 10: Muscle Tissue',
    options: ['sarcolemma', 'sarcomere', 'sarcoplasm', 'sarcoplasmic reticulum', 'myolemma']
  },
  {
    id: 'ch10-017',
    questionText: 'Which of the following best describes the term sarcomere?',
    answerText: 'repeating unit of striated myofibrils',
    category: 'Chapter 10: Muscle Tissue',
    options: ['repeating unit of striated myofibrils', 'protein that accounts for elasticity of resting muscle', 'storage site for calcium ions', 'thin filaments are anchored here', 'largely made of myosin molecules']
  },
  {
    id: 'ch10-018',
    questionText: 'Muscle fibers differ from "typical cells" in that muscle fibers',
    answerText: 'have many nuclei',
    category: 'Chapter 10: Muscle Tissue',
    options: ['have many nuclei', 'lack a cell membrane', 'are very small', 'lack mitochondria', 'lack DNA']
  },
  {
    id: 'ch10-019',
    questionText: 'Which of the following best describes the term sarcoplasmic reticulum?',
    answerText: 'storage and release site for calcium ions',
    category: 'Chapter 10: Muscle Tissue',
    options: ['storage and release site for calcium ions', 'protein that accounts for elasticity of resting muscle', 'repeating unit of striated myofibrils', 'thin filaments are anchored here', 'largely made of myosin molecules']
  },
  {
    id: 'ch10-020',
    questionText: 'Which of the following best describes the term Z line?',
    answerText: 'thin filaments are anchored here',
    category: 'Chapter 10: Muscle Tissue',
    options: ['thin filaments are anchored here', 'storage site for calcium ions', 'repeating unit of striated myofibrils', 'protein that accounts for elasticity of resting muscle', 'largely made of myosin molecules']
  },
  {
    id: 'ch10-021',
    questionText: 'The region of the sarcomere containing the thick filaments is the',
    answerText: 'A band',
    category: 'Chapter 10: Muscle Tissue',
    options: ['A band', 'Z line', 'M line', 'I band', 'H band']
  },
  {
    id: 'ch10-022',
    questionText: 'The skeletal muscle complex known as the triad consists of',
    answerText: 'A transverse tubule and terminal cisternae',
    category: 'Chapter 10: Muscle Tissue',
    options: ['A transverse tubule and terminal cisternae', 'Actin, myosin, and filaments', 'Filaments, myofibrils, and sarcomeres', 'A bands, H bands, and I bands', 'Actin, myosin, and sarcomeres']
  },
  {
    id: 'ch10-023',
    questionText: 'The area in the center of the A band that contains no thin filaments is the',
    answerText: 'H band',
    category: 'Chapter 10: Muscle Tissue',
    options: ['H band', 'Z line', 'M line', 'I band', 'zone of overlap']
  },
  {
    id: 'ch10-024',
    questionText: 'At rest, the tropomyosin molecule is held in place by',
    answerText: 'troponin molecules',
    category: 'Chapter 10: Muscle Tissue',
    options: ['troponin molecules', 'actin molecules', 'myosin molecules', 'calcium ions', 'ATP molecules']
  },
  {
    id: 'ch10-025',
    questionText: 'Each thin filament consists of',
    answerText: 'two actin protein strands coiled helically around each other.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['two actin protein strands coiled helically around each other.', 'two myosin protein strands coiled helically around each other.', 'a single actin strand', 'a single myosin strand', 'rods of titin']
  },
  {
    id: 'ch10-026',
    questionText: 'The region of the sarcomere that always contains thin filaments is the',
    answerText: 'I band',
    category: 'Chapter 10: Muscle Tissue',
    options: ['I band', 'A band', 'H band', 'M line', 'Z line']
  },
  {
    id: 'ch10-027',
    questionText: 'At rest, active sites on the actin are blocked by',
    answerText: 'Tropomyosin molecules',
    category: 'Chapter 10: Muscle Tissue',
    options: ['Tropomyosin molecules', 'Myosin molecules', 'Troponin molecules', 'Calcium ions', 'ATP molecules']
  },
  {
    id: 'ch10-028',
    questionText: 'The series of membranous channels that surround each myofibril is the',
    answerText: 'Sarcoplasmic reticulum',
    category: 'Chapter 10: Muscle Tissue',
    options: ['Sarcoplasmic reticulum', 'Sarcolemma', 'Myolemma', 'Sarcoplasm', 'Transverse tubule']
  },
  {
    id: 'ch10-029',
    questionText: 'All of the following proteins are part of the thin filaments except',
    answerText: 'titin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['titin', 'actin', 'tropomyosin', 'troponin', 'nebulin']
  },
  {
    id: 'ch10-030',
    questionText: 'When a skeletal muscle fiber contracts, the',
    answerText: 'zones of overlap get larger',
    category: 'Chapter 10: Muscle Tissue',
    options: ['zones of overlap get larger', 'H bands and I bands get larger', 'Z lines move further apart', 'width of the A band increases', 'A bands get smaller']
  },
  {
    id: 'ch10-031',
    questionText: 'Since each myofibril is attached at either end of the muscle fiber, when sarcomeres shorten, the muscle fiber',
    answerText: 'shortens',
    category: 'Chapter 10: Muscle Tissue',
    options: ['shortens', 'lengthens', 'strengthens', 'weakens', 'pulls from the middle']
  },
  // Diagram Questions Embedded in Text (32-41)
  {
    id: 'ch10-032',
    questionText: 'Identify the structure labeled "1" in a typical muscle cell diagram.',
    answerText: 'Mitochondria',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['Mitochondria', 'Myofibril', 'Sarcolemma', 'Nucleus', 'Sarcoplasmic Reticulum']
  },
  {
    id: 'ch10-033',
    questionText: 'Which of the following are found in the structure labeled "3" (Myofibril)?',
    answerText: 'All of the answers are correct.',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['actin', 'myosin', 'titin', 'tropomyosin', 'All of the answers are correct.']
  },
  {
    id: 'ch10-034',
    questionText: 'What physiological process occurs in the structure labeled "7" (T-tubule)?',
    answerText: 'conduction of the action potential into the cell interior',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['conduction of the action potential into the cell interior', 'release of neurotransmitter', 'activity of acetylcholinesterase', 'release of calcium ions', 'opening of sodium channels']
  },
  {
    id: 'ch10-035',
    questionText: 'What is released from the structure labeled "9" (Terminal Cisternae)?',
    answerText: 'calcium ions',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['calcium ions', 'sarcoplasm', 'acetylcholine', 'protein', 'acetylcholinesterase']
  },
  {
    id: 'ch10-036',
    questionText: 'Where would calcium ions be predominately found?',
    answerText: '9',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['9', '1', '3', '2', '5']
  },
  {
    id: 'ch10-037',
    questionText: 'Which structure has pumps to remove calcium ions from the sarcoplasm to produce relaxation?',
    answerText: '6',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['6', '7', '1', '3', '2']
  },
  {
    id: 'ch10-038',
    questionText: 'Where are the myosin molecules located?',
    answerText: '5',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['5', '3', 'Z line', 'Mitochondria', 'Sarcolemma']
  },
  {
    id: 'ch10-039',
    questionText: 'Which structure contains the motor end plate?',
    answerText: '2',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['2', '1', '3', '5', '8']
  },
  {
    id: 'ch10-040',
    questionText: 'Identify the structure where ATP is produced.',
    answerText: '1',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['1', '2', '6', '7', '3']
  },
  {
    id: 'ch10-041',
    questionText: 'Identify the structure(s) where ATP is consumed?',
    answerText: '3 and 6',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/44KF4eS2z0KrIwg8RUCYvg.jpg',
    options: ['3 and 6', '3 only', '6 only', '7 only', '3 and 7']
  },
  // Continuing with text questions
  {
    id: 'ch10-042',
    questionText: 'Active sites on the actin become available for binding after',
    answerText: 'Calcium binds to troponin.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['Calcium binds to troponin.', 'Actin binds to troponin.', 'Troponin binds to tropomyosin.', 'Calcium binds to tropomyosin.', 'Myosin binds to troponin.']
  },
  {
    id: 'ch10-043',
    questionText: 'The action potential is conducted into a skeletal muscle fiber by',
    answerText: 'transverse tubules.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['transverse tubules.', 'motor end plates.', 'neuromuscular junctions.', 'triads.', 'sarcoplasmic reticulum.']
  },
  {
    id: 'ch10-044',
    questionText: 'The most important factor in decreasing the intracellular concentration of calcium ion after contraction is',
    answerText: 'active transport of calcium into the sarcoplasmic reticulum.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['active transport of calcium into the sarcoplasmic reticulum.', 'active transport of calcium across the sarcolemma.', 'active transport of calcium into the synaptic cleft.', 'diffusion of calcium out of the cell.', 'diffusion of calcium into the sarcoplasmic reticulum.']
  },
  {
    id: 'ch10-045',
    questionText: 'When calcium ion binds to troponin,',
    answerText: 'tropomyosin rolls away from the active site.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['tropomyosin rolls away from the active site.', 'active sites on the myosin are exposed.', 'actin heads will bind to myosin.', 'muscle relaxation occurs.', 'myosin shortens.']
  },
  {
    id: 'ch10-046',
    questionText: 'Physical evidence that supports the sliding filament theory of muscle contraction includes',
    answerText: 'decreased width of the H band during contraction.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['decreased width of the H band during contraction.', 'constant distance between Z lines during contraction.', 'increased width of the I band during contraction.', 'decreased width of the A band during contraction.', 'the I band + H band distance is constant during contraction.']
  },
  {
    id: 'ch10-047',
    questionText: 'The protein that is found in the Z line of a sarcomere is called',
    answerText: 'actinin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['actinin', 'titin', 'myosin', 'actin', 'nebulin']
  },
  {
    id: 'ch10-048',
    questionText: 'The protein that regulates muscle contraction by controlling the availability of active sites on actin is called',
    answerText: 'tropomyosin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['tropomyosin', 'troponin', 'actin', 'myosin', 'titin']
  },
  {
    id: 'ch10-049',
    questionText: 'Thin filaments are mostly made of the protein',
    answerText: 'actin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['actin', 'myosin', 'titin', 'nebulin', 'tropomyosin']
  },
  {
    id: 'ch10-050',
    questionText: 'Thick filaments are made of the protein',
    answerText: 'myosin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['myosin', 'actin', 'titin', 'nebulin', 'tropomyosin']
  },
  {
    id: 'ch10-051',
    questionText: 'Stem cells located between the endomysium and sarcolemma that function in the repair of damaged muscle tissue are called',
    answerText: 'myosatellite cells',
    category: 'Chapter 10: Muscle Tissue',
    options: ['myosatellite cells', 'myoblasts', 'chondrocytes', 'fibroblasts', 'osteocytes']
  },
  {
    id: 'ch10-052',
    questionText: 'The complex of a transverse tubule and two adjacent terminal cisternae is known as a',
    answerText: 'triad',
    category: 'Chapter 10: Muscle Tissue',
    options: ['triad', 'sarcomere', 'myofibril', 'dyad', 'junction']
  },
  {
    id: 'ch10-053',
    questionText: 'The structural theory that explains how a muscle fiber contracts is called the ________ theory.',
    answerText: 'sliding-filament',
    category: 'Chapter 10: Muscle Tissue',
    options: ['sliding-filament', 'excitation-contraction', 'cross-bridge', 'action-potential', 'muscle-twitch']
  },
  {
    id: 'ch10-054',
    questionText: 'The region of sarcomere where thin and thick filaments are located is called the',
    answerText: 'A Band',
    category: 'Chapter 10: Muscle Tissue',
    options: ['A Band', 'I Band', 'H Zone', 'M Line', 'Z Disc']
  },
  {
    id: 'ch10-055',
    questionText: 'In the sarcomere which elastic protein attaches the thick filament to the Z line?',
    answerText: 'titin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['titin', 'nebulin', 'actin', 'myosin', 'dystrophin']
  },
  {
    id: 'ch10-056',
    questionText: 'In the sarcomere the protein that forms two twisted strands around a central rod-like protein is called',
    answerText: 'G actin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['G actin', 'titin', 'actin', 'nebulin', 'myosin']
  },
  {
    id: 'ch10-057',
    questionText: 'In the myofibril the protein that possesses the active site for myosin heads to bind is called',
    answerText: 'tropomyosin', // Provided text says tropomyosin, although technically Actin has the site, Tropomyosin covers it.
    category: 'Chapter 10: Muscle Tissue',
    options: ['G actin', 'tropomyosin', 'troponin', 'myosin', 'titin']
  },
  {
    id: 'ch10-058',
    questionText: 'In the myofibril the thin filament is organized around a rod-like core protein called',
    answerText: 'nebulin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['nebulin', 'titin', 'myosin', 'dystrophin', 'actinin']
  },
  {
    id: 'ch10-059',
    questionText: 'In response to action potentials arriving along the transverse tubules, the sarcoplasmic reticulum releases',
    answerText: 'calcium ions',
    category: 'Chapter 10: Muscle Tissue',
    options: ['calcium ions', 'sodium ions', 'potassium ions', 'acetylcholine', 'ATP']
  },
  {
    id: 'ch10-060',
    questionText: 'Each skeletal muscle fiber is controlled by a motor neuron at a single',
    answerText: 'neuromuscular junction',
    category: 'Chapter 10: Muscle Tissue',
    options: ['neuromuscular junction', 'synaptic knob', 'sarcomere', 'synaptic cleft', 'transverse tubule']
  },
  {
    id: 'ch10-061',
    questionText: 'The narrow space between the synaptic terminal and the muscle fiber is the',
    answerText: 'synaptic cleft',
    category: 'Chapter 10: Muscle Tissue',
    options: ['synaptic cleft', 'motor end plate', 'synaptic knob', 'junctional fold', 'active zone']
  },
  {
    id: 'ch10-062',
    questionText: 'Which of the following become connected by myosin cross-bridges during muscle contraction?',
    answerText: 'thin filaments and thick filaments',
    category: 'Chapter 10: Muscle Tissue',
    options: ['thin filaments and thick filaments', 'thick filaments and titin filaments', 'z disks and actin filaments', 'thick filaments and t-tubules', 'thin filaments and t-tubules']
  },
  {
    id: 'ch10-063',
    questionText: 'After death, muscle fibers run out of ATP and calcium begins to leak from the sarcoplasmic reticulum into the sarcoplasm. This results in a condition known as',
    answerText: 'rigor mortis',
    category: 'Chapter 10: Muscle Tissue',
    options: ['rigor mortis', 'tetany', 'treppe', 'depolarization', 'oxygen debt']
  },
  {
    id: 'ch10-064',
    questionText: 'In rigor mortis',
    answerText: 'All of the answers are correct.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['All of the answers are correct.', 'the myosin heads are attached to actin.', 'ATP is depleted.', 'calcium ions keep binding to troponin.', 'sustained contractions occur.']
  },
  {
    id: 'ch10-065',
    questionText: 'In a sarcomere, cross-bridge attachment occurs specifically in the',
    answerText: 'zone of overlap',
    category: 'Chapter 10: Muscle Tissue',
    options: ['zone of overlap', 'H band', 'I band', 'Z line', 'M line']
  },
  {
    id: 'ch10-066',
    questionText: 'Triggering of the muscle action potential occurs after',
    answerText: 'acetylcholine binds to chemically-gated channels in the motor end plate.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['acetylcholine binds to chemically-gated channels in the motor end plate.', 'acetylcholinesterase is released from synaptic vesicles.', 'calcium ion binds to channels on the motor end plate.', 'the action potential jumps across the neuromuscular junction.', 'Any of these can produce an action potential.']
  },
  {
    id: 'ch10-067',
    questionText: 'The following is a list of the events that occur during a muscle contraction. What is the correct sequence of these events? 1. Myosin cross-bridges bind to the actin. 2. The free myosin head splits ATP. 3. Calcium ion is released from the sarcoplasmic reticulum. 4. The myosin head pivots toward the center of the sarcomere. 5. Calcium ion binds to troponin. 6. The myosin head binds an ATP molecule and detaches from the actin.',
    answerText: '3, 5, 1, 4, 6, 2',
    category: 'Chapter 10: Muscle Tissue',
    options: ['3, 5, 1, 4, 6, 2', '1, 3, 5, 4, 6, 2', '3, 1, 5, 4, 2, 6', '5, 1, 4, 6, 2, 3', '2, 4, 6, 1, 3, 5']
  },
  {
    id: 'ch10-068',
    questionText: 'How would the loss of acetylcholinesterase from the motor end plate affect skeletal muscle?',
    answerText: 'It would cause muscles to stay contracted.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['It would cause muscles to stay contracted.', 'It would make the muscles less excitable.', 'It would produce muscle weakness.', 'It would cause muscles to stay relaxed.', 'It would have little effect on skeletal muscles.']
  },
  {
    id: 'ch10-069',
    questionText: 'When acetylcholine binds to receptors at the motor end plate, the sarcolemma becomes',
    answerText: 'more permeable to sodium ions.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['more permeable to sodium ions.', 'less permeable to sodium ions.', 'more permeable to calcium ions.', 'less permeable to potassium ions.', 'less permeable to potassium and sodium ions.']
  },
  {
    id: 'ch10-070',
    questionText: 'The cytoplasm of the neuromuscular terminal contains vesicles filled with molecules of the neurotransmitter',
    answerText: 'acetylcholine',
    category: 'Chapter 10: Muscle Tissue',
    options: ['acetylcholine', 'epinephrine', 'norepinephrine', 'antidiuretic hormone', 'adrenaline']
  },
  {
    id: 'ch10-071',
    questionText: 'At what point during excitation contraction coupling does exocytosis play a role?',
    answerText: 'during acetylcholine release from the synaptic terminal',
    category: 'Chapter 10: Muscle Tissue',
    options: ['during acetylcholine release from the synaptic terminal', 'during calcium ion reuptake into the sarcoplasmic reticulum', 'when sodium channels open up on the motor end plate', 'when the action potential surges through the T-tubules', 'when ATP splits into ADP and P on the free myosin head']
  },
  {
    id: 'ch10-072',
    questionText: 'Which of the following statements about excitation-contraction coupling is incorrect?',
    answerText: 'Calcium ions travel through the transverse tubule.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['Calcium ions travel through the transverse tubule.', 'Calcium ion is released from the sarcoplasmic reticulum.', 'Tropomyosin moves to expose myosin binding sites on actin.', 'Troponin binds calcium ion and signals tropomyosin to move.', 'Relaxation requires uptake of calcium ion by the sarcoplasmic reticulum.']
  },
  {
    id: 'ch10-073',
    questionText: 'Synaptic vesicles contain neurotransmitters that are released by ________ when the action potential arrives.',
    answerText: 'exocytosis',
    category: 'Chapter 10: Muscle Tissue',
    options: ['exocytosis', 'endocytosis', 'apoptosis', 'hydrolysis', 'sodium']
  },
  {
    id: 'ch10-074',
    questionText: 'A patient takes a medication that blocks ACh receptors of skeletal muscle fibers. What is this drug\'s effect on skeletal muscle contraction?',
    answerText: 'reduces the muscle\'s ability for contraction',
    category: 'Chapter 10: Muscle Tissue',
    options: ['reduces the muscle\'s ability for contraction', 'increases tone in the muscle', 'causes a strong contraction similar to a "charlie horse" cramp', 'increases the muscle\'s excitability', 'produces a strong, continuous state of contraction']
  },
  {
    id: 'ch10-075',
    questionText: 'Communication between axons and muscle fibers occurs at specialized synapses called',
    answerText: 'neuromuscular junctions',
    category: 'Chapter 10: Muscle Tissue',
    options: ['neuromuscular junctions', 'nervous units', 'synaptic terminals', 'motor end plates', 'motor units']
  },
  {
    id: 'ch10-076',
    questionText: 'Active sites become exposed when calcium ions bind to',
    answerText: 'troponin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['troponin', 'tropomyosin', 'actin', 'myosin', 'calcium channels']
  },
  {
    id: 'ch10-077',
    questionText: 'Cross bridge detachment is caused by ________ binding to the myosin head.',
    answerText: 'ATP',
    category: 'Chapter 10: Muscle Tissue',
    options: ['ATP', 'calcium', 'magnesium', 'acetylcholine', 'acetylcholinesterase']
  },
  {
    id: 'ch10-078',
    questionText: 'The sequence of processes that links the action potential to contraction is called',
    answerText: 'excitation-contraction coupling',
    category: 'Chapter 10: Muscle Tissue',
    options: ['excitation-contraction coupling', 'neuromuscular junction', 'action potential propagation', 'cross bridge formation', 'sliding filament theory']
  },
  {
    id: 'ch10-079',
    questionText: 'The role of acetylcholinesterase is to',
    answerText: 'break down acetylcholine into acetate and choline components.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['break down acetylcholine into acetate and choline components.', 'bind to ligand gated sodium channels.', 'activate acetylcholine.', 'release acetylcholine into the synaptic cleft.', 'transport acetylcholine across the synaptic cleft.']
  },
  {
    id: 'ch10-080',
    questionText: 'Which of the following is not true of acetylcholine?',
    answerText: 'It enters the muscle fiber to release calcium form the sarcoplasmic reticulum.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['It enters the muscle fiber to release calcium form the sarcoplasmic reticulum.', 'It binds to receptor membrane channels.', 'It diffuses across the synaptic cleft.', 'It is stored in the neuron in vesicles.', 'It is digested by acetylcholinesterase.']
  },
  {
    id: 'ch10-081',
    questionText: 'Put the following events of excitation-contraction coupling in the order in which they occur. 1. Excitation 2. Sarcomere shortening 3. Generation of muscle tension 4. Neural control 5. Contraction cycle begins 6. Release of calcium ions',
    answerText: '1, 4, 6, 5, 2, 3',
    category: 'Chapter 10: Muscle Tissue',
    options: ['1, 4, 6, 5, 2, 3', '4, 1, 6, 5, 2, 3', '1, 4, 5, 6, 2, 3', '4, 1, 5, 6, 3, 2']
  },
  {
    id: 'ch10-082',
    questionText: 'Put the following events of the neuromuscular junction in the order in which they occur. 1. Action potential is propagated in the sarcolemma. 2. Acetylcholine binds to ligand gated sodium channels. 3. Action potential arrives at the neuromuscular junction. 4. Vesicles full of acetylcholine are stored at the axon terminal. 5. Acetylcholine is released into the synaptic cleft.',
    answerText: '4, 3, 5, 2, 1',
    category: 'Chapter 10: Muscle Tissue',
    options: ['4, 3, 5, 2, 1', '3, 4, 5, 2, 1', '4, 3, 2, 5, 1', '3, 5, 2, 1, 4']
  },
  {
    id: 'ch10-083',
    questionText: 'Put the following events of the contraction cycle in the order in which they occur. 1. Cross-bridge detachment 2. Cross-bridge formation 3. Active site exposure 4. Myosin reactivation 5. Calcium ions bind troponin 6. Myosin head pivoting',
    answerText: '5, 3, 2, 6, 1, 4',
    category: 'Chapter 10: Muscle Tissue',
    options: ['5, 3, 2, 6, 1, 4', '3, 5, 2, 6, 1, 4', '5, 2, 3, 6, 1, 4', '2, 6, 1, 4, 5, 3']
  },

  // --- TERMS (Converted to Questions) ---
  {
    id: 'ch10-term-001',
    questionText: 'Define the term: Epimysium',
    answerText: 'is a dense layer of collagen fibers that surrounds the entire muscle',
    category: 'Chapter 10: Muscle Tissue',
    options: ['is a dense layer of collagen fibers that surrounds the entire muscle', 'divides the skeletal muscle into compartments', 'A bundle (compartment) of muscle fibers', 'Delicate connective tissue surrounding individual fibers']
  },
  {
    id: 'ch10-term-002',
    questionText: 'Define the term: Perimysium',
    answerText: 'divides the skeletal muscle into compartments. It contains collagen and elastic fibers as well as the blood vessels and nerves that supply the muscle fibers within the fascicles.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['divides the skeletal muscle into compartments. It contains collagen and elastic fibers as well as the blood vessels and nerves that supply the muscle fibers within the fascicles.', 'surrounds the entire muscle', 'surrounds individual muscle fibers', 'attaches muscle to bone']
  },
  {
    id: 'ch10-term-003',
    questionText: 'Define the term: Fascicle',
    answerText: 'A bundle (compartment) of muscle fibers within the perimysium',
    category: 'Chapter 10: Muscle Tissue',
    options: ['A bundle (compartment) of muscle fibers within the perimysium', 'A single muscle cell', 'A group of myofibrils', 'A tendon']
  },
  {
    id: 'ch10-term-004',
    questionText: 'Define the term: Endomysium',
    answerText: 'Delicate connective tissue surrounding the individual skeletal muscle cells, called muscle fibers. Contains capillary networks, myosatellite cells, and nerve fibers.',
    category: 'Chapter 10: Muscle Tissue',
    options: ['Delicate connective tissue surrounding the individual skeletal muscle cells, called muscle fibers. Contains capillary networks, myosatellite cells, and nerve fibers.', 'Dense layer surrounding the entire muscle', 'Layer dividing muscle into fascicles', 'Tendinous sheet']
  },
  {
    id: 'ch10-term-005',
    questionText: 'How would an elevated level of thyroid hormone in the body affect skeletal muscles?',
    answerText: 'It would stimulate energy use and heat production',
    category: 'Chapter 10: Muscle Tissue',
    options: ['It would stimulate energy use and heat production', 'It would stimulate atrophy', 'It would decrease heat production by muscle tissue', 'It would cause an increase in muscle mass', 'It would stimulate hypertrophy']
  },
  {
    id: 'ch10-term-006',
    questionText: 'Which of the following hormones directly stimulates growth of muscle tissue, leading to increases muscle mass?',
    answerText: 'testosterone',
    category: 'Chapter 10: Muscle Tissue',
    options: ['calcitonin', 'epinephrine', 'thyroid hormone', 'testosterone', 'para thyroid hormone']
  },
  {
    id: 'ch10-term-007',
    questionText: 'Interactions between actin and myosin filaments of the sarcomere are responsible for',
    answerText: 'muscle contraction',
    category: 'Chapter 10: Muscle Tissue',
    options: ['the striped appearance of skeletal muscles', 'muscle fatigue', 'the conduction of neural stimulation to the muscle fiber', 'muscle relaxation', 'muscle contraction']
  },
  {
    id: 'ch10-term-008',
    questionText: 'The thin filaments of striated muscle are made primarily of which protein(s)?',
    answerText: 'All of the answer are correct',
    category: 'Chapter 10: Muscle Tissue',
    options: ['tropomyosin', 'actin', 'nebulin', 'troponin', 'All of the answer are correct']
  },
  {
    id: 'ch10-term-009',
    questionText: 'A single motor neuron together with all the muscle fibers it innervates is called',
    answerText: 'a motor unit',
    category: 'Chapter 10: Muscle Tissue',
    options: ['a myotome', 'an end foot', 'a dermatome', 'an end plate', 'a motor unit']
  },
  {
    id: 'ch10-term-010',
    questionText: 'The type of contraction in which the muscle fibers do not shorten is called',
    answerText: 'isometric',
    category: 'Chapter 10: Muscle Tissue',
    options: ['isotonic', 'isometric', 'concentric', 'treppe', 'tetany']
  },
  {
    id: 'ch10-term-011',
    questionText: 'Creatine phosphate',
    answerText: 'acts as an energy reserve in muscle tissue',
    category: 'Chapter 10: Muscle Tissue',
    options: ['is produced by the process of anaerobic respiration', 'is only formed during strenuous exercise', 'can replace ATP in binding to myosin molecules during contraction', 'acts as an energy reserve in muscle tissue', 'cannot transfer its phosphate to ADP']
  },
  {
    id: 'ch10-term-012',
    questionText: 'Cross-bridges are portions of',
    answerText: 'myosin molecules',
    category: 'Chapter 10: Muscle Tissue',
    options: ['myosin molecules', 'tropomyosin molecules', 'actin molecules', 'calcium ions', 'troponin molecules']
  },
  {
    id: 'ch10-term-013',
    questionText: 'Which statement about the microscopic anatomy of skeletal muscle fibers is true?',
    answerText: 'All of the answer are correct',
    category: 'Chapter 10: Muscle Tissue',
    options: ['muscle fibers are continuous from tendon to tendon', 'Cross striations result from the lateral alignment of thick and thin filaments', 'Each fiber has many nuclei', 'Tubular extensions of the sarcolemma penetrate the fiber transversely', 'All of the answer are correct']
  },
  {
    id: 'ch10-term-014',
    questionText: 'Active sites on the actin become available for binding after',
    answerText: 'calcium binds to troponin',
    category: 'Chapter 10: Muscle Tissue',
    options: ['actin binds to troponin', 'myosin binds to troponin', 'calcium binds to troponin', 'troponin binds to tropomyosin', 'calcium binds to tropomyosin']
  },
  {
    id: 'ch10-term-015',
    questionText: 'In a sarcomere, cross-bridge attachment occurs specifically in the',
    answerText: 'zone of overlap',
    category: 'Chapter 10: Muscle Tissue',
    options: ['A band', 'H band', 'zone of overlap', 'I band', 'M line']
  },

  // --- DIAGRAM QUESTIONS (New) ---
  {
    id: 'ch10-diag-001',
    questionText: 'On the diagram, where is the deep fascia?',
    answerText: 'B',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/FV4bGH5M07nTeViM9GbgcQ.jpg',
    options: ['A', 'B', 'C', 'D', 'E']
  },
  {
    id: 'ch10-diag-002',
    questionText: 'In the diagram, what all comes together as one broad sheet of connective tissue to make the tendon?',
    answerText: 'All of the above',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/FV4bGH5M07nTeViM9GbgcQ.jpg',
    options: ['All of the above', 'Only Epimysium', 'Only Perimysium', 'Only Endomysium']
  },
  {
    id: 'ch10-diag-003',
    questionText: 'In the diagram, what is made from dense irregular connective tissue?',
    answerText: 'None of the above',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/FV4bGH5M07nTeViM9GbgcQ.jpg',
    options: ['A', 'B', 'C', 'None of the above']
  },
  {
    id: 'ch10-diag-004',
    questionText: 'In the diagram, where is the muscle fiber located?',
    answerText: 'F',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/FV4bGH5M07nTeViM9GbgcQ.jpg',
    options: ['D', 'E', 'F', 'C']
  },
  {
    id: 'ch10-diag-005',
    questionText: 'In the diagram, what is made from dense regular connective tissue?',
    answerText: 'A',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/FV4bGH5M07nTeViM9GbgcQ.jpg',
    options: ['A', 'B', 'C', 'D']
  },
  {
    id: 'ch10-diag-006',
    questionText: 'In the diagram, where is the epimysium located?',
    answerText: 'D',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/oDPvJ0ImqQFzllzVk3Htig.jpg',
    options: ['D', 'C', 'E', 'F']
  },
  {
    id: 'ch10-diag-007',
    questionText: 'In the diagram, which parts make up the neuromuscular junction?',
    answerText: 'B, E',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/oDPvJ0ImqQFzllzVk3Htig.jpg',
    options: ['B, E', 'A, C', 'D, F', 'G, H']
  },
  {
    id: 'ch10-diag-008',
    questionText: 'In the diagram, where is the axon collateral?',
    answerText: 'C',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/oDPvJ0ImqQFzllzVk3Htig.jpg',
    options: ['C', 'A', 'B', 'D']
  },
  {
    id: 'ch10-diag-009',
    questionText: 'In the diagram, where is the axon terminal?',
    answerText: 'A',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/oDPvJ0ImqQFzllzVk3Htig.jpg',
    options: ['A', 'B', 'C', 'D']
  },
  {
    id: 'ch10-diag-010',
    questionText: 'In the diagram, where would you find stored Ca2+?',
    answerText: 'F',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/L2OYdzsc1gUIf1qHuK-6Gg.jpg',
    options: ['F', 'G', 'H', 'I']
  },
  {
    id: 'ch10-diag-011',
    questionText: 'In the diagram, where would you find the largest amount of glycogen?',
    answerText: 'M',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/L2OYdzsc1gUIf1qHuK-6Gg.jpg',
    options: ['M', 'A', 'B', 'C']
  },
  {
    id: 'ch10-diag-012',
    questionText: 'In the diagram, what structure is filled with mostly interstitial fluid?',
    answerText: 'D',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/L2OYdzsc1gUIf1qHuK-6Gg.jpg',
    options: ['D', 'E', 'F', 'G']
  },
  {
    id: 'ch10-diag-013',
    questionText: 'In the diagram, where is the mitochondria?',
    answerText: 'B',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/L2OYdzsc1gUIf1qHuK-6Gg.jpg',
    options: ['B', 'A', 'C', 'D']
  },
  {
    id: 'ch10-diag-014',
    questionText: 'In the diagram, where is the endomysium?',
    answerText: 'L',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/L2OYdzsc1gUIf1qHuK-6Gg.jpg',
    options: ['L', 'M', 'N', 'O']
  },
  {
    id: 'ch10-diag-015',
    questionText: 'In the diagram, where is the thick filament?',
    answerText: 'H',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/L2OYdzsc1gUIf1qHuK-6Gg.jpg',
    options: ['H', 'I', 'J', 'K']
  },
  {
    id: 'ch10-diag-016',
    questionText: 'In the diagram, what is the basic functional unit of a myofibril?',
    answerText: 'F',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['F', 'G', 'H', 'I']
  },
  {
    id: 'ch10-diag-017',
    questionText: 'In the diagram, which is only a structural protein?',
    answerText: 'E',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['E', 'A', 'B', 'C']
  },
  {
    id: 'ch10-diag-018',
    questionText: 'In the diagram, which are regulatory proteins?',
    answerText: 'None of the above',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['A', 'B', 'C', 'None of the above']
  },
  {
    id: 'ch10-diag-019',
    questionText: 'In the diagram, which are motor proteins?',
    answerText: 'C',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['C', 'A', 'B', 'D']
  },
  {
    id: 'ch10-diag-020',
    questionText: 'In the diagram, where is the A band?',
    answerText: 'J',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['J', 'I', 'H', 'G']
  },
  {
    id: 'ch10-diag-021',
    questionText: 'In the diagram, where is the I band?',
    answerText: 'G',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['G', 'F', 'E', 'D']
  },
  {
    id: 'ch10-diag-022',
    questionText: 'In the diagram, where is the M line?',
    answerText: 'D',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['D', 'C', 'B', 'A']
  },
  {
    id: 'ch10-diag-023',
    questionText: 'In the diagram, which parts move to the center of the sarcomere (closer together) when the fiber contracts?',
    answerText: 'A',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['A', 'B', 'C', 'D']
  },
  {
    id: 'ch10-diag-024',
    questionText: 'In the diagram, where is the zone of overlap?',
    answerText: 'H',
    category: 'Chapter 10: Muscle Tissue',
    questionImage: '/images/-md9pRF8PP.5GXrkQ82rHQ.jpg',
    options: ['H', 'G', 'F', 'E']
  }
];

const ch10Diagrams = allDiagramQuestions.filter(q => q.category === 'Chapter 10: Muscle Tissue');

export const questions: Question[] = [...baseQuestions, ...ch10Diagrams];
