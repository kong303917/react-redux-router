/**
 * Created by zjy on 16-2-19.
 */
import React from 'react'
import { Link } from 'react-router'
export default class Footer extends React.Component {
    handleClick(e) {
        this.props.clickIndex('index')
    }
    render() {
        return (
            <div className="text-center">
                <p>
                    <Link to="/"  onClick={(e)=> this.handleClick(e)} >首页</Link>
                    <Link to="/about">关于</Link>
                </p>
                <p>版权所有 &copy; 2016 zjy</p>
            </div>
        );
    }
}