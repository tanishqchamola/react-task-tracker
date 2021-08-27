import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
	const [showAddTask, setShowAddTask] = useState(false);
	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		const getTasks = async () => {
			let data = await fetchTasks();
			console.log(data);
			setTasks(data);
		};
		getTasks();
	}, []);

	//Fetch Tasks
	const fetchTasks = async () => {
		const res = await fetch("http://localhost:5000/tasks");
		const data = await res.json();

		return data;
	};

	// Add Task
	const addTask = async ({ text, day, reminder }) => {
		const res = await fetch("http://localhost:5000/tasks", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ text, day, reminder }),
		});

		const newTasks = await res.json();
		console.log("new:  ", newTasks);
		setTasks([...tasks, newTasks]);
	};

	// Delete Task
	const deleteTask = async (id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "DELETE",
		});
		console.log("delete", id);
		setTasks(tasks.filter((task) => task.id !== id));
	};

	//Toggle reminder
	const toggleReminder = async (id) => {
		const taskToUpdate = tasks.find((task) => task.id === id);
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ ...taskToUpdate, reminder: !taskToUpdate.reminder }),
		});

		const updatedTask = await res.json();
		setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
	};

	//Toggle showAddTask
	const toggleShowAddTask = () => {
		console.log(!showAddTask);
		setShowAddTask(!showAddTask);
	};

	return (
		<Router>
			<div className="container">
				<Header onToggle={toggleShowAddTask} showAddTask={showAddTask} />
				{showAddTask && <AddTask onAdd={addTask} />}
				<Route path="/" exact render={(props) => <>{tasks.length ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : "No tasks found!"}</>} />
				<Route path="/about" component={About} />
				<Footer />
			</div>
		</Router>
	);
}

export default App;
