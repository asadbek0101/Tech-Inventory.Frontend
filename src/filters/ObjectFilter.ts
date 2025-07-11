import { AppFilter, AppFilterProps } from "./AppFilter";

export enum ObjectFilterTabs {
  ObjectTable = "object-table",
  ObjectForm = "object-form",
  ObjectView = "object-view",
  ObjectProductsForm = "object-products-form",
  ObjectProducts = "object-products",
  ObjectOnView = "object-view-on",
  ObjectPdfReport = "object-pdf-report",
}

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

  readonly regionId: string;
  readonly districtId: string;
  readonly projectId: string;
  readonly numberOfOrderId: string;
  readonly objectClassificationId: string;
  readonly objectClassificationTypeId: string;
  readonly searchValue: string;
}

export class ObjectFilter extends AppFilter<ObjectFilterTabs> {
  private readonly objectId: string;
  private readonly product: string;
  private readonly productId: string;
  private readonly formType: string;
  private readonly productFormType: ProductFormTypes;
  private readonly objectFormType: ObjectFormTypes;
  private readonly productPageType: ObjectProductsPageTypes;
  private readonly regionId: string;
  private readonly districtId: string;
  private readonly projectId: string;
  private readonly numberOfOrderId: string;
  private readonly objectClassificationId: string;
  private readonly objectClassificationTypeId: string;
  private readonly searchValue: string;

  public constructor(
    {
      objectId,
      product,
      productId,
      formType,
      productFormType,
      productPageType,
      objectFormType,
      regionId,
      districtId,
      projectId,
      numberOfOrderId,
      objectClassificationId,
      objectClassificationTypeId,
      searchValue,
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
    this.regionId = regionId || "0";
    this.districtId = districtId || "0";
    this.projectId = projectId || "0";
    this.numberOfOrderId = numberOfOrderId || "0";
    this.objectClassificationId = objectClassificationId || "0";
    this.objectClassificationTypeId = objectClassificationTypeId || "0";
    this.searchValue = searchValue || "";
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

  public getObjectFilter() {
    return {
      regionId: this.regionId,
      districtId: this.districtId,
      projectId: this.projectId,
      numberOfOrderId: this.numberOfOrderId,
      objectClassificationId: this.objectClassificationId,
      objectClassificationTypeId: this.objectClassificationTypeId,
      searchValue: this.searchValue,
      pageNumber: this.pageCount,
      pageSize: this.perPage,
    };
  }
}
