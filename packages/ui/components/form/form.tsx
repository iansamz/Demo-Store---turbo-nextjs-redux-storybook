"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { Slot } from "@radix-ui/react-slot";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { cn } from "@repo/ui/lib/utils";
import { Label } from "@repo/ui/components/label";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue,
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = "FormItem";

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && "text-danger", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = "FormLabel";

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = "FormControl";

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn("text-sm text-neutral-700", className)}
      {...props}
    />
  );
});
FormDescription.displayName = "FormDescription";

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn("text-sm font-medium text-danger", className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = "FormMessage";

const FormSection = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title?: string;
    titleClassName?: string;
  }
>(({ title, titleClassName, children, className, ...props }, ref) => {
  return (
    <div ref={ref} {...props} className={cn("", className)}>
      {title ? (
        <div
          className={cn(
            "text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase",
            titleClassName,
          )}
        >
          {title}
        </div>
      ) : null}
      <div>{children}</div>
    </div>
  );
});
FormSection.displayName = "FormSection";

const FormRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode | React.ReactNode[];
    full?: boolean;
  }
>(({ full, children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      {...props}
      className={cn(`flex flex-wrap ${full ? "w-full" : "w-fit"}`, className)}
    >
      {children}
    </div>
  );
});
FormRow.displayName = "FormRow";

const FormFieldContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    children: React.ReactNode;
    fullWidth?: boolean;
    label?: string;
    error?: string;
    optional?: boolean;
    show?: boolean;
    width?: string;
    labelClassName?: string;
    className?: string;
  }
>(
  (
    {
      children,
      fullWidth = false,
      label,
      error = "",
      optional = false,
      show,
      width = "",
      labelClassName = "",
      className,
    },
    ref,
  ) => {
    const fieldWidth = width ? width : !fullWidth ? "w-80" : "w-full";

    const content = (
      <div className={cn(`${fieldWidth} mb-2 mx-4`, className)} ref={ref}>
        <div className="relative w-full mb-3">
          {label ? (
            <label
              className={`block uppercase text-xs font-bold mb-2 ${labelClassName}`}
            >
              {label}
              {optional ? (
                <span className={"text-gray-400 ml-1 capitalize"}>
                  {" "}
                  (Optional)
                </span>
              ) : null}
            </label>
          ) : null}
          {children}
          {error && <p className="text-sm text-red-500 mt-1">* {error}</p>}
        </div>
      </div>
    );

    if (show != null) {
      return show ? content : null;
    }

    return content;
  },
);

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  FormSection,
  FormRow,
  FormFieldContainer,
};
