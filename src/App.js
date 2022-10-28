import { Container } from "react-bootstrap";
import { OrderDetailsProvider } from "./context/OrderDetails";
import OrderEntry from "./pages/entry/OrderEntry";

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        {/* Summary page and Entry page need the provider */}
        <OrderEntry />
      </OrderDetailsProvider>
      {/* Confirmation page does not need the provider */}
    </Container>
  );
}

export default App;
