
import MainPage from './pages/MainPage';
import ViewContactPage from './pages/ViewContactPage';
import { FormContextProvider } from './store/formContext';
import { ValidContextProvider } from './store/validContext';
import { LoadContextProvider } from './store/loadContext';
import {Redirect, Switch, Route } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage';

function App() {
  return(
    <LoadContextProvider>
    <Switch> 
      <Route path='/' exact>
        <Redirect to='/all-contact' />
      </Route> 
      <Route path='/all-contact' exact>
        <FormContextProvider>
          <ValidContextProvider>
            <MainPage />
          </ValidContextProvider>
        </FormContextProvider>
      </Route>   
      
      <Route path='/contact/:contactId'>
        <ViewContactPage />
      </Route> 
      <Route path='*'>
        <ErrorPage message="Oopps that page doesn't exist" />
      </Route> 
    </Switch>
    </LoadContextProvider>
  )
}

export default App;
