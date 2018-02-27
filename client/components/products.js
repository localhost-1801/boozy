import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

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

const CardExampleCard = () => (
  <Card>
    <Image src='/assets/images/avatar/large/matthew.png' />
    <Card.Content>
      <Card.Header>
        Matthew
      </Card.Header>
      <Card.Meta>
        <span className='date'>
          Joined in 2015
        </span>
      </Card.Meta>
      <Card.Description>
        Matthew is a musician living in Nashville.
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        22 Friends
      </a>
    </Card.Content>
  </Card>
)

export default CardExampleCard
