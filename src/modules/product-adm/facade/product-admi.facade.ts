import UsecaseInterface from "../../@shared/usecase/usecase.interface";
import ProductAdmFacadeInterface, { AddProductFacadeInputDto, checkStockFacadeInputDto, checkStockFacadeOutputDto } from "./product-adm.facade.interface";

export interface UsecaseProps {
    addUsecase: UsecaseInterface
    stockUsecase: UsecaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUsecase: UsecaseInterface
    private _checkUsecase: UsecaseInterface

    constructor(usecaseProps: UsecaseProps) {
        this._addUsecase = usecaseProps.addUsecase
        this._checkUsecase = usecaseProps.stockUsecase
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        // caso o dto do caso de uso for != do dto da facade, converter o dto da facade para o dto do caso de uso
        return this._addUsecase.execute(input);
    }

    checkStock(input: checkStockFacadeInputDto): Promise<checkStockFacadeOutputDto> {
        return this._checkUsecase.execute(input)
    }
}