import {
  FormDescription,
  FormMessage,
  useFormField,
} from '@/components/ui/Form';

type Props = {
  message: string;
};

export const FormDescriptionWithError = ({ message }: Props) => {
  const { error } = useFormField();

  if (error) {
    return <FormMessage />;
  }

  return <FormDescription>{message}</FormDescription>;
};
