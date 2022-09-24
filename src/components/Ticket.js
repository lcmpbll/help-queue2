import React from "react";
import PropTypes from "prop-types";
import { Image } from '@aws-amplify/ui-react';

function Ticket(props){
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTicketClicked(props.id)}>
        <h3>{props.location} - {props.names}</h3>
        <p><em>{props.issue}</em></p>
        <p><em>{props.formattedWaitTime}</em></p>
        <Image
          src={props.image}
          alt={`visual aid for ${props.issue}`}
          style={{ maxWidth: 400 }}
          />
        <hr/>
      </div>
    </React.Fragment>
  );
}

Ticket.propTypes = {
  names: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  issue: PropTypes.string,
  formattedWaitTime: PropTypes.string,
  image: PropTypes.string,
  id: PropTypes.string, 
  whenTicketClicked: PropTypes.func
};

export default Ticket;