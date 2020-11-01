// If the peasant is damaged, the flowers will shrink!
function valueOverDistance(item) {
    return item.value / hero.distanceTo(item);
}
// Find the item with the highest valueOverDistance(bestItem)
function findBestItem(items) {
    var bestItem = null;
    var bestValue = 0;
    var itemsIndex = 0;
    // Loop over the items array.
    while (itemsIndex < items.length) {
        var item = items[itemsIndex];
        if (valueOverDistance(item) > bestValue) {
            bestItem = item;
            bestValue = valueOverDistance(item);
        }
        itemsIndex++;
    }
    return bestItem;
}
// Return the distance between given enemies
function distanceBetweenEnemies(a, b){
    return ((a.pos.x - b.pos.x) ^ 2 + (a.pos.y - b.pos.y) ^ 2) ^ 0.5;
}
// return the best enenmy with highest AOE
function pickBestEnemyAOE(radius){
    var enemies = hero.findEnemies();
    radius = 5;
    var bestScore = 0;
    var bestEnemy = null;
    var score = 0;
    for (var i = 0; i < enemies.length; i +=1){
        var centerEnemy = enemies[i];
        for (var j = 0; j < enemies.length; j +=1){
          var enemy = enemies[j];
          if (distanceBetweenEnemies(centerEnemy, enemy) <= radius){
                score += 1;

            if (score > bestScore) {
                bestScore = score;
                bestEnemy = centerEnemy;
            }
          }
        }
     }
  return bestEnemy;
}
// If you have funds for a soldier, summon one.
function summonSoldiers() {
    if (hero.gold >= hero.costOf("soldier")) {
        hero.summon("soldier");
    }
}
// Define the function: commandSoldiers
function commandSoldiers() {
    var enemy = hero.findNearest(hero.findEnemies());
    var soldiers = hero.findByType("soldier", hero.findFriends());
    for (var i = 0; i < soldiers.length; i += 1) {
        var soldier = soldiers[i];
        hero.command(soldier, "attack", enemy);
    }
}
// Define the function: pickUpNearestCoin
function pickUpNearetBestCoin() {
    var items = hero.findItems();
    var bestCoin = findBestItem(items);
    hero.move(bestCoin.pos);
}
var peasant = hero.findByType("peasant")[0];
// protect woundedAllies
function protectWounded(){
  var soldiers = hero.findFriends();
  var wounded = hero.findByType("peasant",hero.findFriends());
  // Loop over all your soldiers and order them to defend.
  if (wounded.health < wounded.maxHealth*0.5){
    for (var i=0; i< soldiers.length; i+=1) {
      var soldier = soldiers[i];
      hero.command(soldier, "defend", wounded);
    }
  }
}
//cast spell "chain-lightning"
function castChainLightning(){
    var enemy = hero.findNearestEnemy();
    var radius =5;
    var bestTarget = null;
    if(enemy){
    var distance = hero.distanceTo(enemy);
        if (hero.canCast("chain-lightning") && distance > 20){
        bestTarget = pickBestEnemyAOE(radius);
        hero.cast("chain-lightning", bestTarget);
        }
    }
}
// standard close combat
function closeCombat(){
  var enemies = hero.findEnemies();
  var enemy = hero.findNearest(enemies);

  if (enemy){
    var distance = hero.distanceTo(enemy);
    if(distance <10 && hero.isReady("bash")){
      hero.bash(enemy);
    }else {
      hero.attack(enemy);
    }
  }
}

while (true) {
    summonSoldiers();
    commandSoldiers();
    pickUpNearetBestCoin();
    protectWounded();
    castChainLightning();
    closeCombat();
}
