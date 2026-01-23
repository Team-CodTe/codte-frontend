const TermsOfServicePage = () => {
  return (
    <div className="bg-background min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="border-border mb-10 border-b pb-4">
          <h1 className="text-3xl font-bold">서비스 이용약관</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            시행일자: 2026년 01월 19일
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-8 leading-relaxed">
          <section>
            <h2 className="mb-3 text-xl font-bold">제1조 (목적)</h2>
            <p>
              본 약관은 <strong>CodTe</strong>(이하 &quot;회사&quot;)가 제공하는
              서비스(이하 &quot;서비스&quot;)의 이용과 관련하여 회사와 이용자의
              권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로
              합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">제2조 (용어의 정의)</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                &quot;서비스&quot;라 함은 구현되는 단말기(PC, TV, 휴대형단말기
                등의 각종 유무선 장치를 포함)와 상관없이 &quot;이용자&quot;가
                이용할 수 있는 CodTe 및 관련 제반 서비스를 의미합니다.
              </li>
              <li>
                &quot;이용자&quot;라 함은 &quot;서비스&quot;에 접속하여 본
                약관에 따라 &quot;회사&quot;가 제공하는 &quot;서비스&quot;를
                이용하는 회원 및 비회원을 말합니다.
              </li>
              <li>
                &quot;회원&quot;이라 함은 &quot;서비스&quot;에 접속하여 본
                약관에 동의하고 ID(이메일주소)와 비밀번호를 발급받은 자를
                말합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">
              제3조 (약관의 효력 및 변경)
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                본 약관은 서비스를 이용하고자 하는 모든 이용자에 대하여 그
                효력을 발생합니다.
              </li>
              <li>
                회사는 필요하다고 인정되는 경우 관련 법령을 위배하지 않는
                범위에서 본 약관을 개정할 수 있습니다.
              </li>
              <li>
                회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여
                서비스 내 공지사항을 통해 공지합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">
              제4조 (서비스의 제공 및 변경)
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>회사는 이용자에게 서비스를 무료로 제공합니다.</strong>
              </li>
              <li>
                회사는 운영상, 기술상의 필요에 따라 제공하고 있는 서비스의 전부
                또는 일부를 수정, 중단, 변경할 수 있습니다.
              </li>
              <li>
                회사는 무료로 제공되는 서비스의 일부 또는 전부를 회사의 정책 및
                운영의 필요상 수정, 중단, 변경할 수 있으며, 이에 대하여 관련
                법령에 특별한 규정이 없는 한 이용자에게 별도의 보상을 하지
                않습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">
              제5조 (회원가입 및 계정 관리)
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                이용자는 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본
                약관에 동의한다는 의사표시를 함으로써 회원가입을 신청합니다.
              </li>
              <li>
                회사는 가입 신청자가 다음 각 호에 해당하는 경우 승낙을 하지
                않거나 승낙을 유보할 수 있습니다.
                <ul className="text-muted-foreground mt-1 list-disc pl-5">
                  <li>실명이 아니거나 타인의 명의를 이용한 경우</li>
                  <li>
                    허위의 정보를 기재하거나, 회사가 제시하는 내용을 기재하지
                    않은 경우
                  </li>
                  <li>
                    사회의 안녕질서 또는 미풍양속을 저해할 목적으로 신청한 경우
                  </li>
                </ul>
              </li>
              <li>
                회원의 아이디와 비밀번호에 관한 관리책임은 회원에게 있으며, 이를
                제3자가 이용하도록 하여서는 안 됩니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">제6조 (이용자의 의무)</h2>
            <p className="mb-2">이용자는 다음 행위를 하여서는 안 됩니다.</p>
            <ol className="list-decimal space-y-2 pl-5">
              <li>신청 또는 변경 시 허위 내용의 등록</li>
              <li>타인의 정보 도용</li>
              <li>회사가 게시한 정보의 변경</li>
              <li>
                회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는
                게시
              </li>
              <li>회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해</li>
              <li>
                회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위
              </li>
              <li>
                외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는
                정보를 서비스에 공개 또는 게시하는 행위
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">제7조 (저작권의 귀속)</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>서비스의 소유권:</strong> CodTe 서비스 자체와 디자인,
                코드는 회사의 자산입니다.
              </li>
              <li>
                <strong>게시물의 저작권:</strong> 사용자가 작성한 스터디 모집글,
                풀이 등의 저작권은 사용자에게 있습니다. 단, 회사는 서비스를
                운영하기 위해 이를 사이트에 노출할 수 있습니다.
              </li>
              <li>
                <strong>외부 리소스:</strong> 서비스 내 사용된 Solved.ac 티어
                이미지 등의 저작권은 해당 원저작자에게 있습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">제8조 (면책조항)</h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                <strong>
                  회사는 천재지변 또는 이에 준하는 불가항력으로 인하여 서비스를
                  제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
                </strong>
              </li>
              <li>
                <strong>
                  회사는 무료로 제공되는 서비스 이용과 관련하여 관련 법령에
                  특별한 규정이 없는 한 책임을 지지 않습니다.
                </strong>
              </li>
              <li>
                회사는 이용자의 귀책사유로 인한 서비스 이용의 장애에 대하여는
                책임을 지지 않습니다.
              </li>
              <li>
                회사는 이용자가 서비스를 이용하여 기대하는 수익을 상실한 것에
                대하여 책임을 지지 않으며, 그 밖의 서비스를 통하여 얻은 자료로
                인한 손해에 관하여 책임을 지지 않습니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-bold">
              제9조 (준거법 및 재판관할)
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                회사와 이용자 간에 제기된 소송은 대한민국법을 준거법으로 합니다.
              </li>
              <li>
                서비스 이용과 관련하여 발생한 분쟁에 대한 소송은 민사소송법 상의
                관할법원에 제기합니다.
              </li>
            </ol>
          </section>

          {/* Footer / Addendum */}
          <footer className="border-border mt-12 border-t pt-8">
            <h2 className="mb-2 text-lg font-bold">부칙</h2>
            <p className="text-muted-foreground">
              본 약관은 2026년 01월 19일부터 적용됩니다.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
