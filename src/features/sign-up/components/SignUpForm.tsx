'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/Button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { LogoutButton } from './LogoutButton';

const SignUpFormSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2글자 이상이어야 합니다.')
    .max(15, '닉네임은 최대 15글자 이하이어야 합니다.'),
  bojUsername: z.string().min(1, 'BOJ 사용자 이름은 필수입니다.'),
});

export const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      nickname: '',
      bojUsername: '',
    },
  });

  const onSubmit = (data: z.infer<typeof SignUpFormSchema>) => {
    /** @todo 회원가입 폼 전송 API 추가 */
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <FormField
            aria-label="닉네임"
            control={form.control}
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>닉네임</FormLabel>
                <FormControl>
                  <Input
                    id="nickname"
                    type="text"
                    inputMode="text"
                    placeholder="파이썬조아"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  스터디원들에게 보여질 닉네임이에요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            aria-label="백준 계정"
            control={form.control}
            name="bojUsername"
            render={({ field }) => (
              <FormItem>
                <FormLabel>백준 계정</FormLabel>
                <FormControl>
                  <Input
                    id="bojUsername"
                    type="text"
                    inputMode="text"
                    placeholder="alsdn1360"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  문제 추천 쿼리 및 문제 풀이 상태에 사용돼요.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button type="submit" className="w-full">
            회원가입
          </Button>
          <LogoutButton />
        </div>
      </form>
    </Form>
  );
};
