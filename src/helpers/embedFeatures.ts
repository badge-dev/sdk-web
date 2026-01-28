export type Navigation = "top" | "bottom";

export interface TemplateEmbedFeatures {
  passList?: boolean;
  templateEditor?: boolean | TemplateEditorFeatures;
  campaigns?: boolean;
  campaignEditor?: boolean;
}

export type TemplateEditorFeature = keyof TemplateEditorFeatures;

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
