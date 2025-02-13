"use client"; // Needed for client-side components

import { Provider } from "react-redux";
import {store} from "../../Redux/store"; // Ensure correct path

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
