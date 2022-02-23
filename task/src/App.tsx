import React, { useRef, useState } from 'react';
import './App.css'

interface ITask {
    nombre: string,
    done: boolean
}


function App(): JSX.Element {
    const [task, setTask] = useState<string>("")
    const [tasks, setTasks] = useState<ITask[]>([])

    const taskInput = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setTask(e.currentTarget.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addTask(task)
        taskInput.current?.focus();
    }

    const addTask = (nombre: string): void => {
        setTasks([...tasks, {nombre, done: false}])
        setTask('')
    }

    const toggleDoneTask = (index: number): void => {
        const newTasks: ITask[] = tasks.slice();
        newTasks[index].done = !newTasks[index].done

        setTasks(newTasks)
    }

    const removeTask = (index: number): void => {
        const newTasks: ITask[] = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks)
    }

    return (
        <div className='tasks'>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="name" ref={taskInput} value={task} onChange={handleChange}/>
                <button type="submit">Guardar</button>
            </form>
            <ul>
            {
                tasks.map((t: ITask, index: number) => (
                    <li key={index}>
                        <span>{t.nombre}</span>
                        <div>
                            <button onClick={() => toggleDoneTask(index)}>
                                <span>{t.done ? "done" : "x"}</span>
                            </button>
                            <button onClick={() => removeTask(index)}>
                                <span>delete</span>
                            </button>
                        </div>
                    </li>
                ))
            }
            </ul>
        </div>
    );
}

export default App;
