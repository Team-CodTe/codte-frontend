'use client';

export default function TestErrorPage() {
  // 일부러 에러를 발생시켜 global-error 페이지를 테스트합니다
  throw new Error(
    '이것은 global-error 페이지 테스트를 위한 의도적인 에러입니다!이것은 global-error 페이지 테스트를 위한 의도적인 에러입니다!이것은 global-error 페이지 테스트를 위한 의도적인 에러입니다!이것은 global-error 페이지 테스트를 위한 의도적인 에러입니다!이것은 global-error 페이지 테스트를 위한 의도적인 에러입니다!이것은 global-error 페이지 테스트를 위한 의도적인 에러입니다!',
  );

  // 이 코드는 실행되지 않습니다
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>이 페이지는 에러가 발생합니다</h1>
    </div>
  );
}
