import React from 'react';
import RouteFinderContainer from './containers/RouteFinderContainer/RouteFinderContainer';
import NavigationBar from './containers/NavigationBar/NavigationBar';
import './App.module.scss';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <RouteFinderContainer />
    </div>
  );
}

export default App;
