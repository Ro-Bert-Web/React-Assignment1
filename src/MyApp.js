import React, {useState, useEffect} from "react";
import Form from "./Form";
import Table from "./Table";
import axios from "axios";

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

	async function fetchAll() {
		try {
			const response = await axios.get("http://localhost:5000/users");
			return response.data.users_list;
		}
		catch (error) {
			console.log("error");
			return false;
		}
	}

	useEffect(() => {
		fetchAll().then(result => {
			if (result) {
				setCharacters(result);
			}
		});
	}, []);

	async function makePostCall(person) {
		try {
			const response = await axios.post("http://localhost:5000/users", person);
			return response;
		}
		catch (error) {
			console.log(error);
			return false;
		}
	}

	async function makeDelCall(id) {
		try {
			const response = await axios.delete("http://localhost:5000/users/".concat(id));
			return response;
		}
		catch(error) {
			console.log(error);
			return false;
		}
	}

	function removeOneCharacter (index, id) {
		console.log(index, id);
		makeDelCall(id).then(result => {
			if (result) {
				const update = characters.filter((character, i) => {
					return i !== index;
				});
			setCharacters(update);
			}
		});
	}

	function updateList(person) {
		makePostCall(person).then(result => {
			if (result)
				setCharacters([...characters, result.data]);
		});
	}

	return (
		<div className = "container">
			<Table characterData = {characters} removeCharacter = {removeOneCharacter} />
			<Form handleSubmit = {updateList} />
		</div>
	);
}

export default MyApp;