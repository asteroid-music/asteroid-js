import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

class GetRequestButton extends React.Component<{onClick: () => void}> {
    render() {
        return (
            <button
                className="get-request-button"
                onClick={() => {this.props.onClick()}}
            >
            Click here for get request!
            </button>
        )
    }
}

class App extends React.Component<{},{gotText: string}> {
    constructor(props) {
        super(props);

        this.state = {
            gotText: "No text! Press button to get..."
        }
    }

    onClick() {
        axios.get("http://localhost:5000/").then(
            response => {
                this.setState({gotText:response.data.name});
            }
        ).catch(
            error => {
                let errorcode: string = "Error raised: code ";
                errorcode += error.response?.status.toString();
                this.setState({gotText:errorcode});
            }
        );
    }

    render() {
        return (
            <div>
                <GetRequestButton onClick={() => {this.onClick()}}/>
                {this.state.gotText}
            </div>
        );
    }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
