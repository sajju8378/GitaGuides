import { Shloka, CategoryMeta } from '../types';

export const distressCategories: CategoryMeta[] = [
  {
    id: 'anxiety',
    label: 'Anxiety & Overthinking',
    sanskritTerm: 'चिन्ता एवं उद्वेग (Chintā & Udvega)',
    description: 'When the future feels uncertain, thoughts spiral, and you obsess over outcomes you cannot control.',
    badgeColor: 'border-amber-500/30 text-amber-300 bg-amber-950/40',
    samplePrompts: [
      'I am terrified of failing an upcoming project or interview',
      'I cannot stop replaying past mistakes and dreading tomorrow',
      'I feel constantly anxious about whether my hard work will pay off'
    ]
  },
  {
    id: 'anger',
    label: 'Anger & Resentment',
    sanskritTerm: 'क्रोध एवं अमर्ष (Krodha & Amarṣha)',
    description: 'When anger burns within, clouding your judgment and tempting words or actions you will regret.',
    badgeColor: 'border-rose-500/30 text-rose-300 bg-rose-950/40',
    samplePrompts: [
      'Someone betrayed my trust and I cannot stop burning with rage',
      'I lose my temper easily and end up hurting people I love',
      'I feel treated unfairly and resentful towards my colleagues'
    ]
  },
  {
    id: 'fear',
    label: 'Fear & Uncertainty',
    sanskritTerm: 'भय एवं संशय (Bhaya & Saṁśhaya)',
    description: 'When sudden challenges shake your ground, creating doubt, insecurity, and fear of the unknown.',
    badgeColor: 'border-purple-500/30 text-purple-300 bg-purple-950/40',
    samplePrompts: [
      'I am terrified of losing my financial stability or health',
      'Everything in my life is changing and I feel paralyzed with fear',
      'I doubt my own capability and fear being exposed as inadequate'
    ]
  },
  {
    id: 'grief',
    label: 'Grief, Loss & Heartbreak',
    sanskritTerm: 'शोक एवं विरह (Śhoka & Viraha)',
    description: 'When separation, loss of a loved one, or shattered dreams leave a hollow ache in your heart.',
    badgeColor: 'border-indigo-500/30 text-indigo-300 bg-indigo-950/40',
    samplePrompts: [
      'I am mourning the death of someone deeply dear to me',
      'My long-term relationship ended and I feel shattered',
      'I gave my life to something that collapsed and I feel empty'
    ]
  },
  {
    id: 'burnout',
    label: 'Burnout & Fatigue',
    sanskritTerm: 'श्रम एवं क्लान्ति (Śhrama & Klānti)',
    description: 'When continuous effort feels exhausting, unappreciated, and you question the point of your duties.',
    badgeColor: 'border-orange-500/30 text-orange-300 bg-orange-950/40',
    samplePrompts: [
      'I work endlessly but feel exhausted, numb, and unappreciated',
      'I am carrying too many family obligations and have nothing left to give',
      'I feel like a machine fulfilling endless tasks without soul or joy'
    ]
  },
  {
    id: 'indecision',
    label: 'Decision Paralysis & Dilemma',
    sanskritTerm: 'मोह एवं धर्मसंकट (Moha & Dharma-saṅkaṭa)',
    description: 'When two paths pull you apart and neither seems clean, freezing you in hesitation like Arjuna.',
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/40',
    samplePrompts: [
      'I must choose between safety and following my authentic calling',
      'I am torn between loyalty to family and standing for what is right',
      'I am paralyzed by fear of picking the wrong career path'
    ]
  },
  {
    id: 'loneliness',
    label: 'Loneliness & Disconnection',
    sanskritTerm: 'एकाकित्व (Ekākitva)',
    description: 'When you feel unseen, misunderstood, or utterly solitary in the middle of a crowded world.',
    badgeColor: 'border-emerald-500/30 text-emerald-300 bg-emerald-950/40',
    samplePrompts: [
      'I have people around me but no one truly knows or understands me',
      'I feel discarded, unloved, and unworthy of deep companionship',
      'I struggle to feel grounded in my own presence when alone'
    ]
  },
  {
    id: 'peace',
    label: 'Equanimity & Inner Peace',
    sanskritTerm: 'समत्व एवं शान्ति (Samatvam & Śhānti)',
    description: 'When you seek a deeper spiritual anchor to stay unshakable amidst praise, blame, loss, and gain.',
    badgeColor: 'border-yellow-500/30 text-yellow-300 bg-yellow-950/40',
    samplePrompts: [
      'How can I remain calm when everyone around me is panicking?',
      'I want to cultivate steady detachment without becoming cold or indifferent',
      'I want to discover the stillness that exists beneath thoughts'
    ]
  }
];

