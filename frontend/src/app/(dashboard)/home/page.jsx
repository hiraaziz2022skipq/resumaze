'use client'
import { store } from "@/redux/store";
import HomePage from "@/views/home";
import { Provider } from "react-redux";

export default function Page() {
  return <Provider store={store}>
    
    <HomePage/>
    </Provider>
    
}
