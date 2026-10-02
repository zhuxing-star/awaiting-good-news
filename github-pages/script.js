/* Adapted from abandon888/HappyBirthday under the MIT License. */
const { gsap } = window
const lockScreen = document.getElementById('lock-screen')
const unlockForm = document.getElementById('unlock-form')
const unlockPassword = document.getElementById('unlock-password')
const passwordError = document.getElementById('password-error')
const startSign = document.getElementById('start-sign')
const startButton = document.getElementById('start-button')
const musicButton = document.getElementById('music-button')
const container = document.getElementById('container')
const openCardButton = document.getElementById('open-card')
const replayButton = document.getElementById('replay')

let timeline = null
const backgroundMusic = new Audio('./music/bgMusic.mp3')
backgroundMusic.preload = 'auto'
backgroundMusic.loop = true
backgroundMusic.volume = .82
let fireworksFrame = null
let fireworksRunning = false
const unlockDate = new Date(2026, 9, 28, 0, 0, 0)
const unlockStorageKey = 'birthday-gift-unlocked'

function enterGift() {
  lockScreen.hidden = true
  startSign.hidden = false
  musicButton.hidden = false
}

function updateCountdown() {
  const remaining = unlockDate.getTime() - Date.now()
  if (remaining <= 0) {
    enterGift()
    return false
  }

  const totalSeconds = Math.floor(remaining / 1000)
  const values = {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60
  }
  Object.entries(values).forEach(([id, value]) => {
    document.getElementById(id).textContent = String(value).padStart(2, '0')
  })
  return true
}

function initializeLock() {
  let previouslyUnlocked = false
  try { previouslyUnlocked = localStorage.getItem(unlockStorageKey) === 'true' } catch {}
  if (Date.now() >= unlockDate.getTime() || previouslyUnlocked) {
    enterGift()
    return
  }
  updateCountdown()
  const timer = window.setInterval(() => {
    if (!updateCountdown()) window.clearInterval(timer)
  }, 1000)
}

function splitText(element) {
  if (!element || element.dataset.split === 'true') return
  const fragment = document.createDocumentFragment()
  for (const character of element.textContent) {
    const span = document.createElement('span')
    span.textContent = character
    fragment.appendChild(span)
  }
  element.replaceChildren(fragment)
  element.dataset.split = 'true'
}

function prepareText() {
  splitText(document.querySelector('.chat-text'))
  splitText(document.querySelector('.wish h2'))
}

