import React from 'react';
import  './App.css';
import items from './items';


window.items=items;


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      gameMap:[
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
        [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
      ],
      figure: [],
      formsOfFigure: [],
      currenFormIndex:0,
      x: 1,
      y: 1,
    }
    this.drawingMap = this.drawingMap.bind(this);
    this.drawingFigureOnMap = this.drawingFigureOnMap.bind(this);
    this.moveFigure = this.moveFigure.bind(this);
    this.changeFigure = this.changeFigure.bind(this);
    this.getFigure = this.getFigure.bind(this);
    this.clear = this.clear.bind(this);
    this.changeForm = this.changeForm.bind(this);
    this.check = this.check.bind(this);
  }
  check(way){
    let [x,y] = [this.state.x,this.state.y];
    let [column, rows] = [this.state.figure[0].length, this.state.figure.length];
    if (way==="ArrowRight"){
      x=x+1;
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if (this.state.gameMap[i][j]===2&&this.state.gameMap[i][j-1]===1) return false;
        }
      }
    }
    if (way==="ArrowLeft"){
      x=x-1;
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if (this.state.gameMap[i][j]===2&&this.state.gameMap[i][j+1]===1)  return false;
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
          if (this.state.gameMap[i][j]===2) return false;
        }
      }
    }
    if (way==="ArrowDown"){
      y=y+1;
      for (let i=y; i<rows+y; i++){
        for (let j=x; j<column+x; j++){
          if (this.state.figure[i-y][j-x]===1&&this.state.gameMap[i][j]===2) return false
        }
      }
    }
    return true;
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
    let r = 2 //Math.trunc(Math.random() * (Object.keys(items).length - 1));
    let formIndex = 1 //Math.trunc(Math.random() * (Object.keys(items[r]).length - 1));
    let arr=[];
    for(let key in items[r]){
      arr.push(items[r][key]);
    }
    this.setState({formsOfFigure: arr});
    this.setState({currenFormIndex: formIndex});
    this.setState({figure: arr[formIndex]},()=>{this.drawingFigureOnMap();});
  }
  drawingMap(){
    return this.state.gameMap.map((item,i)=>{
      return (
        <div key={`y=${i}`}>
          {item.map((item,j)=>{
            return (
              <span className={
                  item===0
                    ?"block emty"
                    :"block filled"
              } key={`x=${j}`}>
                {item}
              </span>
            )
          })}
        </div>
      )
    });
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
          }
          break;
      default: break;
    }
    
  }
  changeFigure(){
    let r = Math.trunc(Math.random() * (items.length - 1));
    this.setState({figure:items[r].type_1},this.drawingFigureOnMap)
  }
  componentDidMount(){
    this.getFigure();
    //setInterval(this.changeFigure,1000);
  }
  render(){
    return (
      <div onKeyDown={this.moveFigure} tabIndex="0" className="main">
          {this.drawingMap()} 
      </div>
    );
  }
  
}

export default App;
