import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { applyTheme, CLIENT } from "@/client";

applyTheme();
document.title = CLIENT.name + ' – Генератор КП';

createRoot(document.getElementById("root")!).render(<App />);
