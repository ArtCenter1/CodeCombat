// This level shows how to define your own functions.
// The code inside a function is not executed immediately. It's saved for later.

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


// This function has your hero summon a soldier.
function summonSoldier() {
    // If hero.gold is greater than the cost of the "soldier":
    if(hero.gold > hero.costOf("soldier")){
        // Then summon a "soldier":
        hero.summon("soldier");
    }
}

// This function commands your soldiers to attack their nearest enemy.
function commandSoldiers() {
    var friends = hero.findFriends();
    for(var i=0; i < friends.length; i++) {
        var enemy = friends[i].findNearestEnemy();
        if(enemy) {
            hero.command(friends[i],"attack", enemy);
        }
    }
}

while(true) {
    // In your loop, you can "call" the functions defined above.
    // The following line causes the code inside the "pickUpCoin" function to be executed.
        pickUpCoin();
    // Call summonSoldier here
        summonSoldier();
    // Call commandSoldiers here
    var enemy = hero.findNearestEnemy();
    if(enemy){
        commandSoldiers();
        if(hero.canCast("chain-lightning")){
         hero.cast("chain-lightning", hero.findNearestEnemy());
        }
    }
}
