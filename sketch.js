let trees = [];
let gardener;
let temperature = 20; // Temperatura inicial (em ºC)

function setup() {
  createCanvas(600, 400);
  // Criando 5 Árvores
  for (let i = 0; i < 5; i++) {
    trees.push(new Tree(random(100, 500), random(300, 350)));
  }

  // Criando o jardineiro
  gardener = new Gardener(width / 2, height - 50);
}

function draw() {
  background(220);

  // Simulando a temperatura (pode ser ajustada)
  temperature = map(mouseX, 0, width, 10, 30); // Temperatura baseada na posição do mouse

  // Exibindo a temperatura na tela
  fill(0);
  textSize(16);
  text("Temperatura: " + int(temperature) + "C", 20, 30);

  // Atualizando as árvores com base na temperatura
  for (let tree of trees) {
    tree.update(temperature);
    tree.display();
  }

  // Movendo o jardineiro
  gardener.update();
  gardener.display();

  // O jardineiro pode regar as árvores
  if (mouseIsPressed) {
    gardener.waterTrees(trees);
  }
}

// Classe da árvore
class Tree {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.height = 50; // Altura inicial da árvore
    this.health = 100; // Saúde da árvore (de 0 a 100)
  }

  update(temp) {
    // A temperatura afeta a saúde da árvore
    if (temp < 15) {
      this.health = 0.1;
    } else if (temp > 25) {
      this.health = 0.2;
    } else {
      this.health += 0.1;
    }

    // Limitar a saúde da árvore entre 0 e 100
    this.health = constrain(this.health, 0, 100);

    // A altura da árvore depende da saúde
    this.height = map(this.health, 0, 100, 50, 150);
  }

  display() {
    // Desenhando o tronco
    fill(139, 69, 19);
    rect(this.x - 10, this.y - this.height, 20, this.height);

    // Desenhando as folhas da árvore
    fill(34, 139, 34);
    ellipse(this.x, this.y - this.height - 20, 60, 60);
  }
}

// Classe do jardineiro
class Gardener {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 2;
  }

  update() {
    // Movendo o jardineiro com as teclas
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= this.speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += this.speed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= this.speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += this.speed;
    }
  }

  display() {
    fill(255, 0, 0);
    ellipse(this.x, this.y, 40, 40); // Corpo do jardineiro
    fill(0);
    ellipse(this.x, this.y - 20, 20, 20); // Cabeça
  }

  waterTrees(trees) {
    for (let tree of trees) {
      let d = dist(this.x, this.y, tree.x, tree.y);
      if (d < 50) {
        tree.health = min(tree.health + 10, 100); // Regando a árvore
      }
    }
  }
}