function buildTimeline() {
  if (timeline) return timeline
  prepareText()

  const ideaIn = { opacity: 0, y: -20, rotationX: 5, skewX: '15deg' }
  const ideaOut = { opacity: 0, y: 20, rotationY: 5, skewX: '-15deg' }
  const memories = gsap.utils.toArray('.memory')

  gsap.set(['.one', '.three', '.four', '.five .idea', '.memories', '.memory', '.six', '.nine', '.card'], { autoAlpha: 0 })
  gsap.set('.chat-text span', { visibility: 'hidden' })
  gsap.set('.color-bursts i', { visibility: 'hidden' })

  timeline = gsap.timeline({ paused: true })
    .to(container, { duration: .1, autoAlpha: 1 })
    .fromTo('.one', { opacity: 0, y: 12 }, { duration: .8, autoAlpha: 1, y: 0 })
    .to('.one', { duration: .7, autoAlpha: 0, y: 10 }, '+=2.3')
    .fromTo('.three', { opacity: 0, y: 12 }, { duration: .75, autoAlpha: 1, y: 0 })
    .to('.three', { duration: .7, autoAlpha: 0, y: 12 }, '+=1.8')
    .fromTo('.four', { opacity: 0, scale: .2 }, { duration: .75, autoAlpha: 1, scale: 1 })
    .from('.fake-button', { duration: .3, scale: .2, opacity: 0 })
    .to('.chat-text span', { duration: .35, visibility: 'visible', stagger: .055 })
    .to('.fake-button', { duration: .12, backgroundColor: '#25a565' })
    .to('.chat-text span', { duration: .08, opacity: 0, stagger: { each: .04, from: 'end' } }, '+=.8')
    .to('.fake-button', { duration: .25, opacity: .45 }, '-=.2')
    .to('.four', { duration: .55, autoAlpha: 0, scale: .2, y: -130 }, '+=.25')
    .fromTo('.idea-1', ideaIn, { duration: .7, autoAlpha: 1, y: 0, rotationX: 0, skewX: 0 })
    .to('.idea-1', { duration: .7, ...ideaOut }, '+=1.55')
    .fromTo('.idea-2', ideaIn, { duration: .7, autoAlpha: 1, y: 0, rotationX: 0, skewX: 0 })
    .from('.idea-2 strong', { duration: .5, scale: .2, rotation: -8 }, '-=.2')
    .to('.idea-2 .smiley', { duration: .7, rotation: 90, x: 8 }, '+=.4')
    .to('.idea-2', { duration: .7, ...ideaOut }, '+=1.4')
    .fromTo('.idea-3', { opacity: 0 }, { duration: .1, autoAlpha: 1 })
    .from('.idea-3 span', { duration: .85, scale: 3, opacity: 0, rotation: 15, ease: 'expo.out', stagger: .2 })
    .to('.idea-3 span', { duration: .8, scale: 3, opacity: 0, rotation: -15, ease: 'expo.in', stagger: .2 }, '+=.9')
    .to('.idea-3', { duration: .1, autoAlpha: 0 })
    .fromTo('.idea-4', ideaIn, { duration: .8, autoAlpha: 1, y: 0, rotationX: 0, skewX: 0 })
    .to('.idea-4', { duration: .7, ...ideaOut }, '+=1.8')
    .to('.memories', { duration: .1, autoAlpha: 1 })

  memories.forEach((memory, index) => {
    const direction = index % 2 === 0 ? -8 : 8
    timeline
      .fromTo(memory, { autoAlpha: 0, scale: 1.8, rotation: direction }, { duration: .85, autoAlpha: 1, scale: 1, rotation: direction / 4, ease: 'power3.out' })
      .to(memory, { duration: .55, autoAlpha: 0, scale: .82, rotation: -direction / 2 }, '+=1.35')
  })

  timeline
    .to('.memories', { duration: .1, autoAlpha: 0 })
    .fromTo('.balloons img', { opacity: 0, y: '110vh' }, { duration: 4, opacity: 1, y: '-125vh', stagger: .14, ease: 'power1.inOut' })
    .fromTo('.six', { opacity: 0, y: 24, scale: .96 }, { duration: 1.15, autoAlpha: 1, y: 0, scale: 1, ease: 'power2.out' }, '-=3')
    .from('.portrait', { duration: 1.1, scale: 1.18, opacity: 0, y: 24, rotationZ: -3, ease: 'power2.out' }, '<')
    .from('.hat', { duration: .55, x: -120, y: 280, rotation: -180, opacity: 0 })
    .from('.wish h2 span', { duration: .75, opacity: 0, y: -50, rotation: 150, skewX: '30deg', ease: 'elastic.out(1, .5)', stagger: .1 })
    .fromTo('.wish h2 span', { scale: 1.35, rotationY: 150 }, { duration: .7, scale: 1, rotationY: 0, color: '#f06f98', ease: 'expo.out', stagger: .1 }, 'party')
    .from('.wish p', { duration: .55, opacity: 0, y: 12, skewX: '-12deg' }, 'party')
    .call(startFireworks, [], 'party')
    .to('.color-bursts i', { duration: 1.5, visibility: 'visible', opacity: 0, scale: 80, repeat: 1, repeatDelay: 1.1, stagger: .3 })
    .to('.six', { duration: .55, autoAlpha: 0, y: 30 })
    .fromTo('.nine', { opacity: 0, y: -20, skewX: '12deg' }, { duration: 1, autoAlpha: 1, y: 0, skewX: 0 })
    .fromTo('#open-card', { autoAlpha: 0, scale: .8 }, { duration: .55, autoAlpha: 1, scale: 1, clearProps: 'transform' }, '+=.3')

  return timeline
}

