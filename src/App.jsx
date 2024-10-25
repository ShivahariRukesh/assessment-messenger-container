import "./App.css";
import Contacts from "./components/Contacts";
import Messages from "./components/Messages";
import store from "./redux";
import { Provider } from "react-redux";
function App() {
  return (
    <>
      <Provider store={store}>
        <div className="main-container">
          <Contacts />
          <Messages />
        </div>
      </Provider>
    </>
  );
}

export default App;
