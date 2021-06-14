const rulesBtn = document.getElementById('rules-btn');
const closeBtn = document.getElementById('close-btn');
const rules = document.getElementById('rules');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;

const brickColumnCount = 9; 
const brickRowCount = 5;

const ball = {
	x: canvas.width / 2,
	y: canvas.height / 2,
	size: 10,
	speed: 4,
	dx: 4,
	dy: -4,
}

const brickInfo = {
	width: 70,
	height: 20,
	padding: 10,
	offsetX: 45, // изначальная позиция кирпича
	offsetY: 60,
	visible: true,
}

const paddle = {
	x: canvas.width / 2 - 40,
	y: canvas.height - 20,
	width: 80,
	height: 10,
	speed: 8,
	dx: 0
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
	ctx.fillStyle = '#0095dd';
	ctx.fill();
	ctx.closePath();
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddle.x, paddle.y, paddle.width, paddle.height);
	ctx.fillStyle = '#0095dd';
	ctx.fill();	
	ctx.closePath();
}

function drawScore() {
	ctx.font = '20px Arial';
	ctx.fillText(`Score: ${score}`, canvas.width - 100, 30)
}

function drawBricks() {
	bricks.forEach(column => {
		column.forEach(brick => {
			ctx.beginPath();
			ctx.rect(brick.x, brick.y, brick.width, brick.height);
			ctx.fillStyle = brick.visible ? '#0095dd' : 'transparent';
			ctx.fill();
			ctx.closePath();
		})
	})
}

const bricks = [];
for (let i = 0; i < brickColumnCount; i++) {
	bricks[i] = [];
	for ( let j = 0; j < brickRowCount; j++) {
		const x = i * (brickInfo.width + brickInfo.padding) + brickInfo.offsetX;
		const y = j * (brickInfo.height + brickInfo.padding) + brickInfo.offsetY;
		bricks[i][j] = {x, y, ...brickInfo};
	}
}

function movePaddle() {
	paddle.x += paddle.dx;

	if (paddle.x + paddle.width > canvas.width) {
		// когда платформа коснется правой стенки
		// координата х станет постоянной 
		// не даст уйти дальше
		paddle.x = canvas.width - paddle.width;
	}

	if (paddle.x < 0) {
		paddle.x = 0;
	}
}

function moveBall() {
	ball.x += ball.dx;
	ball.y += ball.dy;

	// столкновение левойПравой стенок
	if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
		ball.dx *= -1; //ball.dx = ball.dx * -1
	}
	// столкновение верхнейНижней стенок
	if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
		ball.dy *= -1 
	}

	// столкновение с платформой
	if (
		ball.x - ball.size > paddle.x && // проверка слева от платформы
		ball.x + ball.size < paddle.x + paddle.width && // проверка справа от плафтормы
		ball.y + ball.size > paddle.y 
		) {
		ball.dy = -ball.speed;
	}

	// столконовение с кирпичами
	bricks.forEach(column => {
		column.forEach(brick => {
			if (brick.visible) {
				if (
					ball.x - ball.size > brick.x && // левая сторона кирпича
					ball.x + ball.size < brick.x + brick.width && // правая сторона кирпича
					ball.y + ball.size > brick.y && // верхняя сторона кирпича
					ball.y - ball.size < brick.y + brick.height // нижняя сторона кирпича
					) {
					ball.dy *= -1;
					brick.visible = false;
				}
			}
		})
	})
}

function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	drawPaddle() 
	drawBall()
	drawScore()
	drawBricks()
}

function update() {
	movePaddle();
	moveBall();

	draw();

	requestAnimationFrame(update)
}

update()

function keyDown(evt) {
	if (evt.key === 'Right' || evt.key === 'ArrowRight') {
		paddle.dx = paddle.speed;
	} else if (evt.key === 'Left' || evt.key === 'ArrowLeft') {
		paddle.dx = -paddle.speed;
	}
}

function keyUp(evt) {
	if (
		evt.key === 'ArrowRight' ||
		evt.key === 'Right' ||
		evt.key === 'ArrowLeft' ||
		evt.key === 'Left'
	) {
		paddle.dx = 0;
	}
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

rulesBtn.addEventListener('click', () => rules.classList.add('show'));
closeBtn.addEventListener('click', () => rules.classList.remove('show'));

