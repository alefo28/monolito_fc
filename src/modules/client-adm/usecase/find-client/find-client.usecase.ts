import UsecaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientGateway from "../../gateway/client.gateway";

export default class FindClientUseCase implements UsecaseInterface {
    private _clientRepository: ClientGateway

    constructor(clientRespository: ClientGateway) {

        this._clientRepository = clientRespository

    }
    async execute(input: any): Promise<any> {
        const client = await this._clientRepository.find(input.id)

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