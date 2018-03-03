import React from 'react'
import { Grid, Image, Item } from 'semantic-ui-react'

//edit
const About = () => (
    <div>
        <div className="about">
        </div>
        <br />
        <br />
        <Grid>
            <Grid.Row columns={6}>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column>
                    <Image src='/img/team/charlie.png' />
                    <div className="about-name">Charley Kirkpatrick </div>
                    <br />
                    <p className="title">Chief Llama Officer (CLO)</p>
                </Grid.Column>
                <Grid.Column>
                    <Image src='/img/team/nirali.png' />
                    <div className="about-name">Nirali Shah</div>
                    <br />
                    <p className="title">Chief Aesthetics Officer (CAO)</p>
                </Grid.Column>
                <Grid.Column>
                    <Image src='/img/team/thomas.png' />
                    <div className="about-name">Thomas Lawless</div>
                    <br />
                    <p className="title">Chief Something (CS)</p>
                </Grid.Column>
                <Grid.Column>
                    <Image src='/img/team/warren.png' />
                    <div className="about-name">Warren Mui</div>
                    <br />
                    <p className="title">Cheif Something (CS)</p>
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </div>
)
export default About;
