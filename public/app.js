const task = document.getElementById('task');
const counter = document.getElementById('counter');
const analyze = document.getElementById('analyze');
const loading = document.getElementById('loading');
const errorBox = document.getElementById('error');
const result = document.getElementById('result');
const copy = document.getElementById('copy');

const title = document.getElementById('title');
const why = document.getElementById('why');
const nextStep = document.getElementById('nextStep');
const checklist = document.getElementById('checklist');
const timeEstimate = document.getElementById('timeEstimate');

let latest = null;

task.addEventListener('input', () => {
  counter.textContent = `${task.value.length} / 4000`;
});

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove('hidden');
}

function setBusy(busy) {
  analyze.disabled = busy;
  analyze.textContent = busy ? 'Working…' : 'Find my next step';
  loading.classList.toggle('hidden', !busy);
}

analyze.addEventListener('click', async () => {
  const value = task.value.trim();
  errorBox.classList.add('hidden');
  result.classList.add('hidden');
  if (!value) return showError('Describe the task first.');

  setBusy(true);
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: value })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Something went wrong.');

    latest = data;
    title.textContent = data.title || 'Your next move';
    why.textContent = data.why || '';
    nextStep.textContent = data.nextStep || '';
    timeEstimate.textContent = data.timeEstimate || '';
    checklist.innerHTML = '';
    for (const item of data.checklist || []) {
      const li = document.createElement('li');
      li.textContent = item;
      checklist.appendChild(li);
    }
    result.classList.remove('hidden');
  } catch (error) {
    showError(error.message || 'Could not analyze the task.');
  } finally {
    setBusy(false);
  }
});

copy.addEventListener('click', async () => {
  if (!latest) return;
  const text = `${latest.title}\n\n${latest.why}\n\nSTART HERE\n${latest.nextStep}\n\n3 QUICK CHECKS\n${latest.checklist.map((x) => `- ${x}`).join('\n')}\n\nTIME\n${latest.timeEstimate}`;
  await navigator.clipboard.writeText(text);
  copy.textContent = 'Copied';
  setTimeout(() => { copy.textContent = 'Copy'; }, 1200);
});
