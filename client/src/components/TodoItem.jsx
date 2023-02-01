import React, {useCallback, useState, useEffect, useContext} from 'react';
import {useQueryClient, useMutation} from "react-query";
import updateTodoRequest from "../api/updateTodoRequest.js";
import deleteTodoRequest from "../api/deleteTodoRequest.js";
import {debounce} from 'lodash';
import {TokenContext} from "../App.jsx";
export const TodoItem = ({todo})=> {

    const [text, setText] = useState(todo.text);
    const [token] = useContext(TokenContext);

    const queryClient = useQueryClient();

    const {mutate: updateTodo} = useMutation(
        (updatedTodo)=> updateTodoRequest(updatedTodo, token),
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
            },
        }
    );

    const debouncedUpdateTodo = useCallback(
        debounce(updateTodo, 600),
        [updateTodo]
    );

    useEffect(() => {
        if(text !== todo.text) {
            debouncedUpdateTodo({
                ...todo,
                text,
            });
        }
    }, [text]);

    const {mutate: deleteTodo} = useMutation(
        (deletedTodo)=> deleteTodoRequest(deletedTodo, token),
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
            },
        }
    );

    return (
        <div >
            <input
                checked={todo.completed}
                type="checkbox"
                onChange={() =>
                    updateTodo({
                        ...todo,
                        completed: !todo.completed,
                    })
                }
            />
            <input
                value={text}
                type="text"
                onChange={(e) => updateTodo({
                    ...todo,
                    text: e.target.value,
                })}
            />
            <button onClick={() => deleteTodo(todo)}>Delete</button>
        </div>
    );
};