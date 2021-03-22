import React, {useEffect, useState} from "react";
import axios from "axios";
import style from "./DocsList.module.css";
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FolderIcon from '@material-ui/icons/Folder';
import {Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: '100px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(30),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const DocsList = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/docs/doc/')
            .then(response => {
                setDocList(response.data)
            })
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/test-docs/')
            .then(response => {
                setTestDocs(response.data)
            })
    }, [])

    const [docList, setDocList] = useState([])
    const [testDocs, setTestDocs] = useState([])
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
                        <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {
                                docList.map(d => {
                                    return (
                                        <li>
                                            <a className={style.docs} key={d.name} href={d.document} download>
                                                <Typography variant={'h6'}>
                                                    {d.name}
                                                </Typography>
                                            </a>
                                        </li>

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
                        <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <ul>
                            {
                                testDocs.map(d => {
                                    return (
                                        <li>
                                            <a className={style.docs} key={d.name} href={d.document} download>
                                                <Typography variant={'h6'}>
                                                    {d.name}
                                                </Typography>
                                            </a>
                                        </li>

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