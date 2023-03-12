
const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    frontChick:cc.Node = null;

    @property(cc.Node)
    frontCard:cc.Node = null;

    @property(cc.Node)
    Shape1:cc.Node = null;

    @property(cc.Node)
    Shape2:cc.Node = null;

    @property(cc.Node)
    Shape3:cc.Node = null;

    @property(cc.Node)
    Shape4:cc.Node = null;

    @property(cc.Float)
    x:number = null;

    @property(cc.Integer)
    shapeNum:number = null;

    @property(cc.Node)
    GameManager:cc.Node = null;

    @property(cc.Boolean)
    Goal = false;
    GameStart = false;

    @property(cc.Node)
    particle:cc.Node = null;

    start () {
        switch(this.shapeNum) // 매니져에서 받아 온 값으로 모양 설정
        {
            case 1:
                this.frontCard = this.Shape1;
                break;
            case 2:
                this.frontCard = this.Shape2;
                break;
            case 3:
                this.frontCard = this.Shape3;
                break;
            case 4:
                this.frontCard = this.Shape4;
                break;
        }

        this.scheduleOnce(this.firstOpen, 5); // 처음 이동 후 정답 공개

        this.node.on("touchend", this.OpenCard, this); // 클릭시 실행
    }

    protected update(dt: number): void {
        this.node.x = cc.lerp(this.node.x, this.x, dt); // 정해진 위치로 이동

        if(this.Goal)
        {
            this.node.y = cc.lerp(this.node.y, 1000, dt*0.5); // 정답을 맞추었을 때 위로 이동
        }
    }

    OpenCard() // 카드를 뒤집었을 때
    {
        if(this.GameStart&&!this.GameManager.getComponent("GameManager").collect2&&!this.frontChick.active){
            this.frontChick.active = true;
            this.frontCard.active = true;
            this.GameManager.getComponent("GameManager").collectCheck = true;
            this.Collect();
        }
    }

    Collect()
    {
        if(this.GameManager.getComponent("GameManager").collect1 == null)
        {
            this.GameManager.getComponent("GameManager").collect1 = this.node;
            this.GameManager.getComponent("GameManager").Hint();
        }
        else
        {
            this.GameManager.getComponent("GameManager").collect2 = this.node;
            this.GameManager.getComponent("GameManager").CheckGoal();
        }
    }

    CloseCard()
    {
        this.frontChick.active = false;
        this.frontCard.active = false;
    }

    firstOpen()
    {
        this.frontChick.active = true;
        this.frontCard.active = true;
        this.scheduleOnce(this.firstClose, 2);
    }

    firstClose()
    {
        this.frontChick.active = false;
        this.frontCard.active = false;
        this.GameStart = true;
        this.GameManager.getComponent("GameManager").FirstHint();
    }

    HintMove() // 힌트 동작
    {
        this.scheduleOnce(this.MoveUp,0);
    }

    MoveUp()
    {
        this.node.y = this.node.y+10;
        this.scheduleOnce(this.MoveDown, 1);
    }
    MoveDown()
    {
        this.node.y = this.node.y-10;
    }

    PlayParticle()
    {
        this.particle.active = true;
        this.schedule(this.StopParticle, 1);
    }

    StopParticle()
    {
        this.particle.active = false;
    }

}
