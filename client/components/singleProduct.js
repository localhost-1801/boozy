// examples
const GridExampleColumnWidth = () => (
    <Grid centered>
      <Grid.Column width={4}>
        <Image src='http://www.pngpix.com/wp-content/uploads/2016/10/PNGPIX-COM-Wine-Bottle-PNG-Transparent-Image.png' />
      </Grid.Column>
      <Grid.Column width={9}>
        <Container textAlign={'right'}>
            <Divider horizontal >2014</Divider>
            <Divider horizontal><Header as='h2'>Header</Header></Divider>
  
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Container>
      </Grid.Column>
  
    </Grid>
  )