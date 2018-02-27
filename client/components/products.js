import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'
import { Card, Image, Icon } from 'semantic-ui-react'
import { fetchProducts} from '../store/products.js'


export class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    // componentDidMount() {
    //     this.props.fetchProducts();
    // }
    render() {
        console.log(this.props.products)
        return (
            <Card.Group>
                {this.props.products.map(wine => {
                    return (
                        <Card 
                        key = {wine.id}
                        centered = { true }
                        >
                        <Image src={wine.imageURL} />
                        <Card.Content>
                            <Card.Meta>
                                <span className='date'>
                                    {wine.year}
                                </span>
                            </Card.Meta>
                            <Card.Header>
                                {wine.wineName}
                            </Card.Header>
                            <Card.Description>
                                {wine.description}
                            </Card.Description>
                            </Card.Content>
                        <Card.Content extra>
                            <a>
                                <Icon name='dollar' />
                                {wine.price}
                            </a>
                        </Card.Content>
                    </Card>
                    )
                })}
            </Card.Group>
        )
    }
}

//map state and map dispatch to props


const mapState = ({ products }) => ({ products })
const mapDispatch = {fetchProducts}
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
