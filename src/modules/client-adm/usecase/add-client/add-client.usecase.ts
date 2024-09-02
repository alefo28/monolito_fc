import Id from "../../../@shared/domain/value-object/id.value-object";
import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import Client from "../../domain/client.entity";
import ClientGateway from "../../gateway/client.gateway";
import { AddClientInputDto, AddClientOutputDto } from "./add-client.usecase.dto";

export default class AddClientUseCase implements UsecaseInterface {
    private _clientRepository: ClientGateway

    constructor(clientRespository: ClientGateway) {

        this._clientRepository = clientRespository

    }

    async execute(input: AddClientInputDto): Promise<AddClientOutputDto> {

        const { id, name, email, address } = input

        const props = {
            id: new Id(id) || new Id(),
            name,
            email,
            address
        }

        const client = new Client(props)

        await this._clientRepository.add(client)

        return {
            id: client.id.id,
            name: client.name,
            email: client.email,
            address: client.address,
            createdAt: client.createdAt,
            updatedAt: client.updatedAt
        }

    }

}