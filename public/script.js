const chatEl = document.getElementById('chat');
const formEl = document.getElementById('chat-form');
const promptEl = document.getElementById('prompt');
const sendBtn = document.getElementById('send-btn');
const template = document.getElementById('message-template');

const messages = [
  {
    role: 'system',
    content:
      'You are AMMA AI, a helpful assistant. Keep answers clear, practical, and friendly.',
  },
];

function addMessage(role, content) {
  const node = template.content.firstElementChild.cloneNode(true);
  node.classList.add(role);
  node.querySelector('.message').textContent = content;
  chatEl.appendChild(node);
  chatEl.scrollTop = chatEl.scrollHeight;
}

async function sendMessage(content) {
  messages.push({ role: 'user', content });
  addMessage('user', content);

  sendBtn.disabled = true;

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    messages.push({ role: 'assistant', content: data.reply });
    addMessage('assistant', data.reply);
  } catch (error) {
    addMessage('assistant', `⚠️ ${error.message}`);
  } finally {
    sendBtn.disabled = false;
    promptEl.focus();
  }
}

formEl.addEventListener('submit', async (event) => {
  event.preventDefault();
  const content = promptEl.value.trim();

  if (!content) {
    return;
  }

  promptEl.value = '';
  await sendMessage(content);
});

promptEl.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    formEl.requestSubmit();
  }
});

addMessage('assistant', 'Hi! I am AMMA AI. Ask me anything.');
