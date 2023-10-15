import React, {Suspense} from "react";
import {createSignalRContext} from "react-signalr/signalr";
// ** Router Import
import Router from "./router/Router";

export const SignalRContext = createSignalRContext();

const App = () => {
    let token = localStorage.getItem("accessToken");
    return <Suspense fallback={null}>
        <SignalRContext.Provider
            connectEnabled={!!token}
            accessTokenFactory={() => token}
            dependencies={[token]} //remove previous connection and create a new connection if changed
            url={"https://example/hub"}
        >
            <Router/>
        </SignalRContext.Provider>

    </Suspense>
}
export default App;
