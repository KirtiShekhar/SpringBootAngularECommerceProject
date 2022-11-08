export class Products
{
    constructor(public id?: string,
                public sku?: string,
                public productName?: string,
                public productDescription?: string,
                public productPrice?: number,
                public imageUrl?: string,
                public active?: boolean,
                public unitsInStock?: number,
                public dateCreated?: Date,
                public lastUpdated?: Date
            ){}
}
