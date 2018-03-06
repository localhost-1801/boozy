import React from 'react'
import { Grid, Image, Header } from 'semantic-ui-react'

//edit
const About = () => (
    <div>
        <div className="about">
        </div>
        <div>

            <Header as='h2' textAlign='center'>
                {' '}Meet the Boozy Wines Team
</Header>
        </div>
        <br />
        <Grid columns={4}>
            <Grid.Row>
                <Grid.Column>
                    <Image src='/img/team/charlie.png' size="medium" />
                    <div className="about-name">Charley Kirkpatrick </div>
                </Grid.Column>
                <Grid.Column>
                    <Image src='/img/team/nirali.png' size="medium" />
                    <div className="about-name">Nirali Shah</div>
                </Grid.Column>
                <Grid.Column>
                    <Image src='/img/team/thomas.png' size="medium" />
                    <div className="about-name">Thomas Lawless</div>
                </Grid.Column>
                <Grid.Column>
                    <Image src='/img/team/warren.png' size="medium" />
                    <div className="about-name">Warren Mui</div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)
export default About;


