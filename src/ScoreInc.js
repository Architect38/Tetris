import React from 'react';

class ScoreInc extends React.Component{
    constructor(props){
      super(props);
      this.state={
        opacity:1
      }
    }
    componentDidMount(){
      this.interval = setInterval(()=>{
        this.setState({opacity: this.state.opacity-0.05})
      },100)
    }
    componentWillUnmount(){
      clearInterval(this.interval);
    }
    render(){
      return(
        <div className="scoreInc" style={{opacity:`${this.state.opacity}`}}>+{this.props.scoreInc}</div>
      );
    }
  }

export default ScoreInc;  