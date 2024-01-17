import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";

import { useFetch } from "./useFetch";

const Home = () => {
	useEffect(() => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/raul", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
		}).then((response) => {
			console.log(response);
		});
	});

	const createUser = async () => {
		fetch("https://playground.4geeks.com/apis/fake/todos/user/raul", {
			method: "POST",
			mode: "cors",
			redirect: "follow",
			body: JSON.stringify({}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((response) => {
				console.log("New user added" + response);
			})
			.catch((error) => console.error(error));
	};

	createUser();

	// fetch("https://playground.4geeks.com/apis/fake/todos/user/raul")
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			throw Error(response.statusText);
	// 		}
	// 		return response.json();
	// 	})
	// 	.then((responseAsJson) => {
	// 		console.log(responseAsJson);
	// 	})
	// 	.catch((error) => {
	// 		console.log("Looks like an error ", error);
	// 	});

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
			{/* EXAMPLE API DATA PARA USER */}
			<ul>
				{/* {data?.map((user) => (
					<li key={user.id}>{user}</li>
				))} */}
			</ul>
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



import React, { useEffect, useState } from "react";


// Create your first component
const Home = () => {
	const [inputValue, setInputValue] = useState("");
	const [todos, setTodos] = useState([]);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.key === "Enter") {
			
			let body= todos.concat([{"label": inputValue, "done": false}])
			
			fetch('https://playground.4geeks.com/apis/fake/todos/user/alexfazakas', {
		  method: "PUT",
		  body : JSON.stringify(body),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => {
			if (!resp.ok) throw Error(`La response no es ok`)
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			setTodos(body);
			setInputValue("");
		})
		.catch(error => {
			//manejo de errores
			alert(`Ha habido un error, intentalo mas tarde`)
			console.log(error);
		});
		}
	};

	const handleDelete = (index) => {
		const updatedTodos = todos.filter((_, i) => i !== index);
		

		
			
			fetch('https://playground.4geeks.com/apis/fake/todos/user/alexfazakas', {
		  method: "PUT",
		  body : JSON.stringify(updatedTodos),
		  headers: {
			"Content-Type": "application/json"
		  }
		})
		.then(resp => {
			if (!resp.ok) throw Error(`La response no es ok`)
			return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
		})
		.then(data => {
			setTodos(updatedTodos);
			
		})
		.catch(error => {
			//manejo de errores
			alert(`Ha habido un error, intentalo mas tarde`)
			console.log(error);
		});
	};

	useEffect(()=> {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/alexfazakas', {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(resp => {
        if (!resp.ok) throw Error(`La response no es ok`)
        return resp.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        setTodos(data)
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
		alert(`Ha habido un error, intentalo mas tarde`)
        console.log(error);
    });
	}, [])

	return (
		<div className="container mt-5">
			<h1>My Todos List</h1>
			<ul>
				<li>
					<input
						type="text"
						value={inputValue}
						onChange={handleInputChange}
						onKeyPress={handleKeyPress}
						placeholder="Que tengo que hacer?"
					/>
				</li>
				{todos.map((item, index) => (
					<li key={index}>
						{item.label}{" "}
						<i
							className="fas fa-trash-alt"
							onClick={() => handleDelete(index)}
						></i>
					</li>
				))}
			</ul>
			<div>{todos.length} tasks</div>
		</div>
	);
};

export default Home;