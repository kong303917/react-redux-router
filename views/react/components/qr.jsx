/**
 * Created by zjy on 16-2-19.
 */
import React from 'react'
import { Link } from 'react-router'
export default class Index extends React.Component {
    clickHandle(e) {
        e.preventDefault();
        const code = document.getElementById('qr-msg').value;
        this.props.qr(code);
    }

    render() {
        return (
            <div className="text-center">
                {
                    this.props.isLogin ?
                    <div>
                        <input id="qr-msg" name="qr-msg"/>
                        <input type="submit" onClick={e=>this.clickHandle(e)}/>
                        <br/>
                        {this.props.img && <img src={this.props.img}/> }
                    </div>
                        :
                        <div>
                            你未登录
                        </div>
                }
            </div>
        )
            ;
    }
}