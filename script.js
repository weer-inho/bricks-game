const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');

// --- открытие правил ---
rulesBtn.addEventListener('click', () => {
	rules.classList.add('show');
})

// --- закрытие правил ---
closeBtn.addEventListener('click', () => {
	rules.classList.remove('show');
})