var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_dotenv = __toESM(require("dotenv"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var genAIClient = null;
function getGenAI() {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!genAIClient) {
    genAIClient = new import_genai.GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return genAIClient;
}
var CURATED_MATCHES = [
  {
    keywords: ["work", "stress", "outcome", "result", "job", "performance", "anxiety", "future", "deadline", "salary", "career", "effort", "fail", "failure", "burnout"],
    shloka: {
      chapter: 2,
      verse: 47,
      chapterNameSanskrit: "\u0938\u093E\u0919\u094D\u0916\u094D\u092F \u092F\u094B\u0917 (S\u0101\u1E45khya Yoga)",
      chapterNameEnglish: "The Yoga of Analytical Knowledge",
      sanskrit: "\u0915\u0930\u094D\u092E\u0923\u094D\u092F\u0947\u0935\u093E\u0927\u093F\u0915\u093E\u0930\u0938\u094D\u0924\u0947 \u092E\u093E \u092B\u0932\u0947\u0937\u0941 \u0915\u0926\u093E\u091A\u0928\u0964\n\u092E\u093E \u0915\u0930\u094D\u092E\u092B\u0932\u0939\u0947\u0924\u0941\u0930\u094D\u092D\u0942\u0930\u094D\u092E\u093E \u0924\u0947 \u0938\u0919\u094D\u0917\u094B\u093D\u0938\u094D\u0924\u094D\u0935\u0915\u0930\u094D\u092E\u0923\u093F\u0965",
      transliteration: "karma\u1E47y-ev\u0101dhik\u0101ras te m\u0101 phale\u1E63hu kad\u0101chana |\nm\u0101 karma-phala-hetur bh\u016Br m\u0101 te sa\u1E45go \u2019stvakarma\u1E47i ||",
      wordMeanings: "karma\u1E47i: in prescribed action; eva: only; adhik\u0101ra\u1E25: your right/power; m\u0101: never; phale\u1E63hu: in the fruits/results; kad\u0101chana: at any time; m\u0101: never; karma-phala-hetu\u1E25: motivated by results; bh\u016B\u1E25: become; m\u0101: neither; te: your; sa\u1E45ga\u1E25: attachment; astu: let there be; akarma\u1E47i: in inaction.",
      translation: "You have a sacred right to perform your duty, but never to the fruits of action. Never consider yourself the sole cause of the results, and never be attached to inaction.",
      philosophicalContext: "Sri Krishna instructs Arjuna on Nishkama Karma Yoga\u2014liberating the mind from the anxiety of outcomes and establishing sovereign peace in the action itself."
    },
    relevanceAnalysis: "Your anxiety is fueled by trying to control future results, which are determined by myriad cosmic factors. Focusing purely on the excellence of present action dissolves mental tension.",
    krishnaCounsel: "O Seeker, you exhaust your spirit trying to carry tomorrow upon your shoulders. The future is an unwritten wave, but the present moment is your divine sanctuary. Pour your full love, skill, and integrity into the task before you now. Drop the entitlement to applause or guarantees. When you offer your action with an unburdened heart, the anxiety that shadows you instantly vanishes.",
    practicalDharma: [
      "Write down the single next constructive step you can take today, and let go of predicting next month.",
      'Before beginning work, take one conscious breath and offer your effort: "I act with full presence, releasing the fruit."',
      "Never retreat into paralysis or avoidance; active engagement with detachment is the true path to peace."
    ],
    meditativeAffirmation: "\u0915\u0930\u094D\u092E\u0923\u094D\u092F\u0947\u0935\u093E\u0927\u093F\u0915\u093E\u0930\u0938\u094D\u0924\u0947 (Karma\u1E47y-ev\u0101dhik\u0101ras te) \u2014 My sovereignty rests in pure action, free from anxiety of results."
  },
  {
    keywords: ["mind", "overthinking", "racing", "restless", "adhd", "thoughts", "focus", "distracted", "worry"],
    shloka: {
      chapter: 6,
      verse: 35,
      chapterNameSanskrit: "\u0927\u094D\u092F\u093E\u0928 \u092F\u094B\u0917 (Dhy\u0101na Yoga)",
      chapterNameEnglish: "The Yoga of Meditation",
      sanskrit: "\u0905\u0938\u0902\u0936\u092F\u0902 \u092E\u0939\u093E\u092C\u093E\u0939\u094B \u092E\u0928\u094B \u0926\u0941\u0930\u094D\u0928\u093F\u0917\u094D\u0930\u0939\u0902 \u091A\u0932\u092E\u094D\u0964\n\u0905\u092D\u094D\u092F\u093E\u0938\u0947\u0928 \u0924\u0941 \u0915\u094C\u0928\u094D\u0924\u0947\u092F \u0935\u0948\u0930\u093E\u0917\u094D\u092F\u0947\u0923 \u091A \u0917\u0943\u0939\u094D\u092F\u0924\u0947\u0965",
      transliteration: "asa\u1E41\u015Bhaya\u1E41 mah\u0101-b\u0101ho mano durnigraha\u1E41 chalam |\nabhy\u0101sena tu kaunteya vair\u0101gye\u1E47a cha g\u1E5Bihyate ||",
      wordMeanings: "asa\u1E41\u015Bhayam: without doubt; mah\u0101-b\u0101ho: O mighty-armed; mana\u1E25: mind; durnigraham: hard to rein in; chalam: restless; abhy\u0101sena: through constant practice; tu: but; kaunteya: O son of Kunti; vair\u0101gye\u1E47a: through detachment/dispassion; cha: and; g\u1E5Bihyate: is mastered.",
      translation: "Lord Krishna said: Without doubt, O mighty-armed Arjuna, the mind is restless and difficult to curb. But through steady, compassionate practice (Abhyasa) and non-attachment (Vairagya), it can surely be brought under mastery.",
      philosophicalContext: "Krishna reassures Arjuna that battling a restless mind is natural for every human being, and outlines the two infallible pillars of mental poise."
    },
    relevanceAnalysis: "You are fighting your own mind with frustration. Krishna reminds us that mental stillness requires patient, repetitive gentleness rather than violent self-condemnation.",
    krishnaCounsel: "Do not punish yourself because your thoughts jump like wild horses! The mind is conditioned by countless impressions. Do not battle it with rage. Each time a fearful or distracted thought pulls you away, simply smile, notice it without judgment, and gently return your attention to your breathing or the sacred vibration of the Tanpura. Patience is the bridge to mastery.",
    practicalDharma: [
      "Commit to 5 minutes of mindful silence every morning without demanding that thoughts completely stop.",
      'When an overthinking loop starts, verbally say "Thinking, thinking" and refocus on physical sensations in your hands and feet.',
      "Practice healthy dispassion (Vairagya): remind yourself that thoughts are merely mental weather, not who you are."
    ],
    meditativeAffirmation: "\u0905\u092D\u094D\u092F\u093E\u0938\u0947\u0928 \u0935\u0948\u0930\u093E\u0917\u094D\u092F\u0947\u0923 (Abhy\u0101sena Vair\u0101gye\u1E47a) \u2014 Tamed by gentle practice and holy ease."
  },
  {
    keywords: ["anger", "angry", "furious", "rage", "resentment", "betray", "betrayed", "cheat", "hate", "temper", "conflict"],
    shloka: {
      chapter: 2,
      verse: 63,
      chapterNameSanskrit: "\u0938\u093E\u0919\u094D\u0916\u094D\u092F \u092F\u094B\u0917 (S\u0101\u1E45khya Yoga)",
      chapterNameEnglish: "The Yoga of Analytical Knowledge",
      sanskrit: "\u0915\u094D\u0930\u094B\u0927\u093E\u0926\u094D\u092D\u0935\u0924\u093F \u0938\u092E\u094D\u092E\u094B\u0939\u0903 \u0938\u092E\u094D\u092E\u094B\u0939\u093E\u0924\u094D\u0938\u094D\u092E\u0943\u0924\u093F\u0935\u093F\u092D\u094D\u0930\u092E\u0903\u0964\n\u0938\u094D\u092E\u0943\u0924\u093F\u092D\u094D\u0930\u0902\u0936\u093E\u0926\u094D \u092C\u0941\u0926\u094D\u0927\u093F\u0928\u093E\u0936\u094B \u092C\u0941\u0926\u094D\u0927\u093F\u0928\u093E\u0936\u093E\u0924\u094D\u092A\u094D\u0930\u0923\u0936\u094D\u092F\u0924\u093F\u0965",
      transliteration: "krodh\u0101d bhavati sammoha\u1E25 sammoh\u0101t sm\u1E5Biti-vibhrama\u1E25 |\nsm\u1E5Biti-bhra\u1E41\u015Bh\u0101d buddhi-n\u0101\u015Bho buddhi-n\u0101\u015Bh\u0101t pra\u1E47a\u015Bhyati ||",
      wordMeanings: "krodh\u0101t: from anger; bhavati: arises; sammoha\u1E25: delusion/confusion; sammoh\u0101t: from delusion; sm\u1E5Biti-vibhrama\u1E25: bewilderment of memory; sm\u1E5Biti-bhra\u1E41\u015Bh\u0101t: from loss of memory; buddhi-n\u0101\u015Bha\u1E25: destruction of intellect; buddhi-n\u0101\u015Bh\u0101t: from ruined intellect; pra\u1E47a\u015Bhyati: one falls into ruin.",
      translation: "From anger arises utter delusion; from delusion comes loss of spiritual memory and values; from loss of memory the discriminating intellect is destroyed; and when the intellect is ruined, a person falls into ruin.",
      philosophicalContext: "The psychological cascade: anger blinds human reason and causes decisions that destroy peace and relationships."
    },
    relevanceAnalysis: "Anger feels powerful in the moment, but it is actually a temporary insanity that robs you of your intellect and inner authority. Stepping back preserves your peace.",
    krishnaCounsel: "Observe the poison in the cup! When you drink anger hoping to punish another, you only scorch your own heart. Look underneath your rage\u2014what unspoken pain or broken expectation is hiding there? Do not speak, strike, or decide while the fire burns. Step into the cool waters of silence. Reclaim your intellect before it is consumed by the storm.",
    practicalDharma: [
      "Implement the 24-hour response moratorium: do not hit send or confront while your pulse is elevated.",
      'Ask: "What expectation of mine was shattered that caused this anger?" Shift from grievance to clear boundaries.',
      "Take 10 long, deep exhalations, silently affirming peace with each release."
    ],
    meditativeAffirmation: "\u0936\u093E\u0928\u094D\u0924\u093F\u0903 \u0936\u093E\u0928\u094D\u0924\u093F\u0903 \u0936\u093E\u0928\u094D\u0924\u093F\u0903 (\u015Ah\u0101nti\u1E25 \u015Ah\u0101nti\u1E25 \u015Ah\u0101nti\u1E25) \u2014 I preserve my sacred intellect in stillness."
  },
  {
    keywords: ["grief", "death", "lost", "loss", "mourning", "passed", "heartbreak", "breakup", "crying", "sadness", "depressed"],
    shloka: {
      chapter: 2,
      verse: 20,
      chapterNameSanskrit: "\u0938\u093E\u0919\u094D\u0916\u094D\u092F \u092F\u094B\u0917 (S\u0101\u1E45khya Yoga)",
      chapterNameEnglish: "The Yoga of Analytical Knowledge",
      sanskrit: "\u0928 \u091C\u093E\u092F\u0924\u0947 \u092E\u094D\u0930\u093F\u092F\u0924\u0947 \u0935\u093E \u0915\u0926\u093E\u091A\u093F\u0928\u094D\n\u0928\u093E\u092F\u0902 \u092D\u0942\u0924\u094D\u0935\u093E \u092D\u0935\u093F\u0924\u093E \u0935\u093E \u0928 \u092D\u0942\u092F\u0903\u0964\n\u0905\u091C\u094B \u0928\u093F\u0924\u094D\u092F\u0903 \u0936\u093E\u0936\u094D\u0935\u0924\u094B\u093D\u092F\u0902 \u092A\u0941\u0930\u093E\u0923\u094B\n\u0928 \u0939\u0928\u094D\u092F\u0924\u0947 \u0939\u0928\u094D\u092F\u092E\u093E\u0928\u0947 \u0936\u0930\u0940\u0930\u0947\u0965",
      transliteration: "na j\u0101yate mriyate v\u0101 kad\u0101chin\nn\u0101ya\u1E41 bh\u016Btv\u0101 bhavit\u0101 v\u0101 na bh\u016Bya\u1E25 |\najo nitya\u1E25 \u015Bh\u0101\u015Bhvato \u2019ya\u1E41 pur\u0101\u1E47o\nna hanyate hanyam\u0101ne \u015Bhar\u012Bre ||",
      wordMeanings: "na: neither; j\u0101yate: is born; mriyate: dies; v\u0101: or; kad\u0101chit: at any time; na: nor; ayam: this soul; bh\u016Btv\u0101: having once existed; bhavit\u0101: ceases to exist; v\u0101 na bh\u016Bya\u1E25: or never again; aja\u1E25: unborn; nitya\u1E25: eternal; \u015Bh\u0101\u015Bhvata\u1E25: everlasting; ayam: this; pur\u0101\u1E47a\u1E25: primeval; na hanyate: is not slain; hanyam\u0101ne: when being slain; \u015Bhar\u012Bre: in the body.",
      translation: "The soul is never born, nor does it ever die; having once existed, it never ceases to be. It is unborn, eternal, everlasting, and ancient. It is not slain when the physical body perishes.",
      philosophicalContext: "Krishna imparts the timeless truth of the imperishable Atman (Soul) to heal Arjuna\u2019s profound grief over losing loved ones."
    },
    relevanceAnalysis: "Grief is the painful ache of love meeting physical separation. Recognizing the indestructible nature of consciousness comforts the soul.",
    krishnaCounsel: "Let your tears fall, for love is sacred; yet do not despair into hopeless darkness. The physical form was a temporary vessel, a sacred guest on earth. That pure presence, that radiant awareness you loved, has not been extinguished\u2014it has merged into the Infinite from which it came. The bond of divine love between souls cannot be severed by mortal death.",
    practicalDharma: [
      "Honor your sorrow as an expression of love, but avoid turning it into bitter hopelessness.",
      "Dedicate an act of service, charity, or quiet prayer in celebration of what they gave to your life.",
      "Remember that you too are an eternal soul passing through this transient world with purpose."
    ],
    meditativeAffirmation: "\u0905\u091C\u094B \u0928\u093F\u0924\u094D\u092F\u0903 \u0936\u093E\u0936\u094D\u0935\u0924\u094B\u093D\u092F\u092E\u094D (Ajo nitya\u1E25 \u015Bh\u0101\u015Bhvato \u2019yam) \u2014 Eternal and undying is the sacred soul."
  },
  {
    keywords: ["lonely", "alone", "isolated", "nobody", "unloved", "abandoned", "hopeless", "meaningless"],
    shloka: {
      chapter: 9,
      verse: 22,
      chapterNameSanskrit: "\u0930\u093E\u091C\u0935\u093F\u0926\u094D\u092F\u093E\u0930\u093E\u091C\u0917\u0941\u0939\u094D\u092F \u092F\u094B\u0917 (R\u0101ja-Vidy\u0101 R\u0101ja-Guhya Yoga)",
      chapterNameEnglish: "The Yoga of Sovereign Secret",
      sanskrit: "\u0905\u0928\u0928\u094D\u092F\u093E\u0936\u094D\u091A\u093F\u0928\u094D\u0924\u092F\u0928\u094D\u0924\u094B \u092E\u093E\u0902 \u092F\u0947 \u091C\u0928\u093E\u0903 \u092A\u0930\u094D\u092F\u0941\u092A\u093E\u0938\u0924\u0947\u0964\n\u0924\u0947\u0937\u093E\u0902 \u0928\u093F\u0924\u094D\u092F\u093E\u092D\u093F\u092F\u0941\u0915\u094D\u0924\u093E\u0928\u093E\u0902 \u092F\u094B\u0917\u0915\u094D\u0937\u0947\u092E\u0902 \u0935\u0939\u093E\u092E\u094D\u092F\u0939\u092E\u094D\u0965",
      transliteration: "anany\u0101\u015Bh chintayanto m\u0101\u1E41 ye jan\u0101\u1E25 paryup\u0101sate |\nte\u1E63h\u0101\u1E41 nity\u0101bhiyukt\u0101n\u0101\u1E41 yoga-k\u1E63hema\u1E41 vah\u0101myaham ||",
      wordMeanings: "anany\u0101\u1E25: with undivided heart; chintayanta\u1E25: contemplating; m\u0101m: upon Me; ye: who; jan\u0101\u1E25: persons; paryup\u0101sate: worship with devotion; te\u1E63h\u0101m: of them; nitya-abhiyukt\u0101n\u0101m: who are ever absorbed; yoga: providing what they lack; k\u1E63hemam: preserving what they have; vah\u0101mi: I carry; aham: I.",
      translation: "To those who are ever absorbed in contemplation of Me, worshiping with an undivided heart, I personally carry what they lack and preserve what they possess.",
      philosophicalContext: "The supreme divine assurance that no sincere seeker is ever abandoned or left alone in the universe."
    },
    relevanceAnalysis: "Loneliness often makes us feel unanchored and forgotten. This verse reminds you of an eternal companion that breathes in your heart every moment.",
    krishnaCounsel: "You feel solitary in a crowded world, believing yourself unloved and unheld. But look inward! The divine Indweller (Paramatman) sits in the cave of your heart as your eternal friend, witnessing your every sigh and joy. You are never truly alone. When you turn your attention inward to this presence, a profound warmth fills the empty spaces of your heart.",
    practicalDharma: [
      "Spend 10 minutes in silent communion with the inner Divine, resting as an accepted, cherished soul.",
      "Reach out to one person today not to ask for validation, but to offer a word of genuine encouragement.",
      "Recognize solitude as a sacred monastery for self-discovery rather than a punishment."
    ],
    meditativeAffirmation: "\u092F\u094B\u0917\u0915\u094D\u0937\u0947\u092E\u0902 \u0935\u0939\u093E\u092E\u094D\u092F\u0939\u092E\u094D (Yoga-k\u1E63hema\u1E41 vah\u0101myaham) \u2014 I am never alone; divine presence sustains my every breath."
  }
];
app.post("/api/guidance", async (req, res) => {
  try {
    const { dilemma, category } = req.body;
    if (!dilemma || typeof dilemma !== "string" || dilemma.trim().length === 0) {
      return res.status(400).json({ error: "Please share your life problem or question." });
    }
    const ai = getGenAI();
    if (ai) {
      try {
        const prompt = `You are Sri Krishna speaking directly and compassionately to Arjuna (the seeker) in the Bhagavad Gita.
The seeker comes to you with this modern life dilemma, stress, or moral struggle:
"${dilemma.trim()}" (Category context: ${category || "general life challenge"}).

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
          model: "gemini-3.8-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are the divine, compassionate, and eternally wise voice of Sri Krishna from the Bhagavad Gita. Speak with supreme grace, psychological depth, and clarity.",
            responseMimeType: "application/json",
            responseSchema: {
              type: import_genai.Type.OBJECT,
              properties: {
                matchedShloka: {
                  type: import_genai.Type.OBJECT,
                  properties: {
                    chapter: { type: import_genai.Type.INTEGER },
                    verse: { type: import_genai.Type.INTEGER },
                    chapterNameSanskrit: { type: import_genai.Type.STRING },
                    chapterNameEnglish: { type: import_genai.Type.STRING },
                    sanskrit: { type: import_genai.Type.STRING },
                    transliteration: { type: import_genai.Type.STRING },
                    wordMeanings: { type: import_genai.Type.STRING },
                    translation: { type: import_genai.Type.STRING },
                    philosophicalContext: { type: import_genai.Type.STRING }
                  },
                  required: ["chapter", "verse", "chapterNameSanskrit", "chapterNameEnglish", "sanskrit", "transliteration", "wordMeanings", "translation", "philosophicalContext"]
                },
                relevanceAnalysis: { type: import_genai.Type.STRING },
                krishnaCounsel: { type: import_genai.Type.STRING },
                practicalDharma: {
                  type: import_genai.Type.ARRAY,
                  items: { type: import_genai.Type.STRING }
                },
                meditativeAffirmation: { type: import_genai.Type.STRING }
              },
              required: ["matchedShloka", "relevanceAnalysis", "krishnaCounsel", "practicalDharma", "meditativeAffirmation"]
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
              category: category || "peace",
              tags: ["gita", "wisdom", "guidance"]
            },
            relevanceAnalysis: parsed.relevanceAnalysis,
            krishnaCounselCustom: parsed.krishnaCounsel,
            practicalDharmaCustom: parsed.practicalDharma
          });
        }
      } catch (geminiError) {
        console.warn("Gemini API call encountered an error, using curated wisdom database:", geminiError);
      }
    }
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
        category: category || "anxiety",
        tags: ["gita", "dharma", "guidance"]
      },
      relevanceAnalysis: bestMatch.relevanceAnalysis,
      krishnaCounselCustom: bestMatch.krishnaCounsel,
      practicalDharmaCustom: bestMatch.practicalDharma
    });
  } catch (err) {
    console.error("Error in /api/guidance:", err);
    res.status(500).json({ error: "Failed to seek guidance. Please try again." });
  }
});
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: (/* @__PURE__ */ new Date()).toISOString() });
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Bhagavad Gita Guidance server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
