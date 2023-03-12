const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    ChickArr:Array<cc.Node> = [];
    temp:cc.Node = null;
    collect1:cc.Node = null;
    collect2:cc.Node = null;
    GoalCount = 0;
    collectCheck = false;

    @property(cc.Node)
    ending:cc.Node = null;

    onLoad () {

        this.shuffleArr() //셔플 로직

        for(var i = 1; i<5; i++)//모양 분배
        {
            this.ChickArr[i-1].getComponent("Chick").shapeNum = i;
            this.ChickArr[i+3].getComponent("Chick").shapeNum = i;
        }
     }

    shuffleArr()
     {
        var rand1, rand2;

        for(var i = 0; i<this.ChickArr.length; i++)
        {
            rand1 = Math.floor(Math.random()*this.ChickArr.length);
            rand2 = Math.floor(Math.random()*this.ChickArr.length);

            this.temp = this.ChickArr[rand1];
            this.ChickArr[rand1] = this.ChickArr[rand2];
            this.ChickArr[rand2] = this.temp;
        }
     }

     CheckGoal()//정답 체크
     {
        if(this.collect2!=null)
        {
            if(this.collect1.getComponent("Chick").shapeNum==this.collect2.getComponent("Chick").shapeNum)
            {
                this.node.getComponent("AudioManager").PlayAudio(this.collect1.getComponent("Chick").shapeNum);
                this.collect1.getComponent("Chick").Goal = true;
                this.collect2.getComponent("Chick").Goal = true;
                this.collect1.getComponent("Chick").PlayParticle();
                this.collect2.getComponent("Chick").PlayParticle();
                this.collect1 = null;
                this.collect2 = null;
                this.GoalCount++;
                if(this.GoalCount==4)
                this.GameClear();
            }
            else
            {
                this.scheduleOnce(this.CloseOrder, 1);
            }  
        }
     }

     CloseOrder()
     {
        this.collect1.getComponent("Chick").CloseCard();
        this.collect2.getComponent("Chick").CloseCard();
        this.collect1 = null;
        this.collect2 = null;
     }

     FirstHint()
     {
        this.scheduleOnce(this.FirstHintGo, 5);
     }

     FirstHintGo()
     {
        if(!this.collectCheck)
        {
            for(var i = 0; i<this.ChickArr.length; i++)
            {
                if(this.ChickArr[i].getComponent("Chick").shapeNum == 1)
                    this.ChickArr[i].getComponent("Chick").HintMove();
            }
        }
     }

     GameClear()
     {
        this.ending.active = true;
     }

     Hint()
     {
        this.unschedule(this.HintGo);
        this.schedule(this.HintGo, 5);
     }

     HintGo()
     {
        for(var i = 0; i<this.ChickArr.length; i++)
            {
                if(this.ChickArr[i].getComponent("Chick").shapeNum == this.collect1.getComponent("Chick").shapeNum && !this.ChickArr[i].getComponent("Chick").frontCard.active)
                    this.ChickArr[i].getComponent("Chick").HintMove();
            }
     }

}
