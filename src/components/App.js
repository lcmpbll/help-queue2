import React from "react";
import Header from "./Header";
import TicketControl from "./TicketControl";
import { withAuthenticator, Button, Heading, Image, View, Card } from '@aws-amplify/ui-react';

function App({signOut}){
  return ( 
    <View className='App'>
      <Card>
   
        <Heading level={1}>We now have Auth</Heading>
      </Card>
      <Button onClick={signOut}>Sign Out</Button>
    
    <React.Fragment>
      <Header />
      <TicketControl />
    </React.Fragment>
    </View>
  );
}

export default withAuthenticator(App);