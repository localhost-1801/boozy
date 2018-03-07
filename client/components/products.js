import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Card, Grid, Image, Icon, Button, Label, Segment, Menu, Input } from 'semantic-ui-react'
import { fetchProducts } from '../store/products.js'
import { Link } from 'react-router-dom'
import { addProductToCart } from '../store/cart.js'



export class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'all',
            input: '',
            dry: false
        }
    }
    handleAdd = (id, price) => {
      console.log(price);
      if (document.cookie){
        //use thunk to make axios put request, {quantity: 5, productId: 2, token: lsafkl}
        this.props.addProductToCart({
          quantity: {
            value: 1,
            add: true
          },
          purchasePrice: price,
          //set to document.cookie
          token: document.cookie.slice(5) + '',
          productId: id
        })
      }
    }
    handleDryFilter = (e) => this.setState({ dry: !this.state.dry})
    
    handleItemClick = (e, { id }) => this.setState({ activeItem: id })
    handleInput = (e) => {
        console.log(e.target.value)
        this.setState({ input: e.target.value })
    }


    render() {
        const { activeItem, dry } = this.state
        const { isAdmin } = this.props.user
        const filteredProducts = this.props.products.filter(wine => {
            if (wine.title.toLowerCase().indexOf(this.state.input.toLowerCase()) > -1 && wine.availability === 'available'){
      
                    // if(wine.categories.find(category => {
                    //     if(category.name === this.state.activeItem) return true
                    // })) return true
                    return wine.categories.find(category => {
                        if (this.state.activeItem === 'all'){
                            return true;
                        }
                        return category.name === this.state.activeItem
                    }) && wine.categories.find(category => {
                        if ( this.state.dry){
                            return category.name === 'dry'
                        } else {
                            return true;
                        }
                    })
                
            } else {
                return false
            }
        })

        return (
            <div className="productsBackground">
                <Menu attached='top' >
                    <Menu.Item name='All' id='all' active={activeItem === 'all'} onClick={this.handleItemClick} />
                    <Menu.Item name='Reds' id='red' active={activeItem === 'red'} onClick={this.handleItemClick} />
                    <Menu.Item name='Whites' id='white' active={activeItem === 'white'} onClick={this.handleItemClick} />
                    <Menu.Item name='Dry' id='dry' active={dry} onClick={this.handleDryFilter} />

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input onChange={this.handleInput} transparent icon={{ name: 'search', link: true }} placeholder='Search our wines...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <div style={{ height: '15px' }} />
                <div style={{paddingLeft: '15rem', paddingRight:'15rem'}}>
                <Card.Group itemsPerRow={3}>
                    {/* {this.props.products.map(wine => { */}
                    {filteredProducts.map(wine => {

                        return (
                            <Card
                                link
                                key={wine.id}
                                centered={true}
                            >   
                                <Image size="tiny" centered as={Link} to={`/products/${wine.id}`}  src={wine.imageURL} />
                                <Card.Content as={Link} to={`/products/${wine.id}`}>
                                    <Card.Meta>
                                        <span className='date'>
                                            {wine.year}
                                        </span>
                                    </Card.Meta>

                                    <Card.Header>
                                        {wine.title}
                                    </Card.Header>

                                    <Card.Description>
                                        {wine.description}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Segment.Group horizontal>
                                        <Segment>${wine.price}</Segment>
                                        <Segment>
                                            <Label onClick={() => this.handleAdd(wine.id, wine.price)}>
                                                <Icon name="add to cart"/>
                                            </Label>
                                        </Segment>
                                    </Segment.Group>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
                {isAdmin && (
                <Grid centered columns={1}>
                <Grid.Row>
                <Button color="green" href="/new"><Icon name="add" />Add New Item</Button>
                </Grid.Row>
                </Grid>
            )}
                <br />
                </div>
            </div>
        )
    }
}

//map state and map dispatch to props


const mapState = ({ products, user }) => ({ products, user })
const mapDispatch = { fetchProducts, addProductToCart }
//const mapDispatch = {fetchStudents};

export default connect(mapState, mapDispatch)(Products);

const dummyData = [
    {
        wineName: 'Franzia Boxed Wine',
        imageURL: 'https://files.slack.com/files-tmb/T024FPYBQ-F9F0MRVNU-9cf43749e0/wine_1024.jpg',
        year: 2018,
        description: 'Loved by college students and trophy wives alike'
    },
    {
        wineName: 'Franzia Boxed Wine',
        imageURL: 'https://files.slack.com/files-tmb/T024FPYBQ-F9F0MRVNU-9cf43749e0/wine_1024.jpg',
        year: 2018,
        description: 'Loved by college students and trophy wives alike'
    },
    {
        wineName: 'Franzia Boxed Wine',
        imageURL: 'https://files.slack.com/files-tmb/T024FPYBQ-F9F0MRVNU-9cf43749e0/wine_1024.jpg',
        year: 2018,
        description: 'Loved by college students and trophy wives alike'
    },
    {
        wineName: 'Franzia Boxed Wine',
        imageURL: 'https://files.slack.com/files-tmb/T024FPYBQ-F9F0MRVNU-9cf43749e0/wine_1024.jpg',
        year: 2018,
        description: 'Loved by college students and trophy wives alike'
    },
    {
        wineName: 'Franzia Boxed Wine',
        imageURL: 'https://files.slack.com/files-tmb/T024FPYBQ-F9F0MRVNU-9cf43749e0/wine_1024.jpg',
        year: 2018,
        description: 'Loved by college students and trophy wives alike'
    },
    {
        wineName: 'Franzia Boxed Wine',
        imageURL: 'https://files.slack.com/files-tmb/T024FPYBQ-F9F0MRVNU-9cf43749e0/wine_1024.jpg',
        year: 2018,
        description: 'Loved by college students and trophy wives alike'
    },
]
