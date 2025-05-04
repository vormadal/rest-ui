import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  Input,
} from '@ui';
import { PlusCircle, X } from 'lucide-react';
import { FieldArrayWithId, useFieldArray, useForm } from 'react-hook-form';
import { RuiPageSpec, RouteParameter } from 'rui-core';
import { useEffect } from 'react';

type Props = {
  page?: RuiPageSpec | null;
  children?: React.ReactNode;
};

// extract path parameters from the route template
function extractPathParameters(
  route: string,
  existingParams: RouteParameter[]
) {
  const regex = /{([^}]+)}/g;
  const matches = route.match(regex);
  const parameters = matches ? matches.map((match) => match.slice(1, -1)) : [];

  return [
    ...existingParams,
    ...parameters
      .filter((x) => !existingParams.find((y) => y.name === x))
      .map((x) => ({
        name: x,
        type: 'string',
        required: true,
        in: 'path',
      })),
  ];
}

export function PageSettingsDialog({ page, children }: Props) {
  const { control, watch, ...form } = useForm({
    defaultValues: {
      name: page?.name ?? '',
      showInMenu: page?.showInMenu ?? true,
      route: page?.route.template ?? '',
      parameters: extractPathParameters(
        page?.route.template ?? '',
        page?.route.parameters ?? []
      ),
    },
  });

  const route = watch('route');

  const {
    fields: parameterFields,
    append,
    remove,
    update,
    replace,
  } = useFieldArray({ control, name: 'parameters' });

  // Update parameters when route changes
  useEffect(() => {
    if (route) {
      // Extract parameter names from the route
      const regex = /{([^}]+)}/g;
      const matches = route.match(regex);
      const newParamNames = matches
        ? matches.map((match) => match.slice(1, -1))
        : [];

      // Get existing parameters
      const currentParams = parameterFields.map((field) => ({
        name: field.name,
        type: field.type,
        required: !!field.required,
        in: field.in,
      }));

      // Filter out path parameters that are no longer in the route
      const nonPathParams = currentParams.filter(
        (param) => param.in !== 'path'
      );
      const existingPathParams = currentParams.filter(
        (param) => param.in === 'path' && newParamNames.includes(param.name)
      );

      // Create ordered path parameters according to their appearance in the route
      const orderedPathParams = newParamNames.map((name) => {
        // Try to find existing parameter to preserve its properties
        const existing = existingPathParams.find(
          (param) => param.name === name
        );
        if (existing) return existing;

        // Create new parameter if it doesn't exist
        return {
          name,
          type: 'string',
          required: true,
          in: 'path' as const,
        };
      });

      // Combine non-path params with ordered path params
      const updatedParams = [...orderedPathParams, ...nonPathParams];

      // Replace all parameters
      replace(updatedParams);
    }
  }, [route, replace]);

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{page?.name ?? page?.route.template}</DialogTitle>
          <Form {...form} control={control}>
            <form>
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter page name"
                        {...field}
                      ></Input>
                    </FormControl>
                    <FormDescription>
                      The name of your page that will be displayed in the
                      navigation
                    </FormDescription>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="showInMenu"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 mt-4">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input
                          type="checkbox"
                          className="w-4 h-4"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                        <div className="space-y-1 leading-none">
                          <FormLabel>Show in Menu</FormLabel>
                          <FormDescription>
                            When enabled, this page will appear in navigation
                            menus
                          </FormDescription>
                        </div>
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="route"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Route</FormLabel>
                    <FormControl>
                      <Input type="text" {...field}></Input>
                    </FormControl>
                    <FormDescription>
                      The route template for this page. Use curly braces to
                      define path parameters, e.g.,{' '}
                      {`/users/{userId}/posts/{postId}`}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <FormLabel className="text-base">Query Parameters</FormLabel>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 flex items-center gap-1"
                    onClick={() =>
                      append({
                        type: 'string',
                        name: '',
                        required: false,
                        in: 'query',
                      })
                    }
                    type="button"
                  >
                    <PlusCircle className="h-4 w-4" />
                    Add Parameter
                  </Button>
                </div>

                {parameterFields.length === 0 && (
                  <p className="text-sm text-muted-foreground mb-2">
                    No parameters added yet.
                  </p>
                )}

                {parameterFields.map((field, index) => (
                  <ParameterComponent
                    key={field.id}
                    field={field}
                    index={index}
                    control={control}
                    remove={remove}
                    update={update}
                  />
                ))}
              </div>
              <Button
                type="submit"
                className="w-full mt-4"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </form>
          </Form>
          <DialogDescription>
            TODO there should be some additional settings here
          </DialogDescription>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

type ParameterComponentProps = {
  field: FieldArrayWithId<
    {
      route: string;
      parameters: (
        | RouteParameter
        | {
            name: string;
            type: string;
            required: boolean;
            in: string;
          }
      )[];
    },
    'parameters',
    'id'
  >;
  index: number;
  control: any;
  remove: (index: number) => void;
  update: (index: number, data: RouteParameter) => void;
};
function ParameterComponent({
  field,
  index,
  control,
  remove,
  update,
}: ParameterComponentProps) {
  return (
    <div key={field.id} className="flex gap-2 mb-2">
      <FormField
        control={control}
        name={`parameters.${index}.required`}
        render={({ field: paramField }) => {
          const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            paramField.onChange(e.target.checked);
          };
          return (
            <FormItem>
              <FormControl>
                <Input
                  title="Required"
                  disabled={field.in === 'path'}
                  type="checkbox"
                  checked={paramField.value}
                  onChange={onChange}
                />
              </FormControl>
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name={`parameters.${index}.name`}
        render={({ field: paramField }) => (
          <FormControl className="flex-1">
            <Input
              type="text"
              disabled={field.in === 'path'}
              placeholder="Parameter name"
              {...paramField}
            />
          </FormControl>
        )}
      />
      <FormField
        control={control}
        name={`parameters.${index}.type`}
        render={({ field: paramField }) => (
          <FormItem>
            <FormControl>
              <select {...paramField} className="border rounded p-2">
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
              </select>
            </FormControl>
          </FormItem>
        )}
      />

      {field.in !== 'path' && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => remove(index)}
          type="button"
          className="h-10 w-10"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
