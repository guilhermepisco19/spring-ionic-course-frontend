import { CityDTO } from "./city.dto";

export interface AddressDTO {
    id : string,
    publicPlaces : string,
    number : string,
    complement : string,
    neighborhood : string,
    cep : string,
    city : CityDTO
}