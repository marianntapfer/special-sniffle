import React from "react";
import "./PersonsCard.css"

const PersonsAddForm = ({close, savePerson, placeholder}) => {

	return(
		<div className="infoCardWrapper">
			<div className="infoContent">
				<div className="cardTitle">
					<p>Persons Information</p>
					<span onClick={close}> &#x2715; </span>
				</div>
				<div className="imagebox">
					<div>
						<img src={placeholder} alt="placeholder image" />
					</div>
					<div className="name">insert info to add person</div>
				</div>
				<table className="databox">
					<tbody>
						<tr className="phone">
							<td className="label">phone</td>
							<td className="value"><input type="text"/></td>
						</tr>
						<tr className="email">
							<td className="label">Email</td>
							<td className="value"><input type="text"/></td>
						</tr>
						<tr className="organization">
							<td className="label">Organization</td>
							<td className="value"><input type="text"/></td>
						</tr>
						<tr className="assistant">
							<td className="label">Assistant</td>
							<td className="value"><input type="text"/></td>
						</tr>
						<tr className="groups">
							<td className="label">Groups</td>
							<td className="value"><input type="text"/></td>
						</tr>
						<tr className="location">
							<td className="label">Location</td>
							<td className="value"><input type="text"/></td>
						</tr>
					</tbody>
				</table>
				<div className="footer">
					<button onClick={close}>Back</button>
					<button onClick={savePerson}>Salvesta</button>
				</div>
			</div>
		</div>
	)
}

export default PersonsAddForm;