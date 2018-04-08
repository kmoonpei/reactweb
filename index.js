import React, { Component } from 'react'
import { render } from 'react-dom'

const rendomColor = () => '#' + Math.random().toString(16).substr(-6)
const styles = {

    app: {
        paddingTop: 40,
        textAlign: 'center',
    },

}

class Card extends Component {
    render() {
        const style = {
            padding: 20,
            textAlign: 'center',
            color: 'white',
            backgroundColor: this.props.color,
        }
        return (
            <div style={style}>{this.props.children}</div>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props),
            this.state = {
                color: '#ea0'
            }
    }
    // state = { color: '#ea0' }

    randomizeColor = () => { this.setState({ color: rendomColor() }) }
    render() {
        const style = {
            padding: 20,
        }
        return (
            <div style={style}>
                <Card color={this.state.color}>
                    <button
                        title='Randomize Color'
                        onClick={this.randomizeColor} />
                </Card>
            </div>
        )
    }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)