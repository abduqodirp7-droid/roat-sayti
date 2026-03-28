// =====================================================
//   ROAST AI — Frontend Application Logic
// =====================================================

// ——— DOM References ———
const chatHistory = document.getElementById('chatHistory');
const userInput   = document.getElementById('userInput');
const charCount   = document.getElementById('charCount');
const roastBtn    = document.getElementById('roastBtn');
const btnLoader   = document.getElementById('btnLoader');
const btnText     = roastBtn.querySelector('.btn-text');
const navbar      = document.getElementById('navbar');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');

// ——— Navbar Scroll Effect ———
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// ——— Mobile Menu ———
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

function closeMobile() {
  mobileMenu.classList.remove('open');
}

// ——— Smooth Scroll ———
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// ——— Character Counter ———
userInput.addEventListener('input', () => {
  const len = userInput.value.length;
  charCount.textContent = `${len} / 1000`;
  charCount.style.color = len > 900
    ? 'var(--orange)'
    : len > 800
      ? 'var(--text-dim)'
      : 'var(--text-muted)';
});

// ——— Enter key shortcut (Ctrl+Enter) ———
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
    sendRoast();
  }
});

// ——— Fill Example Chip ———
function fillExample(btn) {
  userInput.value = btn.textContent;
  charCount.textContent = `${btn.textContent.length} / 1000`;
  userInput.focus();
}

// ——— Toast Notification ———
function showToast(message) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ——— Append User Message ———
function appendUserMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg-user';
  div.innerHTML = `<div class="bubble-user">${escapeHtml(text)}</div>`;
  chatHistory.appendChild(div);
  scrollChat();
}

// ——— Show/Hide Typing Indicator ———
function showTyping() {
  const div = document.createElement('div');
  div.className = 'typing-indicator';
  div.id = 'typingIndicator';
  div.innerHTML = `
    <div class="msg-ai-avatar">😈</div>
    <div class="typing-dots">
      <span></span><span></span><span></span>
    </div>`;
  chatHistory.appendChild(div);
  scrollChat();
}

function hideTyping() {
  const el = document.getElementById('typingIndicator');
  if (el) el.remove();
}

// ——— Append AI Message with Typing Effect ———
function appendAIMessage(text) {
  const div = document.createElement('div');
  div.className = 'msg-ai';
  div.innerHTML = `
    <div class="msg-ai-avatar">😈</div>
    <div class="bubble-ai" id="aiTyping"></div>`;
  chatHistory.appendChild(div);

  const bubble = document.getElementById('aiTyping');
  bubble.id = '';  // remove id after grabbing

  let i = 0;
  const speed = 18;

  function typeChar() {
    if (i < text.length) {
      // Chunked typing for speed
      const chunk = text.slice(i, i + 3);
      bubble.textContent += chunk;
      i += 3;
      scrollChat();
      setTimeout(typeChar, speed);
    }
  }

  typeChar();
  scrollChat();
}

// ——— Scroll Chat to Bottom ———
function scrollChat() {
  chatHistory.scrollTop = chatHistory.scrollHeight;
}

// ——— Escape HTML ———
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// ——— Set Loading State ———
function setLoading(loading) {
  roastBtn.disabled = loading;
  if (loading) {
    btnText.classList.add('hidden');
    btnLoader.classList.add('active');
  } else {
    btnText.classList.remove('hidden');
    btnLoader.classList.remove('active');
  }
}

// ——— Main Send Roast Function ———
async function sendRoast() {
  const text = userInput.value.trim();

  if (!text) {
    showToast("⚠️ Iltimos, o'zingiz haqingizda biror narsa yozing!");
    userInput.focus();
    return;
  }

  if (text.length < 5) {
    showToast("⚠️ Biroz ko'proq yozing — AI ko'proq ma'lumot kerak!");
    userInput.focus();
    return;
  }

  // Scroll to chat
  document.getElementById('chat').scrollIntoView({ behavior: 'smooth', block: 'start' });

  setLoading(true);
  appendUserMessage(text);
  userInput.value = '';
  charCount.textContent = '0 / 1000';

  showTyping();

  try {
    const response = await fetch('/api/roast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userInput: text })
    });

    const data = await response.json();
    hideTyping();

    if (!response.ok) {
      appendAIMessage(`❌ Xato: ${data.error || "Noma'lum xato yuz berdi."}`);
    } else {
      appendAIMessage(data.roast);
    }
  } catch (err) {
    hideTyping();
    console.error('Fetch error:', err);
    appendAIMessage('❌ Server bilan aloqa yo\'q. Iltimos, keyinroq urinib ko\'ring.');
  } finally {
    setLoading(false);
  }
}

// ——— Intersection Observer for Animations ———
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.maqsad-card, .contact-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
