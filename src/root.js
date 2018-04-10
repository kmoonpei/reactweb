import React, { Component } from 'react';
import { render } from 'react-dom';
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
            <button style={styles.square} onClick={() => { this.onGoSteap(i, callback) }}>
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
            <div style={styles.game}>
                <div style={styles.game_board}>
                    <div style={styles.status}>{winner ? winner + ' win!!' : 'the next is ' + theNext}</div>
                    {borad_items.map((item, i) => {
                        return (<div key={i} style={styles.board_row}>
                            {item.map((itm, k) => {
                                return <Square key={k} i={itm} theNext={theNext} winner={winner} callback={this.doneOneStep.bind(this)} />
                            })}
                        </div>)
                    })}
                </div>
            </div>
        );
    }
}

const styles = {
    game: {
        width: 400,
        height: 300,
        flexDirection: 'row',
        alignItems: 'center',
        juatifyContent: 'center',
    },
    game_board: {
        flex: 3 / 4,
    },
    agin: {
        flex: 1 / 4,
        height: 20,
    },
    board_row: {
        flexDirection: 'row',

    },
    status: {

    },
    square: {
        flex: .3,
        width: 40,
        height: 30,
        fontWeight: "500",
        backgroundColor: '#eee',
        display: 'inline-block',
        borderColor: '#aaa',
        borderWidth: 1,
        marginTop:-1,
        marginRight:-1,
    },
    
}


