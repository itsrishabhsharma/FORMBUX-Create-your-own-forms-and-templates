import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class PrimaryButton extends Component {
  static propTypes = {

  }

  render() {
      let bg=this.props.bg?this.props.bg:"indigo";
      let size=this.props.size?this.props.size:"xs";
    return (
        <button
        onClick={()=>this.props.onClick?this.props.onClick():()=>{}}
        className={"bg-"+bg+"-500 text-white active:bg-"+bg+"-600 text-"+size+" font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1"}
        type="button"
        style={Object.assign({},{ transition: "all .15s ease"},this.props.style)}
      >
       {this.props.children}
      </button>
    )
  }
}

// export default c;
