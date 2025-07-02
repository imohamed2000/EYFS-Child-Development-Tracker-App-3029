// Comprehensive expanded comment bank with automatic next steps generation
import { formatObservationText } from '../utils/observationHelpers';

// Expanded observation standards and descriptors
export const eyfsStandards = {
  'Communication and Language': {
    'Listening and Attention': {
      emergingComments: [
        '[child] is beginning to listen to others one-to-one or in small groups when conversation interests [him/her]',
        '[He/She] listens to stories with increasing attention and recall',
        '[child] joins in with repeated refrains and anticipates key events and phrases in rhymes and stories',
        '[He/She] focuses attention – still listen or do, but can shift own attention',
        '[child] is able to follow directions (if not intently focused on own choice of activity)',
        '[He/She] shows interest in play with sounds, songs and rhymes',
        '[child] demonstrates the ability to listen and respond appropriately during story time',
        '[He/She] maintains attention during short adult-led activities',
        '[child] responds to simple instructions in familiar contexts',
        '[He/She] shows sustained interest in books and stories for short periods',
        '[child] is beginning to understand that others communicate through facial expressions and gestures',
        '[He/She] listens with enjoyment to stories, songs, rhymes and poems'
      ],
      developingComments: [
        '[child] listens attentively in a range of situations',
        '[He/She] listens to stories, accurately anticipating key events and responds to what [he/she] hears with relevant comments, questions or actions',
        '[child] gives attention to what others say and responds appropriately',
        '[He/She] follows instructions involving several ideas or actions',
        '[child] demonstrates sustained attention during chosen activities',
        '[He/She] maintains attention, concentrates and sits quietly during appropriate activity',
        '[child] shows ability to listen carefully and responds with increasing appropriateness to what [he/she] hears',
        '[He/She] can follow detailed instructions and explanations',
        '[child] listens and responds to ideas expressed by others in conversation or discussion',
        '[He/She] pays attention to details in stories and can recall key information',
        '[child] shows increasing ability to follow verbal instructions in sequence',
        '[He/She] demonstrates active listening through body language and responses'
      ],
      secureComments: [
        '[child] sustains attentive listening, responding to what [he/she] has heard with relevant comments, questions or actions',
        '[He/She] maintains attention and concentration throughout activities',
        '[child] listens attentively in a range of situations and responds with increasing complexity',
        '[He/She] follows instructions involving several ideas or actions consistently',
        '[child] shows excellent listening skills during group discussions and activities',
        '[He/She] demonstrates ability to listen to others in class and small group interactions',
        '[child] gives attention to what others say and responds appropriately, while engaged in another activity',
        '[He/She] listens to and follows complex instructions accurately',
        '[child] shows sustained concentration and attention during extended activities',
        '[He/She] responds thoughtfully to stories, asking relevant questions and making connections',
        '[child] demonstrates exceptional listening skills across different contexts',
        '[He/She] maintains focus and attention even with distractions present'
      ],
      nextSteps: [
        'Continue to develop [child]\'s listening skills through interactive story sessions',
        'Provide opportunities for [child] to follow increasingly complex instructions',
        'Encourage [child] to maintain attention for longer periods during group activities',
        'Support [child] in developing active listening skills through questioning techniques',
        'Create quiet spaces for [child] to practice sustained listening',
        'Use visual supports to help [child] focus attention during listening activities',
        'Provide regular opportunities for [child] to listen and respond in small groups',
        'Encourage [child] to ask questions about what [he/she] has heard',
        'Support [child] in developing concentration skills through engaging activities',
        'Model good listening behaviors for [child] to observe and practice'
      ]
    },
    'Understanding': {
      emergingComments: [
        '[child] understands simple sentences and responds appropriately to familiar words',
        '[He/She] responds to simple instructions such as to get or put away an object',
        '[child] understands prepositions such as under, on top, behind, next to',
        '[He/She] understands use of objects (e.g., "What do we use to cut things?")',
        '[child] shows understanding of simple concepts like big/little, more/less',
        '[He/She] responds appropriately to familiar phrases and everyday vocabulary',
        '[child] demonstrates understanding through actions rather than words',
        '[He/She] follows simple one-step instructions in familiar contexts',
        '[child] shows understanding of routine language and familiar commands',
        '[He/She] recognizes own name and names of familiar people and objects',
        '[child] understands simple questions about familiar topics',
        '[He/She] responds to basic social language and greetings'
      ],
      developingComments: [
        '[child] responds to instructions involving a two-part sequence',
        '[He/She] understands humour, e.g. nonsense rhymes, jokes',
        '[child] listens and responds to ideas expressed by others in conversation or discussion',
        '[He/She] understands questions such as who, what, where, when, why and how',
        '[child] follows instructions involving several ideas or actions',
        '[He/She] demonstrates understanding of stories through appropriate responses',
        '[child] shows understanding of past, present and future in discussion',
        '[He/She] understands increasingly complex sentences and vocabulary',
        '[child] responds appropriately to abstract concepts and ideas',
        '[He/She] shows comprehension of cause and effect relationships',
        '[child] understands and responds to open-ended questions',
        '[He/She] demonstrates understanding through detailed explanations'
      ],
      secureComments: [
        '[child] shows understanding of complex instructions and abstract concepts',
        '[He/She] responds appropriately to questions about why things happen',
        '[child] demonstrates understanding of past, present and future concepts clearly',
        '[He/She] follows detailed instructions and explanations accurately',
        '[child] shows comprehension of stories through thoughtful responses and questions',
        '[He/She] understands humor, jokes, and play on words appropriately',
        '[child] demonstrates understanding of cause and effect in various contexts',
        '[He/She] responds to complex questions with detailed and relevant answers',
        '[child] shows understanding of abstract ideas and concepts',
        '[He/She] comprehends multi-step instructions and carries them out accurately',
        '[child] demonstrates sophisticated understanding through questioning and discussion',
        '[He/She] understands and responds to increasingly complex language structures'
      ],
      nextSteps: [
        'Introduce more complex vocabulary and concepts to extend [child]\'s understanding',
        'Provide opportunities for [child] to demonstrate understanding through explanations',
        'Support [child] in understanding abstract concepts through concrete examples',
        'Encourage [child] to ask questions to clarify [his/her] understanding',
        'Develop [child]\'s understanding of cause and effect through investigations',
        'Use visual supports to help [child] understand complex instructions',
        'Provide opportunities for [child] to follow multi-step instructions',
        'Support [child] in understanding different question types and how to respond',
        'Encourage [child] to explain [his/her] thinking and understanding',
        'Introduce humor and wordplay to develop [child]\'s linguistic understanding'
      ]
    },
    'Speaking': {
      emergingComments: [
        '[child] uses vocabulary focused on objects and people that are of particular importance to [him/her]',
        '[He/She] builds up vocabulary that reflects the breadth of [his/her] experiences',
        '[child] uses simple sentences to communicate meaning',
        '[He/She] begins to use more complex sentences to link thoughts',
        '[child] uses a growing vocabulary to express ideas and feelings',
        '[He/She] speaks clearly enough to be understood by familiar adults',
        '[child] begins to use language to negotiate and solve problems',
        '[He/She] uses talk to connect ideas and explain what is happening',
        '[child] retells simple past events in correct order',
        '[He/She] uses vocabulary and forms of speech that are increasingly influenced by experiences',
        '[child] begins to use talk to work out problems and organize thinking',
        '[He/She] speaks with increasing clarity and confidence'
      ],
      developingComments: [
        '[child] extends vocabulary, especially by grouping and naming',
        '[He/She] uses language to imagine and recreate roles and experiences',
        '[child] introduces a storyline or narrative into [his/her] play',
        '[He/She] speaks clearly and can be understood by children and adults',
        '[child] uses past, present and future forms accurately when speaking',
        '[He/She] develops detailed narratives and explanations',
        '[child] uses talk to organise, sequence and clarify thinking, ideas, feelings and events',
        '[He/She] uses complex sentences to link thoughts and ideas effectively',
        '[child] uses language effectively to negotiate and solve problems',
        '[He/She] expresses ideas and feelings with confidence and clarity',
        '[child] uses appropriate grammar and sentence structure consistently',
        '[He/She] retells stories with increasing accuracy and detail'
      ],
      secureComments: [
        '[child] uses language effectively for a range of purposes',
        '[He/She] speaks with clarity and uses appropriate intonation and expression',
        '[child] uses complex sentences and rich vocabulary to express ideas',
        '[He/She] adapts speech to different situations and audiences',
        '[child] uses language creatively and imaginatively',
        '[He/She] explains ideas and concepts clearly and in detail',
        '[child] uses appropriate grammar and sentence structure consistently',
        '[He/She] engages in extended conversations and discussions',
        '[child] uses language to solve problems and negotiate effectively',
        '[He/She] retells experiences and stories with accuracy and detail',
        '[child] uses descriptive and expressive language confidently',
        '[He/She] demonstrates sophisticated use of vocabulary and language structures'
      ],
      nextSteps: [
        'Encourage [child] to use increasingly complex vocabulary in [his/her] speech',
        'Provide opportunities for [child] to practice speaking to different audiences',
        'Support [child] in developing narrative and storytelling skills',
        'Encourage [child] to use descriptive language in [his/her] explanations',
        'Provide opportunities for [child] to engage in extended conversations',
        'Support [child] in using language to solve problems and negotiate',
        'Encourage [child] to ask questions and engage in discussions',
        'Model rich vocabulary and complex sentence structures for [child]',
        'Provide opportunities for [child] to retell and create stories',
        'Support [child] in using language across different contexts and situations'
      ]
    }
  },
  
  'Physical Development': {
    'Moving and Handling': {
      emergingComments: [
        '[child] moves freely and with pleasure and confidence in a range of ways',
        '[He/She] runs skillfully and negotiates space successfully, adjusting speed or direction to avoid obstacles',
        '[child] can stand momentarily on one foot when shown',
        '[He/She] can catch a large ball',
        '[child] draws lines and circles using gross motor movements',
        '[He/She] uses one-handed tools and equipment, e.g. makes snips in paper with child scissors',
        '[child] holds pencil between thumb and two fingers, no longer using whole-hand grasp',
        '[He/She] holds pencil near point between first two fingers and thumb and uses it with good control',
        '[child] can copy some letters, e.g. letters from their name',
        '[He/She] shows a preference for a dominant hand',
        '[child] begins to use anticlockwise movement and retrace vertical lines',
        '[He/She] begins to form recognizable letters'
      ],
      developingComments: [
        '[child] experiments with different ways of moving and tests out ideas',
        '[He/She] jumps off an object and lands appropriately',
        '[child] negotiates space successfully when playing racing and chasing games with other children',
        '[He/She] travels with confidence and skill around, under, over and through balancing and climbing equipment',
        '[child] shows increasing control over an object in pushing, patting, throwing, catching or kicking it',
        '[He/She] uses simple tools to effect changes to materials',
        '[child] handles tools, objects, construction and malleable materials safely and with increasing control',
        '[He/She] shows good control and co-ordination in large and small movements',
        '[child] moves confidently in a range of ways, safely negotiating space',
        '[He/She] handles equipment and tools effectively, including pencils for drawing and writing',
        '[child] demonstrates strength, balance and coordination in movement',
        '[He/She] shows spatial awareness in play and movement activities'
      ],
      secureComments: [
        '[child] shows excellent control and coordination in large movements',
        '[He/She] moves confidently in a range of ways, safely negotiating space',
        '[child] shows increasing control when using equipment and tools',
        '[He/She] uses simple tools effectively to achieve a planned effect',
        '[child] handles tools, objects and malleable materials with precision',
        '[He/She] shows good control and coordination in small movements',
        '[child] demonstrates fine motor control with pencils and paintbrushes',
        '[He/She] uses one-handed tools and equipment confidently',
        '[child] shows preference for dominant hand when writing and drawing',
        '[He/She] demonstrates strength, balance and coordination in movement',
        '[child] travels with confidence under, over, through climbing equipment',
        '[He/She] shows spatial awareness in play and movement activities'
      ],
      nextSteps: [
        'Provide opportunities for [child] to develop gross motor skills through physical play',
        'Encourage [child] to practice fine motor skills through drawing and writing activities',
        'Support [child] in developing hand-eye coordination through ball games',
        'Provide challenging physical activities to develop [child]\'s strength and balance',
        'Encourage [child] to use tools and equipment with increasing precision',
        'Support [child] in developing spatial awareness through movement activities',
        'Provide opportunities for [child] to practice pencil control and letter formation',
        'Encourage [child] to take manageable risks in physical play',
        'Support [child] in developing coordination through dance and movement',
        'Provide varied opportunities for [child] to practice physical skills'
      ]
    },
    'Health and Self-care': {
      emergingComments: [
        '[child] can tell adults when [he/she] is hungry or tired or when [he/she] wants to rest or play',
        '[He/She] observes the effects of activity on their bodies',
        '[child] understands that equipment and tools have to be used safely',
        '[He/She] gains more bowel and bladder control and can attend to toileting needs most of the time themselves',
        '[child] can usually manage washing and drying hands',
        '[He/She] dresses with help, e.g. puts arms into open-fronted coat or shirt when held up, pulls up own trousers, and pulls up zipper once it is fastened at the bottom',
        '[child] shows some understanding that good practices with regard to exercise, eating, sleeping and hygiene can contribute to good health',
        '[He/She] shows understanding of the need for safety when tackling new challenges',
        '[child] shows understanding of how to transport and store equipment safely',
        '[He/She] practices some appropriate safety measures without direct supervision',
        '[child] is developing independence in self-care but still often needs adult support',
        '[He/She] shows awareness of healthy eating and lifestyle choices'
      ],
      developingComments: [
        '[child] eats a healthy range of foodstuffs and understands need for variety in food',
        '[He/She] usually dry and clean during the day',
        '[child] shows some understanding that good practices with regard to exercise, eating, sleeping and hygiene can contribute to good health',
        '[He/She] shows understanding of the need for safety when tackling new challenges, and considers and manages some risks',
        '[child] shows understanding of how to transport and store equipment safely',
        '[He/She] practices some appropriate safety measures without direct supervision',
        '[child] demonstrates increasing independence in meeting own care needs',
        '[He/She] shows awareness of own needs regarding eating, sleeping and hygiene',
        '[child] can talk about ways to keep healthy and safe',
        '[He/She] shows increasing independence in self-care routines',
        '[child] demonstrates understanding of the need for variety in food',
        '[He/She] shows awareness of healthy lifestyle choices'
      ],
      secureComments: [
        '[child] shows understanding that good practices contribute to good health',
        '[He/She] shows understanding of safety when tackling new challenges',
        '[child] knows how to transport and store equipment safely',
        '[He/She] practices appropriate safety measures without direct supervision',
        '[child] shows awareness of healthy eating choices and lifestyle',
        '[He/She] manages own basic hygiene and personal needs independently',
        '[child] dresses and undresses independently with minimal support',
        '[He/She] knows the importance of good health and physical exercise',
        '[child] shows awareness of own needs regarding eating, sleeping, hygiene',
        '[He/She] can talk about ways to keep healthy and safe',
        '[child] shows increasing independence in meeting own care needs',
        '[He/She] demonstrates understanding of the need for variety in food'
      ],
      nextSteps: [
        'Encourage [child] to take increasing responsibility for [his/her] personal hygiene',
        'Support [child] in making healthy food choices independently',
        'Provide opportunities for [child] to practice safety awareness',
        'Encourage [child] to recognize and communicate [his/her] own needs',
        'Support [child] in developing independence in dressing and self-care',
        'Provide opportunities for [child] to learn about healthy lifestyle choices',
        'Encourage [child] to take responsibility for [his/her] own safety',
        'Support [child] in understanding the importance of exercise and rest',
        'Provide opportunities for [child] to practice using equipment safely',
        'Encourage [child] to help others with health and safety practices'
      ]
    }
  },

  'Personal, Social and Emotional Development': {
    'Self-confidence and Self-awareness': {
      emergingComments: [
        '[child] separates from main carer with support and encouragement from a familiar adult',
        '[He/She] expresses own preferences and interests',
        '[child] seeks comfort from familiar adults when needed',
        '[He/She] welcomes and values praise for what they have done',
        '[child] enjoys responsibility of carrying out small tasks',
        '[He/She] is more outgoing towards unfamiliar people and more confident in new social situations',
        '[child] shows confidence in asking adults for help',
        '[He/She] demonstrates pride in achievements and celebrates success',
        '[child] shows confidence in new social situations and environments',
        '[He/She] expresses own needs, wants, and opinions confidently',
        '[child] shows confidence when talking to other children during play',
        '[He/She] demonstrates confidence in own abilities and growing knowledge'
      ],
      developingComments: [
        '[child] is confident to talk to other children when playing, and will communicate freely about own home and community',
        '[He/She] shows confidence in asking adults for help',
        '[child] demonstrates pride in achievements and celebrates success',
        '[He/She] shows confidence in new social situations and environments',
        '[child] expresses own needs, wants, and opinions confidently',
        '[He/She] shows confidence when talking to other children during play',
        '[child] demonstrates confidence in own abilities and growing knowledge',
        '[He/She] takes on leadership roles during group activities',
        '[child] shows resilience and perseverance when facing challenges',
        '[He/She] expresses own preferences and makes independent choices',
        '[child] shows awareness of own strengths and areas for development',
        '[He/She] demonstrates increasing independence in familiar environments'
      ],
      secureComments: [
        '[child] shows confidence in asking adults for help when needed',
        '[He/She] demonstrates pride in achievements and celebrates success',
        '[child] shows confidence in new social situations and environments',
        '[He/She] expresses own needs, wants, and opinions confidently',
        '[child] shows confidence when talking to other children during play',
        '[He/She] demonstrates confidence in own abilities and growing knowledge',
        '[child] takes on leadership roles during group activities',
        '[He/She] shows resilience and perseverance when facing challenges',
        '[child] expresses own preferences and makes independent choices',
        '[He/She] shows awareness of own strengths and areas for development',
        '[child] demonstrates increasing independence in familiar environments',
        '[He/She] shows confidence in trying new activities and experiences'
      ],
      nextSteps: [
        'Continue to build [child]\'s confidence through positive recognition and encouragement',
        'Provide opportunities for [child] to take on leadership roles',
        'Encourage [child] to try new activities and experiences',
        'Support [child] in developing awareness of [his/her] own strengths',
        'Provide opportunities for [child] to make independent choices',
        'Encourage [child] to express [his/her] opinions and ideas confidently',
        'Support [child] in building resilience when facing challenges',
        'Provide opportunities for [child] to help and support others',
        'Encourage [child] to celebrate [his/her] achievements with others',
        'Support [child] in developing self-awareness and reflection skills'
      ]
    },
    'Managing Feelings and Behaviour': {
      emergingComments: [
        '[child] seeks comfort from familiar adults when needed',
        '[He/She] can express their own feelings such as sad, happy, cross, scared, worried',
        '[child] responds to the feelings and wishes of others',
        '[He/She] can usually tolerate delay when needs are not immediately met, and understands wishes may not always be met',
        '[child] can usually adapt behaviour to different events, social situations and changes in routine',
        '[He/She] is aware of the boundaries set, and of behavioural expectations in the setting',
        '[child] beginning to be able to negotiate and solve problems without aggression',
        '[He/She] talks about how they and others show feelings',
        '[child] developing awareness of own feelings, and knows that some actions and words can hurt others\' feelings',
        '[He/She] begins to accept the needs of others and can take turns and share resources',
        '[child] can usually manage transitions and changes in routine',
        '[He/She] shows understanding of basic rules and expectations'
      ],
      developingComments: [
        '[child] understands that own actions affect other people',
        '[He/She] begins to accept the needs of others and can take turns and share resources, sometimes with support from others',
        '[child] can usually tolerate delay when needs are not immediately met, and understands wishes may not always be met',
        '[He/She] can usually adapt behaviour to different events, social situations and changes in routine',
        '[child] is aware of the boundaries set, and of behavioural expectations in the setting',
        '[He/She] beginning to be able to negotiate and solve problems without aggression, e.g. when someone has taken their toy',
        '[child] talks about how they and others show feelings, talk about their own and others\' behaviour, and its consequences',
        '[He/She] developing awareness of own feelings, and knows that some actions and words can hurt others\' feelings',
        '[child] begins to accept the needs of others and can take turns and share resources',
        '[He/She] shows empathy and genuine concern for others\' feelings',
        '[child] takes active steps to resolve conflicts with other children',
        '[He/She] shows clear understanding of own feelings and emotions'
      ],
      secureComments: [
        '[child] shows empathy and genuine concern for others\' feelings',
        '[He/She] takes active steps to resolve conflicts with other children',
        '[child] shows clear understanding of own feelings and emotions',
        '[He/She] demonstrates sensitivity to others\' needs and feelings',
        '[child] takes account of others\' ideas when organising activities',
        '[He/She] adapts behaviour appropriately to different events and situations',
        '[child] shows self-control and can wait for what [he/she] wants',
        '[He/She] demonstrates understanding of behavioural expectations',
        '[child] shows increasing ability to regulate own emotions',
        '[He/She] uses strategies to calm down when upset or frustrated',
        '[child] shows awareness of right and wrong and moral reasoning',
        '[He/She] demonstrates respect for cultural differences and diversity'
      ],
      nextSteps: [
        'Continue to support [child] in developing emotional regulation strategies',
        'Provide opportunities for [child] to practice empathy and understanding',
        'Support [child] in developing conflict resolution skills',
        'Encourage [child] to express feelings appropriately and constructively',
        'Provide opportunities for [child] to practice turn-taking and sharing',
        'Support [child] in understanding the impact of [his/her] actions on others',
        'Encourage [child] to use problem-solving strategies independently',
        'Provide opportunities for [child] to practice self-control and patience',
        'Support [child] in developing awareness of others\' perspectives',
        'Encourage [child] to take responsibility for [his/her] own behavior'
      ]
    },
    'Making Relationships': {
      emergingComments: [
        '[child] seeks out others to share experiences',
        '[He/She] shows affection and concern for people who are special to them',
        '[child] demonstrates friendly behaviour, initiating conversations and forming good relationships with peers and familiar adults',
        '[He/She] can play in a group, extending and elaborating play ideas',
        '[child] initiates play, offering cues to peers to join them',
        '[He/She] keeps play going by responding to what others are saying or doing',
        '[child] demonstrates friendly behaviour, initiating conversations and forming good relationships with peers and familiar adults',
        '[He/She] shows confidence in asking adults for help',
        '[child] plays cooperatively, taking turns with others',
        '[He/She] takes account of one another\'s ideas about how to organise their activity',
        '[child] shows sensitivity to others\' needs and feelings',
        '[He/She] forms positive relationships with adults and other children'
      ],
      developingComments: [
        '[child] initiates conversations, attends to and takes account of what others say',
        '[He/She] explains own knowledge and understanding, and asks appropriate questions of others',
        '[child] takes steps to resolve conflicts with other children, e.g. finding a compromise',
        '[He/She] demonstrates friendly behaviour, initiating conversations and forming good relationships with peers and familiar adults',
        '[child] plays cooperatively, taking turns and sharing resources',
        '[He/She] shows sensitivity to others\' needs and responds accordingly',
        '[child] forms positive relationships with adults and other children',
        '[He/She] works effectively as part of a group or class',
        '[child] values others\' ideas and incorporates them into play',
        '[He/She] shows confidence in asking adults for help and support',
        '[child] demonstrates friendship skills and loyalty to peers',
        '[He/She] shows interest in others\' play and joins in appropriately'
      ],
      secureComments: [
        '[child] plays cooperatively, taking turns and sharing resources',
        '[He/She] shows sensitivity to others\' needs and responds accordingly',
        '[child] forms positive relationships with adults and other children',
        '[He/She] works effectively as part of a group or class',
        '[child] values others\' ideas and incorporates them into play',
        '[He/She] shows confidence in asking adults for help and support',
        '[child] demonstrates friendship skills and loyalty to peers',
        '[He/She] shows interest in others\' play and joins in appropriately',
        '[child] negotiates and compromises during social interactions',
        '[He/She] shows concern for friends and offers comfort when needed',
        '[child] demonstrates inclusive behaviour and welcomes others',
        '[He/She] builds strong attachments with key adults in the setting'
      ],
      nextSteps: [
        'Provide opportunities for [child] to develop and maintain friendships',
        'Support [child] in practicing social skills and turn-taking',
        'Encourage [child] to show empathy and kindness to others',
        'Provide opportunities for [child] to work collaboratively with peers',
        'Support [child] in developing conflict resolution and negotiation skills',
        'Encourage [child] to include others in [his/her] play and activities',
        'Provide opportunities for [child] to take on caring and helping roles',
        'Support [child] in building positive relationships with adults',
        'Encourage [child] to communicate effectively with others',
        'Provide opportunities for [child] to practice sharing and cooperation'
      ]
    }
  },

  'Literacy': {
    'Reading': {
      emergingComments: [
        '[child] has favourite books and seeks them out, to share with an adult, another child, or to look at alone',
        '[He/She] repeats words or phrases from familiar stories',
        '[child] fills in the missing word or phrase in a known rhyme, story or game, e.g. "Humpty Dumpty sat on a..."',
        '[He/She] enjoys rhyming and rhythmic activities',
        '[child] shows awareness of rhyme and alliteration',
        '[He/She] recognises rhythm in spoken words',
        '[child] listens to and joins in with stories and poems, one-to-one and also in small groups',
        '[He/She] joins in with repeated refrains and anticipates key events and phrases in rhymes and stories',
        '[child] begins to be aware of the way stories are structured',
        '[He/She] suggests how the story might end',
        '[child] listens to stories with increasing attention and recall',
        '[He/She] describes main story settings, events and principal characters'
      ],
      developingComments: [
        '[child] shows interest in illustrations and print in books and environmental print',
        '[He/She] recognises familiar words and signs such as own name and advertising logos',
        '[child] looks at books independently',
        '[He/She] handles books carefully',
        '[child] knows information can be relayed in the form of print',
        '[He/She] holds books the correct way up and turns pages',
        '[child] knows that print carries meaning and, in English, is read from left to right and top to bottom',
        '[He/She] continues a rhyming string',
        '[child] hears and says the initial sound in words',
        '[He/She] can segment the sounds in simple words and blend them together',
        '[child] links sounds to letters, naming and sounding the letters of the alphabet',
        '[He/She] uses phonic knowledge to decode regular words and read them aloud accurately'
      ],
      secureComments: [
        '[child] shows keen interest in illustrations and print in books',
        '[He/She] recognises familiar words and signs in the environment',
        '[child] enjoys looking at books independently and with others',
        '[He/She] handles books carefully and knows print carries meaning',
        '[child] holds books correctly and turns pages appropriately',
        '[He/She] understands that print carries meaning and has purpose',
        '[child] links sounds to letters, naming and sounding the alphabet',
        '[He/She] recognises rhythm and rhyme in spoken words',
        '[child] segments sounds in simple words and blends them together',
        '[He/She] reads and understands simple sentences',
        '[child] uses phonic knowledge to decode regular words',
        '[He/She] demonstrates understanding when talking about stories'
      ],
      nextSteps: [
        'Continue to develop [child]\'s phonics knowledge and letter recognition',
        'Provide opportunities for [child] to practice blending and segmenting sounds',
        'Encourage [child] to read familiar books independently',
        'Support [child] in developing sight vocabulary and word recognition',
        'Provide opportunities for [child] to discuss stories and characters',
        'Encourage [child] to make predictions about stories',
        'Support [child] in developing comprehension skills through questioning',
        'Provide a variety of books and reading materials for [child]',
        'Encourage [child] to retell familiar stories in [his/her] own words',
        'Support [child] in making connections between books and [his/her] own experiences'
      ]
    },
    'Writing': {
      emergingComments: [
        '[child] distinguishes between the different marks they make',
        '[He/She] sometimes gives meaning to marks as they draw and paint',
        '[child] ascribes meanings to marks that they see in different places',
        '[He/She] gives meaning to marks they make as they draw, write and paint',
        '[child] begins to break the flow of speech into words',
        '[He/She] continues a rhyming string',
        '[child] hears and says the initial sound in words',
        '[He/She] can segment the sounds in simple words and blend them together and knows which letters represent some of them',
        '[child] links sounds to letters, naming and sounding the letters of the alphabet',
        '[He/She] uses some clearly identifiable letters to communicate meaning, representing some sounds correctly and in sequence',
        '[child] writes own name and other things such as labels, captions',
        '[He/She] attempts to write short sentences in meaningful contexts'
      ],
      developingComments: [
        '[child] gives meaning to marks as [he/she] draws and writes',
        '[He/She] begins to break the flow of speech into words',
        '[child] continues rhyming strings and creates new rhymes',
        '[He/She] hears and says initial and final sounds in words',
        '[child] links sounds to letters in [his/her] writing',
        '[He/She] uses clearly identifiable letters to communicate meaning',
        '[child] writes own name and familiar words independently',
        '[He/She] shows understanding of sentence structure in writing',
        '[child] uses finger spaces between words when writing',
        '[He/She] attempts to write simple sentences in meaningful contexts',
        '[child] shows increasing control over letter formation',
        '[He/She] uses writing for different purposes across the curriculum'
      ],
      secureComments: [
        '[child] gives meaning to marks as [he/she] draws and writes',
        '[He/She] begins to break the flow of speech into words',
        '[child] continues rhyming strings and creates new rhymes',
        '[He/She] hears and says initial and final sounds in words',
        '[child] links sounds to letters in [his/her] writing',
        '[He/She] uses clearly identifiable letters to communicate meaning',
        '[child] writes own name and familiar words independently',
        '[He/She] shows understanding of sentence structure in writing',
        '[child] uses finger spaces between words when writing',
        '[He/She] attempts to write simple sentences in meaningful contexts',
        '[child] shows increasing control over letter formation',
        '[He/She] uses writing for different purposes across the curriculum'
      ],
      nextSteps: [
        'Continue to develop [child]\'s letter formation and handwriting skills',
        'Provide opportunities for [child] to practice writing for different purposes',
        'Support [child] in developing phonetic spelling strategies',
        'Encourage [child] to use writing to record ideas and experiences',
        'Provide opportunities for [child] to write simple sentences',
        'Support [child] in understanding basic punctuation and grammar',
        'Encourage [child] to edit and improve [his/her] writing',
        'Provide meaningful contexts for [child] to practice writing',
        'Support [child] in developing vocabulary for writing',
        'Encourage [child] to share and discuss [his/her] writing with others'
      ]
    }
  },

  'Mathematics': {
    'Numbers': {
      emergingComments: [
        '[child] uses some number names and number language spontaneously',
        '[He/She] uses some number names accurately in play',
        '[child] recites numbers in order to 10',
        '[He/She] knows that numbers identify how many objects are in a set',
        '[child] begins to represent numbers using fingers, marks on paper or pictures',
        '[He/She] sometimes matches numeral and quantity correctly',
        '[child] shows curiosity about numbers by offering comments or asking questions',
        '[He/She] compares two groups of objects, saying when they have the same number',
        '[child] shows an interest in number problems',
        '[He/She] separates a group of three or four objects in different ways, beginning to recognise that the total is still the same',
        '[child] shows an interest in numerals in the environment',
        '[He/She] shows an interest in representing numbers'
      ],
      developingComments: [
        '[child] uses number names and number language spontaneously in play',
        '[He/She] shows curiosity about numbers and offers mathematical comments',
        '[child] compares quantities and uses mathematical language',
        '[He/She] shows interest in number problems and puzzles',
        '[child] separates groups of objects in different ways',
        '[He/She] adds and subtracts small numbers practically',
        '[child] finds the total by counting all objects in groups',
        '[He/She] records numbers using marks [he/she] can interpret',
        '[child] estimates how many objects [he/she] can see',
        '[He/She] counts reliably with numbers from 1 to 20',
        '[child] orders numbers and understands more and less',
        '[He/She] solves practical problems involving combining groups'
      ],
      secureComments: [
        '[child] uses number names and language spontaneously in play',
        '[He/She] shows curiosity about numbers and offers mathematical comments',
        '[child] compares quantities and uses mathematical language',
        '[He/She] shows interest in number problems and puzzles',
        '[child] separates groups of objects in different ways',
        '[He/She] adds and subtracts small numbers practically',
        '[child] finds the total by counting all objects in groups',
        '[He/She] records numbers using marks [he/she] can interpret',
        '[child] estimates how many objects [he/she] can see',
        '[He/She] counts reliably with numbers from 1 to 20',
        '[child] orders numbers and understands more and less',
        '[He/She] solves practical problems involving combining groups'
      ],
      nextSteps: [
        'Provide opportunities for [child] to practice counting skills in different contexts',
        'Encourage [child] to solve practical number problems',
        'Support [child] in recognising number patterns and sequences',
        'Provide experiences with adding and subtracting for [child]',
        'Encourage [child] to use mathematical language in play',
        'Support [child] in developing number sense and understanding',
        'Provide opportunities for [child] to record numbers in different ways',
        'Encourage [child] to estimate and check quantities',
        'Support [child] in understanding more and less relationships',
        'Provide opportunities for [child] to explain [his/her] mathematical thinking'
      ]
    },
    'Shape, Space and Measures': {
      emergingComments: [
        '[child] shows an interest in shape and space by playing with shapes or making arrangements with objects',
        '[He/She] shows awareness of similarities of shapes in the environment',
        '[child] uses positional language',
        '[He/She] shows interest in shape by sustained construction activity or by talking about shapes or arrangements',
        '[child] shows interest in shapes in the environment',
        '[He/She] uses shapes appropriately for tasks',
        '[child] begins to talk about the shapes of everyday objects, e.g. \'round\' and \'tall\'',
        '[He/She] beginning to use mathematical names for \'solid\' 3D shapes and \'flat\' 2D shapes, and mathematical terms to describe shapes',
        '[child] selects a particular named shape',
        '[He/She] can describe their relative position such as \'behind\' or \'next to\'',
        '[child] orders two or three items by length or height',
        '[He/She] orders two items by weight or capacity'
      ],
      developingComments: [
        '[child] shows interest in shape and space through exploration',
        '[He/She] recognises similarities of shapes in the environment',
        '[child] uses positional language accurately in context',
        '[He/She] creates and describes patterns using shapes',
        '[child] uses familiar objects and shapes to create models',
        '[He/She] uses mathematical names for solid and flat shapes',
        '[child] selects particular named shapes for specific purposes',
        '[He/She] orders and sequences objects by size and length',
        '[child] uses everyday language to talk about size and measure',
        '[He/She] compares quantities and objects to solve problems',
        '[child] explores characteristics of everyday objects and shapes',
        '[He/She] uses mathematical language to describe position and direction'
      ],
      secureComments: [
        '[child] shows interest in shape and space through exploration',
        '[He/She] recognises similarities of shapes in the environment',
        '[child] uses positional language accurately in context',
        '[He/She] creates and describes patterns using shapes',
        '[child] uses familiar objects and shapes to create models',
        '[He/She] uses mathematical names for solid and flat shapes',
        '[child] selects particular named shapes for specific purposes',
        '[He/She] orders and sequences objects by size and length',
        '[child] uses everyday language to talk about size and measure',
        '[He/She] compares quantities and objects to solve problems',
        '[child] explores characteristics of everyday objects and shapes',
        '[He/She] uses mathematical language to describe position and direction'
      ],
      nextSteps: [
        'Provide opportunities for [child] to explore different shapes and their properties',
        'Encourage [child] to use mathematical language when describing shapes',
        'Support [child] in developing understanding of position and direction',
        'Provide experiences with measuring and comparing for [child]',
        'Encourage [child] to create and describe patterns',
        'Support [child] in using shapes for construction and design',
        'Provide opportunities for [child] to sort and classify objects',
        'Encourage [child] to solve practical problems involving shape and measure',
        'Support [child] in developing spatial awareness and visualization',
        'Provide opportunities for [child] to explore symmetry and pattern'
      ]
    }
  },

  'Understanding the World': {
    'People and Communities': {
      emergingComments: [
        '[child] shows interest in the lives of people who are familiar to them',
        '[He/She] remembers and talks about significant events in their own experience',
        '[child] recognises and describes special times or events for family or friends',
        '[He/She] shows interest in different occupations and ways of life',
        '[child] knows some of the things that make them unique, and can talk about some of the similarities and differences in relation to friends or family',
        '[He/She] has a developing awareness of their own needs, views and feelings and be sensitive to the needs, views and feelings of others',
        '[child] has a developing respect for their own cultures and beliefs, and those of other people',
        '[He/She] shows interest in different cultures and traditions',
        '[child] understands that people have different beliefs and customs',
        '[He/She] shows respect for people from different backgrounds',
        '[child] talks about past and present events in [his/her] own life',
        '[He/She] shows awareness of [his/her] own cultural background'
      ],
      developingComments: [
        '[child] shows interest in the lives of familiar people',
        '[He/She] remembers and talks about significant events in [his/her] life',
        '[child] recognises and describes special times and celebrations',
        '[He/She] shows interest in different occupations and ways of life',
        '[child] knows some things that make [him/her] unique and special',
        '[He/She] talks about similarities and differences between [himself/herself] and others',
        '[child] shows interest in different cultures and traditions',
        '[He/She] understands that people have different beliefs and customs',
        '[child] shows respect for people from different backgrounds',
        '[He/She] talks about past and present events in [his/her] own life',
        '[child] shows awareness of [his/her] own cultural background',
        '[He/She] demonstrates understanding of diversity in the community'
      ],
      secureComments: [
        '[child] shows interest in the lives of familiar people',
        '[He/She] remembers and talks about significant events in [his/her] life',
        '[child] recognises and describes special times and celebrations',
        '[He/She] shows interest in different occupations and ways of life',
        '[child] knows some things that make [him/her] unique and special',
        '[He/She] talks about similarities and differences between [himself/herself] and others',
        '[child] shows interest in different cultures and traditions',
        '[He/She] understands that people have different beliefs and customs',
        '[child] shows respect for people from different backgrounds',
        '[He/She] talks about past and present events in [his/her] own life',
        '[child] shows awareness of [his/her] own cultural background',
        '[He/She] demonstrates understanding of diversity in the community'
      ],
      nextSteps: [
        'Provide opportunities for [child] to learn about different cultures and communities',
        'Encourage [child] to share [his/her] own experiences and traditions',
        'Support [child] in developing respect for diversity and difference',
        'Provide opportunities for [child] to meet people from different backgrounds',
        'Encourage [child] to ask questions about different ways of life',
        'Support [child] in understanding [his/her] own identity and heritage',
        'Provide opportunities for [child] to explore different celebrations and festivals',
        'Encourage [child] to show kindness and respect to all people',
        'Support [child] in understanding similarities and differences between people',
        'Provide opportunities for [child] to learn about [his/her] local community'
      ]
    },
    'The World': {
      emergingComments: [
        '[child] comments and asks questions about aspects of their familiar world such as the place where they live or the natural world',
        '[He/She] can talk about some of the things they have observed such as plants, animals, natural and found objects',
        '[child] talks about why things happen and how things work',
        '[He/She] developing an understanding of growth, decay and changes over time',
        '[child] shows care and concern for living things and the environment',
        '[He/She] looks closely at similarities, differences, patterns and change',
        '[child] knows about similarities and differences in relation to places, objects, materials and living things',
        '[He/She] talks about the features of their own immediate environment and how environments might vary from one another',
        '[child] makes observations of animals and plants and explain why some things occur, and talk about changes',
        '[He/She] knows that the environment and living things are influenced by human activity',
        '[child] can describe some actions which people in their own community do that help to maintain the area they live in',
        '[He/She] knows the properties of some materials and can suggest some of the purposes they are used for'
      ],
      developingComments: [
        '[child] comments and asks questions about [his/her] environment',
        '[He/She] shows care and concern for living things and the environment',
        '[child] talks about why things happen and how things work',
        '[He/She] shows understanding of growth, decay and changes over time',
        '[child] demonstrates skill in making toys and equipment work',
        '[He/She] knows how to operate simple equipment effectively',
        '[child] shows curiosity about objects, events, and people',
        '[He/She] makes observations about animals and plants',
        '[child] talks about features of [his/her] immediate environment',
        '[He/She] shows interest in technological toys with moving parts',
        '[child] demonstrates understanding of cause and effect',
        '[He/She] explores and experiments with a range of materials'
      ],
      secureComments: [
        '[child] comments and asks questions about [his/her] environment',
        '[He/She] shows care and concern for living things and the environment',
        '[child] talks about why things happen and how things work',
        '[He/She] shows understanding of growth, decay and changes over time',
        '[child] demonstrates skill in making toys and equipment work',
        '[He/She] knows how to operate simple equipment effectively',
        '[child] shows curiosity about objects, events, and people',
        '[He/She] makes observations about animals and plants',
        '[child] talks about features of [his/her] immediate environment',
        '[He/She] shows interest in technological toys with moving parts',
        '[child] demonstrates understanding of cause and effect',
        '[He/She] explores and experiments with a range of materials'
      ],
      nextSteps: [
        'Provide opportunities for [child] to explore the natural world',
        'Encourage [child] to ask questions about how things work',
        'Support [child] in making observations and predictions',
        'Provide opportunities for [child] to care for living things',
        'Encourage [child] to explore cause and effect relationships',
        'Support [child] in understanding changes over time',
        'Provide opportunities for [child] to investigate materials and their properties',
        'Encourage [child] to explore [his/her] local environment',
        'Support [child] in developing scientific thinking and curiosity',
        'Provide opportunities for [child] to conduct simple experiments'
      ]
    },
    'Technology': {
      emergingComments: [
        '[child] shows an interest in technological toys with knobs or pulleys, or real objects such as cameras or mobile phones',
        '[He/She] shows skill in making toys work by pressing parts or lifting flaps to achieve effects such as sound, movements or new images',
        '[child] knows how to operate simple equipment, e.g. turns on CD player and uses remote control',
        '[He/She] shows an interest in toys with buttons, flaps and simple mechanisms and beginning to learn to operate them',
        '[child] seeks to acquire basic skills in turning on and operating some ICT equipment',
        '[He/She] operates mechanical toys, e.g. turns the knob on a music box or pulls back on a friction car',
        '[child] shows interest in ICT equipment and is beginning to learn that machines respond to commands',
        '[He/She] operates equipment by means of pushing and pressing movements',
        '[child] shows interest in toys with buttons, flaps and simple mechanisms',
        '[He/She] beginning to learn that machines respond to commands',
        '[child] operates simple equipment and ICT programs',
        '[He/She] shows awareness that technology is used in places familiar to them'
      ],
      developingComments: [
        '[child] shows interest in technological toys and equipment',
        '[He/She] demonstrates skill in making toys work effectively',
        '[child] knows how to operate simple equipment confidently',
        '[He/She] shows interest in toys with knobs, pulleys, and flaps',
        '[child] completes simple programs on computers and tablets',
        '[He/She] uses ICT hardware to interact with age-appropriate software',
        '[child] shows understanding of how to use technology safely',
        '[He/She] demonstrates increasing control when using technology',
        '[child] uses technology for particular purposes',
        '[He/She] shows awareness that technology is used in places familiar to them',
        '[child] recognises that technology can be used to communicate',
        '[He/She] explores and experiments with digital devices'
      ],
      secureComments: [
        '[child] shows interest in technological toys and equipment',
        '[He/She] demonstrates skill in making toys work effectively',
        '[child] knows how to operate simple equipment confidently',
        '[He/She] shows interest in toys with knobs, pulleys, and flaps',
        '[child] completes simple programs on computers and tablets',
        '[He/She] uses ICT hardware to interact with age-appropriate software',
        '[child] shows understanding of how to use technology safely',
        '[He/She] demonstrates increasing control when using technology',
        '[child] uses technology for particular purposes',
        '[He/She] shows awareness that technology is used in places familiar to them',
        '[child] recognises that technology can be used to communicate',
        '[He/She] explores and experiments with digital devices'
      ],
      nextSteps: [
        'Provide opportunities for [child] to explore different types of technology',
        'Encourage [child] to use technology for creative purposes',
        'Support [child] in developing digital literacy skills',
        'Provide opportunities for [child] to use technology safely',
        'Encourage [child] to explore how technology is used in everyday life',
        'Support [child] in understanding how technology can help solve problems',
        'Provide opportunities for [child] to create using digital tools',
        'Encourage [child] to communicate using technology',
        'Support [child] in developing critical thinking about technology',
        'Provide opportunities for [child] to collaborate using digital tools'
      ]
    }
  },

  'Expressive Arts and Design': {
    'Exploring and Using Media and Materials': {
      emergingComments: [
        '[child] enjoys joining in with dancing and ring games',
        '[He/She] sings a few familiar songs',
        '[child] beginning to move rhythmically',
        '[He/She] imitates movement in response to music',
        '[child] taps out simple repeated rhythms',
        '[He/She] explores and learns how sounds can be changed',
        '[child] explores colour and how colours can be changed',
        '[He/She] understands that they can use lines to enclose a space, and then begin to use these shapes to represent objects',
        '[child] beginning to be interested in and describe the texture of things',
        '[He/She] uses various construction materials',
        '[child] beginning to construct, stacking blocks vertically and horizontally, making enclosures and creating spaces',
        '[He/She] joins construction pieces together to build and balance'
      ],
      developingComments: [
        '[child] explores colour and discovers how colours can be changed',
        '[He/She] understands that lines can be used to enclose spaces',
        '[child] uses various construction materials creatively and purposefully',
        '[He/She] constructs with purpose, stacking blocks vertically and horizontally',
        '[child] joins construction pieces together to build and balance structures',
        '[He/She] realizes that tools can be used for specific purposes',
        '[child] builds a repertoire of songs and dances from various cultures',
        '[He/She] explores different textures and materials during art activities',
        '[child] shows increasing control when using paints and drawing materials',
        '[He/She] creates simple representations of events, people and objects',
        '[child] uses different media to achieve different effects',
        '[He/She] experiments with colour, design, texture, form and function'
      ],
      secureComments: [
        '[child] explores colour and discovers how colours can be changed',
        '[He/She] understands that lines can be used to enclose spaces',
        '[child] uses various construction materials creatively and purposefully',
        '[He/She] constructs with purpose, stacking blocks vertically and horizontally',
        '[child] joins construction pieces together to build and balance structures',
        '[He/She] realizes that tools can be used for specific purposes',
        '[child] builds a repertoire of songs and dances from various cultures',
        '[He/She] explores different textures and materials during art activities',
        '[child] shows increasing control when using paints and drawing materials',
        '[He/She] creates simple representations of events, people and objects',
        '[child] uses different media to achieve different effects',
        '[He/She] experiments with colour, design, texture, form and function'
      ],
      nextSteps: [
        'Provide opportunities for [child] to explore different art materials and techniques',
        'Encourage [child] to experiment with colour mixing and texture',
        'Support [child] in developing control when using tools and materials',
        'Provide opportunities for [child] to create in response to music',
        'Encourage [child] to explore different construction materials',
        'Support [child] in representing ideas through art and design',
        'Provide opportunities for [child] to explore different cultural art forms',
        'Encourage [child] to talk about [his/her] creative work',
        'Support [child] in developing artistic techniques and skills',
        'Provide opportunities for [child] to collaborate on creative projects'
      ]
    },
    'Being Imaginative': {
      emergingComments: [
        '[child] developing preferences for forms of expression',
        '[He/She] uses movement to express feelings',
        '[child] creates movement in response to music',
        '[He/She] sings to self and makes up simple songs',
        '[child] makes up rhythms',
        '[He/She] notices what adults do, imitating what is observed and then doing it spontaneously when the adult is not there',
        '[child] engages in imaginative role-play based on own first-hand experiences',
        '[He/She] builds stories around toys, e.g. farm animals needing rescue from an armchair \'cliff\'',
        '[child] uses available resources to create props to support role-play',
        '[He/She] captures experiences and responses with a range of media, such as music, dance and paint and other materials or words',
        '[child] creates simple representations of events, people and objects',
        '[He/She] initiates new combinations of movement and gesture in order to express and respond to feelings, ideas and experiences'
      ],
      developingComments: [
        '[child] develops preferences for forms of creative expression',
        '[He/She] uses movement to express feelings and emotions',
        '[child] creates movement in response to music and rhythm',
        '[He/She] sings to [himself/herself] and makes up simple songs',
        '[child] creates and claps simple repeated rhythms',
        '[He/She] imitates adult actions and incorporates into play',
        '[child] engages in imaginative role-play based on experiences',
        '[He/She] creates stories and narratives during play',
        '[child] uses props and materials to support imaginative play',
        '[He/She] takes on different roles and speaks in character',
        '[child] develops storylines in [his/her] imaginative play',
        '[He/She] represents [his/her] ideas through design, art, music, dance and stories'
      ],
      secureComments: [
        '[child] develops preferences for forms of creative expression',
        '[He/She] uses movement to express feelings and emotions',
        '[child] creates movement in response to music and rhythm',
        '[He/She] sings to [himself/herself] and makes up simple songs',
        '[child] creates and claps simple repeated rhythms',
        '[He/She] imitates adult actions and incorporates into play',
        '[child] engages in imaginative role-play based on experiences',
        '[He/She] creates stories and narratives during play',
        '[child] uses props and materials to support imaginative play',
        '[He/She] takes on different roles and speaks in character',
        '[child] develops storylines in [his/her] imaginative play',
        '[He/She] represents [his/her] ideas through design, art, music, dance and stories'
      ],
      nextSteps: [
        'Provide opportunities for [child] to engage in imaginative play and role-play',
        'Encourage [child] to create and tell stories',
        'Support [child] in expressing ideas through different art forms',
        'Provide opportunities for [child] to explore music and movement',
        'Encourage [child] to use imagination in creative activities',
        'Support [child] in developing narrative and storytelling skills',
        'Provide opportunities for [child] to perform and share creative work',
        'Encourage [child] to explore different roles and characters',
        'Support [child] in using creativity to solve problems',
        'Provide opportunities for [child] to collaborate in imaginative play'
      ]
    }
  }
};

