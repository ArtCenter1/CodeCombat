//version 1.5.a
// Collect 100 gold from two or three groves.
// If you win, it gets harder (and more rewarding).
// If you lose, you must wait a day before you can resubmit.
// Remember, each submission gets a new random seed.
function findMostHealth(enemies) {
    var target = null;
    var targetHealth = 0;
    var enemyIndex = 0;
    while (enemyIndex < enemies.length) {
        var enemy = enemies[enemyIndex];
        if (enemy.health > targetHealth) {
            target = enemy;
            targetHealth = enemy.health;
        }
        enemyIndex += 1;
    }
    return target;
}
function valueOverDistance(item) {
    return item.value / hero.distanceTo(item);
}
function findBestItem(items) {
    var bestItem = null;
    var bestValue = 0;
    var itemsIndex = 0;
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
    var enemies = hero.findEnemies();
    var enemy = findMostHealth(enemies);
    if (enemy) {
        var distance = hero.distanceTo(enemy);
        if (hero.canCast("chain-lightning", enemy)) {
            hero.cast("chain-lightning", enemy);
            continue;
        } else {
            hero.attack(enemy);
        }
    } else {
        var coin = hero.findNearestItem();
        if (coin) {
            hero.moveXY(coin.pos.x, coin.pos.y);
        } else {
            hero.moveXY(35, 31);
        }
    }
}
