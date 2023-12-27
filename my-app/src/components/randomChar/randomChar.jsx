import React from "react";
import './randomChar.css';
import GotService from "../../service/gotService";
import Spinner from "../spinner/spiner";
import ErrorMessage from "../errorMessage/errorMessage";
export default class RandomChar extends React.Component {
    // constructor() {
    //     super()
    //     this.updateChar()
    // }
    gotService = new GotService();
    state = {
       char: {},
       loading: true,
       error : false
    }

    componentDidMount() {
        this.updateChar();
        this.timerId = setInterval(this.updateChar,3000);

    }
    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    
    onError = (err) => {
        this.setState({error:true,
        loading:false})
    }
    
    onCharLoader = (char) => {
        
        this.setState({char, loading:false})

    }

    updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotService.getCharacter(id)
            .then(this.onCharLoader)
            .catch(this.onError);
    }
    
    render() {
        const { char, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, gender, born, died, culture } = char;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born ? born : 'no data('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died ? died : 'no data('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture ? culture : 'no data('}</span>
                </li>
            </ul>
        </>
    )
}