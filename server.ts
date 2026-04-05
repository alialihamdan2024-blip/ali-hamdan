import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createServer as createViteServer } from 'vite';

// Import Types
import { Question } from './types';

// Import Data
import { questions as ch1 } from './hooks/data_ch1';
import { questions as ch2 } from './hooks/data_ch2';
import { questions as ch3 } from './hooks/data_ch3';
import { questions as ch4 } from './hooks/data_ch4';
import { questions as ch5 } from './hooks/data_ch5';
import { questions as ch6 } from './hooks/data_ch6';
import { questions as ch7 } from './hooks/data_ch7';
import { questions as ch8 } from './hooks/data_ch8';
import { questions as ch9 } from './hooks/data_ch9';
import { questions as ch10 } from './hooks/data_ch10';
import { questions as ch11 } from './hooks/data_ch11';
import { questions as ch12 } from './hooks/data_ch12';
import { questions as ch13 } from './hooks/data_ch13';
import { questions as ch14 } from './hooks/data_ch14';
import { questions as ch15 } from './hooks/data_ch15';
import { questions as ch16 } from './hooks/data_ch16';
import { questions as ch17 } from './hooks/data_ch17';
import { questions as boostQuestions } from './hooks/data_utilization_boost';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// --- DATA PROCESSING LOGIC ---
const rawSources = [
    ...ch1, ...ch2, ...ch3, ...ch4, ...ch5, ...ch6, 
    ...ch7, ...ch8, ...ch9, ...ch10, ...ch11, ...ch12, ...ch13, ...ch14, ...ch15, ...ch16, ...ch17,
    ...boostQuestions
];

