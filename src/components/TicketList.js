import React from 'react';
import Ticket from './Ticket';
import PropTypes from "prop-types";

function TicketList(props){
  return (
    <React.Fragment>
      <hr/>
      {props.ticketList?.map((ticket) =>
        <Ticket 
          whenTicketClicked = { props.onTicketSelection }
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          formattedWaitTime={ticket.formattedWaitTime}
          id={ticket.id}  
          image={ticket.image}
          key={ticket.id}/>
      )}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  mainTicketList: PropTypes.array,
  onTicketSelection: PropTypes.func
};

export default TicketList;