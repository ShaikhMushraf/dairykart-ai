"use client";

/**
 * ReduxProvider
 * --------------
 * Wraps the application with Redux store
 * Required for useDispatch & useSelector to work
 */

import { Provider } from "react-redux";
import { store } from "./store";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}



/**
 * ReduxProvider
 * Wraps the application with Redux store
 * Must be client-side in Next.js App Router
 */

