import React, {useEffect} from "react";
import style from "./DocsList.module.css";
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import {Container, Paper, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {setDocsThunk, setTestDocsThunk, setUsersThunk} from "../Redux/DocsReducer/Actions/Actions";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(30),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    docsList: {
        display: "flex",
        flexDirection: "column",
        rowGap: '20px'
    },
    listData: {
        display: "flex",
        columnGap: '20px',
        alignItems: 'center'
    }
}));

const DocsList = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const dispatch = useDispatch()

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        dispatch(setDocsThunk())
    }, [])

    useEffect(() => {
        dispatch(setTestDocsThunk())
    }, [])

    useEffect(() => {
        dispatch(setUsersThunk())
    }, [])

    const docList = useSelector(state => state.docs.docs)
    const testDocs = useSelector(state => state.docs.testDocs)
    const users = useSelector(state => state.docs.users)

    return (
        <Paper className={style.paper} elevation={3}>
            <div className={classes.root}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>
                            <FolderIcon/>
                            Доки
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul className={classes.docsList}>
                            {
                                docList.map(d => {
                                    return (
                                        <Container className={classes.listData}>
                                            <li>
                                                <a className={style.docs} key={d.name} href={d.document} download>
                                                    <Typography variant={'h6'}>
                                                        {d.name}
                                                    </Typography>
                                                </a>
                                            </li>

                                            {
                                                d.history.length !== 0 &&
                                                <Table
                                                    size="small"
                                                    aria-label="a dense table"
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Автор</TableCell>
                                                            <TableCell align="right">Действия</TableCell>
                                                            <TableCell align="right">Дата обновления</TableCell>
                                                            <TableCell align="right">Добавленный документ</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow key={d.history[d.history.length - 1].id}>
                                                            <TableCell
                                                                align="center">{users.filter(el => el.id === d.history[d.history.length - 1].history_user)[0]?.username}</TableCell>
                                                            {
                                                                d.history[d.history.length - 1].history_type === '+' &&
                                                                <TableCell align="center">Добавил</TableCell>
                                                            }
                                                            {
                                                                d.history[d.history.length - 1].history_type === '~' &&
                                                                <TableCell align="center">Обновил</TableCell>
                                                            }
                                                            {
                                                                d.history[d.history.length - 1].history_type === '-' &&
                                                                <TableCell align="center">Удалил</TableCell>
                                                            }
                                                            <TableCell
                                                                align="center">{d.history[d.history.length - 1].history_date}</TableCell>
                                                            <TableCell
                                                                align="center">{d.history[d.history.length - 1].document}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            }
                                        </Container>
                                    )
                                })
                            }
                        </ul>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>
                            <FolderIcon/>
                            Лекции тестов
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul className={classes.docsList}>
                            {
                                testDocs.map(d => {
                                    return (
                                        <Container className={classes.listData}>
                                            <li>
                                                <a className={style.docs} key={d.name} href={d.document} download>
                                                    <Typography variant={'h6'}>
                                                        {d.name}
                                                    </Typography>
                                                </a>
                                            </li>

                                            {
                                                d.history.length !== 0 &&
                                                <Table
                                                    size="small"
                                                    aria-label="a dense table"
                                                >
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>Автор</TableCell>
                                                            <TableCell align="right">Действия</TableCell>
                                                            <TableCell align="right">Дата обновления</TableCell>
                                                            <TableCell align="right">Добавленный документ</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        <TableRow key={d.history[d.history.length - 1].id}>
                                                            <TableCell
                                                                align="center">{users.filter(el => el.id === d.history[d.history.length - 1].history_user)[0].username}</TableCell>
                                                            {
                                                                d.history[d.history.length - 1].history_type === '+' &&
                                                                <TableCell align="center">Добавил</TableCell>
                                                            }
                                                            {
                                                                d.history[d.history.length - 1].history_type === '~' &&
                                                                <TableCell align="center">Обновил</TableCell>
                                                            }
                                                            {
                                                                d.history[d.history.length - 1].history_type === '-' &&
                                                                <TableCell align="center">Удалил</TableCell>
                                                            }
                                                            <TableCell
                                                                align="center">{d.history[d.history.length - 1].history_date}</TableCell>
                                                            <TableCell
                                                                align="center">{d.history[d.history.length - 1].document}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            }
                                        </Container>
                                    )
                                })
                            }
                        </ul>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Paper>
    )
}

export default DocsList;