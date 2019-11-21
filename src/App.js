import React from 'react';
import s from './App.css';
import items from './items';

window.items=items;


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      gameMap:[
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
      ],
      figure: [],
      formsOfFigure: [],
      x: 3,
      y: 2,
    }
    this.drawingMap = this.drawingMap.bind(this);
    this.drawingFigureOnMap = this.drawingFigureOnMap.bind(this);
    this.moveFigure = this.moveFigure.bind(this);
    this.changeFigure = this.changeFigure.bind(this);
    this.getFigure = this.getFigure.bind(this);
  }
  getFigure(){
    let r = Math.trunc(Math.random() * (Object.keys(items).length - 1));
    let form = Math.trunc(Math.random() * (Object.keys(items[r]).length - 1));
    let arr=[];
    for(let key in items[r]){
      arr.push(items[r][key]);
    }
    this.setState({formsOfFigure: arr});
    this.setState({figure: arr[form]},()=>{this.drawingFigureOnMap();});
  }
  drawingMap(){
    return this.state.gameMap.map((item,i)=>{
      return (
        <div key={`y=${i}`}>
          {item.map((item,j)=>{
            return <span key={`x=${j}`}>{item} </span>
          })}
        </div>
      )
    });
  }
  drawingFigureOnMap(){
    let [x,y] = [this.state.x,this.state.y]
    let [column, rows] = [this.state.figure[0].length, this.state.figure.length]
    for (let i=y; i<rows+y; i++){
      for (let j=x; j<column+x; j++){
        this.state.gameMap[i][j]=this.state.figure[i-y][j-x];
      }
    }
    this.setState({gameMap: this.state.gameMap});
  }
  moveFigure(e){
    switch(e.key){
      case "ArrowRight":
        this.setState({x:this.state.x+1},()=>{this.drawingFigureOnMap();})
        break;
      case "ArrowLeft":
        break;
      case "ArrowUp":
          
          break;
      default: break;
    }
    this.setState({x:this.state.x+1}, ()=>{this.drawingFigureOnMap();});
    
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
      <div onKeyDown={this.moveFigure} tabIndex="0">
          {this.drawingMap()} 
      </div>
    );
  }
  
}

export default App;