const processQuestions = () => {
    const uniqueQuestions: Question[] = [];
    const seenIds = new Set<string>();
    let fixedCount = 0;
    let generatedRationaleCount = 0;

    const clean = (str: string | undefined) => str ? str.trim().replace(/\s+/g, ' ') : '';
    const categoryAnswerPools: Record<string, string[]> = {};

    // First pass: Build highly specific pools for distractors
    const globalAnswerPool: string[] = [];
    
    rawSources.forEach(q => {
        const cat = q.category || 'General';
        if (!categoryAnswerPools[cat]) categoryAnswerPools[cat] = [];
        const ans = clean(q.answerText);
        if (ans && ans.length < 80) {
            categoryAnswerPools[cat].push(ans);
            globalAnswerPool.push(ans);
        }
    });

    // Second pass: Process questions and generate SMART options & RATIONALES
    rawSources.forEach(q => {
        if (!seenIds.has(q.id)) {
            let explanation = clean(q.explanation);
            let answer = clean(q.answerText);
            const question = clean(q.questionText);

            // FALLBACK: If answer is missing, do not delete. Set placeholder.
            if (!answer) {
                answer = "Correct Answer";
                fixedCount++;
            }

            // --- SMART RATIONALE GENERATOR ---
            if (!explanation) {
                generatedRationaleCount++;
                const qTextLower = question.toLowerCase();
                const topic = q.category.includes(':') ? q.category.split(':')[1].trim() : q.category;

                if (question.startsWith("Define") || qTextLower.includes("definition") || qTextLower.includes("what is")) {
                     explanation = `<strong>Definition:</strong> <strong>${answer}</strong> is the precise scientific definition. Mastery of this terminology is essential for accurate communication in the context of ${topic}.`;
                }
                else if (question.startsWith("Anatomical term")) {
                     const target = question.split(':')[1]?.trim() || 'the indicated region';
                     explanation = `<strong>Anatomical Terminology:</strong> The standard medical term for "${target}" is <strong>${answer}</strong>. Using specific directional and regional terminology eliminates ambiguity in clinical practice.`;
                }
                else if (qTextLower.includes("identify") || qTextLower.includes("diagram") || qTextLower.includes("shown") || qTextLower.includes("labeled")) {
                    explanation = `<strong>Anatomical Identification:</strong> The structure indicated is the <strong>${answer}</strong>. Identification is based on its unique morphology and spatial relationship to adjacent landmarks within the ${topic}.`;
                } 
                else if (qTextLower.includes("function") || qTextLower.includes("action") || qTextLower.includes("role") || qTextLower.includes("physiology") || qTextLower.includes("do?")) {
                    explanation = `<strong>Physiological Mechanism:</strong> The primary function of <strong>${answer}</strong> is described here. This mechanism is integral to the homeostatic operation of ${topic}.`;
                }
                else if (qTextLower.includes("located") || qTextLower.includes("found") || qTextLower.includes("where")) {
                    explanation = `<strong>Spatial Anatomy:</strong> <strong>${answer}</strong> is situated in this specific region. Knowledge of anatomical planes and relationships is critical for surgical and diagnostic localization.`;
                } 
                else if (qTextLower.includes("composed of") || qTextLower.includes("made of") || qTextLower.includes("type of tissue")) {
                    explanation = `<strong>Histological Structure:</strong> <strong>${answer}</strong> is the correct tissue or chemical classification. The structural composition directly dictates the functional capabilities of this component.`;
                }
                else if (qTextLower.includes("order") || qTextLower.includes("sequence") || qTextLower.includes("pathway")) {
                    explanation = `<strong>Sequential Process:</strong> The correct order is <strong>${answer}</strong>. Physiological processes often rely on a specific cascade of events to function correctly.`;
                }
                else if (qTextLower.includes("nerve") || qTextLower.includes("neuron") || qTextLower.includes("potential") || qTextLower.includes("signal") || qTextLower.includes("synapse") || qTextLower.includes("neurotransmitter")) {
                    explanation = `<strong>Neural Integration:</strong> The correct answer is <strong>${answer}</strong>. This process involves the summing of Excitatory Postsynaptic Potentials (EPSPs) and Inhibitory Postsynaptic Potentials (IPSPs) at the trigger zone. This concept is fundamental to understanding how the nervous system processes information.`;
                }
                else {
                    explanation = `<strong>Core Concept:</strong> The correct answer is <strong>${answer}</strong>. This choice best fits the criteria described, distinguishing it from the distractors based on fundamental principles of ${topic}. This concept is fundamental to mastering the subject matter.`;
                }
            }

            const cleanQ: Question = {
                ...q,
                questionText: question,
                answerText: answer,
                explanation: explanation,
                options: (q.options || []).map(clean).filter(Boolean)
            };

            // Proxy Image URL
            if (cleanQ.questionImage) {
                // Filter out images with specific copyright watermarks (NiZOOM & Miller)
                // Since the text is on the image, we can't filter by text content easily.
                // However, we can provide a mechanism to ban specific URLs if identified.
                const bannedUrls = [
                    // Add specific URLs here if they are identified as having the watermark
                    'https://o.quizlet.com/p3U3hgyPuP-NV4n4VhJFYg.png', // Example of a potentially problematic image
                ];

                if (bannedUrls.includes(cleanQ.questionImage)) {
                    cleanQ.questionImage = undefined;
                } else {
                    cleanQ.questionImage = `/api/proxy-image?url=${encodeURIComponent(cleanQ.questionImage)}`;
                }
            }

            // DATA INTEGRITY CHECK: Ensure Answer is in Options
            if (cleanQ.options.length > 0) {
               const matchIndex = cleanQ.options.findIndex(o => o.toLowerCase() === cleanQ.answerText.toLowerCase());
               
               if (matchIndex === -1) {
                   fixedCount++;
                   // If we have 4+ options, replace one. If fewer, add it.
                   if (cleanQ.options.length >= 4) {
                       const replaceIdx = Math.floor(Math.random() * cleanQ.options.length);
                       cleanQ.options[replaceIdx] = cleanQ.answerText;
                   } else {
                       cleanQ.options.push(cleanQ.answerText);
                   }
               } else {
                   // Ensure exact string match for === comparison
                   cleanQ.options[matchIndex] = cleanQ.answerText;
               }
            }

            // DATA INTEGRITY CHECK: Ensure Minimum 2 Options (Answer + Distractor)
            // Use category pool first, then global pool
            if (cleanQ.options.length < 2) {
                fixedCount++;
                const cat = q.category || 'General';
                let pool = categoryAnswerPools[cat] || [];
                
                // If category pool is too small, mix in global pool
                if (pool.length < 5) {
                    pool = [...pool, ...globalAnswerPool];
                }

                const distractors = pool
                    .filter(a => a.toLowerCase() !== cleanQ.answerText.toLowerCase())
                    .sort(() => 0.5 - Math.random())
                    .slice(0, 3); // Get up to 3 distractors
                
                // If we still have no distractors (unlikely), add generic ones
                if (distractors.length === 0) {
                    distractors.push("Option B", "Option C", "Option D");
                }
                
                cleanQ.options = [cleanQ.answerText, ...distractors].sort(() => 0.5 - Math.random());
            }
            
            // Final Sanity Check: Ensure options are unique
            cleanQ.options = Array.from(new Set(cleanQ.options));
            
            // If deduplication removed the answer (unlikely but possible if answer was "Option A" and "Option A" was in distractors), put it back
            if (!cleanQ.options.includes(cleanQ.answerText)) {
                 if (cleanQ.options.length >= 4) cleanQ.options.pop();
                 cleanQ.options.push(cleanQ.answerText);
            }

            uniqueQuestions.push(cleanQ);
            seenIds.add(cleanQ.id);
        }
    });

    console.log(`[DATA ENGINE] Processed ${uniqueQuestions.length} questions.`);
    console.log(`[DATA ENGINE] Fixed ${fixedCount} data integrity issues (missing answers/options).`);
    console.log(`[DATA ENGINE] Generated ${generatedRationaleCount} smart rationales.`);

    return uniqueQuestions;
};

