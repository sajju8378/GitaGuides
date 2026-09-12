import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini client to prevent crashes if GEMINI_API_KEY is not set
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Curated fallbacks for offline or unkeyed requests
const CURATED_MATCHES = [
  {
    keywords: ['work', 'stress', 'outcome', 'result', 'job', 'performance', 'anxiety', 'future', 'deadline', 'salary', 'career', 'effort', 'fail', 'failure', 'burnout'],
    shloka: {
      chapter: 2,
      verse: 47,
      chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
      chapterNameEnglish: 'The Yoga of Analytical Knowledge',
      sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
      transliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana |\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi ||',
      wordMeanings: 'karmaṇi: in prescribed action; eva: only; adhikāraḥ: your right/power; mā: never; phaleṣhu: in the fruits/results; kadāchana: at any time; mā: never; karma-phala-hetuḥ: motivated by results; bhūḥ: become; mā: neither; te: your; saṅgaḥ: attachment; astu: let there be; akarmaṇi: in inaction.',
      translation: 'You have a sacred right to perform your duty, but never to the fruits of action. Never consider yourself the sole cause of the results, and never be attached to inaction.',
      philosophicalContext: 'Sri Krishna instructs Arjuna on Nishkama Karma Yoga—liberating the mind from the anxiety of outcomes and establishing sovereign peace in the action itself.'
    },
    relevanceAnalysis: 'Your anxiety is fueled by trying to control future results, which are determined by myriad cosmic factors. Focusing purely on the excellence of present action dissolves mental tension.',
    krishnaCounsel: 'O Seeker, you exhaust your spirit trying to carry tomorrow upon your shoulders. The future is an unwritten wave, but the present moment is your divine sanctuary. Pour your full love, skill, and integrity into the task before you now. Drop the entitlement to applause or guarantees. When you offer your action with an unburdened heart, the anxiety that shadows you instantly vanishes.',
    practicalDharma: [
      'Write down the single next constructive step you can take today, and let go of predicting next month.',
      'Before beginning work, take one conscious breath and offer your effort: "I act with full presence, releasing the fruit."',
      'Never retreat into paralysis or avoidance; active engagement with detachment is the true path to peace.'
    ],
    meditativeAffirmation: 'कर्मण्येवाधिकारस्ते (Karmaṇy-evādhikāras te) — My sovereignty rests in pure action, free from anxiety of results.'
  },
  {
    keywords: ['mind', 'overthinking', 'racing', 'restless', 'adhd', 'thoughts', 'focus', 'distracted', 'worry'],
    shloka: {
      chapter: 6,
      verse: 35,
      chapterNameSanskrit: 'ध्यान योग (Dhyāna Yoga)',
      chapterNameEnglish: 'The Yoga of Meditation',
      sanskrit: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम्।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥',
      transliteration: 'asaṁśhayaṁ mahā-bāho mano durnigrahaṁ chalam |\nabhyāsena tu kaunteya vairāgyeṇa cha gṛihyate ||',
      wordMeanings: 'asaṁśhayam: without doubt; mahā-bāho: O mighty-armed; manaḥ: mind; durnigraham: hard to rein in; chalam: restless; abhyāsena: through constant practice; tu: but; kaunteya: O son of Kunti; vairāgyeṇa: through detachment/dispassion; cha: and; gṛihyate: is mastered.',
      translation: 'Lord Krishna said: Without doubt, O mighty-armed Arjuna, the mind is restless and difficult to curb. But through steady, compassionate practice (Abhyasa) and non-attachment (Vairagya), it can surely be brought under mastery.',
      philosophicalContext: 'Krishna reassures Arjuna that battling a restless mind is natural for every human being, and outlines the two infallible pillars of mental poise.'
    },
    relevanceAnalysis: 'You are fighting your own mind with frustration. Krishna reminds us that mental stillness requires patient, repetitive gentleness rather than violent self-condemnation.',
    krishnaCounsel: 'Do not punish yourself because your thoughts jump like wild horses! The mind is conditioned by countless impressions. Do not battle it with rage. Each time a fearful or distracted thought pulls you away, simply smile, notice it without judgment, and gently return your attention to your breathing or the sacred vibration of the Tanpura. Patience is the bridge to mastery.',
    practicalDharma: [
      'Commit to 5 minutes of mindful silence every morning without demanding that thoughts completely stop.',
      'When an overthinking loop starts, verbally say "Thinking, thinking" and refocus on physical sensations in your hands and feet.',
      'Practice healthy dispassion (Vairagya): remind yourself that thoughts are merely mental weather, not who you are.'
    ],
    meditativeAffirmation: 'अभ्यासेन वैराग्येण (Abhyāsena Vairāgyeṇa) — Tamed by gentle practice and holy ease.'
  },
  {
    keywords: ['anger', 'angry', 'furious', 'rage', 'resentment', 'betray', 'betrayed', 'cheat', 'hate', 'temper', 'conflict'],
    shloka: {
      chapter: 2,
      verse: 63,
      chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
      chapterNameEnglish: 'The Yoga of Analytical Knowledge',
      sanskrit: 'क्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥',
      transliteration: 'krodhād bhavati sammohaḥ sammohāt smṛiti-vibhramaḥ |\nsmṛiti-bhraṁśhād buddhi-nāśho buddhi-nāśhāt praṇaśhyati ||',
      wordMeanings: 'krodhāt: from anger; bhavati: arises; sammohaḥ: delusion/confusion; sammohāt: from delusion; smṛiti-vibhramaḥ: bewilderment of memory; smṛiti-bhraṁśhāt: from loss of memory; buddhi-nāśhaḥ: destruction of intellect; buddhi-nāśhāt: from ruined intellect; praṇaśhyati: one falls into ruin.',
      translation: 'From anger arises utter delusion; from delusion comes loss of spiritual memory and values; from loss of memory the discriminating intellect is destroyed; and when the intellect is ruined, a person falls into ruin.',
      philosophicalContext: 'The psychological cascade: anger blinds human reason and causes decisions that destroy peace and relationships.'
    },
    relevanceAnalysis: 'Anger feels powerful in the moment, but it is actually a temporary insanity that robs you of your intellect and inner authority. Stepping back preserves your peace.',
    krishnaCounsel: 'Observe the poison in the cup! When you drink anger hoping to punish another, you only scorch your own heart. Look underneath your rage—what unspoken pain or broken expectation is hiding there? Do not speak, strike, or decide while the fire burns. Step into the cool waters of silence. Reclaim your intellect before it is consumed by the storm.',
    practicalDharma: [
      'Implement the 24-hour response moratorium: do not hit send or confront while your pulse is elevated.',
      'Ask: "What expectation of mine was shattered that caused this anger?" Shift from grievance to clear boundaries.',
      'Take 10 long, deep exhalations, silently affirming peace with each release.'
    ],
    meditativeAffirmation: 'शान्तिः शान्तिः शान्तिः (Śhāntiḥ Śhāntiḥ Śhāntiḥ) — I preserve my sacred intellect in stillness.'
  },
  {
    keywords: ['grief', 'death', 'lost', 'loss', 'mourning', 'passed', 'heartbreak', 'breakup', 'crying', 'sadness', 'depressed'],
    shloka: {
      chapter: 2,
      verse: 20,
      chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
      chapterNameEnglish: 'The Yoga of Analytical Knowledge',
      sanskrit: 'न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥',
      transliteration: 'na jāyate mriyate vā kadāchin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śhāśhvato ’yaṁ purāṇo\nna hanyate hanyamāne śharīre ||',
      wordMeanings: 'na: neither; jāyate: is born; mriyate: dies; vā: or; kadāchit: at any time; na: nor; ayam: this soul; bhūtvā: having once existed; bhavitā: ceases to exist; vā na bhūyaḥ: or never again; ajaḥ: unborn; nityaḥ: eternal; śhāśhvataḥ: everlasting; ayam: this; purāṇaḥ: primeval; na hanyate: is not slain; hanyamāne: when being slain; śharīre: in the body.',
      translation: 'The soul is never born, nor does it ever die; having once existed, it never ceases to be. It is unborn, eternal, everlasting, and ancient. It is not slain when the physical body perishes.',
      philosophicalContext: 'Krishna imparts the timeless truth of the imperishable Atman (Soul) to heal Arjuna’s profound grief over losing loved ones.'
    },
    relevanceAnalysis: 'Grief is the painful ache of love meeting physical separation. Recognizing the indestructible nature of consciousness comforts the soul.',
    krishnaCounsel: 'Let your tears fall, for love is sacred; yet do not despair into hopeless darkness. The physical form was a temporary vessel, a sacred guest on earth. That pure presence, that radiant awareness you loved, has not been extinguished—it has merged into the Infinite from which it came. The bond of divine love between souls cannot be severed by mortal death.',
    practicalDharma: [
      'Honor your sorrow as an expression of love, but avoid turning it into bitter hopelessness.',
      'Dedicate an act of service, charity, or quiet prayer in celebration of what they gave to your life.',
      'Remember that you too are an eternal soul passing through this transient world with purpose.'
    ],
    meditativeAffirmation: 'अजो नित्यः शाश्वतोऽयम् (Ajo nityaḥ śhāśhvato ’yam) — Eternal and undying is the sacred soul.'
  },
  {
    keywords: ['lonely', 'alone', 'isolated', 'nobody', 'unloved', 'abandoned', 'hopeless', 'meaningless'],
    shloka: {
      chapter: 9,
      verse: 22,
      chapterNameSanskrit: 'राजविद्याराजगुह्य योग (Rāja-Vidyā Rāja-Guhya Yoga)',
      chapterNameEnglish: 'The Yoga of Sovereign Secret',
      sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
      transliteration: 'ananyāśh chintayanto māṁ ye janāḥ paryupāsate |\nteṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmyaham ||',
      wordMeanings: 'ananyāḥ: with undivided heart; chintayantaḥ: contemplating; mām: upon Me; ye: who; janāḥ: persons; paryupāsate: worship with devotion; teṣhām: of them; nitya-abhiyuktānām: who are ever absorbed; yoga: providing what they lack; kṣhemam: preserving what they have; vahāmi: I carry; aham: I.',
      translation: 'To those who are ever absorbed in contemplation of Me, worshiping with an undivided heart, I personally carry what they lack and preserve what they possess.',
      philosophicalContext: 'The supreme divine assurance that no sincere seeker is ever abandoned or left alone in the universe.'
    },
    relevanceAnalysis: 'Loneliness often makes us feel unanchored and forgotten. This verse reminds you of an eternal companion that breathes in your heart every moment.',
    krishnaCounsel: 'You feel solitary in a crowded world, believing yourself unloved and unheld. But look inward! The divine Indweller (Paramatman) sits in the cave of your heart as your eternal friend, witnessing your every sigh and joy. You are never truly alone. When you turn your attention inward to this presence, a profound warmth fills the empty spaces of your heart.',
    practicalDharma: [
      'Spend 10 minutes in silent communion with the inner Divine, resting as an accepted, cherished soul.',
      'Reach out to one person today not to ask for validation, but to offer a word of genuine encouragement.',
      'Recognize solitude as a sacred monastery for self-discovery rather than a punishment.'
    ],
    meditativeAffirmation: 'योगक्षेमं वहाम्यहम् (Yoga-kṣhemaṁ vahāmyaham) — I am never alone; divine presence sustains my every breath.'
  }
];

