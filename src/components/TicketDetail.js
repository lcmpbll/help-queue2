import React from "react";
import PropTypes from "prop-types";
import {Image} from '@aws-amplify/ui-react';

function TicketDetail(props){
  const { ticket, onClickingDelete } = props;
  //some sort of statement that hides if there is no image??
  //perhaps a sort of stock image?
  return (
    <React.Fragment>
      <h1>TicketDetail</h1>
      <h3>{ticket.location} - {ticket.names}</h3>
      <p><em>{ticket.issue}</em></p>
      <Image
        src={ticket.image}
        style={{ maxWidth: 400 }}
        />
        <br/>
      <button onClick={ props.onClickingEdit }>Update Ticket</button>
      <button onClick={()=> onClickingDelete(ticket) }>Close Ticket</button>
      <hr/>
    </React.Fragment>
  );
}

TicketDetail.propTypes = {
  ticket: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default TicketDetail;