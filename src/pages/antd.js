import React, { Compnent, Component } from 'react'
import { render } from 'react-dom'
import { Button } from 'antd'
import 'antd/dist/antd.css'
import style from'../assets/style/test.scss'
import Logo from '../assets/logo.svg'
import pic1 from '../assets/pic1.png'


export default class TestComponent extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div>
                <img src={pic1} className={style.pic1} alt="logo" />
                <Logo className={style.App_logo} title="react" alt="rr"/>
                <Button type="primary">hh</Button>
                
            </div>
        )
    }
}