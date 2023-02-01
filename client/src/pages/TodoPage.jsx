import React, {useContext} from "react";
import ClipLoader from "react-spinners/ClipLoader.js";
import {useQuery} from "react-query";
import {TodoItem} from "../components/TodoItem.jsx";
import {CreateTodoForm} from "../components/CreateTodoForm.jsx";
import readTodosRequest from "../api/readTodosRequest.js";
import {TokenContext} from "../App.jsx";

export const TodoPage = () => {

    const [token] = useContext(TokenContext);

    const {isLoading, data: todos} = useQuery(
        'todos',
        () => readTodosRequest(token)
    );

    return (
        <div>
            <h1>MERN TODO APP</h1>
            {isLoading ? (
                <ClipLoader size={150} />
            ) : (
                todos.map((todo) => (
                    <TodoItem todo={todo} key={todo._id}/>
                ))
            )}
            <CreateTodoForm/>
        </div>
    );
};