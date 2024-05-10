import { AppFilter, AppFilterProps } from "./AppFilter";

export enum ObjectFilterTabs {}

export enum ProductFormTypes {
  WithObjectForm = "1",
  WithOutObjectForm = "2",
}

export enum ObjectFormTypes {
  WithProductForm = "1",
  WithoutProductForm = "2",
}

export enum ObjectProductsPageTypes {
  Form = "1",
  Table = "2",
}

interface ObjectFilterProps extends AppFilterProps<ObjectFilterTabs> {
  readonly objectId?: string;
  readonly product?: string;
  readonly productId?: string;
  readonly formType?: string;
  readonly productFormType?: ProductFormTypes;
  readonly objectFormType?: ObjectFormTypes;
  readonly productPageType?: ObjectProductsPageTypes;
}

export class ObjectFilter extends AppFilter<ObjectFilterTabs> {
  private readonly objectId: string;
  private readonly product: string;
  private readonly productId: string;
  private readonly formType: string;
  private readonly productFormType: ProductFormTypes;
  private readonly objectFormType: ObjectFormTypes;
  private readonly productPageType: ObjectProductsPageTypes;

  public constructor(
    {
      objectId,
      product,
      productId,
      formType,
      productFormType,
      productPageType,
      objectFormType,
      ...props
    } = {} as ObjectFilterProps,
  ) {
    super({ ...props });
    this.objectId = objectId || "";
    this.product = product || "";
    this.productId = productId || "";
    this.formType = formType || "";
    this.productFormType = productFormType || ProductFormTypes.WithOutObjectForm;
    this.productPageType = productPageType || ObjectProductsPageTypes.Table;
    this.objectFormType = objectFormType || ObjectFormTypes.WithoutProductForm;
  }

  public getObyektId() {
    return this.objectId;
  }

  public getProduct() {
    return this.product;
  }

  public getProductId() {
    return this.productId;
  }

  public getFormType() {
    return this.formType;
  }

  public getProductFormType() {
    return this.productFormType;
  }

  public getOjbectFormType() {
    return this.objectFormType;
  }

  public getProductPageType() {
    return this.productPageType;
  }
}
