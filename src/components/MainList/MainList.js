import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App/App.css';



class MainList extends Component {

    state={
        showNew: false,
        newTask: ''
    }

    componentDidMount=()=>{
        this.props.dispatch({type: 'GET_LIST'})
    }

    drag=(event)=>{
        event.dataTransfer.setData("text", event.target.id);
    }

    drop=(event)=>{
        event.preventDefault();
        let source = document.getElementsByName
        source.innerHTML = event.target.innerHTML;
        //update text in drop target
        event.target.innerHTML = event.dataTransfer.getData("text/plain");
    }

    dropMe=(event)=>{
        event.preventDefault();
    }

    newTask=(e)=>{
        e.preventDefault()
        console.log('new task', this.state.newTask)
        this.props.dispatch({type: 'ADD_TASK', payload: this.state.newTask})
        this.setState({newTask: ''})
    }

    remove=(id)=>{
        console.log('remove', id)
        this.props.dispatch({type: 'REMOVE_TASK', payload: id})
    }

    toggleComplete=(id)=>{
       console.log('complete', id)
    }


  render() {
    return (
      <>
      <h1>Quick Proof of Concept</h1>
        <div className="container">
            <h1> To-Do List <i className="fa fa-plus-square" id="toggle" 
            onClick={()=>this.setState({showNew: !this.state.showNew})}></i></h1>
            {this.state.showNew === true &&
                <form onSubmit={this.newTask}>
                <input onChange={(event)=>this.setState({newTask: event.target.value})}
                type="text" className="show" id="add-todo" value={this.state.newTask} placeholder="Add a new task"/>
                </form>
            }
            <ul>
                {this.props.reduxState.mainListReducer.map(task=>
                    <li key={task.id} name={task.id} draggable="true" onDragStart={(event)=>this.drag(event)} 
                        onClick={()=>this.toggleComplete(task.id)} onDragOver={(event)=>this.dropMe(event)} onDrop={(event)=>this.drop(event)}>
                        <span onClick={()=>this.remove(task.id)}><i className="fa fa-trash"></i></span>
                        {task.tasks}</li>
                )}
            </ul>
         </div>
      </>
    )
  }
}

const putReduxStateOnProps = (reduxState) => ({
    reduxState
  });
  
export default connect(putReduxStateOnProps)(MainList);