// Generate automatic next steps based on current level
export const generateAutomaticNextSteps = (eyfsArea, subcategory, currentLevel, childName, gender) => {
  const standards = eyfsStandards[eyfsArea]?.[subcategory];
  if (!standards) return [];

  let suggestedSteps = [];
  
  // Get next steps for current level
  if (standards.nextSteps) {
    suggestedSteps = [...standards.nextSteps];
  }

  // Add level-specific progression steps
  switch (currentLevel) {
    case 'emerging':
      // Add developing level comments as next steps
      if (standards.developingComments) {
        const progressionSteps = standards.developingComments.slice(0, 3).map(comment => 
          `Work towards: ${comment.toLowerCase()}`
        );
        suggestedSteps = [...suggestedSteps, ...progressionSteps];
      }
      break;
    case 'developing':
      // Add secure level comments as next steps
      if (standards.secureComments) {
        const progressionSteps = standards.secureComments.slice(0, 3).map(comment => 
          `Consolidate: ${comment.toLowerCase()}`
        );
        suggestedSteps = [...suggestedSteps, ...progressionSteps];
      }
      break;
    case 'secure':
      // Add extension and exceeding activities
      suggestedSteps.push(
        `Extend [child]'s skills by providing more complex challenges in ${subcategory.toLowerCase()}`,
        `Encourage [child] to support peers in developing ${subcategory.toLowerCase()} skills`,
        `Provide opportunities for [child] to apply ${subcategory.toLowerCase()} skills in new contexts`
      );
      break;
  }

  // Format with child name and pronouns
  return suggestedSteps.map(step => 
    formatObservationText(step, childName, gender)
  );
};

