import React from 'react'
import './index.scss'
import { Button, Modal } from 'antd';

class ModalUtil extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible || false,
      title: this.props.title || '标题区域',
    }
  }
  handleOk(){
    this.setState({
      visible: false,
    })
  }
  handleCancel(){
    this.setState({
      visible: false,
    })
  }
  render(){
    return (
      <div className="modal-util">
        <Button type="primary" onClick={(e)=>this.showModal(e)}>Open</Button>
        <Modal
          title={this.state.title}
          visible={this.state.visible}
          onOk={(e)=>this.handleOk(e)}
          onCancel={(e)=>this.handleCancel(e)}
        >
          {this.props.children}
        </Modal>
      </div>
    )
  }
}

export default ModalUtil;
