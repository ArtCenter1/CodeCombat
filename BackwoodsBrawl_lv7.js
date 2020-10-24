def distanceBetweenEnemies(a, b):
    return ((a.pos.x - b.pos.x) ** 2 + (a.pos.y - b.pos.y) ** 2) ** 0.5

def sortByPriority(enemy):
    enemyTypes = ["warlock", "witch", "headhunter", "brawler", "fangrider", "shaman", "ogre"]
    for i, eType in enumerate(enemyTypes):
        if enemy.type == eType:
            return i
    return len(enemyTypes)

def pickPriorityEnemy(range=45):
    enemies = [enemy for enemy in hero.findEnemies() if hero.distanceTo(enemy) <= range]
    if len(enemies) > 0:
        enemies.sort(sortByPriority)
        return enemies[0]
    else:
        return None

def pickBestEnemyAOE(radius=5):
    enemies = hero.findEnemies()
    bestScore = 0
    bestEnemy = None
    for centerEnemy in enemies:
        score = 0
        for enemy in enemies:
            if distanceBetweenEnemies(centerEnemy, enemy) <= radius:
                score += 1
        if score > bestScore:
            bestScore = score
            bestEnemy = centerEnemy
    return bestEnemy

def summonTroops(summonTable):
    summonType = summonTable[len(hero.built) % len(summonTable)]
    while hero.gold >= hero.costOf(summonType):
        hero.summon(summonType)

def woundedAllies():
    friends = [f for f in hero.findFriends() if f.type == "burl" or f.type == "paladin"]
    wounded = []
    for friend in friends:
        if friend.maxHealth - 150 > friend.health:
            wounded.append(friend)
    if hero.health <= 250:
        wounded.append(hero)
    return wounded

def commandPaladins():
    paladins = hero.findByType("paladin")
    for paladin in paladins:
        nearestEnemy = paladin.findNearestEnemy()
        if paladin.canCast("heal"):
            wounded = woundedAllies()
            if len(wounded) > 0:
                hero.command(paladin, "cast", "heal", wounded[0])
        if nearestEnemy:
            if paladin.distanceTo(nearestEnemy) > 20:
                hero.command(paladin, "shield")
            else:
                hero.command(paladin, "attack", nearestEnemy)

def resetCooldown(spellToReset, cooldownThreshold=3):
    if hero.isReady("reset-cooldown") and hero.getCooldown(spellToReset) > cooldownThreshold:
        hero.resetCooldown(spellToReset)

def castRaiseDead(range=10):
    if hero.canCast("raise-dead"):
        corpses = [corpse for corpse in hero.findCorpses() if hero.distanceTo(corpse) <= range]
        if len(corpses) >= 5:
            hero.cast("raise-dead")

def castSummonUndead():
    if hero.canCast("summon-undead"):
        hero.cast("summon-undead")

def castSummonBurl():
    if hero.canCast("summon-burl"):
        hero.cast("summon-burl")

def castPoisonCloud():
    if hero.canCast("poison-cloud") and len(hero.findEnemies()) > 5:
        bestTarget = pickBestEnemyAOE(radius=5)
        if bestTarget:
            hero.cast("poison-cloud", bestTarget)

def castChainLightning():
    if hero.canCast("chain-lightning") and len(hero.findEnemies()) > 5:
        bestTarget = pickBestEnemyAOE(radius=10)
        if bestTarget:
            hero.cast("chain-lightning", bestTarget)

def castSpells():
    resetCooldown("summon-burl")
    castRaiseDead()
    castSummonBurl()
    castSummonUndead()
    castPoisonCloud()
    castChainLightning()

def attackWandOrDrainLife():
    enemies = hero.findEnemies()
    if len(enemies) > 0:
        nearest = hero.findNearest(enemies)
        if nearest and hero.distanceTo(nearest) < 9:
            hero.cast("drain-life", nearest)
        else:
            target = pickPriorityEnemy()
            if target:
                if hero.distanceTo(target) <= 15:
                    hero.cast("drain-life", target)
                else:
                    hero.attack(target)

while True:
    summonTroops(["paladin"])
    commandPaladins()
    castSpells()
    attackWandOrDrainLife()
