import React from "react";
import { Col, Row } from 'reactstrap';
// import ItemList from './components/itemList/itemList';
// import CharDetails from './components/charDetails/charDetail';
import CharDetails,{Field} from '../charDetails/charDetail';
import ItemList from '../itemList/itemList';
import ErrorMessage from "../errorMessage/errorMessage";
import GotService from "../../service/gotService";
import RowBlock from "../RowBlock/RowBlock";
export default class CharacterPage extends React.Component {
    gotService = new GotService();
    state = {
        selectedChar: 130,
        checkError: false
    }
    onCharSelected = (id) => {
        this.setState({ selectedChar: id })
    }
    componentDidCatch() {
        this.setState({ checkError: true })
    }

    render() {
        if (this.state.checkError) {
            return <ErrorMessage />
        }

        const itemList = (
            <ItemList onCharSelected={this.onCharSelected} getData={this.gotService.getAllCharacters}
                renderItem={({ name, gender }) => `${name} (${gender})`} />
        );

        const charDetails = (
            <CharDetails charId={this.state.selectedChar}> 
                 <Field field="gender" label='Gender' />
                 <Field field="born" label='Born' />
                 <Field field="died" label='Died' />
                 <Field field="culture" label='Culture' />
            </CharDetails>
        );

        return (
            <RowBlock left={itemList} right={charDetails} />           
        )
    }
}