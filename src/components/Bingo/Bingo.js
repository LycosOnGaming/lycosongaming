import React, { Component } from 'react';
import ReactDOM from "react-dom";
import shuffle from 'shuffle-array';
import data from './bingo.json';
import LycosHead from '../../assets/images/lycosHead.png';
import './Bingo.scss';

class Bingo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false
        };
        
        this.handleToggleState = this.handleToggleState.bind(this);
        this.handleWinAnimation = this.handleWinAnimation.bind(this);
        this.checkToWin = this.checkToWin.bind(this);
    }

    handleToggleState(data) {
        if (!data.currentTarget.classList.contains('disabled')) {
            data.currentTarget.classList.add('disabled');
            data.currentTarget.onclick = null;
    
            this.checkToWin(data.currentTarget);
        }
    };

    checkToWin(target) {
        console.log(target.dataset.panel);
        const range = [0, 1, 2, 3, 4];
        console.log(
            undefined !==
            range.find(target => range.every(column => target.dataset.panel * 5 + column)) ||
            undefined !==
            range.find(column => range.every(target => target.dataset.panel * 5 + column)) ||
            range.every(index => target.dataset.panel * 5 + index) ||
            range.every(index =>target.dataset.panel * 5 + 4 - index)
        );
    }

    handleWinAnimation() {
        ReactDOM.findDOMNode(this).classList.add('win-animation');
    }
   
    render() {
        const bingoArray = data.bingo;
        let counter = 0.5;

        shuffle(bingoArray);

        return (
            <div className="Bingo">
                <h1>Bingo</h1>
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12 bingoText-item">
                    {bingoArray.map((bingoText, index) => {
                        if (counter === (bingoArray.length / 2))
                        {
                            counter++;
                            return (
                                <button
                                key={index}
                                data-panel={index}
                                className="items disabled"
                                >
                                    BINGO
                                </button>
                            );
                        } else {
                            counter++;
                            return (
                                <button
                                key={index}
                                data-panel={index}
                                className="items"
                                onClick={this.handleToggleState}
                                >
                                    {bingoText.text}
                                </button>
                            );
                        }
                    })}
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-12 col-lg-12 bingoText-item animation-button">
                        <button className="items" onClick={this.handleWinAnimation}>Gewonnen Animation</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 bingo-image">
                        <img src={LycosHead} alt="Lycos Head"/>
                    </div>
                </div>
                <div className="row">
                    <div className="win-animation-text">
                        <h2>Bingo gewonnen</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default Bingo;
