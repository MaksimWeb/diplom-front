import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import Paper from '@material-ui/core/Paper'
import axios from "axios";
import React, {useState} from "react";
import style from './ComputerProfile.module.css'


export const ComputerProfile = () => {

    const [computerApps, setComputerApps] = useState([])

    let makeFile = axios.get('http://127.0.0.1:8000/computers/script/')
    let getComputerInfo = axios.get('http://127.0.0.1:8000/computers/')


    let getInfo = () => axios
        .all([makeFile, getComputerInfo])
        .then(axios.spread((...responses) => setComputerApps(responses[1].data)))

    return (
        <div className={style.listBlock}>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Название ПК</TableCell>
                            <TableCell align="left">ОС</TableCell>
                            <TableCell align="left">Вид ОС</TableCell>
                            <TableCell align="left">Версия ОС</TableCell>
                            <TableCell align="left">Процессор</TableCell>
                            <TableCell align="left">ОП</TableCell>
                            <TableCell align="left">Видеодрайвер</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {computerApps.map((row) => (
                            <TableRow key={row.title}>
                                <TableCell>
                                    {row.title}
                                </TableCell>
                                <TableCell align="left">{row.kernel_version}</TableCell>
                                <TableCell align="left">{row.product_type}</TableCell>
                                <TableCell align="left">{row.product_version}</TableCell>
                                <TableCell align="left">{row.processor_type}</TableCell>
                                <TableCell align="left">{row.physical_memory}</TableCell>
                                <TableCell
                                    align="left">{row.video_driver}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='outlined' color='primary' onClick={getInfo}>Получить инфо</Button>
        </div>
    )
}