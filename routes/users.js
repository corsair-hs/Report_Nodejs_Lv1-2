const express = require("express");
const router = express.Router();
const UserSchema = require("../schemas/user.js");
const authMiddleware = require("../middlewares/auth-middleware.js");


// 회원 가입 API
router.post('/signup', async (req, res) => {
   const { nickname, password, confirm } = req.body;

   // 패스워드, 확인패스워드 일치 검증
   if ( password !== confirm ) {
      res.status(412).json({
         errorMessage: "패스워드가 일치하지 않습니다."
      });
      return;  // 패스워드 검증이 실패하면 뒤에는 실행시키지 않도록 return으로 브레이크
   };

   // 패스워드 닉네임을 포함시키면 에러메세지
   if ( password.includes(nickname) ) {
      res.status(412).json({
         errorMessage: "패스워드에 닉네임이 포함되어 있습니다."
      });
      return;
   };

   // 패스워드 4글자 이하이면 에러메세지 
   if ( password.length <= 4 ) {
      res.status(412).json({
         errorMessage: "패스워드 형식이 일치하지 않습니다."
      });
      return;
   };


   // 닉네임 DB 중복 검증
   const isExistuser = await UserSchema.findOne({nickname});
   if (isExistuser) {
      res.status(412).json({
         errorMessage: "중복된 닉네임입니다."
      });
      return;
   };

   // 닉네임 최소 3글자 이상, 알파벳 대소문자, 숫자 외 에러메세지
   if ((!/^[a-zA-Z0-9]+$/.test(nickname)) || (nickname.length < 4)) {
      res.status(412).json({
         errorMessage: "닉네임의 형식이 일치하지 않습니다."
      });
      return;
   };

   // 
   const user = new UserSchema({ nickname, password });
   await user.save();   // DB에 저장한다.

   return res.status(201).json({ message: "회원 가입에 성공하였습니다."});
});



module.exports = router;