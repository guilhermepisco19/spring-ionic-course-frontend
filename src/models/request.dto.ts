import { ItemRequestDTO } from "./item-request.dto";
import { PaymentDTO } from "./payment.dto";
import { RefDTO } from "./ref.dto";

export interface RequestDTO {
    client : RefDTO;
    deliveryAddress : RefDTO;
    payment : PaymentDTO;
    items   : ItemRequestDTO[];
}