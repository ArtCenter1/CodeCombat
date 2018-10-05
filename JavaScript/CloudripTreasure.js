// version 1.5
// Your goal is to collect coins / gems.
// This level is repeatable. If you win, the difficulty and rewards will increase.
// If you fail, you have to wait a day to resubmit.
// This level is an optional challenge level. You don't need to beat it to continue the campaign!
// set up defend points to employ troops
var defendPoints=[{x:100,y:60},{x:50,y:60}];
var retreatPoints=[{x:8,y:29},{x:132,y:25}];
var summonTypes = ["archer","peasant","archer","soldier"];

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
function pickUpCoin() {
    // Collect coins.
    var items = hero.findItems();
    var coin = findBestItem(items);
    if (coin){
        hero.move(coin.pos);
    }
}

function summonTroops() {
    // Use % to wrap around the summonTypes array based on hero.built.length
    var type = summonTypes[hero.built.length % summonTypes.length];
    if (hero.gold >= hero.costOf(type)) {
    hero.summon(type);
    }
}
function commandTroops() {
    var friends = hero.findFriends();
    for(var friendIndex=0; friendIndex < friends.length; friendIndex++) {
        var friend = friends[friendIndex];
        // Use % to wrap around defendPoints based on friendIndex
        if(friend.type!="peasant"){

        var post = defendPoints[friendIndex % defendPoints.length];
        // Command your minion to defend the defendPoint
        hero.command(friend, "defend", post);
        }
        }
}

function commandPeasants() {
    var peasants = hero.findByType("peasant", hero.findFriends());
    for(var i=0; i < peasants.length; i++) {
        var peasant = peasants[i];
        // compare the location of the coin and defendPoints
        var items = peasant.findItems();
        var coin= peasant.findNearest(items);
        // Command your minion to pick up the coin
            if (coin){
               hero.command(peasant, "move", coin.pos);
            }

        }

}

function castChainLightning() {
    var enemy = hero.findNearestEnemy();
    if (enemy) {
        var distance = hero.distanceTo(enemy);
        if (distance > 20 && hero.canCast("chain-lightning", enemy)) {
            hero.cast("chain-lightning", enemy);
        }
    }
}
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
while(true) {
    commandPeasants();
    pickUpCoin();
    summonTroops();
    commandTroops();



      castChainLightning();
      closeCombat();






 }