// POST /api/guidance
app.post('/api/guidance', async (req, res) => {
  try {
    const { dilemma, category } = req.body;

    if (!dilemma || typeof dilemma !== 'string' || dilemma.trim().length === 0) {
      return res.status(400).json({ error: 'Please share your life problem or question.' });
    }

    const ai = getGenAI();

    if (ai) {
      try {
        const prompt = `You are Sri Krishna speaking directly and compassionately to Arjuna (the seeker) in the Bhagavad Gita.
The seeker comes to you with this modern life dilemma, stress, or moral struggle:
"${dilemma.trim()}" (Category context: ${category || 'general life challenge'}).

Your task:
1. Identify the spiritual/psychological root of this struggle according to the Bhagavad Gita (e.g. attachment to outcomes, delusion from anger, confusion over duty, grief over impermanence, restless senses, fear of failure, loneliness).
2. Match the exact, most relevant shloka from the Bhagavad Gita that provides the remedy.
3. Provide the shloka in Devanagari Sanskrit, Roman transliteration, word meanings, and English translation.
4. Give Sri Krishna's direct compassionate message to the seeker today ("O Seeker...").
5. Provide 3 practical, actionable Dharma practices/habits they can practice today.
6. Provide a short Sanskrit Meditative Affirmation (Dhyana Mantra) for contemplation.

Respond with strict JSON matching this schema:
{
  "matchedShloka": {
    "chapter": number,
    "verse": number,
    "chapterNameSanskrit": string,
    "chapterNameEnglish": string,
    "sanskrit": string,
    "transliteration": string,
    "wordMeanings": string,
    "translation": string,
    "philosophicalContext": string
  },
  "relevanceAnalysis": string,
  "krishnaCounsel": string,
  "practicalDharma": [string, string, string],
  "meditativeAffirmation": string
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are the divine, compassionate, and eternally wise voice of Sri Krishna from the Bhagavad Gita. Speak with supreme grace, psychological depth, and clarity.',
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                matchedShloka: {
                  type: Type.OBJECT,
                  properties: {
                    chapter: { type: Type.INTEGER },
                    verse: { type: Type.INTEGER },
                    chapterNameSanskrit: { type: Type.STRING },
                    chapterNameEnglish: { type: Type.STRING },
                    sanskrit: { type: Type.STRING },
                    transliteration: { type: Type.STRING },
                    wordMeanings: { type: Type.STRING },
                    translation: { type: Type.STRING },
                    philosophicalContext: { type: Type.STRING }
                  },
                  required: ['chapter', 'verse', 'chapterNameSanskrit', 'chapterNameEnglish', 'sanskrit', 'transliteration', 'wordMeanings', 'translation', 'philosophicalContext']
                },
                relevanceAnalysis: { type: Type.STRING },
                krishnaCounsel: { type: Type.STRING },
                practicalDharma: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                meditativeAffirmation: { type: Type.STRING }
              },
              required: ['matchedShloka', 'relevanceAnalysis', 'krishnaCounsel', 'practicalDharma', 'meditativeAffirmation']
            }
          }
        });

        const rawText = response.text?.trim();
        if (rawText) {
          const parsed = JSON.parse(rawText);
          return res.json({
            isAiEnhanced: true,
            seekerDilemma: dilemma,
            shloka: {
              id: `bg-${parsed.matchedShloka.chapter}-${parsed.matchedShloka.verse}`,
              ...parsed.matchedShloka,
              krishnaCounsel: parsed.krishnaCounsel,
              practicalDharma: parsed.practicalDharma,
              meditativeAffirmation: parsed.meditativeAffirmation,
              category: (category as string) || 'peace',
              tags: ['gita', 'wisdom', 'guidance']
            },
            relevanceAnalysis: parsed.relevanceAnalysis,
            krishnaCounselCustom: parsed.krishnaCounsel,
            practicalDharmaCustom: parsed.practicalDharma
          });
        }
      } catch (geminiError) {
        console.warn('Gemini API call encountered an error, using curated wisdom database:', geminiError);
      }
    }

    // Curated fallback matching algorithm
    const lower = dilemma.toLowerCase();
    let bestMatch = CURATED_MATCHES[0];
    let maxMatches = 0;

    for (const item of CURATED_MATCHES) {
      let score = 0;
      for (const kw of item.keywords) {
        if (lower.includes(kw)) {
          score++;
        }
      }
      if (score > maxMatches) {
        maxMatches = score;
        bestMatch = item;
      }
    }

    return res.json({
      isAiEnhanced: false,
      seekerDilemma: dilemma,
      shloka: {
        id: `bg-${bestMatch.shloka.chapter}-${bestMatch.shloka.verse}`,
        ...bestMatch.shloka,
        krishnaCounsel: bestMatch.krishnaCounsel,
        practicalDharma: bestMatch.practicalDharma,
        meditativeAffirmation: bestMatch.meditativeAffirmation,
        category: (category as string) || 'anxiety',
        tags: ['gita', 'dharma', 'guidance']
      },
      relevanceAnalysis: bestMatch.relevanceAnalysis,
      krishnaCounselCustom: bestMatch.krishnaCounsel,
      practicalDharmaCustom: bestMatch.practicalDharma
    });
  } catch (err: unknown) {
    console.error('Error in /api/guidance:', err);
    res.status(500).json({ error: 'Failed to seek guidance. Please try again.' });
  }
});

// GET /api/health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Setup Vite middleware for development or static serving for production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Bhagavad Gita Guidance server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