export const shlokaDatabase: Shloka[] = [
  {
    id: 'bg-2-47',
    chapter: 2,
    verse: 47,
    chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
    chapterNameEnglish: 'The Yoga of Analytical Knowledge',
    sanskrit: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥',
    transliteration: 'karmaṇy-evādhikāras te mā phaleṣhu kadāchana |\nmā karma-phala-hetur bhūr mā te saṅgo ’stvakarmaṇi ||',
    wordMeanings: 'karmaṇi: in prescribed action; eva: only; adhikāraḥ: right/authority; te: your; mā: never; phaleṣhu: in the fruits/results; kadāchana: at any time; mā: never; karma-phala-hetuḥ: motivated by results; bhūḥ: become; mā: neither; te: your; saṅgaḥ: attachment; astu: let there be; akarmaṇi: in inaction/laziness.',
    translation: 'You have a sacred right to perform your prescribed duties, but never to the fruits of action. Never consider yourself the sole author of the results of your activities, and never be attached to inaction.',
    krishnaCounsel: 'Arjuna, your suffering does not stem from your responsibilities; it stems from your psychological entanglement with what comes next. You exhaust your energy trying to control tomorrow, which is governed by countless cosmic forces beyond your solitary ego. Pour your entire heart, brilliance, and devotion into the present action itself—pure and unimpeded. When you drop the burden of the result, your mind becomes quiet, your work becomes sacred, and anxiety evaporates.',
    philosophicalContext: 'Spoken by Sri Krishna to steady Arjuna’s tremulous hands on the brink of battle, this is the foundational cornerstone of Nishkama Karma Yoga—action performed as a spiritual offering without grasping for rewards.',
    practicalDharma: [
      'Separate the task from the outcome: write down what you can do in the next 60 minutes, and consciously surrender what happens tomorrow.',
      'Notice when mental rehearsal turns into anxiety; silently affirm "The duty is mine; the result belongs to the Infinite."',
      'Reject inaction born of fear. Do not withdraw from your calling simply because the outcome is unguaranteed.'
    ],
    meditativeAffirmation: 'कर्मण्येवाधिकारस्ते (Karmaṇy-evādhikāras te) — My power is in the present deed.',
    category: 'anxiety',
    tags: ['karma', 'duty', 'anxiety', 'control', 'work', 'stress', 'detachment']
  },
  {
    id: 'bg-6-35',
    chapter: 6,
    verse: 35,
    chapterNameSanskrit: 'ध्यान योग (Dhyāna Yoga)',
    chapterNameEnglish: 'The Yoga of Meditation',
    sanskrit: 'असंशयं महाबाहो मनो दुर्निग्रहं चलम्।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते॥',
    transliteration: 'asaṁśhayaṁ mahā-bāho mano durnigrahaṁ chalam |\nabhyāsena tu kaunteya vairāgyeṇa cha gṛihyate ||',
    wordMeanings: 'asaṁśhayam: without doubt; mahā-bāho: O mighty-armed one; manaḥ: the mind; durnigraham: difficult to restrain; chalam: restless/flickering; abhyāsena: by constant gentle practice; tu: but; kaunteya: O son of Kunti; vairāgyeṇa: by dispassion/detachment; cha: and; gṛihyate: is mastered/restrained.',
    translation: 'Lord Krishna said: O mighty-armed Arjuna, without doubt the mind is exceedingly restless, turbulent, and hard to rein in. Yet, O son of Kunti, through steady, patient practice (Abhyasa) and healthy dispassion (Vairagya), it can surely be brought under mastery.',
    krishnaCounsel: 'Do not despair when your mind wanders, skips, or obsesses over fears. I acknowledge that the mind is as tempestuous as the wind! Do not fight it with rage or self-loathing. Rather, treat it like an untrained foal. Each time it bolts into panic, gently, lovingly steer it back to your breath, your center, your higher truth. Mastery is not an overnight thunderbolt; it is the gentle repetition of returning home a thousand times.',
    philosophicalContext: 'Arjuna had just admitted in verse 6.34 that controlling the mind seemed as impossible as catching the hurricane. Krishna does not invalidate his struggle; instead, He offers the twin wings of spiritual flight: Abhyasa (perseverance) and Vairagya (non-grasping).',
    practicalDharma: [
      'Stop judging yourself for having racing thoughts; replace self-criticism with neutral curiosity.',
      'Practice Abhyasa: Commit to 5 minutes of mindful breathing or Tanpura contemplation daily, gently returning when distracted.',
      'Practice Vairagya: Ask yourself: "Will this thing that is agitating my mind matter in five years?"'
    ],
    meditativeAffirmation: 'अभ्यासेन वैराग्येण (Abhyāsena Vairāgyeṇa) — Tamed by gentle practice and holy ease.',
    category: 'anxiety',
    tags: ['mind', 'overthinking', 'meditation', 'discipline', 'patience', 'habits']
  },
  {
    id: 'bg-2-14',
    chapter: 2,
    verse: 14,
    chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
    chapterNameEnglish: 'The Yoga of Analytical Knowledge',
    sanskrit: 'मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥',
    transliteration: 'mātrā-sparśhās tu kaunteya śhītoṣhṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino ’nityās tāṁs titikṣhasva bhārata ||',
    wordMeanings: 'mātrā-sparśhāḥ: contact of sensory organs with their objects; tu: indeed; kaunteya: O son of Kunti; śhīta-uṣhṇa: winter cold and summer heat; sukha-duḥkha-dāḥ: bestowers of pleasure and pain; āgama-apāyinaḥ: coming and going; anityāḥ: impermanent; tān: them; titikṣhasva: endure with calm patience (Titiksha); bhārata: O scion of Bharata.',
    translation: 'O son of Kunti, the contacts of the senses with their respective objects produce fleeting sensations of cold and heat, pleasure and pain. They have a beginning and an end; they are ephemeral. Endure them with serene fortitude, O Bharata.',
    krishnaCounsel: 'Look closely at your current distress. It feels infinite right now, does it not? Yet notice how the cold of winter inevitably melts into the warmth of spring, and how yesterday’s unbearable sorrow has already softened. Pleasant and painful sensations come and go like weather across the vast sky of your consciousness. You are not the transient storm; you are the eternal sky. Bear this phase with dignified stillness (Titiksha); this too will change.',
    philosophicalContext: 'Krishna reminds Arjuna of the nature of phenomenal reality (Prakriti). Suffering arises when we demand permanence from a world fundamentally designed to change.',
    practicalDharma: [
      'Cultivate Titiksha (spiritual forbearance): when physical or emotional discomfort arises, observe it for 3 breaths without reacting.',
      'Label feelings as passing visitors: instead of saying "I am broken," say "A wave of sadness is passing through me."',
      'Anchor yourself in your unchanging core: what in you has remained awake through every joy and sorrow since childhood?'
    ],
    meditativeAffirmation: 'तांस्तितिक्षस्व भारत (Tāṁs titikṣhasva) — Endure with calm awareness; this too shall pass.',
    category: 'fear',
    tags: ['impermanence', 'pain', 'endurance', 'change', 'patience', 'titiksha']
  },
  {
    id: 'bg-2-62-63',
    chapter: 2,
    verse: 62,
    chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
    chapterNameEnglish: 'The Yoga of Analytical Knowledge',
    sanskrit: 'ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते।\nसङ्गात्सञ्जायते कामः कामात्क्रोधोऽभिजायते॥\nक्रोधाद्भवति सम्मोहः सम्मोहात्स्मृतिविभ्रमः।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति॥',
    transliteration: 'dhyāyato viṣhayān puṁsaḥ saṅgas teṣhūpajāyate |\nsaṅgāt sañjāyate kāmaḥ kāmāt krodho ’bhijāyate ||\nkrodhād bhavati sammohaḥ sammohāt smṛiti-vibhramaḥ |\nsmṛiti-bhraṁśhād buddhi-nāśho buddhi-nāśhāt praṇaśhyati ||',
    wordMeanings: 'dhyāyataḥ: contemplating/dwelling upon; viṣhayān: sensory objects; puṁsaḥ: of a person; saṅgaḥ: attachment; teṣhu: in them; upajāyate: develops; saṅgāt: from attachment; sañjāyate: arises; kāmaḥ: intense desire; kāmāt: from desire; krodhaḥ: anger; abhijāyate: springs forth; krodhāt: from anger; bhavati: comes; sammohaḥ: delusion/confusion; sammohāt: from delusion; smṛiti-vibhramaḥ: loss of memory/wisdom; smṛiti-bhraṁśhāt: from loss of memory; buddhi-nāśhaḥ: destruction of discriminating intellect; buddhi-nāśhāt: from ruined intellect; praṇaśhyati: one is utterly ruined.',
    translation: 'Dwelling on sense objects breeds attachment to them; from attachment springs insatiable desire; from obstructed desire erupts fiery anger. From anger arises total delusion; from delusion comes loss of higher memory and spiritual principles; from ruined discernment, the intellect is obliterated, and one falls into ruin.',
    krishnaCounsel: 'Observe the anatomy of your fury! Anger is never the root; it is the screaming symptom of an unmet expectation—a desire that was blocked. When someone did not act as you demanded, or when circumstances defied your script, desire turned to venom. In this state of anger, your discernment (Buddhi) is silenced. Pause right now! Do not send the harsh message. Do not speak while the fever burns. Step back, breathe into the silence of your spirit, and reclaim your throne of wisdom.',
    philosophicalContext: 'The famous psychological stairway of degeneration described by Krishna. It illustrates how unmonitored wandering thoughts cascade step-by-step into total emotional destruction.',
    practicalDharma: [
      'Trace the hidden expectation: ask yourself, "What unstated entitlement or desire was violated that triggered this anger?"',
      'The sacred 24-hour moratorium: never make a permanent decision or send an accusatory message during emotional heat.',
      'Channel the kinetic energy: engage in rigorous movement, walk in nature, or chant a shloka to metabolize the adrenaline.'
    ],
    meditativeAffirmation: 'शान्तो भव (Śhānto Bhava) — Be peaceful; preserve your noble discernment.',
    category: 'anger',
    tags: ['anger', 'desire', 'mindfulness', 'clarity', 'conflict', 'forgiveness']
  },
  {
    id: 'bg-2-20',
    chapter: 2,
    verse: 20,
    chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
    chapterNameEnglish: 'The Yoga of Analytical Knowledge',
    sanskrit: 'न जायते म्रियते वा कदाचिन्\nनायं भूत्वा भविता वा न भूयः।\nअजो नित्यः शाश्वतोऽयं पुराणो\nन हन्यते हन्यमाने शरीरे॥',
    transliteration: 'na jāyate mriyate vā kadāchin\nnāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śhāśhvato ’yaṁ purāṇo\nna hanyate hanyamāne śharīre ||',
    wordMeanings: 'na: neither; jāyate: is born; mriyate: dies; vā: or; kadāchit: at any time; na: nor; ayam: this soul; bhūtvā: having come into being; bhavitā: will cease to be; vā: or; na bhūyaḥ: never again; ajaḥ: unborn; nityaḥ: eternal; śhāśhvataḥ: everlasting; ayam: this; purāṇaḥ: primeval/ancient; na hanyate: is not slain; hanyamāne: when being slain; śharīre: in the body.',
    translation: 'The soul is never born, nor does it ever die at any time; having once existed, it never ceases to be. It is unborn, eternal, ever-existing, undying, and primeval. It is not destroyed when the perishable physical body is destroyed.',
    krishnaCounsel: 'O grieving soul, dry your tears and look through the illusion of dust and bone! What you truly love about that soul—their radiant awareness, their divine essence, their spark—was never bounded by mortal flesh. Bodies are like garments; when worn out or their role is fulfilled, they are lovingly set aside. The true Self (Atman) was never touched by birth, sickness, fire, or death. The bond of divine love that connects you transcends the illusion of time.',
    philosophicalContext: 'Krishna’s majestic declaration of the immortality of the soul (Atman). He reveals that physical demise is merely a costume change in the grand cosmic theater.',
    practicalDharma: [
      'Honor grief without falling into despair: allow tears to flow as love, but remember their essence is safe in the Infinite.',
      'Speak to their spirit in quiet meditation: thank them for lessons shared and bless their onward spiritual journey.',
      'Reflect on your own immortal nature: you are not a fragile human having a spiritual experience; you are an immortal spirit having a brief human experience.'
    ],
    meditativeAffirmation: 'अजो नित्यः शाश्वतः (Ajo nityaḥ śhāśhvataḥ) — Unborn, eternal, indestructible is the soul.',
    category: 'grief',
    tags: ['grief', 'death', 'loss', 'soul', 'atman', 'eternity', 'healing']
  },
  {
    id: 'bg-2-22',
    chapter: 2,
    verse: 22,
    chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
    chapterNameEnglish: 'The Yoga of Analytical Knowledge',
    sanskrit: 'वासांसि जीर्णानि यथा विहाय\nनवानि गृह्णाति नरोऽपराणि।\nतथा शरीराणि विहाय जीर्णा-\nन्यन्यानि संयाति नवानि देही॥',
    transliteration: 'vāsāṁsi jīrṇāni yathā vihāya\nnavāni gṛihṇāti naro ’parāṇi |\ntathā śharīrāṇi vihāya jīrṇāny\nanyāni saṁyāti navāni dehī ||',
    wordMeanings: 'vāsāṁsi: garments/clothes; jīrṇāni: worn-out/decayed; yathā: just as; vihāya: casting off; navāni: fresh/new; gṛihṇāti: accepts; naraḥ: a person; aparāṇi: other; tathā: likewise; śharīrāṇi: bodies; vihāya: discarding; jīrṇāni: worn-out; anyāni: other; saṁyāti: enters; navāni: new; dehī: the embodied soul.',
    translation: 'Just as a person casts off worn-out garments and puts on new ones, so the embodied soul willingly discards worn-out bodies and enters into others that are fresh and new.',
    krishnaCounsel: 'Life is a sacred procession of shed skins. A relationship ends, a company dissolves, youthful strength gives way, a chapter concludes. Why cling to old clothes that no longer serve your growth? The pain of transition is merely the resistance of the ego refusing to step into the next dress of destiny. Release your grip with gratitude for what was, and step boldly forward into what is waiting to be born.',
    philosophicalContext: 'The immortal metaphor of garments. Krishna teaches us to normalize transition and endings as natural laws of cosmic evolution.',
    practicalDharma: [
      'Conduct a conscious closure ritual: write down what you must let go of, thank it sincerely, and let it pass.',
      'Identify the new chapter: what fresh strength, maturity, or perspective is being invited by this transition?',
      'Stop identifying with the temporary role (the title, the relationship status) and root in the silent observer within.'
    ],
    meditativeAffirmation: 'नवानि गृह्णाति (Navāni gṛihṇāti) — Releasing the old, embracing new divine light.',
    category: 'grief',
    tags: ['change', 'letting-go', 'transformation', 'transitions', 'rebirth', 'new-beginnings']
  },
  {
    id: 'bg-3-19',
    chapter: 3,
    verse: 19,
    chapterNameSanskrit: 'कर्म योग (Karma Yoga)',
    chapterNameEnglish: 'The Yoga of Action',
    sanskrit: 'तस्मादसक्तः सततं कार्यं कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः॥',
    transliteration: 'tasmād asaktaḥ satataṁ kāryaṁ karma samāchara |\nasakto hyācharan karma param āpnoti pūruṣhaḥ ||',
    wordMeanings: 'tasmāt: therefore; asaktaḥ: unattached/free from selfish desire; satatam: constantly; kāryam: obligatory/worth doing; karma: action/duty; samāchara: perform thoroughly; asaktaḥ: unattached; hi: certainly; ācharan: performing; karma: action; param: the Supreme/highest liberation; āpnoti: attains; pūruṣhaḥ: a person.',
    translation: 'Therefore, remaining constantly unattached to selfish results, perform with thorough excellence all duties that must be done; for by performing work without personal grasping, a human being surely attains the Supreme Truth.',
    krishnaCounsel: 'You are exhausted not because of work, but because of emotional friction! You carry the invisible baggage of needing validation, fearing criticism, and demanding reward. When you work for the ego, every hour drains you. But when you work as an offering—dedicating your labor to the welfare of others and the divine harmony—work ceases to be toil. It transforms into an effortless dance of sacred energy (Seva). Lighten your spirit and serve.',
    philosophicalContext: 'Krishna explains how enlightened beings like King Janaka maintained immense worldly kingdoms without a trace of fatigue or moral contamination.',
    practicalDharma: [
      'Sanctify your work: before opening your laptop or beginning tasks, silently dedicate your labor: "Let this serve the highest good."',
      'Drop the craving for applause: work with immaculate craft for the joy of excellence, not for compliments.',
      'Honor rest without guilt: true Karma Yoga balances focused action with restorative stillness.'
    ],
    meditativeAffirmation: 'असक्तः सततं समाचर (Asaktaḥ satataṁ samāchara) — Free from attachment, I act with excellence.',
    category: 'burnout',
    tags: ['burnout', 'work-life', 'duty', 'service', 'excellence', 'detachment']
  },
  {
    id: 'bg-6-5',
    chapter: 6,
    verse: 5,
    chapterNameSanskrit: 'ध्यान योग (Dhyāna Yoga)',
    chapterNameEnglish: 'The Yoga of Meditation',
    sanskrit: 'उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥',
    transliteration: 'uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ ||',
    wordMeanings: 'uddharet: elevate/lift up; ātmanā: by one’s own mind/effort; ātmānam: the self; na: not; ātmānam: the self; avasādayet: degrade/drag down; ātmā: the mind; eva: alone; hi: certainly; ātmanaḥ: of the self; bandhuḥ: friend; ātmā: the mind; eva: alone; ripuḥ: enemy; ātmanaḥ: of the self.',
    translation: 'A person must elevate oneself by the strength of one’s own mind, and not degrade oneself. For the mind alone is one’s truest friend, and the mind alone is one’s greatest enemy.',
    krishnaCounsel: 'Stop waiting for an external savior or a lucky break! You hold the key to your own resurrection. Look at how you speak to yourself in the secret chambers of your mind: do you encourage yourself, or do you poison yourself with blame and comparison? When your mind is disciplined and kind, it stands by you like an invincible champion. Train your mind to be your loyal ally, not your cruelest abuser.',
    philosophicalContext: 'Krishna places full moral and psychological autonomy in the seeker’s hands. Self-mastery begins with conscious inner self-talk.',
    practicalDharma: [
      'Audit your inner dialogue: whenever you catch yourself saying "I am hopeless," intervene immediately with "I am learning and growing."',
      'Take one small self-honoring action today: clean your space, take a restorative walk, or speak your boundary.',
      'Recognize that you are your own primary sanctuary; cherish yourself as a temple of the Divine.'
    ],
    meditativeAffirmation: 'उद्धरेदात्मनात्मानं (Uddhared ātmanātmānam) — I lift myself through divine inner strength.',
    category: 'loneliness',
    tags: ['self-worth', 'empowerment', 'mindset', 'inner-dialogue', 'solitude', 'confidence']
  },
  {
    id: 'bg-18-66',
    chapter: 18,
    verse: 66,
    chapterNameSanskrit: 'मोक्षसंन्यास योग (Mokṣha-Sannyāsa Yoga)',
    chapterNameEnglish: 'The Yoga of Liberation through Renunciation',
    sanskrit: 'सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज।\nअहं त्वां सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः॥',
    transliteration: 'sarva-dharmān parityajya mām ekaṁ śharaṇaṁ vraja |\nahaṁ tvāṁ sarva-pāpebhyo mokṣhayiṣhyāmi mā śhuchaḥ ||',
    wordMeanings: 'sarva-dharmān: all varieties of religious rites, dogmas, duties; parityajya: abandoning/relinquishing; mām: unto Me; ekam: alone; śharaṇam: surrender/refuge; vraja: take; aham: I; tvām: you; sarva-pāpebhyaḥ: from all sins, guilts, entanglements; mokṣhayiṣhyāmi: will liberate/deliver; mā: do not; śhuchaḥ: grieve/fear.',
    translation: 'Relinquish all external dogmas, burdens, and anxieties, and take refuge in Me alone. I will liberate you from all past sins, shortcomings, and cosmic entanglements. Do not grieve!',
    krishnaCounsel: 'Child, you have carried the weight of the world long enough. You have calculated every contingency, carried heavy guilt from past missteps, and worried whether you are spiritual or worthy enough. Hear My supreme promise: drop the heavy baggage of your frail ego at My feet. Let go of the need to solve everything with your limited intellect. Surrender your heart into the vast ocean of divine grace. "Mā śhuchaḥ"—weep no more, for you are held.',
    philosophicalContext: 'The Charama Shloka (the ultimate concluding verse of grace) of the entire Bhagavad Gita. Krishna reveals the final secret: unconditional surrender (Sharanagati) dissolves all existential burden.',
    practicalDharma: [
      'The surrender breath: inhale deeply, and as you exhale, silently offer your heaviest burden to Krishna: "I place this in Your hands."',
      'Forgive your past: release the self-loathing over mistakes; resolve to live consciously from this moment.',
      'Rest in sacred safety: repeat the comforting closing words "Mā śhuchaḥ" (Do not grieve) whenever panic threatens.'
    ],
    meditativeAffirmation: 'मा शुचः (Mā Śhuchaḥ) — Do not grieve; divine grace envelops you.',
    category: 'fear',
    tags: ['surrender', 'grace', 'faith', 'guilt', 'peace', 'sharanagati']
  },
  {
    id: 'bg-2-71',
    chapter: 2,
    verse: 71,
    chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
    chapterNameEnglish: 'The Yoga of Analytical Knowledge',
    sanskrit: 'विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः।\nनिर्ममो निरहङ्कारः स शान्तिमधिगच्छति॥',
    transliteration: 'vihāya kāmān yaḥ sarvān pumāṁśh charati niḥspṛihaḥ |\nnirmamo nirahaṅkāraḥ sa śhāntim adhigachchhati ||',
    wordMeanings: 'vihāya: renouncing/giving up; kāmān: selfish longings; yaḥ: who; sarvān: all; pumān: a person; charati: lives/walks in the world; niḥspṛihaḥ: free from thirst for possession; nirmamaḥ: without "mine" (possessiveness); nirahaṅkāraḥ: free from false ego; saḥ: that person; śhāntim: supreme peace; adhigachchhati: attains.',
    translation: 'That person alone attains genuine, unshakeable peace who casts aside all grasping desires, moving through life free from craving, devoid of possessiveness ("this is mine"), and free from false pride ("I am the doer").',
    krishnaCounsel: 'Peace is not something you chase in faraway caves; it is what remains when you stop clutching! Look at how tightly your fist is clenched around reputations, possessions, and expectations. Notice the two thieves of joy: "Aham" (the inflated ego that takes everything personally) and "Mama" (the clutching hand claiming ownership over people and outcomes). Open your hand. Let life flow through you like light through glass. In that open palm rests absolute tranquility.',
    philosophicalContext: 'Krishna describes the characteristics of a Sthitaprajna—a person of steady, established wisdom whose peace cannot be shaken by the storms of the world.',
    practicalDharma: [
      'Practice non-possessiveness: mentally relabel what you hold dear from "mine" to "a temporary sacred trust entrusted to my care."',
      'Depersonalize offenses: when someone insults or ignores you, remind yourself that it reflects their inner weather, not your worth.',
      'Spend 10 minutes today in desireless silence, wanting nothing, needing nothing, resting as pure presence.'
    ],
    meditativeAffirmation: 'निर्ममो निरहङ्कारः (Nirmamo nirahaṅkāraḥ) — Free from "mine" and "me", I rest in peace.',
    category: 'peace',
    tags: ['peace', 'sthitaprajna', 'ego', 'contentment', 'equanimity', 'serenity']
  },
  {
    id: 'bg-2-7',
    chapter: 2,
    verse: 7,
    chapterNameSanskrit: 'साङ्ख्य योग (Sāṅkhya Yoga)',
    chapterNameEnglish: 'The Yoga of Analytical Knowledge',
    sanskrit: 'कार्पण्यदोषोपहतस्वभावः\nपृच्छामि त्वां धर्मसंमूढचेताः।\nयच्छ्रेयः स्यान्निश्चितं ब्रूहि तन्मे\nशिष्यस्तेऽहं शाधि मां त्वां प्रपन्नम्॥',
    transliteration: 'kārpaṇya-doṣhopahata-svabhāvaḥ\npṛichchhāmi tvāṁ dharma-sammūḍha-chetāḥ |\nyach-chhreyaḥ syān niśhchitaṁ brūhi tan me\nśhiṣhyas te ’haṁ śhādhi māṁ tvāṁ prapannam ||',
    wordMeanings: 'kārpaṇya-doṣha: by the weakness of faintheartedness/pity; upahata: afflicted/overcome; svabhāvaḥ: my natural character; pṛichchhāmi: I ask; tvām: You; dharma-sammūḍha: confused about true duty/path; cetāḥ: mind/heart; yat: what; śhreyaḥ: truly beneficial/highest good; syāt: may be; niśhchitam: decisively; brūhi: tell; tat: that; me: to me; śhiṣhyaḥ: disciple; te: Your; aham: I am; śhādhi: instruct/guide; mām: me; tvām: unto You; prapannam: surrendered.',
    translation: 'My nature is stricken by the weakness of confusion and emotional paralysis; my mind is utterly perplexed regarding my true duty. I beseech You: tell me decisively what is the highest good for my soul. I am Your disciple; please instruct me, who have taken refuge in You.',
    krishnaCounsel: 'Arjuna’s greatest victory began not with a sword, but with total honesty. He dared to say: "I do not know. I am confused. My heart is trembling." There is no shame in admitting your vulnerability! Confusion is the fertile soil from which spiritual awakening springs. When you drop your stubborn pride and ask with genuine humility for higher wisdom, the cosmic teacher within responds immediately.',
    philosophicalContext: 'The pivotal moment of the Gita where the friendly conversation transforms into the sacred Guru-Shishya (Master and Disciple) transmission.',
    practicalDharma: [
      'Acknowledge your confusion without shame: speak to the Divine or write down: "I am uncertain, and I open myself to clarity."',
      'Seek "Shreyas" (the long-term highest good) rather than "Preyas" (the quick, comforting fix).',
      'Sit quietly in the receptive posture of a student, listening for the quiet intuitive guidance beneath mental chatter.'
    ],
    meditativeAffirmation: 'शिष्यस्तेऽहं शाधि माम् (Śhiṣhyas te ’haṁ śhādhi mām) — I am a seeker of truth; guide my steps.',
    category: 'indecision',
    tags: ['dilemma', 'guidance', 'humility', 'surrender', 'clarity', 'decision']
  },
  {
    id: 'bg-12-15',
    chapter: 12,
    verse: 15,
    chapterNameSanskrit: 'भक्तियोग (Bhakti Yoga)',
    chapterNameEnglish: 'The Yoga of Devotion',
    sanskrit: 'यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः।\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः॥',
    transliteration: 'yasmān nodvijate loko lokān nodvijate cha yaḥ |\nharṣhāmarṣha-bhayodvegair mukto yaḥ sa cha me priyaḥ ||',
    wordMeanings: 'yasmāt: by whom; na: not; udvijate: is agitated/provoked; lokaḥ: the world; lokāt: from the world; na: not; udvijate: is agitated/disturbed; cha: and; yaḥ: who; harṣha: ecstatic elation; amarṣha: envy/impatience/wrath; bhaya: fear; udvegaiḥ: anxiety/agitation; muktaḥ: liberated/freed; yaḥ: who; saḥ: that one; cha: and; me: to Me; priyaḥ: deeply dear.',
    translation: 'He by whom the world is not agitated and who is not agitated by the world, who is liberated from manic elation, intolerance, fear, and anxiety—that soul is exceedingly dear to Me.',
    krishnaCounsel: 'Look at how reactive you have become to the moods, opinions, and tweets of others! You allow the external world to push your buttons like a puppet on strings. But the divine soul is neither a bully who creates drama, nor a victim who absorbs every toxic vibration. Be like a deep ocean: ships may sail on your surface, and storms may churn waves above, but in your depths, there is unbreachable stillness.',
    philosophicalContext: 'Krishna details the qualities of His beloved Bhakta (devotee). Spiritual maturity is evidenced by emotional non-reactivity and compassion.',
    practicalDharma: [
      'The 3-second buffer: when someone provokes or blames you, pause for 3 seconds before responding from stillness rather than impulse.',
      'Refuse to spread emotional contagion: do not vent gossip or anxiety onto colleagues and loved ones.',
      'Remember your true sanctuary: people will be fickle and moods will swing; keep your anchor cast in eternal love.'
    ],
    meditativeAffirmation: 'यस्मान्नोद्विजते लोकः (Yasmān nodvijate lokaḥ) — Neither agitated nor agitating; anchored in grace.',
    category: 'peace',
    tags: ['relationships', 'conflict', 'triggers', 'equanimity', 'calm', 'peace']
  },
  {
    id: 'bg-9-22',
    chapter: 9,
    verse: 22,
    chapterNameSanskrit: 'राजविद्याराजगुह्य योग (Rāja-Vidyā Rāja-Guhya Yoga)',
    chapterNameEnglish: 'The Yoga of Sovereign Science and Sovereign Secret',
    sanskrit: 'अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम्॥',
    transliteration: 'ananyāśh chintayanto māṁ ye janāḥ paryupāsate |\nteṣhāṁ nityābhiyuktānāṁ yoga-kṣhemaṁ vahāmyaham ||',
    wordMeanings: 'ananyāḥ: with undivided focus; chintayantaḥ: contemplating/remembering; mām: upon Me; ye: who; janāḥ: persons; paryupāsate: worship with devotion; teṣhām: of them; nitya-abhiyuktānām: who are constantly absorbed; yoga: providing what they lack; kṣhemam: preserving what they have; vahāmi: carry/bear; aham: I.',
    translation: 'To those who are ever absorbed in contemplation of Me, worshiping with undivided devotion, I personally carry what they lack (Yoga) and preserve what they already possess (Kshema).',
    krishnaCounsel: 'You feel solitary, burdened by the scarcity mindset that if you do not claw and fight for every resource, you will perish. But the same intelligence that breathes through your lungs while you sleep, that guides the stars and sprouts the seed, is aware of your every heartbeat! When you align your life with truth, righteousness, and spiritual absorption, the cosmic treasury opens. You will never be forsaken. Divine providence carries your burdens.',
    philosophicalContext: 'One of the most comforting promises in world scriptures. Krishna guarantees both spiritual and material well-being (Yoga and Kshema) to the sincere seeker.',
    practicalDharma: [
      'Shift from scarcity to abundance consciousness: list 5 unexpected ways help or providence has arrived in your life before.',
      'Replace worry with prayer/mantra: whenever financial or survival dread grips your mind, chant this shloka with trust.',
      'Give freely: counteract loneliness and scarcity by sharing your time, kindness, or wisdom with someone in need.'
    ],
    meditativeAffirmation: 'योगक्षेमं वहाम्यहम् (Yoga-kṣhemaṁ vahāmyaham) — The Divine carries my needs and preserves my peace.',
    category: 'loneliness',
    tags: ['providence', 'trust', 'abundance', 'protection', 'devotion', 'faith']
  },
  {
    id: 'bg-3-8',
    chapter: 3,
    verse: 8,
    chapterNameSanskrit: 'कर्म योग (Karma Yoga)',
    chapterNameEnglish: 'The Yoga of Action',
    sanskrit: 'नियतं कुरु कर्म त्वं कर्म ज्यायो ह्यकर्मणः।\nशरीरयात्रापि च ते न प्रसिद्ध्येदकर्मणः॥',
    transliteration: 'niyataṁ kuru karma tvaṁ karma jyāyo hyakarmaṇaḥ |\nśharīra-yātrāpi cha te na prasiddhyed akarmaṇaḥ ||',
    wordMeanings: 'niyatam: prescribed/obligatory; kuru: perform; karma: action; tvam: you; karma: action; jyāyaḥ: superior/better; hi: indeed; akarmaṇaḥ: than inaction; śharīra-yātrā: maintenance of the physical body; api: even; cha: also; te: your; na: not; prasiddhyet: would be accomplished; akarmaṇaḥ: by inaction.',
    translation: 'Perform your prescribed duty, for action is indeed superior to inaction. Even the basic maintenance of your physical body would not be possible without action.',
    krishnaCounsel: 'Arjuna wanted to drop his bow, run to the forest, and pretend to be a monk because the battle was painful. Do you also hide in procrastination, doom-scrolling, or sleeping to avoid confronting the battlefield of your life? Inaction is not peace; it is paralysis disguised as spirituality! Rise up. Take one concrete step. Action generates energy, dispels depression, and honors your living presence on earth.',
    philosophicalContext: 'Krishna dismantles false escapism. True spirituality does not mean running away from the world, but bringing enlightened consciousness into daily duties.',
    practicalDharma: [
      'Break the paralysis: identify the ONE task you are avoiding most, set a timer for 15 minutes, and take the first step.',
      'Reject passive rumination: when you feel stuck, move your body immediately—clean, walk, or exercise.',
      'Understand that clarity follows action, not the other way around. Move, and the path will illuminate.'
    ],
    meditativeAffirmation: 'नियतं कुरु कर्म त्वम् (Niyataṁ kuru karma tvam) — Stand and act; clarity follows courageous action.',
    category: 'indecision',
    tags: ['procrastination', 'action', 'duty', 'laziness', 'focus', 'motivation']
  },
  {
    id: 'bg-5-10',
    chapter: 5,
    verse: 10,
    chapterNameSanskrit: 'कर्मसंन्यास योग (Karma-Sannyāsa Yoga)',
    chapterNameEnglish: 'The Yoga of Renunciation of Action',
    sanskrit: 'ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा॥',
    transliteration: 'brahmaṇy-ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padma-patram ivāmbhasā ||',
    wordMeanings: 'brahmaṇi: unto the Supreme Spirit/Brahman; ādhāya: dedicating/surrendering; karmāṇi: actions; saṅgam: attachment; tyaktvā: having relinquished; karoti: acts; yaḥ: who; lipyate: is tainted/soiled; na: not; saḥ: that person; pāpena: by sin or negativity; padma-patram: a lotus leaf; iva: just as; ambhasā: by water.',
    translation: 'One who performs duties dedicating all actions unto the Supreme, relinquishing all selfish attachments, is not touched by sin or negativity, just as a lotus leaf remains untouched by the water in which it blooms.',
    krishnaCounsel: 'Look at the lotus flower blooming in the muddy pond: its roots are plunged into the deep silt, its stem passes through dark waters, yet its blossom rises pure, pristine, and luminous, upon which not a single drop of dirty water can cling! You too must live in this chaotic world—amidst demanding jobs, difficult relatives, and daily trials—without allowing their mud to stain your soul. Dedicate all you do to the Divine, and remain untouched.',
    philosophicalContext: 'The timeless Vedantic allegory of the lotus leaf (Padma-patra). It symbolizes living in the world without being of the world.',
    practicalDharma: [
      'The lotus visualization: before entering a tense meeting or environment, visualize a luminous barrier shielding your calm spirit.',
      'Remember your true essence: the mud of this world cannot stain the light of your consciousness.',
      'Release guilt over things you cannot control: do your clean best and let the rest bead off your spirit.'
    ],
    meditativeAffirmation: 'पद्मपत्रमिवाम्भसा (Padma-patram ivāmbhasā) — Untouched by worldly turmoil, pure as the lotus.',
    category: 'peace',
    tags: ['lotus', 'purity', 'detachment', 'work-stress', 'toxic-people', 'peace']
  }
];
