export class Product {
    constructor(
        public id: number,
        public ProductCode: string,
        public ProductDescriptionOriginal: string,
        public ProductDescription: string,
        public ProductCategory: string,
        public ProductStatus: string,
        public ProductBarcode: string,
        public Rowchecksum: string
        ) {}
}
