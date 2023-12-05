import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext";

import FavoriteAnimalsListPage from "./components/FavoriteAnimalsListPage";
import SearchPage from "./components/SearchPage";

function App() {
  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/myfavorites" element={<FavoriteAnimalsListPage />} />
          <Route path="/" element={<SearchPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;
