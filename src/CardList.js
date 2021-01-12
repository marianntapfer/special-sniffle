import React, { useState, useEffect } from 'react';
import placeholder from './profilepic.png'
import { data } from "./data.json";
import PersonsCard from './PersonsCard';
import "./App.css";
import ReactDOM from 'react-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const API_TOKEN= ""
// const DataFromApi = false
const DataFromApi = true

const groups = '014ce6f24fd2bf978b81503a74699095ab5ddf1c'
const assistant = '3d7fea2b018a23d5f846ba77b088b0b1936c7681'
const order = '087a4f4645d3851a1808b15f1cba6555b87d392c'


const chooseImg = (person) => {
	let picture = placeholder
	if(person.picture_id) picture = person.picture_id.pictures[128]
	return (<img src={picture} alt={person.name} />)
}


const CardList = ({show, close, open}) => {

	const [people, setPeople] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	useEffect ( () => {
		getPeople();
	}, []);

	const getPeople = async () => {
		if(DataFromApi){
			const response = await fetch(`https://bestcompany.pipedrive.com/api/v1/persons?api_token=${API_TOKEN}`)
			const ApiData = await response.json();
			console.log(ApiData)
			setPeople(ApiData.data)

		}else{
			console.log("getting local data")
			setPeople(data)
		}
	}


	const sortAbcString = (key) => {
		const sortedPeople = [...people].sort( function (a, b) {
			const valueA = a[key].toUpperCase();
			const valueB = b[key].toUpperCase();
			if (valueA < valueB) {
				return -1;
			}
			if (valueA > valueB) {
				return 1;
			}

			return 0;
		})
		setPeople(sortedPeople)
	}

	const openInfoCard = (person) => {

	let picture = placeholder
	if(person.picture_id) picture = person.picture_id.pictures[128]

		const modal = (<PersonsCard
		            		picture={picture}
		            		name={person.name}
		            		phone={person.phone[0].value}
		            		email={person.email[0].value}
		            		organization={person.org_name}
		            		assistant={person[assistant]}
		            		groups={person[groups]}
		            		location={person.org_id.address}
		            		close={close}
	            		/>)
		ReactDOM.render(modal, document.getElementById("InfoCard"))
		open();

	}
	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		const items = Array.from(people);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		items.map((obj, index) => {
			return obj.order=index
		})
		setPeople(items)
		for(const i of items){
			console.log("id:"+i.id, "order:"+i.order, i.name)
		}
		console.log(items)
		console.log(people)
	}

	return(
		<div className="listContainer">
			<button className="sortBtn" onClick={() => sortAbcString('first_name')}>sort by firstname</button>
			<button className="sortBtn" onClick={() => sortAbcString('last_name')}>sort by lastname</button>
			<button className="sortBtn" onClick={() => sortAbcString('org_name')}>sort by organization</button>
			<input type="text" placeholder="Search" onChange={(event) => setSearchTerm(event.target.value)}/>
			<DragDropContext onDragEnd= {handleOnDragEnd}>
				<Droppable droppableId="name">
					{(provided) => (
						<ul {...provided.droppableProps} ref={provided.innerRef}>
							{people.filter((val)=>{
								if (searchTerm === ""){
									return val
								}else if (val.name.toLowerCase().includes(searchTerm.toLowerCase()) || val.org_name.toLowerCase().includes(searchTerm.toLowerCase())){
									return val
								}
							}).map((person, index) => (

								<Draggable key={person.id} draggableId={person.name} index={index}>
									{(provided) => (
										<li className="personTab"  onClick={()=>openInfoCard(person)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
											<div className="info">
												<div className="name">{person.name}</div>
												<div className="organization">
													<svg className="orgLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
														<path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path>
													</svg>
													<div className="orgName">{person.org_name}</div>
												</div>
											</div>
											<div className="profilePic">
												{chooseImg(person)}
											</div>
										</li>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</ul>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
}

export default CardList