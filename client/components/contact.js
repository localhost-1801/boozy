import React from 'react'
import {Segment, Container, Icon} from 'semantic-ui-react'

//edit
const Contact = () => (
    <div className="indexBackground">
        <div style={{margin: 'auto'}} className='contactUs'>
        {/* <div  dangerouslySetInnerHTML={ {__html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d153401.0153922199!2d73.3748474520457!3d-53.0762337592925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xb301524b88922bfd%3A0x261ddac2e5b3767e!2sHeard+Island+and+McDonald+Islands!5e0!3m2!1sen!2sus!4v1520220127721" width="400" height="300" frameborder="0" style="border:0" allowfullscreen></iframe>'} }/> */}
        <Segment textAlign='center'>
        <p><Icon name='marker' />Our location: <a href='https://goo.gl/maps/54EcTg3xoJr'>-53.081285, 73.504151</a></p> 
        <p><Icon name='mail' />Email our support team: <a href='https://youtu.be/dQw4w9WgXcQ'>do.it@you.wont</a></p>
        <p>Follow us on</p>
        <Icon name='facebook f' /><Icon name='github' /><Icon name='twitter' /><Icon name='pinterest square' /><Icon name='rebel' /><Icon name='twitch' /><Icon name='linkedin' /><Icon name='youtube play' /><Icon name='flickr' /><Icon name='instagram' /><Icon name='reddit' /><Icon name='edge' /><Icon name='deviantart' /><Icon name='steam square' />

        </Segment>
        </div>
    </div>
)
export default Contact;



// <h1 className='headerStyle'>Contact Us</h1>
// <p className= 'contactAboutText'>
//     Cras sollicitudin congue turpis a rhoncus. Duis metus arcu,
//     maximus et sollicitudin eu, congue eget leo. Ut dignissim lacus
//     sed elit efficitur, in porttitor est accumsan. Praesent eget sem
//     vitae lectus lacinia tristique. Quisque id ex id ligula lobortis
//     efficitur. Ut gravida enim in dictum finibus. Vestibulum tincidunt
//     dolor ut ipsum hendrerit, vitae pulvinar dui dictum. Curabitur
//     condimentum volutpat ligula, sed gravida ligula. Cras feugiat orci
//     nec nunc dapibus, non ornare ante accumsan. Pellentesque accumsan
//     luctus odio nec sodales. Pellentesque at laoreet ante, id volutpat
//     enim. Integer a mollis justo, vel efficitur mauris. Donec consequat
//     diam in nibh tincidunt pretium.
// </p>