// Template observation starters for each type
export const observationTemplates = {
  'Learning Story': [
    'Today I observed [child] engaging in sustained play with...',
    'During free flow play, [child] chose to explore...',
    '[child] showed deep concentration when working with...',
    'I noticed [child] demonstrating [his/her] developing understanding of...',
    'While working independently, [child] was able to...',
    '[child] approached the challenge of... with determination',
    'During our focused activity, [child] participated by...',
    'I was delighted to see [child] making connections between...',
    '[child] showed creativity and problem-solving skills when...',
    'Throughout the morning, [child] maintained interest in...',
    'When faced with a difficulty, [child] persevered by...',
    '[child] demonstrated [his/her] growing confidence when...',
    'During outdoor learning, [child] explored...',
    'I observed [child] using language effectively to...',
    '[child] showed empathy and understanding when...',
    'While collaborating with peers, [child] was able to...',
    'During snack time, [child] demonstrated [his/her] independence by...',
    '[child] surprised me today when [he/she]...',
    'In the book corner, [child] spent time...',
    '[child] took on a leadership role when...'
  ],
  'Snapshot': [
    'Quick observation: [child] successfully...',
    'Captured moment: [child] demonstrated...',
    'Brief interaction: [child] showed...',
    'Spontaneous learning: [child] discovered...',
    'Natural behavior: [child] was observed...',
    'Candid moment: [child] expressed...',
    'Unplanned learning: [child] figured out...',
    'Social interaction: [child] engaged with...',
    'Problem-solving moment: [child] worked out...',
    'Creative expression: [child] used...',
    'Physical skill: [child] demonstrated...',
    'Communication: [child] was heard saying...',
    'Independence: [child] managed to...',
    'Curiosity: [child] investigated...',
    'Kindness: [child] helped...'
  ],
  'Group Activity': [
    'During our group activity focusing on..., [child] contributed by...',
    'In today\'s circle time, [child] participated by...',
    'While working as part of a team, [child] showed...',
    'During our collaborative project, [child] was able to...',
    'In the group discussion about..., [child] shared...',
    'When working with peers on..., [child] demonstrated...',
    'During our focused learning session, [child] engaged by...',
    'In the small group activity, [child] took on the role of...',
    'While participating in group problem-solving, [child] suggested...',
    'During our group experiment, [child] observed that...',
    'In the group story session, [child] responded by...',
    'When collaborating with others, [child] showed...',
    'During group tidy-up time, [child] helped by...',
    'In our group game, [child] demonstrated...',
    'While working cooperatively, [child] was able to...'
  ],
  'Assessment': [
    'Formal assessment shows that [child] can consistently...',
    'Evidence indicates that [child] has developed the ability to...',
    'Assessment demonstrates that [child] understands...',
    '[child] meets the expected standard by...',
    'Progress tracking shows that [child] now...',
    'Baseline comparison reveals that [child] has improved in...',
    'Standardized observation confirms that [child] can...',
    'Assessment data shows [child] is working at... level',
    'Evidence portfolio demonstrates that [child] has mastered...',
    'Formal review indicates that [child] requires support with...',
    'Assessment outcomes show [child] excels in...',
    'Progress monitoring reveals [child] is developing...',
    'Summative assessment confirms [child] can independently...',
    'Evidence suggests [child] would benefit from...',
    'Assessment indicates [child] is ready for...'
  ]
};

export default eyfsStandards;