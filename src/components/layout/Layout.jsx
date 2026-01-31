import { useLocation } from "react-router-dom";
import Header from "../header/Header";


export default function Layout({ children }) {
  const location = useLocation();

  const hideHeaderRoutes = ["/product"];
  const shouldHideHeader = hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideHeader && <Header />}
      {children}
    </>
  );
}
