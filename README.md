# PRACTICE. NODEJS LV1 REPORT

### 게시글 RESTful API
1. 게시글 생성
  - HTTP METHOD : POST
  - URL : localhost:3000/posts
  - REQ : request.body {user, password, title, content}
  - RES : status(200).{ message : 게시글 생성하였습니다. }
          status(400).{ message : 데이터 형식이 잘못되었습니다. }
  - to.DB : create ({user, password, title, content})
  - from. DB : {_id, user, password, title, content, createdAt}

2. 게시글 조회 (createdAt 기준 내림차순)
  - HTTP METHOD : GET
  - URL : localhost:3000/posts
  - RES : status(200).{ date : [{postId(=_id), user, title, createdAt}}].sort(a,b)=>{b.createdAt-a.createdAt}}
          status(400).{ message : 데이터 형식이 잘못되었습니다. }

3. 게시글 상세 조회
  - HTTP METHOD : GET
  - URL : localhost:3000/posts/:postId
  - REQ : request.params (:postId)
  - RES : status(200).{ date : {postId(=_id), user, title, content, createdAt}}

4. 게시글 수정
  - HTTP METHOD : PUT
  - URL : localhost:3000/posts/:postId
  - REQ : request.params {:postId}, request.body {password, title, content}
  - RES : status(200).{ message : 게시글 수정되었습니다. }
          status(400).{ message : 데이터 형식이 잘못되었습니다. }
  - to.DB : updateOne ({_id:postId}, {title, content})

5. 게시글 삭제
  - HTTP METHOD : DELETE
  - URL : localhost:3000/posts/:postId
  - REQ : request.params {:postId}, request.body {password}
  - RES : status(200).{ message : 게시글 수정되었습니다. }
          status(400).{ message : 데이터 형식이 잘못되었습니다. }
  - to.DB : deleteOne ({_id:postId})


### 댓글 RESTful API