import {Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Button} from "@material-ui/core";
import Paper from '@material-ui/core/Paper'
import axios from "axios";
import React, {useState} from "react";
import style from './ComputerProfile.module.css'
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


export const ComputerProfile = (props) => {

    let computerTitle = props.match.params.title;

    const [computerApps, setComputerApps] = useState([])
    const [applications, setApplications] = useState([])

    let makeFile = axios.get('http://127.0.0.1:8000/computers/script/')
    let getComputerInfo = axios.get(`http://127.0.0.1:8000/computers/${computerTitle}`)
    let getApplicationsInfo = axios.get(`http://127.0.0.1:8000/computers/applications/${computerTitle}`)


    let getInfo = () => axios
        .all([makeFile, getComputerInfo, getApplicationsInfo])
        .then(axios.spread((...responses) => {
            setComputerApps([responses[1].data])
            setApplications(responses[2].data)
        }))

    return (
        <div className={style.listBlock}>
            <TableContainer className={style.tableContainer} component={Paper}>
                <Table className={style.computerTable} size="small" aria-label="a dense table">
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
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Название программы</TableCell>
                            <TableCell align="left">Версия программы</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {applications.map((row) => (
                            <TableRow key={row.application_name}>
                                <TableCell align="left">{row.application_name}</TableCell>
                                <TableCell align="left">{row.application_version}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant='outlined' color='primary' onClick={getInfo}>Получить инфо</Button>
        </div>
    )
}

let withURLDataContainer = withRouter(ComputerProfile);


export default connect(null, {})(withURLDataContainer)