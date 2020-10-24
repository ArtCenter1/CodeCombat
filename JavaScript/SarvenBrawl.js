//version 1.3
// Stay alive for two minutes.
// If you win, it gets harder (and more rewarding).
// If you lose, you must wait a day before you can resubmit.
// Remember, each submission gets a new random seed.
// If you have funds for a soldier, summon one.
function summonTroops(summonType) {
    var summonTypes = ["archer","soldier","griffin-rider"];
    summonType = summonTypes[hero.built.length % summonTypes.length];
    if (hero.gold >= hero.costOf(summonType)) {
        hero.summon(summonType);
    }
}
function commandAttck() {
    var friends = hero.findFriends();
    for (var i = 0; i < friends.length; ++i) {
        var friend = friends[i];
        hero.command(friend, "attack", enemy);
    }
}
while (true) {
    summonTroops();
    var enemies = hero.findEnemies();
    var enemy = hero.findNearest(enemies);
    // Do something with each enemy here
    if (enemy) {
        if (enemy.type != "sand-yak") {
            commandAttck();
            hero.attack(enemy);
        }
    } else {
        // ... else, shield.
        hero.shield();
    }
}
