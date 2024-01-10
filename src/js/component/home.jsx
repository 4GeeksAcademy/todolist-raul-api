import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { sort } from "fontawesome";

const Home = () => {
	const [task, setTask] = useState([]);
	const numTask = task.length;

	function sortByNewest() {
		let sortedItems = task.slice().sort((a, b) => b.id - a.id);
		console.log(sortedItems);
		setTask(sortedItems);
	}
	function sortByOldest() {
		let sortedItems = task.slice().sort((a, b) => a.id - b.id);
		console.log(sortedItems);
		setTask(sortedItems);
	}

	function handleAddItem(task) {
		setTask((prevTask) => [...prevTask, task]);
	}

	function handleDeleteItem(id) {
		console.log(id);
		const newList = task.filter((e) => e.id !== id);
		setTask(newList);
	}

	return (
		<div>
			<Title />
			<Form handleAddItem={handleAddItem} />
			<div className="container">
				{console.log(task)}
				{console.log(task.description)}
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
	const [description, setDescription] = useState("");

	function handleSubmit(e) {
		e.preventDefault();
		if (!description) return;

		const newTask = {
			description,
			id: Date.now(),
		};

		console.log(newTask);
		handleAddItem(newTask);
		setDescription("");
	}

	return (
		<div className="form__container">
			<form className="form__form" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Your task"
					value={description}
					onChange={(e) => setDescription(e.target.value)}></input>

				{console.log(description)}
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
					key={e.id}
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
				<p className="task__description">
					{taskIndividual.description}
				</p>
			</div>

			<div>
				<button
					className="task__button"
					onClick={() => onDeleteItem(taskIndividual.id)}>
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
						<i class="fa-solid fa-arrow-up"></i>
					</button>
					<button onClick={sortByOldest}>
						<i class="fa-solid fa-arrow-down"></i>
					</button>
				</div>
			) : (
				""
			)}
		</div>
	);
}
