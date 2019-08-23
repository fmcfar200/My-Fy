import React, { Component } from "react";
import "../styles/dropdownButton.css";

class DropdownButton extends Component {
  conatinerRef = React.createRef();
  state = {
    menuOpen: false
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);

    console.log(this.props);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClick = () => {
    this.setState(state => {
      return {
        menuOpen: !state.menuOpen
      };
    });
  };

  handleClickOutside = event => {
    if (
      this.conatinerRef.current &&
      !this.conatinerRef.current.contains(event.target)
    ) {
      this.setState({
        menuOpen: false
      });
    }
  };

  render() {
    const { menuOpen } = this.state;
    const { buttonClass, buttonLabel, listItems } = this.props;

    return (
      <div className="Dropdown-Container" ref={this.conatinerRef}>
        <button
          className={buttonClass}
          onClick={() => {
            this.handleClick();
          }}
        >
          {buttonLabel}
        </button>
        {menuOpen && (
          <div className="Dropdown">
            <ul>{listItems}</ul>
          </div>
        )}
      </div>
    );
  }
}

export default DropdownButton;