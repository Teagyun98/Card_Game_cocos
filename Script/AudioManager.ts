// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.AudioClip)
    heart:cc.AudioClip = null;
    @property(cc.AudioClip)
    star:cc.AudioClip = null;
    @property(cc.AudioClip)
    tri:cc.AudioClip = null;
    @property(cc.AudioClip)
    square:cc.AudioClip = null;
    
    PlayAudio(num) // 번호를 받으면 그 번호에 맞는 소리 재생
    {
        switch(num)
        {
            case 1:
                cc.audioEngine.play(this.heart, false, 1);
                break;
            case 2:
                cc.audioEngine.play(this.tri, false, 1);
                break;
            case 3:
                cc.audioEngine.play(this.square, false, 1);
                break;
            case 4:
                cc.audioEngine.play(this.star, false, 1);
                break;
        }
    }
    
}
