import { useEffect, useState } from 'react';

import AptRegister from '../components/AptRegister/AptRegister';
import styled from '@emotion/styled';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import AptCertify from '../components/AptRegister/AptCertify';
import { getCookie } from '../hooks/Cookie';
import Swal from 'sweetalert2';

const AptRegisterPage: React.FC = () => {
  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  const refreshToken = getCookie('apaty_refresh');

  useEffect(() => {
    if (refreshToken === undefined) {
      Swal.fire({
        title: '로그인 후 서비스 이용해주세요.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
      });
      window.location.replace('/');
    }
  }, []);

  const [aptId, setAptId] = useState<number>(-1);
  const [aptName, setAptName] = useState<string>('');
  const [doroJuso, setDoroJuso] = useState<string>('');

  return (
    <>
      <Container>
        {doroJuso === '' ? (
          <>
            <Header header="아파트 커뮤니티 가입" />
            <AptRegister
              setAptId={setAptId}
              setAptName={setAptName}
              setDoroJuso={setDoroJuso}
            />
          </>
        ) : (
          <>
            <Header header="고지서 인증" />
            <AptCertify
              aptId={aptId}
              doroJuso={doroJuso}
              setDoroJuso={setDoroJuso}
            />
          </>
        )}
      </Container>
      <Footer footerNumber={2} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default AptRegisterPage;
