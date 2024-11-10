import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('CustomRenderingOrder')
export class CustomRenderingOrder extends Component {
    start() {

    }

    update(deltaTime: number) {
        let EvnNodes = this.node.children;
        //  按照y值大到小进行排序，Y值越低，显示越靠前
        EvnNodes.sort((a, b) => b.position.y - a.position.y);
        // 更新渲染（节点）顺序，setSiblingIndex(0) 会将节点移动到最前面
        EvnNodes.forEach((EvnNode, index) => {
            EvnNode.setSiblingIndex(index);
        });
    }

}

