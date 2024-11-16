import { _decorator, Component, Node, BoxCollider2D, ITriggerEvent, UITransform, v2 } from 'cc';
import { LunaController } from './LunaController';
const { ccclass, property } = _decorator;

@ccclass('Potion')
export class Potion extends Component {
    update(deltaTime: number) {
        console.log("还没遇到主角！");
        if (this.cheakColliderPoint(this.node, LunaController.Instance.node)) {
            console.error("遇到了主角！!!");
        }

    }

    public cheakColliderPoint(currentNode: Node, targetNode: Node): boolean {
        let curNodePosition = currentNode.parent.getComponent(UITransform).convertToWorldSpaceAR(currentNode.position);
        let tarBoundingBox = targetNode.getComponent(UITransform).getBoundingBoxToWorld();
        if (tarBoundingBox.contains(v2(curNodePosition.x, curNodePosition.y)))
            return true;
        else
            return false;


    }

    public start() {
        let collider = this.node.getComponent(BoxCollider2D);
        if (collider) {
            console.log(collider);
        }
        collider.on('onTriggerStay', this.onTriggerStay, this);
    }

    private onTriggerStay(event: ITriggerEvent) {
        console.log(event.type, event);
        console.log("一个没有意义的提交......为了续火花")
    }



}