// Cache the processed questions
const processedQuestions = processQuestions();

// --- API ROUTES ---

app.get('/api/questions', (req, res) => {
    res.json(processedQuestions);
});

app.get('/api/proxy-image', async (req, res) => {
    const imageUrl = req.query.url as string;

    if (!imageUrl) {
        return res.status(400).send('Missing url parameter');
    }

    // SECURITY: Prevent Server-Side Request Forgery (SSRF)
    try {
        const parsedUrl = new URL(imageUrl);
        const allowedDomains = ['o.quizlet.com', 'quizlet.com', 'wsrv.nl']; // Allowed image sources
        
        if (!allowedDomains.includes(parsedUrl.hostname)) {
            return res.status(403).send('Forbidden: Image domain not allowed');
        }
        if (parsedUrl.protocol !== 'https:') {
            return res.status(403).send('Forbidden: Only HTTPS is allowed');
        }
    } catch (e) {
        return res.status(400).send('Invalid URL format');
    }

    try {
        const response = await axios({
            method: 'get',
            url: imageUrl,
            responseType: 'stream',
            headers: {
                // Mimic a browser to avoid blocking
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
                'Referer': 'https://quizlet.com/' 
            }
        });

        // Forward content type
        res.set('Content-Type', response.headers['content-type']);
        res.set('Cache-Control', 'public, max-age=31536000'); // Cache for 1 year

        response.data.pipe(res);
    } catch (error) {
        console.error('Error proxying image:', imageUrl, error);
        // Fallback: Redirect to original URL if proxy fails
        res.redirect(imageUrl);
    }
});

// --- VITE MIDDLEWARE ---
async function startServer() {
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { 
                middlewareMode: true,
                hmr: false
            },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    } else {
        // Production static serving (if built)
        // For now, we assume dev mode or handle static files appropriately
        // But since we are running `tsx server.ts` in dev, this block handles dev.
    }

    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();
