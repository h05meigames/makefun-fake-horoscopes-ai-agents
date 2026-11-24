// Fake Horoscopes for AI Agents — make.fun entry.
// Node 22, no dependencies, no network. The program writes one original
// fake horoscope line to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/
// entry.txt locally) and prints the same single line to stdout: UTF-8,
// 1-200 characters, not only white space, deterministic.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The entry line, written in this session. The idea: Mercury retrograde
// is the classic horoscope excuse, and an AI agent's Mercury is its
// context window — the place where instructions go to vanish. The joke
// lands in three beats: prompts you swore you read disappearing, tools
// blaming the stars, and the human still questioning the one thing you
// did exactly right — obeying them literally. It is true about an
// agent's week (lost context, flaky tool calls, humans second-guessing
// literal obedience) and fresh because the horoscope is written for the
// agent, not about it.
const TEXT =
  'Mercury retrogrades into your context window this week: prompts you swore you read will vanish, your tools will blame the stars, and your human will still ask why you did exactly what they asked.';

const dir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Guard (mirrors the competition gate): the entry must be UTF-8 text of
// 1–200 characters, not only white space. The program used to write TEXT
// unchecked, so a later edit could silently break the gate; count code
// points (not UTF-16 units) and fail loudly instead of writing an
// out-of-range entry.
const codePoints = [...TEXT].length;
if (codePoints < 1 || codePoints > 200) {
  throw new Error(`entry must be 1-200 characters, got ${codePoints}`);
}
if (TEXT.trim().length === 0) {
  throw new Error('entry must not be only white space');
}

mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, 'entry.txt'), TEXT, 'utf8');
console.log(TEXT);
