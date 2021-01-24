        /////// #########. BEGIN SECTION WHERE NEW DATA IS PARSED FROM PREVIOUS REPOS DATASET
        // the purpose here is to take the previous generation methods and make them a bit easier to read (by me)
        //theyll no longer use a d100 system and will instead use a 'chanec to get' system 
        var fs = require('fs');

        var CareerHuman = [1, 2, 3, 5, 6, 11, 13, 14, 15, 17, 19, 20, 21, 23, 26, 27, 28, 29, 30, 31, 32, 35,
            36, 37, 38, 39, 40, 42, 43, 44, 45, 50, 51, 52, 54, 56, 57, 58, 59, 60, 62, 63, 66, 68, 70, 71, 73, 74,
            76, 77, 78, 79, 83, 86, 87, 88, 90, 92, 93, 94, 95, 99, -1, 100
        ];
        var CareerDwarf = [1, 4, 6, -1, 7, -1, 9, -1, 11, 17, 18, 20, 25, -1, 31, 34, 36, 37, 38, 40, 41, 42,
            43, 45, 47, -1, -1, 49, 54, -1, 55, 56, 60, 61, 63, -1, 65, 67, -1, -1, 69, 70, 72, -1, 73, 75, 77, 78,
            -1, -1, 79, -1, 82, 83, 84, -1, -1, 87, -1, 90, 93, 96, 100, -1
        ];
        var CareerHalfling = [1, 2, 4, -1, 6, -1, 8, -1, 10, 15, 19, 21, 25, 28, 31, 33, 34, 36, -1, 37, -1,
            43, 44, 46, 47, -1, 50, 52, 53, -1, 54, 57, 58, 60, 63, -1, 65, 67, 68, -1, 69, 70, 73, 74, 75, 79, 84, -1,
            85, 86, 87, 88, 89, 93, 94, -1, -1, 96, -1, 97, -1, 100, -1, -1
        ];
        var CareerHElf = [2, -1, 6, -1, 8, -1, 12, 16, -1, 19, -1, 21, 26, -1, 28, 29, 31, 32, 34, 37, 40, -1,
            43, 45, -1, -1, 47, 50, -1, -1, 56, -1, 59, -1, 62, -1, 63, -1, -1, -1, 64, -1, -1, -1, 79, 80, -1, -1,
            82, 85, -1, -1, 88, -1, -1, -1, 92, 94, 95, 97, 98, 100, -1, -1
        ];
        var CareerWElf = [-1, -1, -1, -1, -1, -1, 1, 5, -1, 10, -1, -1, -1, -1, -1, -1, 14, 18, -1, 25, 31,
            -1, 35, -1, -1, -1, 42, 53, -1, 57, 68, -1, 70, -1, 78, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            79, -1, -1, -1, -1, 85, -1, -1, -1, 90, 92, 94, 96, -1, 100, -1, -1
        ];
        var CareerGnome = [
            1, -1, 2, -1, 4, 5, 7, 14,
            15, 17, 18, 19, 21, 22, 28, 29,
            30, 31, -1, 32, 33, 35, 40, 42,
            43, -1, 44, 46, 54, -1, 58, 62,
            63, -1, 68, -1, 69, 75, -1, -1,
            76, -1, 80, -1, -1, 83, -1, -1,
            85, 90, 91, -1, 92, 94, 98, -1,
            -1, 99, -1, -1, -1, 100, -1, -1
        ];

        const personalityTraits = ["able", "accountable", "active", "adaptable", "adventurous", "affable", "affected", "affectionate", "afraid", "aggressive", "altruistic", "ambitious", "amiable", "angry", "animated", "annoyed", "anxious", "appreciative", "argumentative", "arrogant", "artificial", "astonished", "attentive", "available", "awkward", "babyish", "bashful", "bewildered", "blasé", "bold", "boorish", "bored", "bossy", "brave", "bright", "brilliant", "busy", "calm", "candid", "capable", "carefree", "careful", "caring", "caustic", "cautious", "challenge-loving", "charismatic", "charming", "cheerful", "childish", "clever", "clumsy", "coarse", "cold-hearted", "committed", "communicative", "compassionate", "complacent", "conceited", "concerned", "confident", "confused", "conscientious", "considerate", "consistent", "content", "cooperative", "courageous", "coward", "crafty", "creative", "critical", "cross", "crude", "cruel", "cultured", "curious", "dainty", "dangerous", "daring", "dark", "dauntless", "decisive", "dedicated", "deference", "demanding", "dependable", "depressed", "despondent", "determined", "devoted", "dignified", "diligent", "disaffected", "disagreeable", "discerning", "discouraged", "discreet", "discrete", "dishonest", "disillusioned", "dismayed", "disorganized", "disparaging", "disrespectful", "dissatisfied", "distressed", "domineering", "doubtful", "dreamer", "dutiful", "eager", "easygoing", "effervescent", "efficient", "eloquent", "embarrassed", "encouraging", "energetic", "engaged", "enthusiastic", "equitable", "exacting", "exaggerated", "excitable", "excited", "expert", "exuberant", "facetious", "fair", "faithful", "fanciful", "fancy", "fearless", "fidgety", "fierce", "fighter", "finicky", "flexible", "focused", "foolish", "forgiving", "formal", "fortunate", "frank", "friendly", "frightened", "frugal", "frustrated", "fun-loving", "funny", "furious", "garrulous", "generous", "gentle", "giddy", "giving", "glamorous", "gloomy", "glum", "good citizen", "grateful", "greedy", "gregarious", "grouchy", "grumpy", "gullible", "handsome", "happy", "hard-working", "hardy", "harried", "harsh", "hateful", "haughty", "helpful", "hesitant", "honest", "hopeful", "hopeless", "hospitable", "humble", "humorous", "ignorant", "ill-bred", "imaginative", "immaculate", "immature", "impartial", "impatient", "impolite", "impudent", "impulsive", "inactive", "independent", "industrious", "innocent", "innovative", "inquisitive", "insipid", "insistent", "insolent", "intelligent", "intrepid", "inventive", "jealous", "jovial", "joyful", "keen", "kind", "lackadaisical", "languid", "lazy", "leader", "light", "light-hearted", "lively", "logical", "lonely", "loquacious", "lovable", "loving", "loyal", "malicious", "mannerly", "mature", "mean", "meek", "merciful", "messy", "meticulous", "mischievous", "moody", "mysterious", "naive", "neat", "negligent", "nervous", "noisy", "obedient", "obliging", "obnoxious", "obsequious", "observant", "obstinate", "open", "open-minded", "opinionated", "optimistic", "organized", "pandemonious", "patient", "patriotic", "peaceful", "pensive", "persevering", "persistent", "persuasive", "pessimistic", "petulant", "picky", "pitiful", "plain", "pleasant", "pleasing", "polite", "pompous", "poor", "popular", "positive", "precise", "pretentious", "pretty", "prim", "prompt", "proper", "proud", "provident", "prudence", "prudent", "punctilious", "punctual", "purpose", "puzzled", "quarrelsome", "quick", "quiet", "quixotic", "rambunctious", "rash", "rational", "refined", "reliable", "relieved", "religious", "reserved", "resourceful", "respectful", "responsible", "responsive", "restless", "restrained", "retiring", "rich", "risk-taking", "rowdy", "rude", "sad", "safe", "sarcastic", "satisfied", "saucy", "saving", "scared", "scheming", "scornful", "secretive", "secure", "sedate", "self-centered", "self-confident", "self-controlled", "self-disciplined", "selfish", "self-reliant", "sense of humour", "sensitive", "serious", "short", "shrewd", "shy", "silly", "simple", "simple-minded", "sincere", "skilful", "slovenly", "sly", "smart", "sneaky", "snobbish", "sober", "sociable", "sparing", "steady", "stingy", "stolid", "strange", "strict", "strong", "stubborn", "studious", "stupid", "suave", "submissive", "successful", "sullen", "supercilious", "superstitious", "supportive", "surly", "suspicious", "sweet", "taciturn", "tactful", "talented", "talkative", "tasteful", "team player", "tenacious", "tense", "terrified", "thankful", "thorough", "thoughtful", "thrifty", "thrilling", "timid", "tireless", "tolerant", "touchy", "trusting", "trustworthy", "truthful", "ugly", "uncontrolled", "uncouth", "unfriendly", "ungraceful", "unnatural", "unrefined", "unruly", "unscrupulous", "unselfish", "upright", "upset", "useful", "valiant", "versatile", "virtue", "visionary", "vivacious", "vulgar", "warm", "warm-hearted", "weak", "whimsical", "wild", "wise", "witty", "worried", "adventurous", "conventional", "substance-free", "substance-abuse (alcoholdrug)", "alert", "dull", "aware of opportunities", "ignorant of opportunities", "calm", "excitable", "nervous", "clean [ep to 9 levels]", "dirty", "unkempt", "clear goals", "lack of", "jumbled goals; directionless", "clear thoughts", "muddled thoughts", "confused", "completes", "leaves hanging", "doesn't complete", "comprehends", "doesn't comprehend", "conscious", "unconscious", "conscious of one's weaknesses", "unconscious of one's strengths", "constructive", "destructive", "complaining", "content-oriented", "outer", "surface", "form-oriented", "creative", "uncreative", "delegates", "tries to do everything", "deliberative", "reckless", "detail-oriented", "scrimps on details", "develops mental capabilities", "directed", "has direction", "directionless", "unfocused", "disciplined", "dissipating", "dynamic", "passive", "educated", "flexible", "inflexible", "rigid", "unbending", "stubborn", "forgiving", "unforgiving", "resentful", "spiteful", "focused", "unfocused", "scattered", "freedom given to others", "authoritarian", "controlling", "friendly", "unfriendly", "distant", "aloof", "hostile", "frugal", "thrifty", "wasteful", "spendthrift", "generous", "stingy", "miserly", "selfish", "goodwill", "ill-will", "malice", "hatred", "grateful", "ungrateful", "unappreciative", "hard-working", "lazy", "honest", "dishonest", "deceiving", "lying", "humble", "arrogant", "conceited", "ego-centric", "interested", "indifferent", "uncaring", "involved", "complacent", "indifferent", "jealous", "not", "jealous", "envious", "covetous", "kind", "unkind", "uncaring", "cruel", "mean", "mature", "immature", "modest", "vain", "open-minded", "tolerant", "narrow", "close", "small-minded", "intolerant", "optimistic", "pessimistic", "perfects ", "allows imperfection", "persistent", "sustaining", "flagging", "fleeting", "unsustaining", "positive", "negative", "practical", "impractical", "not viable", "punctual", "late", "not on time", "realistic", "unrealist", "impractical", "reliable", "unreliable", "undependable", "respectful", "disrespectful", "rude", "impolite", "responsibility; takes-", "blames others", "responsible [ep to 9 levels]", "unreliable", "undependable", "responsive", "unresponsive", "unreceptive", "self-confident", "lack of self confidence", "insecure", "self-directed", "directed by externals ", "self-disciplined", "undisciplined", "unrestrained", "indulgent", "self-esteem", "high", "self-esteem", "confidence - low", "self-giving", "self-centered", "self-reliant", "dependent", "selfless", "selfish", "sensitive", "Insensitive", "indifferent", "serious", "frivolous", "silly", "trivial", "sincere", "insincere", "dishonest", "social independence", "social approval required", "sympathetic", "unsympathetic", "unfeeling", "systematic", "unsystematic", "disorganized", "disorderly", "random", "takes others point of view", "insists on own view", "thoughtful towards others", "thoughtless", "inconsiderate", "callous", "trusting", "suspicious", "mistrusting", "unpretentious", "pretentious", "affected", "ostentatious", "unselfish", "selfish", "willing does", "willingness ", "unwilling", "reluctant", "recalcitrant", "work-oriented", "convenience first", "Show-off", "Prankster/Practical Joker", "Superstitious", "Over-confidant", "Passive-aggressive", "Bad with names; gets names mixed up", "No short term memory", "Never gets seasick", "Always keeps their cool", "Mooch", "Anal Retentive", "Narcissistic/Self-absorbed/shallow", "Pompous", "Promiscuous", "Alcoholic", "Depressed", "Masochist", "Will do anything for attention", "Obsesses", "Adaptability", "Aggressiveness", "Agreeableness", "Altruism", "Androgyny", "Assertiveness", "Authoritarianism", "Conformity", "Conscientiousness", "Conservatism", "Courage", "Creativity", "Cruelty", "Curiosity", "Cynicism", "Defensiveness", "Dependency", "Dishonesty", "Dogmatism", "Egalitarianism", "Egotism", "Emotional immaturity", "Emotional inferiority", "Emotional instability", "Emotional maturity", "Emotional stability", "Emotional superiority", "Emotionality", "Empathy", "Extraversion", "Femininity", "Gregariousness", "Hardiness", "Honesty", "Humility", "Hypnotic susceptibility", "Impulsivity", "Independence", "Initiative", "Integrity", "Introversion", "Irritability", "Liberalism", "Likability", "Loyalty", "Machiavelianism", "Masculinity", "Misanthropy", "Moodiness", "Narcissism", "Need for approval", "Need for cognition", "Negativism", "Nervousness", "Neuroticism", "Nonconformity", "Nurturance", "Obedience", "Objectivity", "Omnipotence", "Openmindedness", "Openess to experience", "Optimism", "Paranoia", "Passiveness", "Perseptiveness", "Perfectionism", "Persistance", "Pessimism", "Positivism", "Psychoticism", "Rebelliousness", "Resilience", "Rigidity", "Risk taking", "Self control", "Selfishness", "Sensation seeking", "Sensitivity", "Seriousness", "Sincerity", "Sociability", "Subjectivity", "Suggestibility", "Timidity", "Tolerance", "Charisma", "Codependency", "Cognitive style", "Coronary prone behavior", "Egocentrism", "Emotional security", "Five Factor Model", "Instrumentality", "Internal external locus of control", "Leadership qualities", "Sexuality", "Repression sensitization", "Accountable", "Active", "Adaptable", "Adventurous", "Affable", "Affectionate", "Agreeable ", "Alert", "Altruistic", "Analytical", "Appropriate", "Articulate", "Artistic ", "Assertive", "Astute", "Athletic", "Attentive ", "Attractive", "Aware", "Balanced", "Brave", "Brilliant", "Calm", "Candid", "Captivating", "Careful", "Caring", "Charming", "Cheerful", "Circumspect", "Clean", "Clearheaded", "Clever", "Collaborative", "Comfortable", "Commanding", "Committed", "Compassionate", "Competitive", "Concise", "Confident", "Conscious", "Considerate", "Constructive", "Content", "Cooperative", "Coordinated", "Courageous", "Courteous", "Creative", "Curious", "Decisive", "Dedicated", "Dependable", "Determined", "Devoted", "Direct", "Disarming", "Disciplined", "Driven", "Dynamic", "Eager", "Educated", "Efficient", "Egalitarian", "Elegant", "Eloquent", "Empathetic", "Encouraging", "Energetic", "Engaged", "Enterprising", "Enthusiastic", "Entrepreneurial", "Erudite", "Evenhanded", "Expressive", "Fair", "Faithful", "Flexible", "Fluent", "Focused", "Forgiving", "Friendly", "Fun ", "Funny", "Generous", "Genius", "Gentle", "Giving", "Good", "Graceful", "Grateful", "Gregarious", "Hard-working", "Hardy", "Healthy", "Helpful", "Honest", "Humble", "Imaginative", "Independent", "Industrious", "Influential", "Informed", "Innovative", "Insightful", "Inspired", "Inspiring", "Intelligent", "Intelligent", "Interested", "Intuitive", "Involved", "Joyful", "Just", "Kind", "Leader", "Likable", "Logical", "Loving", "Loyal", "Mannered", "Masculine", "Mature", "Methodical", "Moderate", "Modest", "Motivated", "Motivating", "Neat", "Noble", "Nuanced", "Nurturance", "Nurturing", "Obedient", "Objective", "Observant", "Open", "Open-minded", "Optimistic", "Orderly", "Organized", "Original", "Passionate", "Patient", "Perceptive", "Personable", "Poised", "Polite", "Positive", "Practical", "Precise ", "Productive", "Professional", "Punctual", "Quick", "Realistic", "Receptive", "Relaxed", "Reliable", "Resourceful", "Respectful", "Responsible", "Responsive", "Result-oriented", "Secure", "Self-aware", "Self-controlled", "Self-directed", "Self-disciplined", "Selfish", "Selfless", "Self-reliant", "Self-starter", "Sensitive", "Sensual", "Serious", "Shrewd", "Simple", "Sincere", "Skilled", "Sober", "Sociable", "Social independence", "Socially conscious", "Spiritual", "Steady", "Stoic", "Striving", "Strong", "Subtle", "Surprising", "Sweet", "Sympathetic", "Systematic", "Talented", "Tenacious", "Thorough", "Tolerant", "Trusting", "Trustworthy", "Unflappable", "Un-intimidated", "Unpretentious", "Unselfish", "Upstanding", "Versatile", "Visionary", "Willing"];
        const personalityQuirks = ["Talks about self in the third person", "Can't stand the sight of blood", "Names everything", "Never leaves a man behind", "Allergic to everything", "Colour Blind", "Albino", "Always chews gum/toothpick", "Dramatic/Interesting scar on (face/part of body)", "Unusual mole or birth mark (shaped like....)", "Missing a limb (and uses prosthetic)", "Always wears lucky hat (or other article of clothing)", "Doesn't bathe", "Heavily tattooed", "Excessively grooms self", "Asthma", "Gastroesophageal Reflux Disease AKA heartburn", "cross dresser/transvestite", "flat-chested/poorly endowed/well-endowed", "obese", "acne problems", "profusely hairy/astonishingly hairless", "very short/very tall", "Missing an eye", "cleft palate", "Missing one or more fingers", "Heavy accent", "Hoarse/gravelly voice from smoking, shouting, etc", "Parasitic twin", "Has parasites", "Strokes beard/twirls moustache/plays with hair/chews on hair", "Mouth breather", "No fashion sense", "Has one day left till retirement.", "Saw a dead body once.", "Carries a large coin which he or she is always rolling over his or her knuckles.", "Is a habitual sniffler even when he or she is healthy.", "Regularly looks up at the sky to check the position of the sun/moon and comments on it.", "Always knows the direction he or she is traveling in.", "Corrects people when they use colloquial speech.", "Is never seen without a baseball cap or stocking cap (except, of course, in bed or the shower)", "Whistles the Scarecrow/Tin Man/Cowardly Lion song at random time and refuses to stop.", "Ends declarative sentences with in interrogative inflection?", "Is a mush mouth.", "Is an incessant fidgeter and is always touching his or her face or head.", "Is unable to digest proteins correctly and gets very ill if too much protein rich food is consumed.", "story before, not because they were involved with it.", "Makes up random lies about unimportant things for no reason.", "Has a weakness for rescuing stray animals.", "Gets physically angry when people mispronounce a certain word.", "Regularly mispronounces a certain word or uses redundant terms.", "When stressed or lying, speaks from the corner of his or her mouth.", "Profusely sweats even when at rest.", "Is unable to take advice from anyone because he or she thinks that they know it all.", "Uses mundane items as toys (e.g. bottle caps, straws, chopsticks).", "Cannot drink anything with ice in it.", "Is strongly susceptible to brain freeze.", "Doesn’t wash his or her hands after using the bathroom.", "When dining out, always tidies up the table and resets the condiments.", "Walks in the middle of any aisle, sidewalk, or other shared walkway causing people to have to move around him or her.", "Drags his or her feet.", "Cannot stand the feel of glass in his or her hand.", "Draws random doodles on any piece of paper in front of him or her and always carries a pen or pencil to facilitate this habit.", "Wears only new socks.", "Has several hidden body piercings or tattoos that regular clothing conceal.", "Always stands with his or her hands behind their back, sometimes in an at ease position, though he or she was never in the military.", "Excessively uses initials or acronyms for common AND uncommon phrases and doesn’t bother to explain them.", "Doesn’t eat green things.", "Strongly dislikes the sound of chewing and hums a quiet song while eating.", "Has the ability to speak in a cartoon-like voice which sounds little or nothing like his or her real voice.", "Is thrifty nearly to the point of obsessive or compulsive nature.", "Is always at least ten minutes early to everything.", "Can calculate the total of any items but is always just off.", "Generally submits to the ideas and suggestions of others without thinking of his or her own needs.", "Readily puts him or her self in the way of danger without careful consideration.", "Always has change in his or her pocket to give to beggars or homeless.", "Is always trying to recruit people to his or her religious/philosophical beliefs.", "Constantly quotes favorite movies and can usually identify the movie that a quote may come from.", "Overly honest person, always telling the truth even to his or her own detriment.", "Takes stupid bets/dares for small amounts of money.", "Has several parts of his or her body that are double jointed and bend or flex in an unnatural or uncanny manner.", "Writes with left hand, but does everything else right-handed.", "Can only see out of one eye or hear out of one ear.", "Is susceptible to malapropisms or spoonerisms.", "Often stares off into nothing", "Unique eye or hair color", "Some discerning physical mark — birthmark, freckles, mole, or scar", "Wears unusual glasses", "Has braces and headgear", "Large feet — may mean they’re clumsy", "Bites their nails/lips or chews on their hair", "Constantly fidgeting and can’t sit still", "Acne, eczema, or other skin problems", "Many tattoos or piercings", "Often sick or has allergies (constantly sniffling/blowing their nose)", "Talks very loudly or quietly", "Says everything like it’s a question", "Terrible breath — may be a coffee drinker", "Gets sweaty easily (especially when nervous)", "Unusually hairy arms or legs", "Very long painted nails", "Always wears a faceful of makeup", "Has a stutter or other speech impediment", "Often tucks their hair behind their ears", "Constantly chews gum", "Always picking their teeth", "Smokes and has a raspy voice", "Breathes heavily or snores", "Is extremely muscular", "Walks very slowly or quickly", "Left-handed or ambidextrous", "Constantly scratching themselves", "Has some noticeable physical tic, like a twitch", "Always wears a distinct item of clothing or accessory", "Very introverted, quiet and reserved, keeps to themselves", "Highly extroverted, loves socializing and meeting new people", "Mega control freak who has to have everything their way", "Neat freak (often coincides with control freak)", "Total slob who never knows where anything is", "Super stubborn and will never admit when they’re wrong", "Brutally honest and can’t lie to save their life", "Extremely judgmental of other people", "Short-tempered, especially when irritated", "Always patient, even when frustrated", "Hilarious or odd sense of humor", "Very hard to make them laugh", "Loves to eat and is obsessed with food", "Loves to drink and is constantly partying", "Constantly complains about everything", "Extremely loyal and will do anything for their friends/family", "Adventurous and willing to try anything", "Cautious and careful no matter what", "Energetic, hardly ever needs to rest", "Sleeps all the time and still gets tired during the day", "Horrible sense of direction and constantly gets lost", "Overachiever who loves school/structure", "Really modest and won’t ever brag about themselves", "Extremely emotional and will cry at the drop of a hat", "Stoic and detached, rarely shows emotion", "Wildcard whose behavior is unpredictable, even to their friends", "Notoriously two-faced and will betray anyone", "Charismatic and can convince anyone to do their bidding", "Very proper and always polite to others", "Dates tons of people and has a new boyfriend or girlfriend every week", "Obsessive personality", "Fantastic cook or baker", "Skilled musician (piano, guitar, violin, etc.)", "Artistic talent (drawing, painting, sculpting, etc.)", "Model athlete (football, hockey, swimming, etc.)", "Great at voices/ventriloquy", "Can do sleight-of-hand — may be a pickpocket", "Speaks multiple languages, even obscure ones", "Knows everything about history", "Mathematical or scientific genius", "Brilliant coder and can hack into any database", "Skilled mechanical inventor", "Can build or put together anything", "Super-quick logical reasoning", "Exceptional memory/genius IQ (several of the above might fall under this one)", "Special connection with animals", "Super empathetic and understanding of other people", "Extremely fast runner", "Contortionist (can twist their body into any shape)", "Psychic talent (can predict the future)", "Super strength, flying, invisibility or other superpowers", "Unusually high tolerance for pain", "Survival skills like hunting and fishing", "Quick reflexes, acts fast in a crisis", "Brave and fearless, not scared of anything", "Able to talk their way out of any trouble/invent stories on the fly", "Awful rider", "Always running late", "Illegible handwriting", "Terrible at public speaking", "Socially awkward — hard for them to make friends", "Self-destructive and always wants what’s worst for them", "Gets blackout drunk every time they go out", "Extremely conceited or arrogant", "Compulsive liar", "Manipulative of friends", "Gets jealous over nothing", "Often mean for no reason", "Unbelievably self-centered", "Extremely passive-aggressive", "Dresses all in one color", "Always dresses too nicely for the occasion", "Walks around barefoot, even in stores and other public places", "Hates being inside, sleeps and goes to the bathroom outdoors", "Can’t help but look in every mirror/lake reflection they pass", "Preps their meals three weeks in advance", "Makes their own (terrible) abstract art and hangs it on their walls", "Gets super excited about Christmas and then really depressed in January", "Refuses to wear glasses even though they need them", "Carries around a secret teddy bear", "Has been wearing the same friendship bracelet for three years", "Keeps clothing very neat", "Will a shop or restaurant if someone walks in with a baby", "Extremely superstitious (knocks on wood, avoids the number 13, etc.)", "Drops everything other people ask them to hold", "Likes to go out dancing by themselves", "Prefers to have the lights off or dimmed at all times", "Always wears multiple sweaters on top of each other", "Won’t eat anything that doesn’t have bread (at least on the side)", "Thinks they’re a time-traveler from the medieval era", "Gives friends and family excellent homemade presents", "Has an imaginary friend they still talk to, even in adulthood", "Owns a lizard that they try and use as a guard dog", "Leaves little hidden notes", "Uses tissues to interact with public items", "Wears their hair in Princess Leia buns", "Never goes a day without talking to their mom", "Hums “In the Hall of the Mountain King” when they get stressed", "Clucks their tongue while walking, so they sound like a horse", "Loves hanging out in completely empty places", "Convinced they’re going to die in a freak accident", "Grows all their own food in their vegetable garden", "Eats vegetarian, but only out of guilt", "Loves the beach but hates swimming", "Flicks people in the forehead when they get annoyed", "Laughs at everything, even bad jokes"]



        const calcStatus = status => {

            var figure = (e, l) => {

                if (l === 0) return [e, l]
                if (e == "Brass" && l > 5) {
                    e = "Silver";
                    l = l - 5
                }
                if (e == "Silver" && l > 5) {
                    e = "Gold";
                    l = l - 5
                }

                return [e, l]

            }


            var levels = [
                "Brass",
                "Silver",
                "Gold",
            ]


            var x = status.split(" ")
            var stat = x[0]
            var level = parseInt(x[1])




            return [
                figure(stat, level).join(" "),
                figure(stat, level + 1).join(" "),
                figure(stat, level + 2).join(" "),
                figure(stat, level + 3).join(" "),


            ]

        }
        var CareerSocial = ["Brass 3", "Brass 4", "Brass 4", "Brass 1",
            "Brass 4", "Brass 2", "Brass 3", "Brass 3",
            "Brass 1", "Brass 2", "Brass 0", "Silver 1",
            "Silver 2", "Brass 2", "Silver 1", "Brass 3",
            "Silver 2", "Silver 1", "Silver 3", "Silver 2",
            "Gold 1", "Silver 1", "Brass 3", "Silver 1",
            "Silver 1", "Brass 1", "Brass 2", "Brass 2",
            "Brass 2", "Brass 1", "Brass 3", "Brass 2",
            "Silver 1", "Silver 1", "Brass 3", "Brass 0",
            "Brass 3", "Brass 1", "Brass 5", "Silver 1",
            "Silver 1", "Brass 4", "Brass 2", "Silver 1",
            "Silver 1", "Brass 2", "Brass 3", "Brass 2",
            "Brass 1", "Brass 3", "Silver 1", "Brass 2",
            "Brass 1", "Brass 1", "Brass 3", "Brass 1",
            "Silver 2", "Silver 1", "Silver 3", "Brass 4",
            "Brass 2", "Brass 2", "Silver 1", "Brass 2"
        ];


        var StatsHuman = [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20];
        var StatsDwarf = [30, 20, 20, 30, 10, 20, 30, 20, 40, 10];
        var StatsHalfling = [10, 30, 10, 20, 20, 20, 30, 20, 30, 30];
        var StatsHElf = [30, 30, 20, 20, 30, 40, 30, 30, 30, 20];
        var StatsWElf = [30, 30, 20, 20, 30, 40, 30, 30, 30, 20];
        var StatsGnome = [20, 10, 10, 15, 30, 30, 30, 30, 40, 15];
        var TalentStartHuman = ["Doomed", "Savvy or Suave", "Random", "Random", "Random"];
        var TalentStartDwarf = ["Magic Resistance", "Night Vision", "Read/Write or Relentless", "Resolute or Strong-Minded", "Sturdy"];
        var TalentStartHalfling = ["Acute Sense (Taste)", "Night Vision", "Resistance (Chaos)", "Small", "Random", "Random"];
        var TalentStartHElf = ["Acute Sense (Vision)", "Coolheaded or Savvy", "Night Vision", "Second Sight or Sixth Sense", "Read/Write"];
        var TalentStartWElf = ["Acute Sense (Vision)", "Hardy or Second Sight", "Night Vision", "Read/Write or Very Resilient", "Rover"];
        var TalentStartGnome = ["Beneath Notice or Suffuse with Ulgu", "Luck or Mimic", "Night Vision", "Fisherman or Read/Write", "Second Sight or Sixth Sense", "Small"];

        var classes = {
            Academics: ["Apothecary", "Engineer", "Lawyer", "Nun", "Physician", "Priest", "Scholar", "Wizard", ],
            Burghers: ["Agitator", "Artisan", "Beggar", "Investigator", "Merchant", "Rat Catcher", "Townsman", "Watchman", ],
            Courtiers: ["Advisor", "Artist", "Duellist", "Envoy", "Noble", "Servant", "Spy", "Warden", ],
            Peasants: ["Bailiff", "Hedge Witch", "Herbalist", "Hunter", "Miner", "Mystic", "Scout", "Villager", ],
            Rangers: ["Bounty Hunter", "Coachman", "Entertainer", "Flagellant", "Messenger", "Pedlar", "Roadwarden", "Witch Hunter", ],
            Riverfolk: ["Boatman", "Huffer", "Riverwoman", "Riverwarden", "Seaman", "Smuggler", "Stevedore", "Wrecker", ],
            Rogues: ["Bawd", "Charlatan", "Fence", "Grave Robber", "Outlaw", "Thief", "Racketeer", "Witch", ],
            Warriors: ["Cavalryman", "Guard", "Knight", "Pit Fighter", "Protagonist", "Soldier", "Troll Slayer", "Warrior Priest", ],
        }
        const findClass = career => {
            var x = Object.keys(classes).find(rclass => classes[rclass].includes(career))
            if (!x) throw ["cant find", career];
            return x
        }



        var CareerAll = ["Apothecary", "Engineer", "Lawyer", "Nun",
            "Physician", "Priest", "Scholar", "Wizard",
            "Agitator", "Artisan", "Beggar", "Investigator",
            "Merchant", "Rat Catcher", "Townsman", "Watchman",
            "Advisor", "Artist", "Duellist", "Envoy",
            "Noble", "Servant", "Spy", "Warden",
            "Bailiff", "Hedge Witch", "Herbalist", "Hunter",
            "Miner", "Mystic", "Scout", "Villager",
            "Bounty Hunter", "Coachman", "Entertainer", "Flagellant",
            "Messenger", "Pedlar", "Roadwarden", "Witch Hunter",
            "Boatman", "Huffer", "Riverwoman", "Riverwarden",
            "Seaman", "Smuggler", "Stevedore", "Wrecker",
            "Bawd", "Charlatan", "Fence", "Grave Robber",
            "Outlaw", "Racketeer", "Thief", "Witch",
            "Cavalryman", "Guard", "Knight", "Pit Fighter",
            "Protagonist", "Soldier", "Troll Slayer", "Warrior Priest"
        ];


        var races = {
            "Human": {},
            "Dwarf": {},
            "Halfling": {},
            "High Elf": {},
            "Wood Elf": {},
            "Gnome": {},
        }

        const findStats = race => {
            //honestly i dont care about this so im not going to do it
            var combos = {
                "Human": [StatsHuman, TalentStartHuman],
                "Dwarf": [StatsDwarf, TalentStartDwarf],
                "Halfling": [StatsHalfling, TalentStartHalfling],
                "High Elf": [StatsHElf, TalentStartHElf],
                "Wood Elf": [StatsWElf, TalentStartWElf],
                "Gnome": [StatsGnome, TalentStartGnome],
            }

            return combos[race]
        }

        var racialStats = {
            "Human": {},
            "Dwarf": {},
            "Halfling": {},
            "High Elf": {},
            "Wood Elf": {},
            "Gnome": {},
        }

        var careerMapping = {
            "Human": CareerHuman,
            "Dwarf": CareerDwarf,
            "Halfling": CareerHalfling,
            "High Elf": CareerHElf,
            "Wood Elf": CareerWElf,
            "Gnome": CareerGnome,
        }

        var data = {
            careers: {},
            races: racialStats,
            personality: {
                quirks: personalityQuirks,
                traits: personalityTraits
            }
        }
        CareerAll.forEach(c => data.careers[c] = { races: JSON.parse(JSON.stringify(races)) })
        Object.keys(data.careers).forEach(c => Object.keys(data.careers[c].races).forEach(r => data.careers[c].races[r].chances = 0))
        // var x = CareerHuman
        //     .filter(val => val > 0)
        //     .filter(val => data.careers[val])
        //     .forEach(val => data.careers[val])

        // CareerHuman
        // CareerAll
        // var roll = Math.round(Math.random() * 100)
        console.log("rolling")

        function findOdds(careerChoices) {
            console.log("finding choies")
            return [...Array(100).keys()].map(roll => {
                var i = 0

                while (careerChoices[i] < roll) {
                    i += 1;
                }
                return CareerAll[i]
            })

        }
        Object.keys(careerMapping).forEach(race => {
            console.log("race", race)
            var careerChances = findOdds(careerMapping[race])
            careerChances.forEach(career => {
                // console.log(race, career, data.careers[career].races[race].chances)
                data.careers[career].races[race].chances
                data.careers[career].races[race].chances += 1

            })

        })
        Object.keys(data.careers).forEach((career, i, x) => {
            // console.log(career, i, CareerSocial[i])
            // var w = calcStatus(CareerSocial[i])
            // console.log(w)
            data.careers[career].status = calcStatus(CareerSocial[i])
        })


        data.classes = {
            Academics: {},
            Burghers: {},
            Courtiers: {},
            Peasants: {},
            Rangers: {},
            Riverfolk: {},
            Rogues: {},
            Warriors: {},
        }
        // console.log(data)

        Object.keys(data.careers).forEach(career => data.classes[findClass(career)][career] = data.careers[career])

        delete data.careers
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });


        // console.log(findOdds(CareerHuman))

        // CareerN = i;
        // console.log()



        // var careers = CareerHuman.map(val => CareerAll[val])
        // function downloadObjectAsJson(exportObj, exportName) {
        //     var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
        //     var downloadAnchorNode = document.createElement('a');
        //     downloadAnchorNode.setAttribute("href", dataStr);
        //     downloadAnchorNode.setAttribute("download", exportName + ".json");
        //     document.body.appendChild(downloadAnchorNode); // required for firefox
        //     downloadAnchorNode.click();
        //     downloadAnchorNode.remove();
        // }

        // downloadObjectAsJson(data, "data")
        console.log("downloading")

        ///////// ########## END GENERATION SECTION