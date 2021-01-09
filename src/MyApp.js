import React, {useState} from "react";
import Form from "./Form";
import Table from "./Table";

function MyApp() {
	const [characters, setCharacters] = useState([  
		{
			name: "Charlie",
			job: "Janitor",
		},
		{
			name: "Mac",
			job: "Bouncer",
		},
		{
			name: "Dee",
			job: "Aspring actress",
		},
		{
			name: "Dennis",
			job: "Bartender",
		},
	]);

	function removeOneCharacter (index) {
		const update = characters.filter((character, i) => {
			return i !== index;
		});
		setCharacters(update);
	}

	function updateList(person) {
		setCharacters([...characters, person]);
	}

	return (
		<div className = "container">
			<Table characterData = {characters} removeCharacter = {removeOneCharacter} />
			<Form handleSubmit = {updateList} />
		</div>
	);
}

export default MyApp;