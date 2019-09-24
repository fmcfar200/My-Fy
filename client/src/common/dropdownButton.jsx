import React, { Component } from "react";
import "../styles/dropdownButton.css";
import "../styles/filterTabs.css";

class DropdownButton extends Component {
  conatinerRef = React.createRef();
  state = {
    menuOpen: false
  };

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
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
    const { buttonClass, buttonLabel, bodyContent, dropdownClass } = this.props;
    var theDropdownClass = "Dropdown";
    if (dropdownClass !== undefined) {
      theDropdownClass = theDropdownClass + " " + dropdownClass;
      console.log(theDropdownClass);
    }
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
        {menuOpen && <div className={theDropdownClass}>{bodyContent}</div>}
      </div>
    );
  }
}

export default DropdownButton;
