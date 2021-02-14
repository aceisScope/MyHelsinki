import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { AppBar, Toolbar } from "@material-ui/core"

export default function NavBar() {
    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <img src="https://www.myhelsinki.fi/static/97d28d50f16a3b2b470476a601aa37c2.svg" alt="myhelsinki"/>
                </Toolbar>
            </AppBar>
        </Router>
    )
}