export interface TemplateEmbedFeatures {
  passList?: boolean;
  templateEditor?: boolean | TemplateEditorFeatures;
  campaigns?: boolean;
  campaignEditor?: boolean;
}

export interface TemplateEditorFeatures {
  logo?: boolean;
  icon?: boolean;
  heading?: boolean;
  colors?: boolean;
  coverImage?: boolean;
  headerField?: boolean;
  secondaryFields?: boolean;
  barcodeType?: boolean;
  barcodeData?: boolean;
  barcodeText?: boolean;
  description?: boolean;
  backFields?: boolean;
  locationMessages?: boolean;
  appLinks?: boolean;
  expiry?: boolean;
}

export const TEMPLATE_EDITOR_FEATURES_DEFAULT = {
  logo: true,
  icon: true,
  heading: true,
  colors: true,
  coverImage: true,
  headerField: true,
  secondaryFields: true,
  barcodeType: false,
  barcodeData: false,
  barcodeText: false,
  description: false,
  backFields: true,
  locationMessages: true,
  appLinks: true,
  expiry: false,
} satisfies Record<keyof TemplateEditorFeatures, true | false>;

export const TEMPLATE_EDITOR_FEATURES_ALL: Record<
  keyof TemplateEditorFeatures,
  true
> = {
  logo: true,
  icon: true,
  heading: true,
  colors: true,
  coverImage: true,
  headerField: true,
  secondaryFields: true,
  barcodeType: true,
  barcodeData: true,
  barcodeText: true,
  description: true,
  backFields: true,
  locationMessages: true,
  appLinks: true,
  expiry: true,
};

export const TEMPLATE_EDITOR_FEATURES_NONE: Record<
  keyof TemplateEditorFeatures,
  false
> = {
  logo: false,
  icon: false,
  heading: false,
  colors: false,
  coverImage: false,
  headerField: false,
  secondaryFields: false,
  barcodeType: false,
  barcodeData: false,
  barcodeText: false,
  description: false,
  backFields: false,
  locationMessages: false,
  appLinks: false,
  expiry: false,
};

export const TEMPLATE_EDITOR_FEATURES_ENABLE_BARCODE: Partial<
  Record<keyof TemplateEditorFeatures, true>
> = {
  barcodeType: true,
  barcodeData: true,
  barcodeText: true,
};
