import express from 'express';
import { loadModel, completion, unloadModel, LLAMA_3_2_1B_INST_Q4_0 } from '@qvac/sdk';

const app = express();
const PORT = process.env.PORT || 3000;
let modelId = null;
let loadingPromise = null;

app.use(express.json({ limit: '1mb' }));
app.use(express.static('public'));

async function getModel() {
  if (modelId) return modelId;
  if (loadingPromise) return loadingPromise;

  loadingPromise = loadModel({
    modelSrc: LLAMA_3_2_1B_INST_Q4_0,
    onProgress: (progress) => {
      const pct = Number(progress?.percentage ?? 0).toFixed(0);
      console.log(`QVAC model: ${pct}%`);
    }
  }).then((id) => {
    modelId = id;
    return id;
  }).finally(() => {
    loadingPromise = null;
  });

  return loadingPromise;
}

function extractJson(text) {
  const cleaned = text.trim().replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('Model returned an invalid response.');
  return JSON.parse(cleaned.slice(start, end + 1));
}

app.post('/api/analyze', async (req, res) => {
  const task = String(req.body?.task || '').trim();
  if (!task) return res.status(400).json({ error: 'Please enter a task.' });
  if (task.length > 4000) return res.status(400).json({ error: 'Please keep the task under 4,000 characters.' });

  try {
    const id = await getModel();
    const history = [{
      role: 'user',
      content: `You are TinyStep, a practical task-breakdown assistant. Turn a messy or overwhelming task into one tiny next action that can be started immediately. Return ONLY valid JSON with exactly these keys: title, why, nextStep, checklist, timeEstimate. checklist must be an array of 3 short items. timeEstimate should be a short phrase like "10 minutes" or "30 minutes". Do not invent facts.\n\nTask:\n${task}`
    }];

    const run = completion({ modelId: id, history, stream: true });
    let output = '';
    for await (const token of run.tokenStream) output += token;

    const result = extractJson(output);
    if (!result.nextStep || !Array.isArray(result.checklist)) {
      throw new Error('The model returned incomplete task guidance.');
    }
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error?.message || 'QVAC could not analyze this task.' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`TinyStep running at http://localhost:${PORT}`);
});

async function shutdown() {
  try {
    if (modelId) await unloadModel({ modelId });
  } catch (error) {
    console.error('Model cleanup failed:', error);
  } finally {
    server.close(() => process.exit(0));
  }
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
