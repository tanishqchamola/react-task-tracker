import { useState } from "react";

const AddTask = ({ onAdd }) => {
	const [text, setText] = useState("");
	const [day, setDay] = useState("");
	const [reminder, setReminder] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();

		if (!text.trim()) {
			alert("Please enter a task");
			return;
		} else if (!day.trim()) {
			alert("Please enter a day");
			return;
		} else {
			onAdd({ text, day, reminder });
			setText("");
			setDay("");
			setReminder(false);
		}
	};

	return (
		<form className="add-form" onSubmit={onSubmit}>
			<div className="form-control">
				<label htmlFor="text">Task</label>
				<input type="text" id="text" placeholder="Add Text" value={text} onChange={(e) => setText(e.target.value)} />
			</div>
			<div className="form-control">
				<label htmlFor="dayTime">Day & Time</label>
				<input type="text" id="dayTime" placeholder="Add Day and Time" value={day} onChange={(e) => setDay(e.target.value)} />
			</div>
			<div className="form-control form-control-check">
				<label htmlFor="text">Task</label>
				<input type="checkbox" checked={reminder} id="text" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
			</div>
			<input type="submit" value="Save Task" className="btn btn-block" />
		</form>
	);
};

export default AddTask;
