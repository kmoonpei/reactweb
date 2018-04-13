import React, { Component } from 'react'
import { render } from 'react-dom'
import Game from './src/pages/root'

const randomColor = () => '#' + Math.random().toString(16).substr(-6)
const styles = {
    title: {
        fontSize: 18,
        lineHeight: '24px',
    },
    subtitle: {
        fontSize: 14,
        lineHeight: '18px',
    },
    card: {
        padding: 20,
        textAlign: 'center',
        width: 200,
        height: 100,
        color: 'white',
    },
}

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
        }
    }
    saveRef(ref) { this.containerNode = ref }
    measure() {
        const { clientWidth, clientHeight } = this.containerNode
        this.setState({
            width: clientWidth,
            height: clientHeight,
        })
    }

    componentDidMount() {
        this.measure()
    }

    render() {
        const { width, height } = this.state
        const style = {
            padding: 20,
            textAlign: 'center',
            width: 200,
            height: 100,
            color: 'white',
            backgroundColor: this.props.color,
        }
        return (
            <div style={style} ref={this.saveRef.bind(this)}>
                {this.props.children}
                <h2 style={styles.subtitle}>My dimensions are:</h2>
                {width && height && (
                    <h1 style={styles.title}>{width}x{height}</h1>
                )}
            </div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: '#ea0'
        }
    }

    randomizeColor() { this.setState({ color: randomColor() }) }
    render() {

        return (
            <div style={{ padding: 20, }}>
                <Card color={this.state.color}>
                    <button onClick={() => { this.randomizeColor() }} >
                        Randomize Color
                        </button>
                </Card>
                <Game />
            </div>
        )
    }
}

const root = document.querySelector('#app')
render(<App />, root)