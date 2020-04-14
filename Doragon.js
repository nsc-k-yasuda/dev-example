class Character  {
constructor(name,hp,mp){
    this.name=name;
    this.hp=hp;
    this.mp=mp;  
}
attack(target){
    console.log(`${this.name}が${target}に攻撃した`);
}
}

class Yuusya extends Character{
    constructor(name,hp,mp,weapon){
    super(name,hp,mp);
    this.weapon=weapon;
    }
    deathblow(){
        console.log(`${this.name}が必殺技を発動した`);
    }
}


class Wizard extends Character{
    constructor(name,hp,mp,weapon){
        super(name,hp,mp);
        this.weapon=weapon;
    }
    castSpell(spellName,target){
        console.log(`${this.name}が呪文を唱えた`);
    }
}


class Cleric extends Character{
    constructor(name,hp,mp,weapon){
        super(name,hp,mp);
        this.weapon=weapon;
    }
    kaifuku(spellName){
        console.log(`${this.name}が回復魔法を唱えた`);
    }
}


class Berseker extends Character{
    constructor(name,hp,mp,weapon){
        super(name,hp,mp);
        this.weapon=weapon;
 }
 hensin(){
     console.log(`${this.name}が獣化して攻撃力30％up`);
 }
}

class Monster {
    constructor(name,hp,mp){
        this.name=name;
        this.hp=hp;
        this.mp=mp;
    }
    attack(target){
        console.log(`${this.name}が${target}に攻撃した`);
    }

    runAway(){
        console.log(`${this.name}は逃げ出した`);
    }
}

class slime extends Monster {
    constructor(name,hp,mp,weapon){
        super(name,hp,mp);
        this.weapon=weapon;
    }
    bunretu(){
        console.log(`${this.name}は分裂した`);
    }
}

class Ork extends Monster{
    constructor(name,hp,mp,weapon){
        super(name,hp,mp);
        this.weapon=weapon;
    }
    ferocity(){
        console.log(`${this.name}が狂暴化して攻撃力10%up`);
    }
}

class LastBoss extends Monster{
    constructor(name,hp,mp,weapon){
        super(name,hp,mp);
        this.weapon=weapon;
    }
    runAway(){}
    revive(){
        console.log(`${this.name}はよみがえった`);
    }
}
