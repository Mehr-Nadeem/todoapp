import React, {useContext, useState} from 'react'
import {useMutation, useQueryClient} from "react-query";
import createTodoRequest from "../api/createTodoRequest.js";
import {TokenContext} from "../App.jsx";


export const CreateTodoForm = () => {
    const [text, setText] = useState('');
    const [token] = useContext(TokenContext);

    const queryClient = useQueryClient();
    const {mutate: createTodo} = useMutation(
        (newTodo)=> createTodoRequest(newTodo, token),
        {
            onSettled: () => {
                queryClient.invalidateQueries('todos');
            },
        }
    );

    return (
        <form onSubmit={(e)=> {
            e.preventDefault();
            if(!text) return;
            createTodo({
                text,
            });
            setText('');
        }}
        >
            <input
                onChange={e => setText(e.target.value)}
                type="text"
                value={text}
            />
            <button>Create</button>
        </form>
    )
}