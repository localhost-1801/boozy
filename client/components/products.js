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
        }
    }
    handleAdd = (id) => {
      if (document.cookie){
        //use thunk to make axios put request, {quantity: 5, productId: 2, token: lsafkl}
        this.props.addProductToCart({
          quantity: {
            value: 1,
            add: true
          },
          //set to document.cookie
          token: document.cookie.slice(5) + '',
          productId: id
        })
      }
    }
    handleItemClick = (e, { id }) => this.setState({ activeItem: id })
    handleInput = (e) => {
        console.log(e.target.value)
        this.setState({ input: e.target.value })
    }


    render() {
        const { activeItem } = this.state
        const { isAdmin } = this.props.user
        const filteredProducts = this.props.products.filter(wine => {
            if (wine.title.toLowerCase().indexOf(this.state.input.toLowerCase()) > -1 && wine.availability === 'available'){
                if (this.state.activeItem === 'all') {
                    return true
                } else {
                    // if(wine.categories.find(category => {
                    //     if(category.name === this.state.activeItem) return true
                    // })) return true
                    return wine.categories.find(category => {
                        return category.name === this.state.activeItem
                    })
                }
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
                                <Image as={Link} to={`/products/${wine.id}`} src='img/red.jpg' />
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
                                            <Label onClick={() => this.handleAdd(wine.id)}>
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

export default connect(mapState, mapDispatch)(Products);
