// Fight your way into the Inner Sanctum of the ogre chieftain, and defeat her.
// Return the distance between given enemies
function flagAction(flag) {
    flag = hero.findFlag();
    if (flag) {
        if (flag.color == "green") {
            hero.moveXY(flag.pos.x, flag.pos.y);
            hero.pickUpFlag(flag);
        } else if (flag.color == "black") {
            hero.jumpTo(flag.pos.x, flag.pos.y);
            hero.pickUpFlag(flag);
// not sure if this will work
        } else (flag.color == "violet") {
          var defendPoint={flag.pos.x, flag.pos.y};
        }
    }
}
function distanceBetweenEnemies(a, b) {
    return a.pos.x - b.pos.x ^ 2 + (a.pos.y - b.pos.y) ^ 2 ^ 0.5;
}
// return the best enenmy with highest AOE
function pickBestEnemyAOE(radius) {
    var enemies = hero.findEnemies();
    var bestScore = 0;
    var bestEnemy = null;
    var score = 0;
    for (var i = 0; i < enemies.length; i += 1) {
        var centerEnemy = enemies[i];
        for (var j = 0; j < enemies.length; j += 1) {
            var enemy = enemies[j];
            if (distanceBetweenEnemies(centerEnemy, enemy) <= radius) {
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
// Find the friend with the lowest health.
function lowestHealthFriend() {
    var lowestHealth = 99999;
    var friends = hero.findFriends();
    var lowestFriend = null;
    for (var f = 0; f < friends.length; f++) {
        var friend = friends[f];
        if (friend.health < lowestHealth && friend.health < friend.maxHealth) {
            lowestHealth = friend.health;
            lowestFriend = friend;
        }
    }
    return lowestFriend;
}
// Heal the friend with the lowest health using lowestHealthFriend()
function commandPaladin(paladin) {
    var enemy = paladin.findNearest(hero.findEnemies());
    var lowestFriend = lowestHealthFriend();
    if (!enemy) {
        if (lowestFriend && paladin.canCast("heal")) {
          hero.command(paladin, "cast", "heal", lowestFriend);
        }
    }else if(enemy) {
        if (hero.health<hero.maxHealth / 3 && paladin.canCast("heal")) {
            hero.command(paladin, "cast", "heal", hero);
        }else if (lowestFriend && paladin.canCast("heal")) {
            hero.command(paladin, "cast", "heal", lowestFriend);
        } else if (paladin.health < paladin.maxHelth / 3) {
            hero.command(paladin, "shield");
        } else {
            hero.command(paladin, "attack", enemy);
        }
    }

}
function SoldierFormation(soldier, soldierIndex, numSoldiers) {
    var centerUnits = hero.findByType("paladin", hero.findFriends());
    for (var i = 0; i < centerUnits.leangth; i++) {
        var center = centerUnit.pos;
        for( soldierIndex=0; soldierIndex< soldiers.length;soldierIndex++){
        var angle = Math.PI * 2 * soldierIndex / numSoldiers;
        center.x += 8 * Math.cos(angle);
        center.y += 8 * Math.sin(angle);
        hero.command(soldier, "defend", center);
        }
    }
}
// If you have funds for a soldier, summon one.
function summonTroops() {
    var summonTypes = ["griffin-rider"];
    var summonType = summonTypes[hero.built.length % summonTypes.length];
    if (hero.gold >= hero.costOf(summonType)) {
        hero.summon(summonType);
    }
}
function commandSoldier(soldier) {

    // Loop over all your soldiers and order them to attack.
    for (var i = 0; i < soldiers.length; i++) {
        var enemy = soldier.findNearest(hero.findEnemies());
        soldier = soldiers[i];
        if (enemy && enemy.health > 0) {
            // Use the 'attack' command to make your soldiers attack.
            hero.command(soldier, "attack", enemy);
        }
    }
}
function commandArcher(archer) {
    var enemy = archer.findNearest(hero.findEnemies());

    for (var i = 0; i < archers.length; i += 1) {
        archer = archers[i];
        // Archers should only attack enemies who are closer than 25 meters, otherwise, stay still.
        if (enemy.type == "fangrider") {
            var distance = archer.distanceTo(enemy);
            hero.command(archer, "attack", enemy);
        } else if (enemy.type != "fangrider" && distance < 55) {
            hero.command(archer, "attack", enemy);
        } else {
            continue;
        }
    }
}
function commandGriffin(griffin) {
    var enemies = hero.findEnemies();
    var enemy = griffin.findNearest(enemies);

    // Loop over all your soldiers and order them to attack.
    for (var i = 0; i < griffins.length; i++) {
        griffin = griffins[i];
        if (enemy && enemy.health > 0) {
            // Use the 'attack' command to make your soldiers attack.
            hero.command(griffin, "attack", enemy);
        }
    }
}
function commandFriends() {
    // Command your friends.
    var enemies = hero.findEnemies();
    var enemy = hero.findNearest(enemies);
    var soldiers = hero.findByType("soldier", hero.findFriends());
    var paladins = hero.findByType("paladin");
    var archers = hero.findByType("archer", hero.findFriends());
    var griffins = hero.findByType("griffin-rider", hero.findFriends());
    for (var i = 0; i < soldiers.length; i++) {
        var soldier = soldiers[i];
        SoldierFormation(soldier, i, soldiers.length);
    }
    // use commandArcher() to command your archers
    for (var j = 0; j < archers.length; j++) {
        var archer = archers[j];
        commandArcher(archer);
    }
    for (var k = 0; k < griffins.length; k++) {
        var griffin = griffins[k];
        commandGriffin(griffin);
    }
    for (var p = 0; p < paladins.length; p++) {
        var paladin = paladins[p];
        commandPaladin(paladin);
    }
}
//cast spell "chain-lightning"
function castChainLightning() {
    var enemies = hero.findEnemies();
    var enemy = hero.findNearest(enemies);
    if (enemy) {
        var distance = hero.distanceTo(enemy);
        if (hero.canCast("chain-lightning")) {
            var bestTarget = pickBestEnemyAOE(10);
            hero.cast("chain-lightning", bestTarget);
        }
    }
}
// standard close combat
function closeCombat() {
    var enemies = hero.findEnemies();
    var enemy = hero.findNearest(enemies);
    if (enemy) {
        var distance = hero.distanceTo(enemy);
        if (distance < 10 && hero.isReady("bash")) {
            hero.bash(enemy);
        } else {
            hero.attack(enemy);
        }
    }
}
while (true) {
    flagAction();
    summonTroops();
    commandFriends();
    castChainLightning();
    closeCombat();
}
