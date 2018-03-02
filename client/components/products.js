import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Card, Image, Icon, Button, Segment, Menu, Input } from 'semantic-ui-react'
import { fetchProducts } from '../store/products.js'
import { Link } from 'react-router-dom'



export class Products extends Component {
    constructor(props) {
        super(props)
        this.state = { activeItem: 'All' }
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    // componentDidMount() {
    //     this.props.fetchProducts();
    // }
    render() {
        console.log(this.props.products)
        const { activeItem } = this.state
        return (
            <div>
                <Menu attached='top' >
                    <Menu.Item name='All' active={activeItem === 'All'} onClick={this.handleItemClick} />
                    <Menu.Item name='Reds' active={activeItem === 'Reds'} onClick={this.handleItemClick} />
                    <Menu.Item name='Whites' active={activeItem === 'Whites'} onClick={this.handleItemClick} />
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input transparent icon={{ name: 'search', link: true }} placeholder='Search users...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
                <Card.Group>
                    {this.props.products.map(wine => {
                        return (
                            <Card
                                link
                                key={wine.id}
                                centered={true}
                            >
                                <Image src='img/red.jpg' />
                                <Card.Content>
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
                                        <Segment><Button as={Link} to={`/products/${wine.id}`} size={'small'}>VIEW</Button></Segment>
                                        <Segment><Button  >ADD</Button></Segment>
                                    </Segment.Group>
                                </Card.Content>
                            </Card>
                        )
                    })}
                </Card.Group>
            </div>
        )
    }
}

//map state and map dispatch to props


const mapState = ({ products }) => ({ products })
const mapDispatch = { fetchProducts }
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
