'use client';

import {
  Button,
  Input,
  Spinner,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@ui';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { z } from 'zod';
import { useForm } from 'react-hook-form';

import { toast } from '@ui/hooks/use-toast';
import { useState } from 'react';
import { isDebuggerStatement } from 'typescript';

export default function GettingStartedForm() {
  const urlForm = useForm({
    defaultValues: {
      url: '',
    },
  });
  const fileForm = useForm({
    defaultValues: {
      file: '',
    },
  });

  return (
    <div className="w-6/12 mx-auto items-center">
      <p className="text-center">
        Create a new project by importing a OpenAPI spec directly with a URL or
        by uploading a file
      </p>
      <div className="space-x-2 bg-blue-50">
        <h2 className="text-1xl font-bold w-full text-center">
          Import from OpenAPI
        </h2>
        <Form {...urlForm}>
          <form
            onSubmit={urlForm.handleSubmit(async (data, e) => {
              if (!e?.target) return;
              const content = new FormData(e.target);
              const file = content.get('url');
              console.log('url data', data, file);
            })}
          >
            <FormField
              control={urlForm.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAPI URL</FormLabel>
                  <FormControl>
                    <Input type="url" {...field} />
                  </FormControl>
                  <FormDescription>
                    Import an OpenAPI spec from a URL
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Import from URL</Button>
          </form>
        </Form>
      </div>
      <div className="space-x-2 bg-blue-50">
        <h2 className="text-1xl font-bold w-full text-center">
          Import from file
        </h2>
        <Form {...fileForm}>
          <form
            onSubmit={fileForm.handleSubmit(async (data, e) => {
              if (!e?.target) return;
              const content = new FormData(e.target);
              const file = content.get('file') as File;
              const fileContent = await file.text();
              localStorage.setItem('openapi', fileContent);
            })}
          >
            <FormField
              control={fileForm.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>OpenAPI File</FormLabel>
                  <FormControl>
                    <Input type="file" {...field} />
                  </FormControl>
                  <FormDescription>Upload an OpenAPI spec file</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Import</Button>
          </form>
        </Form>
      </div>
      <div className="flex justify-center">{/* TODO show preview */}</div>
    </div>
  );
}
