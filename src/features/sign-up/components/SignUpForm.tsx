'use client';

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

import { useSignUpForm } from '../hooks/useSignUpForm';
import { LogoutButton } from './LogoutButton';

export const SignUpForm = () => {
  const { form, onSubmit } = useSignUpForm();

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
