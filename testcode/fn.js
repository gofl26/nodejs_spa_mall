
    const fn = {
      pw: function (id, pw) {
        const b = /^.{4,15}$/;
        if(!b.test(pw)) {
          return false;
        } 
        if(pw.includes(id)) {
          return false;
        }
        return true;
      },
      confirm: function (pw, pw1) {
        if(pw!==pw1) {
          return false;
        }
        return true;
      },
      createUser: function (name) {
        existname = "asd123"
        if(name===existname) {
          return "중복된 닉네임입니다.";
        }
        return true;
      },
    }

    module.exports = fn;