import Address from "../../../@shared/domain/value-object/address.value-object";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";
import { FindClientInputDto, FindClientOutputDto } from "./find-client.usecase.dto";

export default class FindClientUseCase implements UsecaseInterface {
    private _clientRepository: ClientGateway

    constructor(clientRespository: ClientGateway) {

        this._clientRepository = clientRespository

    }
    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const result = await this._clientRepository.find(input.id)

        return {
            id: result.id.id,
            name: result.name,
            email: result.email,
            document: result.document,
            address: new Address(
                {
                    street: result.address.street,
                    number: result.address.number,
                    complement: result.address.complement,
                    city: result.address.city,
                    state: result.address.state,
                    zipCode: result.address.zipCode,
                }
            ),
            createdAt: result.createdAt,
            updatedAt: result.updatedAt
        }
    }
}