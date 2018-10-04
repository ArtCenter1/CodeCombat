
// Return the item with the highest valueOverDistance(item)
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

// Collect coins.
function pickUpCoin() {
    var items = hero.findItems();
    var coin = findBestItem(items);
    if (coin) {
        hero.move(coin.pos);
    }
}

// Return the distance between given enemies
function distanceBetweenEnemies(a, b){
    return ((a.pos.x - b.pos.x) ^ 2 + (a.pos.y - b.pos.y) ^ 2) ^ 0.5;
}

// return the best enenmy with highest AOE
function pickBestEnemyAOE(radius){
    var enemies = hero.findEnemies();
    var bestScore = 0;
    var bestEnemy = null;
    var score = 0;
    for (var i = 0; i < enemies.length; i +=1){
        var centerEnemy = enemies[i];
        for (var j = 0; j < enemies.length; j +=1){
          var enemy = enemies[j];
          if (distanceBetweenEnemies(centerEnemy, enemy) <= radius){
                score += 1;
          }
            if (score > bestScore) {
                bestScore = score;
                bestEnemy = centerEnemy;
            }
          }
        }
        return bestEnemy;
}

// If you have funds for a soldier, summon one.
function summonTroops(){
  var summonTypes = ["archer", "soldier", "griffin-rider", "archer"];
  var summonType = summonTypes[hero.built.length % summonTypes.length];
  if (hero.gold >= hero.costOf(summonType)) {
      hero.summon(summonType);
  }
}

// command friendly soldiers to attack selective enemy
function commandSoldiersAttck() {
    var enemy = hero.findNearestEnemy();
    var soldiers = hero.findByType("soldier", hero.findFriends());
    // Loop over all your soldiers and order them to attack.
    for (var i = 0; i < soldiers.length; i++) {
        var soldier = soldiers[i];
        if (enemy && enemy.health > 0) {
            // Use the 'attack' command to make your soldiers attack.
            hero.command(soldier, "attack", enemy);
        }
    }
}
// command friendly archers to attack selective enemy
function commandArcher() {
    var enemy = hero.findNearest(hero.findEnemies());
    var archers = hero.findByType("archer", hero.findFriends());
    for (var i = 0; i < archers.length; i += 1) {
        var archer = archers[i];
        // Archers should only attack enemies who are closer than 25 meters, otherwise, stay still.
        if (enemy && enemy.health > 0) {
            var distance = archer.distanceTo(enemy);
            if (distance < 25) {
                hero.command(archer, "attack", enemy);
            } else {
                continue;
            }
        }
    }
}
// command friendly Griffin riders to attack selective enemy
function commandGriders() {
    var enemy = hero.findNearest(hero.findEnemies());
    var gRiders = hero.findByType("griffin-rider", hero.findFriends());
    for (var i = 0; i < gRiders.length; i++) {
        var gRider = gRiders[i];
        if (enemy && enemy.health > 0) {
            var distance = gRider.distanceTo(enemy);
            // Loop over all your soldiers and order them to attack.
            // Use the 'attack' command to make your soldiers attack.
            hero.command(gRider, "attack", enemy);
        }
    }
}
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
    if (enemy){
    var distance = hero.distanceTo(enemy);
        if (hero.canCast("chain-lightning") && distance > 20){
            var bestTarget = pickBestEnemyAOE(20);
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
