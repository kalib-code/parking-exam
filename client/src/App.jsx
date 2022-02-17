import React , {useState} from "react";
import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router";
import {DataProvider} from "@pankod/refine-strapi-v4"
import axios from "axios";
import {
  notificationProvider,
  Layout,
  ErrorComponent,
  Typography,
  Image,
} from "@pankod/refine-antd";

import "@pankod/refine-antd/dist/styles.min.css";
import { TicketCreate, TicketList } from "./pages/ticket";
import { ParkingList, ParkingCreate } from "./pages/parking";
import { PaymentCreate, PaymentList } from "./pages/payment";

const { Title } = Typography;


const axiosInstance = axios.create();

function App() {

  const [collapsed, setCollapsed] = useState(false);
const imageURL = 'https://parkingmgt.com/wp-content/uploads/2017/08/PMC-Logo-21-2.png';
  return (
    <Refine
        routerProvider={routerProvider}
        dataProvider={DataProvider ("http://localhost:1337/api",axiosInstance)}
        resources={[
        {
          name:"tickets",
          list: TicketList,
          create: TicketCreate,

        },
        {
          name:"parking-spaces",
          list: ParkingList,
          create:ParkingCreate
        },
        {
          name:"payments",
          list: PaymentList,
          create: PaymentCreate
        }
        ]}
        notificationProvider={notificationProvider}
        Layout={Layout}
        catchAll={<ErrorComponent />}
    />
);
}

export default App
