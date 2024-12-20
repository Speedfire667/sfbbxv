const mineflayer = require('mineflayer');
const { makeDecision } = require('./ai');
const config = require('./config');

// Criação do bot
const bot = mineflayer.createBot({
  host: config.host,
  port: config.port,
  username: config.username,
});

bot.on('spawn', () => {
  console.log('Bot entrou no mundo!');
  startAI();
});

// Função que chama a IA para decidir ações
function startAI() {
  setInterval(() => {
    const environment = analyzeEnvironment(bot);
    const action = makeDecision(bot, environment);
    executeAction(action);
  }, 1000);
}

// Função que executa as ações do bot
function executeAction(action) {
  switch(action) {
    case 'move_forward':
      bot.setControlState('forward', true);
      break;
    case 'move_back':
      bot.setControlState('back', true);
      break;
    case 'turn_left':
      bot.setControlState('left', true);
      break;
    case 'turn_right':
      bot.setControlState('right', true);
      break;
    case 'stop':
      bot.setControlState('forward', false);
      bot.setControlState('back', false);
      bot.setControlState('left', false);
      bot.setControlState('right', false);
      break;
    default:
      break;
  }
}

// Função para perceber o ambiente (exemplo simples)
function analyzeEnvironment(bot) {
  const surroundings = {};

  const position = bot.entity.position;
  const block = bot.blockAt(position.offset(0, -1, 0));  // Verifica o bloco abaixo do bot

  if (block) {
    surroundings.blockType = block.name;
  }

  // Verifica se há inimigos próximos
  const mobs = bot.entities;
  surroundings.nearbyMobs = Object.values(mobs).filter(entity => entity.mob && entity.position.distanceTo(bot.entity.position) < 10);

  return surroundings;
}
