// If the peasant is damaged, the flowers will shrink!

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

function summonSoldiers() {
    if (hero.gold >= hero.costOf("soldier")) {
        hero.summon("soldier");
    }
}

// Define the function: commandSoldiers
function commandSoldiers(){
    var friends = hero.findFriends();
    for(var i=0; i < friends.length; i++) {
        var friend =friends[i];
        var enemy = friend.findNearestEnemy();
        if(enemy) {
            hero.command(friend,"attack", enemy);
            }
        }
}

// Define the function: pickUpNearestCoin
function pickUpNearestCoin(){
    var coin = hero.findNearest(hero.findItems());
    hero.move(coin.pos);
    }
var peasant = hero.findByType("peasant")[0];

while(true) {
    summonSoldiers();
    // commandSoldiers();
    commandSoldiers();
    // pickUpCoin();
    pickUpCoin();
}
