// version 1.5.a
// Stay alive for one minute.
// If you win, it gets harder (and more rewarding).
// If you lose, you must wait a day before you can resubmit.
// Remember, each submission gets a new random seed.
// Gather coins to summon soldiers and have them attack the enemy.
function valueOverDistance(item) {
    return item.value / hero.distanceTo(item);
}
// Return the item with the highest valueOverDistance(item)
function findBestItem(items) {
    var bestItem = null;
    var bestValue = 0;
    var itemsIndex = 0;
    // Loop over the items array.
    // Find the item with the highest valueOverDistance()
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
while (true) {
    // Move to the nearest coin.
    // Use move instead of moveXY so you can command constantly.
    var enemy = hero.findNearest(hero.findEnemies());

    // If you have funds for a soldier, summon one.
    if (hero.gold > hero.costOf("soldier")) {
        hero.summon("soldier");
    } else if (enemy) {
        var distance = hero.distanceTo(enemy);
        var soldiers = hero.findFriends();
        var soldierIndex = 0;
        // Loop over all your soldiers and order them to attack.
        while (soldierIndex < soldiers.length) {
            var soldier = soldiers[soldierIndex];
            // Use the 'attack' command to make your soldiers attack.
            hero.command(soldier, "attack", enemy);
            soldierIndex++;
        }
        if (hero.canCast("chain-lightning", enemy)) {
            hero.cast("chain-lightning", enemy);
        }else {
            hero.attack(enemy);
            }

    }
}
