import * as React from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';
import {Home} from './components/Home';

import './custom.css'

import {CreditForm} from "./components/CreditForm";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from '@mui/x-date-pickers';
import rus from "date-fns/locale/ru";


export function App() {
    return (
        // @ts-ignore
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={rus}>
            <Layout>
                <Route exact path='/' component={Home}/>
                <Route path='/credit' component={CreditForm}/>
            </Layout>
       </LocalizationProvider>
    )
}