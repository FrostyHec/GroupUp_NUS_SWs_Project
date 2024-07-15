import { CheckboxFieldFormElement } from "../components/fields/CheckboxField";
import { DateFieldFormElement } from "../components/fields/DateField";
import { NumberFieldFormElement } from "../components/fields/NumberField";
import { ParagprahFieldFormElement } from "../components/fields/ParagraphField";
import { SelectFieldFormElement } from "../components/fields/SelectField";
import { SeparatorFieldFormElement } from "../components/fields/SeparatorField";
import { SpacerFieldFormElement } from "../components/fields/SpacerField";
import { SubTitleFieldFormElement } from "../components/fields/SubTitleField";
import { TextAreaFormElement } from "../components/fields/TextAreaField";
import { TextFieldFormElement } from "../components/fields/TextField";
import { TitleFieldFormElement } from "../components/fields/TitleField";

export type ElementsType =
  | "TextField"
  | "TitleField"
  | "SubTitleField"
  | "ParagraphField"
  | "SeparatorField"
  | "SpacerField"
  | "NumberField"
  | "TextAreaField"
  | "DateField"
  | "SelectField"
  | "CheckboxField";

export type SubmitFunction = (key: string, value: string) => void;

// The core type of the projects.
export type FormElement = {
  type: ElementsType;

  construct: (id: string) => FormElementInstance;

  // The button that will be rendered in the sidebar panel.
  designerBtnElement: {
    icon: React.ElementType;
    label: string;
  };

  // The component that will be rendered in the designer.
  designerComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  // The component that will be rendered in the form submit preview.
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
    isInvalid?: boolean;
    defaultValue?: string;
    disabled?: boolean;
  }>;

  // The component that will be rendered in the properties panel.
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;

  validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
  id: string;
  type: ElementsType;
  extraAttributes?: Record<string, any>; // Object that has string as key and any as value.
};

type FormElementsType = {
  [key in ElementsType]: FormElement;
};

// We can store a JSON object in the database, and then parse it to render the form.
export const FormElements: FormElementsType = {
  TextField: TextFieldFormElement,
  TitleField: TitleFieldFormElement,
  SubTitleField: SubTitleFieldFormElement,
  ParagraphField: ParagprahFieldFormElement,
  SeparatorField: SeparatorFieldFormElement,
  SpacerField: SpacerFieldFormElement,
  NumberField: NumberFieldFormElement,
  TextAreaField: TextAreaFormElement,
  DateField: DateFieldFormElement,
  SelectField: SelectFieldFormElement,
  CheckboxField: CheckboxFieldFormElement,
};
