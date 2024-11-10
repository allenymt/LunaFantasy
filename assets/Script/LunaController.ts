import { _decorator, Component, Node, input, Input, KeyCode, EventKeyboard, Vec3, director, RigidBody2D, Vec2 } from 'cc';
import { FixedUpdate } from './FixedUpdate';
const { ccclass, property } = _decorator;

enum Direction {
    Left,
    Right,
    Up,
    Down
}

@ccclass('LunaController')
export class LunaController extends Component {

    public static Instance: LunaController = null;   //添加静态实例属性

    private _moveDirection: Vec3 = new Vec3(0, 0, 0);
    private rb: RigidBody2D = null;
    // 分别记录方向键按下状态
    private isRightPressed: boolean = false;
    private isLeftPressed: boolean = false;
    private isUpPressed: boolean = false;
    private isDownPressed: boolean = false;
    private currentHealth = 3;

    @property(Number)
    public MaxHealth = 5;

    @property(Number)
    public moveSpeed: number = 700;


    // 记住最后按下的方向
    private lastHorizontalInput: Direction.Left | Direction.Right = null;
    private lastVerticalInput: Direction.Up | Direction.Down = null;


    onLoad() {

        //  确保只实例化一次
        if (LunaController.Instance === null) {
            LunaController.Instance = this; //  保存实例
        }
        else {
            //如果已经有实例，销毁当前节点
            this.node.destroy();
            return;
        }

        this.rb = this.getComponent(RigidBody2D);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        console.log("onKeyDown");
        switch (event.keyCode) {
            // 向上箭头
            case KeyCode.ARROW_UP:
                this.isUpPressed = true;
                // 标记向上箭头被按下
                this.lastVerticalInput = Direction.Up;
                break;

            // 向下箭头
            case KeyCode.ARROW_DOWN:
                this.isDownPressed = true;
                // 标记向下箭头被按下
                this.lastVerticalInput = Direction.Down;
                break;

            // 向左箭头
            case KeyCode.ARROW_LEFT:
                this.isLeftPressed = true;
                // 标记向左箭头被按下
                this.lastHorizontalInput = Direction.Left;
                break;

            //  向右箭头
            case KeyCode.ARROW_RIGHT:
                this.isRightPressed = true;
                // 标记向右箭头被按下
                this.lastHorizontalInput = Direction.Right;
                break;
        }
        this.updateMoveDirection();
    }

    onKeyUp(event: EventKeyboard) {
        // 
        switch (event.keyCode) {
            // 松开上箭头
            case KeyCode.ARROW_UP:
                this.isUpPressed = false;
                if (this.isDownPressed) {
                    this.lastVerticalInput = Direction.Down;
                }
                else {
                    this.lastVerticalInput = null;
                }
                break;

            // 松开下箭头
            case KeyCode.ARROW_DOWN:
                this.isDownPressed = false;
                if (this.isUpPressed) {
                    this.lastVerticalInput = Direction.Up;
                }
                else {
                    this.lastVerticalInput = null;
                }
                break;

            // 松开右箭头
            case KeyCode.ARROW_RIGHT:
                this.isRightPressed = false;
                if (this.isLeftPressed) {
                    this.lastHorizontalInput = Direction.Left;
                }
                else {
                    this.lastHorizontalInput = null;
                }
                break;

            // 松开左箭头
            case KeyCode.ARROW_LEFT:
                this.isLeftPressed = false;
                if (this.isRightPressed) {
                    this.lastHorizontalInput = Direction.Right;
                }
                else {
                    this.lastHorizontalInput = null;
                }
                break;


        }
        this.updateMoveDirection();
    }

    updateMoveDirection() {
        //  根据键位改变水平方向移动的位置
        if (this.lastHorizontalInput == Direction.Left) {
            this._moveDirection.x = -1;
        } else if (this.lastHorizontalInput == Direction.Right) {
            this._moveDirection.x = 1;
        } else {
            this._moveDirection.x = 0;
        }
        //  根据键位改变竖直方向移动的位置
        if (this.lastVerticalInput == Direction.Down) {
            this._moveDirection.y = -1;
        } else if (this.lastVerticalInput == Direction.Up) {
            this._moveDirection.y = 1;
        } else {
            this._moveDirection.y = 0;
        }
    }


    start() {
        this.currentHealth = this.MaxHealth;

    }

    // update(deltaTime: number) {
    //     //  计算移动移动向量，根据方向和移动速度以及时间差
    //     let movement = new Vec3(this._moveDirection.x * this.moveSpeed * deltaTime, this._moveDirection.y *
    //         this.moveSpeed * deltaTime, 0
    //     );

    //     let veclocity = new Vec2(this._moveDirection.x * this.moveSpeed * deltaTime, this._moveDirection.y *
    //         this.moveSpeed * deltaTime);
    //     //  设置节点的位置为当前位置加上移动向量
    //     // this.node.setPosition(this.node.position.add(movement));

    //     this.rb.linearVelocity = veclocity;

    // }

    protected update(dt: number): void {
        FixedUpdate.getInstance().update(dt, this.fixedUpdate.bind(this));
    }

    fixedUpdate(fixedDeltaTime: number) {
        let veclocity = new Vec2(this._moveDirection.x * this.moveSpeed * fixedDeltaTime, this._moveDirection.y *
            this.moveSpeed * fixedDeltaTime);
        this.rb.linearVelocity = veclocity;
    }

    public ChangeHealth(amount: number) {
        //限制血量上限和下限
        this.currentHealth = Math.max(0, Math.min(this.currentHealth + amount, this.MaxHealth));
        console.log(this.currentHealth + '/' + this.MaxHealth);
    }


}

