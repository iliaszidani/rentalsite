'use client';

import { useEffect } from "react";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";
import "aos/dist/aos.css";
import "../../styles/index.scss";
import { store } from "../../store/store";
import Aos from "aos";

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap");
}

export default function ClientProvider({ children }) {
  useEffect(() => {
    // AOS initialization for animations
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
