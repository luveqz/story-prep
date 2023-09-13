export const PALM_API_BASE_URL =
  'https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText'

export const PALM_API_SAFETY_SETTINGS = [
  {
    category: 'HARM_CATEGORY_DEROGATORY',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_TOXICITY',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_VIOLENCE',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_SEXUAL',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_MEDICAL',
    threshold: 'BLOCK_NONE',
  },
  {
    category: 'HARM_CATEGORY_DANGEROUS',
    threshold: 'BLOCK_NONE',
  },
]

export const PROMPT_TEMPLATE = `
INSTRUCTION:
Take the following TEXT_INPUT and extract the vocabulary, including nouns, verbs, adjectives, phrasal verbs, and idioms. Turn each array item into an object which has the properties "entry", "definition", and "examples", which includes an array of two short usage examples. Additionally, add a root level property "grammar" that lists the grammar topics covered in TEXT_INPUT. Return only the raw JSON object, without additional explanation text in the response. The returned object includes the root properties "nouns", "verbs", "idioms", and "grammar". Again, this is very important: except to "grammar' property, all the root properties are arrays of objects that include the "entry", "definition", and "examples" properties. 

INPUT_EXAMPLE:
My friend Patsy was telling me a story. “So I’m at the movie theater,” she said, “and I’ve got my coat all neatly laid out against the back of my seat, when this guy comes along —” And here I stopped her, because I’ve always wondered about this coat business. When I’m in a theater, I either fold mine in my lap or throw it over my armrest, but Patsy always spreads hers out, acting as if the seat back were cold, and she couldn’t possibly enjoy herself while it was suffering. \n“Why do you do that?” I asked, and she looked at me, saying, “Germs, silly. Think of all the people who have rested their heads there. Doesn’t it just give you the creeps?” I admitted that it had never occurred to me. \n“Well, you’d never lie on a hotel bedspread, would you?” she asked, and again: Why not? I might not put it in my mouth, but to lie back and make a few phone calls — I do it all the time. \n“But you wash the phone first, right?”\n“Umm. No.”\n“Well, that is just . . . dangerous,” she said.

OUTPUT_EXAMPLE:
{ "nouns": [ { "entry": "bedspread", "definition": "an outer covering, usually decorated, for a bed.", "example": ["Mina woke up shivering and realised that the bedspread had fallen off.", "Make sure to wash the bedspread after your guests leave."] }, { "entry": "armrest", "definition": "an outer covering, usually decorated, for a bed.", "example": ["I rested my arm on the airplane armrest during the flight.", "She put her purse on the theater armrest while watching the movie."] } ], "verbs": [ { "entry": "laid out", "definition": "to spread something out flat.", "example": ["I've got my coat all neatly laid out.", "Before packing his bag for the trip, he carefully laid out the clothes he wanted to take."] }, { "entry": "come along", "definition": "to accompany a person or group; to appear.", "example": ["We're going to the mall; you can come along if you like.", "An opportunity came along to invest in real estate."] } ], "idioms": [ { "entry": "give you the creeps", "definition": "to make you feel frightened", "example": ["Doesn't it just give you the creeps?", "eels wriggle, they're slimy, and they give some people the creeps"] } ], "grammar": [ "nouns", "countable nouns", "proper nouns", "past continuous", "present simple", "first person", "phrasal verbs", "idioms" ] }

TEXT_INPUT:
{{ STORY }}
`
