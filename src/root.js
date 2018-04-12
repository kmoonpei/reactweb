import React, { Component } from 'react';
import { render } from 'react-dom';
import style from './root.css'
import st from './root.scss'
import TestComponent from './antd'

// const borad_items = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
const borad_items = [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
const Winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]]


class Square extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        }
    }
    onGoSteap(i, callback) {
        if (this.state.value || this.props.winner) return;
        this.setState({ value: this.props.theNext });
        callback(i);
    }
    render() {
        const { i, callback } = this.props;
        return (
            <button className={style.square} onClick={() => { this.onGoSteap(i, callback) }}>
                {this.state.value}
            </button>
        );
    }
}

export default class Game extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theNext: 'X',
            contents_x: [],
            contents_o: [],
            winner: '',
        }
    }
    doneOneStep(i) {
        if (this.state.theNext == 'X') {
            let arr = this.state.contents_x;
            arr.push(i);
            this.setState({ contents_x: arr });
        } else {
            let arr = this.state.contents_o;
            arr.push(i);
            this.setState({ contents_o: arr });
        }
        setTimeout(() => {
            const { contents_x, contents_o } = this.state
            console.log(contents_o,contents_x)
            if (contents_o.length >= 3) {
                Winners.forEach((item) => {
                    if (item.every((it) => { return contents_o.includes(it) })) {
                        this.setState({ winner: 'O' })
                    }
                })
            }
            if (contents_x.length >= 3) {
                Winners.forEach((item) => {
                    if (item.every((it) => { return contents_x.includes(it) })) {
                        this.setState({ winner: 'X' })
                    }
                })
            }

        }, 0)
        this.setState({clear:false,theNext: this.state.theNext == 'X' ? 'O' : 'X' });
    }
 
    render() {
        const { theNext, winner} = this.state
        return (
            <div className={style.game}>
                <div className={style.game_board}>
                <div className={st.status}>{winner ? winner + ' win!!' : 'the next is ' + theNext}</div>
                    {borad_items.map((item, i) => {
                        return (<div key={i} className={style.board_row}>
                            {item.map((itm, k) => {
                                return <Square key={k} i={itm} theNext={theNext} winner={winner} callback={this.doneOneStep.bind(this)} />
                            })}
                        </div>)
                    })}
                </div>
                <TestComponent />

            </div>
        );
    }
}

const styles = {
    game: {
  
    },
    game_board: {
        width: 90,
        height: 90,
    },
    agin: {
        
    },
    board_row: {
        flexDirection: 'row',
        display:'flex',

    },
    status: {

    },
    square: {
        flex: 1,
        height: 30,
        textAlign:'center',
        fontWeight: "700",
        fontSize:20,
        backgroundColor: '#eee',
        borderColor: '#aaa',
        borderWidth: 1,
        marginTop:-1,
        marginRight:-1,
    },
    
}


