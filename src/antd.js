import React, { Compnent, Component } from 'react'
import { render } from 'react-dom'
import { Button } from 'antd'

export default class TestComponent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <Button type="primary">hh</Button>
        )
    }
}