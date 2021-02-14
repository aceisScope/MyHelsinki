import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@material-ui/core"

export default function NavBar() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="home">
                        <img src="https://www.myhelsinki.fi/static/97d28d50f16a3b2b470476a601aa37c2.svg" alt="myhelsinki"/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </Router>
    )
}