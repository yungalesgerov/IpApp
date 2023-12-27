import React from 'react';
import {Col, Row, Container} from 'reactstrap';
import RandomChar from './components/randomChar/randomChar';
import GotService from './service/gotService';
import Header from './components/header/header';
import CharacterPage from './components/characterPage/characterPage';
import ItemList from './components/itemList/itemList';
import CharDetails from './components/charDetails/charDetail';

class App extends React.Component{
    gotService = new GotService();
    state = {
        visible: true,
        selectedChar: 130,
        checkError: false
    }

    handleClick = () => {
       if(this.state.visible) {
        this.setState({visible: false})
       } else {
        this.setState({visible:true})
       }
    }
    
   

    render() {
        const {visible} = this.state;
        
        return (
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            { visible ? <RandomChar/> : null}
                        </Col>
                    </Row>
                    <Row style={{margin:20}} ><button onClick={this.handleClick} style={{width:200}} >btn toggle</button></Row>
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected={this.state.onCharSelected} getData={this.gotService.getAllBooks}
                            renderItem={(item)=>item.name} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList onCharSelected={this.state.onCharSelected} getData={this.gotService.getAllHouses}
                            renderItem={(item)=>`${item.name}`} />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>

                </Container>
                
            </>
        );
    }
    
}

export default App;