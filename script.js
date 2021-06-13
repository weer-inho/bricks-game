const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

// свойства мячика
const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: -4,
}

// свойства платформы
const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	width: 80,
	height: 10,
	speed: 8,
	dx: 0
}

// рисую мячик
function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = '#0095dd';
	ctx.fill();
	ctx.closePath();
}

// рисую платформу
function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
	ctx.fillStyle = '#0095dd';
	ctx.fill();	
	ctx.closePath();
}

// рисует все
function draw() {
	drawPaddle() 
	drawBall()
	drawScore()
}

function drawScore() {
	ctx.font = '20px Arial';
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

draw()

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

// 1. создать контекст
// 2. создать и нарисовать мяч
// 3. создать и нарисовать платформу
// 4. создать кирпичики
// 5. нарисовать счет
// 6. добавить update() - анимировать - requestAnimationFrame(cb)
// 7. двигать платформу
// 8. слушатели кнопок чтобы двигать платформу
// 9. двигать мяч
// 10. добавить стенки и реакцию на столкновение с ними
// 11. увеличить счет когда ломается кирпичик
// 12. проиграл - нарисуй все заново и обнули счет