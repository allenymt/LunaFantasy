import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FixedUpdate')
export class FixedUpdate {
    private static _instance: FixedUpdate;
    private nowTime: number = 0;
    private fixedDeltaTime: number = 1 / 60;   //  设定一个固定的更新时间

    private constructor() {

    }
    public static getInstance(): FixedUpdate {
        if (!FixedUpdate._instance) {
            FixedUpdate._instance = new FixedUpdate();
        }
        return FixedUpdate._instance;
    }

    public update(dt: number, fixedUpdateCallBack: (delta: number) => void) {

        this.nowTime += dt; //  更新当前时间
        while (this.nowTime > this.fixedDeltaTime) {
            fixedUpdateCallBack(this.fixedDeltaTime);   //调用传入的回调函数，传入固定的时间间隔作为参数
            this.nowTime = this.fixedDeltaTime; //  当前时间减去固定时间间隔
        }
    }
}