async function playMusic() {
  await backgroundMusic.play()
  musicButton.classList.add('is-playing')
  musicButton.setAttribute('aria-label', '暂停音乐')
}

async function toggleMusic() {
  if (backgroundMusic.paused) return playMusic()
  backgroundMusic.pause()
  musicButton.classList.remove('is-playing')
  musicButton.setAttribute('aria-label', '播放音乐')
}

backgroundMusic.addEventListener('error', () => {
  musicButton.classList.remove('is-playing')
  musicButton.setAttribute('aria-label', '音乐加载失败')
})

function startFireworks() {
  if (fireworksRunning) return
  fireworksRunning = true
  const canvas = document.getElementById('fireworks')
  const context = canvas.getContext('2d')
  const particles = []
  let lastBurst = 0

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = innerWidth * ratio
    canvas.height = innerHeight * ratio
    context.setTransform(ratio, 0, 0, ratio, 0, 0)
  }
  const burst = (x = innerWidth * (.2 + Math.random() * .6), y = innerHeight * (.15 + Math.random() * .38)) => {
    const colors = ['#ff6f91', '#ffbd33', '#56c78c', '#45a7e0', '#bd6ecf']
    for (let i = 0; i < 34; i += 1) {
      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 3 + 1.8
      particles.push({ x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed, life: 1, color: colors[i % colors.length], size: Math.random() * 2 + 1 })
    }
  }
  const draw = time => {
    context.clearRect(0, 0, innerWidth, innerHeight)
    if (time - lastBurst > 1000) { burst(); lastBurst = time }
    particles.forEach(particle => {
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vy += .018
      particle.vx *= .985
      particle.life -= .016
      context.globalAlpha = Math.max(0, particle.life)
      context.fillStyle = particle.color
      context.beginPath()
      context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      context.fill()
    })
    for (let i = particles.length - 1; i >= 0; i -= 1) if (particles[i].life <= 0) particles.splice(i, 1)
    fireworksFrame = requestAnimationFrame(draw)
  }
  resize()
  canvas.addEventListener('click', event => burst(event.clientX, event.clientY))
  fireworksFrame = requestAnimationFrame(draw)
}

function stopFireworks() {
  if (fireworksFrame) cancelAnimationFrame(fireworksFrame)
  fireworksFrame = null
  fireworksRunning = false
  const canvas = document.getElementById('fireworks')
  canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height)
}

startButton.addEventListener('click', async () => {
  await document.fonts.load('16px "Ma Shan Zheng"')
  startSign.style.display = 'none'
  container.setAttribute('aria-hidden', 'false')
  await playMusic()
  buildTimeline().play(0)
})

unlockForm.addEventListener('submit', event => {
  event.preventDefault()
  if (unlockPassword.value !== '0919') {
    passwordError.textContent = '密码提示：你的农历生日（四位数字）'
    unlockPassword.select()
    gsap.fromTo('.password-box', { x: -8 }, { x: 8, duration: .08, repeat: 5, yoyo: true, clearProps: 'transform' })
    return
  }
  try { localStorage.setItem(unlockStorageKey, 'true') } catch {}
  passwordError.textContent = ''
  gsap.to(lockScreen, { duration: .65, autoAlpha: 0, y: -18, onComplete: enterGift })
})

musicButton.addEventListener('click', toggleMusic)

openCardButton.addEventListener('click', () => {
  stopFireworks()
  gsap.to('.nine', { duration: .55, autoAlpha: 0, y: -18 })
  gsap.fromTo('.card', { autoAlpha: 0, scale: .86, rotation: -3 }, { duration: .9, autoAlpha: 1, scale: 1, rotation: 0, ease: 'back.out(1.2)', delay: .35 })
})

replayButton.addEventListener('click', () => {
  stopFireworks()
  gsap.set('.card', { autoAlpha: 0 })
  timeline.restart()
})

document.addEventListener('touchmove', event => event.preventDefault(), { passive: false })
window.addEventListener('resize', () => { if (fireworksRunning) { stopFireworks(); startFireworks() } })
initializeLock()
