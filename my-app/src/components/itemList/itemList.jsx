import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spiner';
export default class ItemList extends Component {
    state = {
        charList: null
    }
    componentDidMount() {

        const {getData} = this.props;


        // this.gotService.getAllCharacters()
        getData()
            .then(itemList=>this.setState({itemList}))
    }
    renderItems(arr) {
        return arr.map((item)=>{
            const {id} = item;
            const label = this.props.renderItem(item);
            return (
                <li key={id} className="list-group-item" onClick={()=>this.props.onCharSelected(41+id)}>
                    {label}
                </li>
            )
        })
    }
    render() {
        const {itemList} = this.state;
        if(!itemList) {
            return <Spinner />
        }
        const items = this.renderItems(itemList);
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}