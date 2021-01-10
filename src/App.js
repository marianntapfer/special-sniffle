import React from "react";
import { data } from "./data.json";
import CardList from './CardList';
import PersonsCard from './PersonsCard';
import placeholder from './profilepic.png';


const App = () => {
    let firstPerson = data[8]
    return (
        <div className="app">
        	<PersonsCard
        		picture={placeholder}
        		name={firstPerson.name}
        		phone={firstPerson.phone[0].value}
        		email={firstPerson.email[0].value}
        		organization={firstPerson.org_name}
        		assistant={firstPerson['3d7fea2b018a23d5f846ba77b088b0b1936c7681']}
        		groups={firstPerson['014ce6f24fd2bf978b81503a74699095ab5ddf1c']}
        		location={firstPerson.org_id.address}
        	/>
            <h1 className="mainTitle">People's List</h1>
            <CardList />
        </div>
    );

}
export default App;