//여기에 실험하고싶은 함수를 넣으면 된다.

// test("테스트 설명", () => {
//     expect("검증 대상").toXxx("기대 결과");
//   });





test('최소3자이상,알파벳 대소문자,숫자가 포함되어야한다.', () => {
  expect("qwer123").toMatch(/^[a-zA-Z0-9]{3,15}$/);
  expect("@123").not.toMatch(/^[a-zA-Z0-9]{3,15}$/);
});

const fn = require('./fn');

test('최소4자이상 닉네임과 같은 값이 포함된 경우 회원가입에 실패', () => {
  expect(fn.pw("asd123","qwer")).toBe(true);
  expect(fn.pw("abc","qwe")).toBe(false);
  expect(fn.pw("abc123","abc")).toBe(false);
});

test('비밀번호 확인은 비밀번호와 정확하게 일치해야 합니다.', () => {
  expect(fn.confirm("asd123","asd123")).toBe(true);
  expect(fn.confirm("ab","asd123")).toBe(false);
});

test('데이터베이스에 존재하는 닉네임을 입력한 경우 "중복된 닉네임입니다." 출력.', () => {
  expect(fn.createUser("asd123")).toBe("중복된 닉네임입니다.");
  expect(fn.createUser("abcd")).toBe(true);
});








