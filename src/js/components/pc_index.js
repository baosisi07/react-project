import React, { Component } from 'react';
import PCHeader from "./pc_header";
import PCFooter from "./pc_footer";
import PCContainer from "./pc_contentainer";
class PCIndex extends Component {
    render() {
        return (
            <div>
            	<PCHeader></PCHeader>
				<PCContainer></PCContainer>
            	<PCFooter></PCFooter>
            </div>
        );
    }
}
export default PCIndex;