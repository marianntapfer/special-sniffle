import React from "react";
import "./PersonsCard.css"

const PersonsCard = ({picture, name, phone, email, organization, assistant, groups, location}) => {
	let formatedPhone = phone.replace("(", "+").replace(")", "").replace("-", " ")

	return(
		<div className="infoCardBack">
			<div className="infoCard">
				<div className="cardTitle">
					<p>Persons Information</p>
				</div>
				<div className="imagebox">
					<div>
						<img src={picture} alt={name} />
					</div>
					<div className="name">{name}</div>
					<div className="phone">{formatedPhone}</div>
				</div>
				<table className="infobox">
					<tbody>
						<tr className="email">
							<td className="label">Email</td>
							<td className="value">{email}</td>
						</tr>
						<tr className="organization">
							<td className="label">Organization</td>
							<td className="value">{organization}</td>
						</tr>
						<tr className="assistant">
							<td className="label">Assistant</td>
							<td className="value">{assistant}</td>
						</tr>
						<tr className="groups">
							<td className="label">Groups</td>
							<td className="value">{groups}</td>
						</tr>
						<tr className="location">
							<td className="label">Location</td>
							<td className="value">{location}</td>
						</tr>
					</tbody>
				</table>
				<div className="footer">
					<button>Back</button>
				</div>
			</div>
		</div>
	)
}

export default PersonsCard;