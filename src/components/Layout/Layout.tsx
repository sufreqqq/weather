import { ReactNode } from "react";
import styles from "./Layout.module.css";

const Layout = ({children} : {children: ReactNode}) => {
  return <div className={styles.layout}>{children}</div>;
};

export default Layout;
