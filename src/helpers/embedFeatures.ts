export type EmbedType = "templateDetails" | "templateEditor";

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
