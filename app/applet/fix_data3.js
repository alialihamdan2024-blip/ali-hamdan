const fs = require('fs');
const files = ['hooks/data_ch7.ts', 'hooks/data_ch8.ts', 'hooks/data_ch9.ts', 'hooks/data_skeleton.ts', 'hooks/data_chapter_all.ts'];

const textCounts = {};
for (const file of files) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  const textRegex = /questionText:\s*'([^']+)'/g;
  let match;
  while ((match = textRegex.exec(content)) !== null) {
    let text = match[1];
    let baseText = text.replace(/\s*\(Variant \d+\)$/, '');
    textCounts[baseText] = (textCounts[baseText] || 0) + 1;
  }
}

const textSeen = {};
let globalIdCounts = {};

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');

  content = content.replace(/id:\s*'([^']+)'/g, (match, id) => {
    globalIdCounts[id] = (globalIdCounts[id] || 0) + 1;
    if (globalIdCounts[id] > 1) {
      return `id: '${id}b'`;
    }
    return match;
  });

  content = content.replace(/(id:\s*'[^']+',[\s\S]*?)(?=\n\s*},|\n\s*})/g, (match) => {
    if (!match.includes('options:')) {
      return match + ',\n    options: []';
    }
    return match;
  });

  content = content.replace(/(answerText:\s*')([^']+)('[\s\S]*?options:\s*\[)([\s\S]*?)(\])/g, (match, p1, answer, p3, optionsStr, p5) => {
    let options = [];
    let currentOpt = '';
    let inQuote = false;
    for (let i = 0; i < optionsStr.length; i++) {
      if (optionsStr[i] === "'") {
        inQuote = !inQuote;
      } else if (optionsStr[i] === ',' && !inQuote) {
        options.push(currentOpt.trim());
        currentOpt = '';
      } else {
        currentOpt += optionsStr[i];
      }
    }
    if (currentOpt.trim()) options.push(currentOpt.trim());
    options = options.map(o => o.replace(/^'|'$/g, '').replace(/^"|"$/g, ''));

    if (options.length > 0 && !options.includes(answer)) {
      let lowerAnswer = answer.toLowerCase().replace(/[^a-z0-9]/g, '');
      for (let opt of options) {
        let lowerOpt = opt.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (lowerAnswer === lowerOpt || lowerOpt.includes(lowerAnswer) || lowerAnswer.includes(lowerOpt)) {
          return p1 + opt + p3 + optionsStr + p5;
        }
      }
    }
    return match;
  });

  content = content.replace(/questionText:\s*'([^']+)'/g, (match, text) => {
    let baseText = text.replace(/\s*\(Variant \d+\)$/, '');
    if (textCounts[baseText] > 1) {
      textSeen[baseText] = (textSeen[baseText] || 0) + 1;
      return `questionText: '${baseText} (Variant ${textSeen[baseText]})'`;
    }
    return match;
  });

  fs.writeFileSync(file, content, 'utf8');
}
console.log('All fixes applied successfully.');
