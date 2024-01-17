import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

import { useFetch } from "./useFetch";

// if (response.ok) {
// 	console.log("Usuario creado");
// } else {
// 	console.error("Error al crear el usuario", response.statusText);
// }

const Home = () => {
	const [task, setTask] = useState([]);
	const numTask = task.length;

	// CREAR USUARIO SI NO ESTA CREADO
	// useEffect(() => {
	// 	fetch("https://playground.4geeks.com/apis/fake/todos/user/raul3", {
	// 		method: "POST",
	// 		mode: "cors",
	// 		body: JSON.stringify([]),
	// 		headers: { "Content-Type": "application/json" },
	// 	})
	// 		.then((response) => response.json())
	// 		.catch((error) => console.error(error));
	// },[]);

	useEffect(() => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/raul3")
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then((data) => {
				console.log(data);
				setTask(data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	function sortByNewest() {
		let sortedItems = [...task].sort((a, b) => {
			if (a.label > b.label) return 1;
			return -1;
		});
		console.log(sortedItems);
		console.log(task);
		setTask(sortedItems);
	}

	function sortByOldest() {
		let sortedItems = [...task].sort((a, b) => {
			if (a.label > b.label) return -1;
			return 1;
		});
		console.log(sortedItems);
		setTask(sortedItems);
		console.log(task);
	}

	function handleAddItem(newTask) {
		console.log([...task, newTask]);
		fetch("https://playground.4geeks.com/apis/fake/todos/user/raul3", {
			method: "PUT",
			body: JSON.stringify([...task, newTask]),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(() => {
				setTask((prevTask) => [...prevTask, newTask]);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	function handleDeleteItem(label) {
		const newList = task.filter((e) => e.label !== label);

		fetch("https://playground.4geeks.com/apis/fake/todos/user/raul3", {
			method: "PUT",
			body: JSON.stringify(newList),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(() => {
				setTask(newList);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	return (
		<div>
			<Title />
			<Form handleAddItem={handleAddItem} />
			<div className="container">
				<PackList task={task} onDeleteItem={handleDeleteItem} />
			</div>
			<Stats
				sortByNewest={sortByNewest}
				sortByOldest={sortByOldest}
				numTask={numTask}
			/>
		</div>
	);
};

export default Home;

function Title() {
	return (
		<h1 className="title">
			<FontAwesomeIcon icon={faCheckDouble} />
			Todo List
		</h1>
	);
}

function Form({ handleAddItem }) {
	const [label, setLabel] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (!label) return;

		const newTask = {
			label,
			done: false,
		};

		console.log(newTask);
		handleAddItem(newTask);
		setLabel("");
	}

	return (
		<div className="form__container">
			<form className="form__form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Your task"
					value={label}
					onChange={(e) => setLabel(e.target.value)}></input>

				{console.log(label)}
			</form>
		</div>
	);
}

function PackList({ task, onDeleteItem }) {
	return (
		<ul className="packlist-container">
			{task.map((e) => (
				<Item
					taskIndividual={e}
					key={e.label}
					onDeleteItem={onDeleteItem}
				/>
			))}
		</ul>
	);
}

function Item({ taskIndividual, onDeleteItem }) {
	return (
		<li className="task__container">
			<div>
				<p className="task__label">{taskIndividual.label}</p>
			</div>

			<div>
				<button
					className="task__button"
					onClick={() => onDeleteItem(taskIndividual.label)}>
					<i className="icon fa-solid fa-xmark"></i>
				</button>
			</div>
		</li>
	);
}

function Stats({ numTask, sortByNewest, sortByOldest }) {
	return (
		<div className="stats__container">
			<p>
				{numTask !== 0
					? `${numTask} ${numTask > 1 ? "tasks left" : "task left"}`
					: "No task to do"}
			</p>
			{numTask !== 0 ? (
				<div className="task__sort">
					<button onClick={sortByNewest}>
						<i className="fa-solid fa-arrow-up"></i>
					</button>
					<button onClick={sortByOldest}>
						<i className="fa-solid fa-arrow-down"></i>
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}
