import AddClientUseCase from "../usecase/add-client/add-client.usecase"
import FindClientUseCase from "../usecase/find-client/find-client.usecase"
import ClientAdmFacadeInterface, { AddClientFacadeInputDto, FindClientFacadeInputDto, FindClientFacadeOutputDto } from "./client-adm.facade.interface"

export interface UsecaseProps {
    addUsecase: AddClientUseCase
    findUsecase: FindClientUseCase
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {

    private _addUsecase: AddClientUseCase
    private _findUsecase: FindClientUseCase

    constructor(usecaseProps: UsecaseProps) {
        this._addUsecase = usecaseProps.addUsecase
        this._findUsecase = usecaseProps.findUsecase
    }

    async add(input: AddClientFacadeInputDto): Promise<void> {
        await this._addUsecase.execute(input)
    }
    async find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto> {
        return await this._findUsecase.execute(input)
    }
}