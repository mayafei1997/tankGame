import './style.css'
//随机小矩形
// const el = document.querySelector<HTMLCanvasElement>('#canvas')!
// const app = el.getContext('2d')!

// app.fillStyle = '#000'
// app.fillRect(0, 0, 500, 500)
// for (let i = 0; i < 1000; i++) {
//   app.fillStyle = 'white'
//   app.fillRect(Math.random() * el.width, Math.random() * el.height, 2, 2)
// }

//小黑板  写个类
class BlackBoard {
  constructor(
    public el = document.querySelector<HTMLCanvasElement>('#canvas')!,
    private app = el.getContext('2d')!,
    private height: number = el.height,
    private width: number = el.width
  ) {
    //初始黑板画布
    this.initcanvas()
    //绑定鼠标事件
    this.bindEvent()
  }
  private initcanvas() {
    this.app.fillStyle = '#000'
    this.app.fillRect(0, 0, this.width, this.height)
  }
  private bindEvent() {
    const callback = this.drawLine.bind(this)
    //绑定事件 当鼠标按下的时候 
    this.el.addEventListener('mousedown', () => {
      //划线颜色
      this.app.strokeStyle = '#fff'
      //两步 按下时开始  移动时划线(先定义点 然后连线)
      this.app.beginPath()
      //鼠标移动 开始划线
      this.el.addEventListener('mousemove', callback)
      //当鼠标松开时 移除事件
      this.el.addEventListener('mouseup', () => {
        this.el.removeEventListener('mousemove', callback)
      }
        //  (event: MouseEvent) => {
        //   console.log('2', this) //this是el
        //   this.app.lineTo(event.offsetX, event.offsetY)  //定义点
        //   this.app.stroke()  //连成线
        // }

      )

    })
  }

  //划线
  private drawLine(event: MouseEvent) {
    console.log(this)
    //开始划线
    this.app.lineTo(event.offsetX, event.offsetY)  //定义点
    this.app.stroke()  //连成线
  }
}

const instance = new BlackBoard
