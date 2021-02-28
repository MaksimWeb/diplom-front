import {List, ListItem} from "@material-ui/core";
import axios from "axios";
import React, {useState} from "react";
import style from './ComputersList.module.css'

interface IComps {
    title: string,
    created_at: string
}

export const ComputerList: React.FC = () => {

    const [computersList, setComputerList] = useState<IComps[]>([])

    let getInfo = () => axios
        .get('http://127.0.0.1:8000/computers/')
        .then(response => setComputerList(response.data))

    return (
        <div>
            {computersList.map(item => {
                    return (
                        <List className={style.list}>
                            <ListItem>
                                <h1>{item.title}</h1>
                            </ListItem>
                            <ListItem>
                                <p>{`Время: ${item.created_at}`}</p>
                            </ListItem>
                        </List>
                    )
                }
            )}
            <button onClick={getInfo}>Получить инфо</button>
        </div>
    )
}