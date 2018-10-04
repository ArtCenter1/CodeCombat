//version 1.0.a
// Survive the waves of ogres.
// If you win, the level gets harder, and gives more rewards.
// If you lose, you must wait a day to re-submit.
// Each time you submit gives a new random seed.
while (true) {
    var enemy = hero.findNearestEnemy();
    var item = hero.findNearestItem();
    if (item) {
        // Move to the position of the item.
        hero.move(item.pos);
    }
    if (hero.gold > hero.costOf("soldier")) {
        hero.summon("soldier");
    } else if (enemy) {
        var distance = hero.distanceTo(enemy);
        var soldiers = hero.findFriends();
        var soldierIndex = 0;
        // Loop over all your soldiers and order them to attack.
        while (soldierIndex < soldiers.length) {
            var soldier = soldiers[soldierIndex];
            var enemies = hero.findEnemies();
            var enenmy = soldier.findNearest(enemies);
            // Use the 'attack' command to make your soldiers attack.
            hero.command(soldier, "attack", enemy);
            soldierIndex++;
        }
        if (distance > 15 && hero.canCast("chain-lightning", enemy)) {
            hero.cast("chain-lightning", enemy);
        } else if (hero.isReady("bash")) {
            hero.bash(enemy);
        } else {
            hero.attack(enemy);
        }
    }
}
