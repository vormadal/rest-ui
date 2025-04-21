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
import { useFieldArray, useForm } from 'react-hook-form';
import { RuiPageSpec } from 'rui-core';

type Props = {
  page?: RuiPageSpec | null;
  children?: React.ReactNode;
};

export function PageSettingsDialog({ page, children }: Props) {
  const { control, ...form } = useForm({
    defaultValues: {
      route: page?.route.template ?? '',
      parameters: page?.route.parameters ?? [],
    },
  });

  const {
    fields: parameterFields,
    append,
    remove,
  } = useFieldArray({ control, name: 'parameters' });

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data);
  };
  // const addQueryParam = () => {
  //   form.setValue('parameters', [
  //     ...(form.getValues('parameters') || []),
  //     { type: 'string', name: '', required: false, in: 'query' },
  //   ]);
  // };

  // const removeQueryParam = (index: number) => {
  //   form.setValue(
  //     'parameters',
  //     form.getValues('parameters').filter((_, i) => i !== index)
  //   );
  // };

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
                    No query parameters added yet.
                  </p>
                )}

                {parameterFields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <FormField
                      control={control}
                      name={`parameters.${index}.required`}
                      render={({ field: paramField }) => {
                        const onChange = (
                          e: React.ChangeEvent<HTMLInputElement>
                        ) => {
                          paramField.onChange(e.target.checked);
                        };
                        return (
                          <FormItem>
                            <FormControl>
                              <Input
                                title="Required"
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
                            <select
                              {...paramField}
                              className="border rounded p-2"
                            >
                              <option value="string">String</option>
                              <option value="number">Number</option>
                              <option value="boolean">Boolean</option>
                            </select>
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => remove(index)}
                      type="button"
                      className="h-10 w-10"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
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
