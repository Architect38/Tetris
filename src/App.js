import React from 'react';
import  './App.css';
import items from './items';


window.items=items;


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      gameMap:[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],       
      ],
      figure: [],
      formsOfFigure: [],
      currenFormIndex:0,
      x: 1,
      y: 0,
      pressMoveFigure: true,
      score:0,
      menu: false,
      pause: true,
    }
    this.timePlay = null;
    this.myDiv = React.createRef();
    this.drawingMap = this.drawingMap.bind(this);
    this.drawingFigureOnMap = this.drawingFigureOnMap.bind(this);
    this.moveFigure = this.moveFigure.bind(this);
    this.changeFigure = this.changeFigure.bind(this);
    this.getFigure = this.getFigure.bind(this);
    this.clear = this.clear.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.check = this.check.bind(this);
    this.finish = this.finish.bind(this);
    this.drawMenu = this.drawMenu.bind(this);
  }
  check(way){
    let [x,y] = [this.state.x,this.state.y];
    let [column, rows] = [this.state.figure[0].length, this.state.figure.length];
    let [columnMap, rowsMap] = [this.state.gameMap[0].length, this.state.gameMap.length];
    let gameMap = this.state.gameMap;
    
    for (let i=y; i<rows+y; i++){
      for (let j=x; j<column+x; j++){
        if (y===0&&gameMap[i][j]===2) this.finish();
      }
    }

    if (way==="ArrowRight"){
      x=x+1;
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if ((j===columnMap||gameMap[i][j]===2)&&gameMap[i][j-1]===1) return false;
        }
      }
    }
    if (way==="ArrowLeft"){
      x=x-1;
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if ((j===-1||gameMap[i][j]===2)&&gameMap[i][j+1]===1) return false;
        }
      }
    }
    if (way==="ArrowUp"){
      let i = this.state.currenFormIndex;
      let l = this.state.formsOfFigure.length;
      if (i<l-1) i++
      else i=0;
      let [column, rows] = [this.state.formsOfFigure[i][0].length,this.state.formsOfFigure[i].length];
      
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if (i===rowsMap||j===columnMap||gameMap[i][j]===2) return false;
        }
      }
    }
    if (way==="ArrowDown"){
      y=y+1;
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if (this.state.figure[i-y][j-x]===1&&(i===rowsMap||gameMap[i][j]===2)) return false
        }
      }
    }
    return true;
  }
  finish(){
    clearInterval(this.timePlay);
    alert("Game over!");
    this.setState({
      pressMoveFigure: false,
      score: 0,
      y: 0,
      x: 4
    });
    this.state.gameMap.forEach((item,i,arr)=>{
      arr[i].forEach((item,i,arr)=>{
        arr[i]=0;
      });
    });
    this.getFigure();
    this.timePlay = setInterval(()=>this.moveFigure({key:"ArrowDown"}),1000);
    this.setState({pressMoveFigure: true});
  }
  changeForm(){
    let i = this.state.currenFormIndex;
    let l = this.state.formsOfFigure.length;
    if (i<l-1) i++
    else i=0;
    this.setState({currenFormIndex: i});
    this.setState({figure: this.state.formsOfFigure[i]},()=>{
      this.drawingFigureOnMap();
    });
  }
  clear(way){
    
    let [x,y] = [this.state.x,this.state.y];
    let [column, rows] = [this.state.figure[0].length, this.state.figure.length];
    if (way==="ArrowRight"){
      for(let i=y;i<rows+y;i++){
        if (this.state.gameMap[i][x-1]!=2) this.state.gameMap[i][x-1] = 0;
      }
    }
    if (way==="ArrowLeft"){
      for(let i=y;i<rows+y;i++){
        if (this.state.gameMap[i][x+column]!=2) this.state.gameMap[i][x+column] = 0;
      }
    }
    if (way==="ArrowUp"){
      let [x,y] = [this.state.x,this.state.y];
      let [column, rows] = [this.state.figure[0].length, this.state.figure.length];
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if (this.state.gameMap[i][j]!=2) this.state.gameMap[i][j]=0;
          else this.state.gameMap[i][j]=2;
        }
      }
      }
      if (way==="ArrowDown"){
        for(let i=x; i<column+x;i++){
          if (this.state.gameMap[y-1][i]!=2) this.state.gameMap[y-1][i]=0;
          else this.state.gameMap[y-1][i]=2;
        }
      }
      this.setState({gameMap: this.state.gameMap});
  }
  getFigure(){
    let r = 5//Math.trunc(Math.random() * (Object.keys(items).length));
    let formIndex = Math.trunc(Math.random() * (Object.keys(items[r]).length - 1));
    let arr=[];
    for(let key in items[r]){
      arr.push(items[r][key]);
    }
    this.setState({formsOfFigure: arr});
    this.setState({currenFormIndex: formIndex});
    this.setState({figure: arr[formIndex]},()=>{this.drawingFigureOnMap();});
  }
  
  drawingFigureOnMap(){
    let [x,y] = [this.state.x,this.state.y];
    let [column, rows] = [this.state.figure[0].length, this.state.figure.length];
    for (let i=y; i<rows+y; i++){
      for (let j=x; j<column+x; j++){
        if (this.state.gameMap[i][j]===2) this.state.gameMap[i][j]=2; else this.state.gameMap[i][j]=this.state.figure[i-y][j-x];
      }
    }
    this.setState({gameMap: this.state.gameMap});
  }
  moveFigure(e){
    let x = this.state.x;
    let y = this.state.y;
    switch(e.key){
      case "ArrowRight":
        this.check("ArrowRight")===true
          &&  this.setState({x: x+1},()=>{
              this.drawingFigureOnMap();
              this.clear("ArrowRight");
          })
        break;
      case "ArrowLeft":
          this.check("ArrowLeft")===true
            && this.setState({x: x-1},()=>{
              this.drawingFigureOnMap();
              this.clear("ArrowLeft");
            })
        break;
      case "ArrowUp":
          if(this.check("ArrowUp")===true){
            this.clear("ArrowUp");
            this.changeForm();
          } 
          break;
      case "ArrowDown":
          if(this.check("ArrowDown")===true){
            this.setState({y: y+1},()=>{
              this.drawingFigureOnMap();
              this.clear("ArrowDown");
            })
          } else this.changeFigure();
          break;
      default: break;
    }
    
  }
  changeFigure(){
    let [x,y] = [this.state.x,this.state.y];
    let [column, rows] = [this.state.figure[0].length, this.state.figure.length];
    let [columnMap, rowsMap] = [this.state.gameMap[0].length, this.state.gameMap.length];
    let [gameMap,figure] = [this.state.gameMap, this.state.figure];
    let countFilled = 0;
    clearInterval(this.timePlay);
    this.setState({pressMoveFigure: false});
  
    for (let i=y; i<rows+y; i++){  //слияние
      for (let j=x; j<column+x; j++){
        if (figure[i-y][j-x]===1) gameMap[i][j]=2;
      }
    }
    for(let i=0; i<rowsMap; i++){ //чистка
      countFilled = 0;
      gameMap[i].forEach((item)=>item===2 && countFilled++);
      if (countFilled===columnMap){
        this.setState({score: this.state.score+10});
        for (let j=i;j>0;j--){
          for(let j2=0;j2<columnMap;j2++){
            gameMap[j][j2]=gameMap[j-1][j2];
          }
        }
      }
    }
    this.setState({pressMoveFigure: true});
    this.state.y=0;
    this.state.x=4;
    this.getFigure();
    this.timePlay = setInterval(()=>this.moveFigure({key:"ArrowDown"}),1000);
  }
  drawMenu(){

  }
  drawingMap(){
    return this.state.gameMap.map((item,i)=>{
      return (
        <div key={`y=${i}`}>
          {item.map((item,j,arr)=>{
            return (
              <span className={
                  item===0
                    ?"block emty"
                    :"block filled"
              } key={`x=${j}`}>
                
              </span>
            )
          })}
        </div>
      )
    });
  }
  componentDidMount(){
    this.myDiv.current.focus();
    this.getFigure();
    this.timePlay = setInterval(()=>this.moveFigure({key:"ArrowDown"}),1000);
  }
  render(){
    return (
      <div className="main">
       {
         this.state.menu===true
           ? <div className="menu">
                
             </div>
           : <div onKeyDown={this.state.pressMoveFigure===true && this.moveFigure} ref={this.myDiv}tabIndex="-1" className="game">
               <div className="map">{this.drawingMap()}</div>
               <div className="stat">
                  <h2>Score: {this.state.score}</h2>
                  <button>Pause</button>
                  <button>New game</button>
               </div>
             </div>
       }
      </div>
    );
  }
  
}

export default App;
