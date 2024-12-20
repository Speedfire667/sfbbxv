function makeDecision(bot) {
  // Simples lógica de decisão aleatória para testar
  const actions = ['move_forward', 'move_back', 'turn_left', 'turn_right', 'stop'];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  return randomAction;
}

module.exports = { makeDecision };
